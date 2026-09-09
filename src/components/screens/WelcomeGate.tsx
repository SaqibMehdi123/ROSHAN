/**
 * Welcome gate — first-run profile creation + returning-child picker.
 * Privacy: FIRST NAME ONLY, no surname/age/photo (spec §8).
 * Pair mode optional: 2 kids share 1 PC (spec §1) — buddy name stored locally only.
 */
"use client";

import { useState } from "react";
import { useApp, useActiveProfile } from "@/lib/store";
import { Bijli, Noor, Chotu } from "@/components/art/Characters";
import { BigButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio } from "@/lib/audio";
import type { Bilingual } from "@/lib/schema";

const AVATAR_COLORS = ["#F59E0B", "#0D9488", "#EC4899", "#38BDF8", "#22C55E", "#8B5CF6"];

export function WelcomeGate() {
  const { createProfile, go } = useApp();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [name, setName] = useState("");
  const [color, setColor] = useState(AVATAR_COLORS[0]);
  const [pairMode, setPairMode] = useState(false);
  const [buddy, setBuddy] = useState("");

  if (step === 0) {
    return (
      <Shell>
        <div className="anim-bob">
          <Bijli size={180} emote="waking" />
        </div>
        <h1 className="urdu-tight mt-4 text-[2.1rem] font-bold sm:text-4xl">
          سلام! میں <span className="text-roshan-orange-deep">بجلی</span> ہوں!
        </h1>
        <p className="urdu-tight mt-2 text-2xl text-roshan-ink-soft">
          تمھارا نام کیا ہے؟ (صرف پہلا نام)
        </p>
        <p className="ltr-term mt-1 text-sm text-roshan-ink-soft" dir="ltr">
          What is your name? (first name only — Bijli keeps it secret &amp; safe)
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={14}
          className="urdu mt-6 h-16 w-72 rounded-2xl border-4 border-roshan-card-border bg-white px-6 text-center text-2xl font-bold shadow-[var(--r-shadow)] outline-none transition-colors focus:border-roshan-orange"
          placeholder="نام"
          aria-label="Your first name"
        />
        <div className="mt-8">
          <BigButton
            label={{ ur: "چلو!", en: "Let's go!" }}
            variant="go"
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
        <p className="urdu-tight mt-1 text-xl text-roshan-ink-soft">یہ تمھارا خاص رنگ ہو گا۔</p>
        <div className="mt-8 flex max-w-lg flex-row-reverse flex-wrap justify-center gap-3 sm:gap-4">
          {AVATAR_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                void playAudio(undefined, "کمال!");
              }}
              className={`h-16 w-16 rounded-full border-4 transition-transform hover:scale-110 sm:h-20 sm:w-20 ${color === c ? "scale-110 border-roshan-ink shadow-[var(--r-shadow)]" : "border-white shadow"}`}
              style={{ background: c }}
              aria-label={`color ${c}`}
            />
          ))}
        </div>
        <div className="mt-10 flex items-end justify-center gap-6 sm:gap-8">
          <Bijli size={90} emote="happy" />
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-roshan-ink text-3xl font-bold text-white shadow-[var(--r-shadow-btn)]"
            style={{ background: `radial-gradient(circle at 32% 26%, #ffffffaa 0%, ${color} 52%)` }}
          >
            {name.trim().slice(0, 2)}
          </div>
          <Chotu size={90} emote="excited" />
        </div>
        <div className="mt-10 flex gap-4">
          <BigButton label={{ ur: "پیچھے", en: "Back" }} variant="back" onClick={() => setStep(0)} />
          <BigButton label={{ ur: "ٹھیک ہے!", en: "OK!" }} onClick={() => setStep(2)} />
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Noor size={100} emote="pointing" />
        <div className="text-center sm:text-right">
          <h2 className="urdu-tight text-3xl font-bold">کیا تم دو کھلاڑی ہو؟</h2>
          <p className="urdu-tight mt-1 text-xl text-roshan-ink-soft">
            ایک کمپیوٹر پر دو بچے — بار بار باری بدلیں گے!
          </p>
          <p className="ltr-term mt-1 text-xs text-roshan-ink-soft" dir="ltr">
            Pair mode: 2 children, 1 PC — the app reminds you to SWAP every 10 minutes.
          </p>
        </div>
        <Chotu size={100} emote="idle" />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setPairMode(false)}
          className={`btn-kid ${!pairMode ? "btn-teal" : "btn-back"}`}
        >
          <span className="urdu-tight text-xl font-semibold">نہیں، میں اکیلا ہوں</span>
        </button>
        <button
          onClick={() => setPairMode(true)}
          className={`btn-kid ${pairMode ? "btn-teal" : "btn-back"}`}
        >
          <span className="urdu-tight text-xl font-semibold">جی ہاں، دوست کے ساتھ!</span>
        </button>
      </div>

      {pairMode && (
        <div className="mt-6">
          <input
            value={buddy}
            onChange={(e) => setBuddy(e.target.value)}
            maxLength={14}
            className="urdu h-16 w-72 rounded-2xl border-4 border-roshan-card-border bg-white px-6 text-center text-2xl font-bold shadow-[var(--r-shadow)] outline-none focus:border-roshan-orange"
            placeholder="دوست کا پہلا نام"
            aria-label="Buddy first name"
          />
        </div>
      )}

      <div className="mt-10">
        <BigButton
          label={{ ur: "خوش آمدید, " + name.trim() + "!", en: `Welcome, ${name.trim()}!` }}
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
        <Bijli size={130} emote="happy" />
      </div>
      <h2 className="urdu-tight mt-2 text-3xl font-bold sm:text-4xl">کون کھیلے گا؟</h2>
      <div className="mt-8 flex flex-row-reverse flex-wrap justify-center gap-4">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              void playAudio(undefined, `خوش آمدید ${p.name}!`);
              selectProfile(p.id);
            }}
            className="card-kid flex min-h-32 w-40 flex-col items-center justify-center gap-2 p-4 transition-transform hover:scale-105"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-roshan-ink text-2xl font-bold text-white"
              style={{ background: p.avatarColor }}
            >
              {p.name.slice(0, 2)}
            </div>
            <span className="urdu-tight text-xl font-bold">{p.name}</span>
            <span className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">
              {Object.values(p.stars).reduce((a, b) => a + b, 0)} ★
            </span>
          </button>
        ))}
        <button
          onClick={() => go("welcome")}
          className="card-kid flex min-h-32 w-40 flex-col items-center justify-center gap-2 p-4 transition-transform hover:scale-105"
        >
          <span className="text-4xl">＋</span>
          <span className="urdu-tight text-lg font-bold">نیا کھلاڑی</span>
        </button>
      </div>
      <button onClick={() => go("teacher")} className="ltr-term mt-10 text-sm text-roshan-ink-soft underline" dir="ltr">
        Teacher Zone →
      </button>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const profile = useActiveProfile();
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-12 text-center">
      {/* soft decorative blobs */}
      <div className="pointer-events-none absolute -top-16 right-[12%] h-44 w-44 rounded-full bg-roshan-sun opacity-40 blur-2xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-[8%] left-[6%] h-52 w-52 rounded-full bg-roshan-sky opacity-20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute left-[14%] top-[10%] anim-twinkle text-2xl opacity-60" aria-hidden>✦</div>
      <div className="pointer-events-none absolute right-[18%] bottom-[16%] anim-twinkle text-xl opacity-50" style={{ animationDelay: "1.2s" }} aria-hidden>✦</div>
      {children}
      <div className="absolute left-4 top-4 no-print">
        <RepeatButton />
      </div>
      {profile && (
        <button
          onClick={() => useApp.getState().go("profiles")}
          className="ltr-term absolute right-4 top-4 text-sm text-roshan-ink-soft underline"
          dir="ltr"
        >
          switch player
        </button>
      )}
      <p className="ltr-term absolute bottom-3 left-0 right-0 text-center text-xs text-roshan-ink-soft" dir="ltr">
        ROSHAN · روشن — digital literacy for every village child · works offline
      </p>
    </main>
  );
}

export const WELCOME_LABELS: Record<string, Bilingual> = {}; // (i18n hook for Phase 2 full localization)
