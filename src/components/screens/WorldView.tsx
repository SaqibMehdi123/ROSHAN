/**
 * World view — lessons on a mini-path inside one land.
 * Lesson states: done (stars) / current (pulsing) / locked (soft).
 * v2: immersive land banner, fluid nodes, progress meter, no "coming soon" filler.
 */
"use client";

import { useApp, useActiveProfile } from "@/lib/store";
import { getWorld, lessonsOfWorld } from "@/lib/content";
import { Art } from "@/components/art/Props";
import { Character } from "@/components/art/Characters";
import { BigButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";

export function WorldView() {
  const { activeWorldId, openLesson, go } = useApp();
  const profile = useActiveProfile();
  const world = getWorld(activeWorldId ?? 1);
  if (!world || !profile) return null;

  const lessons = lessonsOfWorld(world.id);
  const total = world.lessonCount;

  // first uncompleted lesson = current
  const currentLessonId = lessons.find((l) => !profile.progress[l.id]?.completed)?.id ?? lessons[0]?.id;
  const doneCount = lessons.filter((l) => profile.progress[l.id]?.completed).length;
  const pct = total ? doneCount / total : 0;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-4xl px-3 pb-32 pt-3 sm:px-5 sm:pt-5">
      <div className="mb-4 flex items-center justify-between">
        <BigButton label={{ ur: "نقشے پر", en: "Map" }} variant="back" onClick={() => go("map")} />
        <RepeatButton />
      </div>

      {/* Land banner */}
      <div
        className="card-kid relative overflow-hidden px-5 py-6 text-center sm:px-8 sm:py-8"
        style={{ background: `linear-gradient(160deg, ${world.color}33 0%, ${world.color}14 40%, #FFFFFF 75%)` }}
      >
        {/* soft corner blobs */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full opacity-30" style={{ background: world.color }} aria-hidden />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full opacity-20" style={{ background: world.color }} aria-hidden />

        <div className="relative">
          <div className="mx-auto mb-1 w-fit anim-bob">
            <Character id="bijli" size={72} emote="happy" />
          </div>
          <h1 className="urdu-tight text-[2rem] font-bold sm:text-4xl" style={{ color: world.color }}>
            {world.name.ur}
          </h1>
          <p className="ltr-term text-sm font-semibold tracking-wide text-roshan-ink-soft" dir="ltr">{world.name.en}</p>
          <p className="urdu-tight mx-auto mt-2 max-w-xl text-lg sm:text-xl">{world.arcSummary.ur}</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="stat-chip urdu-tight text-base">
              <Art id="star" size={20} />
              بیج: {world.badgeName.ur}
            </span>
            <span className="stat-chip ltr-term text-sm" dir="ltr">
              {doneCount}/{total} lessons
            </span>
          </div>
          <div className="meter mx-auto mt-3 max-w-xs" dir="ltr">
            <span style={{ width: `${pct * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Lesson path (RTL) */}
      <div className="mt-9 flex flex-row-reverse flex-wrap items-start justify-center gap-x-5 gap-y-9 sm:gap-x-7">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1;
          const lesson = lessons[n - 1];
          const prog = lesson ? profile.progress[lesson.id] : undefined;
          const done = prog?.completed ?? false;
          const isCurrent = lesson && lesson.id === currentLessonId && !done;
          const locked = lesson && !done && lesson.id !== currentLessonId && !prog;

          return (
            <div key={n} className="relative flex w-[6.4rem] flex-col items-center text-center sm:w-28">
              <div className="ltr-term absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-2 py-0.5 text-[0.7rem] font-bold text-roshan-ink-soft shadow-sm" dir="ltr">
                {world.id}.{n}
              </div>
              {lesson ? (
                <button
                  onClick={() => {
                    if (locked) {
                      void playAudio(undefined, "پہلے اگلا سبق مکمل کرو!");
                      return;
                    }
                    openLesson(lesson.id);
                  }}
                  className={`node-circle ${isCurrent ? "node-current" : ""} ${done ? "node-done" : ""} ${locked ? "node-locked" : ""}`}
                  style={locked ? undefined : { background: done ? "radial-gradient(circle at 32% 26%, #ffffffcc 0%, #DFF7E7 46%)" : `radial-gradient(circle at 32% 26%, #ffffffcc 0%, ${world.color} 46%)` }}
                  aria-label={lesson.title.en}
                >
                  {done ? (
                    <Art id="star" size={40} />
                  ) : locked ? (
                    <Art id="lock" size={34} />
                  ) : (
                    <span className="text-3xl text-white drop-shadow">▶</span>
                  )}
                </button>
              ) : (
                <div className="node-circle node-locked !cursor-default">
                  <span className="urdu-tight text-sm">جلد</span>
                </div>
              )}
              <p className="urdu-tight mt-2 text-[1.02rem] font-semibold leading-[1.9] sm:text-base">
                {lesson ? lesson.title.ur : "نئی کہانی"}
              </p>
              {lesson && done && (
                <div className="mt-0.5 flex gap-0.5" dir="ltr">
                  {[1, 2, 3].map((s) => (
                    <span key={s} className={s <= (profile.stars[lesson.id] ?? 0) ? "text-lg" : "text-lg opacity-25"}>★</span>
                  ))}
                </div>
              )}
              {isCurrent && (
                <div className="mt-1">
                  <Character id="bijli" size={38} emote="happy" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-4 left-4 z-40 no-print">
        <RepeatButton />
      </div>
    </main>
  );
}
