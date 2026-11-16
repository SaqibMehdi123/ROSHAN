/**
 * WORLD VIEW (v4) — lessons of one world on a numbered trail.
 * Each lesson row: big colored status disc (done ✓ / current / lock),
 * bold title, star row. The current row glows in the world color with
 * Bijli beside it; locked rows show a muted "بند ہے" pill.
 */
"use client";

import { useApp, useActiveProfile } from "@/lib/store";
import { getWorld, lessonsOfWorld, WORLD_MEDALS } from "@/lib/content";
import { Art, lessonIcon } from "@/components/art/Props";
import { Character } from "@/components/art/Characters";
import { Chip, IconButton, RepeatButton } from "@/components/ui-kids/KidKit";
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
  const worldStars = lessons.reduce((a, l) => a + (profile.stars[l.id] ?? 0), 0);

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

      {/* world summary card — colored banner, chunky meter */}
      <div
        className="card-kid mt-5 px-5 py-4"
        style={{ background: `linear-gradient(0deg, ${world.color}14, ${world.color}14), #FFFFFF` }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white"
              style={{
                background: world.color,
                border: "3px solid #fff",
                boxShadow: "0 0 0 2px var(--r-line-strong), 0 4px 0 rgba(62,56,50,0.12)",
              }}
            >
              <Art id={WORLD_MEDALS[world.id - 1]} size={32} />
            </div>
            <div className="min-w-0 text-right">
              <p className="urdu-tight truncate text-base font-bold" style={{ color: world.color }}>
                {world.badgeName.ur} <span className="text-soft">· بیج</span>
              </p>
              <p className="urdu-tight mt-0.5 line-clamp-1 text-sm text-soft">{world.arcSummary.ur}</p>
            </div>
          </div>
          <div className="shrink-0 space-y-1 text-center" dir="ltr">
            <Chip art="star" value={worldStars} />
            <p className="ltr-term text-sm font-bold leading-none">
              {doneCount}<span className="text-soft">/{total}</span>
              <span className="urdu-tight text-xs text-soft"> سبق</span>
            </p>
          </div>
        </div>
        <div className="meter mt-3" dir="ltr">
          <span style={{ width: `${pct * 100}%`, background: world.color }} />
        </div>
      </div>

      {/* lesson trail — alternating indent keeps the eye moving */}
      <ol className="relative mx-auto mt-6 w-full max-w-md" aria-label="اسباق">
        <div
          className="pointer-events-none absolute right-[37px] top-12 bottom-12 w-[3px] rounded-full"
          style={{ background: "repeating-linear-gradient(to bottom, #D9CDB9 0 10px, transparent 10px 22px)" }}
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
          const indent = i % 2 === 1 ? "sm:mr-6" : "";

          return (
            <li key={lesson.id} className={`relative ${indent}`}>
              <button
                onClick={() => {
                  if (locked) {
                    void playAudio(undefined, "پہلے اگلا سبق مکمل کرو!");
                    return;
                  }
                  openLesson(lesson.id);
                }}
                className={`mb-3.5 flex w-full items-center gap-4 rounded-[22px] border-2 bg-white px-4 py-3.5 text-right transition-all ${
                  isCurrent
                    ? "!border-[3px] shadow-[var(--r-shadow-lg)]"
                    : locked
                      ? "cursor-default border-transparent opacity-70"
                      : "border-hairline hover:-translate-y-0.5 hover:shadow-[var(--r-shadow)]"
                }`}
                style={isCurrent ? { borderColor: world.color } : undefined}
                aria-label={lesson.title.en}
              >
                {/* status disc */}
                <span
                  className="relative z-10 flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: done ? "#FFC800" : locked ? "#EDE7DB" : world.color,
                    color: done ? "#8A6D00" : locked ? "#B3AB9E" : "#fff",
                    border: "3px solid #fff",
                    boxShadow: isCurrent
                      ? `0 0 0 2px ${world.color}, 0 4px 0 rgba(62,56,50,0.15)`
                      : "0 0 0 2px var(--r-line-strong), 0 4px 0 rgba(62,56,50,0.10)",
                  }}
                >
                  {done ? (
                    <svg viewBox="0 0 12 10" width="22" height="18" aria-hidden>
                      <path d="M1.5 5 l3 3.2 L10.5 1.2" fill="none" stroke="#8A6D00" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : locked ? (
                    <Art id="lock" size={26} />
                  ) : (
                    <Art id={lessonIcon(lesson.skillKey)} size={32} />
                  )}
                </span>

                {/* title + stars */}
                <span className="min-w-0 flex-1">
                  <span className="urdu-tight block truncate text-[1.15rem] font-bold leading-[1.6]">
                    {lesson.title.ur}
                  </span>
                  {done ? (
                    <span className="mt-1 flex items-center gap-1.5" dir="ltr">
                      {[1, 2, 3].map((s) => (
                        <span key={s} className={`text-lg ${s <= stars ? "text-[#F0A500]" : "text-[#EDE7DB]"}`}>★</span>
                      ))}
                    </span>
                  ) : isCurrent ? (
                    <span className="urdu-tight mt-0.5 inline-block rounded-full px-3 py-0.5 text-sm font-bold text-white" style={{ background: world.color }}>
                      شروع کرو!
                    </span>
                  ) : (
                    <span className="urdu-tight text-sm text-soft">بند ہے</span>
                  )}
                </span>

                {/* Bijli peeks from the current row */}
                {isCurrent && <Character id="bijli" size={48} emote="happy" className="shrink-0" />}
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
