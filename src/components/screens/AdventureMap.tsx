/**
 * ADVENTURE MAP → “THE VILLAGE FAIR JOURNEY” (v4).
 * A real place: painted sky, drifting clouds, rolling hills — and a winding
 * serpentine path (Duolingo-style) with sticker nodes for the 8 worlds.
 * Traveled path is solid green; the road ahead is a warm dotted trail.
 * Top bar: player chip + dedicated TEACHER, settings, friends, rewards icons.
 */
"use client";

import { useEffect, useState } from "react";
import { useApp, useActiveProfile } from "@/lib/store";
import { WORLDS, LESSONS, lessonsOfWorld, getLesson, WORLD_MEDALS } from "@/lib/content";
import { Art } from "@/components/art/Props";
import { Character } from "@/components/art/Characters";
import { BigButton, Chip, EnvBackdrop, IconButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { TeacherGate } from "@/components/screens/CastAndSettings";
import { playAudio } from "@/lib/audio";

const MEDALS = WORLD_MEDALS;

/** Serpentine x-positions (percent from left) — snaking down the meadow. */
const NODE_X = [50, 22, 72, 28, 68, 25, 70, 38];
const ROW_H = 158; // px per world row (node + label)
const NODE_Y = 46; // node disc centre within its row (92px disc → 46)

export function AdventureMap() {
  const { openWorld, go, hydrated } = useApp();
  const profile = useActiveProfile();
  const [teacherOpen, setTeacherOpen] = useState(false);

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
  const currentIdx = Math.max(0, currentWorld - 1); // worlds are 1..8 in order

  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);
  const doneLessons = Object.values(profile.progress).filter((p) => p.completed).length;

  /* ---- winding path geometry (SVG in the same coordinate space as the rows) ---- */
  const W = 448; // design width == max-w-md trail
  const H = ROW_H * WORLDS.length;
  const pt = (i: number) => ({ x: (NODE_X[i] / 100) * W, y: i * ROW_H + NODE_Y });
  const seg = (a: number, b: number) => {
    const p1 = pt(a);
    const p2 = pt(b);
    const my = (p1.y + p2.y) / 2;
    return `C ${p1.x} ${my}, ${p2.x} ${my}, ${p2.x} ${p2.y}`;
  };
  const dTo = (from: number, to: number) => {
    let d = `M ${pt(from).x} ${pt(from).y}`;
    for (let i = from; i < to; i++) d += ` ${seg(i, i + 1)}`;
    return d;
  };
  const donePath = currentIdx > 0 ? dTo(0, currentIdx) : "";
  const aheadPath = dTo(Math.min(currentIdx, WORLDS.length - 1), WORLDS.length - 1);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-xl px-4 pb-28 pt-5 sm:px-6">
      <EnvBackdrop />

      {/* ── Top bar: player + meta ─────────────────────────────── */}
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{
              background: profile.avatarColor,
              border: "3px solid #fff",
              boxShadow: "0 0 0 2px var(--r-line-strong), 0 4px 0 rgba(62,56,50,0.12)",
            }}
          >
            {profile.name.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="urdu-tight truncate text-xl font-bold leading-[1.6]">
              خوش آمدید، <span className="ltr-term">{profile.name}</span>!
            </p>
            <div className="mt-0.5 flex items-center gap-2" dir="ltr">
              <Chip art="star" value={totalStars} label="ستارے" />
              <Chip value={`${doneLessons}/${LESSONS.length}`} label="سبق" />
            </div>
          </div>
        </div>
        {/* toolbar — teacher gets its own icon, right beside settings */}
        <div className="flex shrink-0 items-center gap-2">
          <IconButton art="trophy" label="انعام" onClick={() => go("album")} />
          <IconButton art="friends" label="دوست" onClick={() => go("cast")} />
          <IconButton art="teacher" label="اُستاد زون" onClick={() => setTeacherOpen(true)} />
          <IconButton art="settings" label="سیٹنگ" onClick={() => go("settings")} />
        </div>
      </header>

      {/* ── Resume strip ───────────────────────────────────────── */}
      {profile.current && (() => {
        const rl = getLesson(profile.current.lesson);
        return (
          <div className="card-kid mt-5 flex flex-col items-stretch justify-between gap-3 px-4 py-3.5 sm:flex-row sm:items-center">
            <div className="min-w-0 text-right">
              <p className="urdu-tight text-sm text-soft">وہاں سے شروع کرو جہاں تم رکے تھے</p>
              <p className="urdu-tight truncate text-lg font-bold">{rl ? rl.title.ur : "سبق"}</p>
            </div>
            <button
              className="btn-kid btn-success !min-h-12 shrink-0 !px-6 !text-lg"
              onClick={() => useApp.getState().openLesson(profile.current!.lesson, true)}
            >
              <span className="urdu-tight text-lg font-bold">جاری رکھو</span>
              <span className="ltr-term" dir="ltr" aria-hidden>▸</span>
            </button>
          </div>
        );
      })()}

      {/* ── The winding journey ───────────────────────────────── */}
      <section className="relative mx-auto mt-8 w-full max-w-md" aria-label="تمہارا سفر">
        {/* path behind the nodes */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {aheadPath && (
            <path
              d={aheadPath}
              fill="none"
              stroke="#D9CDB9"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="0.5 12"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {donePath && (
            <path
              d={donePath}
              fill="none"
              stroke="#22C55E"
              strokeWidth="11"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          )}
        </svg>

        <div className="relative flex flex-col">
          {WORLDS.map((w) => {
            const i = w.id - 1;
            const unlocked = worldUnlocked(w.id);
            const isCurrent = unlocked && w.id === currentWorld;
            const readyLessons = lessonsOfWorld(w.id);
            const doneCount = readyLessons.filter((l) => profile.progress[l.id]?.completed).length;
            const pct = readyLessons.length ? doneCount / readyLessons.length : 0;
            const complete = pct >= 1;
            const worldStars = readyLessons.reduce((a, l) => a + (profile.stars[l.id] ?? 0), 0);

            return (
              <div key={w.id} className="relative" style={{ height: ROW_H }}>
                {/* Noor & Bijli walk beside the current stop */}
                {isCurrent && (
                  <div
                    className="pointer-events-none absolute z-20 flex items-end gap-1"
                    style={{
                      left: `calc(${NODE_X[i]}% + ${NODE_X[i] < 50 ? 58 : -118}px)`,
                      top: 6,
                    }}
                    aria-hidden
                  >
                    <Character id="noor" size={56} emote="waving" />
                    <Character id="bijli" size={48} emote="happy" />
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
                  className={`group absolute z-10 flex -translate-x-1/2 flex-col items-center outline-none ${unlocked ? "cursor-pointer" : "cursor-default"}`}
                  style={{ left: `${NODE_X[i]}%`, top: 0 }}
                  aria-label={w.name.en}
                >
                  <div
                    className={`node-circle !h-[92px] !w-[92px] ${isCurrent ? "node-current" : ""} ${!unlocked ? "node-locked" : ""} ${complete ? "node-done" : ""}`}
                    style={
                      unlocked && !complete
                        ? { background: w.color }
                        : undefined
                    }
                  >
                    {unlocked ? (
                      <Art id={MEDALS[i]} size={44} />
                    ) : (
                      <span style={{ filter: "grayscale(0.7) opacity(0.9)" }}>
                        <Art id="lock" size={36} />
                      </span>
                    )}
                  </div>

                  {/* label pill + progress */}
                  <span
                    className={`pill-label mt-2 ${isCurrent ? "!border-[3px]" : ""} ${!unlocked ? "opacity-70" : ""}`}
                    style={isCurrent ? { borderColor: w.color } : undefined}
                  >
                    <span className="urdu-tight text-[1.02rem] font-bold leading-[1.5]">{w.name.ur}</span>
                    {unlocked && complete ? (
                      <span className="urdu-tight mt-0.5 text-[0.72rem] font-bold leading-[1.5] text-success">مکمل!</span>
                    ) : unlocked && readyLessons.length > 0 ? (
                      <span className="mt-1 flex items-center gap-1.5" dir="ltr">
                        <span className="meter w-20 !h-[8px]">
                          <span style={{ width: `${pct * 100}%` }} />
                        </span>
                      </span>
                    ) : (
                      <span className="urdu-tight mt-0.5 text-[0.72rem] leading-[1.5] text-soft">بند ہے</span>
                    )}
                  </span>

                  {complete && worldStars > 0 && (
                    <span className="chip mt-1.5 !py-0.5 !px-2.5" dir="ltr">
                      <Art id="star" size={14} />
                      <span className="text-[0.8rem] font-bold">{worldStars}</span>
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Brain Gym — quiet secondary action, not a shouting CTA ─── */}
      <div className="mt-10 flex justify-center">
        <button
          className="card-kid flex w-full max-w-sm items-center justify-center gap-4 border-coral/40 px-6 py-4 transition-all hover:-translate-y-0.5 hover:!border-coral active:translate-y-0.5"
          onClick={() => {
            void playAudio(undefined, "برین جم! دماغ کی ورزش کا وقت!");
            go("braingym");
          }}
        >
          <Art id="gem" size={44} />
          <span className="flex flex-col items-start leading-none text-right">
            <span className="urdu-tight text-xl font-bold">برین جم</span>
            <span className="urdu-tight mt-1.5 text-[0.78rem] font-medium text-soft">دماغ کی ورزش · ۳ منٹ</span>
          </span>
        </button>
      </div>

      <div className="fixed bottom-4 left-4 z-40 no-print">
        <RepeatButton />
      </div>

      {/* ── Teacher portal — its own top-bar entry ─────────────── */}
      <TeacherGate open={teacherOpen} onClose={() => setTeacherOpen(false)} />
    </main>
  );
}
