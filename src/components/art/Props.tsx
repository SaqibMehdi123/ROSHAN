/**
 * ROSHAN art registry — single lookup for every icon, computer part and scene.
 * <Art id="…" size={…} /> resolves from modular icon sets (docs/07 mapping):
 *   - icons/tech.tsx     computer parts, devices, power, lab rules, posture
 *   - icons/files.tsx    files, folders, paint & creative tools
 *   - icons/netlogic.tsx internet safety, logic & coding blocks
 *   - icons/objects.tsx  everyday objects, nature, village life, UI symbols
 *   - scenes.tsx         12 layered storybook stage backgrounds (400×225)
 * Dynamic ids: "key-*" renders the Keyboard-Kingdom keycap houses on the fly.
 */
"use client";

import type { ReactNode } from "react";
import { TECH_ICONS } from "./icons/tech";
import { FILES_ICONS } from "./icons/files";
import { NETLOGIC_ICONS } from "./icons/netlogic";
import { OBJECTS_ICONS } from "./icons/objects";
import { SCENES } from "./scenes";

const INK = "#4A3421";

interface ArtProps {
  id: string;
  size?: number;
  className?: string;
}

/** Merged icon table (later sets win on collision — deliberate order). */
const ICONS: Record<string, ReactNode> = {
  ...OBJECTS_ICONS,
  ...FILES_ICONS,
  ...NETLOGIC_ICONS,
  ...TECH_ICONS,
};

/** Legacy lesson-JSON ids → current art (older content stays valid 1:1). */
const ALIASES: Record<string, string> = {
  "show-part-monitor": "monitor",
  "show-part-cpu": "slot-brain",
  "show-part-keyboard": "keyboard",
  "show-part-mouse": "mouse",
  "show-phone": "phone",
  "show-laptop": "laptop",
  "show-atm": "atm",
  "show-calculator": "calculator",
  "show-rule-clean-hands": "clean-hands",
  "show-rule-gentle-touch": "gentle-touch",
  "show-rule-no-food": "no-food",
  "show-rule-ask-first": "ask-first",
  pattern: "pattern-blocks",
  sequence: "loop-arrow",
  "odd-one": "pattern-blocks",
};

/** Skill → icon: gives every lesson node & sticker its own recognizable picture. */
export function lessonIcon(skillKey: string): string {
  const map: Record<string, string> = {
    "what-is-computer": "monitor",
    "computer-parts": "cpu-box",
    "lab-rules": "clean-hands",
    "power-on": "power-switch",
    "power-off": "shutdown",
    "w1-review": "star",
    "mouse-move": "teer",
    "mouse-click": "mouse",
    "mouse-drag": "glow-spot",
    "mouse-double": "butterfly",
    "keyboard-letters": "keyboard",
    "keyboard-words": "key-space",
    "keyboard-numbers": "calculator",
    typing: "keyboard",
    "files-folders": "folder",
    saving: "save-floppy",
    desktop: "monitorbtn",
    deleting: "recycle-bin",
    "paint-tools": "paint-brush",
    shapes: "shape-star",
    colors: "paint-bucket",
    "draw-create": "easel",
    "internet-basics": "globe-net",
    browser: "browser",
    "online-safety": "shield-safe",
    passwords: "key-password",
    messages: "letter-message",
    patterns: "pattern-blocks",
    sequences: "loop-arrow",
    loops: "block-loop",
    "if-then": "if-fork",
    debugging: "glitch-bug",
    "block-coding": "block-cmd",
    "making-game": "rocket",
  };
  return map[skillKey] ?? "star";
}

/* Keycap colours cycle by character (cheerful keyboard houses) */
const KEYCAP_COLORS = ["#FDE68A", "#BBF7D0", "#BFDBFE", "#FBCFE8", "#DDD6FE", "#FED7AA", "#A7F3D0"];

