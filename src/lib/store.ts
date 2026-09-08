/**
 * ROSHAN app store — single state machine driving all screens (the app is one SPA;
 * children never type URLs). Auto-saves every mutation to localStorage and keeps
 * exact resume points (`current`) so power cuts lose nothing (spec §8).
 */

"use client";

import { create } from "zustand";
import type { LessonProgress, Phase, Profile } from "@/lib/schema";
import { simpleHash, storage, todayKey } from "@/lib/storage";
import { getLesson, lessonsOfWorld } from "@/lib/content";
import { playSfx, setMusic } from "@/lib/music";
import { stopSpeaking } from "@/lib/audio";

export type Screen =
  | "welcome" // profile gate (first run / no active profile)
  | "profiles" // returning kids pick who is playing
  | "map" // ADVENTURE MAP — home
  | "world" // lessons inside one world
  | "lesson" // lesson player
  | "braingym"
  | "album"
  | "cast"
  | "settings"
  | "teacher";

export const STAR_RULE = (bugs: number) => (bugs === 0 ? 3 : bugs <= 2 ? 2 : 1);

/** Read the active profile from current state (works inside and outside actions). */
function profOf(s: Pick<AppState, "profiles" | "activeProfileId">): Profile | null {
  return s.profiles.find((p) => p.id === s.activeProfileId) ?? null;
}

const OUTFIT_UNLOCKS: { at: number; id: string; name: { ur: string; en: string } }[] = [
  { at: 12, id: "cap", name: { ur: "مزیدار ٹوپی", "en": "Cool Cap" } },
  { at: 30, id: "dasti-topi", name: { ur: "دستی ٹوپی", "en": "Dasti Topi" } },
  { at: 60, id: "hero-cape", name: { ur: "ہیرو کیپ", "en": "Hero Cape" } },
];

export function outfitUnlocks() {
  return OUTFIT_UNLOCKS;
}

interface AppState {
  hydrated: boolean;
  screen: Screen;
  activeWorldId: number | null;
  activeLessonId: string | null;
  profiles: Profile[];
  activeProfileId: string | null;
  device: { music: boolean; sfx: boolean };

  hydrate: () => void;
  go: (screen: Screen) => void;
  openWorld: (worldId: number) => void;
  openLesson: (lessonId: string, resume?: boolean) => void;

  createProfile: (name: string, avatarColor: string, pairMode: boolean, buddyName?: string) => void;
  selectProfile: (id: string) => void;

  /** live lesson state */
  bugsInActivity: number;
  startBugs: () => void;
  addBug: () => void;

  saveResume: (lessonId: string, phase: Phase, step: number) => void;
  completeLesson: (lessonId: string) => { stars: number; newBadge: string | null };
  countAttempt: (lessonId: string) => void;
  tickMinutes: (lessonId: string | null) => void; // 30s heartbeat

  brainGymResult: (success: boolean) => { tier: number; streak: number };
  setSettings: (s: Partial<Pick<Profile["settings"], "music" | "sfx" | "slowVoice">>) => void;
  setDevice: (s: Partial<{ music: boolean; sfx: boolean }>) => void;
}

function touchStreak(p: Profile): Profile {
  const today = todayKey();
  if (p.streak.lastActiveDay === today) return p;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const count = p.streak.lastActiveDay === yesterday ? p.streak.count + 1 : 1;
  return { ...p, streak: { lastActiveDay: today, count } };
}

