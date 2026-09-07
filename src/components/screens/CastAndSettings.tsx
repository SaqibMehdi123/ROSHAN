/**
 * CAST screen — tap any friend to hear their intro + catchphrase (audio-first).
 * SETTINGS — music/sfx toggles, pair-mode info, teacher zone entry.
 */
"use client";

import { useState } from "react";
import { useApp, useActiveProfile, checkTeacherPin, setTeacherPin } from "@/lib/store";
import { CHARACTERS } from "@/lib/content";
import { Character } from "@/components/art/Characters";
import { BigButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio, stopSpeaking } from "@/lib/audio";

export function CastScreen() {
  const { go } = useApp();
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-24 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <BigButton label={{ ur: "نقشے پر", en: "Map" }} variant="back" onClick={() => go("map")} />
        <RepeatButton />
      </div>

      <div className="card-kid p-5 text-center">
        <h1 className="urdu text-3xl font-bold">میرے دوست — My Friends</h1>
        <p className="urdu mt-1 text-lg text-roshan-ink-soft">کسی بھی دوست پر دباؤ — وہ بولے گا!</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {CHARACTERS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActive(c.id);
              void playAudio(c.introAudio, `${c.role.ur} ${c.catchphrase.ur}`);
            }}
            className={`card-kid flex flex-col items-center gap-2 p-4 transition-transform hover:scale-105 ${active === c.id ? "border-roshan-orange bg-orange-50" : ""}`}
          >
            <div className={active === c.id ? "anim-cheer" : "anim-bob"}>
              <Character id={c.id} size={active === c.id ? 150 : 120} />
            </div>
            <p className="urdu text-2xl font-bold" style={{ color: c.color }}>{c.name.ur}</p>
            <p className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">{c.name.en}</p>
            {active === c.id && (
              <div className="mt-1 w-full text-right">
                <p className="urdu text-base leading-[2]">{c.role.ur}</p>
                <p className="urdu text-lg font-bold text-roshan-orange-deep">“{c.catchphrase.ur}”</p>
                <p className="ltr-term text-[0.7rem] text-roshan-ink-soft" dir="ltr">{c.catchphrase.en}</p>
              </div>
            )}
          </button>
        ))}
      </div>
    </main>
  );
}

export function SettingsScreen() {
  const { go, setSettings, setDevice, device } = useApp();
  const profile = useActiveProfile();
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const teacherHashExists = typeof window !== "undefined" && !!localStorage.getItem("roshan.v1.teacher");

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 pb-24 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <BigButton label={{ ur: "نقشے پر", en: "Map" }} variant="back" onClick={() => go("map")} />
        <RepeatButton />
      </div>

      <div className="card-kid p-6">
        <h1 className="urdu text-3xl font-bold text-center">سیٹنگز</h1>

        <div className="mt-6 space-y-4">
          <Toggle
            labelUr="سنگیت — background music"
            on={profile?.settings.music ?? device.music}
            onChange={(v) => (profile ? setSettings({ music: v }) : setDevice({ music: v }))}
          />
          <Toggle
            labelUr="آوازیں — sound effects"
            on={profile?.settings.sfx ?? device.sfx}
            onChange={(v) => (profile ? setSettings({ sfx: v }) : setDevice({ sfx: v }))}
          />
        </div>

        {profile?.pairMode && (
          <div className="mt-6 rounded-2xl border-3 border-roshan-teal bg-teal-50 p-4 text-right">
            <p className="urdu text-lg font-bold">جوڑی موڈ چالو ہے</p>
            <p className="urdu text-base">{profile.name} ↔ {profile.buddyName ?? "دوست"} — ہر ١٠ منٹ میں سوپ!</p>
          </div>
        )}

        {/* Teacher zone */}
        <div className="mt-8 border-t-2 border-dashed border-roshan-card-border pt-6">
          <p className="urdu text-xl font-bold text-right">اُستاد زون — Teacher Zone</p>
          <div className="mt-3 flex flex-row-reverse items-center gap-3">
            <input
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false); }}
              className="ltr-term h-14 w-44 rounded-xl border-4 border-roshan-card-border bg-white px-4 text-center text-2xl font-bold outline-none focus:border-roshan-teal"
              placeholder="PIN"
              inputMode="numeric"
              maxLength={6}
              dir="ltr"
            />
            <button
              className="btn-kid btn-teal"
              onClick={() => {
                if (teacherHashExists) {
                  if (checkTeacherPin(pin)) go("teacher");
                  else setPinError(true);
                } else if (pin.length >= 4) {
                  setTeacherPin(pin); // first run: create PIN
                  go("teacher");
                } else setPinError(true);
              }}
            >
              <span className="urdu text-lg font-bold">داخل ہوں</span>
            </button>
          </div>
          <p className="ltr-term mt-2 text-xs text-roshan-ink-soft" dir="ltr">
            {teacherHashExists ? "Enter the PIN you created." : "First time: choose a PIN (4+ digits) for the teacher hub."}
          </p>
          {pinError && <p className="urdu mt-1 text-base text-roshan-orange-deep">پن غلط ہے — دوبارہ کوشش کریں۔</p>}
        </div>
      </div>
    </main>
  );
}

function Toggle({ labelUr, on, onChange }: { labelUr: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => {
        stopSpeaking();
        onChange(!on);
        void playAudio(undefined, on ? "بند" : "چالو");
      }}
      className="flex w-full items-center justify-between rounded-2xl border-3 border-roshan-card-border bg-white p-4"
    >
      <span
        className={`flex h-10 w-18 items-center rounded-full border-3 border-roshan-ink p-1 transition-colors ${on ? "bg-roshan-green" : "bg-roshan-lock"}`}
        style={{ width: "4.5rem" }}
      >
        <span className={`h-6 w-6 rounded-full bg-white transition-transform ${on ? "translate-x-8" : "translate-x-0"}`} />
      </span>
      <span className="urdu text-lg font-semibold">{labelUr}</span>
    </button>
  );
}
