/**
 * ADVENTURE MAP — the home screen and ONLY navigation for children (spec §4).
 * A winding right→left path through 8 lands; completed = bright, locked = soft grey
 * with friendly lock; Noor & Bijli stand at the child's current spot.
 * v2: living sky (drifting clouds, twinkling sun), stat chips, fluid responsive layout.
 */
"use client";

import { useEffect } from "react";
import { useApp, useActiveProfile } from "@/lib/store";
import { WORLDS, lessonsOfWorld } from "@/lib/content";
import { Art } from "@/components/art/Props";
import { Character } from "@/components/art/Characters";
import { RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";

const MEDALS = ["medal-box", "medal-mouse", "medal-keyboard", "medal-folder", "medal-paint", "medal-shield", "medal-gem", "medal-mountain"];

/** Node positions along an S-curved path (RTL: W1 starts top-right, ends at W8 left). */
const NODE_POS = [
  { x: 6, y: 26 },
  { x: 19, y: 66 },
  { x: 31, y: 24 },
  { x: 43, y: 68 },
  { x: 55, y: 26 },
  { x: 67, y: 70 },
  { x: 79, y: 28 },
  { x: 90, y: 66 },
];

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
    // A world unlocks when the previous world's READY lessons are all done.
    return prevReady.length > 0 && prevReady.every((l) => profile.progress[l.id]?.completed);
  };

  const currentWorld = profile.current?.world ?? 1;
  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);
  const doneLessons = Object.values(profile.progress).filter((p) => p.completed).length;
  const badgeCount = profile.badges.length;

  return (
    <main className="mx-auto min-h-dvh w-full max-w-6xl px-3 pb-32 pt-3 sm:px-5 sm:pt-5">
      {/* Top bar: greeting + stats + meta actions */}
      <header className="card-kid mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-roshan-ink text-xl font-bold text-white shadow-[var(--r-shadow)] sm:h-16 sm:w-16"
            style={{ background: profile.avatarColor }}
          >
            {profile.name.slice(0, 2)}
          </div>
          <div className="text-right">
            <p className="urdu-tight text-xl font-bold sm:text-2xl">{profile.name}! خوش آمدید</p>
            <div className="mt-0.5 flex flex-wrap items-center justify-end gap-1.5">
              <span className="stat-chip ltr-term text-xs sm:text-sm" dir="ltr">
                <Art id="star" size={16} /> {totalStars}
              </span>
              <span className="stat-chip ltr-term text-xs sm:text-sm" dir="ltr">
                🧩 {doneLessons}/{profile.stars ? Object.keys(profile.progress).length || doneLessons : doneLessons}
              </span>
              {profile.helperMode && (
                <span className="stat-chip ltr-term text-xs text-roshan-teal sm:text-sm" dir="ltr">
                  Computer Hero!
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton art="trophy" label="انعام" onClick={() => go("album")} />
          <IconButton art="medal-box" label="دوست" onClick={() => go("cast")} />
          <IconButton art="home" label="سیٹنگ" onClick={() => go("settings")} />
        </div>
      </header>

      {/* The map — a living storybook sky */}
      <div className="card-kid overflow-hidden p-2" style={{ background: "linear-gradient(180deg,#BFE8F5 0%, #E8F6FB 34%, #FFF8EC 100%)" }}>
        <div className="relative aspect-[5/6] min-h-[440px] w-full sm:aspect-[2/1] sm:min-h-[420px]">
          {/* sun */}
          <div className="anim-bob pointer-events-none absolute right-[4%] top-[3%] sm:right-[2%]">
            <Art id="sun" size={54} />
          </div>
          {/* drifting clouds */}
          <div className="anim-cloud pointer-events-none absolute left-[6%] top-[8%] opacity-90" aria-hidden>
            <svg viewBox="0 0 100 40" width="110" height="44"><ellipse cx="30" cy="26" rx="26" ry="12" fill="#fff" /><ellipse cx="56" cy="20" rx="22" ry="14" fill="#fff" /><ellipse cx="74" cy="28" rx="18" ry="10" fill="#fff" /></svg>
          </div>
          <div className="anim-cloud pointer-events-none absolute right-[26%] top-[46%] opacity-70 sm:right-[24%]" style={{ animationDelay: "-4s" }} aria-hidden>
            <svg viewBox="0 0 100 40" width="86" height="34"><ellipse cx="30" cy="26" rx="26" ry="12" fill="#fff" /><ellipse cx="58" cy="22" rx="20" ry="12" fill="#fff" /></svg>
          </div>
          {/* twinkling sparkles */}
          {[
            { r: "12%", t: "18%" }, { r: "84%", t: "12%" }, { r: "40%", t: "10%" },
            { r: "58%", t: "82%" }, { r: "8%", t: "88%" }, { r: "93%", t: "36%" },
          ].map((p, i) => (
            <span key={i} className="anim-twinkle pointer-events-none absolute text-lg" style={{ right: p.r, top: p.t, animationDelay: `${i * 0.7}s` }} aria-hidden>✦</span>
          ))}

          {/* winding path */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path
              d="M 96 26 C 92 48, 88 60, 84 66 C 78 74, 74 34, 70 28 C 66 22, 62 62, 57 70 C 52 76, 48 32, 44 26 C 40 22, 36 62, 31 70 C 27 76, 23 32, 19 26 C 15 22, 12 60, 8 66"
              stroke="#F3E5C8"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0.1 3.6"
            />
            <path
              d="M 96 26 C 92 48, 88 60, 84 66 C 78 74, 74 34, 70 28 C 66 22, 62 62, 57 70 C 52 76, 48 32, 44 26 C 40 22, 36 62, 31 70 C 27 76, 23 32, 19 26 C 15 22, 12 60, 8 66"
              stroke="#E8D9BC"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0.1 4.4"
            />
          </svg>

          {/* world nodes */}
          {WORLDS.map((w, i) => {
            const unlocked = worldUnlocked(w.id);
            const isCurrent = unlocked && w.id === currentWorld;
            const pos = NODE_POS[i];
            const readyLessons = lessonsOfWorld(w.id);
            const doneCount = readyLessons.filter((l) => profile.progress[l.id]?.completed).length;
            const pct = readyLessons.length ? doneCount / readyLessons.length : 0;
            return (
              <button
                key={w.id}
                onClick={() => {
                  if (!unlocked) {
                    void playAudio(undefined, "پہلے پچھلی زمین مکمل کرو!");
                    return;
                  }
                  void playAudio(undefined, `${w.name.ur}!`);
                  openWorld(w.id);
                }}
                className="absolute -translate-y-1/2 translate-x-1/2 text-center transition-transform hover:scale-[1.04] focus-visible:outline-none"
                style={{ right: `${pos.x}%`, top: `${pos.y}%` }}
                aria-label={w.name.en}
              >
                <div
                  className={`node-circle mx-auto ${isCurrent ? "node-current" : ""} ${!unlocked ? "node-locked" : ""}`}
                  style={unlocked ? { background: `radial-gradient(circle at 32% 26%, #ffffffcc 0%, ${w.color} 46%)`, borderColor: "#4A3421" } : undefined}
                >
                  <Art id={unlocked ? MEDALS[i] : "lock"} size={unlocked ? 44 : 38} />
                </div>
                <div
                  className={`urdu-tight mx-auto mt-1.5 w-[5.6rem] rounded-full px-1 py-0.5 text-[0.82rem] font-bold leading-[1.9] sm:w-28 sm:text-[0.95rem] ${unlocked ? "bg-white/85 shadow-sm" : "bg-white/0"}`}
                  style={{ color: unlocked ? "#4A3421" : "#8A7156" }}
                >
                  {w.name.ur}
                </div>
                {unlocked && pct > 0 && (
                  <div className="meter mx-auto mt-1 w-16 sm:w-20" dir="ltr">
                    <span style={{ width: `${pct * 100}%` }} />
                  </div>
                )}
              </button>
            );
          })}

          {/* Noor & Bijli stand at the current spot */}
          {(() => {
            const idx = Math.max(0, WORLDS.findIndex((w) => w.id === currentWorld));
            const pos = NODE_POS[idx] ?? NODE_POS[0];
            return (
              <div className="pointer-events-none absolute z-10 flex translate-x-1/2 items-end gap-0.5 sm:gap-1" style={{ right: `${pos.x}%`, top: `calc(${pos.y}% + 52px)` }}>
                <Character id="noor" size={56} emote="waving" />
                <Character id="bijli" size={52} emote="happy" />
              </div>
            );
          })()}
        </div>
      </div>

      {/* Resume card */}
      {profile.current && (
        <div className="card-kid mt-5 flex flex-col items-center justify-between gap-4 p-5 sm:flex-row sm:p-6">
          <div className="text-center sm:text-right">
            <p className="urdu-tight text-2xl font-bold sm:text-[1.7rem]">وہاں سے شروع کرو جہاں تم رکے تھے!</p>
            <p className="urdu-tight text-lg text-roshan-ink-soft">
              سبق: {profile.current.lesson} — دوبارہ کھولو۔
            </p>
          </div>
          <button
            className="btn-kid btn-success w-full sm:w-auto"
            onClick={() => useApp.getState().openLesson(profile.current!.lesson, true)}
          >
            <span className="urdu-tight text-2xl font-bold">جاری رکھو</span>
          </button>
        </div>
      )}

      {/* Bottom action row: Brain Gym door */}
      <div className="mt-5 flex justify-center">
        <button
          className="btn-kid btn-reward"
          onClick={() => {
            void playAudio(undefined, "برین جم! دماغ کی ورزش کا وقت!");
            go("braingym");
          }}
        >
          <Art id="gem" size={36} />
          <span className="urdu-tight text-2xl font-bold">برین جم</span>
          <span className="ltr-term text-xs opacity-80" dir="ltr">Brain Gym · 3 min</span>
        </button>
      </div>

      <div className="fixed bottom-4 left-4 z-40 no-print">
        <RepeatButton />
      </div>
    </main>
  );
}

function IconButton({ art, label, onClick }: { art: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn-kid btn-back !min-h-16 !min-w-16 flex-col !gap-1 !rounded-2xl !px-3 !py-2" aria-label={label}>
      <Art id={art} size={30} />
      <span className="urdu-tight text-xs leading-4">{label}</span>
    </button>
  );
}
