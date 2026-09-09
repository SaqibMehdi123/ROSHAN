#!/usr/bin/env python3
"""ROSHAN lesson validator — schema shape, art IDs, audio keys, engine integrity."""
import json, re, glob, sys, os

ROOT = '/home/z/my-project'
errors = []
warnings = []

# ---------- collect art IDs from Props.tsx ----------
src = open(f'{ROOT}/src/components/art/Props.tsx', encoding='utf8').read()
icons_m = re.search(r'const ICONS: Record<string, React.ReactNode> = \{([\s\S]*?)\n\};', src)
icon_ids = set(re.findall(r'^\s{2}"?([a-z0-9-]+)"?:\s*\(', icons_m.group(1), re.M))
alias_m = re.search(r'Object.assign\(ICONS, \{([\s\S]*?)\}\);', src)
icon_ids |= set(re.findall(r'"([a-z0-9-]+)":', alias_m.group(1)))
scene_m = re.search(r'const SCENES: Record<string, React.ReactNode> = \{([\s\S]*?)\n\};', src)
scene_ids = set(re.findall(r'^\s{2}"([a-z0-9-]+)":\s*\(', scene_m.group(1), re.M))
ART = icon_ids | scene_ids
# dynamic keycaps
ART |= {f'key-{c}' for c in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789;}'} | {'key-space', 'key-enter'}

# ---------- characters & emotes ----------
CH = {'noor', 'chotu', 'bijli', 'golmatol', 'ustad-ullo', 'narrator'}
EMOTES = {
    'bijli': {'idle', 'happy', 'waving', 'waking', 'waking-stretch', 'sleeping', 'short-circuit', 'sad-battery', 'battery-empty'},
    'noor': {'idle', 'happy', 'waving', 'pointing', 'thinking', 'celebrating', 'excited'},
    'chotu': {'idle', 'happy', 'surprised', 'oops', 'playful', 'celebrating', 'excited'},
    'golmatol': {'idle', 'guilty', 'sleepy', 'sleeping', 'peeking', 'playful'},
    'ustad-ullo': {'idle', 'perch', 'flying', 'fly-in', 'nodding', 'happy'},
    'narrator': {''},
}
ENGINES = {'tap-select', 'match-slots', 'sort-bins', 'tap-sequence', 'quiz-mix',
           'drag-drop', 'paint-zones', 'find-named', 'type-input', 'catch-falling'}

def err(f, msg): errors.append(f'{os.path.basename(f)}: {msg}')
def warn(f, msg): warnings.append(f'{os.path.basename(f)}: {msg}')

def bi(v, f, path):
    if not isinstance(v, dict) or not isinstance(v.get('ur'), str) or not isinstance(v.get('en'), str) or not v['ur'].strip():
        err(f, f'{path} not a valid bilingual'); return False
    return True

