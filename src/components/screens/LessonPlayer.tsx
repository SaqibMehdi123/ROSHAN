/**
 * LESSON PLAYER — the engine that renders any lesson from its JSON (spec §8).
 * Phases: STORY (spoken dialog scenes) → SHOW (visual demo) → DO (activity) → CHEER (recap).
 * - Auto-saves resume point on every step (power-cut safe).
 * - PAIR MODE: 10-minute timer → friendly SWAP! overlay → 15s countdown → continue.
 * - Zero failure language anywhere; every line spoken in Urdu with English subtitles.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Lesson, Phase, StoryLine } from "@/lib/schema";
import { useApp, useActiveProfile } from "@/lib/store";
import { getLesson, getWorld } from "@/lib/content";
import { Art } from "@/components/art/Props";
import { Character } from "@/components/art/Characters";
import { BigButton, Confetti, ProgressDots, RepeatButton, SpeakBubble, StarRow } from "@/components/ui-kids/KidKit";
import { ActivityRenderer } from "@/components/activities/Activities";
import { playAudio, stopSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";

const PHASES: Phase[] = ["story", "show", "do", "cheer"];
const PHASE_LABELS: Record<Phase, { ur: string; en: string }> = {
  story: { ur: "کہانی", en: "Story" },
  show: { ur: "دیکھو", en: "Show" },
  do: { ur: "کرو", en: "Do" },
  cheer: { ur: "خوشی", en: "Cheer" },
};
const SWAP_INTERVAL_MS = 10 * 60 * 1000; // spec: every 10 minutes
const SWAP_COUNTDOWN_S = 15;

/** Saved resume point for the currently-open lesson (null = start from beginning). */
function initialResume(): { phaseIdx: number; step: number } | null {
  if (typeof window === "undefined") return null;
  const { activeLessonId, profiles, activeProfileId } = useApp.getState();
  const p = profiles.find((x) => x.id === activeProfileId);
  const resume = p?.current && p.current.lesson === activeLessonId ? p.current : null;
  if (!resume || resume.phase === "cheer") return null;
  if (resume.phase === "story" && resume.step === 0) return null;
  return { phaseIdx: Math.max(0, PHASES.indexOf(resume.phase)), step: resume.step };
}

export function LessonPlayer() {
  const { activeLessonId, go, openWorld } = useApp();
  const profile = useActiveProfile();
  const lesson = getLesson(activeLessonId ?? "");
  const [phaseIdx, setPhaseIdx] = useState<number>(() => initialResume()?.phaseIdx ?? 0);
  const [stepKey, setStepKey] = useState<number>(() => initialResume()?.step ?? 0); // resume cursor
  const [celebrate, setCelebrate] = useState(false);
  const [stars, setStars] = useState(0);
  const [newBadge, setNewBadge] = useState<string | null>(null);

  const phase = lesson ? PHASES[phaseIdx] : "story";

  const save = useCallback(
    (p: Phase, step: number) => {
      if (lesson) useApp.getState().saveResume(lesson.id, p, step);
    },
    [lesson]
  );

  const gotoPhase = (idx: number) => {
    stopSpeaking();
    setPhaseIdx(idx);
    setStepKey(0);
    if (lesson) save(PHASES[idx], 0);
  };

  if (!lesson || !profile) return null;

  const winActivity = () => {
    const { stars: s, newBadge: b } = useApp.getState().completeLesson(lesson.id);
    setStars(s);
    setNewBadge(b);
    save("cheer", 0);
    gotoPhase(3);
  };

  return (
    <main className="mx-auto min-h-dvh w-full max-w-5xl px-3 pb-28 pt-0 sm:px-4">
      {/* HUD — sticky glass bar */}
      <div className="hud-glass mb-3 flex items-center justify-between gap-2 px-2 py-2 sm:gap-3 sm:px-3">
        <button
          className="btn-kid btn-back !min-h-16 !min-w-16 !px-3"
          onClick={() => {
            stopSpeaking();
            openWorld(lesson.world);
          }}
          aria-label="back to map"
        >
          <Art id="home" size={32} />
        </button>
        <div className="flex min-w-0 flex-col items-center gap-0.5">
          <p className="urdu-tight truncate text-lg font-bold leading-[1.9] sm:text-xl">{lesson.title.ur}</p>
          <div className="flex items-center gap-2">
            <ProgressDots phases={PHASES.map((p) => PHASE_LABELS[p].en)} current={phaseIdx} />
            <span className="urdu-tight text-sm text-roshan-ink-soft">{PHASE_LABELS[phase].ur}</span>
          </div>
        </div>
        <RepeatButton />
      </div>

      {/* PHASE: STORY */}
      {phase === "story" && (
        <StoryPhase
          lesson={lesson}
          stepKey={stepKey}
          onStep={(next) => {
            setStepKey(next);
            save("story", next);
          }}
          onDone={() => gotoPhase(1)}
        />
      )}

      {/* PHASE: SHOW */}
      {phase === "show" && (
        <ShowPhase
          lesson={lesson}
          stepKey={stepKey}
          onStep={(next) => {
            setStepKey(next);
            save("show", next);
          }}
          onDone={() => gotoPhase(2)}
        />
      )}

      {/* PHASE: DO */}
      {phase === "do" && (
        <div className={lesson.do.activity.type === "tap-select" ? "" : ""}>
          <ActivityRenderer activity={lesson.do.activity} onWin={winActivity} />
        </div>
      )}

      {/* PHASE: CHEER */}
      {phase === "cheer" && (
        <CheerPhase
          lesson={lesson}
          stars={stars}
          newBadge={newBadge}
          celebrate={celebrate}
          setCelebrate={setCelebrate}
          onHome={() => {
            stopSpeaking();
            openWorld(lesson.world);
          }}
        />
      )}

      {/* PAIR MODE — 10 min SWAP timer */}
      {profile.pairMode && phase !== "cheer" && <PairSwapTimer />}
    </main>
  );
}

