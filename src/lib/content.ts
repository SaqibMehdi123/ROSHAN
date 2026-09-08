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

export const WORLDS = worldsJson as unknown as WorldDef[];
export const CHARACTERS = charactersJson as unknown as CharacterDef[];
export const BRAIN_GYM_PUZZLES = puzzlesJson.puzzles as unknown as BrainGymPuzzle[];

// Register every authored lesson here (world order preserved)
export const LESSONS: Lesson[] = [
  w1l1, w1l2, w1l3, w1l4, w1l5, w1l6, // Phase 1 + Phase 2: World 1 complete
  w2l1, w2l2, w2l3, w2l4, w2l5, w2l6, w2l7, w2l8, w2l9, w2l10, // Phase 2: World 2 complete
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
