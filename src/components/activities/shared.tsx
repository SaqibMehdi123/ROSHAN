/**
 * Shared activity chrome — used by all three activity files.
 * P1 fix: the old "sunno dobara" 12px underline link was an unreadable,
 * un-tappable control for 6–11 year olds. It is now a 64px kid button with
 * a speaker icon and an Urdu label (audio-first, as everywhere else).
 */
"use client";

import { useEffect, useRef, useState } from "react";
import type { Bilingual } from "@/lib/schema";
import { Art } from "@/components/art/Props";
import { playAudio } from "@/lib/audio";
import { playSfx } from "@/lib/music";
import { useApp } from "@/lib/store";

/* ---------------- Prompt bar (every DO activity) ---------------- */
export function PromptBar({ prompt, audio }: { prompt: Bilingual; audio: string }) {
  return (
    <div className="card-kid mx-auto mb-4 flex w-full max-w-2xl items-center gap-3 px-4 py-3">
      <button
        className="btn-kid btn-back !min-h-16 !min-w-16 !shrink-0 !rounded-2xl !px-3"
        onClick={() => {
          playSfx("pop", true);
          void playAudio(audio, prompt.ur);
        }}
        aria-label="سنو دوبارہ — replay instruction"
        title="سنو دوبارہ"
      >
        <span className="flex flex-col items-center leading-none">
          <Art id="speaker" size={34} />
          <span className="urdu-tight mt-1 text-[0.8rem] font-bold leading-4">سنو دوبارہ</span>
        </span>
      </button>
      <div className="min-w-0 flex-1 text-center">
        <p className="urdu text-[1.35rem] font-bold leading-[1.6]" key={prompt.ur}>
          {prompt.ur}
        </p>
        <p className="ltr-term mt-0.5 text-sm text-roshan-ink-soft" dir="ltr">
          {prompt.en}
        </p>
      </div>
    </div>
  );
}

/* ---------------- zero-failure bug feedback ---------------- */
export function useBugFeedback() {
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
