#!/usr/bin/env python3
"""Generate TeacherPlans for all lessons that lack one (auto-derived from lesson JSONs).
Writes src/content/teacher/plans.generated.ts exporting GENERATED_PLANS: TeacherPlan[]."""
import json, glob, re

ROOT = "/home/z/my-project"
# world-flavored unplugged activity (no-electricity day)
UNPLUGGED = {
    1: "Computer-or-not card sort: write phone / calculator / goat / bat / ATM on cards. Children hold up 'computer' or 'not a computer'. Then a walking 'power order': wall switch → button → count to ten slowly, acting out the power-on sequence.",
    2: "Blindfold steering: one child closes their eyes (the 'cursor'), the partner guides with loud 'up / down / left / right' calls to reach a friend. Swap roles. This is the mouse lesson with feet.",
    3: "Air-keyboard practice: draw a giant keyboard on the ground with chalk, children hop the home row with both feet, calling each letter. Then letter riddles: 'A se Amrood — hop on A!'",
    4: "Paper filing: label envelopes (pictures / songs / stories), hand mixed cards, children 'save' each card into the right envelope and explain why. Finish with a treasure hunt for one named card.",
    5: "Crayon zone-painting: reproduce the lesson's picture on paper, but with the rule: choose the color FIRST, say its name, then fill the zone — exactly like picking a paint pot.",
    6: "Message web: children stand in a circle with string links, pass a paper 'message' from child to child — one cut string shows what happens when the internet breaks, re-tying shows healing. Then a 'private info or safe to share' thumbs vote.",
    7: "Pattern claps: clap-snap-clap-snap, children shout the next move. Then body loops: 'four claps = one clap' to feel a loop. Bug moment: teacher does a wrong step, class shouts 'bug!' and fixes it.",
    8: "Robot teacher: one child is the 'robot', the class lays paper command cards (walk / turn / jump / repeat) on the floor; the robot does EXACTLY what the cards say. Wrong program = walk into a wall = laugh and debug.",
}

def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

def lesson_world_path(lid):
    w = re.match(r"w(\d+)", lid).group(1)
    return f"{ROOT}/src/content/lessons/world{w}/{lid}.json"

