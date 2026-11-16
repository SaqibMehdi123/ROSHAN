/**
 * WORLD VIEW (Studio v3) — lessons of one world as a calm numbered list.
 * Each lesson = a full-width row: status disc (done ✓ / current / lock),
 * title, stars. The current row is highlighted; a dashed connector
 * links the sequence. Replaces the v2 scattered-circle wrap.
 */
"use client";

import { useApp, useActiveProfile } from "@/lib/store";
import { getWorld, lessonsOfWorld, WORLD_MEDALS } from "@/lib/content";
import { Art, lessonIcon } from "@/components/art/Props";
import { Character } from "@/components/art/Characters";
import { IconButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";

export function WorldView() {
  const { activeWorldId, openLesson, go } = useApp();
  const profile = useActiveProfile();
  const world = getWorld(activeWorldId ?? 1);
  if (!world || !profile) return null;

  const lessons = lessonsOfWorld(world.id);
  const total = world.lessonCount;
  const currentLessonId = lessons.find((l) => !profile.progress[l.id]?.completed)?.id ?? lessons[0]?.id;
  const doneCount = lessons.filter((l) => profile.progress[l.id]?.completed).length;
  const pct = total ? doneCount / total : 0;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-xl px-4 pb-28 pt-5 sm:px-6">
      {/* chrome row */}
      <div className="flex items-center justify-between gap-3">
        <IconButton art="home" label="نقشے پر" onClick={() => go("map")} />
        <div className="flex-1 text-center">
          <h1 className="urdu-tight text-2xl font-bold leading-[1.5]">{world.name.ur}</h1>
          <p className="ltr-term text-xs font-semibold tracking-wide text-soft" dir="ltr">{world.name.en}</p>
        </div>
        <RepeatButton />
      </div>

      {/* world summary card (progress lives inside — no orphan bars) */}
      <div
        className="card-kid mt-5 px-5 py-4"
        style={{ background: `linear-gradient(0deg, ${world.color}0F, ${world.color}0F), #FFFFFF` }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: world.color }}
            >
              <Art id={WORLD_MEDALS[world.id - 1]} size={28} />
            </div>
            <div className="min-w-0 text-right">
              <p className="urdu-tight truncate text-base font-bold" style={{ color: world.color }}>
                {world.badgeName.ur} <span className="text-soft">· بیج</span>
              </p>
              <p className="urdu-tight mt-0.5 line-clamp-1 text-sm text-soft">{world.arcSummary.ur}</p>
            </div>
          </div>
          <div className="shrink-0 text-center" dir="ltr">
            <p className="text-xl font-bold leading-none">{doneCount}<span className="text-soft">/{total}</span></p>
            <p className="urdu-tight text-xs text-soft">سبق</p>
          </div>
        </div>
        <div className="meter mt-3" dir="ltr">
          <span style={{ width: `${pct * 100}%` }} />
        </div>
      </div>

      {/* lesson list — white rows, dashed connector behind the status discs */}
      <ol className="relative mx-auto mt-6 w-full max-w-md" aria-label="اسباق">
        <div
          className="pointer-events-none absolute right-[37px] top-10 bottom-10 w-0.5"
          style={{ background: "repeating-linear-gradient(to bottom, #DCD8CF 0 8px, transparent 8px 16px)" }}
          aria-hidden
        />
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1;
          const lesson = lessons[n - 1];
          if (!lesson) return null;
          const prog = profile.progress[lesson.id];
          const done = prog?.completed ?? false;
          const isCurrent = lesson.id === currentLessonId && !done;
          const locked = !done && lesson.id !== currentLessonId && !prog;

          const stars = profile.stars[lesson.id] ?? 0;

          return (
            <li key={lesson.id} className="relative">
              <button
                onClick={() => {
                  if (locked) {
                    void playAudio(undefined, "پہلے اگلا سبق مکمل کرو!");
                    return;
                  }
                  openLesson(lesson.id);
                }}
                className={`mb-3 flex w-full items-center gap-4 rounded-2xl border bg-white px-4 py-3 text-right transition-all ${
                  isCurrent
                    ? "border-2 shadow-[var(--r-shadow-lg)]"
                    : locked
                      ? "cursor-default border-transparent opacity-60"
                      : "border-hairline hover:-translate-y-0.5 hover:shadow-[var(--r-shadow)]"
                }`}
                style={isCurrent ? { borderColor: world.color } : undefined}
                aria-label={lesson.title.en}
              >
                {/* status disc */}
                <span
                  className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: done ? "var(--r-success-tint)" : locked ? "#F0EEE9" : world.color,
                    color: done ? "var(--r-teal)" : locked ? "#A8A299" : "#fff",
                    boxShadow: isCurrent ? `0 0 0 5px ${world.color}2E` : "var(--r-shadow)",
                  }}
                >
                  {done ? (
                    <svg viewBox="0 0 12 10" width="20" height="17" aria-hidden>
                      <path d="M1.5 5 l3 3.2 L10.5 1.2" fill="none" stroke="var(--r-teal)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : locked ? (
                    <Art id="lock" size={24} />
                  ) : (
                    <Art id={lessonIcon(lesson.skillKey)} size={30} />
                  )}
                </span>

                {/* title + stars */}
                <span className="min-w-0 flex-1">
                  <span className="urdu-tight block truncate text-[1.15rem] font-bold leading-[1.6]">
                    {lesson.title.ur}
                  </span>
                  {done ? (
                    <span className="mt-0.5 flex items-center gap-0.5" dir="ltr">
                      {[1, 2, 3].map((s) => (
                        <span key={s} className={`text-sm ${s <= stars ? "text-amber" : "text-hairline"}`}>★</span>
                      ))}
                    </span>
                  ) : isCurrent ? (
                    <span className="urdu-tight text-sm font-semibold" style={{ color: world.color }}>
                      ابھی یہیں ہو — چلو شروع کریں!
                    </span>
                  ) : (
                    <span className="ltr-term text-xs text-soft" dir="ltr">{lesson.title.en}</span>
                  )}
                </span>

                {/*Bijli peeks from the current row*/}
                {isCurrent && <Character id="bijli" size={44} emote="happy" className="shrink-0" />}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="fixed bottom-4 left-4 z-40 no-print">
        <RepeatButton />
      </div>
    </main>
  );
}
