/**
 * Kid UI kit — ROSHAN v4 “Village Fair” building blocks.
 * Warm paper · saturated flat color · 3D press edges · ink-outline art.
 * Every interactive element: ≥52px target, spoken label, zero-failure language.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Art } from "@/components/art/Props";
import { Bijli, Character } from "@/components/art/Characters";
import { playAudio, onSpeakingChange, repeatLast, isSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";
import type { Bilingual } from "@/lib/schema";

/* ------------------------------ BigButton ------------------------------ */
type BtnVariant = "go" | "back" | "teal" | "reward" | "success" | "gold" | "sky";

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
      {art && <Art id={art} size={32} />}
      <span className="flex flex-col items-center leading-none">
        <span className="urdu-tight text-[1.3rem] font-bold">{ur}</span>
        {en && <span className="ltr-term mt-1 text-[0.8rem] font-semibold opacity-80">{en}</span>}
        {sublabel && <span className="ltr-term mt-0.5 text-xs opacity-70">{sublabel}</span>}
      </span>
    </button>
  );
}

/* ------------------------------ IconButton ------------------------------ */
/** 52px rounded-square chrome button — back, home, meta navigation. */
export function IconButton({
  art,
  label,
  onClick,
  className,
  size = 28,
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

/* -------------------------------- Chip -------------------------------- */
/** Stat chip — white pill with icon + bold value (+ tiny Urdu label). */
export function Chip({
  art,
  value,
  label,
  className,
}: {
  art?: string;
  value: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <span className={`chip ${className ?? ""}`} dir="ltr">
      {art && <Art id={art} size={17} />}
      <span className="flex items-baseline gap-1">
        <span className="text-[0.95rem] font-bold leading-none">{value}</span>
        {label && <span className="urdu-tight text-[0.7rem] leading-none text-soft">{label}</span>}
      </span>
    </span>
  );
}

/* ----------------------------- EnvBackdrop ----------------------------- */
/** The painted village sky behind the big screens: sun, drifting clouds,
 *  rolling hills at the horizon. Fixed layer — content scrolls over it. */
export function EnvBackdrop() {
  return (
    <div className="env-sky pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* sun */}
      <div
        className="absolute top-[6%] left-[5%] h-[72px] w-[72px] rounded-full"
        style={{ background: "#FFE9A8", boxShadow: "0 0 0 12px rgba(255, 233, 168, 0.45), 0 0 70px 34px rgba(255, 243, 196, 0.8)" }}
      />
      {/* drifting clouds */}
      <div className="anim-cloud absolute top-[10%] right-[8%] w-[130px] opacity-95" style={{ animationDelay: "0s" }}>
        <svg viewBox="0 0 120 60" className="w-full"><ellipse cx="42" cy="40" rx="34" ry="17" fill="#fff" /><ellipse cx="72" cy="30" rx="28" ry="19" fill="#fff" /><ellipse cx="92" cy="42" rx="24" ry="13" fill="#fff" /></svg>
      </div>
      <div className="anim-cloud absolute top-[26%] left-[14%] w-[100px] opacity-85" style={{ animationDelay: "2.5s" }}>
        <svg viewBox="0 0 120 60" className="w-full"><ellipse cx="42" cy="40" rx="34" ry="17" fill="#fff" /><ellipse cx="72" cy="31" rx="27" ry="18" fill="#fff" /><ellipse cx="92" cy="42" rx="22" ry="12" fill="#fff" /></svg>
      </div>
      <div className="anim-cloud absolute top-[18%] right-[30%] w-[80px] opacity-75" style={{ animationDelay: "5s" }}>
        <svg viewBox="0 0 120 60" className="w-full"><ellipse cx="42" cy="40" rx="34" ry="17" fill="#fff" /><ellipse cx="70" cy="32" rx="26" ry="17" fill="#fff" /></svg>
      </div>
      {/* rolling hills at the horizon */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 400 130"
        preserveAspectRatio="none"
        style={{ height: "min(24vh, 190px)" }}
      >
        <path d="M0 130 Q60 40 150 84 Q240 122 310 96 Q360 80 400 96 V130 Z" fill="#CDEBB2" />
        <path d="M0 130 Q80 66 180 104 Q270 130 340 112 Q375 104 400 112 V130 Z" fill="#A9DD8B" />
        <path d="M0 130 Q90 96 200 122 Q310 142 400 124 V130 Z" fill="#8FCF73" />
        <ellipse cx="52" cy="112" rx="7" ry="3" fill="#8FCF73" />
        <ellipse cx="330" cy="108" rx="9" ry="3.5" fill="#8FCF73" />
      </svg>
    </div>
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
          style={{ animationDelay: `${i * 0.12}s`, opacity: i <= count ? 1 : 0.3, filter: i <= count ? "none" : "grayscale(1)" }}
        >
          <Art id="star" size={size} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Confetti ------------------------------ */
const CONFETTI_COLORS = ["#FF9600", "#22C55E", "#3E9BE8", "#FFC800", "#FF6F59", "#14B8A6"];

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
        <Bijli size={46} emote="idle" />
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
        <Bijli size={40} />
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
            <Character id={speaker} size={54} emote={emote && emote !== "narrator" ? emote : "idle"} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          {speakerUr && (
            <div className="urdu-tight -mb-1 w-fit rounded-full bg-primary-tint px-3 py-0.5 text-sm font-bold text-primary-strong">
              {speakerUr}
            </div>
          )}
          {!hideUr && (
            <p
              className={`urdu mt-1 text-[1.35rem] font-semibold ${emote === "narrator" || speaker === "narrator" ? "text-soft" : ""}`}
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
/** Phase progress — 4 chunky segments (done / current / upcoming). */
export function ProgressDots({ phases, current }: { phases: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2" dir="rtl">
      {phases.map((p, i) => (
        <span
          key={p}
          className={`h-3 rounded-full transition-all ${i === current ? "w-12 bg-primary" : i < current ? "w-6 bg-success" : "w-6 bg-[#EDE7DB]"}`}
          title={p}
        />
      ))}
    </div>
  );
}
