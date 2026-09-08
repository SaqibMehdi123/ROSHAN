/**
 * ROSHAN app shell — single-route state machine (children never type URLs; the
 * Adventure Map is the navigation). All screens render from the app store.
 * Also registers the offline service worker (PWA, spec §8).
 */
"use client";

import { useEffect } from "react";
import { useApp, useActiveProfile } from "@/lib/store";
import { WelcomeGate, ProfileGate } from "@/components/screens/WelcomeGate";
import { AdventureMap } from "@/components/screens/AdventureMap";
import { WorldView } from "@/components/screens/WorldView";
import { LessonPlayer } from "@/components/screens/LessonPlayer";
import { BrainGym } from "@/components/screens/BrainGym";
import { Album } from "@/components/screens/Album";
import { CastScreen, SettingsScreen } from "@/components/screens/CastAndSettings";
import { TeacherHub } from "@/components/teacher/TeacherHub";

export default function Home() {
  const { screen, hydrated, hydrate } = useApp();
  const active = useActiveProfile(); // hooks must run unconditionally

  // hydrate persisted state on first client render
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // register offline service worker (production builds; dev keeps live reload)
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="anim-bob text-center">
          <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-roshan-sun" />
          <p className="urdu mt-4 text-2xl font-bold">بجلی جاگ رہی ہے…</p>
          <p className="ltr-term text-xs text-roshan-ink-soft" dir="ltr">ROSHAN is waking up…</p>
        </div>
      </main>
    );
  }

  const profiles = useApp.getState().profiles;
  const teacherHash =
    typeof window !== "undefined" && !!window.localStorage.getItem("roshan.v1.teacher");

  let view: React.ReactNode;
  if (screen === "teacher") {
    view = <TeacherHub />;
  } else if (screen === "welcome" || (profiles.length === 0 && !teacherHash)) {
    view = <WelcomeGate />;
  } else if (screen === "profiles" || !active) {
    view = <ProfileGate />;
  } else {
    switch (screen) {
      case "world":
        view = <WorldView />;
        break;
      case "lesson":
        view = <LessonPlayer />;
        break;
      case "braingym":
        view = <BrainGym />;
        break;
      case "album":
        view = <Album />;
        break;
      case "cast":
        view = <CastScreen />;
        break;
      case "settings":
        view = <SettingsScreen />;
        break;
      case "teacher":
        view = <TeacherHub />;
        break;
      case "map":
      default:
        view = <AdventureMap />;
    }
  }

  return <div key="roshan-root" className="min-h-screen bg-roshan-cream">{view}</div>;
}
