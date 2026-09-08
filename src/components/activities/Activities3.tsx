/**
 * ROSHAN Phase 3 activities — World 3 "Keyboard Kingdom".
 * New engine types: type-input (typing on physical keyboard OR big on-screen
 * keycaps) and catch-falling (letters drift down slowly; catch by key or tap).
 * Same contract as the other engines: zero-failure scaffolding, spoken Urdu,
 * infinite retries, "bugs" counted positively, glowing hints after stalls.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  Bilingual,
  CatchFallingActivity,
  TypeInputActivity,
  TypeTarget,
} from "@/lib/schema";
import { Art } from "@/components/art/Props";
import { BugBanner } from "@/components/ui-kids/KidKit";
import { useApp, useActiveProfile } from "@/lib/store";
import { playAudio, stopSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";
import { KeyBoard, usePhysicalKeys, type KeyAction } from "./KeyBoard";
import { seedOf, seededShuffle } from "./Activities2";

interface CommonProps {
  activity: import("@/lib/schema").Activity;
  onWin: () => void;
  hintHandAfter?: number;
}

function useBugFeedback() {
  const addBug = useApp((s) => s.addBug);
  const [banner, setBanner] = useState<Bilingual | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showBug = (hint: Bilingual) => {
    addBug();
    setBanner(hint);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setBanner(null), 4200);
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return { banner, showBug };
}

function Prompt({ prompt, audio }: { prompt: Bilingual; audio: string }) {
  return (
    <div className="mb-4 text-center">
      <p className="urdu text-2xl font-bold" key={prompt.ur}>{prompt.ur}</p>
      <p className="ltr-term mt-1 text-sm text-roshan-ink-soft" dir="ltr">{prompt.en}</p>
      <button
        className="ltr-term mt-1 text-xs text-roshan-teal underline"
        onClick={() => void playAudio(audio, prompt.ur)}
      >
        sunno dobara (replay instruction)
      </button>
    </div>
  );
}

function resolveTargetExpect(t: TypeTarget, profileName: string): string {
  if (!t.useProfileName) return t.expect;
  const latin = profileName.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 10);
  return latin.length >= 2 ? latin : "ROSHAN";
}

/** Initial slot fill for a target: preFilled chars (some wrong), rest empty. */
function initSlots(t: TypeTarget | undefined, expect: string): (string | null)[] {
  return (t?.preFilled ?? "")
    .padEnd(expect.length, "\u0000")
    .slice(0, expect.length)
    .split("")
    .map((c) => (c === "\u0000" ? null : c));
}

