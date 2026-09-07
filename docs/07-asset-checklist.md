# ROSHAN — Asset Checklist (for artists & voice studio)

> Phase 1 ships with **code-drawn SVG characters** and placeholder-labeled art/audio hooks, so
> everything is swappable. Every asset below lists its **ID** — the exact key used in JSON/code.
> Rule: if a file named `public/audio/<key>.mp3` (or `public/art/<id>.svg`) exists, the app uses
> it automatically. Nothing else to change.

## 1. Voice recording (Urdu, child-friendly, calm, warm)
Chain: app tries `/audio/<key>.mp3` → device speech synthesis → visual bubble.

### Global UI & characters (record first)
| Key | Urdu line | Meaning |
|---|---|---|
| `ui_welcome` | روشن میں خوش آمدید! | Welcome to ROSHAN! |
| `ui_yes` | جی ہاں! | Yes! |
| `ui_try_again` | اوپس! ایک بگ ملا! دوبارہ کوشش کریں؟ | Oops! A bug! Try again? |
| `ui_hint` | دیکھو، یہ ہاتھ تمہاری مدد کرے گا | The hand will help you |
| `ui_repeat` | دوبارہ سنو! | Listen again! |
| `ui_swap` | سوپ! اب دوست کو موقع دو! | Swap! Give your friend a turn! |
| `praise_shabash` | شاباش! | Shabash! |
| `praise_zabardast` | زبردست! تم نے یہ سیکھ لیا! | Zabardast! You learned it! |
| `char_bijli_ready` | بجلی ready ہے! | Bijli ready hai! |
| `char_bijli_intro` | میں بجلی ہوں! میں ایک کمپیوٹر ہوں! | I'm Bijli, a computer! |
| `char_noor_intro` | میں نور ہوں! چلو کچھ نیا سیکھیں! | I'm Noor! Let's learn something new! |
| `char_chotu_intro` | میں چھوٹو ہوں! غلطی سے بگ نکلتا ہے، پھر ہم اسے ٹھیک کرتے ہیں! | I'm Chotu! Mistakes make bugs, we fix them! |
| `char_golmatol_intro` |میاؤں! | Myaun! |
| `char_ustad_intro` | ہو ہو! یاد رکھو… | Hoo hoo! Remember… |

### Per-lesson (keys are inside each lesson JSON under `audio`)
- w1l1: `_s1_l1…_s1_l7` (7 story lines), `_show_1…3`, `_do_prompt`, `_praise`, `_recap_1/2`
- w1l2: same pattern; w1l3: same pattern.
- **Spec:** MP3 mono 96 kbps, ≤ 200 KB per clip, −14 LUFS, 0.3 s silence head/tail.

## 2. Illustration (flat SVG, 3px ink outline, storybook palette — doc 02)
### Characters (needed sizes)
- `noor` (idle, point, celebrate) · `chotu` (idle, oops-laugh, celebrate) ·
  `bijli` (idle, sleeping, waking, happy-spark, sad-battery, thinking) ·
  `golmatol` (idle, guilty, sleeping-on-keyboard) · `ustad-ullo` (perch, fly-in, nod)
- App icons: `icon-192.png`, `icon-512.png`, `maskable-512.png` (Bijli face on cream).

### Scenes / props
`bg-storeroom` (mud-brick shelves, dusty light) · `bg-village-street` (mango trees, bazaar) ·
`bg-lab` (benches, old PCs) · `bg-courtyard` (chai, charpai) · props: `crate`, `cricket-bat`,
`kite`, `tractor`, `chai-cup`, `mango`, `power-strip`.

### World-1 lesson art
- L1 tap-select items: `phone`, `calculator`, `atm`, `laptop`, `goat`, `mango-tree`, `cricket-bat`, `well`
- L2 parts: `monitor`, `cpu-box`, `keyboard`, `mouse` + Bijli outline slots `slot-face`,
  `slot-brain`, `slot-ears`, `slot-helper`
- L3 cards: `clean-hands`, `gentle-touch`, `no-food`, `ask-first`, `dirty-paws`,
  `juice-spill`, `sneak-in`, `polite-question`
- Bins: `bin-green` (theek), `bin-teal` (bug/fix)

### Badges & stickers
`badge-dosti-ka-safar` (two hands + robot heart) · 8 world medallions `medal-w1…w8` ·
sticker sheet `sticker-<lessonId>` (one per lesson) · outfit items: `outfit-cap`, `outfit-dasti-topi`, `outfit-hero-cape`.

### Later worlds (placeholder IDs already wired in schema)
meadow set, castle set, city set, mela set, bazaar set, jungle set, mountain set —
list to be expanded per world build (docs/04-curriculum.md).

## 3. Music
- `music_bg_loop`: tabla-lite + rubab pluck, 8-bar loop, ≤ 400 KB, or keep the built-in
  WebAudio procedural loop (already implemented, 0 KB).

## 4. Compression & naming rules
- kebab-case ids, no spaces; SVG ≤ 30 KB each (SVGO); PNG only for app icons.
- All art must pass: cream background test (no pure white), smile test, no-scary test.
