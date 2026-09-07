# ROSHAN — Sitemap & Information Architecture

> Version 1.0 · Phase 1
> Student app = a world you walk through. Teacher hub = a calm control room.
> Navigation rule for children: **the Adventure Map IS the navigation.** No menus, no lists, no URLs to type.

---

## 1. STUDENT APP (Child side)

The student app is a single offline PWA built as an internal state machine (screens), because
children never type addresses. Every screen below is a *view state*, not a separate URL.

```
ROSHAN Student App
│
├── 0. WELCOME GATE (first run only)
│     ├── Bijli says hello (spoken Urdu) → "Aap ka naam kya hai?" (first name ONLY)
│     ├── Pick an avatar color + starter outfit
│     ├── PAIR MODE setup (optional): buddy's first name → Driver/Navigator explained by animation
│     └── Lab rules mini-reminder (3 taps, spoken)  [privacy: no surname, no age, no photo]
│
├── 1. ADVENTURE MAP  ★ HOME — the only "menu"
│     ├── Winding path through 8 Lands (right→left, RTL reading direction)
│     │     ├── Completed lands = bright + banner
│     │     ├── Current land = glowing + Noor & Bijli standing on it (animated idle wave)
│     │     └── Locked lands = greyed + friendly wooden lock, Bijli says "Pehle agla kamra khatam karo!"
│     ├── Resume card (auto-appears): "Wahan se shuru karo jahan tum ruke thay" → jumps to saved phase
│     ├── BRAIN GYM door (daily 3–5 min warm-up; shakes gently if not done today)
│     ├── My Trophy Shelf button → Album
│     ├── Dost (Cast) button → Character Cast
│     └── Settings (child-safe): music on/off, sounds on/off, repeat-voice speed
│
├── 2. WORLD VIEW (tap a land)
│     ├── Land welcome card: world color theme, story-so-far (spoken), badge preview
│     ├── Lesson nodes on a mini-path: done (stars shown) / current (pulsing) / locked (soft)
│     └── "Jald aa raha hai!" nodes for lessons not yet published (Phase 1: W1 L4–L6)
│
├── 3. LESSON PLAYER (any lesson; engine-driven from JSON)
│     ├── HUD: home · Bijli-REPEAT button (every screen) · 4-phase dots · star count · SWAP timer (pair mode)
│     ├── STORY phase → scene-by-scene dialog (Next = big tap anywhere; each line spoken + subtitled)
│     ├── SHOW phase → animated demonstration (no reading needed; Bijli/Noor perform the skill)
│     ├── DO phase → interactive activity (hint hand after 2 stalls; infinite gentle retries)
│     │     ├── Scaffold levels inside DO: demo replay → guided (hint hand) → independent → BONUS challenge
│     │     └── Every wrong tap = "bug found & fixed" (positive counter), never an error state
│     └── CHEER phase → confetti + specific Urdu praise + Ustaad Ulloo 2-line recap + stars/badge award
│
├── 4. BRAIN GYM (door on map)
│     ├── Daily rotating 3–5 min warm-up (mixes 2 previously-learned skills)
│     ├── Adaptive difficulty: 3 successes in a row → tier up (personal, never shown vs. others)
│     └── Weekly "Brain Champion" challenge → personal-best streak badge
│
├── 5. ALBUM (Trophy Shelf)
│     ├── Badges earned per world (8 slots)
│     ├── Sticker album pages (children re-arrange stickers, tap to hear names)
│     ├── Avatar outfits unlocked (star thresholds)
│     └── "Computer Hero" helper-mode ribbon (unlocks for fast finishers)
│
├── 6. CHARACTER CAST (Dost screen)
│     └── Tap any character → wave animation + spoken intro + catchphrase (audio-first)
│
└── 7. SETTINGS (music, SFX, voice repeat speed, pair-mode names, teacher zone entry)
      └── TEACHER ZONE → hand-off to Teacher Hub (PIN protected, child cannot enter)
```

### Pair Mode (cross-cutting)
- Setup at profile creation; toggle in settings.
- During any lesson: 10-minute friendly timer → full-screen **SWAP!** animation (Noor & Chotu
  swap sides, confetti, spoken "Ab dost ko mauka do!") → 15-second gentle countdown → continue.
