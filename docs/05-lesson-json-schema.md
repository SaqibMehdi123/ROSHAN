# ROSHAN — Lesson Content JSON Schema (v1)

> Goal: **all lesson content is data.** A content author (teacher, writer) can add a lesson by
> dropping one JSON file in `src/content/lessons/<world>/` — no code changes. The Lesson Engine
> renders any lesson from this schema.

## File placement & naming
```
src/content/
  worlds.json                  # world metadata (map)
  characters.json              # cast screen + bible hooks
  braingym/puzzles.json        # warm-up banks
  lessons/world1/w1l1.json …   # one file per lesson
  teacher/plans/w1l1.json …    # lesson plans for teacher hub
```
Lesson id convention: `w{world}l{lesson}` e.g. `w1l2`. Audio key convention: `{lessonId}_{seq}`
or global keys (`ui_yes`, `praise_shabash`, `char_bijli_intro`…).

## Top-level lesson object
```jsonc
{
  "id": "w1l1",
  "schemaVersion": 1,
  "world": 1,
  "order": 1,
  "title":  { "ur": "استور روم کا جادویی صندوق", "en": "The Magic Box" },
  "skill":  { "ur": "کمپیوٹر کیا ہے؟", "en": "What is a computer?" },
  "skillKey": "computer-basics",          // stable key for spaced review mixing
  "minutes": 7,                            // engine enforces pace, never counts down visibly
  "badge": "dosti-ka-safar",               // world badge id (awarded at last lesson of world)
  "praise": { "ur": "شاباش! تم نے کمپیوٹر پہچان لیا!", "en": "Shabash! You recognized computers!" },

  "story":  { "scenes": [ Scene ] },       // phase 1 — 2-3 min
  "show":   { "steps":  [ ShowStep ] },    // phase 2 — ~1 min, no reading
  "do":     { "activity": Activity },      // phase 3 — 5-7 min
  "cheer":  { "recap": [Line, Line], "rewardToast": Bilingual },  // phase 4 — 30 s
  "bonus":  { "activity": Activity }       // optional extra challenge (unlocks after DO)
}
```

## Scene (story beats)
```jsonc
{
  "bg": "storeroom",                       // art id from asset registry
  "props": ["crate", "cricket-bat"],
  "cast": ["noor", "chotu"],               // characters on stage, left→right (RTL mirrored)
  "lines": [
    {
      "char": "bijli",                     // "narrator" | character id
      "emote": "waking",                   // pose/animation id
      "ur": "بززت! سلام! میں بجلی ہوں!",
      "en": "Bzzt! Hello! I am Bijli!",
      "audio": "w1l1_s1_l4",               // audio file key (see audio fallback chain)
      "fx": "sparkle"                      // optional visual effect id
    }
  ]
}
```

## ShowStep (demonstration)
```jsonc
{
  "visual": "computer-everywhere",         // animation id
  "caption": { "ur": "…", "en": "…" },
  "audio": "w1l1_show_1"
}
```

## Activity (the DO phase — discriminated union on `type`)
```jsonc
// tap-select: tap all items matching the rule (or answer questions)
{
  "type": "tap-select",
  "prompt": { "ur": "گاؤں میں چھپے کمپیوٹر ڈھونڈو!", "en": "Find the computers hiding in the village!" },
  "audio": "w1l1_do_prompt",
  "scene": "village-street",               // art id
  "items": [
    { "id": "phone", "x": 18, "y": 62, "art": "phone", "correct": true,
      "hint": { "ur": "فون بھی ایک چھوٹا کمپیوٹر ہے!", "en": "A phone is a small computer!" } },
    { "id": "goat",  "x": 70, "y": 70, "art": "goat",  "correct": false,
      "hint": { "ur": "اوپس! بکری کمپیوٹر نہیں…", "en": "Oops! A goat is not a computer…" } }
  ],
  "winPraise": { "ur": "زبردست! سب مل گئے!", "en": "Zabardast! You found them all!" }
}

// match-slots: tap item → tap slot (works with mouse & touch; drag optional)
{ "type": "match-slots",
  "prompt": Bilingual, "audio": "w1l2_do_prompt",
  "items": [ { "id": "monitor", "art": "monitor", "name": { "ur": "مانیٹر", "en": "Monitor" } } ],
  "slots": [ { "id": "face", "accepts": "monitor", "art": "bijli-face-outline",
               "success": { "ur": "مانیٹر بجلی کا چہرہ ہے!", "en": "The monitor is Bijli's face!" } } ],
  "wrongHint": { "ur": "اوپس! ایک بگ ملا! دوبارہ try کریں?", "en": "Oops! Found a bug! Try again?" } }

// sort-bins: tap card → tap bin (Theek ✓ / Ghalat fix-it)
{ "type": "sort-bins",
  "bins": [ { "id": "theek",  "label": { "ur": "ٹھیک ہے", "en": "Good" },  "art": "bin-green" },
            { "id": "ghalat", "label": { "ur": "بگ", "en": "Bug" },    "art": "bin-teal" } ],
  "cards": [ { "id": "c1", "art": "clean-hands", "bin": "theek",
               "explain": { "ur": "صاف ہاتھ — کمپیوٹر خوش!", "en": "Clean hands — happy computer!" } } ] }

// tap-sequence: order steps
{ "type": "tap-sequence",
  "steps": [ { "id": "s1", "art": "power-switch", "label": Bilingual } ],
  "order": ["s1","s2","s3","s4"] }
```

