# ROSHAN — Data Model, Privacy & Recommended Stack

## Recommended stack (justification, as requested)

**Next.js 16 (App Router) + TypeScript + Tailwind CSS 4, built as an offline-first PWA with
Zustand for state and localStorage/IndexedDB for all data — no server database in Phase 1.**
React is the right call for ROSHAN because the entire product is a state machine of rich,
animated, audio-driven screens that must re-render smoothly on decade-old hardware; React's
declarative model keeps the lesson engine small (a renderer that walks JSON), and the huge
ecosystem gives us battle-tested PWA, storage and RTL tooling instead of home-grown bugs.
Next.js gives us file-based bundling, image/font optimization, and a one-command production
build (`next build`) that can be served from a single cheap box in the school lab — or even
fully static — while `next/font` self-hosts Noto Nastaliq Urdu and Fredoka so nothing is
fetched at runtime (hard requirement for offline). Tailwind keeps the design system
(doc 02) enforceable as tokens, and Zustand + a thin persistence layer gives auto-save /
resume for free. We deliberately avoid heavy engines (no Unity/3D, no video-heavy stacks):
flat SVG + CSS + WebAudio keeps the whole app a few MB, loads fast on 4 GB RAM Windows PCs
and low-end Android tablets, and SQLite-on-server is unnecessary because child privacy
demands data stay on the device.

## Data model (all client-side in Phase 1)

Stored in `localStorage` under `roshan.v1.*` (small JSON; IndexedDB upgrade path documented
below). Written on every state change + 30 s heartbeat → power-cut safe.

```ts
// ---- profiles (child) ----
interface Profile {
  id: string;                 // uuid
  name: string;               // FIRST NAME ONLY (privacy rule)
  avatarColor: string;        // starter outfit pick
  createdAt: number;
  buddyName?: string;         // pair mode navigator (first name only)
  pairMode: boolean;

  progress: Record<string, LessonProgress>;   // key = lessonId
  current: { world: number; lesson: string; phase: Phase; step: number } | null; // resume point
  stars: Record<string, number>;               // lessonId → best stars 1-3
  bugsFixed: number;                           // lifetime "bugs" celebrated
  badges: string[];                            // e.g. "dosti-ka-safar"
  stickers: string[];                          // lessonId stickers
  outfits: string[];                           // unlocked cosmetics
  helperMode: boolean;                         // "Computer Hero" for fast finishers
  brainGym: { tier: number; streak: number; lastPlayedDay?: string; weeklyBest?: number };
  settings: { music: boolean; sfx: boolean; slowVoice: boolean };
  streak: { lastActiveDay?: string; count: number };   // personal-best streaks only
  minutesOnTask: number;
}

interface LessonProgress {
  completed: boolean;
  attempts: number;           // sessions that opened it (drives teacher "stuck" alerts)
  bestStars: number;
  bugsFixed: number;
  lastPhase: Phase;           // story|show|do|cheer
  lastStep: number;           // resume position
  minutes: number;            // time-on-task
  updatedAt: number;
}

// ---- device ----
interface DeviceSettings { music: boolean; sfx: boolean; }
interface TeacherAuth { pinHash: string; }    // teacher sets PIN on first login (stored hashed)
```

- **No accounts, no server, no PII beyond first name.** Profiles never leave the device in Phase 1.
- Phase 2 sync design: append-only progress events exported as signed JSON blobs; a school
  server (or USB sneakernet!) merges them; teacher dashboard aggregates. Documented for later.

## Keys & layout
`roshan.v1.profiles` → `Profile[]` · `roshan.v1.activeProfile` → id ·
`roshan.v1.device` → DeviceSettings · `roshan.v1.teacher` → TeacherAuth

## IndexedDB upgrade path
Same objects, one object-store `kv`. The storage module (`src/lib/storage.ts`) already
isolates read/write behind an interface, so swapping backends touches one file.

## Content pipeline
`src/content/**/*.json` → imported statically (type-checked against `src/lib/schema.ts`).
Adding a lesson = add JSON + optionally plan JSON. Engine auto-registers it on the map.

## Performance budget (old PCs!)
- First load ≤ 4 MB (fonts ~1.8 MB Nastaliq, rest code+SVG), interactive ≤ 3 s on spinny disk.
- Animations: CSS transforms only; no per-frame JS layout; images inline SVG.
- Audio: tiny procedural SFX/music (WebAudio), narration files loaded on demand.
- 60 fps target with ≤ 30 DOM-animated nodes per screen; confetti ≤ 40 pieces.
