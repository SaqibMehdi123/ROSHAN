/**
 * DO-phase activities — the interactive heart of every lesson (spec §3).
 * Scaffolding: wrong tap = "bug found" (positive counter) + gentle hint + infinite retries.
 * All activities are TAP-based: work identically with mouse or touch (2 kids / 1 PC).
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Activity,
  Bilingual,
  MatchSlotsActivity,
  SortBinsActivity,
  TapSelectActivity,
} from "@/lib/schema";
import { Art } from "@/components/art/Props";
import { BugBanner } from "@/components/ui-kids/KidKit";
import { useApp } from "@/lib/store";
import { playAudio, stopSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";
import {
  DragDropActivity,
  FindNamedActivity,
  PaintZonesActivity,
  QuizMixActivity,
  TapSequenceActivity,
} from "./Activities2";

interface CommonProps {
  activity: Activity;
  onWin: () => void;
  hintHandAfter?: number; // stalls before the hint hand appears (default 2)
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
  useEffect(() => () => timer.current && clearTimeout(timer.current), []);
  return { banner, showBug };
}

/* ============================ TAP SELECT ============================ */
export function TapSelectActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as TapSelectActivity;
  const [found, setFound] = useState<string[]>([]);
  const [wrongTap, setWrongTap] = useState<string | null>(null);
  const [stalls, setStalls] = useState(0);
  const clickTimes = useRef<Record<string, number>>({});
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [teerPos, setTeerPos] = useState<{ x: number; y: number } | null>(null);
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);
  const correctItems = a.items.filter((i) => i.correct);

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
  }, []);

  const succeed = (item: (typeof a.items)[number]) => {
    playSfx("pop", sfxOn);
    setFound((f) => (f.includes(item.id) ? f : [...f, item.id]));
    void playAudio(undefined, item.hint.ur);
  };

  const fail = (item: (typeof a.items)[number]) => {
    setStalls((s) => s + 1);
    setWrongTap(item.id);
    showBug(item.hint);
    setTimeout(() => setWrongTap(null), 700);
  };

  const activate = (item: (typeof a.items)[number]) => {
    if (found.includes(item.id)) return;
    const need = item.clicks ?? 1;
    if (need === 2) {
      const now = Date.now();
      const last = clickTimes.current[item.id] ?? 0;
      // 900 ms window — generous for 6-year-olds with shaky hands
      if (now - last <= 900) {
        clickTimes.current[item.id] = 0;
        if (item.correct) succeed(item);
        else fail(item);
      } else {
        // mistimed double-click → coaching, never a bug
        clickTimes.current[item.id] = now;
        setWrongTap(item.id);
        if (a.clickHint) void playAudio(undefined, a.clickHint.ur);
        setTimeout(() => setWrongTap(null), 700);
      }
      return;
    }
    if (item.correct) succeed(item);
    else fail(item);
  };

  useEffect(() => {
    if (found.length === correctItems.length) {
      playSfx("fanfare", sfxOn);
      const t = setTimeout(() => {
        stopSpeaking();
        onWin();
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [found]);

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />
      <div
        ref={sceneRef}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-4 border-roshan-card-border shadow-[var(--r-shadow)]"
        onPointerMove={(e) => {
          if (!a.cursorArt || e.pointerType !== "mouse") return;
          const r = sceneRef.current?.getBoundingClientRect();
          if (!r) return;
          setTeerPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
      >
        <Art id={a.scene} className="block" />
        {/* Teer — the friendly cursor that follows the mouse (mouse only) */}
        {a.cursorArt && teerPos && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
            style={{ left: teerPos.x + 14, top: teerPos.y + 14 }}
            aria-hidden
          >
            <Art id={a.cursorArt} size={56} />
          </div>
        )}
        {a.items.map((item, idx) => {
          const isFound = found.includes(item.id);
          const isWrong = wrongTap === item.id;
          return (
            <button
              key={item.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
              style={{ right: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => activate(item)}
              onPointerEnter={(e) => {
                // hover-catch for mouse practice (glow spots); tap still works on touch
                if (item.glow && item.correct && e.pointerType === "mouse") succeed(item);
              }}
              aria-label={item.id}
            >
              <div className={isWrong ? "anim-wiggle" : ""}>
                <div
                  className={item.move && !isFound ? "anim-drift" : ""}
                  style={item.move ? { animationDelay: `${(idx % 5) * 0.9}s` } : undefined}
                >
                  <Art id={item.art} size={86} />
                </div>
              </div>
              {isFound && (
                <span className="absolute -top-1 -left-1 anim-pop">
                  <Art id="star" size={34} />
                </span>
              )}
            </button>
          );
        })}
        {/* hint hand after repeated stalls */}
        {stalls >= hintHandAfter && found.length < correctItems.length && (
          <HintHand
            target={(() => {
              const next = a.items.find((i) => i.correct && !found.includes(i.id));
              return next ? { right: next.x, top: next.y } : null;
            })()}
          />
        )}
      </div>
      <div className="mt-3 flex items-center justify-center gap-4">
        <div className="ltr-term rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-sm" dir="ltr">
          {found.length} / {correctItems.length}
        </div>
      </div>
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
      {found.length === correctItems.length && (
        <p className="urdu anim-pop mt-3 text-center text-2xl font-bold text-roshan-green">{a.winPraise.ur}</p>
      )}
    </div>
  );
}

/* ============================ MATCH SLOTS ============================ */
export function MatchSlotsActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as MatchSlotsActivity;
  const [picked, setPicked] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({}); // slotId -> itemId
  const [stalls, setStalls] = useState(0);
  const [shakeSlot, setShakeSlot] = useState<string | null>(null);
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
     
  }, []);

  useEffect(() => {
    if (Object.keys(placed).length === a.slots.length) {
      playSfx("fanfare", sfxOn);
      const t = setTimeout(() => {
        stopSpeaking();
        onWin();
      }, 2200);
      return () => clearTimeout(t);
    }
     
  }, [placed]);

  const tryPlace = (slotId: string) => {
    if (!picked) return;
    const slot = a.slots.find((s) => s.id === slotId);
    if (!slot || placed[slotId]) return;
    if (slot.accepts === picked) {
      playSfx("pop", sfxOn);
      setPlaced((p) => ({ ...p, [slotId]: picked }));
      void playAudio(undefined, slot.success.ur);
      setPicked(null);
    } else {
      setStalls((s) => s + 1);
      setShakeSlot(slotId);
      showBug(a.wrongHint);
      setTimeout(() => setShakeSlot(null), 700);
    }
  };

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {/* Bijli with empty slots */}
        <div className="card-kid flex flex-col items-center justify-center gap-3 p-4">
          <p className="urdu text-lg font-bold">بجلی کے جُز واپس لگاؤ</p>
          <div className="grid grid-cols-2 gap-3">
            {a.slots.map((slot) => {
              const filled = placed[slot.id];
              return (
                <button
                  key={slot.id}
                  onClick={() => tryPlace(slot.id)}
                  className={`relative flex h-28 w-28 flex-col items-center justify-center rounded-2xl border-3 border-dashed transition-all ${filled ? "border-solid border-roshan-green bg-green-50" : "border-roshan-lock bg-cream hover:scale-105"} ${shakeSlot === slot.id ? "anim-wiggle" : ""}`}
                  aria-label={slot.label.en}
                >
                  {filled ? (
                    <div className="anim-pop"><Art id={a.items.find((i) => i.id === filled)?.art ?? ""} size={64} /></div>
                  ) : (
                    <>
                      <Art id={slot.art} size={54} />
                      <span className="urdu text-sm text-roshan-ink-soft">{slot.label.ur}</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Parts pool */}
        <div className="card-kid flex flex-col items-center gap-3 p-4">
          <p className="urdu text-lg font-bold">جُز — Parts</p>
          <div className="flex flex-wrap justify-center gap-3">
            {a.items.map((item) => {
              const used = Object.values(placed).includes(item.id);
              const selected = picked === item.id;
              return (
                <button
                  key={item.id}
                  disabled={used}
                  onClick={() => {
                    playSfx("pop", sfxOn);
                    setPicked(selected ? null : item.id);
                    void playAudio(undefined, `${item.name.ur}!`);
                  }}
                  className={`flex w-28 flex-col items-center rounded-2xl border-3 bg-white p-3 transition-all ${used ? "opacity-30" : selected ? "border-roshan-orange bg-orange-50 scale-105 shadow-md" : "border-roshan-card-border hover:scale-105"}`}
                >
                  <Art id={item.art} size={62} />
                  <span className="urdu mt-1 text-base font-bold">{item.name.ur}</span>
                  <span className="ltr-term text-[0.65rem] text-roshan-ink-soft" dir="ltr">{item.name.en}</span>
                </button>
              );
            })}
          </div>
          {picked && (
            <p className="urdu text-center text-lg text-roshan-teal">
              اب بجلی پر سہی جگہ دباؤ!
            </p>
          )}
        </div>
      </div>

      {stalls >= hintHandAfter && Object.keys(placed).length < a.slots.length && (
        <HintHandCenter />
      )}
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
    </div>
  );
}

/* ============================= SORT BINS ============================= */
export function SortBinsActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as SortBinsActivity;
  const [idx, setIdx] = useState(0);
  const [stalls, setStalls] = useState(0);
  const [flash, setFlash] = useState<"ok" | "bug" | null>(null);
  const [explain, setExplain] = useState<Bilingual | null>(null);
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);
  const card = a.cards[idx];

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
     
  }, []);

  const sort = (binId: string) => {
    if (!card) return;
    if (card.bin === binId) {
      playSfx("pop", sfxOn);
      setFlash("ok");
      setExplain(card.explain);
      void playAudio(undefined, card.explain.ur);
    } else {
      setStalls((s) => s + 1);
      setFlash("bug");
      showBug(a.wrongHint);
    }
    setTimeout(() => setFlash(null), 800);
  };

  const next = () => {
    if (idx + 1 >= a.cards.length) {
      playSfx("fanfare", sfxOn);
      stopSpeaking();
      onWin();
    } else {
      setIdx((i) => i + 1);
      setExplain(null);
    }
  };

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />
      <div className="mx-auto max-w-4xl">
        {/* current card */}
        {card && (
          <div className={`card-kid mx-auto flex w-fit max-w-xl flex-col items-center gap-2 p-5 transition-transform ${flash === "ok" ? "scale-105" : flash === "bug" ? "anim-wiggle" : ""}`}>
            <Art id={card.art} size={110} />
            <p className="urdu text-center text-2xl font-semibold">{card.text.ur}</p>
            <p className="ltr-term text-sm text-roshan-ink-soft" dir="ltr">{card.text.en}</p>
          </div>
        )}

        {explain ? (
          <div className="mt-4 text-center">
            <p className="urdu text-2xl font-bold text-roshan-green">{explain.ur}</p>
            <button className="btn-kid btn-success mt-3" onClick={next}>
              <span className="urdu text-xl font-bold">{idx + 1 >= a.cards.length ? "مکمل!" : "اگلا"}</span>
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-6">
            {a.bins.map((bin) => (
              <button
                key={bin.id}
                onClick={() => sort(bin.id)}
                className="card-kid flex min-h-32 flex-col items-center justify-center gap-1 p-4 transition-transform hover:scale-105"
                style={{ background: bin.id === "theek" ? "#F0FDF4" : "#F0FDFA" }}
              >
                <Art id={bin.art} size={72} />
                <span className="urdu text-xl font-bold">{bin.label.ur}</span>
                <span className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">{bin.label.en}</span>
              </button>
            ))}
          </div>
        )}

        <div className="ltr-term mt-4 text-center text-sm text-roshan-ink-soft" dir="ltr">
          card {Math.min(idx + 1, a.cards.length)} / {a.cards.length}
        </div>
      </div>
      {stalls >= hintHandAfter && !explain && <HintHandCenter />}
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
    </div>
  );
}

/* ======================= shared little pieces ======================= */
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

/** Friendly pointing hand (SVG, no emoji) — appears after repeated stalls. */
function HandSvg({ size = 44, flip = false }: { size?: number; flip?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <path
        d="M62 14 q10 0 10 12 v26 l12 -6 q10 -4 12 6 q2 8 -8 14 l-20 14 q-12 8 -24 2 l-12 -8 q-10 -8 -4 -18 l6 -10 q4 -6 10 -4 v-16 q0 -12 10 -12 q6 0 8 8 q2 -8 8 -8 q6 0 8 8 q2 -8 8 -8"
        fill="#F2C79B"
        stroke="#4A3421"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HintHand({ target }: { target: { right: number; top: number } | null }) {
  if (!target) return null;
  return (
    <div
      className="pointer-events-none absolute anim-hint-hand z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ right: `${target.right}%`, top: `${target.top}%` }}
      aria-hidden
    >
      <HandSvg />
    </div>
  );
}

function HintHandCenter() {
  return (
    <div className="pointer-events-none mt-2 flex justify-center anim-hint-hand" aria-hidden>
      <HandSvg />
    </div>
  );
}

/* dispatcher */
export function ActivityRenderer({ activity, onWin }: CommonProps) {
  const key = activity.type;
  if (key === "tap-select") return <TapSelectActivity activity={activity} onWin={onWin} />;
  if (key === "match-slots") return <MatchSlotsActivity activity={activity} onWin={onWin} />;
  if (key === "sort-bins") return <SortBinsActivity activity={activity} onWin={onWin} />;
  if (key === "tap-sequence") return <TapSequenceActivity activity={activity} onWin={onWin} />;
  if (key === "quiz-mix") return <QuizMixActivity activity={activity} onWin={onWin} />;
  if (key === "drag-drop") return <DragDropActivity activity={activity} onWin={onWin} />;
  if (key === "paint-zones") return <PaintZonesActivity activity={activity} onWin={onWin} />;
  if (key === "find-named") return <FindNamedActivity activity={activity} onWin={onWin} />;
  return null;
}
