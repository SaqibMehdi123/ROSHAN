/**
 * WELCOME GATE (v4) — first-run profile creation + returning-child picker.
 * Centered flow on the painted village sky — no dead gray voids.
 * Privacy: FIRST NAME ONLY, no surname/age/photo (spec §8).
 */
"use client";

import { useState } from "react";
import { useApp, useActiveProfile } from "@/lib/store";
import { Bijli, Noor, Chotu } from "@/components/art/Characters";
import { BigButton, EnvBackdrop, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";
import type { Bilingual } from "@/lib/schema";

const AVATAR_COLORS = ["#FF9600", "#22C55E", "#FF6F59", "#3E9BE8", "#FFC800", "#8B5CF6"];

export function WelcomeGate() {
  const { createProfile } = useApp();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [color, setColor] = useState(AVATAR_COLORS[0]);
  const [pairMode, setPairMode] = useState(false);
  const [buddy, setBuddy] = useState("");

  if (step === 0) {
    return (
      <Shell>
        <div className="anim-bob">
          <Bijli size={150} emote="waking" />
        </div>
        <h1 className="urdu-tight mt-5 text-[2rem] font-bold sm:text-4xl">
          سلام! میں <span className="text-primary-strong">بجلی</span> ہوں!
        </h1>
        <p className="urdu-tight mt-2 text-xl text-soft">تمھارا نام کیا ہے؟ (صرف پہلا نام)</p>
        <p className="ltr-term mt-1 text-sm text-soft" dir="ltr">
          What is your name? (first name only)
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={14}
          className="field urdu mt-6"
          placeholder="نام"
          aria-label="Your first name"
        />
        <div className="mt-7">
          <BigButton
            label={{ ur: "چلو!", en: "Let's go!" }}
            variant="go"
            className="w-72"
            disabled={name.trim().length < 2}
            onClick={() => {
              void playAudio(undefined, "واہ! خوبصورت نام ہے!");
              setStep(1);
            }}
          />
        </div>
      </Shell>
    );
  }

  if (step === 1) {
    return (
      <Shell>
        <h2 className="urdu-tight text-3xl font-bold sm:text-4xl">اپنا رنگ چُنو!</h2>
        <p className="urdu-tight mt-1 text-lg text-soft">یہ تمھارا خاص رنگ ہو گا۔</p>
        <div className="mt-8 mx-auto grid w-fit grid-cols-6 gap-3 sm:gap-4">
          {AVATAR_COLORS.map((c) => {
            const on = color === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setColor(c);
                  void playAudio(undefined, "کمال!");
                }}
                className={`h-14 w-14 rounded-full transition-transform hover:scale-110 sm:h-16 sm:w-16 ${on ? "scale-110" : ""}`}
                style={{
                  background: c,
                  border: on ? "5px solid #fff" : "none",
                  boxShadow: on
                    ? `0 0 0 3px ${c}, 0 5px 0 rgba(62,56,50,0.18)`
                    : "0 4px 0 rgba(62,56,50,0.16)",
                }}
                aria-label={`color ${c}`}
              >
                {on && (
                  <span className="ltr-term flex h-full w-full items-center justify-center text-3xl font-bold text-white" aria-hidden>
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-9 flex items-end justify-center gap-6">
          <Bijli size={84} emote="happy" />
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white"
            style={{
              background: color,
              border: "4px solid #fff",
              boxShadow: "0 0 0 2px var(--r-line-strong), 0 5px 0 rgba(62,56,50,0.15)",
            }}
          >
            {name.trim().slice(0, 2)}
          </div>
          <Chotu size={84} emote="excited" />
        </div>
        <p className="urdu-tight mt-3 text-base text-soft">یہ تمھارا کردار ہے — {name.trim()}!</p>
        <div className="mt-8 flex gap-4">
          <BigButton label={{ ur: "پیچھے", en: "Back" }} variant="back" onClick={() => setStep(0)} />
          <BigButton label={{ ur: "ٹھیک ہے!", en: "OK!" }} variant="success" onClick={() => setStep(2)} />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
        <Noor size={92} emote="pointing" />
        <div className="max-w-sm text-center sm:text-right">
          <h2 className="urdu-tight text-3xl font-bold">کیا تم دو کھلاڑی ہو؟</h2>
          <p className="urdu-tight mt-1 text-lg text-soft">ایک کمپیوٹر پر دو بچے — بار بار باری بدلیں گے!</p>
          <p className="ltr-term mt-1 text-xs text-soft" dir="ltr">
            Pair mode: 2 children, 1 PC — swap seats every 10 minutes.
          </p>
        </div>
        <Chotu size={92} emote="idle" />
      </div>

      {/* two option cards — character art, no emoji */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setPairMode(false)}
          className={`card-kid flex w-56 flex-col items-center gap-2 px-5 py-4 transition-all ${
            !pairMode
              ? "!border-primary !border-[3px] bg-primary-tint"
              : "hover:!border-soft"
          }`}
        >
          <Bijli size={72} emote="happy" />
          <span className="urdu-tight text-lg font-bold">نہیں، میں اکیلا ہوں</span>
        </button>
        <button
          onClick={() => setPairMode(true)}
          className={`card-kid flex w-56 flex-col items-center gap-2 px-5 py-4 transition-all ${
            pairMode
              ? "!border-primary !border-[3px] bg-primary-tint"
              : "hover:!border-soft"
          }`}
        >
          <div className="flex items-end">
            <Noor size={64} emote="happy" />
            <Chotu size={72} emote="excited" />
          </div>
          <span className="urdu-tight text-lg font-bold">جی ہاں، دوست کے ساتھ!</span>
        </button>
      </div>

      {pairMode && (
        <div className="mt-6">
          <input
            value={buddy}
            onChange={(e) => setBuddy(e.target.value)}
            maxLength={14}
            className="field urdu mt-5"
            placeholder="دوست کا پہلا نام"
            aria-label="Buddy first name"
          />
        </div>
      )}

      <div className="mt-9">
        <BigButton
          label={{ ur: `خوش آمدید، ${name.trim()}!`, en: `Welcome, ${name.trim()}!` }}
          variant="success"
          onClick={() => createProfile(name, color, pairMode, pairMode ? buddy : undefined)}
        />
      </div>
    </Shell>
  );
}

/** Profile picker for returning kids. */
export function ProfileGate() {
  const { profiles, selectProfile, go } = useApp();
  return (
    <Shell>
      <div className="anim-bob">
        <Bijli size={110} emote="happy" />
      </div>
      <h2 className="urdu-tight mt-2 text-3xl font-bold sm:text-4xl">کون کھیلے گا؟</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              void playAudio(undefined, `خوش آمدید ${p.name}!`);
              selectProfile(p.id);
            }}
            className="card-kid flex min-h-36 w-40 flex-col items-center justify-center gap-2 p-4 transition-transform hover:scale-[1.04]"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
              style={{
                background: p.avatarColor,
                border: "3px solid #fff",
                boxShadow: "0 0 0 2px var(--r-line-strong), 0 4px 0 rgba(62,56,50,0.12)",
              }}
            >
              {p.name.slice(0, 2)}
            </div>
            <span className="urdu-tight text-xl font-bold">{p.name}</span>
            <span className="chip !py-0.5" dir="ltr">
              {Object.values(p.stars).reduce((a, b) => a + b, 0)} ★
            </span>
          </button>
        ))}
        <button
          onClick={() => go("welcome")}
          className="flex min-h-36 w-40 flex-col items-center justify-center gap-2 rounded-[24px] border-[3px] border-dashed border-line-strong p-4 text-soft transition-colors hover:border-primary hover:text-primary"
        >
          <span className="text-4xl" aria-hidden>＋</span>
          <span className="urdu-tight text-lg font-bold">نیا کھلاڑی</span>
        </button>
      </div>
      <button onClick={() => go("teacher")} className="ltr-term mt-10 text-sm text-soft underline" dir="ltr">
        Teacher Zone →
      </button>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const profile = useActiveProfile();
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-12 text-center">
      <EnvBackdrop />
      {children}
      <div className="absolute left-4 top-4 no-print">
        <RepeatButton />
      </div>
      {profile && (
        <button
          onClick={() => useApp.getState().go("profiles")}
          className="ltr-term absolute right-4 top-4 text-sm text-soft underline"
          dir="ltr"
        >
          switch player
        </button>
      )}
      <p className="urdu-tight absolute bottom-3 left-0 right-0 text-center text-sm text-soft" dir="rtl">
        روشن — ہر بچے کی روشن کمپیوٹر دنیا · بغیر انٹرنیٹ بھی چلتا ہے
      </p>
    </main>
  );
}

export const WELCOME_LABELS: Record<string, Bilingual> = {}; // (i18n hook for Phase 2 full localization)
