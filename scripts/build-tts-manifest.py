#!/usr/bin/env python3
"""
ROSHAN TTS manifest builder.
Collects EVERY spoken Urdu string in the project and emits scripts/tts-manifest.json:
  - keyed clips:  <key>.mp3            (referenced by lesson/character/puzzle JSON `audio` fields)
  - auto clips:   auto-<sha1[:12]>.mp3 (unkeyed spoken Bilingual fields + inline playAudio text)
Voice casting: female (Uzma) for bijli/noor/narrator/system, male (Asad) for others.
"""
import json, glob, hashlib, re, os

ROOT = "/home/z/my-project"
FEMALE = "ur-PK-UzmaNeural"
MALE = "ur-PK-AsadNeural"

CHAR_VOICE = {
    "narrator": (FEMALE, "-10%", "+0Hz"),
    "bijli":    (FEMALE, "-8%",  "+0Hz"),
    "noor":     (FEMALE, "-8%",  "+0Hz"),
    "chotu":    (MALE,   "-5%",  "+0Hz"),
    "golmatol": (MALE,   "-2%",  "+15Hz"),
    "ustad-ullo": (MALE, "-14%", "+0Hz"),
}
SYSTEM = (FEMALE, "-10%", "+0Hz")

def auto_key(text: str) -> str:
    return "auto-" + hashlib.sha1(text.strip().encode("utf-8")).hexdigest()[:12]

entries = {}  # out_key -> {text, voice, rate, pitch}

def add(key, text, voice, rate, pitch):
    text = (text or "").strip()
    if not text:
        return
    e = entries.get(key)
    if e and e["text"] != text:
        print(f"!! key collision {key}")
    entries[key] = {"text": text, "voice": voice, "rate": rate, "pitch": pitch}

def find_char_of_line(line):
    return CHAR_VOICE.get(line.get("char", "narrator"), SYSTEM)

# ---- 1) keyed audio from content JSONs ----
def walk_keyed(o, lesson_id, char_hint, texts_by_key):
    if isinstance(o, dict):
        my_char = char_hint
        if "char" in o and isinstance(o.get("char"), str):
            my_char = CHAR_VOICE.get(o["char"], SYSTEM)
        for k, v in o.items():
            if k == "audio" and isinstance(v, str) and v:
                texts_by_key.append((v, o, my_char))
            elif k == "recapAudio" and isinstance(v, list):
                for x in v:
                    if isinstance(x, str) and x:
                        texts_by_key.append((x, {"char": "narrator"}, CHAR_VOICE["narrator"]))
            elif k == "introAudio" and isinstance(v, str) and v:
                texts_by_key.append((v, {"char": o.get("id", "narrator")},
                                     CHAR_VOICE.get(o.get("id", "narrator"), SYSTEM)))
            walk_keyed(v, lesson_id, my_char, texts_by_key)
    elif isinstance(o, list):
        for x in o:
            walk_keyed(x, lesson_id, char_hint, texts_by_key)

# text lookup: for a given audio key, what Urdu text? walk with context
keyed = []  # (key, text, voice, rate, pitch)

