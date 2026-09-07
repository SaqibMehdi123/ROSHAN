/**
 * Audio manager — "audio everywhere" (spec §3) with a 3-step fallback chain:
 *   1) recorded Urdu clip at /audio/<key>.mp3  (asset checklist: docs/07)
 *   2) on-device Urdu speech synthesis (if the OS provides a voice)
 *   3) visual-only "Bijli is speaking" bubble (never a silent failure)
 * Every screen can call speak(); the RepeatButton replays the last line.
 */

type SpeakOptions = { rate?: number; onVisualBubble?: boolean };

let lastSpoken: { key?: string; ur?: string } = {};
let currentHtmlAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

const listeners = new Set<() => void>();
export function onSpeakingChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function emit() {
  listeners.forEach((fn) => fn());
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

function findUrduVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith("ur")) ?? // ur-PK / ur-IN
    voices.find((v) => v.lang?.toLowerCase().startsWith("hi")) ?? // closest neighbor
    null
  );
}

/**
 * Speak a line: recorded file first, then device TTS, else visual-only.
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

  // 1) recorded clip
  if (key) {
    try {
      const audio = new Audio(`/audio/${key}.mp3`);
      currentHtmlAudio = audio;
      await audio.play().catch(() => {
        currentHtmlAudio = null;
        return Promise.reject(new Error("no-file"));
      });
      audio.onended = done;
      audio.onerror = done;
      return;
    } catch {
      currentHtmlAudio = null; // fall through to TTS
    }
  }

  // 2) device speech synthesis (any Urdu/Hindi voice, slowed for children)
  const voice = findUrduVoice();
  if (voice && urText) {
    const u = new SpeechSynthesisUtterance(urText);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = opts.rate ?? 0.9;
    u.onend = done;
    u.onerror = done;
    currentUtterance = u;
    window.speechSynthesis.speak(u);
    return;
  }

  // 3) visual-only fallback: brief beat so UI pacing stays calm
  if (opts.onVisualBubble !== false) {
    await new Promise((r) => setTimeout(r, Math.min(2600, 700 + (urText?.length ?? 10) * 45)));
  }
  done();
}

/** Bijli REPEAT button — replays the last instruction/line. */
export async function repeatLast(): Promise<void> {
  await playAudio(lastSpoken.key, lastSpoken.ur);
}

export function getLastSpoken() {
  return lastSpoken;
}
