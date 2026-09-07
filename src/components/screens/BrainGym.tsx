/**
 * BRAIN GYM — daily 3–5 min logic warm-up (spec §5): one rotating puzzle per day,
 * adaptive difficulty (tier up after 3 successes in a row — quiet step down on a stumble),
 * weekly "Brain Champion" personal-best streak (NO leaderboards, ever — spec §6).
 */
"use client";

import { useEffect, useMemo, useState } from "react";
import { brainGymForDay } from "@/lib/content";
import { useApp, useActiveProfile } from "@/lib/store";
import { Art } from "@/components/art/Props";
import { BigButton, BugBanner, Confetti, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio, stopSpeaking } from "@/lib/audio";
import { playSfx } from "@/lib/music";
import { todayKey } from "@/lib/storage";

export function BrainGym() {
  const { go, brainGymResult } = useApp();
  const profile = useActiveProfile();
  const [result, setResult] = useState<"idle" | "win">("idle");
  const [banner, setBanner] = useState<string | null>(null);
  const [tierUp, setTierUp] = useState(false);

  const tier = profile?.brainGym.tier ?? 1;
  const puzzle = useMemo(() => brainGymForDay(tier), [tier]);
  const playedToday = profile?.brainGym.lastPlayedDay === todayKey();

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
      // mark daily play + weekly best (personal best only)
      const updated = {
        ...profile,
        brainGym: { ...profile.brainGym, lastPlayedDay: today },
      };
      useApp.setState({ profiles: useApp.getState().profiles.map((p) => (p.id === profile.id ? updated : p)) });
      void playAudio(undefined, puzzle.explain.ur);
    } else {
      playSfx("bugBoop", true);
      brainGymResult(false);
      setBanner(puzzle.explain.ur);
      setTimeout(() => setBanner(null), 4000);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 pb-24 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <BigButton label={{ ur: "نقشے پر", en: "Map" }} variant="back" onClick={() => go("map")} />
        <RepeatButton />
      </div>

      <div className="card-kid p-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <Art id="gem" size={44} />
          <h1 className="urdu text-3xl font-bold">برین جم</h1>
          <Art id="gem" size={44} />
        </div>
        <p className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">
          daily warm-up · tier {tier} {playedToday ? "· done today — you can still replay!" : ""}
        </p>
        <p className="urdu mt-1 text-lg text-roshan-ink-soft">
          ہفتہ وار چیمپیئن: ذاتی ریکارڈ — صرف اپنے آپ سے مقابلہ!
        </p>
      </div>

      {result === "win" ? (
        <div className="mt-8 text-center">
          <Confetti pieces={30} />
          <div className="anim-bob mx-auto w-fit"><Art id="trophy" size={120} /></div>
          <p className="urdu mt-4 text-3xl font-bold text-roshan-green">شاباش! دماغ تیز ہے!</p>
          <p className="urdu mt-2 text-xl">{puzzle.explain.ur}</p>
          {tierUp && (
            <p className="urdu mt-2 text-xl font-bold text-roshan-orange">
              نئی سطح کھل گئی — اگلی دفعہ مشکل تر!
            </p>
          )}
          <p className="ltr-term mt-2 text-sm text-roshan-ink-soft" dir="ltr">streak: {profile.brainGym.streak} in a row</p>
          <div className="mt-6 flex justify-center gap-3">
            <BigButton label={{ ur: "دوبارہ", en: "Replay" }} variant="back" onClick={() => { setResult("idle"); stopSpeaking(); }} />
            <BigButton label={{ ur: "سبق چلو", en: "To lesson" }} variant="go" onClick={() => go(profile.current ? "world" : "map")} />
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <p className="urdu text-center text-2xl font-bold">{puzzle.prompt.ur}</p>
          <p className="ltr-term mt-1 text-center text-sm text-roshan-ink-soft" dir="ltr">{puzzle.prompt.en}</p>

          {puzzle.series && (
            <div className="mt-6 flex items-center justify-center gap-3">
              {puzzle.series.map((s, i) => (
                <div key={i} className="anim-pop" style={{ animationDelay: `${i * 0.1}s` }}>
                  <Art id={s.art} size={64} />
                </div>
              ))}
              <span className="urdu text-3xl font-bold text-roshan-orange">؟</span>
            </div>
          )}

          <div className="mt-8 flex flex-row-reverse flex-wrap justify-center gap-5">
            {puzzle.options.map((o) => (
              <button
                key={o.id}
                onClick={() => answer(o.id)}
                className="card-kid flex min-h-28 min-w-28 flex-col items-center justify-center gap-1 p-4 transition-transform hover:scale-110"
              >
                <Art id={o.art} size={72} />
                {o.label && <span className="urdu text-sm">{o.label.ur}</span>}
              </button>
            ))}
          </div>

          {banner && <div className="mt-6"><BugBanner hint={{ ur: banner, en: "" }} visible /></div>}
        </div>
      )}
    </main>
  );
}
