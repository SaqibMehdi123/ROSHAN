#!/usr/bin/env python3
"""Add `name: {ur, en}` to every draggable item that has an audio key — the engine
speaks the name when the child grabs the object (Activities2 DragDrop)."""
import json, re

NAMES = {
    ("w2l7", "aam"): ("آم", "Mango"),
    ("w2l7", "kela"): ("کیلا", "Banana"),
    ("w2l7", "angoor"): ("انگور", "Grapes"),
    ("w2l7", "tarbooz"): ("تربوز", "Watermelon"),
    ("w2l8", "qatra1"): ("پانی کا قطرہ", "Water drop"),
    ("w2l8", "qatra2"): ("پانی کا قطرہ", "Water drop"),
    ("w2l8", "qatra3"): ("پانی کا قطرہ", "Water drop"),
    ("w4l2", "tasveer"): ("تصویر والی فائل", "Picture file"),
    ("w4l2", "gana"): ("گانے والی فائل", "Song file"),
    ("w4l2", "kahani"): ("کہانی والی فائل", "Story file"),
    ("w4l2", "gaon"): ("گاؤں والی فائل", "Village file"),
    ("w4l6", "kitab"): ("کتابوں کا فولڈر", "Books folder"),
    ("w4l6", "khel"): ("کھیلوں کا فولڈر", "Games folder"),
    ("w4l6", "tasveer"): ("تصویروں کا فولڈر", "Pictures folder"),
    ("w8l3", "d1"): ("کمانڈ بلاک", "Command block"),
    ("w8l3", "d2"): ("کمانڈ بلاک", "Command block"),
    ("w8l3", "d3"): ("کمانڈ بلاک", "Command block"),
    ("w8l9", "d1"): ("کمانڈ بلاک", "Command block"),
    ("w8l9", "d2"): ("کمانڈ بلاک", "Command block"),
    ("w8l9", "d3"): ("لوپ بلاک", "Loop block"),
}

patched = 0
for f in ["w2l7", "w2l8", "w4l2", "w4l6", "w8l3", "w8l9"]:
    w = re.match(r"w(\d+)", f).group(1)
    p = f"/home/z/my-project/src/content/lessons/world{w}/{f}.json"
    d = json.load(open(p))
    acts = [d["do"]["activity"]]
    if d.get("bonus"):
        acts.append(d["bonus"]["activity"])
    for act in acts:
        for item in act.get("draggable", []):
            key = (f, item["id"])
            if item.get("audio") and key in NAMES and "name" not in item:
                ur, en = NAMES[key]
                item["name"] = {"ur": ur, "en": en}
                patched += 1
    json.dump(d, open(p, "w"), ensure_ascii=False, indent=2)
print("patched", patched, "draggable items")
