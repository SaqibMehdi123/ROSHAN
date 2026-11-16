/**
 * CAST screen — tap any friend to hear their intro + catchphrase (audio-first).
 * SETTINGS — music/sfx/slow-voice toggles + pair-mode info (Urdu-first).
 * TEACHER GATE — PIN modal opened from the map's top-bar teacher icon
 * (its own dedicated entry, not buried inside settings).
 */
"use client";

import { useState } from "react";
import { useApp, useActiveProfile, checkTeacherPin, setTeacherPin } from "@/lib/store";
import { CHARACTERS } from "@/lib/content";
import { Character } from "@/components/art/Characters";
import { Art } from "@/components/art/Props";
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
              void playAudio(undefined, `${c.role.ur} ${c.catchphrase.ur}`);
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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 pb-24 pt-5 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <IconButton art="home" label="نقشے پر" onClick={() => go("map")} />
        <h1 className="urdu-tight flex-1 text-center text-2xl font-bold">سیٹنگز</h1>
        <RepeatButton />
      </div>

      <div className="card-kid mt-5 p-6">
        <div className="mt-2 space-y-4">
          <Toggle
            labelUr="گانا"
            labelEn="background music"
            on={profile?.settings.music ?? device.music}
            onChange={(v) => (profile ? setSettings({ music: v }) : setDevice({ music: v }))}
          />
          <Toggle
            labelUr="آوازیں"
            labelEn="sound effects"
            on={profile?.settings.sfx ?? device.sfx}
            onChange={(v) => (profile ? setSettings({ sfx: v }) : setDevice({ sfx: v }))}
          />
          <Toggle
            labelUr="آہستہ آواز"
            labelEn="slow story voice"
            on={profile?.settings.slowVoice ?? device.slowVoice}
            onChange={(v) => (profile ? setSettings({ slowVoice: v }) : setDevice({ slowVoice: v }))}
          />
        </div>

        {profile?.pairMode && (
          <div className="mt-6 rounded-2xl border-2 border-success/30 bg-success-tint p-4 text-right">
            <p className="urdu text-lg font-bold text-success">جوڑی موڈ چالو ہے</p>
            <p className="urdu text-base">{profile.name} ↔ {profile.buddyName ?? "دوست"} — ہر ١٠ منٹ میں باری بدلو!</p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 border-t-2 border-dashed border-hairline pt-5">
          <div className="text-right">
            <p className="urdu text-base font-bold">کھلاڑی بدلنا ہے؟</p>
            <p className="urdu text-sm text-soft">اپنا یا کسی اور کا کردار چننے کے لیے</p>
          </div>
          <button
            className="btn-kid btn-back !min-h-12 shrink-0 !px-5"
            onClick={() => go("profiles")}
          >
            <Art id="friends" size={26} />
            <span className="urdu-tight text-base font-bold">کھلاڑی بدلو</span>
          </button>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------ TEACHER GATE ------------------------------ */
/** PIN-gated modal — the teacher's own door, opened from the map top bar. */
export function TeacherGate({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  if (!open) return null;

  const teacherHashExists =
    typeof window !== "undefined" && !!localStorage.getItem("roshan.v1.teacher");

  const enter = () => {
    let ok = false;
    if (teacherHashExists) {
      ok = checkTeacherPin(pin);
    } else if (pin.length >= 4) {
      setTeacherPin(pin); // first run: create PIN
      ok = true;
    }
    if (ok) {
      try { sessionStorage.setItem("roshan.teacher-unlocked", "1"); } catch {}
      playAudio(undefined, "اُستاد زون میں خوش آمدید!");
      useApp.getState().go("teacher");
      setPin("");
      setError(false);
      onClose();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#3E3832]/45 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="اُستاد زون"
    >
      <div
        className={`card-kid w-full max-w-sm p-6 text-center ${shake ? "anim-wiggle" : "anim-pop"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-fit">
          <Art id="teacher" size={110} />
        </div>
        <h2 className="urdu-tight mt-2 text-2xl font-bold">اُستاد زون</h2>
        <p className="urdu-tight mt-1 text-base text-soft">
          {teacherHashExists ? "اپنا پن لکھ کر اندر جائیں۔" : "پہلی بار: کم از کم ۴ ہندسوں کا پن بنائیں۔"}
        </p>
        <p className="ltr-term mt-0.5 text-xs text-soft" dir="ltr">
          {teacherHashExists ? "Enter your PIN." : "First time: choose a PIN (4+ digits)."}
        </p>

        <input
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && enter()}
          className="field ltr-term mt-5 !text-2xl"
          style={{ direction: "ltr", letterSpacing: "0.35em" }}
          placeholder="PIN"
          inputMode="numeric"
          maxLength={6}
          aria-label="PIN"
        />

        {/* on-screen keypad — shared tablets, no keyboard needed */}
        <div className="mx-auto mt-4 grid w-60 grid-cols-3 gap-2" dir="ltr">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              className="btn-kid btn-back !min-h-12 !min-w-0 !px-0"
              onClick={() => { if (pin.length < 6) { setPin(pin + n); setError(false); } }}
            >
              <span className="ltr-term text-xl font-bold">{n}</span>
            </button>
          ))}
          <button
            className="btn-kid btn-back !min-h-12 !min-w-0 !px-0"
            onClick={() => { setPin(""); setError(false); }}
            aria-label="clear"
          >
            <span className="urdu-tight text-base font-bold">صاف</span>
          </button>
          <button
            className="btn-kid btn-back !min-h-12 !min-w-0 !px-0"
            onClick={() => { if (pin.length < 6) { setPin(pin + 0); setError(false); } }}
            aria-label="zero"
          >
            <span className="ltr-term text-xl font-bold">0</span>
          </button>
          <button
            className="btn-kid btn-back !min-h-12 !min-w-0 !px-0"
            onClick={() => setPin(pin.slice(0, -1))}
            aria-label="backspace"
          >
            <span className="ltr-term text-xl font-bold" aria-hidden>⌫</span>
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-3">
          <button className="btn-kid btn-go !min-h-14 !px-7" onClick={enter}>
            <span className="urdu-tight text-lg font-bold">داخل ہوں</span>
          </button>
          <button className="btn-kid btn-back !min-h-14 !px-6" onClick={onClose}>
            <span className="urdu-tight text-lg font-bold">واپس</span>
          </button>
        </div>

        {error && <p className="urdu mt-3 text-base font-bold text-coral">پن غلط ہے — دوبارہ کوشش کریں۔</p>}
      </div>
    </div>
  );
}

/* ------------------------------ Toggle ------------------------------ */
function Toggle({
  labelUr,
  labelEn,
  on,
  onChange,
}: {
  labelUr: string;
  labelEn: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => {
        stopSpeaking();
        onChange(!on);
        void playAudio(undefined, on ? "بند" : "چالو");
      }}
      className="flex w-full items-center justify-between rounded-2xl border-2 border-hairline bg-white p-4 transition-all hover:border-primary"
    >
      <span
        className={`flex h-11 items-center rounded-full p-1.5 transition-colors ${on ? "!bg-success" : "bg-[#EFE7D8]"}`}
        style={{ width: "4.4rem" }}
        aria-hidden
      >
        <span
          className={`block h-8 w-8 rounded-full bg-white transition-transform ${on ? "-translate-x-[34px]" : "translate-x-0"}`}
          style={{ boxShadow: "0 2px 0 rgba(62,56,50,0.18)" }}
        />
      </span>
      <span className="text-right">
        <span className="urdu-tight block text-lg font-bold leading-[1.5]">{labelUr}</span>
        <span className="ltr-term block text-xs text-soft" dir="ltr">{labelEn}</span>
      </span>
    </button>
  );
}
