/**
 * CAST screen — tap any friend to hear their intro + catchphrase (audio-first).
 * SETTINGS — music/sfx toggles, pair-mode info, teacher zone entry.
 */
"use client";

import { useState } from "react";
import { useApp, useActiveProfile, checkTeacherPin, setTeacherPin } from "@/lib/store";
import { CHARACTERS } from "@/lib/content";
import { Character } from "@/components/art/Characters";
import { IconButton, RepeatButton } from "@/components/ui-kids/KidKit";
import { playAudio, stopSpeaking } from "@/lib/audio";

export function CastScreen() {
  const { go } = useApp();
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 pb-24 pt-5 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <IconButton art="home" label="نقشے پر" onClick={() => go("map")} />
        <h1 className="urdu-tight flex-1 text-center text-2xl font-bold">میرے دوست</h1>
        <RepeatButton />
      </div>

      <p className="urdu-tight mt-3 text-center text-base text-soft">کسی بھی دوست پر دباؤ — وہ بولے گا!</p>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {CHARACTERS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setActive(c.id);
              void playAudio(c.introAudio, `${c.role.ur} ${c.catchphrase.ur}`);
            }}
            className={`card-kid flex flex-col items-center gap-2 p-4 transition-transform hover:scale-[1.03] ${active === c.id ? "!border-primary shadow-[var(--r-shadow-lg)]" : ""}`}
          >
            <div className={active === c.id ? "anim-cheer" : "anim-bob"}>
              <Character id={c.id} size={active === c.id ? 150 : 120} />
            </div>
            <p className="urdu text-2xl font-bold" style={{ color: c.color }}>{c.name.ur}</p>
            <p className="ltr-term text-xs text-soft" dir="ltr">{c.name.en}</p>
            {active === c.id && (
              <div className="mt-1 w-full text-right">
                <p className="urdu text-base leading-[1.7]">{c.role.ur}</p>
                <p className="urdu text-lg font-bold text-primary-strong">“{c.catchphrase.ur}”</p>
                <p className="ltr-term text-[0.7rem] text-soft" dir="ltr">{c.catchphrase.en}</p>
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
    <main className="mx-auto min-h-screen w-full max-w-xl px-4 pb-24 pt-5 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <IconButton art="home" label="نقشے پر" onClick={() => go("map")} />
        <h1 className="urdu-tight flex-1 text-center text-2xl font-bold">سیٹنگز</h1>
        <RepeatButton />
      </div>

      <div className="card-kid mt-5 p-6">

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
          <Toggle
            labelUr="آہستہ آواز — slow story voice"
            on={profile?.settings.slowVoice ?? device.slowVoice}
            onChange={(v) => (profile ? setSettings({ slowVoice: v }) : setDevice({ slowVoice: v }))}
          />
        </div>

        {profile?.pairMode && (
          <div className="mt-6 rounded-2xl border border-success/30 bg-success-tint p-4 text-right">
            <p className="urdu text-lg font-bold text-success">جوڑی موڈ چالو ہے</p>
            <p className="urdu text-base">{profile.name} ↔ {profile.buddyName ?? "دوست"} — ہر ١٠ منٹ میں سوپ!</p>
          </div>
        )}

        {/* Teacher zone */}
        <div className="mt-8 border-t border-dashed border-hairline pt-6">
          <p className="urdu text-xl font-bold text-right">اُستاد زون — Teacher Zone</p>
          <div className="mt-3 flex items-center gap-3">
            <input
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(false); }}
              className="ltr-term h-12 w-44 rounded-xl border-[1.5px] border-hairline bg-white px-4 text-center text-xl font-bold shadow-[var(--r-shadow)] outline-none transition-colors focus:border-primary"
              placeholder="PIN"
              inputMode="numeric"
              maxLength={6}
              dir="ltr"
            />
            <button
              className="btn-kid btn-go !min-h-12 !px-5"
              onClick={() => {
                if (teacherHashExists) {
                  if (checkTeacherPin(pin)) {
                    try { sessionStorage.setItem("roshan.teacher-unlocked", "1"); } catch {}
                    go("teacher");
                  } else setPinError(true);
                } else if (pin.length >= 4) {
                  setTeacherPin(pin); // first run: create PIN
                  try { sessionStorage.setItem("roshan.teacher-unlocked", "1"); } catch {}
                  go("teacher");
                } else setPinError(true);
              }}
            >
              <span className="urdu text-lg font-bold">داخل ہوں</span>
            </button>
          </div>
          <p className="urdu text-base text-roshan-ink-soft text-right">
            {teacherHashExists ? "اپنا پن لکھ کر اندر جائیں۔" : "پہلی بار: اُستاد زون کے لیے کم از کم ۴ ہندسوں کا پن بنائیں۔"}
          </p>
          <p className="ltr-term mt-1 text-xs text-roshan-ink-soft" dir="ltr">
            {teacherHashExists ? "Enter the PIN you created." : "First time: choose a PIN (4+ digits) for the teacher hub."}
          </p>
          {pinError && <p className="urdu mt-1 text-base font-bold text-coral">پن غلط ہے — دوبارہ کوشش کریں۔</p>}
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
      className="flex w-full items-center justify-between rounded-2xl border-[1.5px] border-hairline bg-white p-4 transition-colors hover:border-soft"
    >
      <span
        className={`flex h-9 items-center rounded-full bg-[#E4E1D9] p-1 transition-colors ${on ? "!bg-success" : ""}`}
        style={{ width: "3.9rem" }}
      >
        <span className={`h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${on ? "-translate-x-[30px]" : "translate-x-0"}`} />
      </span>
      <span className="urdu text-lg font-semibold">{labelUr}</span>
    </button>
  );
}
