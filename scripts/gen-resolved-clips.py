#!/usr/bin/env python3
"""Pre-generate resolved-template audio clips: world names, badge names,
find-named round prompts, ui_welcome key. Uses edge-tts; appends to nothing —
writes files directly + updates tts-manifest.json for future resumes."""
import asyncio, hashlib, json, os, glob
import edge_tts

ROOT = "/home/z/my-project"
OUT = f"{ROOT}/public/audio"
VOICE = "ur-PK-UzmaNeural"
RATE = "-10%"

def h(t):
    return "auto-" + hashlib.sha1(t.strip().encode()).hexdigest()[:12] + ".mp3"

items = []  # (filename, text)

# 1) ui_welcome key clip (static greeting; name omitted by design)
items.append(("ui_welcome.mp3", "روشن کی دنیا میں خوش آمدید! کس زمین میں چلتے ہیں؟"))

# 2) world names + badge names
worlds = json.load(open(f"{ROOT}/src/content/worlds.json"))
worlds = worlds if isinstance(worlds, list) else worlds["worlds"]
for w in worlds:
    items.append((h(w["name"]["ur"] + "!"), w["name"]["ur"] + "!"))
    items.append((h(w["badgeName"]["ur"] + "!"), w["badgeName"]["ur"] + "!"))
    items.append((h("یہ بیج ابھی باقی ہے!"), "یہ بیج ابھی باقی ہے!"))

# 3) find-named round prompts: ابھی {name} پر اشارہ کرو!
names = set()
for f in glob.glob(f"{ROOT}/src/content/lessons/world*/*.json"):
    d = json.load(open(f))
    acts = [d["do"]["activity"]] + ([d["bonus"]["activity"]] if d.get("bonus") else [])
    for act in acts:
        if act.get("type") == "find-named":
            for t in act.get("targets", []):
                names.add(t["name"]["ur"].strip())
for n in sorted(names):
    t = f"ابھی {n} پر اشارہ کرو!"
    items.append((h(t), t))

# dedupe, skip existing
todo = []
seen = set()
for k, t in items:
    if k in seen:
        continue
    seen.add(k)
    p = os.path.join(OUT, k)
    if not (os.path.exists(p) and os.path.getsize(p) > 1200):
        todo.append((k, t))

print(f"{len(todo)} clips to generate")

async def gen():
    fails = []
    for k, t in todo:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text=t, voice=VOICE, rate=RATE).save(os.path.join(OUT, k))
                break
            except Exception as e:
                if attempt == 2:
                    fails.append((k, str(e)[:80]))
                await asyncio.sleep(1)
    return fails

fails = asyncio.run(gen())
print("fails:", fails)

# sync manifest for future resume runs
mpath = f"{ROOT}/scripts/tts-manifest.json"
m = json.load(open(mpath))
have = {x["key"] for x in m}
for k, t in items:
    if k not in have:
        m.append({"key": k, "text": t, "voice": VOICE, "rate": RATE, "pitch": "+0Hz"})
json.dump(m, open(mpath, "w"), ensure_ascii=False, indent=0)
print("manifest updated:", len(m))
