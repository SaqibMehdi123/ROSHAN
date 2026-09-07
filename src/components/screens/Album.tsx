/**
 * ALBUM (Trophy Shelf) — badges, sticker album, avatar outfits, personal streaks.
 * Motivation rules (spec §6): no leaderboards; personal bests only; completing always ≥1★.
 */
"use client";

import { useApp, useActiveProfile, outfitUnlocks } from "@/lib/store";
import { WORLDS, LESSONS } from "@/lib/content";
import { Art } from "@/components/art/Props";
import { BigButton, RepeatButton, StarRow } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";

export function Album() {
  const { go } = useApp();
  const profile = useActiveProfile();
  if (!profile) return null;

  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);
  const unlocks = outfitUnlocks();

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-24 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <BigButton label={{ ur: "نقشے پر", en: "Map" }} variant="back" onClick={() => go("map")} />
        <RepeatButton />
      </div>

      <div className="card-kid p-5 text-center">
        <h1 className="urdu text-3xl font-bold">میرا انعام خانہ</h1>
        <p className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">
          Trophy Shelf — {totalStars} stars · {profile.bugsFixed} bugs fixed · streak {profile.streak.count} days
          {profile.helperMode ? " · Computer Hero helper!" : ""}
        </p>
      </div>

      {/* Badges per world */}
      <section className="mt-6">
        <h2 className="urdu mb-3 text-2xl font-bold text-right">بیج — Badges</h2>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {WORLDS.map((w) => {
            const earned = profile.badges.includes(w.badgeId);
            return (
              <button
                key={w.id}
                onClick={() => void playAudio(undefined, earned ? `${w.badgeName.ur}!` : "یہ بیج ابھی باقی ہے!")}
                className={`card-kid flex flex-col items-center gap-1 p-3 ${earned ? "" : "opacity-45"}`}
              >
                <div className="rounded-full" style={{ background: earned ? w.color : "#EFE9DD" }}>
                  <Art id={`medal-${["box", "mouse", "keyboard", "folder", "paint", "shield", "gem", "mountain"][w.id - 1]}`} size={52} />
                </div>
                <span className="urdu text-center text-[0.8rem] font-bold leading-[1.8]">{w.badgeName.ur}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Sticker album — one per completed lesson */}
      <section className="mt-8">
        <h2 className="urdu mb-3 text-2xl font-bold text-right">سٹیکر البم — Sticker Album</h2>
        <div className="card-kid grid grid-cols-4 gap-3 p-5 sm:grid-cols-6">
          {LESSONS.map((l) => {
            const earned = profile.stickers.includes(l.id);
            return (
              <button
                key={l.id}
                onClick={() => void playAudio(undefined, earned ? l.title.ur : "یہ سٹیکر اےسے ملے گا!")}
                className={`flex flex-col items-center gap-1 rounded-2xl border-3 border-dashed p-2 ${earned ? "border-roshan-green bg-green-50" : "border-roshan-card-border opacity-60"}`}
              >
                {earned ? <div className="anim-pop"><Art id="star" size={44} /></div> : <span className="urdu text-2xl text-roshan-lock">؟</span>}
                <span className="urdu text-[0.75rem] leading-[1.7]">{l.title.ur}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Outfit unlocks */}
      <section className="mt-8">
        <h2 className="urdu mb-3 text-2xl font-bold text-right">پوشاک — Outfits</h2>
        <div className="flex flex-wrap justify-end gap-4">
          {unlocks.map((o) => {
            const earned = profile.outfits.includes(o.id) || totalStars >= o.at;
            return (
              <div key={o.id} className={`card-kid flex min-w-36 flex-col items-center gap-1 p-3 ${earned ? "" : "opacity-45"}`}>
                <Art id={earned ? "medal-paint" : "lock"} size={44} />
                <span className="urdu text-sm font-bold">{o.name.ur}</span>
                <span className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">{totalStars}/{o.at} ★</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest stars */}
      <section className="mt-8">
        <h2 className="urdu mb-3 text-2xl font-bold text-right">تارے — My stars</h2>
        <div className="flex flex-wrap justify-end gap-3">
          {LESSONS.filter((l) => profile.stars[l.id]).map((l) => (
            <div key={l.id} className="card-kid flex items-center gap-3 p-3">
              <span className="urdu text-sm font-bold">{l.title.ur}</span>
              <StarRow count={profile.stars[l.id]} size={26} animate={false} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
