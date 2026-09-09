/**
 * Audio manager — "audio everywhere" (spec §3) with a 4-step fallback chain:
 *   1) recorded Urdu clip at /audio/<key>.mp3            (generated neural voices, offline)
 *   2) recorded Urdu clip at /audio/auto-<hash>.mp3      (hash of the text — covers unkeyed lines)
 *   3) on-device Urdu speech synthesis (if the OS provides a voice)
 *   4) visual-only "Bijli is speaking" bubble (never a silent failure)
 * Every screen can call speak(); the RepeatButton replays the last line.
 */

type SpeakOptions = { rate?: number };

let lastSpoken: { key?: string; ur?: string } = {};
let currentHtmlAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let slowVoice = false;

const listeners = new Set<() => void>();
export function onSpeakingChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function emit() {
  listeners.forEach((fn) => fn());
}

/** Called by the settings screen — children can choose a slower story voice. */
export function setSlowVoice(slow: boolean) {
  slowVoice = slow;
}

export function isSpeaking(): boolean {
  return currentUtterance !== null || currentHtmlAudio !== null;
}

/** Stop any current narration (used on navigation / story step change). */
export function stopSpeaking() {
  if (typeof window === "undefined") return;
  if (currentHtmlAudio) {
    currentHtmlAudio.pause();
    currentHtmlAudio = null;
  }
  if (typeof window.speechSynthesis !== "undefined") {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
  emit();
}

/* ---- device voice discovery (Chrome loads voices ASYNC — must warm up) ---- */
let voicesWarm = false;
let cachedVoices: SpeechSynthesisVoice[] = [];

function refreshVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  cachedVoices = window.speechSynthesis.getVoices() ?? [];
  if (cachedVoices.length > 0) voicesWarm = true;
}

if (typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined") {
  refreshVoices();
  // Chrome fires voiceschanged once voices arrive; Safari populates lazily too.
  window.speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
  // Belt & braces: poll briefly on engines that never fire the event.
  let polls = 0;
  const t = setInterval(() => {
    refreshVoices();
    if (voicesWarm || ++polls > 20) clearInterval(t);
  }, 250);
}

function pickVoice(prefer: "ur" | "hi" | "any"): SpeechSynthesisVoice | null {
  const low = cachedVoices.map((v) => ({ v, lang: (v.lang || "").toLowerCase() }));
  if (prefer === "ur" || prefer === "any") {
    const ur = low.find((x) => x.lang.startsWith("ur"));
    if (ur) return ur.v;
  }
  if (prefer === "hi" || prefer === "any") {
    const hi = low.find((x) => x.lang.startsWith("hi"));
    if (hi) return hi.v;
  }
  return null;
}

/** sha1(first 12 hex) of the text — matches scripts/build-tts-manifest.py auto keys. */
async function autoHashKey(text: string): Promise<string | null> {
  try {
    const subtle = globalThis.crypto?.subtle;
    if (!subtle) return null;
    const digest = await subtle.digest("SHA-1", new TextEncoder().encode(text.trim()));
    return (
      "auto-" +
      Array.from(new Uint8Array(digest))
        .slice(0, 6)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
    );
  } catch {
    return null;
  }
}

function playFile(key: string, done: () => void): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      if (!ok) currentHtmlAudio = null;
      resolve(ok);
    };
    try {
      const audio = new Audio(`/audio/${key}.mp3`);
      currentHtmlAudio = audio;
      audio.onended = () => {
        currentHtmlAudio = null;
        done(); // emits "stopped speaking" to listeners
        finish(true);
      };
      audio.onerror = () => finish(false);
      audio.play().catch(() => finish(false));
    } catch {
      finish(false);
    }
  });
}

/**
 * Speak a line: bundled clip (key) → bundled clip (text hash) → device TTS → visual beat.
 * Resolves when playback finishes (so story "Next" can wait for narration).
 */
export async function playAudio(
  key?: string,
  urText?: string,
  opts: SpeakOptions = {}
): Promise<void> {
  if (typeof window === "undefined") return;
  stopSpeaking();
  if (key || urText) lastSpoken = { key, ur: urText };
  emit();

  const done = () => {
    currentHtmlAudio = null;
    currentUtterance = null;
    emit();
  };

  // 1) recorded clip by key (story/show/prompt narration — generated, offline)
  if (key && (await playFile(key, done))) {
    return; // onended already cleared state
  }
  currentHtmlAudio = null;

  // 2) recorded clip by content hash (covers unkeyed hints/praises + inline lines)
  if (!key && urText) {
    const hk = await autoHashKey(urText);
    if (hk && (await playFile(hk, done))) {
      return;
    }
    currentHtmlAudio = null;
  }

  // 3) device speech synthesis — Urdu voice, else Hindi, else default voice with ur lang hint
  if (urText && typeof window.speechSynthesis !== "undefined") {
    refreshVoices();
    const urdu = pickVoice("ur");
    const hindi = urdu ?? pickVoice("hi");
    const u = new SpeechSynthesisUtterance(urText);
    if (hindi) {
      u.voice = hindi;
      u.lang = hindi.lang;
    } else {
      u.lang = "ur-PK"; // engine may still honor the language hint
    }
    u.rate = opts.rate ?? (slowVoice ? 0.72 : 0.9);
    u.pitch = 1.05;
    u.onend = done;
    u.onerror = done;
    currentUtterance = u;
    window.speechSynthesis.speak(u);
    return;
  }

  // 4) visual-only fallback: brief beat so UI pacing stays calm
  await new Promise((r) => setTimeout(r, Math.min(2600, 700 + (urText?.length ?? 10) * 45)));
  done();
}

/** Bijli REPEAT button — replays the last instruction/line. */
export async function repeatLast(): Promise<void> {
  await playAudio(lastSpoken.key, lastSpoken.ur);
}

export function getLastSpoken() {
  return lastSpoken;
}
