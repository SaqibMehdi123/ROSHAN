/**
 * Procedural sound engine (0 KB downloads — hard requirement on slow connections).
 * - SFX: pop (correct), boop (bug found — curious, never harsh), fanfare (badge), whoosh.
 * - Background music: gentle tabla-ish pulse + rubab-style pentatonic plucks,
 *   toggleable, very low volume. All WebAudio, photosensitivity-safe pacing.
 */

let ctx: AudioContext | null = null;
let musicTimer: ReturnType<typeof setInterval> | null = null;
let musicOn = false;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function pluck(freq: number, at: number, dur = 0.5, vol = 0.12) {
  const c = ac();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  const filter = c.createBiquadFilter();
  osc.type = "sawtooth";
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1400, at);
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(vol, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(filter).connect(gain).connect(c.destination);
  osc.start(at);
  osc.stop(at + dur + 0.05);
}

function softDrum(at: number, vol = 0.1) {
  const c = ac();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(160, at);
  osc.frequency.exponentialRampToValueAtTime(60, at + 0.12);
  gain.gain.setValueAtTime(vol, at);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.16);
  osc.connect(gain).connect(c.destination);
  osc.start(at);
  osc.stop(at + 0.2);
}

// A minor pentatonic — calm, folk-friendly
const SCALE = [220, 261.6, 293.7, 329.6, 392, 440, 523.2];
let step = 0;

/** Gentle background loop: one pluck per beat, soft drum every 2 beats. */
export function startMusic() {
  const c = ac();
  if (!c || musicTimer) return;
  musicOn = true;
  const beat = () => {
    if (!musicOn) return;
    const t = c.currentTime;
    if (step % 2 === 0) softDrum(t);
    const n = SCALE[(Math.floor(Math.random() * SCALE.length) + (step % 2 === 0 ? 0 : 2)) % SCALE.length];
    pluck(n, t + 0.05, 0.6, 0.055);
    step++;
  };
  beat();
  musicTimer = setInterval(beat, 700);
}

export function stopMusic() {
  musicOn = false;
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}

export function setMusic(on: boolean) {
  if (on) startMusic();
  else stopMusic();
}

// ---------------- SFX ----------------

export const sfx = {
  pop() {
    const c = ac();
    if (!c) return;
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.09);
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    osc.connect(gain).connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.16);
  },
  /** Gentle rising two-note happy beep (Bijli). */
  happyBeep() {
    const c = ac();
    if (!c) return;
    const t = c.currentTime;
    [[660, 0], [880, 0.12]].forEach(([f, d]) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t + d);
      gain.gain.setValueAtTime(0.1, t + d);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.15);
      osc.connect(gain).connect(c.destination);
      osc.start(t + d);
      osc.stop(t + d + 0.18);
    });
  },
  /** Curious descending boop for "bug found" — soft, never punishing. */
  bugBoop() {
    const c = ac();
    if (!c) return;
    const t = c.currentTime;
    [[520, 0], [392, 0.14], [330, 0.28]].forEach(([f, d]) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t + d);
      gain.gain.setValueAtTime(0.09, t + d);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.18);
      osc.connect(gain).connect(c.destination);
      osc.start(t + d);
      osc.stop(t + d + 0.2);
    });
  },
  fanfare() {
    const c = ac();
    if (!c) return;
    const t = c.currentTime;
    [261.6, 329.6, 392, 523.2].forEach((f, i) => {
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t + i * 0.14);
      gain.gain.setValueAtTime(0.12, t + i * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.14 + 0.35);
      osc.connect(gain).connect(c.destination);
      osc.start(t + i * 0.14);
      osc.stop(t + i * 0.14 + 0.4);
    });
  },
  whoosh() {
    const c = ac();
    if (!c) return;
    const t = c.currentTime;
    const buf = c.createBuffer(1, c.sampleRate * 0.25, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = c.createBufferSource();
    const gain = c.createGain();
    const filter = c.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, t);
    src.buffer = buf;
    gain.gain.value = 0.06;
    src.connect(filter).connect(gain).connect(c.destination);
    src.start(t);
  },
};

export function playSfx(name: keyof typeof sfx, enabled: boolean) {
  if (!enabled) return;
  sfx[name]();
}
