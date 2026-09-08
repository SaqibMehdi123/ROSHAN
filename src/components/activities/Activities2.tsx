/**
 * ROSHAN Phase 2 activities — World 1 L4–L6 + World 2 (Mouse Meadow).
 * New engine types: tap-sequence, quiz-mix, drag-drop, paint-zones, find-named.
 * Same contract as Activities.tsx: zero-failure scaffolding, spoken Urdu,
 * infinite retries, "bugs" counted positively, hint hand after stalls.
 * Drag-drop works with BOTH real pointer dragging (mouse) and tap-pick/tap-place (touch).
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Bilingual,
  DragDropActivity,
  FindNamedActivity,
  PaintZonesActivity,
  QuizMixActivity,
  TapSequenceActivity,
} from "@/lib/schema";
import { Art } from "@/components/art/Props";
import { BugBanner } from "@/components/ui-kids/KidKit";
import { useApp } from "@/lib/store";
import { playAudio, stopSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";

interface CommonProps {
  activity: import("@/lib/schema").Activity;
  onWin: () => void;
  hintHandAfter?: number;
}

/** Deterministic shuffle (seeded from content ids — stable across renders/SSR). */
function seedOf(strs: string[]): number {
  return strs.join("").split("").reduce((a, c) => a + c.charCodeAt(0), 7) || 11;
}
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

