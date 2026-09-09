/**
 * Storage layer — localStorage-backed persistence for ROSHAN (Phase 1).
 * All child data stays on the device (privacy rule: first name only, no tracking).
 * Auto-save: every store mutation calls writeProfiles(); a 30s heartbeat updates
 * minutesOnTask, and `current` gives exact resume points after power cuts.
 * IndexedDB upgrade path: swap the read/write functions here only (docs/06).
 */

import type { Profile } from "@/lib/schema";

const KEYS = {
  profiles: "roshan.v1.profiles",
  activeProfile: "roshan.v1.activeProfile",
  device: "roshan.v1.device",
  teacher: "roshan.v1.teacher",
} as const;

export interface DeviceSettings {
  music: boolean;
  sfx: boolean;
  slowVoice: boolean;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full / private mode — fail silently, app still works in-memory
  }
}

export const storage = {
  readProfiles: () => read<Profile[]>(KEYS.profiles, []),
  writeProfiles: (p: Profile[]) => write(KEYS.profiles, p),
  readActiveProfile: () => read<string | null>(KEYS.activeProfile, null),
  writeActiveProfile: (id: string | null) => write(KEYS.activeProfile, id),
  readDevice: () => read<DeviceSettings>(KEYS.device, { music: true, sfx: true, slowVoice: false }),
  writeDevice: (d: DeviceSettings) => write(KEYS.device, d),
  readTeacherPinHash: () => read<string | null>(KEYS.teacher, null),
  writeTeacherPinHash: (h: string) => write(KEYS.teacher, h),
};

/** Tiny hash for the teacher PIN (not cryptographic — local device gate only). */
export function simpleHash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = (h * 33) ^ input.charCodeAt(i);
  return (h >>> 0).toString(36);
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}
