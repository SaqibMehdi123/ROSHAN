/**
 * ADVENTURE MAP — the home screen and ONLY navigation for children (spec §4).
 * A winding right→left path through 8 lands; completed = bright, locked = soft grey
 * with friendly lock; Noor & Bijli stand at the child's current spot.
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
  { x: 5, y: 30 },
  { x: 18, y: 62 },
  { x: 30, y: 28 },
  { x: 43, y: 64 },
  { x: 55, y: 30 },
  { x: 67, y: 66 },
  { x: 79, y: 32 },
  { x: 88, y: 62 },
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

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 pb-28 pt-4">
      {/* Top bar: greeting + icon buttons (map IS the navigation; these are meta actions) */}
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-roshan-ink text-xl font-bold text-white"
            style={{ background: profile.avatarColor }}
          >
            {profile.name.slice(0, 2)}
          </div>
          <div className="text-right">
            <p className="urdu text-xl font-bold leading-[1.9]">{profile.name}! خوش آمدید</p>
            <p className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">
              ★ {Object.values(profile.stars).reduce((a, b) => a + b, 0)} · bugs fixed: {profile.bugsFixed}
              {profile.helperMode ? " · Computer Hero!" : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton art="trophy" label="انعام" onClick={() => go("album")} />
          <IconButton art="medal-box" label="دوست" onClick={() => go("cast")} />
          <IconButton art="home" label="سیٹنگ" onClick={() => go("settings")} />
        </div>
      </header>

      {/* The map */}
      <div className="card-kid relative overflow-hidden p-2" style={{ background: "linear-gradient(180deg,#BFE8F5 0%, #FFF8EC 100%)" }}>
        <div className="relative aspect-[2/1] min-h-[380px] w-full">
          {/* winding path */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path
              d="M 95 30 C 90 52, 87 58, 82 62 C 76 66, 74 32, 70 28 C 66 25, 62 58, 57 64 C 52 69, 49 33, 45 30 C 41 28, 38 60, 33 66 C 29 70, 25 35, 21 32 C 17 30, 14 56, 10 62"
              stroke="#E8D9BC"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0.1 3.2"
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
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ right: `${pos.x}%`, top: `${pos.y}%` }}
                aria-label={w.name.en}
              >
                <div
                  className={`node-circle ${isCurrent ? "node-current" : ""} ${!unlocked ? "node-locked" : ""}`}
                  style={unlocked ? { background: w.color, borderColor: "#4A3421" } : undefined}
                >
                  <Art id={unlocked ? MEDALS[i] : "lock"} size={unlocked ? 44 : 40} />
                </div>
                <div className="urdu mt-1 w-24 text-center text-[0.95rem] font-bold leading-[1.8]" style={{ color: unlocked ? "#4A3421" : "#8A7156" }}>
                  {w.name.ur}
                </div>
                {unlocked && pct > 0 && (
                  <div className="mx-auto mt-0.5 h-2 w-16 overflow-hidden rounded-full bg-white/70" dir="ltr">
                    <div className="h-full rounded-full bg-roshan-green" style={{ width: `${pct * 100}%` }} />
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
              <div className="pointer-events-none absolute flex translate-x-1/2 items-end gap-1" style={{ right: `${pos.x}%`, top: `calc(${pos.y}% + 44px)` }}>
                <Character id="noor" size={62} emote="waving" />
                <Character id="bijli" size={58} emote="happy" />
              </div>
            );
          })()}
        </div>
      </div>

      {/* Resume card */}
      {profile.current && (
        <div className="card-kid mt-5 flex items-center justify-between gap-4 p-5">
          <div>
            <p className="urdu text-2xl font-bold">وہاں سے شروع کرو جہاں تم رکے تھے!</p>
            <p className="urdu text-lg text-roshan-ink-soft">
              سبق: {profile.current.lesson} — دوبارہ کھولو۔
            </p>
          </div>
          <button
            className="btn-kid btn-success"
            onClick={() => useApp.getState().openLesson(profile.current!.lesson, true)}
          >
            <span className="urdu text-2xl font-bold">جاری رکھو</span>
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
          <span className="urdu text-2xl font-bold">برین جم</span>
          <span className="ltr-term text-xs opacity-80" dir="ltr">Brain Gym · 3 min</span>
        </button>
      </div>

      <div className="fixed bottom-4 left-4 no-print">
        <RepeatButton />
      </div>
    </main>
  );
}

function IconButton({ art, label, onClick }: { art: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="btn-kid !min-h-16 !min-w-16 flex-col !px-3 !py-2" aria-label={label}>
      <Art id={art} size={30} />
      <span className="urdu text-xs leading-4">{label}</span>
    </button>
  );
}