/* ============================ TAP SEQUENCE ============================ */
export function TapSequenceActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as TapSequenceActivity;
  const shuffled = useMemo(
    () => seededShuffle(a.steps, seedOf(a.steps.map((s) => s.id))),
    [a.steps]
  );
  const [placed, setPlaced] = useState<string[]>([]); // correct-order ids
  const [wrongTap, setWrongTap] = useState<string | null>(null);
  const [stalls, setStalls] = useState(0);
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);
  const nextId = a.order[placed.length];

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
  }, []);

  useEffect(() => {
    if (placed.length === a.order.length) {
      playSfx("fanfare", sfxOn);
      const t = setTimeout(() => {
        stopSpeaking();
        onWin();
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [placed]);

  const tapStep = (id: string) => {
    if (placed.includes(id)) return;
    if (id === nextId) {
      playSfx("pop", sfxOn);
      const step = a.steps.find((s) => s.id === id);
      setPlaced((p) => [...p, id]);
      if (step) void playAudio(step.audio, step.label.ur);
    } else {
      setStalls((s) => s + 1);
      setWrongTap(id);
      showBug(a.wrongHint);
      setTimeout(() => setWrongTap(null), 700);
    }
  };

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />

      {/* order strip — placed steps appear here in the correct order */}
      <div className="mx-auto mb-4 flex max-w-3xl items-center justify-center gap-2">
        {a.order.map((id, i) => {
          const done = placed.length > i;
          const step = a.steps.find((s) => s.id === id);
          return (
            <div
              key={id}
              className={`flex min-h-16 flex-1 flex-col items-center justify-center rounded-2xl border-3 p-2 transition-all ${done ? "border-solid border-roshan-green bg-green-50" : "border-dashed border-roshan-lock bg-white/70"}`}
            >
              {done && step ? (
                <div className="anim-pop flex items-center gap-1">
                  <Art id={step.art} size={34} />
                  <span className="ltr-term text-xs font-bold text-roshan-green" dir="ltr">{i + 1}</span>
                </div>
              ) : (
                <span className="ltr-term text-lg font-bold text-roshan-lock" dir="ltr">{i + 1}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* shuffled steps */}
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
        {shuffled.map((step) => {
          const used = placed.includes(step.id);
          const isWrong = wrongTap === step.id;
          const isNextHint = stalls >= hintHandAfter && step.id === nextId;
          return (
            <button
              key={step.id}
              disabled={used}
              onClick={() => tapStep(step.id)}
              className={`card-kid flex flex-col items-center gap-2 p-4 transition-transform ${used ? "opacity-25" : "hover:scale-105"} ${isWrong ? "anim-wiggle" : ""} ${isNextHint && !used ? "anim-ring" : ""}`}
              aria-label={step.label.en}
            >
              <Art id={step.art} size={72} />
              <span className="urdu text-center text-base font-bold leading-[1.9]">{step.label.ur}</span>
              <span className="ltr-term text-center text-[0.65rem] text-roshan-ink-soft" dir="ltr">{step.label.en}</span>
            </button>
          );
        })}
      </div>

      <div className="ltr-term mt-4 text-center text-sm text-roshan-ink-soft" dir="ltr">
        {placed.length} / {a.order.length}
      </div>
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
      {placed.length === a.order.length && (
        <p className="urdu anim-pop mt-3 text-center text-2xl font-bold text-roshan-green">
          بالکل صحیح ترتیب!
        </p>
      )}
    </div>
  );
}

/* ============================== QUIZ MIX ============================== */
export function QuizMixActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as QuizMixActivity;
  const [idx, setIdx] = useState(0);
  const [solved, setSolved] = useState(false);
  const [wrongOpt, setWrongOpt] = useState<string | null>(null);
  const [stalls, setStalls] = useState(0);
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);
  const q = a.questions[idx];

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
  }, []);

  useEffect(() => {
    void playAudio(q.audio, q.question.ur);
  }, [idx]);

  const answer = (optId: string) => {
    if (solved) return;
    if (optId === q.answer) {
      playSfx("pop", sfxOn);
      setSolved(true);
      setStalls(0);
      void playAudio(undefined, q.explain.ur);
    } else {
      setStalls((s) => s + 1);
      setWrongOpt(optId);
      showBug(a.wrongHint);
      setTimeout(() => setWrongOpt(null), 700);
    }
  };

  const next = () => {
    if (idx + 1 >= a.questions.length) {
      playSfx("fanfare", sfxOn);
      stopSpeaking();
      onWin();
    } else {
      setIdx((i) => i + 1);
      setSolved(false);
    }
  };

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />
      <div className="mx-auto max-w-3xl">
        {/* question card */}
        <div className="card-kid mx-auto flex w-fit max-w-xl flex-col items-center gap-2 p-5" key={q.id}>
          <Art id={q.art} size={100} />
          <p className="urdu text-center text-2xl font-bold leading-[1.9]">{q.question.ur}</p>
          <p className="ltr-term text-center text-sm text-roshan-ink-soft" dir="ltr">{q.question.en}</p>
        </div>

        {solved ? (
          <div className="mt-4 text-center">
            <p className="urdu anim-pop text-2xl font-bold text-roshan-green">{q.explain.ur}</p>
            <p className="ltr-term mt-1 text-xs text-roshan-ink-soft" dir="ltr">{q.explain.en}</p>
            <button className="btn-kid btn-success mt-3" onClick={next}>
              <span className="urdu text-xl font-bold">
                {idx + 1 >= a.questions.length ? "مکمل!" : "اگلا سوال"}
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => answer(opt.id)}
                className={`card-kid flex min-h-28 flex-col items-center justify-center gap-2 p-4 transition-transform hover:scale-105 ${wrongOpt === opt.id ? "anim-wiggle" : ""}`}
                aria-label={opt.label.en}
              >
                {opt.art && <Art id={opt.art} size={62} />}
                <span className="urdu text-center text-xl font-bold leading-[1.9]">{opt.label.ur}</span>
                <span className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">{opt.label.en}</span>
              </button>
            ))}
          </div>
        )}

        <div className="ltr-term mt-4 text-center text-sm text-roshan-ink-soft" dir="ltr">
          Q {Math.min(idx + 1, a.questions.length)} / {a.questions.length}
        </div>
      </div>
      {stalls >= hintHandAfter && !solved && (
        <div className="pointer-events-none mt-2 flex justify-center anim-hint-hand" aria-hidden>
          <svg viewBox="0 0 100 100" width={44} height={44} aria-hidden>
            <path d="M62 14 q10 0 10 12 v26 l12 -6 q10 -4 12 6 q2 8 -8 14 l-20 14 q-12 8 -24 2 l-12 -8 q-10 -8 -4 -18 l6 -10 q4 -6 10 -4 v-16 q0 -12 10 -12 q6 0 8 8 q2 -8 8 -8 q6 0 8 8 q2 -8 8 -8" fill="#F2C79B" stroke="#4A3421" strokeWidth="4" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
    </div>
  );
}