/* ============================ TYPE INPUT ============================ */
export function TypeInputActivity({ activity, onWin }: CommonProps) {
  const a = activity as TypeInputActivity;
  const profile = useActiveProfile();
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);

  // resolved expects (profile name substituted once, stable per mount)
  const expects = useMemo(
    () => a.targets.map((t) => resolveTargetExpect(t, profile?.name ?? "ROSHAN")),
    [a.targets, profile?.name]
  );
  const [idx, setIdx] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>(() => initSlots(a.targets[0], expects[0]));
  const [stalls, setStalls] = useState(0);
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [wordDone, setWordDone] = useState(false); // flash between targets
  const [enterHint, setEnterHint] = useState(false);

  const target = a.targets[idx];
  const expect = expects[idx] ?? "";

  // reset per-target state during render when the round changes (React pattern)
  const [prevIdx, setPrevIdx] = useState(idx);
  if (prevIdx !== idx) {
    setPrevIdx(idx);
    setSlots(initSlots(a.targets[idx], expects[idx]));
    setStalls(0);
    setWordDone(false);
    setEnterHint(false);
  }

  // speak the target line (external system, no state update)
  useEffect(() => {
    const t = a.targets[idx];
    if (t) void playAudio(t.audio, t.label.ur);
  }, [idx]);

  // leftmost slot that still needs the right char (null or mismatched)
  const needIdx = slots.findIndex((c, i) => c === null || c !== expect[i]);

  const advance = useCallback(() => {
    if (idx + 1 >= a.targets.length) {
      playSfx("fanfare", sfxOn);
      const t = setTimeout(() => {
        stopSpeaking();
        onWin();
      }, 1900);
      return () => clearTimeout(t);
    }
    playSfx("happyBeep", sfxOn);
    setIdx((i) => i + 1);
  }, [idx, a.targets.length, onWin, sfxOn]);

  const handleKey = useCallback(
    (k: KeyAction) => {
      if (!target || wordDone) return;
      const need = slots.findIndex((c, i) => c === null || c !== expect[i]);

      if (k === "BACKSPACE") {
        // magic eraser: clears the leftmost WRONG slot (never a correct one)
        const wrong = slots.findIndex((c, i) => c !== null && c !== expect[i]);
        if (wrong >= 0) {
          playSfx("whoosh", sfxOn);
          setSlots((s) => s.map((c, i) => (i === wrong ? null : c)));
        } else {
          // nothing wrong to erase — gentle nudge, not a bug
          void playAudio(undefined, "میٹھا! اب اگلا حرف دباؤ۔");
        }
        return;
      }

      if (k === "ENTER") {
        if (!a.enter) return;
        if (need < 0) {
          // complete word + enter → "ho gaya!"
          setWordDone(true);
          void playAudio(undefined, "ہو گیا!");
          setTimeout(advance, 900);
        } else {
          setEnterHint(true);
          setTimeout(() => setEnterHint(false), 1400);
        }
        return;
      }

      if (k === "SPACE") {
        // space behaves like a normal character (it is one, inside expect)
        if (need >= 0 && expect[need] === " ") {
          playSfx("pop", sfxOn);
          setSlots((s) => s.map((c, i) => (i === need ? " " : c)));
        } else {
          setStalls((v) => v + 1);
          showBug(a.wrongHint);
        }
        return;
      }

      // a letter/digit key
      if (need >= 0 && k === expect[need]) {
        playSfx("pop", sfxOn);
        setSlots((s) => s.map((c, i) => (i === need ? k : c)));
        setWrongKey(null);
      } else {
        // bug! (fixing is always welcome)
        setStalls((v) => v + 1);
        setWrongKey(k);
        showBug(a.wrongHint);
        setTimeout(() => setWrongKey(null), 700);
      }
    },
    [slots, expect, target, wordDone, a, sfxOn, advance, showBug]
  );

  // physical keyboard feeds the same handler
  usePhysicalKeys(handleKey, true);

  // auto-advance when the word completes without ENTER confirmation
  useEffect(() => {
    if (!target || wordDone) return;
    if (slots.length > 0 && slots.every((c, i) => c === expect[i])) {
      if (a.enter) return; // wait for the enter key
      const t = setTimeout(() => {
        setWordDone(true);
        setTimeout(advance, 700);
      }, 450);
      return () => clearTimeout(t);
    }
  }, [slots, expect, target, wordDone, a.enter, advance]);

  const hintKey = stalls >= 2 && needIdx >= 0 ? (expect[needIdx] === " " ? "SPACE" : expect[needIdx]) : null;
  const done = slots.length > 0 && slots.every((c, i) => c === expect[i]);

  // ---- bubble mode helpers (letter-bubble lesson) ----
  const bubbleRound = useMemo(() => {
    if (!a.bubble || !target) return null;
    const decoyPool = a.keys.filter((k) => k.toUpperCase() !== expect);
    const shuffled = seededShuffle(decoyPool, seedOf([target.id, expect])) ;
    const decoys = shuffled.slice(0, 2).map((k) => k.toUpperCase());
    const letters = seededShuffle([expect, ...decoys], seedOf([target.id, "bubbles"]));
    const pos = [ { x: 24, y: 30 }, { x: 52, y: 58 }, { x: 76, y: 26 } ];
    return letters.map((ch, i) => ({ ch, ...pos[i % 3] }));
  }, [a.bubble, a.keys, target, expect]);

  const tapBubble = (ch: string) => {
    if (wordDone) return;
    if (ch === expect) handleKey(ch);
    else {
      setStalls((v) => v + 1);
      showBug(a.wrongHint);
    }
  };

  if (!target) return null;

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />

      {/* target card: art + label + slots */}
      <div className="card-kid mx-auto flex max-w-2xl flex-col items-center gap-3 p-5" key={target.id}>
        {target.count !== undefined ? (
          /* counting round: show exactly `count` mangoes */
          <div className="flex min-h-14 flex-wrap items-center justify-center gap-1" aria-label={`${target.count} mangoes`}>
            {Array.from({ length: target.count }).map((_, i) => (
              <Art key={i} id="mango" size={44} />
            ))}
            {target.count === 0 && <span className="urdu text-lg text-roshan-ink-soft">کوئی نہیں!</span>}
          </div>
        ) : target.art ? (
          <div className="anim-pop"><Art id={target.art} size={110} /></div>
        ) : null}

        <p className="urdu text-center text-2xl font-bold leading-[1.9]">{target.label.ur}</p>
        <p className="ltr-term text-center text-sm text-roshan-ink-soft" dir="ltr">{target.label.en}</p>

        {/* typing slots (LTR — Latin letters) */}
        <div className="flex items-center justify-center gap-2" dir="ltr">
          {slots.map((c, i) => {
            const wrong = c !== null && c !== expect[i];
            const filledWrong = target.preFilled && wrong;
            return (
              <div
                key={i}
                className={`flex h-14 w-12 items-center justify-center rounded-xl border-b-4 text-3xl font-extrabold transition-all md:h-16 md:w-14 ${
                  wrong
                    ? "border-roshan-orange-deep bg-orange-50 text-roshan-orange-deep"
                    : c
                      ? "border-roshan-green bg-green-50 text-roshan-green"
                      : "border-dashed border-roshan-lock bg-white/70 text-transparent"
                } ${filledWrong ? "anim-wiggle" : ""} ${c && !wrong ? "anim-pop" : ""}`}
                style={c === " " ? { background: "#DDD6FE" } : undefined}
                aria-label={`slot ${i + 1}`}
              >
                {c === " " ? "␣" : c ?? "·"}
              </div>
            );
          })}
        </div>

        {/* word complete flash (non-enter mode) */}
        {done && !a.enter && <p className="urdu anim-pop text-2xl font-bold text-roshan-green">ہو گیا!</p>}
        {/* enter coaching */}
        {enterHint && (
          <p className="urdu anim-pop text-lg font-bold text-roshan-teal">
            پہلے لفظ مکمل کرو، پھر ENTER دباؤ!
          </p>
        )}
        {a.enter && done && !wordDone && (
          <p className="urdu text-lg font-bold text-roshan-teal">اب ENTER دباؤ — ہو گیا!</p>
        )}
      </div>

      {/* letter-bubble scene (tap OR key both work) */}
      {a.bubble && bubbleRound && (
        <div className="relative mx-auto mt-4 h-56 max-w-3xl overflow-hidden rounded-3xl border-4 border-roshan-card-border">
          <Art id="bg-castle" className="block" />
          {bubbleRound.map((b, i) => {
            const isHint = hintKey === b.ch;
            return (
              <button
                key={`${target.id}-${i}-${b.ch}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 ${isHint ? "anim-ring rounded-full" : ""}`}
                style={{ right: `${b.x}%`, top: `${b.y}%` }}
                onClick={() => tapBubble(b.ch)}
                aria-label={`bubble ${b.ch}`}
              >
                <div className="anim-drift" style={{ animationDelay: `${i * 1.1}s` }}>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-roshan-card-border bg-white/90 text-3xl font-extrabold text-roshan-purple shadow-md" dir="ltr">
                    {b.ch}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* the on-screen kingdom keyboard (also mirrors physical key presses) */}
      <KeyBoard
        keys={a.keys}
        onKey={handleKey}
        hintKey={hintKey}
        wrongKey={wrongKey}
        eraser={a.eraser}
        enter={a.enter}
        space={a.space}
      />

      <div className="ltr-term mt-3 text-center text-sm text-roshan-ink-soft" dir="ltr">
        {idx + 1} / {a.targets.length}
      </div>
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
      {idx === a.targets.length - 1 && done && !wordDone && !a.enter && (
        <p className="urdu anim-pop mt-3 text-center text-2xl font-bold text-roshan-green">{a.winPraise.ur}</p>
      )}
    </div>
  );
}

/* ============================ CATCH FALLING ============================ */
const FALL_SECONDS = 15; // slow, calm, photosensitivity-safe
const FLOAT_SECONDS = 3.2; // float back up — never lost

export function CatchFallingActivity({ activity, onWin }: CommonProps) {
  const a = activity as CatchFallingActivity;
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);

  // seeded letter order across rounds (cycle the pool; avoid immediate repeat)
  const order = useMemo(() => {
    const out: string[] = [];
    let s = seedOf(a.letters.map((l) => l.id)) || 7;
    let last: string | null = null;
    for (let i = 0; i < a.rounds; i++) {
      s = (s * 48271) % 2147483647;
      let pick = a.letters[s % a.letters.length];
      if (a.letters.length > 1) {
        let guard = 0;
        while (pick.id === last && guard++ < 8) {
          s = (s * 48271) % 2147483647;
          pick = a.letters[s % a.letters.length];
        }
      }
      last = pick.id;
      out.push(pick.id);
    }
    return out;
  }, [a.letters, a.rounds]);

  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<"falling" | "caught" | "floating">("falling");
  const [stalls, setStalls] = useState(0);
  const [cycle, setCycle] = useState(0); // re-triggers the CSS fall animation
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [teerX, setTeerX] = useState(50); // gentle horizontal position (%)

  const letterId = order[round] ?? order[0];
  const letter = a.letters.find((l) => l.id === letterId) ?? a.letters[0];

  // speak the round line when a new letter starts falling
  useEffect(() => {
    if (!letter) return;
    void playAudio(letter.audio, letter.label.ur);
  }, [round]);

  const catchIt = useCallback(() => {
    setPhase((p) => {
      if (p !== "falling") return p;
      playSfx("pop", sfxOn);
      return "caught";
    });
  }, [sfxOn]);

  // after catch → next round (or win)
  useEffect(() => {
    if (phase !== "caught") return;
    const t = setTimeout(() => {
      if (round + 1 >= a.rounds) {
        playSfx("fanfare", sfxOn);
        stopSpeaking();
        onWin();
      } else {
        setRound((r) => r + 1);
        setPhase("falling");
        setCycle((c) => c + 1);
      }
    }, 1100);
    return () => clearTimeout(t);
  }, [phase, round, a.rounds, onWin, sfxOn]);

  const handleKey = useCallback(
    (k: KeyAction) => {
      if (!letter || phase !== "falling") return;
      if (k === letter.char.toUpperCase()) catchIt();
      else {
        setStalls((v) => v + 1);
        setWrongKey(k);
        showBug(a.wrongHint);
        setTimeout(() => setWrongKey(null), 700);
      }
    },
    [letter, phase, catchIt, a.wrongHint, showBug]
  );

  usePhysicalKeys(handleKey, true);

  const hintChar = stalls >= 2 && letter ? letter.char.toUpperCase() : null;

  if (!letter) return null;

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />

      <div
        className="relative mx-auto h-72 max-w-3xl overflow-hidden rounded-3xl border-4 border-roshan-card-border md:h-96"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          setTeerX(Math.min(96, Math.max(4, ((e.clientX - r.left) / r.width) * 100)));
        }}
      >
        <Art id={a.scene} className="block h-full w-full" />

        {/* Teer follows the mouse — continuity friend from World 2 */}
        <div className="pointer-events-none absolute -translate-x-1/2 z-10 hidden md:block" style={{ left: `${teerX}%`, top: 8 }} aria-hidden>
          <Art id="teer" size={40} />
        </div>

        {/* the falling letter (a key-house drifting down) */}
        {phase !== "caught" && (
          <div
            key={`${round}-${cycle}`}
            className={`absolute left-1/2 ${phase === "falling" ? "anim-fall" : "anim-float-up"}`}
            style={{ animationDuration: phase === "falling" ? `${FALL_SECONDS}s` : `${FLOAT_SECONDS}s` }}
            onAnimationEnd={(e) => {
              // only the outer positioning layer's animation drives the loop
              if (e.target !== e.currentTarget) return;
              if (phase === "falling") setPhase("floating");
              else if (phase === "floating") {
                setPhase("falling");
                setCycle((c) => c + 1);
              }
            }}
          >
            <button
              className={`-translate-x-1/2 transition-transform hover:scale-110 ${hintChar ? "anim-ring rounded-2xl" : ""}`}
              onClick={() => phase === "falling" && catchIt()}
              aria-label={`falling letter ${letter.char}`}
            >
              <div className="anim-drift" style={{ animationDuration: "7s" }}>
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-roshan-card-border bg-white/95 shadow-lg" dir="ltr">
                  <Art id={`key-${letter.char}`} size={76} />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* caught! letter zooms to Bijli's basket */}
        {phase === "caught" && (
          <div className="anim-pop absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center gap-1">
              <Art id="star" size={44} />
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-roshan-green bg-green-50" dir="ltr">
                <span className="text-3xl font-extrabold text-roshan-green">{letter.char.toUpperCase()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bijli with the basket waits at the bottom */}
        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-end gap-1">
          <Art id="fruit-basket" size={54} />
        </div>
      </div>

      <KeyBoard
        keys={a.letters.map((l) => l.char.toUpperCase())}
        onKey={handleKey}
        hintKey={hintChar}
        wrongKey={wrongKey}
      />

      <div className="mt-3 flex items-center justify-center gap-4">
        <div className="ltr-term rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-sm" dir="ltr">
          {round + (phase === "caught" ? 1 : 0)} / {a.rounds}
        </div>
      </div>
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
      {round + 1 >= a.rounds && phase === "caught" && (
        <p className="urdu anim-pop mt-3 text-center text-2xl font-bold text-roshan-green">{a.winPraise.ur}</p>
      )}
    </div>
  );
}
