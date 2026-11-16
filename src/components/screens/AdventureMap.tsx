/**
 * ADVENTURE MAP → "THE JOURNEY" (Studio v3).
 * A calm vertical trail of the 8 worlds — big flat nodes on a dashed spine,
 * progress meters, Noor & Bijli at the child's current stop.
 * Replaces the v2 scattered sky-map: organized, scannable, thumb-friendly.
 */
"use client";

import { useEffect } from "react";
import { useApp, useActiveProfile } from "@/lib/store";
import { WORLDS, LESSONS, lessonsOfWorld, getLesson, WORLD_MEDALS } from "@/lib/content";
import { Art } from "@/components/art/Props";
import { Character } from "@/components/art/Characters";
import { BigButton, IconButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";

const MEDALS = WORLD_MEDALS;

export function AdventureMap() {
  const { openWorld, go, hydrated } = useApp();
  const profile = useActiveProfile();

  useEffect(() => {
    if (!hydrated) return;
    void playAudio("ui_welcome", `${profile?.name ?? ""}! روشن کی دنیا میں خوش آمدید! کس زمین میں چلتے ہیں؟`);
  }, [hydrated]);

  // 30s heartbeat: time-on-task + power-cut-safe autosave (spec §8)
  useEffect(() => {
    const t = setInterval(() => useApp.getState().tickMinutes(null), 30000);
    return () => clearInterval(t);
  }, []);

  if (!profile) return null;

  const worldUnlocked = (id: number) => {
    if (id === 1) return true;
    const prev = WORLDS.find((w) => w.id === id - 1);
    if (!prev) return true;
    const prevReady = lessonsOfWorld(prev.id);
    return prevReady.length > 0 && prevReady.every((l) => profile.progress[l.id]?.completed);
  };

  // "You are here": the world of the FIRST lesson the child has not finished yet.
  const currentWorld = (() => {
    const next = LESSONS.find((l) => !profile.progress[l.id]?.completed);
    if (next) return next.world;
    return WORLDS[WORLDS.length - 1].id;
  })();
  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);
  const doneLessons = Object.values(profile.progress).filter((p) => p.completed).length;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-xl px-4 pb-28 pt-5 sm:px-6">
      {/* ── Top bar: player + meta ─────────────────────────────── */}
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
            style={{ background: profile.avatarColor }}
          >
            {profile.name.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="urdu-tight truncate text-xl font-bold leading-[1.6]">{profile.name}! خوش آمدید</p>
            <div className="flex items-center gap-2 text-sm text-soft" dir="ltr">
              <span className="inline-flex items-center gap-1 font-semibold" title="stars">
                <Art id="star" size={15} /> {totalStars}
              </span>
              <span aria-hidden>·</span>
              <span className="font-semibold">{doneLessons}/{LESSONS.length}</span>
              <span className="urdu-tight">سبق</span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <IconButton art="trophy" label="انعام" onClick={() => go("album")} />
          <IconButton art="friends" label="دوست" onClick={() => go("cast")} />
          <IconButton art="settings" label="سیٹنگ" onClick={() => go("settings")} />
        </div>
      </header>

      {/* ── Resume strip ───────────────────────────────────────── */}
      {profile.current && (() => {
        const rl = getLesson(profile.current.lesson);
        return (
          <div className="card-kid mt-5 flex flex-col items-stretch justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center">
            <div className="min-w-0 text-right">
              <p className="urdu-tight text-sm text-soft">وہاں سے شروع کرو جہاں تم رکے تھے</p>
              <p className="urdu-tight truncate text-lg font-bold">{rl ? rl.title.ur : "سبق"}</p>
            </div>
            <button
              className="btn-kid btn-success !min-h-12 shrink-0 !px-5 !text-lg"
              onClick={() => useApp.getState().openLesson(profile.current!.lesson, true)}
            >
              <span className="urdu-tight text-lg font-bold">جاری رکھو</span>
            </button>
          </div>
        );
      })()}

      {/* ── The journey trail ──────────────────────────────────── */}
      <section className="relative mx-auto mt-8 w-full max-w-md" aria-label="تمہارا سفر">
        {/* dashed spine down the center */}
        <div
          className="pointer-events-none absolute left-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2"
          style={{ background: "repeating-linear-gradient(to bottom, #DCD8CF 0 8px, transparent 8px 16px)" }}
          aria-hidden
        />
        <div className="flex flex-col items-center gap-8">
          {WORLDS.map((w) => {
            const unlocked = worldUnlocked(w.id);
            const isCurrent = unlocked && w.id === currentWorld;
            const readyLessons = lessonsOfWorld(w.id);
            const doneCount = readyLessons.filter((l) => profile.progress[l.id]?.completed).length;
            const pct = readyLessons.length ? doneCount / readyLessons.length : 0;
            const complete = pct >= 1;

            return (
              <div key={w.id} className={`relative z-10 flex w-full flex-col items-center ${isCurrent ? "mt-6" : ""}`}>
                {/* Noor & Bijli walk beside the current stop */}
                {isCurrent && (
                  <div
                    className="pointer-events-none absolute flex items-end gap-0.5"
                    style={{ left: "calc(50% + 52px)", top: "2px" }}
                    aria-hidden
                  >
                    <Character id="noor" size={48} emote="waving" />
                    <Character id="bijli" size={42} emote="happy" />
                  </div>
                )}
                <button
                  onClick={() => {
                    if (!unlocked) {
                      void playAudio(undefined, "پہلے پچھلی زمین مکمل کرو!");
                      return;
                    }
                    void playAudio(undefined, `${w.name.ur}!`);
                    openWorld(w.id);
                  }}
                  className={`group flex flex-col items-center outline-none ${unlocked ? "cursor-pointer" : "cursor-default"}`}
                  aria-label={w.name.en}
                >
                  <div
                    className={`node-circle !h-[76px] !w-[76px] ${isCurrent ? "node-current" : ""}`}
                    style={
                      unlocked
                        ? {
                            background: complete ? "var(--r-success-tint)" : w.color,
                            color: complete ? "var(--r-teal)" : "#fff",
                          }
                        : undefined
                    }
                  >
                    {unlocked ? (
                      complete ? (
                        <Art id={MEDALS[w.id - 1]} size={38} />
                      ) : (
                        <Art id={MEDALS[w.id - 1]} size={40} />
                      )
                    ) : (
                      <Art id="lock" size={30} />
                    )}
                  </div>
                </button>

                {/* world label + progress */}
                <div className="mt-2 flex flex-col items-center gap-1">
                  <p
                    className={`urdu-tight map-label text-center text-[1.05rem] font-bold leading-[1.6] ${isCurrent ? "map-label-current" : ""} ${!unlocked ? "map-label-locked" : ""}`}
                  >
                    {w.name.ur}
                  </p>
                  {unlocked && readyLessons.length > 0 ? (
                    <div className="meter w-24" dir="ltr" title={`${doneCount}/${readyLessons.length}`}>
                      <span style={{ width: `${pct * 100}%` }} />
                    </div>
                  ) : (
                    <p className="urdu-tight text-xs text-soft">بند ہے</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Brain Gym ──────────────────────────────────────────── */}
      <div className="mt-9 flex justify-center">
        <button
          className="btn-kid btn-reward w-full max-w-sm"
          onClick={() => {
            void playAudio(undefined, "برین جم! دماغ کی ورزش کا وقت!");
            go("braingym");
          }}
        >
          <Art id="gem" size={30} />
          <span className="flex flex-col items-center leading-none">
            <span className="urdu-tight text-xl font-bold">برین جم</span>
            <span className="urdu-tight mt-1 text-[0.78rem] font-medium opacity-90">دماغ کی ورزش · ۳ منٹ</span>
          </span>
        </button>
      </div>

      <div className="fixed bottom-4 left-4 z-40 no-print">
        <RepeatButton />
      </div>
    </main>
  );
}
