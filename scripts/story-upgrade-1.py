#!/usr/bin/env python3
"""Story & visual explanation upgrades (pass 1):
- w1l1: add input→think→answer line (the core 'what makes a computer a computer')
- w1l2: mouse line gets the 'chooha jaisa' pun + button explanation
- Scene props added across entry lessons so scenes visually explain their concepts."""
import json, re

def path(lid):
    w = re.match(r"w(\d+)", lid).group(1)
    return f"/home/z/my-project/src/content/lessons/world{w}/{lid}.json"

def load(lid):
    return json.load(open(path(lid)))

def save(lid, d):
    json.dump(d, open(path(lid), "w"), ensure_ascii=False, indent=2)

# ---- w1l1: insert the computer-works line after s3_l1 ----
d = load("w1l1")
sc3 = d["story"]["scenes"][2]
lines = sc3["lines"]
if not any(l.get("audio") == "w1l1_s3_l1b" for l in lines):
    idx = next(i for i, l in enumerate(lines) if l.get("audio") == "w1l1_s3_l1")
    lines.insert(idx + 1, {
        "char": "bijli", "emote": "happy",
        "ur": "کمپیوٹر ایسے کام کرتا ہے: تم اسے کچھ بتاؤ، وہ سوچے، پھر جواب دے!",
        "en": "A computer works like this: you tell it something, it thinks, then it answers!",
        "audio": "w1l1_s3_l1b",
    })
save("w1l1", d)

# ---- w1l2: mouse pun line ----
d = load("w1l2")
for sc in d["story"]["scenes"]:
    for l in sc["lines"]:
        if l.get("ur", "").startswith("اور ماؤس میرا پالتو مددگار"):
            l["ur"] = "اور ماؤس میرا پالتو مددگار — چوہے جیسا! بٹن دباؤ اور اسکرین پر اشارہ کرو!"
            l["en"] = "And the mouse is my pet helper — like a little rat! Press its buttons to point!"
save("w1l2", d)

# ---- scene props: visual anchors ----
PROPS = {
    "w2l1": ["teer"],
    "w3l1": ["posture-slouch"],
    "w4l1": ["file-img", "file-doc", "file-song"],
    "w5l1": ["paint-brush", "paint-bucket"],
    "w6l1": ["globe-net", "bazaar-stall"],
    "w7l1": ["pattern-blocks", "gem"],
    "w8l1": ["block-cmd", "block-flag", "block-loop"],
}
for lid, props in PROPS.items():
    d = load(lid)
    sc = d["story"]["scenes"][0]
    if not sc.get("props"):
        sc["props"] = props
    save(lid, d)

# w1 lab lessons: problem/solution props
d = load("w1l3")
d["story"]["scenes"][0]["props"] = ["dirty-paws"]
d["story"]["scenes"][1]["props"] = ["clean-hands", "no-food", "polite-question"]
save("w1l3", d)

d = load("w1l4")
d["story"]["scenes"][0]["props"] = ["power-switch"]
save("w1l4", d)

d = load("w1l5")
d["story"]["scenes"][0]["props"] = ["close-work", "power-switch"]
save("w1l5", d)

print("story pass 1 applied")
