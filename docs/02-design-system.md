# ROSHAN — Design System ("Warm Village Storybook")

> Feel: a Pakistani storybook come to life. Flat, rounded, soft-edged, warm. Khan Academy Kids /
> Duolingo ABC energy, but rooted in village Punjab imagery. Everyone smiles. Nothing scary.

---

## 1. Color tokens

| Token | Hex | Role |
|---|---|---|
| `--cream` | `#FFF8EC` | Base background — NEVER pure white |
| `--ink` | `#4A3421` | Primary text (warm dark brown, softer than black) |
| `--ink-soft` | `#8A7156` | Secondary text |
| `--orange` | `#F59E0B` | Primary action (Go / Start / Next) |
| `--orange-deep` | `#D97706` | Primary pressed / outline |
| `--teal` | `#0D9488` | Nature/fields, secondary action |
| `--sky` | `#38BDF8` | Information, hints, water |
| `--pink` | `#EC4899` | Rewards, hearts, celebration |
| `--green` | `#22C55E` | Success |
| `--sun` | `#FDE68A` | Highlights, Bijli's glow |
| `--card` | `#FFFFFF` with `4px` warm border `#F3E5C8` | Card surfaces |
| `--lock` | `#B9AC98` | Locked/dimmed |

**World color identities** (map medallion + lesson node + accents inside that world):

| World | Color | Motif |
|---|---|---|
| W1 Pehli Mulaqat | `#F59E0B` orange | storeroom box, first friendship |
| W2 Mouse Ka Maidan | `#22C55E` meadow green | bubbles, butterflies, flowers |
| W3 Keyboard Ki Kingdom | `#8B5CF6` purple | castle with key-shaped flags |
| W4 Control City | `#3B82F6` city blue | windows, folders, buildings |
| W5 Creative Workshop | `#EC4899` mela magenta | ferris wheel, paint splashes |
| W6 Internet Bazaar | `#0D9488` teal bazaar | stalls, shields, lanterns |
| W7 Logic Jungle | `#166534` jungle green | vines, gems, maze paths |
| W8 Story Mountain | `#D97706` golden mountain | flag on summit, stars |

## 2. Typography

| Use | Font | Size | Notes |
|---|---|---|---|
| Urdu headings & body | **Noto Nastaliq Urdu** | 22–40 px | `line-height: 2` — Nastaliq descenders collide otherwise |
| English / UI terms | **Fredoka** (rounded) | 18–32 px | weight 500–600 |
| Computer terms | Both, side-by-side | — | dual-coding pattern: `Mouse — ماؤس` |
| Numbers | Fredoka (always LTR) | — | wrap in `<bdi>` / `dir="ltr"` where inline |

Hard rules:
- Minimum body size **20 px**; child-facing text ≥ 22 px.
- Urdu blocks always `line-height ≥ 2`, never justified.
- Key words get **color + audio**: tapping any highlighted term speaks it.

## 3. Shape, spacing, elevation

- Corner radius: buttons **16 px**, cards **24 px**, medallions **full circle**.
- Touch targets ≥ **64×64 px**, ≥ 12 px apart.
- Outlines: 3 px solid ink-toned borders on interactive elements (storybook ink look).
- Shadows: soft, warm (`0 6px 0 rgba(74,52,33,.12)` "chunky storybook" bottom shadow).
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48.

## 4. Components (Phase 1 implemented in code)

| Component | Spec |
|---|---|
| `BigButton` | min-h 64, radius 16, 3px outline, icon 32px + Urdu label 24px; variants: `go` (orange), `back` (cream/teal outline), `reward` (pink), `success` (green) |
| `RepeatButton` | Bijli face, 64px, fixed corner of every screen; replays last spoken line |
| `LessonNode` | 72px circle on mini-path; states: locked (soft grey + wooden lock), current (pulse ring), done (stars ×3) |
| `StarRow` | 1–3 SVG stars, pop-in stagger 120 ms, soft bounce |
| `BugBanner` | zero-failure feedback: teal band, Bijli icon, "Ooops! Ek bug mila!" + hint; no red, no X, no sad sound |
| `HintHand` | translucent pointing hand, gentle 2 s loop, appears after 2 stalls |
| `SwapOverlay` | full-screen, Noor & Chotu swap sides, 15 s ring countdown, confetti |
| `ConfettiBurst` | ≤ 40 paper pieces, 1.2 s, no strobe |
| `ProgressDots` | 4 phase dots (STORY·SHOW·DO·CHEER), RTL-ordered |
| `AlertDialog` (child) | always icon + spoken Urdu + one big button |

## 5. Motion & photosensitivity

- Everything gentle: 250–400 ms ease-out; idle loops 2–3 s.
- No flashing faster than 3 Hz, no full-screen strobe, confetti is matte paper (no glare).
- Celebrations: confetti + character jump + star pop (≤ 2.5 s total, skippable by tap).

## 6. Sound

- Background music: soft loop — light **tabla pulse + rubab-style plucks**, generated
  procedurally with WebAudio (0 KB download), toggleable, default **on at low volume**.
- SFX: pop (correct), soft "bzzt-boop" (bug found — curious, never harsh), fanfare (badge),
  page whoosh. All ≤ −14 LUFS, calm pacing.
- Voice: warm female/male alternate per character; rate ≤ 0.95; pause between lines.

## 7. RTL & localization

- Root `dir="rtl"`, `lang="ur"`. Layout, path direction, progress dots flow right→left.
- English terms & numbers embed LTR (`dir="ltr"` inline spans).
- All lesson text lives in JSON as `{ ur, en }` pairs; UI chrome ships bilingual labels
  (Urdu primary, English small secondary for teacher awareness).

## 8. Accessibility

- Every interactive element: 64 px target, focus ring 3 px, operable by mouse OR touch.
- Audio-first: nothing requires reading; text is dual-coding support, not a requirement.
- No time pressure anywhere (timers only for pair-swap and optional bonus).
- Color never the only signal (icon + label + spoken).
