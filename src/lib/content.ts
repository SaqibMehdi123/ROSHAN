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
import w4l1 from "@/content/lessons/world4/w4l1.json";
import w4l2 from "@/content/lessons/world4/w4l2.json";
import w4l3 from "@/content/lessons/world4/w4l3.json";
import w4l4 from "@/content/lessons/world4/w4l4.json";
import w4l5 from "@/content/lessons/world4/w4l5.json";
import w4l6 from "@/content/lessons/world4/w4l6.json";
import w4l7 from "@/content/lessons/world4/w4l7.json";
import w4l8 from "@/content/lessons/world4/w4l8.json";
import w5l1 from "@/content/lessons/world5/w5l1.json";
import w5l2 from "@/content/lessons/world5/w5l2.json";
import w5l3 from "@/content/lessons/world5/w5l3.json";
import w5l4 from "@/content/lessons/world5/w5l4.json";
import w5l5 from "@/content/lessons/world5/w5l5.json";
import w5l6 from "@/content/lessons/world5/w5l6.json";
import w5l7 from "@/content/lessons/world5/w5l7.json";
import w5l8 from "@/content/lessons/world5/w5l8.json";
import w5l9 from "@/content/lessons/world5/w5l9.json";
import w5l10 from "@/content/lessons/world5/w5l10.json";
import w6l1 from "@/content/lessons/world6/w6l1.json";
import w6l2 from "@/content/lessons/world6/w6l2.json";
import w6l3 from "@/content/lessons/world6/w6l3.json";
import w6l4 from "@/content/lessons/world6/w6l4.json";
import w6l5 from "@/content/lessons/world6/w6l5.json";
import w6l6 from "@/content/lessons/world6/w6l6.json";
import w6l7 from "@/content/lessons/world6/w6l7.json";
import w6l8 from "@/content/lessons/world6/w6l8.json";
import w7l1 from "@/content/lessons/world7/w7l1.json";
import w7l2 from "@/content/lessons/world7/w7l2.json";
import w7l3 from "@/content/lessons/world7/w7l3.json";
import w7l4 from "@/content/lessons/world7/w7l4.json";
import w7l5 from "@/content/lessons/world7/w7l5.json";
import w7l6 from "@/content/lessons/world7/w7l6.json";
import w7l7 from "@/content/lessons/world7/w7l7.json";
import w7l8 from "@/content/lessons/world7/w7l8.json";
import w7l9 from "@/content/lessons/world7/w7l9.json";
import w7l10 from "@/content/lessons/world7/w7l10.json";
import w7l11 from "@/content/lessons/world7/w7l11.json";
import w7l12 from "@/content/lessons/world7/w7l12.json";
import w8l1 from "@/content/lessons/world8/w8l1.json";
import w8l2 from "@/content/lessons/world8/w8l2.json";
import w8l3 from "@/content/lessons/world8/w8l3.json";
import w8l4 from "@/content/lessons/world8/w8l4.json";
import w8l5 from "@/content/lessons/world8/w8l5.json";
import w8l6 from "@/content/lessons/world8/w8l6.json";
import w8l7 from "@/content/lessons/world8/w8l7.json";
import w8l8 from "@/content/lessons/world8/w8l8.json";
import w8l9 from "@/content/lessons/world8/w8l9.json";
import w8l10 from "@/content/lessons/world8/w8l10.json";
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
  w1l1, w1l2, w1l3, w1l4, w1l5, w1l6, // World 1 complete
  w2l1, w2l2, w2l3, w2l4, w2l5, w2l6, w2l7, w2l8, w2l9, w2l10, // World 2 complete
  w3l1, w3l2, w3l3, w3l4, w3l5, w3l6, w3l7, w3l8, w3l9, w3l10, w3l11, w3l12, // World 3 complete
  w4l1, w4l2, w4l3, w4l4, w4l5, w4l6, w4l7, w4l8, // World 4 complete
  w5l1, w5l2, w5l3, w5l4, w5l5, w5l6, w5l7, w5l8, w5l9, w5l10, // World 5 complete
  w6l1, w6l2, w6l3, w6l4, w6l5, w6l6, w6l7, w6l8, // World 6 complete
  w7l1, w7l2, w7l3, w7l4, w7l5, w7l6, w7l7, w7l8, w7l9, w7l10, w7l11, w7l12, // World 7 complete
  w8l1, w8l2, w8l3, w8l4, w8l5, w8l6, w8l7, w8l8, w8l9, w8l10, // World 8 complete
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