def collect_from_lesson(path):
    d = json.load(open(path))
    lid = d.get("id", os.path.basename(path)[:-5])

    # story lines (voice by character) + choice audio
    for sc in d.get("story", {}).get("scenes", []):
        for l in sc.get("lines", []):
            v, r, p = find_char_of_line(l)
            if l.get("audio") and l.get("ur"):
                keyed.append((l["audio"], l["ur"], v, r, p))
            ch = l.get("choice")
            if ch and ch.get("audio") and ch.get("ur"):
                keyed.append((ch["audio"], ch["ur"], v, r, p))

    # show steps (system voice)
    for s in d.get("show", {}).get("steps", []):
        if s.get("audio") and s.get("caption", {}).get("ur"):
            keyed.append((s["audio"], s["caption"]["ur"], *SYSTEM))

    # do + bonus activities: prompt audio / question audio / step label audio / item audio
    def from_activity(act, prefix):
        if not isinstance(act, dict):
            return
        if act.get("audio") and act.get("prompt", {}).get("ur"):
            keyed.append((act["audio"], act["prompt"]["ur"], *SYSTEM))
        for q in act.get("questions", []) or []:
            if q.get("audio") and q.get("question", {}).get("ur"):
                keyed.append((q["audio"], q["question"]["ur"], *SYSTEM))
        for s in act.get("steps", []) or []:
            if s.get("audio") and s.get("label", {}).get("ur"):
                keyed.append((s["audio"], s["label"]["ur"], *SYSTEM))
        for t in act.get("targets", []) or []:
            if t.get("audio") and t.get("label", {}).get("ur"):
                keyed.append((t["audio"], t["label"]["ur"], *SYSTEM))
            if t.get("audio") and t.get("name", {}).get("ur"):
                keyed.append((t["audio"], t["name"]["ur"], *SYSTEM))
        for it in act.get("items", []) or []:
            if it.get("audio") and it.get("hint", {}).get("ur"):
                keyed.append((it["audio"], it["hint"]["ur"], *SYSTEM))
        for it in act.get("draggable", []) or []:
            if it.get("audio"):
                nm = it.get("name", {})
                txt = (nm.get("ur") if isinstance(nm, dict) else None) or it.get("id", "")
                keyed.append((it["audio"], txt, *SYSTEM))
        for l in act.get("letters", []) or []:
            if l.get("audio") and l.get("label", {}).get("ur"):
                keyed.append((l["audio"], l["label"]["ur"], *SYSTEM))
        for t in act.get("targets", []) or []:
            if t.get("audio") and t.get("success", {}).get("ur"):
                pass  # success handled as auto below

    from_activity(d.get("do", {}).get("activity", {}), "do")
    if d.get("bonus"):
        from_activity(d["bonus"].get("activity", {}), "bonus")

    # cheer recaps
    recap = d.get("cheer", {}).get("recap", [])
    recap_audio = d.get("cheer", {}).get("recapAudio", [])
    for i, a in enumerate(recap_audio):
        if a and i < len(recap) and recap[i].get("ur"):
            keyed.append((a, recap[i]["ur"], *SYSTEM))

# generic keyed sweep for anything missed (e.g. drag-drop grab audios, brain gym, characters)
def sweep(obj, out):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k == "audio" and isinstance(v, str) and v:
                out.add(v)
            elif k == "recapAudio" and isinstance(v, list):
                out.update(x for x in v if isinstance(x, str) and x)
            elif k == "introAudio" and isinstance(v, str) and v:
                out.add(v)
            sweep(v, out)
    elif isinstance(obj, list):
        for x in obj:
            sweep(x, out)

all_files = glob.glob(f"{ROOT}/src/content/**/*.json", recursive=True)
for f in all_files:
    if "/lessons/" in f:
        collect_from_lesson(f)

# build key->urdu-text index across ALL content for the sweep pass
key2text = {}

def index_keys(o, ctx_char=None):
    """Walk and record (audio key -> nearby ur text)."""
    if isinstance(o, dict):
        my = ctx_char
        if isinstance(o.get("char"), str):
            my = o["char"]
        # candidate ur text in this node
        ur = None
        for field in ("ur",):
            v = o.get(field)
            if isinstance(v, str) and v.strip():
                ur = v.strip()
        cap = o.get("caption")
        if isinstance(cap, dict) and isinstance(cap.get("ur"), str):
            ur = cap["ur"] or ur
        q = o.get("question")
        if isinstance(q, dict) and isinstance(q.get("ur"), str):
            ur = q["ur"] or ur
        pr = o.get("prompt")
        if isinstance(pr, dict) and isinstance(pr.get("ur"), str):
            ur = pr["ur"] or ur
        lbl = o.get("label")
        if isinstance(lbl, dict) and isinstance(lbl.get("ur"), str):
            ur = lbl["ur"] or ur
        nm = o.get("name")
        if isinstance(nm, dict) and isinstance(nm.get("ur"), str):
            ur = nm["ur"] or ur
        hint = o.get("hint")
        if isinstance(hint, dict) and isinstance(hint.get("ur"), str):
            ur = hint["ur"] or ur
        if o.get("audio") and isinstance(o["audio"], str) and ur:
            v, r, p = CHAR_VOICE.get(my, SYSTEM) if my else SYSTEM
            key2text.setdefault(o["audio"], (ur, v, r, p))
        for v2 in o.values():
            index_keys(v2, my)
    elif isinstance(o, list):
        for x in o:
            index_keys(x, ctx_char)

for f in all_files:
    index_keys(json.load(open(f)))

