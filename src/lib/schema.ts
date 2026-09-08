/**
 * ROSHAN lesson-content schema (v1) — mirrors docs/05-lesson-json-schema.md
 * All lesson content lives in JSON; the Lesson Engine renders any lesson from these types.
 * Adding a lesson = adding a JSON file + one line in content.ts registry.
 */

export type Bilingual = { ur: string; en: string };

export type CharacterId = "noor" | "chotu" | "bijli" | "golmatol" | "ustad-ullo" | "narrator";

/** A spoken, subtitled story line. */
export interface StoryLine {
  char: CharacterId;
  emote?: string; // pose/animation id from the art registry
  ur: string;
  en: string;
  audio: string; // key under public/audio/<key>.mp3 (fallback chain in audio.ts)
  fx?: "sparkle" | "beep" | "shake" | "confetti";
  /** Optional hero moment: a big button the child taps to accept the mission. */
  choice?: Bilingual & { audio: string };
}

export interface StoryScene {
  bg: string; // art id (bg-storeroom, bg-village-street…)
  props?: string[];
  cast: CharacterId[];
  lines: StoryLine[];
}

/** SHOW phase — demonstration without reading. */
export interface ShowStep {
  visual: string; // art/animation id
  caption: Bilingual;
  audio: string;
}

// ---------------- Activity types (discriminated union) ----------------

export interface TapSelectItem {
  id: string;
  x: number; // % position inside the scene (RTL-aware; authoring uses right→left flow)
  y: number;
  art: string;
  correct: boolean;
  hint: Bilingual; // shown on wrong tap (bug) or right tap (praise detail)
  audio?: string;
  clicks?: number; // taps/clicks needed (default 1 → double-click lessons use 2)
  move?: boolean; // gentle drift animation (butterflies) — photosensitivity-safe slow sway
  glow?: boolean; // hover also counts (mouse-move practice); tap always counts (touch)
}

export interface TapSelectActivity {
  type: "tap-select";
  prompt: Bilingual;
  audio: string;
  scene: string;
  items: TapSelectItem[];
  winPraise: Bilingual;
  cursorArt?: string; // if set, a big pointer-following friend (e.g. "teer") trails the mouse
  clickHint?: Bilingual; // coaching line for mistimed double-clicks (not counted as a bug)
}

export interface MatchItem {
  id: string;
  art: string;
  name: Bilingual;
}

export interface MatchSlot {
  id: string;
  accepts: string; // item id
  art: string;
  label: Bilingual;
  success: Bilingual; // spoken when correct part is placed
  audio?: string;
}

export interface MatchSlotsActivity {
  type: "match-slots";
  prompt: Bilingual;
  audio: string;
  items: MatchItem[];
  slots: MatchSlot[];
  wrongHint: Bilingual;
  /** Custom panel headings (default: W1L2 "Bijli ke juzu" wording). */
  panelTitles?: { left: Bilingual; right: Bilingual };
  /** Render slots in a single keyboard-like row (home-row lesson). */
  row?: boolean;
}

export interface SortBin {
  id: string;
  label: Bilingual;
  art: string;
}

export interface SortCard {
  id: string;
  art: string;
  text: Bilingual;
  bin: string; // correct bin id
  explain: Bilingual; // spoken after sorting (both right & bug)
}

export interface SortBinsActivity {
  type: "sort-bins";
  prompt: Bilingual;
  audio: string;
  bins: SortBin[];
  cards: SortCard[];
  wrongHint: Bilingual;
}

export interface SeqStep {
  id: string;
  art: string;
  label: Bilingual;
  audio?: string;
}

export interface TapSequenceActivity {
  type: "tap-sequence";
  prompt: Bilingual;
  audio: string;
  steps: SeqStep[]; // shuffled by engine
  order: string[]; // correct order of ids
  wrongHint: Bilingual;
}

// ---- Phase 2 activity types (World 1 L4–L6 + World 2) ----

export interface QuizOption {
  id: string;
  art?: string;
  label: Bilingual;
}

