#!/usr/bin/env python3
"""P6a — kid-simple vocabulary fixes (user: 'words like sangeet are too difficult').
Every replacement is asserted; script fails loudly if any pattern is missing."""
import io, sys, json

ROOT = "/home/z/my-project/ROSHAN"

def patch(path, pairs):
    p = f"{ROOT}/{path}"
    src = io.open(p, encoding="utf-8").read()
    missed = []
    for old, new in pairs:
        if old not in src:
            missed.append(old)
            continue
        src = src.replace(old, new)
    io.open(p, "w", encoding="utf-8").write(src)
    status = "OK " if not missed else "MISS"
    print(f"[{status}] {path}  ({len(pairs)-len(missed)}/{len(pairs)} applied)")
    for m in missed:
        print("   !! not found:", m)

# ---------- 1) Settings: سنگیت → گانا ; سوپ → باری بدلو ----------
patch("src/components/screens/CastAndSettings.tsx", [
    ('labelUr="سنگیت"', 'labelUr="گانا"'),
    ('ہر ١٠ منٹ میں سوپ!', 'ہر ١٠ منٹ میں باری بدلو!'),
])

# ---------- 2) BrainGym: قریک typo → قریب ; simpler stats line ----------
patch("src/components/screens/BrainGym.tsx", [
    ('قریک ہے… ایک بار پھر سوچو!', 'قریب ہے… ایک بار پھر سوچو!'),
    ('ہفتہ وار چیمپیئن: ذاتی ریکارڈ — صرف اپنے آپ سے مقابلہ!',
     'ہفتے کا چیمپیئن: اپنا ریکارڈ — صرف اپنے آپ سے مقابلہ!'),
])

# ---------- 3) Album: پوشاک → کپڑے ----------
patch("src/components/screens/Album.tsx", [
    ('<h2 className="urdu mb-3 text-2xl font-bold">پوشاک</h2>',
     '<h2 className="urdu mb-3 text-2xl font-bold">کپڑے</h2>'),
])

# ---------- 4) store.ts: outfit names (art = generic party flag, safe to rename) ----------
patch("src/lib/store.ts", [
    ('{ at: 12, id: "cap", name: { ur: "مزیدار ٹوپی", "en": "Cool Cap" } }',
     '{ at: 12, id: "cap", name: { ur: "شاندار ٹوپی", "en": "Cool Cap" } }'),
    ('{ at: 30, id: "dasti-topi", name: { ur: "دستی ٹوپی", "en": "Dasti Topi" } }',
     '{ at: 30, id: "dasti-topi", name: { ur: "پارٹی ٹوپی", "en": "Party Cap" } }'),
])

# ---------- 5) LessonPlayer: سوپ (soup?!) → باری بدلو ; موقع → باری ----------
patch("src/components/screens/LessonPlayer.tsx", [
    ('void playAudio(undefined, "سوپ! اب دوسرے دوست کی باری!");',
     'void playAudio(undefined, "باری بدلو! اب دوسرے دوست کی باری!");'),
    ('<h2 className="urdu-tight text-6xl font-bold text-primary-strong">سوپ!</h2>',
     '<h2 className="urdu-tight text-6xl font-bold text-primary-strong">باری بدلو!</h2>'),
    ('<p className="urdu-tight text-2xl font-semibold">اب دوسرے دوست کو موقع دو!</p>',
     '<p className="urdu-tight text-2xl font-semibold">اب دوسرے دوست کی باری ہے!</p>'),
    ('"اب دوسرے دوست کو موقع دو!"', '"اب دوسرے دوست کی باری ہے!"'),
])

# ---------- 6) Activities: جُز → حصے ----------
patch("src/components/activities/Activities.tsx", [
    ('{ ur: "بجلی کے جُز واپس لگاؤ", en: "Put Bijli\'s parts back" }',
     '{ ur: "بجلی کے حصے واپس لگاؤ", en: "Put Bijli\'s parts back" }'),
    ('{ ur: "جُز — Parts", en: "Parts" }',
     '{ ur: "حصے — Parts", en: "Parts" }'),
])

# ---------- 7) w1l2 lesson: all جُز → حصے / حصہ ----------
JUZ = "جُز"  # jeem + damma + zhe
patch("src/content/lessons/world1/w1l2.json", [
    (f'کے {JUZ}"', 'کے حصے"'),                       # title
    (f'سب {JUZ} واپس', 'سب حصے واپس'),                # praise
    (f'میرے {JUZ} الگ', 'میرے حصے الگ'),              # story line
    (f'تمہارے {JUZ} واپس', 'تمہارے حصے واپس'),        # story line
    (f'{JUZ} واپس لگاتے', 'حصے واپس لگاتے'),          # story line
    (f'{JUZ} اٹھاؤ', 'حصہ اٹھاؤ'),                    # do prompt
    (f'یہ {JUZ} یہاں', 'یہ حصہ یہاں'),                # wrongHint
])

# any leftover جُز in w1l2 (show captions etc.)
p = f"{ROOT}/src/content/lessons/world1/w1l2.json"
src = io.open(p, encoding="utf-8").read()
if JUZ in src:
    print("   !! leftover جُز in w1l2.json:")
    for i, line in enumerate(src.splitlines(), 1):
        if JUZ in line:
            print(f"      L{i}: {line.strip()[:110]}")

# ---------- 8) brain gym puzzle ----------
patch("src/content/braingym/puzzles.json", [
    (f'کمپیوٹر کے {JUZ} ہیں۔', 'کمپیوٹر کے حصے ہیں۔'),
])

# ---------- 9) teacher plan title + parent letter (adult-facing but keep consistent) ----------
patch("src/content/teacher/plans.ts", [
    ('بجلی کے ' + JUZ, 'بجلی کے حصے'),
])
patch("src/components/teacher/TeacherHub.tsx", [
    (f'کمپیوٹر کے چار {JUZ} —', 'کمپیوٹر کے چار حصے —'),
])

# ---------- verify no جُز / سنگیت / پوشاک / قریک / سوپ left anywhere ----------
import subprocess
r = subprocess.run(["grep", "-rn", "-e", JUZ, "-e", "سنگیت", "-e", "پوشاک", "-e", "قریک",
                    f"{ROOT}/src"], capture_output=True, text=True)
left = [l for l in r.stdout.splitlines() if "سوپ!" not in l and "میں سوپ" not in l]
print("\nleftover hard words:", len(left))
for l in left[:10]:
    print("  ", l.replace(ROOT + "/", ""))

r2 = subprocess.run(["grep", "-rn", "سوپ", f"{ROOT}/src"], capture_output=True, text=True)
print("remaining سوپ refs:")
for l in r2.stdout.splitlines()[:6]:
    print("  ", l.replace(ROOT + "/", ""))
