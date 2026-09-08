<div align="center">

# روشن · ROSHAN

**A joyful, offline-first digital literacy adventure for rural Pakistani primary schools.**

Classes 1–5 · Ages 6–11 · Urdu-first · Works on old PCs and cheap Android tablets — no internet required.

</div>

---

## What is ROSHAN?

ROSHAN (روشن — "bright") turns a single old computer into a friendly teacher. Children follow
**Noor** and **Chotu** as they wake up **Bijli**, a round yellow robot, and journey through 8 story
worlds — from *"What is a computer?"* all the way to coding their own animated stories.

Every lesson is spoken aloud in Urdu, follows a fixed **STORY → SHOW → DO → CHEER** rhythm of
max 7 minutes, and never punishes a wrong answer. Mistakes are *"bugs"* — and children are the
**Bug Fixers** who fix them.

Built for the real conditions of village computer labs: **unreliable electricity, no internet,
2 children sharing 1 PC, and teachers who are computer beginners themselves.**

## Highlights

- **100% offline PWA** — installs once, runs forever; auto-saves every 30 s and resumes exactly where the child left off after a power cut
- **Adventure-map navigation** — a winding path through 8 lands *is* the menu; no lists, no menus, no reading required
- **Audio-first** — every instruction spoken in Urdu, with a repeat button on every screen
- **Zero-failure gamification** — stars, badges and a sticker album; no red marks, no sad sounds, no losing
- **Pair Mode** — 2 kids, 1 PC, with a friendly **SWAP!** driver/navigator rotation every 10 minutes
- **Brain Gym** — daily 3–5 minute logic warm-up that only gets harder after 3 wins in a row
- **Teacher Hub** — PIN-protected dashboard with progress, stuck-alerts, CSV export, printable lesson plans and take-home letters in Urdu
- **Content as data** — every story, activity and badge lives in JSON; the engine renders any lesson from its file

## The Learning Journey

| # | World | Skill | Badge |
|---|-------|-------|-------|
| 1 | پہلی ملاقات · First Meeting | What a computer is, lab rules, power on/off | Dosti Ka Safar |
| 2 | ماؤس کا میدان · Mouse Meadow | Click, double-click, drag & drop | Mouse Master |
| 3 | کی بورڈ کی کنگدم · Keyboard Kingdom | Posture, home row, typing name & words | Keyboard Knight |
| 4 | کنٹرول سٹی · Control City | Desktop, files, folders, saving | Folder Captain |
| 5 | کری ایٹو ورکشاپ · Creative Workshop | Paint, calculator, photos, music | Little Artist |
| 6 | انٹرنیٹ بازار · Internet Bazaar | Search + the Safety Superpowers shield | Safety Star |
| 7 | لاجک جنگل · Logic Jungle | Sequencing, loops, IF-THEN, debugging | Logic Champion |
| 8 | اسٹوری ماؤنٹین · Story Mountain | Block coding, animations, final showcase | ROSHAN Hero |

> **Phase 2 ships World 1 (all 6 lessons) and World 2 *Mouse Meadow* (all 10 lessons) fully
> playable** — Urdu story scripts with side-by-side English translations, interactive
> activities, stars and the *Dosti Ka Safar* + *Mouse Master* badges.

## Meet the Friends

| Character | Role |
|-----------|------|
| **Noor** | Curious, brave 9-year-old — the leader of the adventure |
| **Chotu** | Funny 8-year-old who makes glorious mistakes, so nobody else has to |
| **Bijli** | Round yellow robot — *"Bijli ready hai!"* Her malfunctions ARE the lessons |
| **Gol Matol** | Fat, naughty (never evil) cat who causes the "bugs" |
| **Ustaad Ulloo** | Wise owl who lands at the end of every lesson with a 2-line recap |

## Run Locally

```bash
bun install        # or: npm install
bun run dev        # dev server on http://localhost:3000
bun run lint       # code quality check
```

Open in Chrome → the app is installable as a PWA (fullscreen, no address bar) and works
fully offline after first load. Progress is stored on-device; a Teacher Hub CSV export moves
data to a USB stick when needed.

## Project Structure

```
docs/                      # design docs — read these first
  01-sitemap-and-ia.md     #   full IA of student app + teacher hub
  02-design-system.md      #   colors, typography, components, motion rules
  03-character-bible.md    #   visual bible an artist can illustrate from
  04-curriculum.md         #   all 8 worlds → every lesson planned
  05-lesson-json-schema.md #   the content contract
  06-data-model-and-stack.md
  07-asset-checklist.md    #   every asset still needed (art + audio)

src/
  content/                 # ← ALL lesson content lives here (pure JSON)
    worlds.json            #   the 8 lands
    characters.json        #   the 5 friends
    lessons/world1/        #   w1l1–w1l3 (Phase 1 lessons)
    braingym/puzzles.json  #   tiered logic warm-ups
  lib/                     # engine, state, storage, audio, music
  components/
    screens/               # map, world, lesson player, album, brain gym…
    activities/            # tap, match, sort — zero-failure activity types
    art/                   # code-drawn SVG characters & props
    teacher/               # teacher hub views
    ui-kids/               # 64 px touch targets, rounded, gentle motion

public/
  manifest.webmanifest     # PWA manifest (fullscreen, RTL)
  sw.js                    # service worker — precache + cache-first
```

## Content as Data

Lessons are plain JSON — the engine renders any file that follows the schema
([full schema](docs/05-lesson-json-schema.md)):

```json
{
  "id": "w1l1",
  "title": { "ur": "یہ کیا ہے؟", "en": "What Is This?" },
  "skill": { "ur": "کمپیوٹر کیا ہے", "en": "What a computer is" },
  "minutes": 7,
  "story": { "lines": [ { "ur": "…", "en": "…", "emote": "curious" } ] },
  "show":  { "steps": [ "…" ] },
  "do":    { "activity": "tap-select", "config": { } },
  "cheer": { "recap": [ "…" ] }
}
```

Adding World 2 means adding JSON files — **zero engine changes required.**

## Design Principles

1. **Assume nothing, speak everything** — kids can't read fluently yet, so audio carries the meaning
2. **Mistakes are bugs** — retry endlessly, always earn at least 1 star, celebrate the fix
3. **Dual coding** — "Mouse · ماؤس" pairs pictures with words in both languages
4. **One skill at a time** — 7 minutes max, then cheer
5. **Gentle by default** — cream background, no harsh white, photosensitivity-safe animation
6. **Child privacy first** — first name only, no ads, no external links, no tracking

## Roadmap

- [x] **Phase 1** — app shell, lesson engine, World 1 L1–L3, Teacher Hub v1 *(shipped)*
- [x] **Phase 2** — World 1 complete (L4–L6), World 2 *Mouse Meadow* all 10 lessons, 5 new activity engines (sequence, quiz, drag & drop, paint-by-tap, listen-and-point) *(shipped)*
- [ ] **Phase 3** — World 3 *Keyboard Kingdom*, Teacher Academy course, lab-wide sync over USB

## Contributing

The platform currently uses **code-drawn SVG art and placeholder audio** — see
[docs/07-asset-checklist.md](docs/07-asset-checklist.md) for the exact list of illustrations,
character sheets and Urdu voice recordings still needed. Artists and voice artists are very welcome.

## License

License to be decided by the project owner. © 2026 ROSHAN project.