# characters.json introAudio
chars = json.load(open(f"{ROOT}/src/content/characters.json"))
def index_chars(o):
    if isinstance(o, dict):
        if o.get("introAudio") and o.get("catchphrase", {}).get("ur"):
            cid = o.get("id", "narrator")
            v, r, p = CHAR_VOICE.get(cid, SYSTEM)
            key2text.setdefault(o["introAudio"], (o["catchphrase"]["ur"], v, r, p))
        for v2 in o.values():
            index_chars(v2)
    elif isinstance(o, list):
        for x in o:
            index_chars(x)
index_chars(chars)

# brain gym puzzles
puz = json.load(open(f"{ROOT}/src/content/braingym/puzzles.json"))
index_keys(puz)

# cheer recapAudio <-> recap[i].ur pairing (all lessons)
for f in glob.glob(f"{ROOT}/src/content/lessons/world*/*.json"):
    d = json.load(open(f))
    recap = d.get("cheer", {}).get("recap", [])
    for i, a in enumerate(d.get("cheer", {}).get("recapAudio", [])):
        if isinstance(a, str) and a and i < len(recap) and recap[i].get("ur"):
            key2text.setdefault(a, (recap[i]["ur"], *SYSTEM))

missing = []
for key in sorted(key2text):
    ur, v, r, p = key2text[key]
    if not any(k[0] == key for k in keyed):
        keyed.append((key, ur, v, r, p))

# every keyed ref must have text — verify
refs = set()
def sweep_refs(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if k == "audio" and isinstance(v, str) and v:
                refs.add(v)
            elif k == "recapAudio" and isinstance(v, list):
                refs.update(x for x in v if isinstance(x, str) and x)
            elif k == "introAudio" and isinstance(v, str) and v:
                refs.add(v)
            sweep_refs(v)
    elif isinstance(o, list):
        for x in o:
            sweep_refs(x)
for f in all_files:
    sweep_refs(json.load(open(f)))

for k in sorted(refs):
    if k not in key2text:
        missing.append(k)

# ---- 2) auto-hash for unkeyed spoken Bilingual ur fields ----
SPOKEN_FIELDS = {"explain", "wrongHint", "winPraise", "success", "hint", "clickHint",
                 "praise", "rewardToast", "clickHint", "bubble"}

def walk_auto(o):
    if isinstance(o, dict):
        for k, v in o.items():
            if k in SPOKEN_FIELDS and isinstance(v, dict) and isinstance(v.get("ur"), str) and v["ur"].strip():
                add(auto_key(v["ur"]), v["ur"], *SYSTEM)
            elif isinstance(v, dict) and k in ("question", "prompt") and "audio" not in o:
                if isinstance(v.get("ur"), str) and v["ur"].strip():
                    add(auto_key(v["ur"]), v["ur"], *SYSTEM)
            walk_auto(v)
    elif isinstance(o, list):
        for x in o:
            walk_auto(x)

for f in all_files:
    walk_auto(json.load(open(f)))

# ---- 3) inline playAudio(undefined, "text") strings from src ----
inline = set()
for f in glob.glob(f"{ROOT}/src/**/*.tsx", recursive=True) + glob.glob(f"{ROOT}/src/**/*.ts", recursive=True):
    src = open(f, encoding="utf-8").read()
    for m in re.finditer(r"playAudio\(\s*(?:undefined|null)\s*,\s*[\"'`]([^\"'`]+)[\"'`]", src):
        t = m.group(1).strip()
        if t:
            inline.add(t)
    # template literal with expressions can't be pre-generated; skip those

for t in inline:
    add(auto_key(t), t, *SYSTEM)

# ---- 4) also mirror keyed texts into auto-hash space when text differs from any auto entry
for (key, ur, v, r, p) in keyed:
    ak = auto_key(ur)
    if ak not in entries:
        entries[ak] = {"text": ur, "voice": v, "rate": r, "pitch": p}

# ---- emit keyed manifest ----
manifest = []
seen = set()
for (key, ur, v, r, p) in keyed:
    if key in seen:
        continue
    seen.add(key)
    manifest.append({"key": key + ".mp3", "text": ur.strip(), "voice": v, "rate": r, "pitch": p})

for k, e in entries.items():
    manifest.append({"key": k + ".mp3", "text": e["text"], "voice": e["voice"], "rate": e["rate"], "pitch": e["pitch"]})

out = f"{ROOT}/scripts/tts-manifest.json"
json.dump(manifest, open(out, "w"), ensure_ascii=False, indent=0)
print(f"keyed clips: {len(seen)}  |  total clips: {len(manifest)}  |  missing text for: {len(missing)}")
for k in missing[:10]:
    print("  MISSING:", k)
