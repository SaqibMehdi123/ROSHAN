/**
 * BRAIN GYM — daily 3–5 min logic warm-up (spec §5): one rotating puzzle per day,
 * adaptive difficulty (tier up after 3 successes in a row — quiet step down on a stumble),
 * weekly "Brain Champion" personal-best streak (NO leaderboards, ever — spec §6).
 * v4: options are day-seeded shuffled (the odd-one-out no longer sits in a fixed
 * slot + duplicate ids can never collide as React keys), chunkier cards.
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import { brainGymForDay } from "@/lib/content";
import { useApp, useActiveProfile } from "@/lib/store";
import { Art } from "@/components/art/Props";
import { Bijli } from "@/components/art/Characters";
import { BigButton, BugBanner, Confetti, IconButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio, stopSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";
import { todayKey } from "@/lib/storage";

/** Deterministic per-day shuffle (mulberry32) — same order all day, fresh tomorrow. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  let t = seed + 0x6d2b79f5;
  const rnd = () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function BrainGym() {
  const { go, brainGymResult } = useApp();
  const profile = useActiveProfile();
  const [result, setResult] = useState<"idle" | "win">("idle");
  const [banner, setBanner] = useState<string | null>(null);
  const [tierUp, setTierUp] = useState(false);

  const tier = profile?.brainGym.tier ?? 1;
  const puzzle = useMemo(() => brainGymForDay(tier), [tier]);
  const playedToday = profile?.brainGym.lastPlayedDay === todayKey();

  // day-seeded option order — stable across re-renders, no fixed "odd" slot
  const options = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000);
    return seededShuffle(puzzle.options, dayIndex + puzzle.id.length);
  }, [puzzle]);

  useEffect(() => {
    void playAudio(puzzle.audio, puzzle.prompt.ur);
  }, [puzzle.id]);

  if (!profile) return null;

  const answer = (optionId: string) => {
    const success = optionId === puzzle.answer;
    if (success) {
      playSfx("fanfare", true);
      const res = brainGymResult(true);
      setTierUp(res.tier > tier);
      setResult("win");
      useApp.getState().tickMinutes(null);
      const today = todayKey();
      // mark daily play (read FRESH state so the streak from brainGymResult is preserved)
      const fresh = useApp.getState().profiles.find((p) => p.id === profile.id);
      if (fresh) {
        const updated = { ...fresh, brainGym: { ...fresh.brainGym, lastPlayedDay: today } };
        useApp.setState({ profiles: useApp.getState().profiles.map((p) => (p.id === profile.id ? updated : p)) });
      }
      void playAudio(undefined, puzzle.explain.ur);
    } else {
      playSfx("bugBoop", true);
      brainGymResult(false);
      setBanner(puzzle.explain.ur);
      setTimeout(() => setBanner(null), 4000);
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 pb-24 pt-5 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <IconButton art="home" label="نقشے پر" onClick={() => go("map")} />
        <h1 className="urdu-tight flex-1 text-center text-2xl font-bold">برین جم</h1>
        <RepeatButton />
      </div>

      <div className="card-kid mt-5 flex items-center justify-center gap-4 p-5 text-center">
        <Art id="gem" size={54} />
        <div className="text-right">
          <p className="urdu-tight text-lg font-bold">روزانہ ورزش · سطح {tier}</p>
          <p className="urdu-tight text-sm text-soft">
            {playedToday ? "آج مکمل! دوبارہ کھیل سکتے ہو" : "ہفتے کا چیمپیئن: اپنا ریکارڈ — صرف اپنے آپ سے مقابلہ!"}
          </p>
        </div>
      </div>

      {result === "win" ? (
        <div className="mt-8 text-center">
          <Confetti pieces={30} />
          <div className="anim-bob mx-auto w-fit">
            <Art id="trophy" size={130} />
          </div>
          <p className="urdu mt-4 text-3xl font-bold text-success">شاباش! دماغ تیز ہے!</p>
          <p className="urdu mt-2 text-xl">{puzzle.explain.ur}</p>
          {tierUp && (
            <p className="urdu mt-2 text-xl font-bold text-primary-strong">
              نئی سطح کھل گئی — اگلی دفعہ مشکل تر!
            </p>
          )}
          <p className="urdu-tight mt-2 text-base text-soft">لگاتار {profile.brainGym.streak} جیتیں!</p>
          <div className="mt-6 flex justify-center gap-3">
            <BigButton label={{ ur: "دوبارہ", en: "Replay" }} variant="back" onClick={() => { setResult("idle"); stopSpeaking(); }} />
            <BigButton label={{ ur: "سبق چلو", en: "To lesson" }} variant="go" onClick={() => go(profile.current ? "world" : "map")} />
          </div>
        </div>
      ) : (
        <div className="mt-7">
          <p className="urdu text-center text-2xl font-bold leading-[1.7]">{puzzle.prompt.ur}</p>
          <p className="ltr-term mt-1 text-center text-sm text-soft" dir="ltr">{puzzle.prompt.en}</p>

          {puzzle.series && (
            <div className="card-kid mt-6 flex flex-wrap items-center justify-center gap-4 p-6">
              {puzzle.series.map((s, i) => (
                <div key={i} className="anim-pop" style={{ animationDelay: `${i * 0.1}s` }}>
                  <Art id={s.art} size={70} />
                </div>
              ))}
              <span className="urdu text-4xl font-bold text-primary-strong">؟</span>
            </div>
          )}

          {/* options — day-shuffled so the odd one never sits in a fixed slot */}
          <div className="mx-auto mt-7 grid w-fit max-w-full grid-cols-3 gap-4 sm:grid-cols-4">
            {options.map((o, i) => (
              <button
                key={`${o.id}-${i}`}
                onClick={() => answer(o.id)}
                className="card-kid flex min-h-28 min-w-28 flex-col items-center justify-center gap-1 p-4 transition-transform hover:scale-110 active:translate-y-1"
              >
                <Art id={o.art} size={72} />
                {o.label && <span className="urdu text-sm">{o.label.ur}</span>}
              </button>
            ))}
          </div>

          {/* Bijli reacts — fills the stage instead of dead space */}
          <div className="mt-7 flex items-end justify-center gap-3" aria-hidden>
            <div className={banner ? "anim-wiggle" : "anim-bob"}>
              <Bijli size={banner ? 96 : 84} emote={banner ? "idle" : "happy"} />
            </div>
            <p className="urdu-tight max-w-[16rem] pb-6 text-sm text-soft">
              {banner ? "قریب ہے… ایک بار پھر سوچو!" : "آرام سے سوچو — جلدی نہیں!"}
            </p>
          </div>

          {banner && (
            <div className="mt-2">
              <BugBanner hint={{ ur: banner, en: "" }} visible />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