/** Dynamic "key house" keycap: <Art id="key-A" /> renders a house-shaped key for any letter/digit. */
function KeyHouseArt({ ch }: { ch: string }) {
  const code = (ch.charCodeAt(0) || 65) % KEYCAP_COLORS.length;
  const color = KEYCAP_COLORS[code];
  const isHomeRow = "ASDFJKL;".includes(ch.toUpperCase());
  return (
    <g>
      <rect x="14" y="26" width="72" height="58" rx="12" fill={color} stroke={INK} strokeWidth="3.5" />
      {/* house roof (every key is a little house) */}
      <path d="M14 34 q0 -14 14 -12 l22 -10 l22 10 q14 -2 14 12" fill={isHomeRow ? "#F59E0B" : "#C4B5FD"} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* the letter — big, Latin, LTR */}
      <text x="50" y="74" fontSize={ch.length > 1 ? 26 : 38} fontWeight="800" textAnchor="middle" fill={INK} fontFamily="Arial, sans-serif">
        {ch}
      </text>
      {/* F & J home-row bumps */}
      {(ch.toUpperCase() === "F" || ch.toUpperCase() === "J") && (
        <rect x="44" y="18" width="12" height="5" rx="2.5" fill={INK} />
      )}
    </g>
  );
}

export function Art({ id, size = 64, className }: ArtProps) {
  // dynamic keycaps: "key-A" … "key-Z", "key-1"…, "key-;", "key-space", "key-enter", "key-backspace"
  if (id.startsWith("key-")) {
    const ch = id.slice(4).toUpperCase() === "SPACE" ? " " : id.slice(4).toUpperCase() === "ENTER" ? "\u21B5" : id.slice(4);
    if (id === "key-space") {
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="space key">
          <rect x="8" y="38" width="84" height="26" rx="12" fill="#DDD6FE" stroke={INK} strokeWidth="3.5" />
          <path d="M20 51 h60" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeDasharray="8 6" />
          <text x="50" y="30" fontSize="15" fontWeight="700" textAnchor="middle" fill={INK} fontFamily="Arial, sans-serif">SPACE</text>
        </svg>
      );
    }
    if (id === "key-enter") {
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="enter key">
          <rect x="30" y="26" width="56" height="50" rx="12" fill="#BBF7D0" stroke={INK} strokeWidth="3.5" />
          <path d="M42 60 h22 v-18 M54 52 l10 8 10 -8" stroke="#16A34A" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="58" y="92" fontSize="14" fontWeight="700" textAnchor="middle" fill="#16A34A" fontFamily="Arial, sans-serif">ENTER</text>
        </svg>
      );
    }
    if (id === "key-backspace") {
      return (
        <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="backspace key">
          <rect x="26" y="26" width="60" height="50" rx="12" fill="#FBCFE8" stroke={INK} strokeWidth="3.5" />
          <path d="M40 40 l20 22 M60 40 l-20 22" stroke="#BE185D" strokeWidth="6" strokeLinecap="round" />
          <text x="50" y="92" fontSize="14" fontWeight="700" textAnchor="middle" fill="#BE185D" fontFamily="Arial, sans-serif">ERASE</text>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label={`key ${ch}`}>
        <KeyHouseArt ch={ch} />
      </svg>
    );
  }
  if (SCENES[id]) {
    return (
      <svg viewBox="0 0 400 225" width="100%" className={className} role="img" aria-label={id}>
        {SCENES[id]}
      </svg>
    );
  }
  const icon = ICONS[id] ?? (ALIASES[id] ? ICONS[ALIASES[id]] : undefined);
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={id}
    >
      {icon ?? (
        // labelled placeholder for not-yet-drawn assets (docs/07 convention)
        <g>
          <rect x="10" y="10" width="80" height="80" rx="10" fill="#F6EBD8" stroke="#B9AC98" strokeWidth="2" strokeDasharray="6 4" />
          <text x="50" y="46" fontSize="11" textAnchor="middle" fill="#8A7156" fontFamily="monospace">
            {id.slice(0, 10)}
          </text>
          <text x="50" y="62" fontSize="9" textAnchor="middle" fill="#B9AC98">
            art pending
          </text>
        </g>
      )}
    </svg>
  );
}