/* ============================== DRAG DROP ============================== */
export function DragDropActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as DragDropActivity;
  const sceneRef = useRef<HTMLDivElement | null>(null);
  // px offsets (left/top space) applied via transform while an item is dragged
  const [offsets, setOffsets] = useState<Record<string, { tx: number; ty: number }>>({});
  const [drag, setDrag] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string[]>>({}); // targetId -> itemIds
  const [picked, setPicked] = useState<string | null>(null); // tap-pick / tap-place fallback
  const [shakeTarget, setShakeTarget] = useState<string | null>(null);
  const [stalls, setStalls] = useState(0);
  const dragDist = useRef(0); // px travelled since pointerdown (tap vs drag decision)
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const grabRef = useRef<{ tx: number; ty: number }>({ tx: 0, ty: 0 });
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);

  const capacityOf = (t: (typeof a.targets)[number]) => t.capacity ?? t.accepts.length;
  const isFull = (tid: string) => {
    const t = a.targets.find((x) => x.id === tid)!;
    return (placed[tid]?.length ?? 0) >= capacityOf(t);
  };
  const allPlaced = a.targets.every((t) => (placed[t.id]?.length ?? 0) >= capacityOf(t));
  const totalNeeded = a.targets.reduce((s, t) => s + capacityOf(t), 0);
  const totalPlaced = Object.values(placed).reduce((s, arr) => s + arr.length, 0);

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
  }, []);

  useEffect(() => {
    if (allPlaced && totalNeeded > 0) {
      playSfx("fanfare", sfxOn);
      const t = setTimeout(() => {
        stopSpeaking();
        onWin();
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [allPlaced, totalNeeded]);

  const rect = () => sceneRef.current?.getBoundingClientRect() ?? null;
  /** anchor of an item/target in left/top px (JSON x is stored as right%) */
  const anchorPx = (xPct: number, yPct: number) => {
    const r = rect();
    if (!r) return { x: 0, y: 0 };
    return { x: r.width * (1 - xPct / 100), y: r.height * (yPct / 100) };
  };

  const tryPlace = (itemId: string, px: number, py: number) => {
    const r = rect();
    if (!r) return false;
    let best: { id: string; dist: number } | null = null;
    for (const t of a.targets) {
      if (isFull(t.id) || !t.accepts.includes(itemId)) continue;
      const c = anchorPx(t.x, t.y);
      const dist = Math.hypot(c.x - px, c.y - py);
      const radius = Math.max(r.width * 0.15, 72); // touch-friendly drop radius
      if (dist < radius && (!best || dist < best.dist)) best = { id: t.id, dist };
    }
    if (!best) return false;
    const t = a.targets.find((x) => x.id === best!.id)!;
    playSfx("pop", sfxOn);
    setPlaced((p) => ({ ...p, [t.id]: [...(p[t.id] ?? []), itemId] }));
    setPicked(null);
    setOffsets((o) => ({ ...o, [itemId]: { tx: 0, ty: 0 } }));
    void playAudio(undefined, t.success.ur);
    return true;
  };

  const onItemDown = (itemId: string) => (e: React.PointerEvent) => {
    if (Object.values(placed).flat().includes(itemId)) return;
    const r = rect();
    if (!r) return;
    dragDist.current = 0;
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    // grab delta so the item keeps its grab point (centered under pointer is fine for kids)
    const ax = r.width * (1 - (a.draggable.find((d) => d.id === itemId)!.x / 100));
    const ay = r.height * (a.draggable.find((d) => d.id === itemId)!.y / 100);
    grabRef.current = { tx: ax - (e.clientX - r.left), ty: ay - (e.clientY - r.top) };
    setDrag(itemId);
    setPicked(null);
    const item = a.draggable.find((d) => d.id === itemId);
    if (item?.audio) void playAudio(item.audio, undefined);
    else playSfx("pop", sfxOn);
  };

  const onSceneMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const r = rect();
    if (!r) return;
    dragDist.current = Math.max(
      dragDist.current,
      Math.hypot(e.clientX - dragStart.current.x, e.clientY - dragStart.current.y)
    );
    const px = e.clientX - r.left + grabRef.current.tx;
    const py = e.clientY - r.top + grabRef.current.ty;
    const rest = anchorPx(a.draggable.find((d) => d.id === drag)!.x, a.draggable.find((d) => d.id === drag)!.y);
    setOffsets((o) => ({ ...o, [drag]: { tx: px - rest.x, ty: py - rest.y } }));
  };

  const onSceneUp = (e: React.PointerEvent) => {
    if (!drag) return;
    const r = rect();
    const id = drag;
    setDrag(null);
    if (!r) return;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    if (dragDist.current < 8) {
      // tap (no drag) → enter picked mode; the child then taps a target
      setPicked(id);
      setOffsets((o) => ({ ...o, [id]: { tx: 0, ty: 0 } }));
      void playAudio(undefined, "اب جگہ پر کلک کرو!");
      return;
    }
    const ok = tryPlace(id, px, py);
    if (!ok) {
      setOffsets((o) => ({ ...o, [id]: { tx: 0, ty: 0 } }));
      void playAudio(undefined, "دوبارہ کوشش کرو!");
    }
  };

  const onTargetClick = (tid: string) => {
    if (!picked) return;
    const t = a.targets.find((x) => x.id === tid);
    if (!t || isFull(tid) || !t.accepts.includes(picked)) {
      setStalls((s) => s + 1);
      setShakeTarget(tid);
      showBug(a.wrongHint);
      setTimeout(() => setShakeTarget(null), 700);
      return;
    }
    const c = anchorPx(t.x, t.y);
    tryPlace(picked, c.x, c.y);
  };

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />
      <div
        ref={sceneRef}
        className="relative mx-auto max-w-4xl touch-none overflow-hidden rounded-3xl border-4 border-roshan-card-border shadow-[var(--r-shadow)]"
        onPointerMove={onSceneMove}
        onPointerUp={onSceneUp}
      >
        <Art id={a.scene} className="block" />

        {/* drop targets */}
        {a.targets.map((t) => {
          const got = placed[t.id] ?? [];
          const full = got.length >= capacityOf(t);
          return (
            <button
              key={t.id}
              onClick={() => onTargetClick(t.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 ${shakeTarget === t.id ? "anim-wiggle" : ""}`}
              style={{ right: `${t.x}%`, top: `${t.y}%` }}
              aria-label={t.label?.en ?? t.id}
            >
              <div className={full ? "rounded-full bg-green-100/85 p-1 ring-4 ring-roshan-green/50" : "rounded-full border-3 border-dashed border-roshan-lock bg-white/40 p-1"}>
                <Art id={t.art} size={104} />
              </div>
              {capacityOf(t) > 1 && (
                <span className="ltr-term absolute -bottom-1 -left-1 rounded-full bg-white px-2 text-xs font-bold text-roshan-green shadow" dir="ltr">
                  {got.length}/{capacityOf(t)}
                </span>
              )}
            </button>
          );
        })}

        {/* draggable items (hidden once placed) */}
        {a.draggable.map((item) => {
          const used = Object.values(placed).flat().includes(item.id);
          if (used) return null;
          const off = offsets[item.id] ?? { tx: 0, ty: 0 };
          const isDragging = drag === item.id;
          const isPicked = picked === item.id;
          return (
            <button
              key={item.id}
              onPointerDown={onItemDown(item.id)}
              className={`absolute select-none transition-transform ${isDragging ? "z-20" : "hover:scale-110"}`}
              style={{
                right: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(calc(-50% + ${off.tx}px), calc(-50% + ${off.ty}px)) scale(${isDragging ? 1.12 : isPicked ? 1.06 : 1})`,
                touchAction: "none",
                filter: isPicked ? "drop-shadow(0 0 0 rgba(245,158,11,0.4))" : undefined,
              }}
              aria-label={item.id}
            >
              <div className={isPicked ? "rounded-full ring-4 ring-roshan-orange" : ""}>
                <Art id={item.art} size={86} />
              </div>
            </button>
          );
        })}

        {/* hint hand */}
        {stalls >= hintHandAfter && totalPlaced < totalNeeded && !picked && (
          <div className="pointer-events-none absolute anim-hint-hand z-10" style={{ right: "8%", top: "6%" }} aria-hidden>
            <svg viewBox="0 0 100 100" width={44} height={44} aria-hidden>
              <path d="M62 14 q10 0 10 12 v26 l12 -6 q10 -4 12 6 q2 8 -8 14 l-20 14 q-12 8 -24 2 l-12 -8 q-10 -8 -4 -18 l6 -10 q4 -6 10 -4 v-16 q0 -12 10 -12 q6 0 8 8 q2 -8 8 -8 q6 0 8 8 q2 -8 8 -8" fill="#F2C79B" stroke="#4A3421" strokeWidth="4" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-4">
        <div className="ltr-term rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-sm" dir="ltr">
          {totalPlaced} / {totalNeeded}
        </div>
      </div>
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
      {allPlaced && (
        <p className="urdu anim-pop mt-3 text-center text-2xl font-bold text-roshan-green">{a.winPraise.ur}</p>
      )}
    </div>
  );
}

/* ============================= PAINT ZONES ============================= */
export function PaintZonesActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as PaintZonesActivity;
  const [pot, setPot] = useState<string | null>(null);
  const [filled, setFilled] = useState<Record<string, string>>({}); // zoneId -> colorId
  const [wrongZone, setWrongZone] = useState<string | null>(null);
  const [stalls, setStalls] = useState(0);
  const [nudged, setNudged] = useState(0); // gentle reminder count (no bug)
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);
  const done = Object.keys(filled).length;

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
  }, []);

  useEffect(() => {
    if (done === a.zones.length && a.zones.length > 0) {
      playSfx("fanfare", sfxOn);
      const t = setTimeout(() => {
        stopSpeaking();
        onWin();
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [done]);

  const pickPot = (pid: string) => {
    setPot(pid);
    playSfx("pop", sfxOn);
    const p = a.palette.find((x) => x.id === pid);
    if (p) void playAudio(undefined, `${p.name.ur} رنگ!`);
  };

  const tapZone = (zid: string) => {
    if (filled[zid]) return;
    const zone = a.zones.find((z) => z.id === zid);
    if (!zone) return;
    if (!pot) {
      setNudged((n) => n + 1);
      void playAudio(undefined, "پہلے رنگ کا ڈبہ چُنو!");
      return;
    }
    if (zone.colorId === pot) {
      playSfx("pop", sfxOn);
      setFilled((f) => ({ ...f, [zid]: pot }));
      setStalls(0);
      const p = a.palette.find((x) => x.id === pot);
      void playAudio(undefined, `${p?.name.ur ?? ""} — بالکل ٹھیک!`);
    } else {
      setStalls((s) => s + 1);
      setWrongZone(zid);
      showBug(a.wrongHint);
      setTimeout(() => setWrongZone(null), 700);
    }
  };

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />

      {/* zones composition (stained-glass village) */}
      <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-3xl border-4 border-roshan-card-border shadow-[var(--r-shadow)] bg-white">
        {a.zones.map((z) => {
          const colorId = filled[z.id];
          const potDef = colorId ? a.palette.find((p) => p.id === colorId) : null;
          const isWrong = wrongZone === z.id;
          const isHint = stalls >= hintHandAfter && !colorId && pot && pot === z.colorId;
          return (
            <button
              key={z.id}
              onClick={() => tapZone(z.id)}
              className={`absolute border-3 border-dashed transition-all ${colorId ? "border-solid border-transparent" : "border-roshan-lock bg-[#F6EBD8]/60 hover:scale-[1.02]"} ${isWrong ? "anim-wiggle" : ""} ${isHint ? "anim-ring" : ""}`}
              style={{
                right: `${z.x}%`,
                top: `${z.y}%`,
                width: `${z.w}%`,
                height: `${z.h}%`,
                borderRadius: z.round ? "9999px" : "18px",
                background: potDef ? potDef.color : undefined,
              }}
              aria-label={z.id}
            />
          );
        })}
        {/* friendly ground line */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3%] bg-roshan-card-border/30" />
      </div>

      {/* palette */}
      <div className="mt-5 flex flex-wrap items-start justify-center gap-5">
        {a.palette.map((p) => (
          <button
            key={p.id}
            onClick={() => pickPot(p.id)}
            className={`flex w-20 flex-col items-center gap-1 rounded-2xl border-3 bg-white p-2 transition-transform hover:scale-105 ${pot === p.id ? "border-roshan-orange bg-orange-50 ring-4 ring-roshan-orange/30" : "border-roshan-card-border"}`}
            aria-label={p.name.en}
          >
            <span className="h-10 w-10 rounded-full border-3 border-roshan-ink shadow-inner" style={{ background: p.color }} />
            <span className="urdu text-base font-bold">{p.name.ur}</span>
            <span className="ltr-term text-[0.6rem] text-roshan-ink-soft" dir="ltr">{p.name.en}</span>
          </button>
        ))}
      </div>

      <div className="ltr-term mt-4 text-center text-sm text-roshan-ink-soft" dir="ltr">
        {done} / {a.zones.length}
      </div>
      {nudged >= 1 && !pot && (
        <p className="urdu mt-2 text-center text-lg text-roshan-teal">پہلے نیچے سے رنگ کا ڈبہ چُنو!</p>
      )}
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
      {done === a.zones.length && (
        <p className="urdu anim-pop mt-3 text-center text-2xl font-bold text-roshan-green">{a.winPraise.ur}</p>
      )}
    </div>
  );
}

/* ============================= FIND NAMED ============================= */
export function FindNamedActivity({ activity, onWin, hintHandAfter = 2 }: CommonProps) {
  const a = activity as FindNamedActivity;
  const order = useMemo(
    () => seededShuffle(a.targets, seedOf(a.targets.map((t) => t.id))),
    [a.targets]
  );
  const [round, setRound] = useState(0);
  const [stalls, setStalls] = useState(0);
  const [wrongTap, setWrongTap] = useState<string | null>(null);
  const { banner, showBug } = useBugFeedback();
  const sfxOn = useApp((s) => s.device.sfx);
  const current = order[round];

  useEffect(() => {
    void playAudio(a.audio, a.prompt.ur);
  }, []);

  // announce each round's target name
  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => {
      void playAudio(current.audio, `ابھی ${current.name.ur} پر اشارہ کرو!`);
    }, 600);
    return () => clearTimeout(t);
  }, [round]);

  const tap = (tid: string) => {
    if (!current) return;
    if (tid === current.id) {
      playSfx("pop", sfxOn);
      setStalls(0);
      void playAudio(undefined, `بالکل صحیح — یہ ${current.name.ur} ہے!`);
      if (round + 1 >= order.length) {
        playSfx("fanfare", sfxOn);
        setTimeout(() => {
          stopSpeaking();
          onWin();
        }, 2000);
      } else {
        setTimeout(() => setRound((r) => r + 1), 1400);
      }
    } else {
      setStalls((s) => s + 1);
      setWrongTap(tid);
      showBug(a.wrongHint);
      setTimeout(() => setWrongTap(null), 700);
    }
  };

  return (
    <div className="w-full">
      <Prompt prompt={a.prompt} audio={a.audio} />

      {/* current name card */}
      <div className="card-kid anim-pop mx-auto mb-4 flex w-fit items-center gap-4 p-4" key={current?.id}>
        <Art id={current?.art ?? "star"} size={0} className="hidden" />
        <div className="text-center">
          <p className="urdu text-3xl font-bold text-roshan-orange-deep">{current?.name.ur}</p>
          <p className="ltr-term text-sm text-roshan-ink-soft" dir="ltr">{current?.name.en}</p>
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border-4 border-roshan-card-border shadow-[var(--r-shadow)]">
        <Art id={a.scene} className="block" />
        {a.targets.map((t) => {
          const isWrong = wrongTap === t.id;
          const solved = round > order.findIndex((o) => o.id === t.id);
          return (
            <button
              key={t.id}
              onClick={() => tap(t.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 ${isWrong ? "anim-wiggle" : ""}`}
              style={{ right: `${t.x}%`, top: `${t.y}%` }}
              aria-label={t.name.en}
            >
              <div className={solved ? "opacity-40" : ""}>
                <Art id={t.art} size={92} />
              </div>
            </button>
          );
        })}
        {/* hint hand → correct target after stalls */}
        {stalls >= hintHandAfter && current && (
          <div
            className="pointer-events-none absolute anim-hint-hand z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ right: `${current.x}%`, top: `${current.y}%` }}
            aria-hidden
          >
            <svg viewBox="0 0 100 100" width={44} height={44} aria-hidden>
              <path d="M62 14 q10 0 10 12 v26 l12 -6 q10 -4 12 6 q2 8 -8 14 l-20 14 q-12 8 -24 2 l-12 -8 q-10 -8 -4 -18 l6 -10 q4 -6 10 -4 v-16 q0 -12 10 -12 q6 0 8 8 q2 -8 8 -8 q6 0 8 8 q2 -8 8 -8" fill="#F2C79B" stroke="#4A3421" strokeWidth="4" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        {/* progress */}
        <div className="ltr-term absolute left-3 top-2 rounded-full bg-white/85 px-3 py-0.5 text-xs font-bold" dir="ltr">
          {round + 1} / {order.length}
        </div>
      </div>
      {banner && <div className="mt-3"><BugBanner hint={banner} visible /></div>}
      {round >= order.length && (
        <p className="urdu anim-pop mt-3 text-center text-2xl font-bold text-roshan-green">{a.winPraise.ur}</p>
      )}
    </div>
  );
}

/* shared prompt (kept identical to Activities.tsx) */
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
