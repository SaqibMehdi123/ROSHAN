/**
 * ALBUM (Trophy Shelf) — badges, sticker album, avatar outfits, personal streaks.
 * Motivation rules (spec §6): no leaderboards; personal bests only; completing always ≥1★.
 */
"use client";

import { useApp, useActiveProfile, outfitUnlocks } from "@/lib/store";
import { WORLDS, LESSONS } from "@/lib/content";
import { Art, lessonIcon } from "@/components/art/Props";
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
        <p className="urdu-tight mt-1 text-base text-roshan-ink-soft" dir="rtl">
          ★ {totalStars} · بگ فکس {profile.bugsFixed} · لگاتار {profile.streak.count} دن
          {profile.helperMode ? " · کمپیوٹر ہیرو!" : ""}
        </p>
        <p className="ltr-term mt-0.5 text-xs text-roshan-ink-soft" dir="ltr">
          {totalStars} stars · {profile.bugsFixed} bugs fixed · {profile.streak.count}-day streak
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

      {/* Sticker album — earned stickers shine; the rest stay a happy mystery */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="urdu text-2xl font-bold">سٹیکر البم — Stickers</h2>
          <span className="stat-chip urdu-tight text-sm">
            <span className="ltr-term" dir="ltr">{profile.stickers.length}/{LESSONS.length}</span>
          </span>
        </div>
        {profile.stickers.length === 0 ? (
          <div className="card-kid flex flex-col items-center gap-2 p-8 text-center">
            <Art id="medal-box" size={64} />
            <p className="urdu text-lg font-bold">پہلا سبق مکمل کرو اور پہلا سٹیکر جیتو!</p>
            <p className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">Finish your first lesson to earn a sticker!</p>
          </div>
        ) : (
          <div className="card-kid grid grid-cols-3 gap-3 p-5 sm:grid-cols-5">
            {LESSONS.filter((l) => profile.stickers.includes(l.id)).map((l) => (
              <button
                key={l.id}
                onClick={() => void playAudio(undefined, l.title.ur)}
                className="flex flex-col items-center gap-1 rounded-2xl border-3 border-roshan-green bg-green-50 p-2"
              >
                <div className="anim-pop">
                  <Art id={lessonIcon(l.skillKey)} size={46} />
                </div>
                <span className="urdu text-center text-[0.75rem] font-semibold leading-[1.6]">{l.title.ur}</span>
                <StarRow count={profile.stars[l.id] ?? 0} size={16} animate={false} />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Outfit unlocks */}
      <section className="mt-8">
        <h2 className="urdu mb-3 text-2xl font-bold">پوشاک — Outfits</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {unlocks.map((o) => {
            const earned = profile.outfits.includes(o.id) || totalStars >= o.at;
            return (
              <div key={o.id} className={`card-kid flex min-w-36 flex-col items-center gap-1 p-3 ${earned ? "" : "opacity-45"}`}>
                <Art id={earned ? "party-flag" : "lock"} size={44} />
                <span className="urdu text-sm font-bold">{o.name.ur}</span>
                <span className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">{totalStars}/{o.at} ★</span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