def derive(l):
    lid = l["id"]
    act = l["do"]["activity"]
    bonus = l.get("bonus", {}).get("activity") if l.get("bonus") else None
    skill = l["skill"]["en"]
    w = l["world"]

    prep = [
        "PC/tablet charging or plugged in (at least 30 min before class)",
        f"Open ROSHAN and confirm lesson {lid} loads ({l['title']['en']})",
        "Seats arranged in pairs — 2 children per PC for pair mode",
        "One dry run of the lesson yourself: story, demo, game, cheer",
    ]

    script = []
    for sc in l["story"]["scenes"]:
        for line in sc["lines"]:
            script.append(line["en"])
    script.append(f"Do-prompt to repeat aloud: {act['prompt']['en']}")
    for rc in l["cheer"]["recap"]:
        script.append(f"Recap line: {rc['en']}")

    demo = [f"SHOW step {i+1}: {s['caption']['en']} (point at the picture, say the Urdu caption, then the English)" for i, s in enumerate(l["show"]["steps"])]
    demo.append("Play the DO game once yourself on the big screen — make ONE friendly bug on purpose, fix it aloud: 'bug mila, ab fix karo!'")

    mistakes = []
    wrong = act.get("wrongHint", {}).get("en")
    if wrong:
        mistakes.append({"mistake": "Any wrong tap or drop during the game", "fix": wrong})
    # distractor lessons
    for it in act.get("items", []):
        if it.get("correct") is False and it.get("hint", {}).get("en"):
            mistakes.append({"mistake": f"Tapping the {it['id'].replace('-', ' ')}", "fix": it["hint"]["en"]})
    if act.get("type") == "quiz-mix":
        for q in act.get("questions", []):
            mistakes.append({"mistake": f"Rushing question: {q['question']['en'][:60]}", "fix": "Ask the child to say the question aloud in Urdu first; the answer usually follows."})
    if act.get("type") == "type-input":
        mistakes.append({"mistake": "Pressing ENTER before the word is complete", "fix": "Have the child read their typed letters aloud, letter by letter, before pressing ENTER."})
    if len(mistakes) < 2:
        mistakes.append({"mistake": "Both pair partners grabbing the mouse at once", "fix": "Name the roles: driver holds the mouse, navigator points and talks. The SWAP timer changes roles fairly."})

    answers = []
    t = act.get("type")
    if t == "tap-select":
        answers = [f"Tap: {it['id'].replace('-', ' ')} — {it.get('hint', {}).get('en', '')}" for it in act.get("items", []) if it.get("correct")]
    elif t == "quiz-mix":
        for q in act.get("questions", []):
            a = next((o for o in q["options"] if o["id"] == q["answer"]), None)
            answers.append(f"Q: {q['question']['en']} → {a['label']['en'] if a else q['answer']}")
    elif t == "tap-sequence":
        byid = {s["id"]: s for s in act.get("steps", [])}
        answers = [" → ".join(byid[s]["label"]["en"] for s in act.get("order", []))]
    elif t == "sort-bins":
        answers = [f"{c['id'].replace('-', ' ')} → {c['bin']} ({c['explain']['en']})" for c in act.get("cards", [])]
    elif t == "drag-drop":
        for d in act.get("draggable", []):
            tgt = next((tg for tg in act.get("targets", []) if d["id"] in tg.get("accepts", [])), None)
            answers.append(f"{d.get('name', {}).get('en', d['id'])} → {tgt['id'] if tgt else 'target'}")
    elif t == "paint-zones":
        answers = [f"{z['id']} → {z['colorId']}" for z in act.get("zones", [])]
    elif t == "find-named":
        answers = [f"Round target: {tg['name']['en']}" for tg in act.get("targets", [])]
    elif t == "type-input":
        answers = [f"Type {tg['expect']!r} — {tg['label']['en']}" for tg in act.get("targets", [])]
    elif t == "catch-falling":
        answers = [f"Catch {c['char']} — {c['label']['en']}" for c in act.get("letters", [])[:6]]
    if bonus:
        answers.append(f"Bonus ({bonus.get('type')}): guide gently, it repeats the same skill with new pictures.")
    if l.get("badge"):
        answers.append("FINALE — after the cheer, the world badge is awarded. Make it a class moment: clap for the badge earner!")

    unplugged = UNPLUGGED[int(w)] + f" (Today's skill to keep alive: {skill}.)"

    return {
        "lessonId": lid,
        "title": l["title"],
        "prepChecklist": prep,
        "readAloudScript": [{"say": s} for s in script],
        "demo": demo,
        "commonMistakes": mistakes[:5],
        "answers": answers[:12],
        "unplugged": unplugged,
    }

handwritten = {"w1l1", "w1l2", "w1l3"}
plans = []
for f in sorted(glob.glob(f"{ROOT}/src/content/lessons/world*/*.json")):
    d = json.load(open(f))
    if d["id"] in handwritten:
        continue
    plans.append(derive(d))

def plan_ts(p):
    out = ["  {"]
    out.append(f'    lessonId: "{p["lessonId"]}",')
    out.append(f'    title: {{ ur: "{esc(p["title"]["ur"])}", en: "{esc(p["title"]["en"])}" }},')
    out.append("    prepChecklist: [")
    for x in p["prepChecklist"]:
        out.append(f'      "{esc(x)}",')
    out.append("    ],")
    out.append("    readAloudScript: [")
    for x in p["readAloudScript"]:
        out.append(f'      {{ say: "{esc(x["say"])}" }},')
    out.append("    ],")
    out.append("    demo: [")
    for x in p["demo"]:
        out.append(f'      "{esc(x)}",')
    out.append("    ],")
    out.append("    commonMistakes: [")
    for m in p["commonMistakes"]:
        out.append(f'      {{ mistake: "{esc(m["mistake"])}", fix: "{esc(m["fix"])}" }},')
    out.append("    ],")
    out.append("    answers: [")
    for a in p["answers"]:
        out.append(f'      "{esc(a)}",')
    out.append("    ],")
    out.append(f'    unplugged: "{esc(p["unplugged"])}",')
    out.append("  },")
    return "\n".join(out)

body = "\n".join(plan_ts(p) for p in plans)
ts = f'''/**
 * AUTO-GENERATED teacher lesson plans — derived from the lesson JSONs so every
 * lesson of all 8 worlds ships with a plan (regenerate with scripts/gen-plans.py).
 * Hand-written plans for w1l1–w1l3 live in plans.ts and take precedence.
 */
import type {{ TeacherPlan }} from "./plans";

export const GENERATED_PLANS: TeacherPlan[] = [
{body}
];
'''
open(f"{ROOT}/src/content/teacher/plans.generated.ts", "w").write(ts)
print(f"generated {len(plans)} plans")