### Phase 3 types (World 3 — Keyboard Kingdom)

```jsonc
// type-input: typing on physical keyboard OR big on-screen keycaps (touch tablets)
{ "type": "type-input",
  "prompt": Bilingual, "audio": "w3l3_do_prompt",
  "keys": ["A","B","C"],          // keycaps shown on the on-screen kingdom keyboard
  "space": false, "eraser": false, "enter": false,  // special keycaps
  "bubble": false,                 // letter-bubble mode: press key OR tap the bubble
  "targets": [
    { "id": "t1", "expect": "A", "art": "amrood",
      "label": { "ur": "A سے امرود!", "en": "Amrood starts with A!" } },
    { "id": "w1", "expect": "BAT", "art": "cricket-bat",
      "label": { "ur": "لکھو: BAT", "en": "Type BAT" } },
    { "id": "n1", "expect": "3", "count": 3,        // counting round: N mangoes shown
      "label": { "ur": "کتنے آم؟", "en": "How many?" } },
    { "id": "f1", "expect": "BAT", "preFilled": "BQT",  // fix-it: wrong letter pre-typed
      "label": { "ur": "ٹھیک کرو!", "en": "Fix it!" } },
    { "id": "name", "expect": "SANA", "useProfileName": true,  // finale: child's own name
      "label": { "ur": "اپنا نام لکھو", "en": "Type your name" } }
  ],
  "wrongHint": Bilingual, "winPraise": Bilingual }
```
Mechanics: letters fill the **leftmost empty-or-wrong slot** (guided, zero-failure);
BACKSPACE = magic eraser that clears the **leftmost wrong slot**; ENTER confirms
completed words ("ho gaya!"). Physical keys and on-screen keycaps feed the same handler.

```jsonc
// catch-falling: letters drift down SLOWLY (15 s) — catch by key press or tap
{ "type": "catch-falling",
  "prompt": Bilingual, "audio": "w3l4_do_prompt",
  "scene": "bg-castle",
  "rounds": 6,
  "letters": [
    { "id": "ld", "char": "D", "art": "dhol",
      "label": { "ur": "D گر رہا ہے!", "en": "D is falling!" } }
  ],
  "wrongHint": Bilingual, "winPraise": Bilingual }
```
A letter reaching the bottom **floats gently back up** — never lost, never a failure.
`match-slots` gained `row?: boolean` (keyboard-style single-row slots) and
`panelTitles` (custom headings) for the Home-Row lesson.

Additional types (implemented in later phases): `maze-grid`, `block-canvas`, `build-doc`.

## Bilingual + audio rules
- Every human-readable string is `{ "ur": "…", "en": "…" }`. Urdu is displayed primary (RTL,
  Nastaliq, large); English secondary (helps teachers; dual-coding).
- Every line/prompt/button has an `audio` key. Playback chain: `playAudio(key)` →
  1) local file `public/audio/<key>.mp3` → 2) on-device Urdu speech synthesis (if available)
  → 3) visual "Bijli is speaking" bubble (never silent-fail silently).
- Authors write `audio` keys; the asset checklist (doc 07) collects them for the recording studio.

## Star rule (engine-side, not authored)
`bugs === 0 → 3★ · bugs ≤ 2 → 2★ · else 1★` — completing always earns ≥ 1★.
`bugs` = wrong taps, each celebrated as "bug found & fixed!".