/* ------------------------------ STORY ------------------------------ */
function StoryPhase({
  lesson,
  stepKey,
  onStep,
  onDone,
}: {
  lesson: Lesson;
  stepKey: number;
  onStep: (n: number) => void;
  onDone: () => void;
}) {
  const total = lesson.story.scenes.reduce((a, s) => a + s.lines.length, 0);
  const flat = useMemo(() => {
    const arr: (StoryLine & { sceneIdx: number; lineIdx: number })[] = [];
    lesson.story.scenes.forEach((sc, si) => sc.lines.forEach((l, li) => arr.push({ ...l, sceneIdx: si, lineIdx: li })));
    return arr;
  }, [lesson]);

  const idx = Math.min(stepKey, flat.length - 1);
  const line = flat[idx];
  const scene = lesson.story.scenes[line.sceneIdx];
  // lineDone is derived from "which line finished" — no effect needed, auto-resets on idx change
  const [doneIdx, setDoneIdx] = useState(-1);
  const lineDone = doneIdx === idx;
  const markDone = () => setDoneIdx(idx);

  const advance = () => {
    if (!lineDone && !line.choice) return; // wait for narration
    if (idx + 1 >= flat.length) onDone();
    else onStep(idx + 1);
  };

  return (
    <div onClick={advance} className="cursor-pointer select-none">
      {/* scene stage (capped so the dialog bubble always stays on screen) */}
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border-4 border-roshan-card-border bg-white shadow-[var(--r-shadow-lg)]">
        <Art id={scene.bg} className="block" />
        {/* soft vignette so characters pop */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-1 flex items-end justify-center gap-2 px-4">
          {scene.cast.map((c) => (
            <div key={c} className="transition-transform hover:scale-105">
              <Character
                id={c}
                size={c === "golmatol" ? 118 : c === "ustad-ullo" ? 110 : 100}
                emote={line.char === c ? line.emote ?? "idle" : "idle"}
                className={line.char === c ? "anim-pop" : ""}
              />
            </div>
          ))}
        </div>
        {/* progress */}
        <div className="ltr-term absolute left-3 top-2 rounded-full bg-white/85 px-3 py-0.5 text-xs font-bold shadow-sm" dir="ltr">
          {idx + 1} / {total}
        </div>
      </div>

      {/* dialog */}
      <div className="mx-auto mt-5 max-w-2xl" key={idx}>
        <SpeakBubble
          speaker={line.char === "narrator" ? undefined : line.char}
          ur={line.ur}
          en={line.en}
          audio={line.audio}
          emote={line.char === "narrator" ? "narrator" : undefined}
          onDone={markDone}
        />
      </div>

      {/* hero moment: mission accept */}
      {line.choice && lineDone && (
        <div className="mt-4 flex justify-center" onClick={(e) => e.stopPropagation()}>
          <BigButton
            label={{ ur: line.choice.ur, en: line.choice.en }}
            variant="success"
            onClick={() => {
              playSfx("happyBeep", true);
              if (idx + 1 >= flat.length) onDone();
              else onStep(idx + 1);
            }}
          />
        </div>
      )}

      {!line.choice && (
        <p className="urdu-tight mt-4 text-center text-lg text-roshan-ink-soft" style={{ opacity: lineDone ? 1 : 0.45 }}>
          {lineDone ? "آگے بڑھنے کے لیے کہیں بھی دباؤ" : "…" }
        </p>
      )}
    </div>
  );
}

/* ------------------------------- SHOW ------------------------------- */
function ShowPhase({
  lesson,
  stepKey,
  onStep,
  onDone,
}: {
  lesson: Lesson;
  stepKey: number;
  onStep: (n: number) => void;
  onDone: () => void;
}) {
  const steps = lesson.show.steps;
  const idx = Math.min(stepKey, steps.length - 1);
  const step = steps[idx];
  const [doneIdx, setDoneIdx] = useState(-1);
  const lineDone = doneIdx === idx;
  const markDone = () => setDoneIdx(idx);

  return (
    <div className="select-none">
      <div className="card-kid mx-auto flex max-w-2xl flex-col items-center gap-4 p-6" key={idx}>
        <div className="anim-pop">
          <Art id={step.visual} size={190} />
        </div>
        <p className="urdu text-center text-3xl font-bold">{step.caption.ur}</p>
        <SpeakBubble
          speaker="English"
          ur={step.caption.ur}
          en={step.caption.en}
          audio={step.audio}
          onDone={markDone}
          hideUr
        />
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        {idx > 0 && (
          <BigButton label={{ ur: "پیچھے", en: "Back" }} variant="back" onClick={() => onStep(idx - 1)} />
        )}
        <BigButton
          label={idx + 1 >= steps.length ? { ur: "اب میری باری!", en: "My turn!" } : { ur: "اگلا", en: "Next" }}
          variant={idx + 1 >= steps.length ? "success" : "go"}
          onClick={() => {
            if (idx + 1 >= steps.length) onDone();
            else onStep(idx + 1);
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------- CHEER ------------------------------- */
function CheerPhase({
  lesson,
  stars,
  newBadge,
  celebrate,
  setCelebrate,
  onHome,
}: {
  lesson: Lesson;
  stars: number;
  newBadge: string | null;
  celebrate: boolean;
  setCelebrate: (v: boolean) => void;
  onHome: () => void;
}) {
  const world = lesson.world;
  const worldDef = getWorld(world);
  const badgeName = newBadge && worldDef ? worldDef.badgeName : null;

  useEffect(() => {
    setCelebrate(true);
    const t1 = setTimeout(() => void playAudio(undefined, lesson.praise.ur), 900);
    const t2 = setTimeout(() => setCelebrate(false), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
     
  }, []);

  return (
    <div className="select-none text-center">
      {celebrate && <Confetti />}
      <div className="flex items-end justify-center gap-4">
        <Character id="noor" size={120} emote="celebrating" />
        <div className="anim-bob">
          <Character id="bijli" size={130} emote="happy" />
        </div>
        <Character id="chotu" size={115} emote="celebrating" />
      </div>

      <h2 className="urdu-tight mt-4 text-4xl font-bold text-roshan-green sm:text-5xl">{lesson.praise.ur}</h2>
      <p className="ltr-term mt-1 text-sm text-roshan-ink-soft" dir="ltr">{lesson.praise.en}</p>

      <div className="mt-4 flex justify-center">
        <StarRow count={stars} size={56} />
      </div>

      {/* Ustaad Ulloo 2-line recap */}
      <div className="card-kid mx-auto mt-6 flex max-w-xl items-center gap-4 p-5" key={lesson.cheer.recap[0].ur}>
        <Character id="ustad-ullo" size={96} emote="perch" />
        <div className="text-right">
          <p className="ltr-term text-xs font-bold uppercase text-roshan-teal">Ustaad Ulloo</p>
          <p className="urdu text-xl font-semibold leading-[2]">{lesson.cheer.recap[0].ur}</p>
          <p className="urdu text-xl font-semibold leading-[2]">{lesson.cheer.recap[1].ur}</p>
          <p className="ltr-term mt-1 text-xs text-roshan-ink-soft" dir="ltr">
            {lesson.cheer.recap[0].en} {lesson.cheer.recap[1].en}
          </p>
        </div>
      </div>

      {newBadge && badgeName && (
        <div className="card-kid anim-pop mx-auto mt-5 flex w-fit items-center gap-3 border-roshan-orange bg-orange-50 p-4">
          <Art id="medal-box" size={56} />
          <div className="text-right">
            <p className="urdu-tight text-2xl font-bold text-roshan-orange-deep">نیا بیج ملا!</p>
            <p className="urdu-tight text-lg">{badgeName.ur} — {badgeName.en}</p>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <BigButton label={{ ur: "نقشے پر واپس", en: "Back to map" }} variant="go" onClick={onHome} />
      </div>
      <p className="ltr-term mt-3 text-xs text-roshan-ink-soft" dir="ltr">world {world} · lesson complete</p>
    </div>
  );
}

/* --------------------------- PAIR MODE SWAP --------------------------- */
function PairSwapTimer() {
  const profile = useActiveProfile();
  const [showSwap, setShowSwap] = useState(false);
  const [countdown, setCountdown] = useState(SWAP_COUNTDOWN_S);
  const [nextInSec, setNextInSec] = useState(SWAP_INTERVAL_MS / 1000);

  useEffect(() => {
    if (!profile?.pairMode) return;
    const t = setInterval(() => {
      setNextInSec((s) => {
        if (s <= 1) {
          setShowSwap(true);
          setCountdown(SWAP_COUNTDOWN_S);
          void playAudio(undefined, "سوپ! اب دوسرے دوست کی باری!");
          return SWAP_INTERVAL_MS / 1000;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
     
  }, [profile?.pairMode]);

  useEffect(() => {
    if (!showSwap) return;
    const t = setInterval(() => setCountdown((c) => (c <= 1 ? (setShowSwap(false), SWAP_COUNTDOWN_S) : c - 1)), 1000);
    return () => clearInterval(t);
  }, [showSwap]);

  if (!profile?.pairMode) return null;
  const mins = Math.floor(nextInSec / 60);
  const secs = String(nextInSec % 60).padStart(2, "0");

  return (
    <>
      {/* HUD chip */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1">
        <button
          className="btn-kid btn-teal !min-h-16 !px-4"
          onClick={() => {
            setShowSwap(true);
            setCountdown(SWAP_COUNTDOWN_S);
            void playAudio(undefined, "سوپ! اب دوسرے دوست کی باری!");
          }}
        >
          <span className="urdu text-lg font-bold">باری بدلو</span>
        </button>
        <span className="ltr-term rounded-full bg-white/90 px-2 py-0.5 text-[0.7rem] font-bold text-roshan-teal shadow" dir="ltr">
          SWAP in {mins}:{secs}
        </span>
      </div>

      {/* SWAP overlay */}
      {showSwap && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#FFF8EC]/95 backdrop-blur-sm">
          <h2 className="urdu-tight text-6xl font-bold text-roshan-orange">سوپ!</h2>
          <p className="urdu-tight text-2xl font-semibold">اب دوسرے دوست کو موقع دو!</p>
          <p className="ltr-term text-sm text-roshan-ink-soft" dir="ltr">
            {profile.name} ↔ {profile.buddyName ?? "dost"} — swap driver &amp; navigator seats!
          </p>
          <div className="flex items-center gap-10">
            <div className="anim-swap-a" style={{ ["--swap-dist" as string]: "180px" }}>
              <Character id="noor" size={120} emote="celebrating" />
            </div>
            <div className="anim-swap-b" style={{ ["--swap-dist" as string]: "180px" }}>
              <Character id="chotu" size={115} emote="celebrating" />
            </div>
          </div>
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#F3E5C8" strokeWidth="10" />
              <circle
                cx="50" cy="50" r="42" fill="none" stroke="#0D9488" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${(countdown / SWAP_COUNTDOWN_S) * 264} 264`}
              />
            </svg>
            <span className="ltr-term text-2xl font-bold" dir="ltr">{countdown}</span>
          </div>
          <button className="btn-kid btn-go" onClick={() => setShowSwap(false)}>
            <span className="urdu text-xl font-bold">شروع!</span>
          </button>
        </div>
      )}
    </>
  );
}