export const useApp = create<AppState>((set, get) => ({
  hydrated: false,
  screen: "map",
  activeWorldId: null,
  activeLessonId: null,
  profiles: [],
  activeProfileId: null,
  device: { music: true, sfx: true },
  bugsInActivity: 0,

  hydrate: () => {
    const profiles = storage.readProfiles();
    const activeProfileId = storage.readActiveProfile();
    const device = storage.readDevice();
    setMusic(device.music);
    set({ hydrated: true, profiles, activeProfileId, device });
  },

  go: (screen) => {
    stopSpeaking();
    set({ screen });
  },

  openWorld: (worldId) => set({ activeWorldId: worldId, screen: "world" }),

  openLesson: (lessonId, resume = false) => {
    const lesson = getLesson(lessonId);
    if (!lesson) return;
    set({ activeLessonId: lessonId, activeWorldId: lesson.world, screen: "lesson" });
    if (!resume) get().countAttempt(lessonId);
  },

  createProfile: (name, avatarColor, pairMode, buddyName) => {
    const profile: Profile = {
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
      name: name.trim().slice(0, 14), // FIRST NAME ONLY
      avatarColor,
      createdAt: Date.now(),
      pairMode,
      buddyName: pairMode ? buddyName?.trim().slice(0, 14) || undefined : undefined,
      progress: {},
      current: null,
      stars: {},
      bugsFixed: 0,
      badges: [],
      stickers: [],
      outfits: [],
      helperMode: false,
      brainGym: { tier: 1, streak: 0 },
      settings: { music: true, sfx: true, slowVoice: false },
      streak: { count: 0 },
      minutesOnTask: 0,
    };
    const profiles = [...get().profiles, profile];
    storage.writeProfiles(profiles);
    storage.writeActiveProfile(profile.id);
    set({ profiles, activeProfileId: profile.id, screen: "map" });
  },

  selectProfile: (id) => {
    storage.writeActiveProfile(id);
    set({ activeProfileId: id, screen: "map" });
  },

  startBugs: () => set({ bugsInActivity: 0 }),
  addBug: () => {
    const p = profOf(get());
    set((s) => ({ bugsInActivity: s.bugsInActivity + 1 }));
    playSfx("bugBoop", p?.settings.sfx ?? true);
    if (p) {
      const profiles = get().profiles.map((x) =>
        x.id === p.id ? { ...x, bugsFixed: x.bugsFixed + 1 } : x
      );
      storage.writeProfiles(profiles);
      set({ profiles });
    }
  },

  saveResume: (lessonId, phase, step) => {
    const p = profOf(get());
    const lesson = getLesson(lessonId);
    if (!p || !lesson) return;
    const next: Profile = touchStreak({
      ...p,
      current: { world: lesson.world, lesson: lessonId, phase, step },
      progress: {
        ...p.progress,
        [lessonId]: {
          completed: p.progress[lessonId]?.completed ?? false,
          attempts: p.progress[lessonId]?.attempts ?? 1,
          bestStars: p.progress[lessonId]?.bestStars ?? 0,
          bugsFixed: p.progress[lessonId]?.bugsFixed ?? 0,
          minutes: p.progress[lessonId]?.minutes ?? 0,
          lastPhase: phase,
          lastStep: step,
          updatedAt: Date.now(),
        } satisfies LessonProgress,
      },
    });
    storage.writeProfiles(get().profiles.map((x) => (x.id === p.id ? next : x)));
    set({ profiles: get().profiles.map((x) => (x.id === p.id ? next : x)) });
  },

  completeLesson: (lessonId) => {
    const p = profOf(get());
    const lesson = getLesson(lessonId);
    if (!p || !lesson) return { stars: 1, newBadge: null };
    const stars = STAR_RULE(get().bugsInActivity);
    const prev = p.progress[lessonId];
    const updated: Profile = touchStreak({
      ...p,
      current: null, // lesson finished → clear resume point
      stars: { ...p.stars, [lessonId]: Math.max(prev?.bestStars ?? 0, stars) },
      stickers: p.stickers.includes(lessonId) ? p.stickers : [...p.stickers, lessonId],
      progress: {
        ...p.progress,
        [lessonId]: {
          completed: true,
          attempts: prev?.attempts ?? 1,
          bestStars: Math.max(prev?.bestStars ?? 0, stars),
          bugsFixed: prev?.bugsFixed ?? 0,
          minutes: prev?.minutes ?? lesson.minutes,
          lastPhase: "cheer",
          lastStep: 0,
          updatedAt: Date.now(),
        },
      },
    });

    // Badge awarded when every AUTHORED lesson of this world is complete
    // (auto-scales as new lessons ship in later phases — no hardcoded lists)
    let newBadge: string | null = null;
    const worldLessons = lessonsOfWorld(lesson.world).map((l) => l.id);
    const isWorldComplete =
      lesson.badge && worldLessons.length > 0 && worldLessons.every((id) => updated.progress[id]?.completed);
    if (lesson.badge && isWorldComplete && !updated.badges.includes(lesson.badge)) {
      newBadge = lesson.badge;
      updated.badges = [...updated.badges, lesson.badge];
    }

    // Outfit unlocks by total stars
    const totalStars = Object.values(updated.stars).reduce((a, b) => a + b, 0);
    OUTFIT_UNLOCKS.forEach((o) => {
      if (totalStars >= o.at && !updated.outfits.includes(o.id)) updated.outfits.push(o.id);
    });
    // Computer Hero helper mode for fast finishers (3★ on everything of this world)
    const allDone = worldLessons.every((id) => updated.progress[id]?.completed);
    const allPerfect = worldLessons.every((id) => (updated.stars[id] ?? 0) >= 3);
    updated.helperMode = allDone && worldLessons.length > 0 && allPerfect;

    storage.writeProfiles(get().profiles.map((x) => (x.id === p.id ? updated : x)));
    set({ profiles: get().profiles.map((x) => (x.id === p.id ? updated : x)) });
    return { stars, newBadge };
  },

  countAttempt: (lessonId) => {
    const p = profOf(get());
    if (!p) return;
    const prev = p.progress[lessonId];
    const next: Profile = {
      ...p,
      progress: {
        ...p.progress,
        [lessonId]: {
          completed: prev?.completed ?? false,
          attempts: (prev?.attempts ?? 0) + 1,
          bestStars: prev?.bestStars ?? 0,
          bugsFixed: prev?.bugsFixed ?? 0,
          minutes: prev?.minutes ?? 0,
          lastPhase: prev?.lastPhase ?? "story",
          lastStep: prev?.lastStep ?? 0,
          updatedAt: Date.now(),
        },
      },
    };
    storage.writeProfiles(get().profiles.map((x) => (x.id === p.id ? next : x)));
    set({ profiles: get().profiles.map((x) => (x.id === p.id ? next : x)) });
  },

  tickMinutes: (lessonId) => {
    const p = profOf(get());
    if (!p) return;
    const next: Profile = {
      ...p,
      minutesOnTask: p.minutesOnTask + 0.5,
      progress: lessonId
        ? {
            ...p.progress,
            [lessonId]: p.progress[lessonId]
              ? { ...p.progress[lessonId], minutes: p.progress[lessonId].minutes + 0.5 }
              : p.progress[lessonId],
          }
        : p.progress,
    };
    storage.writeProfiles(get().profiles.map((x) => (x.id === p.id ? next : x)));
    set({ profiles: get().profiles.map((x) => (x.id === p.id ? next : x)) });
  },

  brainGymResult: (success) => {
    const p = profOf(get());
    if (!p) return { tier: 1, streak: 0 };
    const streak = success ? p.brainGym.streak + 1 : 0;
    // Adaptive: 3 successes in a row → tier up (max 3); stumble → quiet step down (min 1)
    const tier = success && streak > 0 && streak % 3 === 0 ? Math.min(3, p.brainGym.tier + 1) : !success ? Math.max(1, p.brainGym.tier - 1) : p.brainGym.tier;
    const next: Profile = { ...p, brainGym: { ...p.brainGym, streak, tier } };
    storage.writeProfiles(get().profiles.map((x) => (x.id === p.id ? next : x)));
    set({ profiles: get().profiles.map((x) => (x.id === p.id ? next : x)) });
    return { tier, streak };
  },

  setSettings: (s) => {
    const p = profOf(get());
    if (!p) return;
    const next: Profile = { ...p, settings: { ...p.settings, ...s } };
    if (typeof s.music === "boolean") setMusic(s.music);
    storage.writeProfiles(get().profiles.map((x) => (x.id === p.id ? next : x)));
    set({ profiles: get().profiles.map((x) => (x.id === p.id ? next : x)) });
  },

  setDevice: (s) => {
    const device = { ...get().device, ...s };
    if (typeof s.music === "boolean") setMusic(s.music);
    storage.writeDevice(device);
    set({ device });
  },
}));

/** Convenience selector — the active profile object (or null). */
export function useActiveProfile(): Profile | null {
  const profiles = useApp((s) => s.profiles);
  const id = useApp((s) => s.activeProfileId);
  return profiles.find((p) => p.id === id) ?? null;
}

/** Non-hook accessor for use outside React (audio, timers…). */
export function activeProfile(): Profile | null {
  return profOf(useApp.getState());
}

// Teacher PIN helpers (local gate)
export function teacherPinHash(): string | null {
  return storage.readTeacherPinHash();
}
export function setTeacherPin(pin: string) {
  storage.writeTeacherPinHash(simpleHash(pin));
}
export function checkTeacherPin(pin: string): boolean {
  const h = storage.readTeacherPinHash();
  return h !== null && h === simpleHash(pin);
}
