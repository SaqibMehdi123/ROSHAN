/**
 * Kid UI kit — the reusable building blocks of the ROSHAN design system (docs/02).
 * Every interactive element: ≥64px target, thick outlines, spoken label, no failure language.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Art } from "@/components/art/Props";
import { Bijli } from "@/components/art/Characters";
import { playAudio, onSpeakingChange, repeatLast, isSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";
import type { Bilingual } from "@/lib/schema";

/* ------------------------------ BigButton ------------------------------ */
type BtnVariant = "go" | "back" | "teal" | "reward" | "success";

export function BigButton({
  label,
  sublabel,
  art,
  onClick,
  variant = "go",
  disabled,
  className,
  speakLabel = true,
}: {
  label: Bilingual | string;
  sublabel?: string;
  art?: string;
  onClick?: () => void;
  variant?: BtnVariant;
  disabled?: boolean;
  className?: string;
  speakLabel?: boolean;
}) {
  const ur = typeof label === "string" ? label : label.ur;
  const en = typeof label === "string" ? undefined : label.en;
  return (
    <button
      className={`btn-kid btn-${variant} ${className ?? ""}`}
      disabled={disabled}
      onClick={() => {
        if (speakLabel) void playAudio(undefined, ur);
        playSfx("pop", true);
        onClick?.();
      }}
    >
      {art && <Art id={art} size={34} />}
      <span className="flex flex-col items-center leading-none">
        <span className="urdu text-[1.375rem] font-semibold">{ur}</span>
        {en && <span className="ltr-term mt-1 text-sm opacity-70">{en}</span>}
        {sublabel && <span className="ltr-term mt-0.5 text-xs opacity-60">{sublabel}</span>}
      </span>
    </button>
  );
}

/* ------------------------------- StarRow ------------------------------- */
export function StarRow({ count, size = 44, animate = true }: { count: number; size?: number; animate?: boolean }) {
  return (
    <div className="flex items-center gap-1.5" dir="ltr">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={animate && i <= count ? "anim-pop" : ""}
          style={{ animationDelay: `${i * 0.12}s`, opacity: i <= count ? 1 : 0.25 }}
        >
          <Art id="star" size={size} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Confetti ------------------------------ */
const CONFETTI_COLORS = ["#F59E0B", "#0D9488", "#38BDF8", "#EC4899", "#22C55E", "#FDE68A"];

export function Confetti({ pieces = 36 }: { pieces?: number }) {
  const arr = useMemo(
    () =>
      Array.from({ length: Math.min(pieces, 40) }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rot: Math.random() * 360,
      })),
    [pieces]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {arr.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{ left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}s`, transform: `rotate(${p.rot}deg)` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------ BugBanner ------------------------------ */
/** Zero-failure feedback: teal, curious Bijli, gentle hint. No red. No X. */
export function BugBanner({ hint, visible }: { hint: Bilingual; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="bug-banner mx-auto max-w-xl" role="status">
      <div className="shrink-0">
        <Bijli size={44} emote="idle" />
      </div>
      <div className="text-right">
        <p className="urdu text-[1.15rem] font-semibold leading-[2]">
          اوپس! ایک بگ ملا! دوبارہ کوشش کریں؟
        </p>
        <p className="urdu text-[1.05rem] leading-[2] opacity-90">{hint.ur}</p>
        <p className="ltr-term text-xs opacity-70">{hint.en}</p>
      </div>
    </div>
  );
}

/* ----------------------------- RepeatButton ----------------------------- */
/** Bijli REPEAT — present on every screen (spec §3). Replays the last spoken line. */
export function RepeatButton({ className }: { className?: string }) {
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => onSpeakingChange(() => setSpeaking(isSpeaking())), []);
  return (
    <button
      onClick={() => void repeatLast()}
      className={`btn-kid !min-h-16 !min-w-16 !p-2 ${className ?? ""}`}
      aria-label="Repeat audio"
      title="دوبارہ سنیں"
    >
      <div className={speaking ? "anim-wiggle" : ""}>
        <Bijli size={44} />
      </div>
    </button>
  );
}

/* ----------------------------- SpeakBubble ----------------------------- */
/** Narration/dialog bubble: Urdu primary (Nastaliq), English secondary, speaker chip. */
export function SpeakBubble({
  speaker,
  ur,
  en,
  audio,
  emote,
  onDone,
}: {
  speaker?: string;
  ur: string;
  en?: string;
  audio?: string;
  emote?: string;
  onDone?: () => void;
}) {
  const spoken = useRef(false);
  useEffect(() => {
    if (spoken.current) return;
    spoken.current = true;
    let cancelled = false;
    void (async () => {
      await playAudio(audio, ur);
      if (!cancelled) onDone?.();
    })();
    return () => {
      cancelled = true;
    };
     
  }, [audio, ur]);
  return (
    <div className="bubble mx-auto w-fit max-w-2xl">
      {speaker && (
        <div className="ltr-term mb-1 text-xs font-semibold uppercase tracking-wide text-roshan-orange-deep">
          {speaker}
        </div>
      )}
      <p className={`urdu text-[1.35rem] font-semibold ${emote === "narrator" ? "text-roshan-ink-soft" : ""}`} key={ur}>
        {ur}
      </p>
      {en && <p className="ltr-term mt-2 border-t border-dashed border-roshan-card-border pt-2 text-sm text-roshan-ink-soft" dir="ltr">{en}</p>}
    </div>
  );
}

/* ------------------------------ ProgressDots ------------------------------ */
export function ProgressDots({ phases, current }: { phases: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2" dir="rtl">
      {phases.map((p, i) => (
        <div
          key={p}
          className={`h-3.5 w-3.5 rounded-full border-2 border-roshan-ink ${i === current ? "bg-roshan-orange" : i < current ? "bg-roshan-green" : "bg-white"}`}
          title={p}
        />
      ))}
    </div>
  );
}
