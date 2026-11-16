/**
 * Kid UI kit — ROSHAN Studio v3 building blocks.
 * Flat surfaces, hairline borders, one indigo primary, soft shadows.
 * Every interactive element: ≥60px target, spoken label, zero-failure language.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Art } from "@/components/art/Props";
import { Bijli, Character } from "@/components/art/Characters";
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
      {art && <Art id={art} size={30} />}
      <span className="flex flex-col items-center leading-none">
        <span className="urdu-tight text-[1.25rem] font-bold">{ur}</span>
        {en && <span className="ltr-term mt-1 text-[0.8rem] font-medium opacity-75">{en}</span>}
        {sublabel && <span className="ltr-term mt-0.5 text-xs opacity-60">{sublabel}</span>}
      </span>
    </button>
  );
}

/* ------------------------------ IconButton ------------------------------ */
/** 48px circular chrome button — back, home, meta navigation. */
export function IconButton({
  art,
  label,
  onClick,
  className,
  size = 26,
}: {
  art: string;
  label: string;
  onClick?: () => void;
  className?: string;
  size?: number;
}) {
  return (
    <button onClick={onClick} className={`icon-btn ${className ?? ""}`} aria-label={label} title={label}>
      <Art id={art} size={size} />
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
const CONFETTI_COLORS = ["#5856D6", "#1EA97C", "#F5A623", "#FF6F59", "#3E9BE8", "#A78BFA"];

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
/** Zero-failure feedback: soft amber, curious Bijli, gentle hint. No red. No X. */
export function BugBanner({ hint, visible }: { hint: Bilingual; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="bug-banner mx-auto max-w-xl" role="status">
      <div className="shrink-0">
        <Bijli size={44} emote="idle" />
      </div>
      <div className="text-right">
        <p className="urdu text-[1.1rem] font-bold leading-[1.7]">
          اوپس! ایک بگ ملا! دوبارہ کوشش کریں؟
        </p>
        <p className="urdu text-[1rem] leading-[1.7] opacity-80">{hint.ur}</p>
        <p className="ltr-term text-xs opacity-60">{hint.en}</p>
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
      className={`icon-btn ${speaking ? "!border-amber" : ""} ${className ?? ""}`}
      aria-label="Repeat audio"
      title="دوبارہ سنیں"
    >
      <div className={speaking ? "anim-wiggle" : ""}>
        <Bijli size={38} />
      </div>
    </button>
  );
}

/* ----------------------------- SpeakBubble ----------------------------- */
/** Narration/dialog card: speaker avatar, Urdu primary (Naskh), English secondary. */
const SPEAKER_UR: Record<string, string> = {
  bijli: "بجلی",
  noor: "نور",
  chotu: "چھوٹو",
  golmatol: "گول مٹول",
  "ustad-ullo": "استاد العلول",
  ustad: "استاد العلول",
  narrator: "کہانی",
  English: "English",
};

export function SpeakBubble({
  speaker,
  ur,
  en,
  audio,
  emote,
  onDone,
  hideUr,
}: {
  speaker?: string;
  ur: string;
  en?: string;
  audio?: string;
  emote?: string;
  onDone?: () => void;
  /** Show only the English pairing — used when the Urdu caption is already on screen (SHOW stage). */
  hideUr?: boolean;
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
  const speakerUr = speaker ? SPEAKER_UR[speaker] ?? speaker : undefined;
  return (
    <div className="bubble mx-auto w-fit max-w-2xl">
      <div className="flex items-start gap-3 text-right">
        {speaker && speaker !== "narrator" && (
          <div className="mx-1 shrink-0" aria-hidden>
            <Character id={speaker} size={52} emote={emote && emote !== "narrator" ? emote : "idle"} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {speakerUr && (
            <div className="urdu-tight -mb-1 w-fit text-sm font-bold text-primary-strong">{speakerUr}</div>
          )}
          {!hideUr && (
            <p
              className={`urdu mt-1 text-[1.3rem] font-semibold ${emote === "narrator" || speaker === "narrator" ? "text-soft" : ""}`}
              key={ur}
            >
              {ur}
            </p>
          )}
          {en && (
            <p
              className={`ltr-term text-[0.9rem] font-medium text-soft ${hideUr ? "" : "mt-2 border-t border-hairline pt-2"}`}
              dir="ltr"
            >
              {en}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ ProgressDots ------------------------------ */
/** Phase progress — 4 calm segments (done / current / upcoming). */
export function ProgressDots({ phases, current }: { phases: string[]; current: number }) {
  return (
    <div className="flex items-center gap-1.5" dir="rtl">
      {phases.map((p, i) => (
        <span
          key={p}
          className={`h-2.5 rounded-full transition-all ${i === current ? "w-9 bg-primary" : i < current ? "w-5 bg-success" : "w-5 bg-[#DDD9D0]"}`}
          title={p}
        />
      ))}
    </div>
  );
}