- Manual "SWAP NOW" button always visible in HUD.
- Activities are tap-first (works with mouse OR touch), so the *navigator* points & talks,
  the *driver* clicks — both remain physically possible on one PC.

### Offline & Safety rules applied to IA
- Every asset cached on first load (service worker). No screen ever requires network.
- No external links, no chat, no ads anywhere in the child-side tree.
- Auto-save: progress written on every phase change + heartbeat every 30 s; power cut = resume card.

---

## 2. TEACHER HUB (second product, same device or teacher's phone)

```
ROSHAN Teacher Hub (PIN login)
│
├── 1. DASHBOARD (Phase 1: local device data)
│     ├── Class overview: # students active today, avg stars, total bugs-fixed (reframed mistakes)
│     ├── Per-student cards: current land, lessons done, stars, time-on-task, last session
│     ├── ALERTS: "Ali has been stuck on 'double click' for 3 sessions" + suggested intervention
│     └── Export progress CSV (opens in Excel; works offline, saved locally)
│
├── 2. LESSON PLANS (one per student lesson; Phase 1 ships W1 L1–L3)
│     ├── 5-minute prep checklist (plug, charge, open ROSHAN, chairs in pairs)
│     ├── Exact read-aloud script (simple Urdu-friendly English + Urdu lines)
│     ├── What to demo on the big screen
│     ├── Common kid mistakes → how to fix each (table)
│     ├── Exercise answers
│     └── NO-ELECTRICITY alternative (unplugged version of the same lesson)
│
├── 3. TEACHER ACADEMY (Phase 2 content, Phase 1 shell)
│     ├── Course 1: "Your first week with a computer" (for the teacher, absolute beginner)
│     ├── Course 2: Facilitation, not lecturing — run pair mode, praise bugs as debugging
│     └── Short videos/animations with Urdu narration (placeholder slots Phase 1)
│
├── 4. OFFLINE KIT (printables; Phase 1 ships 3 samples)
│     ├── Flashcards: computer parts (Urdu+English, big pictures)
│     ├── Keyboard letter cards (A=Amrood …)
│     ├── Wall posters: Lab Rules · Safety Superpowers · PLAN-TRY-CHECK-FIX
│     └── Unplugged Logic Jungle (board-game versions of every W7 lesson) [Phase 2 full set]
│
├── 5. READING ROOM (short guides, simply written)
│     ├── How young children learn logic
│     ├── Healthy screen time (and the 20-20-20 rule)
│     ├── Good questions to ask while kids work
│     └── Managing a small computer lab with limited electricity
│
├── 6. PARENT NOTES (printable Urdu letters home)
│     └── Auto-generated per world: "Aap ke bache ne X seekha…" + safe home practice ideas
│
└── 7. SESSION PLANNER
      ├── 40-minute template: 5 story → 10 demo → 20 hands-on in pairs → 5 recap
      └── Drag lesson chips onto a week grid [Phase 2]
```

### Teacher data flows
- Child progress lives on the child device (privacy). Teacher dashboard reads **the same
  device's** local database when the teacher logs in on that machine (typical lab setup:
  1 PC = 2 children = 1 teacher login slot), and merges from other lab PCs when network
  returns (Phase 2 sync service).
- CSV export includes: name, world, lesson, stars, bugs-fixed, minutes, last-active, alerts.

---

## 3. Screen inventory (Phase 1 implemented)

| # | Screen | State | Spoken audio | Notes |
|---|--------|-------|--------------|-------|
| 1 | Welcome gate (profile create) | first run | ✔ | first name only |
| 2 | Adventure map | home | ✔ on land tap | resume card, Brain Gym door |
| 3 | World view (W1) | navigation | ✔ | L1–L3 playable, L4–L6 "coming" |
| 4 | Lesson player ×3 phases×4 | core loop | ✔ every line | pair SWAP overlay |
| 5 | Brain Gym | warm-up | ✔ | 2 puzzle banks Phase 1 |
| 6 | Album | rewards | ✔ | badges, stickers, outfits |
| 7 | Cast | delight | ✔ | 5 characters |
| 8 | Teacher login → dashboard → plans → printables | teacher | ✖ (reading) | CSV export works |
