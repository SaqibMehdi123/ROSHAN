/**
 * ALBUM (Trophy Shelf) — badges, sticker album, avatar outfits, personal streaks.
 * Motivation rules (spec §6): no leaderboards; personal bests only; completing always ≥1★.
 * v4: locked badges are gray silhouettes with a lock + unlock rule (no wall of beige);
 * outfits show star-progress meters toward the unlock.
 */
"use client";

import { useApp, useActiveProfile, outfitUnlocks } from "@/lib/store";
import { WORLDS, LESSONS, lessonsOfWorld } from "@/lib/content";
import { Art, lessonIcon } from "@/components/art/Props";
import { Chip, IconButton, RepeatButton, StarRow } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";

const MEDAL_ART = ["medal-box", "medal-mouse", "medal-keyboard", "medal-folder", "medal-paint", "medal-shield", "medal-gem", "medal-mountain"];

export function Album() {
  const { go } = useApp();
  const profile = useActiveProfile();
  if (!profile) return null;

  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);
  const unlocks = outfitUnlocks();

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 pb-24 pt-5 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <IconButton art="home" label="نقشے پر" onClick={() => go("map")} />
        <h1 className="urdu-tight flex-1 text-center text-2xl font-bold">میرا انعام خانہ</h1>
        <RepeatButton />
      </div>

      {/* headline stats — chips, one language */}
      <div className="card-kid mt-5 flex flex-wrap items-center justify-center gap-3 p-5">
        <Chip art="star" value={totalStars} label="ستارے" />
        <Chip value={profile.bugsFixed} label="بگ فکس" className="!border-success/50 !bg-success-tint" />
        <Chip value={`${profile.streak.count} دن`} label="لگاتار" className="!border-primary/40 !bg-primary-tint" />
        {profile.helperMode && (
          <Chip value="کمپیوٹر ہیرو!" className="!border-amber/50 !bg-amber-tint" />
        )}
      </div>

      {/* Badges per world — earned: full color; locked: silhouette + lock + rule */}
      <section className="mt-7">
        <h2 className="urdu mb-3 text-2xl font-bold text-right">بیج</h2>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {WORLDS.map((w) => {
            const earned = profile.badges.includes(w.badgeId);
            const lessons = lessonsOfWorld(w.id);
            const doneCount = lessons.filter((l) => profile.progress[l.id]?.completed).length;
            return (
              <button
                key={w.id}
                onClick={() =>
                  void playAudio(
                    undefined,
                    earned ? `${w.badgeName.ur}!` : doneCount > 0 ? "اس دنیا کے سب سبق مکمل کرو!" : "پہلے پچھلی دنیا کھلو!"
                  )
                }
                className={`card-kid relative flex flex-col items-center gap-1.5 p-3 ${earned ? "" : "opacity-90"}`}
                aria-label={`${w.badgeName.ur} — ${earned ? "مل گیا" : "ابھی باقی"}`}
              >
                <div
                  className="relative rounded-full"
                  style={{
                    background: earned ? `${w.color}26` : "#F1EADB",
                    padding: "6px",
                  }}
                >
                  <span className={earned ? "" : "locked-silhouette"}>
                    <Art id={MEDAL_ART[w.id - 1]} size={52} />
                  </span>
                </div>
                <span className={`urdu text-center text-[0.8rem] font-bold leading-[1.8] ${earned ? "" : "text-soft"}`}>
                  {w.badgeName.ur}
                </span>
                {!earned && doneCount > 0 && (
                  <span className="ltr-term text-[0.7rem] font-bold text-soft" dir="ltr">
                    {doneCount}/{lessons.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Sticker album — earned stickers shine; the rest stay a happy mystery */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="urdu text-2xl font-bold">سٹیکر البم</h2>
          <Chip value={`${profile.stickers.length}/${LESSONS.length}`} />
        </div>
        {profile.stickers.length === 0 ? (
          <div className="card-kid flex flex-col items-center gap-2.5 p-8 text-center">
            <div className="anim-bob">
              <Art id="medal-box" size={72} />
            </div>
            <p className="urdu text-lg font-bold">پہلا سبق مکمل کرو اور پہلا سٹیکر جیتو!</p>
            <BigButtonLite onClick={() => go("map")} label={{ ur: "سبق چلو!", en: "" }} />
          </div>
        ) : (
          <div className="card-kid grid grid-cols-3 gap-3 p-5 sm:grid-cols-5">
            {LESSONS.filter((l) => profile.stickers.includes(l.id)).map((l) => (
              <button
                key={l.id}
                onClick={() => void playAudio(undefined, l.title.ur)}
                className="flex flex-col items-center gap-1 rounded-[18px] border-2 border-success/40 bg-success-tint p-2.5"
              >
                <div className="anim-pop">
                  <Art id={lessonIcon(l.skillKey)} size={50} />
                </div>
                <span className="urdu text-center text-[0.75rem] font-semibold leading-[1.6]">{l.title.ur}</span>
                <StarRow count={profile.stars[l.id] ?? 0} size={17} animate={false} />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Outfit unlocks — star meters toward each unlock */}
      <section className="mt-8">
        <h2 className="urdu mb-3 text-2xl font-bold">پوشاک</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {unlocks.map((o) => {
            const earned = profile.outfits.includes(o.id) || totalStars >= o.at;
            const pct = Math.min(100, (totalStars / o.at) * 100);
            return (
              <div
                key={o.id}
                className={`card-kid flex flex-col items-center gap-2 p-4 ${earned ? "" : "opacity-90"}`}
              >
                <span className={earned ? "" : "locked-silhouette"}>
                  <Art id={earned ? "party-flag" : "lock"} size={52} />
                </span>
                <span className={`urdu text-base font-bold ${earned ? "" : "text-soft"}`}>{o.name.ur}</span>
                {earned ? (
                  <span className="urdu-tight rounded-full bg-success-tint px-3 py-0.5 text-[0.72rem] font-bold text-success">
                    مل گیا!
                  </span>
                ) : (
                  <div className="w-full px-1" dir="ltr">
                    <div className="meter !h-[10px]">
                      <span style={{ width: `${pct}%`, background: "#FFC800" }} />
                    </div>
                    <p className="ltr-term mt-1 text-center text-[0.7rem] font-bold text-soft">
                      {totalStars}/{o.at} ★
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

/** Small local CTA (keeps Album decoupled from BigButton's audio pop). */
function BigButtonLite({
  onClick,
  label,
}: {
  onClick: () => void;
  label: { ur: string; en: string };
}) {
  return (
    <button
      className="btn-kid btn-go !min-h-14 !px-7"
      onClick={() => {
        void playAudio(undefined, label.ur);
        onClick();
      }}
    >
      <span className="urdu-tight text-lg font-bold">{label.ur}</span>
      {label.en && <span className="ltr-term text-sm font-semibold opacity-80">{label.en}</span>}
    </button>
  );
}
