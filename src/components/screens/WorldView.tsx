/**
 * World view — lessons on a mini-path inside one land.
 * Lesson states: done (stars) / current (pulsing) / locked (soft).
 * Not-yet-authored lessons show as friendly "جلد آ رہا ہے!" nodes.
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
  const ready = lessons.length;

  // first uncompleted lesson = current
  const currentLessonId = lessons.find((l) => !profile.progress[l.id]?.completed)?.id ?? lessons[0]?.id;

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-28 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <BigButton label={{ ur: "نقشے پر", en: "Map" }} variant="back" onClick={() => go("map")} />
        <RepeatButton />
      </div>

      {/* Land welcome card */}
      <div
        className="card-kid relative overflow-hidden p-6 text-center"
        style={{ background: `linear-gradient(160deg, ${world.color}22, #FFFFFF 55%)` }}
      >
        <div className="absolute left-4 top-4 opacity-90">
          <Character id="bijli" size={74} emote="happy" />
        </div>
        <h1 className="urdu text-4xl font-bold" style={{ color: world.color }}>
          {world.name.ur}
        </h1>
        <p className="ltr-term text-sm text-roshan-ink-soft" dir="ltr">{world.name.en}</p>
        <p className="urdu mx-auto mt-3 max-w-xl text-xl">{world.arcSummary.ur}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-roshan-ink bg-white px-4 py-1.5">
          <Art id="star" size={22} />
          <span className="urdu text-lg font-bold">بیج: {world.badgeName.ur}</span>
        </div>
      </div>

      {/* Lesson path (RTL) */}
      <div className="mt-8 flex flex-row-reverse flex-wrap items-start justify-center gap-x-6 gap-y-8">
        {Array.from({ length: total }, (_, i) => {
          const n = i + 1;
          const lesson = lessons[n - 1];
          const prog = lesson ? profile.progress[lesson.id] : undefined;
          const done = prog?.completed ?? false;
          const isCurrent = lesson && lesson.id === currentLessonId && !done;
          const locked = lesson && !done && lesson.id !== currentLessonId && !prog;

          return (
            <div key={n} className="relative flex w-28 flex-col items-center text-center">
              <div className="ltr-term absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-roshan-ink-soft" dir="ltr">
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
                  style={locked ? undefined : { background: done ? "#DFF7E7" : world.color }}
                  aria-label={lesson.title.en}
                >
                  {done ? (
                    <Art id="star" size={40} />
                  ) : locked ? (
                    <Art id="lock" size={36} />
                  ) : (
                    <span className="text-3xl">▶</span>
                  )}
                </button>
              ) : (
                // Authored later (Phase 2+): friendly coming-soon node
                <div className="node-circle node-locked !cursor-default">
                  <span className="urdu text-sm">جلد</span>
                </div>
              )}
              <p className="urdu mt-2 text-base font-semibold leading-[1.9]">
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
                  <Character id="bijli" size={40} emote="happy" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {ready < total && (
        <p className="urdu mt-8 text-center text-lg text-roshan-ink-soft">
          اس زمین کے {ready} سبق تیار ہیں — باقی {total - ready} جلد آ رہے ہیں!
        </p>
      )}
    </main>
  );
}