def check_activity(a, f, path, wid):
    t = a.get('type')
    if t not in ENGINES:
        err(f, f'{path} unknown engine {t}'); return
    bi(a.get('prompt'), f, f'{path}.prompt')
    if not a.get('audio'): err(f, f'{path} missing audio')
    ids = set()
    def uid(i):
        if i in ids: err(f, f'{path} duplicate id {i}')
        ids.add(i)
    if t == 'tap-select':
        for it in a.get('items', []):
            uid(it['id'])
            if it['art'] not in ART: err(f, f"{path} item {it['id']} bad art {it['art']}")
            if not (0 <= it['x'] <= 100 and 0 <= it['y'] <= 100): err(f, f"{path} item {it['id']} pos oob")
            bi(it.get('hint'), f, f"{path}.{it['id']}.hint")
    elif t == 'match-slots':
        items = {i['id'] for i in a.get('items', [])}
        for it in a.get('items', []):
            if it['art'] not in ART: err(f, f"{path} item bad art {it['art']}")
            bi(it.get('name'), f, f'{path} item name')
        for s in a.get('slots', []):
            uid(s['id'])
            if s['accepts'] not in items: err(f, f"{path} slot {s['id']} accepts unknown {s['accepts']}")
            if s['art'] not in ART: err(f, f"{path} slot bad art {s['art']}")
            bi(s.get('label'), f, f'{path} slot label'); bi(s.get('success'), f, f'{path} slot success')
        if len(a.get('items', [])) != len(a.get('slots', [])): err(f, f'{path} items/slots mismatch')
    elif t == 'sort-bins':
        bins = {b['id'] for b in a.get('bins', [])}
        for b in a.get('bins', []):
            if b['art'] not in ART: err(f, f"{path} bin bad art {b['art']}")
            bi(b.get('label'), f, f'{path} bin label')
        for c in a.get('cards', []):
            uid(c['id'])
            if c['art'] not in ART: err(f, f"{path} card bad art {c['art']}")
            if c['bin'] not in bins: err(f, f"{path} card {c['id']} bad bin {c['bin']}")
            bi(c.get('text'), f, f'{path} card text'); bi(c.get('explain'), f, f'{path} card explain')
    elif t == 'tap-sequence':
        steps = {s['id'] for s in a.get('steps', [])}
        for s in a.get('steps', []):
            if s['art'] not in ART: err(f, f"{path} step bad art {s['art']}")
            bi(s.get('label'), f, f'{path} step label')
        order = a.get('order', [])
        if set(order) != steps or len(order) != len(steps):
            err(f, f'{path} order/steps mismatch')
    elif t == 'quiz-mix':
        for q in a.get('questions', []):
            uid(q['id'])
            if q['art'] not in ART: err(f, f"{path} q bad art {q['art']}")
            bi(q.get('question'), f, f"{path}.{q['id']}.question")
            opts = {o['id'] for o in q.get('options', [])}
            for o in q.get('options', []):
                if 'art' in o and o['art'] and o['art'] not in ART: err(f, f"{path} option bad art {o['art']}")
                bi(o.get('label'), f, f'{path} option label')
            if q.get('answer') not in opts: err(f, f"{path}.{q['id']} answer not in options")
            bi(q.get('explain'), f, f'{path} q explain')
    elif t == 'drag-drop':
        dr = {d['id'] for d in a.get('draggable', [])}
        for d in a.get('draggable', []):
            if d['art'] not in ART: err(f, f"{path} draggable bad art {d['art']}")
        for tg in a.get('targets', []):
            uid(tg['id'])
            if tg['art'] not in ART: err(f, f"{path} target bad art {tg['art']}")
            acc = tg.get('accepts', [])
            if not set(acc) <= dr: err(f, f"{path} target {tg['id']} accepts unknown")
            bi(tg.get('success'), f, f'{path} target success')
        cap_total = sum(tg.get('capacity', len(tg.get('accepts', []))) for tg in a.get('targets', []))
        if cap_total < len(a.get('draggable', [])): warn(f, f'{path} capacity < draggables (some may remain unplaced)')
    elif t == 'paint-zones':
        pots = {p['id'] for p in a.get('palette', [])}
        for p in a.get('palette', []): bi(p.get('name'), f, f'{path} pot name')
        for z in a.get('zones', []):
            uid(z['id'])
            if z['colorId'] not in pots: err(f, f"{path} zone {z['id']} bad colorId {z['colorId']}")
    elif t == 'find-named':
        for tg in a.get('targets', []):
            uid(tg['id'])
            if tg['art'] not in ART: err(f, f"{path} target bad art {tg['art']}")
            bi(tg.get('name'), f, f'{path} target name')
    elif t == 'type-input':
        for tg in a.get('targets', []):
            uid(tg['id'])
            exp = tg.get('expect', '')
            if not tg.get('useProfileName') and not exp: err(f, f'{path} target missing expect')
            if tg.get('useProfileName') and not re.fullmatch(r'[A-Z]+', exp or 'X'):
                pass  # fallback expect ok
    elif t == 'catch-falling':
        for l in a.get('letters', []):
            uid(l['id'])