export interface QuizQuestion {
  id: string;
  art: string; // question illustration
  question: Bilingual;
  audio: string;
  options: QuizOption[];
  answer: string; // correct option id
  explain: Bilingual; // spoken after answering (right or bug)
}

/** Sequential review quiz (world finales) — one question at a time, retry until right. */
export interface QuizMixActivity {
  type: "quiz-mix";
  prompt: Bilingual;
  audio: string;
  questions: QuizQuestion[];
  wrongHint: Bilingual;
}

export interface DraggableItem {
  id: string;
  art: string;
  x: number; // % spawn position inside the scene (RTL-aware)
  y: number;
  audio?: string; // spoken when grabbed
}

export interface DropTarget {
  id: string;
  art: string;
  x: number;
  y: number;
  accepts: string[]; // draggable ids this target can receive
  capacity?: number; // how many items it holds (default: accepts.length)
  success: Bilingual; // spoken when an item lands
  label?: Bilingual;
}

/** Drag & drop with pointer events + tap-pick/tap-place fallback for touch. */
export interface DragDropActivity {
  type: "drag-drop";
  prompt: Bilingual;
  audio: string;
  scene: string;
  draggable: DraggableItem[];
  targets: DropTarget[];
  wrongHint: Bilingual;
  winPraise: Bilingual;
}

export interface PaintPot {
  id: string;
  color: string;
  name: Bilingual;
}

export interface PaintZone {
  id: string;
  x: number; // % rect inside the composition
  y: number;
  w: number;
  h: number;
  round?: boolean; // fully rounded (sun, tree crown…)
  colorId: string; // expected pot id
}

/** Color-by-tap: pick a pot, tap a zone (tap-select precision practice). */
export interface PaintZonesActivity {
  type: "paint-zones";
  prompt: Bilingual;
  audio: string;
  palette: PaintPot[];
  zones: PaintZone[];
  wrongHint: Bilingual;
  winPraise: Bilingual;
}

export interface NamedTarget {
  id: string;
  art: string;
  x: number;
  y: number;
  name: Bilingual;
  audio?: string;
}

/** Listen-then-point: engine names one target per round, child taps it. */
export interface FindNamedActivity {
  type: "find-named";
  prompt: Bilingual;
  audio: string;
  scene: string;
  targets: NamedTarget[]; // shuffled per round by the engine
  wrongHint: Bilingual;
  winPraise: Bilingual;
}

// ---- Phase 3 activity types (World 3 — Keyboard Kingdom) ----

/** One thing to type: a single letter, a digit, a word, or the child's own name. */
export interface TypeTarget {
  id: string;
  expect: string; // Latin chars/digits the child must produce, e.g. "A", "BAT", "3"
  label: Bilingual; // what/why — spoken + shown (e.g. "Amrood — A se Amrood!")
  art?: string; // illustration for the target
  audio?: string; // spoken when the target appears
  /** Digit targets: show exactly this many mangoes to count (W3L11). */
  count?: number;
  /** Finale: type the child's own first name (resolved from profile). */
  useProfileName?: boolean;
  /** Fix-it targets: slots start pre-filled with these (some wrong) — erase & retype. */
  preFilled?: string;
}

/**
 * Typing engine — works on BOTH input devices:
 * - physical keyboard (window keydown)
 * - big on-screen keycaps (low-end Android tablets have no keyboard)
 * Letters fill leftmost empty-or-wrong slot; backspace erases the leftmost
 * wrong slot (magic eraser); enter confirms words. Wrong press = bug + coaching.
 */
export interface TypeInputActivity {
  type: "type-input";
  prompt: Bilingual;
  audio: string;
  keys: string[]; // keycaps shown on the on-screen keyboard, e.g. ["A","B","C"]
  targets: TypeTarget[];
  eraser?: boolean; // show the magic-eraser (Backspace) keycap
  enter?: boolean; // show the ENTER keycap; words need "ho gaya!" confirmation
  space?: boolean; // show the SPACE keycap (magic carpet between words)
  bubble?: boolean; // letter-bubble mode: press the key OR tap the floating bubble
  wrongHint: Bilingual;
  winPraise: Bilingual;
}

