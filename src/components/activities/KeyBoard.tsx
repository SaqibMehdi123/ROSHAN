/**
 * ROSHAN on-screen keyboard + physical-key hook (World 3).
 * - Big, colorful keycaps (>=64px targets) so touch-only tablets can "type".
 * - Keycaps are little HOUSES (Keyboard Kingdom story: every key is a home).
 * - usePhysicalKeys() listens to a real keyboard too — both inputs feed the
 *   same onKey(char) callback, so lessons work on old PCs AND cheap tablets.
 * - hintKey makes the correct key glow after stalls (coaching, never failure).
 */
"use client";

import { useEffect } from "react";
import { Art } from "@/components/art/Props";
import { playSfx } from "@/lib/music";
import { useApp } from "@/lib/store";

export type KeyAction = string; // "A"… "Z", "0"…"9", "BACKSPACE", "ENTER", "SPACE"

/** Physical keyboard listener — case-insensitive, ignores modifier combos & auto-repeat. */
export function usePhysicalKeys(onKey: (k: KeyAction) => void, enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.repeat) return; // shaky hands get one press per press
      let k: KeyAction | null = null;
      if (e.key === "Backspace" || e.key === "Delete") k = "BACKSPACE";
      else if (e.key === "Enter") k = "ENTER";
      else if (e.key === " ") k = "SPACE";
      else if (/^[a-zA-Z0-9;]$/.test(e.key)) k = e.key.toUpperCase();
      if (k) {
        e.preventDefault(); // stop page-scroll on space etc.
        onKey(k);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onKey, enabled]);
}

const SPECIALS: Record<string, { art: string; label: string; wide?: boolean }> = {
  BACKSPACE: { art: "key-backspace", label: "magic eraser", wide: true },
  ENTER: { art: "key-enter", label: "ho gaya! (enter)", wide: true },
  SPACE: { art: "key-space", label: "space", wide: true },
};

export function KeyBoard({
  keys,
  onKey,
  hintKey,
  wrongKey,
  eraser,
  enter,
  space,
}: {
  keys: string[]; // keycaps in display order (LTR — the artifact being learned is a Latin keyboard)
  onKey: (k: KeyAction) => void;
  hintKey?: string | null; // glowing suggestion after stalls
  wrongKey?: string | null; // briefly wiggles the mistyped keycap
  eraser?: boolean;
  enter?: boolean;
  space?: boolean;
}) {
  const sfxOn = useApp((s) => s.device.sfx);
  const caps = [...keys.map((k) => k.toUpperCase())];
  if (space) caps.push("SPACE");
  if (eraser) caps.push("BACKSPACE");
  if (enter) caps.push("ENTER");

  const press = (k: KeyAction) => {
    playSfx("pop", sfxOn);
    onKey(k);
  };

  return (
    <div className="mx-auto mt-4 w-fit max-w-full select-none rounded-3xl border-4 border-roshan-card-border bg-[#EDE4FB] p-3 shadow-[var(--r-shadow)]">
      <div className="flex flex-wrap items-center justify-center gap-2" dir="ltr">
        {caps.map((k) => {
          const special = SPECIALS[k];
          const isHint = hintKey === k;
          const isWrong = wrongKey === k;
          return (
            <button
              key={k}
              onClick={() => press(k)}
              className={`relative transition-transform hover:scale-105 active:scale-95 ${isHint ? "anim-ring rounded-2xl" : ""} ${isWrong ? "anim-wiggle" : ""}`}
              aria-label={special ? special.label : `key ${k}`}
            >
              <Art id={special ? special.art : `key-${k}`} size={special ? (special.wide ? 92 : 72) : 72} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