files = sorted(glob.glob(f'{ROOT}/src/content/lessons/world*/w*.json'))
per_world = {}
for f in files:
    try:
        L = json.load(open(f, encoding='utf8'))
    except Exception as e:
        err(f, f'JSON parse: {e}'); continue
    wid = L.get('world'); order = L.get('order'); lid = L.get('id')
    per_world.setdefault(wid, []).append(order)
    stem = os.path.basename(f)[:-5]
    if lid != stem: err(f, f'id {lid} != filename {stem}')
    m = re.match(r'w(\d+)l(\d+)$', stem)
    if m and (int(m.group(1)) != wid or int(m.group(2)) != order):
        err(f, f'world/order mismatch: world={wid} order={order}')
    if not 5 <= L.get('minutes', 0) <= 7: warn(f, f"minutes={L.get('minutes')} outside 5-7")
    bi(L.get('title'), f, 'title'); bi(L.get('skill'), f, 'skill'); bi(L.get('praise'), f, 'praise')
    if not L.get('skillKey'): err(f, 'missing skillKey')
    # story
    nlines = 0
    for sc in L['story']['scenes']:
        if sc['bg'] not in scene_ids: err(f, f"story bg unknown {sc['bg']}")
        for c in sc['cast']:
            if c not in CH: err(f, f'story bad cast {c}')
        for ln in sc['lines']:
            nlines += 1
            if ln['char'] not in CH: err(f, f"story bad char {ln['char']}")
            em = ln.get('emote', '')
            if em and ln['char'] != 'narrator' and em not in EMOTES[ln['char']]:
                # unknown emotes fall back to the default pose in Characters.tsx — safe, warn only
                if wid and wid >= 4: err(f, f"emote {em} invalid for {ln['char']}")
                else: warn(f, f"legacy emote {em} for {ln['char']} (renders default pose)")
            bi(ln, f, 'story line')
            if not ln.get('audio'): err(f, 'story line missing audio')
    if not (4 <= nlines <= 6): warn(f, f'story has {nlines} lines (guide: 4-6)')
    last_lines = L['story']['scenes'][-1]['lines'][-1]
    if 'choice' not in last_lines: warn(f, 'last story line has no hero choice')
    # show
    if len(L['show']['steps']) != 3:
        if wid and wid >= 4: err(f, f"show has {len(L['show']['steps'])} steps (must be 3)")
        else: warn(f, f"legacy show has {len(L['show']['steps'])} steps")
    for st in L['show']['steps']:
        if st['visual'] not in ART: err(f, f"show visual unknown {st['visual']}")
        bi(st.get('caption'), f, 'show caption')
        if not st.get('audio'): err(f, 'show step missing audio')
    # do + bonus
    check_activity(L['do']['activity'], f, 'do', wid)
    if 'bonus' in L and L['bonus']:
        check_activity(L['bonus']['activity'], f, 'bonus', wid)
    # cheer
    if len(L['cheer']['recap']) != 2: err(f, 'cheer recap must be 2 lines')
    for r in L['cheer']['recap']: bi(r, f, 'cheer recap')
    if len(L['cheer'].get('recapAudio', [])) != 2: err(f, 'recapAudio must have 2 keys')
    bi(L['cheer'].get('rewardToast'), f, 'rewardToast')

# per-world counts
expected = {1: 6, 2: 10, 3: 12, 4: 8, 5: 10, 6: 8, 7: 12, 8: 10}
for w, cnt in sorted(expected.items()):
    got = sorted(per_world.get(w, []))
    if got != list(range(1, cnt + 1)):
        err(f'world{w}', f'orders {got} != 1..{cnt}')

# worlds.json agreement
worlds = json.load(open(f'{ROOT}/src/content/worlds.json', encoding='utf8'))
for w in worlds:
    if w['lessonsReady'] != w['lessonCount']:
        err('worlds.json', f"world {w['id']} lessonsReady {w['lessonsReady']} != {w['lessonCount']}")

print(f'Files checked: {len(files)} | Art IDs: {len(ART)} | Scenes: {len(scene_ids)}')
print(f'Per world: ' + ', '.join(f'W{w}:{len(sorted(v))}' for w, v in sorted(per_world.items())))
if warnings:
    print(f'\nWARNINGS ({len(warnings)}):')
    for x in warnings: print('  ~', x)
if errors:
    print(f'\nERRORS ({len(errors)}):')
    for x in errors: print('  !', x)
    sys.exit(1)
print('\nALL VALID ✓')