export interface CatchLetter {
  id: string;
  char: string; // the letter/digit that falls, e.g. "D"
  label: Bilingual; // spoken when caught ("D — Dhol!")
  art?: string; // optional friend shown inside the falling card
  audio?: string;
}

/**
 * Falling-letter catch — letters drift down SLOWLY (photosensitivity-safe).
 * Catch = press the matching key (physical or on-screen) OR tap the letter itself.
 * A letter reaching the bottom softly floats back up — never lost, never a failure.
 */
export interface CatchFallingActivity {
  type: "catch-falling";
  prompt: Bilingual;
  audio: string;
  scene: string; // background art id (bg-castle…)
  letters: CatchLetter[]; // pool the engine draws each round from (seeded)
  rounds: number; // catches needed to win
  winPraise: Bilingual;
  wrongHint: Bilingual;
}

export type Activity =
  | TapSelectActivity
  | MatchSlotsActivity
  | SortBinsActivity
  | TapSequenceActivity
  | QuizMixActivity
  | DragDropActivity
  | PaintZonesActivity
  | FindNamedActivity
  | TypeInputActivity
  | CatchFallingActivity;

// ---------------- Lesson root ----------------

export type Phase = "story" | "show" | "do" | "cheer";

export interface Lesson {
  id: string; // w1l1
  schemaVersion: number;
  world: number;
  order: number;
  title: Bilingual;
  skill: Bilingual;
  skillKey: string; // stable key for spaced review
  minutes: number;
  badge?: string;
  praise: Bilingual;

  story: { scenes: StoryScene[] };
  show: { steps: ShowStep[] };
  do: { activity: Activity };
  cheer: { recap: [Bilingual, Bilingual]; recapAudio: [string, string]; rewardToast: Bilingual };
  bonus?: { activity: Activity };
}

// ---------------- Worlds / characters / brain gym ----------------

export interface WorldDef {
  id: number;
  name: Bilingual;
  color: string;
  motif: string;
  badgeId: string;
  badgeName: Bilingual;
  lessonCount: number;
  lessonsReady: number; // how many lessons are playable (Phase 1: W1 → 3, Phase 2: W1 → 6 + W2 → 10)
  arcSummary: Bilingual;
}

export interface CharacterDef {
  id: CharacterId;
  name: Bilingual;
  role: Bilingual;
  catchphrase: Bilingual;
  introAudio: string;
  color: string;
}

export interface BrainGymPuzzle {
  id: string;
  bank: "pattern-next" | "odd-one-out" | "sequence-order";
  tier: number; // 1..3 (adaptive difficulty)
  art: string;
  prompt: Bilingual;
  audio: string;
  series?: { art: string }[]; // pattern-next: shown series (last = ?)
  options: { id: string; art: string; label?: Bilingual }[];
  answer: string;
  explain: Bilingual;
}

// ---------------- Progress (docs/06) ----------------

export interface LessonProgress {
  completed: boolean;
  attempts: number;
  bestStars: number;
  bugsFixed: number;
  lastPhase: Phase;
  lastStep: number;
  minutes: number;
  updatedAt: number;
}

export interface Profile {
  id: string;
  name: string; // FIRST NAME ONLY
  avatarColor: string;
  createdAt: number;
  buddyName?: string;
  pairMode: boolean;

  progress: Record<string, LessonProgress>;
  current: { world: number; lesson: string; phase: Phase; step: number } | null;
  stars: Record<string, number>;
  bugsFixed: number;
  badges: string[];
  stickers: string[];
  outfits: string[];
  helperMode: boolean;
  brainGym: { tier: number; streak: number; lastPlayedDay?: string; weeklyBest?: number };
  settings: { music: boolean; sfx: boolean; slowVoice: boolean };
  streak: { lastActiveDay?: string; count: number };
  minutesOnTask: number;
}
