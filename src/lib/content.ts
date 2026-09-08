/**
 * Content registry — statically imports all lesson/content JSON.
 * Adding a lesson = add JSON file + one entry in LESSONS below (engine renders it automatically).
 */
import type {
  BrainGymPuzzle,
  CharacterDef,
  Lesson,
  WorldDef,
} from "@/lib/schema";

import worldsJson from "@/content/worlds.json";
import charactersJson from "@/content/characters.json";
import puzzlesJson from "@/content/braingym/puzzles.json";
import w1l1 from "@/content/lessons/world1/w1l1.json";
import w1l2 from "@/content/lessons/world1/w1l2.json";
import w1l3 from "@/content/lessons/world1/w1l3.json";
import w1l4 from "@/content/lessons/world1/w1l4.json";
import w1l5 from "@/content/lessons/world1/w1l5.json";
import w1l6 from "@/content/lessons/world1/w1l6.json";
import w2l1 from "@/content/lessons/world2/w2l1.json";
import w2l2 from "@/content/lessons/world2/w2l2.json";
import w2l3 from "@/content/lessons/world2/w2l3.json";
import w2l4 from "@/content/lessons/world2/w2l4.json";
import w2l5 from "@/content/lessons/world2/w2l5.json";
import w2l6 from "@/content/lessons/world2/w2l6.json";
import w2l7 from "@/content/lessons/world2/w2l7.json";
import w2l8 from "@/content/lessons/world2/w2l8.json";
import w2l9 from "@/content/lessons/world2/w2l9.json";
import w2l10 from "@/content/lessons/world2/w2l10.json";
import w3l1 from "@/content/lessons/world3/w3l1.json";
import w3l2 from "@/content/lessons/world3/w3l2.json";
import w3l3 from "@/content/lessons/world3/w3l3.json";
import w3l4 from "@/content/lessons/world3/w3l4.json";
import w3l5 from "@/content/lessons/world3/w3l5.json";
import w3l6 from "@/content/lessons/world3/w3l6.json";
import w3l7 from "@/content/lessons/world3/w3l7.json";
import w3l8 from "@/content/lessons/world3/w3l8.json";
import w3l9 from "@/content/lessons/world3/w3l9.json";
import w3l10 from "@/content/lessons/world3/w3l10.json";
import w3l11 from "@/content/lessons/world3/w3l11.json";
import w3l12 from "@/content/lessons/world3/w3l12.json";

export const WORLDS = worldsJson as unknown as WorldDef[];
export const CHARACTERS = charactersJson as unknown as CharacterDef[];
export const BRAIN_GYM_PUZZLES = puzzlesJson.puzzles as unknown as BrainGymPuzzle[];

// Register every authored lesson here (world order preserved)
export const LESSONS: Lesson[] = [
  w1l1, w1l2, w1l3, w1l4, w1l5, w1l6, // Phase 1 + Phase 2: World 1 complete
  w2l1, w2l2, w2l3, w2l4, w2l5, w2l6, w2l7, w2l8, w2l9, w2l10, // Phase 2: World 2 complete
  w3l1, w3l2, w3l3, w3l4, w3l5, w3l6, w3l7, w3l8, w3l9, w3l10, w3l11, w3l12, // Phase 3: World 3 complete
] as unknown as Lesson[];

export function lessonsOfWorld(worldId: number): Lesson[] {
  return LESSONS.filter((l) => l.world === worldId).sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getWorld(id: number): WorldDef | undefined {
  return WORLDS.find((w) => w.id === id);
}

/** Daily Brain Gym pick: rotates by date, filtered to the profile's adaptive tier. */
export function brainGymForDay(tier: number): BrainGymPuzzle {
  const dayIndex = Math.floor(Date.now() / 86400000);
  const inTier = BRAIN_GYM_PUZZLES.filter((p) => p.tier === Math.min(Math.max(tier, 1), 3));
  const pool = inTier.length > 0 ? inTier : BRAIN_GYM_PUZZLES;
  return pool[dayIndex % pool.length];
}
