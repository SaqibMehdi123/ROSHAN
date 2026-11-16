import type { ReactNode } from "react";

/**
 * TECH icon set — computer parts, devices, power states, lab-care rules, posture.
 * "Friendly Realism" v3: real-world proportions & details so village children
 * recognize the ACTUAL hardware they meet in the school lab (docs/07).
 * Every icon teaches: keyboards show real key grids, mice show button seams +
 * scroll wheels, towers show power buttons / USB ports / drive slots.
 */

const INK = "#4A3421";

export const TECH_ICONS: Record<string, ReactNode> = {
  /* ================= W1L1 — the glowing storeroom box (Bijli's home) ================= */
  "glowing-box": (
    <g>
      <defs>
        <radialGradient id="gb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FDE68A" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#FDE68A" stopOpacity="0.25" />
          <stop offset="1" stopColor="#FDE68A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C68B4E" />
          <stop offset="1" stopColor="#8B5E3C" />
        </linearGradient>
      </defs>
      {/* magical aura */}
      <circle cx="50" cy="52" r="44" fill="url(#gb-glow)" />
      {/* light rays */}
      {[30, 90, 150, 210, 270, 330].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <path
            key={a}
            d={`M${50 + 30 * Math.cos(r)} ${52 + 30 * Math.sin(r)} l${7 * Math.cos(r)} ${7 * Math.sin(r)}`}
            stroke="#FBBF24"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
        );
      })}
      {/* the box */}
      <ellipse cx="50" cy="88" rx="24" ry="4.5" fill="rgba(74,52,33,0.12)" />
      <path d="M26 40 L74 40 L78 82 L22 82 Z" fill="url(#gb-body)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 40 L50 30 L74 40" fill="#D9A066" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 82 L50 90 L78 82" fill="#6E4526" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* lid seam glowing */}
      <path d="M26 46 L74 46" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" opacity="0.95" />
      {/* question sparkles */}
      <path d="M18 22 l1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M80 18 l1.1 2.4 2.4 1.1 -2.4 1.1 -1.1 2.4 -1.1 -2.4 -2.4 -1.1 2.4 -1.1 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
    </g>
  ),

  /* ============================ MONITOR ============================ */
  monitor: (
    <g>
      <defs>
        <linearGradient id="mon-bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4B5563" />
          <stop offset="1" stopColor="#374151" />
        </linearGradient>
        <linearGradient id="mon-screen" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#7DD3FC" />
          <stop offset="0.6" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="mon-neck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6B7280" />
          <stop offset="0.5" stopColor="#9CA3AF" />
          <stop offset="1" stopColor="#4B5563" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="30" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* neck + base */}
      <rect x="44" y="66" width="12" height="14" rx="2" fill="url(#mon-neck)" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="50" cy="84" rx="24" ry="6.5" fill="#4B5563" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="50" cy="82.6" rx="24" ry="6" fill="#6B7280" />
      {/* bezel + screen */}
      <rect x="12" y="10" width="76" height="56" rx="6" fill="url(#mon-bezel)" stroke={INK} strokeWidth="3" />
      <rect x="17" y="15" width="66" height="42" rx="3" fill="url(#mon-screen)" stroke={INK} strokeWidth="2" />
      {/* on-screen content: desktop wallpaper */}
      <circle cx="66" cy="26" r="7" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M17 45 l14 -10 10 7 12 -9 14 10 v4 h-50 Z" fill="#22C55E" opacity="0.9" />
      <rect x="17" y="49" width="66" height="8" fill="#E0F2FE" opacity="0.85" />
      <circle cx="24" cy="53" r="2.4" fill="#38BDF8" stroke="#0EA5E9" strokeWidth="0.8" />
      {/* power LED + brand dot */}
      <circle cx="84" cy="70.5" r="1.8" fill="#4ADE80" />
      <rect x="40" y="68.5" width="20" height="3" rx="1.5" fill="#9CA3AF" />
      {/* glass glare */}
      <path d="M22 17 L40 17 L28 55 L19 55 Z" fill="#FFFFFF" opacity="0.18" />
    </g>
  ),

  /* ============================ PC TOWER ============================ */
  "cpu-box": (
    <g>
      <defs>
        <linearGradient id="cpu-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F1F5F9" />
          <stop offset="0.55" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#C3CCD6" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* main case */}
      <rect x="28" y="8" width="44" height="80" rx="5" fill="url(#cpu-body)" stroke={INK} strokeWidth="3" />
      {/* side panel seam */}
      <path d="M33 12 v72" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
      {/* DVD drive slot */}
      <rect x="34" y="15" width="32" height="7" rx="3" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
      <rect x="60" y="17.6" width="4" height="1.8" rx="0.9" fill="#94A3B8" />
      {/* power button with symbol */}
      <circle cx="39" cy="31" r="5.5" fill="#0D9488" stroke={INK} strokeWidth="2" />
      <path d="M39 27.5 v4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M36.6 30 a4 4 0 1 0 4.8 0" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      {/* USB ports */}
      <rect x="48" y="28" width="7" height="4.5" rx="1" fill="#4B5563" stroke={INK} strokeWidth="1.5" />
      <rect x="48" y="35" width="7" height="4.5" rx="1" fill="#4B5563" stroke={INK} strokeWidth="1.5" />
      <rect x="50.4" y="29.2" width="2.2" height="3" fill="#FDE68A" />
      <rect x="50.4" y="36.2" width="2.2" height="3" fill="#FDE68A" />
      {/* headphone jacks */}
      <circle cx="61" cy="31" r="2.4" fill="#4B5563" stroke={INK} strokeWidth="1.2" />
      <circle cx="67" cy="31" r="2.4" fill="#4B5563" stroke={INK} strokeWidth="1.2" />
      {/* ventilation grille */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M36 ${48 + i * 5.4} h28`} stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      ))}
      {/* glow strip */}
      <rect x="30" y="76" width="4" height="10" rx="2" fill="#38BDF8" opacity="0.8" />
      <rect x="30" y="70" width="4" height="4" rx="2" fill="#22C55E" opacity="0.9" />
    </g>
  ),

  /* ============================ KEYBOARD ============================ */
  keyboard: (
    <g>
      <defs>
        <linearGradient id="kbd-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8F5EE" />
          <stop offset="1" stopColor="#E7E2D5" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="40" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* body — trapezoid for perspective */}
      <path d="M14 26 L86 26 L92 78 Q92 82 88 82 L12 82 Q8 82 8 78 Z" fill="url(#kbd-body)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* function row */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <rect key={`f${i}`} x={13 + i * 7.4} y={29} width="6.2" height="5" rx="1.2" fill="#FFFDF7" stroke="#A08F76" strokeWidth="1" />
      ))}
      {/* letter rows (staggered) */}
      {[0, 1, 2].map((r) =>
        Array.from({ length: 10 }, (_, c) => (
          <rect
            key={`k${r}${c}`}
            x={13 + c * 7.4 + (r === 1 ? 2 : r === 2 ? 4 : 0)}
            y={36 + r * 7}
            width="6.2"
            height="5.8"
            rx="1.3"
            fill="#FFFDF7"
            stroke="#B9AC98"
            strokeWidth="0.8"
          />
        ))
      )}
      {/* home-row bumps on F & J */}
      <rect x="21.2" y="43.6" width="4" height="1.4" rx="0.7" fill="#B9AC98" />
      <rect x="70.2" y="43.6" width="4" height="1.4" rx="0.7" fill="#B9AC98" />
      {/* bottom row: ctrl, alt, spacebar, arrows */}
      <rect x="13" y="57.5" width="9" height="6" rx="1.4" fill="#F1EBDD" stroke="#A08F76" strokeWidth="1" />
      <rect x="23.5" y="57.5" width="9" height="6" rx="1.4" fill="#F1EBDD" stroke="#A08F76" strokeWidth="1" />
      <rect x="34" y="57.5" width="32" height="6" rx="2.4" fill="#FFFDF7" stroke="#A08F76" strokeWidth="1" />
      <rect x="67.5" y="57.5" width="9" height="6" rx="1.4" fill="#F1EBDD" stroke="#A08F76" strokeWidth="1" />
      <rect x="78" y="57.5" width="9.5" height="6" rx="1.4" fill="#F1EBDD" stroke="#A08F76" strokeWidth="1" />
      {/* arrow cluster */}
      <rect x="80.5" y="50" width="5.6" height="5.4" rx="1.2" fill="#FDE68A" stroke="#A08F76" strokeWidth="1" />
      <rect x="74.4" y="50" width="5.6" height="5.4" rx="1.2" fill="#FDE68A" stroke="#A08F76" strokeWidth="1" />
      <rect x="80.5" y="44" width="5.6" height="5.4" rx="1.2" fill="#FDE68A" stroke="#A08F76" strokeWidth="1" />
      <path d="M78.7 46.8 l2 -1.9 2 1.9 h-1.1 v1.6 h-1.8 v-1.6 Z" fill="#B9AC98" />
      {/* indicator LEDs */}
      <circle cx="16.5" cy="70" r="1.5" fill="#22C55E" />
      <circle cx="21" cy="70" r="1.5" fill="#38BDF8" />
      {/* brand line */}
      <path d="M42 70 h16" stroke="#B9AC98" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),

  /* ============================ MOUSE ============================ */
  mouse: (
    <g>
      <defs>
        <linearGradient id="mse-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#F1F5F9" />
          <stop offset="1" stopColor="#D7DEE7" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="24" ry="4.5" fill="rgba(74,52,33,0.12)" />
      {/* cable */}
      <path d="M50 14 q0 -8 8 -8 h6" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
      {/* ergo shell */}
      <path
        d="M50 13 C66 13 76 27 76 46 C76 66 66 82 50 84 C34 82 24 66 24 46 C24 27 34 13 50 13 Z"
        fill="url(#mse-body)"
        stroke={INK}
        strokeWidth="3"
      />
      {/* button seam (left/right split) */}
      <path d="M34.5 26 q15.5 -5 31 0 l-2 18 q-13.5 -4 -27 0 Z" fill="none" stroke="#B9AC98" strokeWidth="0" />
      <path d="M36 27 q14 -4.5 28 0 M50 23 v13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* scroll wheel in the seam */}
      <rect x="46" y="26" width="8" height="13" rx="4" fill="#CBD5E1" stroke={INK} strokeWidth="2" />
      <path d="M50 28.5 v8" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
      {/* side grip dots */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={29.5 + i * 0.9} cy={40 + i * 7} r="0.9" fill="#C3CCD6" />
      ))}
      {/* optical LED glow under */}
      <ellipse cx="50" cy="84.5" rx="7" ry="2.4" fill="#38BDF8" opacity="0.55" />
      {/* gloss */}
      <path d="M38 22 q10 -6 20 -1 q-9 -3 -17 2 Z" fill="#FFFFFF" opacity="0.7" />
    </g>
  ),

  /* ============================ LAPTOP ============================ */
  laptop: (
    <g>
      <defs>
        <linearGradient id="lap-screen" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="lap-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8F5EE" />
          <stop offset="1" stopColor="#DDE2E9" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="34" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* screen half */}
      <path d="M26 16 L74 16 Q77 16 77 19 L77 60 L23 60 L23 19 Q23 16 26 16 Z" fill="#4B5563" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="27.5" y="20.5" width="45" height="35" rx="2" fill="url(#lap-screen)" stroke={INK} strokeWidth="2" />
      {/* screen content: lesson! */}
      <circle cx="62" cy="29" r="4.5" fill="#FDE68A" />
      <path d="M27.5 47 l10 -7 7 5 9 -6 8 6 v4.5 h-34 Z" fill="#22C55E" opacity="0.9" />
      <rect x="27.5" y="50.5" width="45" height="5" fill="#E0F2FE" opacity="0.9" />
      <path d="M31 25 h14" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.9" />
      <path d="M31 31 h9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* hinge */}
      <rect x="23" y="59" width="54" height="4" rx="2" fill="#6B7280" stroke={INK} strokeWidth="2" />
      {/* base with keyboard + trackpad (perspective) */}
      <path d="M14 64 L86 64 L91 80 Q91 84 87 84 L13 84 Q9 84 9 80 Z" fill="url(#lap-base)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {[0, 1, 2].map((r) =>
        Array.from({ length: 9 }, (_, c) => (
          <rect
            key={`lb${r}${c}`}
            x={20 + c * 6.6 + (r === 1 ? 1.8 : r === 2 ? 3.4 : 0)}
            y={66.5 + r * 4.4}
            width="5.4"
            height="3.4"
            rx="1"
            fill="#FFFDF7"
            stroke="#B9AC98"
            strokeWidth="0.6"
          />
        ))
      )}
      <rect x="34" y="79.4" width="30" height="3.2" rx="1.6" fill="#EDEAE0" stroke="#A08F76" strokeWidth="0.9" />
      {/* trackpad glow + glare */}
      <rect x="34" y="79.4" width="30" height="3.2" rx="1.6" fill="#FFFFFF" opacity="0.35" />
      <path d="M30 21 L44 21 L36 55 L29 55 Z" fill="#FFFFFF" opacity="0.16" />
    </g>
  ),

  /* ============================ PHONE ============================ */
  phone: (
    <g>
      <defs>
        <linearGradient id="phn-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4B5563" />
          <stop offset="1" stopColor="#263041" />
        </linearGradient>
        <linearGradient id="phn-wall" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#BAE6FD" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="91" rx="17" ry="3.5" fill="rgba(74,52,33,0.12)" />
      <rect x="33" y="9" width="34" height="80" rx="8" fill="url(#phn-body)" stroke={INK} strokeWidth="3" />
      <rect x="36" y="15" width="28" height="64" rx="4" fill="url(#phn-wall)" stroke={INK} strokeWidth="1.8" />
      {/* status bar */}
      <rect x="36" y="15" width="28" height="5.5" rx="4" fill="#0C4A6E" opacity="0.75" />
      <path d="M38.5 17.8 h4 M44 17.8 h3" stroke="#7DD3FC" strokeWidth="1" strokeLinecap="round" />
      <rect x="58" y="17" width="2.6" height="1.8" rx="0.5" fill="#7DD3FC" />
      <rect x="61.4" y="16.4" width="1.8" height="2.8" rx="0.5" fill="#7DD3FC" />
      {/* app grid */}
      {[
        ["#F59E0B", 41, 25], ["#22C55E", 51, 25], ["#EC4899", 41, 35.5], ["#38BDF8", 51, 35.5],
        ["#8B5CF6", 41, 46], ["#F43F5E", 51, 46],
      ].map(([c, x, y], i) => (
        <g key={i}>
          <rect x={x as number} y={y as number} width="8" height="8" rx="2.2" fill={c as string} stroke={INK} strokeWidth="1.2" />
          <circle cx={(x as number) + 4} cy={(y as number) + 2.4} r="1.4" fill="#FFFFFF" opacity="0.65" />
        </g>
      ))}
      {/* big friendly teacher bubble app */}
      <rect x="41" y="57" width="18" height="12" rx="3" fill="#FFF8EC" stroke={INK} strokeWidth="1.4" />
      <circle cx="46" cy="62" r="2.6" fill="#38BDF8" />
      <path d="M51 60.5 h5 M51 64 h3.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
      {/* home pill */}
      <rect x="44" y="73.5" width="12" height="3" rx="1.5" fill="#FFFFFF" opacity="0.9" />
      {/* screen glare */}
      <path d="M38 16 L46 16 L39.5 78 L37 78 Z" fill="#FFFFFF" opacity="0.2" />
    </g>
  ),

  /* ================= W1L2 — "computer has a face/brain/ears/helper" ================= */
  "slot-face": (
    <g>
      <defs>
        <linearGradient id="sf-scr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="28" ry="5" fill="rgba(74,52,33,0.12)" />
      <rect x="44" y="68" width="12" height="12" rx="2" fill="#9CA3AF" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="50" cy="85" rx="22" ry="6" fill="#4B5563" stroke={INK} strokeWidth="2.5" />
      <rect x="14" y="12" width="72" height="54" rx="7" fill="#4B5563" stroke={INK} strokeWidth="3" />
      <rect x="19" y="17" width="62" height="42" rx="4" fill="url(#sf-scr)" stroke={INK} strokeWidth="2" />
      {/* THE FACE — screen shows us everything */}
      <circle cx="37" cy="34" r="5.5" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <circle cx="63" cy="34" r="5.5" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <circle cx="38.5" cy="35.5" r="2.2" fill={INK} />
      <circle cx="61.5" cy="35.5" r="2.2" fill={INK} />
      <circle cx="39.5" cy="33" r="0.9" fill="#FFFFFF" />
      <circle cx="62.5" cy="33" r="0.9" fill="#FFFFFF" />
      <path d="M40 45 q10 8 20 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="42" r="3" fill="#FBBF77" opacity="0.8" />
      <circle cx="72" cy="42" r="3" fill="#FBBF77" opacity="0.8" />
      {/* sparkle */}
      <path d="M80 14 l1.4 3.2 3.2 1.4 -3.2 1.4 -1.4 3.2 -1.4 -3.2 -3.2 -1.4 3.2 -1.4 Z" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
    </g>
  ),

  "slot-brain": (
    <g>
      <defs>
        <linearGradient id="sb-chip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#334155" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="sb-board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16A34A" />
          <stop offset="1" stopColor="#15803D" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="30" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* circuit board */}
      <rect x="12" y="30" width="76" height="58" rx="6" fill="url(#sb-board)" stroke={INK} strokeWidth="3" />
      <path d="M18 40 h10 v-6 M18 52 h6 v14 M82 44 h-8 v10 M74 78 v-8 h8" stroke="#065F46" strokeWidth="2" fill="none" />
      <circle cx="28" cy="34" r="1.6" fill="#FDE68A" />
      <circle cx="24" cy="66" r="1.6" fill="#FDE68A" />
      <circle cx="78" cy="54" r="1.6" fill="#FDE68A" />
      <circle cx="78" cy="78" r="1.6" fill="#FDE68A" />
      {/* the CPU chip */}
      <rect x="32" y="40" width="36" height="36" rx="5" fill="url(#sb-chip)" stroke={INK} strokeWidth="3" />
      {/* pins */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <path d={`M${37 + i * 8} 40 v-5`} stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
          <path d={`M${37 + i * 8} 76 v5`} stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
          <path d={`M32 ${45 + i * 8} h-5`} stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
          <path d={`M68 ${45 + i * 8} h5`} stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      ))}
      {/* brain circuit glyph on the die */}
      <path
        d="M42 56 q-3 -7 4 -9 q1 -5 7 -4 q5 -3 8 2 q5 1 3 6 q3 5 -3 7 q-1 4 -6 3 l-8 1 q-6 0 -5 -6 Z"
        fill="#22D3EE"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M46 55 l-4 8 M53 55 l2 9 M58 53 l6 7" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="47" cy="51" r="1.4" fill="#FFF8EC" />
      <circle cx="54" cy="49.5" r="1.4" fill="#FFF8EC" />
      <circle cx="58" cy="53" r="1.4" fill="#FFF8EC" />
    </g>
  ),

  "slot-ears": (
    <g>
      <defs>
        <linearGradient id="se-cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="30" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* headband */}
      <path d="M26 58 a24 24 0 0 1 48 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M26 58 a24 24 0 0 1 48 0" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
      {/* ear cups */}
      <rect x="17" y="55" width="18" height="26" rx="8" fill="url(#se-cup)" stroke={INK} strokeWidth="3" />
      <rect x="65" y="55" width="18" height="26" rx="8" fill="url(#se-cup)" stroke={INK} strokeWidth="3" />
      <rect x="21" y="60" width="10" height="16" rx="5" fill="#4B5563" stroke={INK} strokeWidth="1.8" />
      <rect x="69" y="60" width="10" height="16" rx="5" fill="#4B5563" stroke={INK} strokeWidth="1.8" />
      {/* sound waves — the hearing! */}
      <path d="M12 62 q-5 6 0 12 M8 58 q-8 10 0 20" fill="none" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M88 62 q5 6 0 12 M92 58 q8 10 0 20" fill="none" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
      {/* music note */}
      <circle cx="50" cy="40" r="5" fill="#FFF8EC" stroke={INK} strokeWidth="2.4" />
      <path d="M54.5 40 v-16 q5 1.5 6 5" fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />
    </g>
  ),

  "slot-helper": (
    <g>
      <defs>
        <linearGradient id="shp-mse" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D7DEE7" />
        </linearGradient>
      </defs>
      <ellipse cx="46" cy="88" rx="24" ry="4.5" fill="rgba(74,52,33,0.12)" />
      {/* the mouse — our helping hand-friend */}
      <path
        d="M46 22 C60 22 69 35 69 52 C69 68 60 82 46 84 C32 82 23 68 23 52 C23 35 32 22 46 22 Z"
        fill="url(#shp-mse)"
        stroke={INK}
        strokeWidth="3"
      />
      <path d="M34.5 33.5 q11.5 -4 23 0 M46 30 v11" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="42.5" y="32" width="7" height="11" rx="3.5" fill="#CBD5E1" stroke={INK} strokeWidth="1.8" />
      <ellipse cx="46" cy="84.5" rx="6" ry="2" fill="#38BDF8" opacity="0.5" />
      {/* hand-cursor friendship: little cursor pal */}
      <g transform="translate(72 30) rotate(18)">
        <path d="M0 0 L0 26 L6 20.5 L10 29 L14.5 26.8 L10.5 18.5 L18 18 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M3 5 L3 20" stroke="#E2E8F0" strokeWidth="2" />
      </g>
      {/* friendship sparks */}
      <path d="M20 20 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2 Z" fill="#FDE68A" />
      <path d="M74 66 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1 Z" fill="#FDE68A" />
    </g>
  ),

  /* ======================= POWER STATES (W1L4/5) ======================= */
  "power-switch": (
    <g>
      <defs>
        <linearGradient id="pw-btn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34D399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* recessed socket */}
      <rect x="22" y="22" width="56" height="56" rx="14" fill="#E7E2D5" stroke={INK} strokeWidth="3" />
      <rect x="26" y="26" width="48" height="48" rx="11" fill="#D6CFC0" />
      {/* the button */}
      <circle cx="50" cy="50" r="19" fill="url(#pw-btn)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="50" r="19" fill="none" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.5" />
      {/* power glyph */}
      <path d="M50 38 v12" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M42.5 43.5 a11 11 0 1 0 15 0" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      {/* pressed glow */}
      <circle cx="50" cy="50" r="26" fill="none" stroke="#4ADE80" strokeWidth="2.4" opacity="0.55" />
      <path d="M50 20 q-1 -5 3 -7 M58 22 q1 -5 5 -6" stroke="#4ADE80" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
    </g>
  ),

  powerpc: (
    <g>
      <defs>
        <linearGradient id="ppc-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C68B4E" />
          <stop offset="1" stopColor="#8B5E3C" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="42" ry="5.5" fill="rgba(74,52,33,0.14)" />
      {/* desk */}
      <rect x="6" y="72" width="88" height="9" rx="3" fill="url(#ppc-desk)" stroke={INK} strokeWidth="2.6" />
      {/* monitor (center-back) */}
      <rect x="36" y="22" width="34" height="26" rx="3" fill="#4B5563" stroke={INK} strokeWidth="2.4" />
      <rect x="39" y="25" width="28" height="18" rx="1.6" fill="#38BDF8" stroke={INK} strokeWidth="1.4" />
      <path d="M39 38 l7 -5 5 3.5 6 -4 6 4.5 v1.5 h-24 Z" fill="#22C55E" opacity="0.9" />
      <rect x="51" y="48" width="4" height="7" fill="#6B7280" stroke={INK} strokeWidth="1.6" />
      <ellipse cx="53" cy="56.5" rx="9" ry="2.6" fill="#4B5563" stroke={INK} strokeWidth="1.8" />
      {/* tower (right) */}
      <rect x="74" y="28" width="17" height="44" rx="3" fill="#E2E8F0" stroke={INK} strokeWidth="2.4" />
      <rect x="77" y="32" width="11" height="3.4" rx="1.7" fill="#CBD5E1" />
      <circle cx="81.5" cy="41" r="2.6" fill="#0D9488" stroke={INK} strokeWidth="1.4" />
      <rect x="77" y="48" width="11" height="2.6" rx="1.3" fill="#4B5563" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M78 ${55 + i * 3.6} h9`} stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
      ))}
      {/* keyboard (front-left, perspective) */}
      <path d="M10 74 L38 74 L41 84 L7 84 Z" fill="#F1EBDD" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      {[0, 1].map((r) =>
        Array.from({ length: 6 }, (_, c) => (
          <rect key={`ppc${r}${c}`} x={11 + c * 4.4 + (r === 1 ? 1.6 : 0)} y={76 + r * 3.4} width="3.4" height="2.6" rx="0.7" fill="#FFFDF7" stroke="#B9AC98" strokeWidth="0.5" />
        ))
      )}
      {/* mouse (front-right) */}
      <path d="M62 76 C67 76 70 79.5 70 83.5 L62 85.5 Z" fill="#FFFDF7" stroke={INK} strokeWidth="1.8" />
      <path d="M64.5 77.6 v2.6" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
      {/* power cord to socket */}
      <path d="M83 72 q-2 8 -10 9 h-14" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <rect x="55" y="79" width="8" height="6" rx="1.6" fill="#FFF8EC" stroke={INK} strokeWidth="1.8" />
      <circle cx="57.6" cy="82" r="0.8" fill={INK} />
      <circle cx="60.4" cy="82" r="0.8" fill={INK} />
      {/* "press me" sparkle on tower button */}
      <path d="M81.5 34.5 l0.8 1.8 1.8 0.8 -1.8 0.8 -0.8 1.8 -0.8 -1.8 -1.8 -0.8 1.8 -0.8 Z" fill="#FDE68A" />
    </g>
  ),

  monitorbtn: (
    <g>
      <defs>
        <linearGradient id="mb-scr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(74,52,33,0.12)" />
      <rect x="44" y="66" width="12" height="12" rx="2" fill="#9CA3AF" stroke={INK} strokeWidth="2.4" />
      <ellipse cx="50" cy="83" rx="20" ry="5.5" fill="#4B5563" stroke={INK} strokeWidth="2.4" />
      <rect x="16" y="12" width="68" height="52" rx="6" fill="#4B5563" stroke={INK} strokeWidth="3" />
      <rect x="20.5" y="16.5" width="59" height="41" rx="3" fill="url(#mb-scr)" stroke={INK} strokeWidth="2" />
      {/* waking screen: sun rising on the desktop */}
      <circle cx="50" cy="44" r="10" fill="#FFF8EC" stroke="#EA580C" strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <path
            key={a}
            d={`M${50 + 14 * Math.cos(r)} ${44 + 14 * Math.sin(r)} l${2.6 * Math.cos(r)} ${2.6 * Math.sin(r)}`}
            stroke="#EA580C"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        );
      })}
      {/* THE button, pressed & glowing */}
      <circle cx="76" cy="70" r="6" fill="#4B5563" stroke={INK} strokeWidth="2" />
      <circle cx="76" cy="70" r="3.2" fill="#4ADE80" />
      <path d="M76 68.6 v3" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="76" cy="70" r="9" fill="none" stroke="#4ADE80" strokeWidth="1.8" opacity="0.65" />
      {/* radiating "it works!" arcs */}
      <path d="M84 64 q3 -3 3.5 -7 M84 76 q3 3 3.5 7" fill="none" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    </g>
  ),

  wait: (
    <g>
      <defs>
        <linearGradient id="wt-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C68B4E" />
          <stop offset="1" stopColor="#8B5E3C" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="24" ry="5" fill="rgba(74,52,33,0.12)" />
      {/* wooden hourglass frame */}
      <rect x="28" y="10" width="44" height="9" rx="4" fill="url(#wt-frame)" stroke={INK} strokeWidth="2.6" />
      <rect x="28" y="80" width="44" height="9" rx="4" fill="url(#wt-frame)" stroke={INK} strokeWidth="2.6" />
      {/* glass bulbs */}
      <path d="M34 19 h32 l-12 26 v9 l12 26 h-32 l12 -26 v-9 Z" fill="#EAF6FB" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" opacity="0.9" />
      {/* sand: top thinning, bottom piling */}
      <path d="M40 24 h20 l-7 15 h-6 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
      <path d="M50 50 l1.5 -14 h-3 Z" fill="#FBBF24" />
      <path d="M38 82 q12 -18 24 0 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
      <ellipse cx="50" cy="81" rx="11" ry="2.4" fill="#FDE68A" />
      {/* falling grain + sparkle */}
      <circle cx="50" cy="64" r="1.6" fill="#F59E0B" />
      <path d="M74 34 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 Z" fill="#FDE68A" />
    </g>
  ),

  shutdown: (
    <g>
      <defs>
        <linearGradient id="sd-btn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(74,52,33,0.12)" />
      <rect x="22" y="22" width="56" height="56" rx="14" fill="#E7E2D5" stroke={INK} strokeWidth="3" />
      <rect x="26" y="26" width="48" height="48" rx="11" fill="#D6CFC0" />
      <circle cx="50" cy="50" r="19" fill="url(#sd-btn)" stroke={INK} strokeWidth="3" />
      <path d="M50 38 v12" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      <path d="M42.5 43.5 a11 11 0 1 0 15 0" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
      {/* sleeping "zzz" — gentle off, not scary */}
      <path d="M76 26 q4 0 4 3 q0 3 -5 4 h5" fill="none" stroke="#8A7156" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M83 16 q3.4 0 3.4 2.6 q0 2.4 -4.2 3.4 h4.2" fill="none" stroke="#B9AC98" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),

  /* ==================== LAB-CARE RULES (W1L3, W6) ==================== */
  "clean-hands": (
    <g>
      <defs>
        <linearGradient id="ch-soap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* soap bottle */}
      <path d="M30 40 q-5 4 -5 10 v28 q0 6 6 6 h8 q6 0 6 -6 V50 q0 -6 -5 -10 Z" fill="url(#ch-soap)" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
      <rect x="33" y="32" width="10" height="8" rx="2" fill="#38BDF8" stroke={INK} strokeWidth="2.2" />
      <rect x="31" y="31" width="14" height="4" rx="2" fill="#0EA5E9" stroke={INK} strokeWidth="2" />
      <path d="M31 58 q6 -3 14 0 v14 q-7 3 -14 0 Z" fill="#FFFFFF" opacity="0.85" />
      {/* two open hands, freshly washed */}
      <g stroke={INK} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M60 62 q-4 -2 -3 -8 q1 -4 5 -3 q2 -5 6 -3 q3 -4 7 -1 q4 -1 5 4 l1 12 q0 8 -8 9 q-7 0 -9 -6 Z" fill="#F2C79B" />
        <path d="M64 58 l1 -5 M69 56 l1 -5 M74 55 l0.5 -4" strokeWidth="1.8" />
      </g>
      {/* soap bubbles */}
      {[[24, 26, 5], [38, 18, 3.4], [52, 24, 2.6], [30, 10, 2.2]].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#EAF6FB" stroke="#7DD3FC" strokeWidth="1.6" opacity="0.92" />
          <circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.28} fill="#FFFFFF" />
        </g>
      ))}
      {/* water drops */}
      <path d="M86 44 q3 4 0 7 q-3 -3 0 -7 Z" fill="#38BDF8" stroke={INK} strokeWidth="1.4" />
      <path d="M90 60 q2.4 3.4 0 6 q-2.4 -2.6 0 -6 Z" fill="#7DD3FC" />
    </g>
  ),

  "gentle-touch": (
    <g>
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* one keyboard key, big */}
      <rect x="34" y="46" width="32" height="30" rx="7" fill="#FFFDF7" stroke={INK} strokeWidth="3" />
      <rect x="37.5" y="49.5" width="25" height="23" rx="4.5" fill="#F8F5EE" stroke="#B9AC98" strokeWidth="1.4" />
      {/* one gentle finger touching it */}
      <g transform="rotate(-18 50 30)">
        <path d="M46 12 q6 0 6 7 v16 h-12 V19 q0 -7 6 -7 Z" fill="#F2C79B" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
        <path d="M43 38 v-4 h10 v4" fill="#E8B27D" stroke={INK} strokeWidth="2.2" />
      </g>
      {/* soft heart — be kind to keys */}
      <path d="M76 20 q4 -4 7 0 q3 -4 7 0 q0 6 -7 10 q-7 -4 -7 -10 Z" fill="#FB7185" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      {/* tiny sparkle */}
      <path d="M26 30 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1 Z" fill="#FDE68A" />
    </g>
  ),

  "no-food": (
    <g>
      <ellipse cx="50" cy="88" rx="28" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* snack plate + chai behind */}
      <g opacity="0.95">
        <ellipse cx="42" cy="56" rx="18" ry="6" fill="#FFF8EC" stroke={INK} strokeWidth="2.4" />
        <circle cx="38" cy="52" r="4.5" fill="#F59E0B" stroke={INK} strokeWidth="1.8" />
        <circle cx="47" cy="53" r="4.5" fill="#22C55E" stroke={INK} strokeWidth="1.8" />
        <path d="M58 34 h14 l-2 18 h-10 Z" fill="#C68B4E" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M58 36 q-7 2 0 6" fill="none" stroke={INK} strokeWidth="2.2" />
        <path d="M62 28 q2 -5 -1 -8 M68 28 q2 -4 -1 -7" stroke="#B9AC98" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
      {/* prohibition — amber, friendly (zero-failure: no harsh red X) */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="#F59E0B" strokeWidth="6" opacity="0.9" />
      <circle cx="50" cy="50" r="34" fill="none" stroke={INK} strokeWidth="1.6" opacity="0.35" />
      <path d="M27 27 L73 73" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
      <path d="M27 27 L73 73" stroke={INK} strokeWidth="1.4" opacity="0.3" />
    </g>
  ),

  "ask-first": (
    <g>
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* raised hand */}
      <g stroke={INK} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
        <path d="M36 78 V54 q0 -5 5 -5 q5 0 5 5 v-22 q0 -5 5 -5 q5 0 5 5 v22 q0 -5 5 -5 q5 0 5 5 v14 q0 12 -12 14 h-4 q-9 0 -9 -8 Z" fill="#F2C79B" />
        <path d="M46 52 V38 M56 54 V42" strokeWidth="2" />
      </g>
      {/* sleeve */}
      <rect x="36" y="76" width="28" height="9" rx="4" fill="#0D9488" stroke={INK} strokeWidth="2.6" />
      {/* question bubble */}
      <rect x="12" y="12" width="30" height="24" rx="10" fill="#FFFDF7" stroke={INK} strokeWidth="2.8" />
      <path d="M26 36 l-4 8 10 -8 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
      <path d="M27 30 a4.5 4.5 0 1 1 4.5 -4.5 v1.5 q0 2 -2 2.6 q-1.6 0.6 -1.6 2.4" fill="none" stroke="#D97706" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="27.4" cy="35.4" r="1.5" fill="#D97706" />
    </g>
  ),

  "dirty-paws": (
    <g>
      <ellipse cx="50" cy="88" rx="28" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* screen with muddy prints */}
      <rect x="20" y="14" width="60" height="44" rx="5" fill="#4B5563" stroke={INK} strokeWidth="2.8" />
      <rect x="24" y="18" width="52" height="34" rx="3" fill="#A5F3FC" stroke={INK} strokeWidth="1.8" />
      {/* paw prints */}
      <g fill="#8B5E3C" opacity="0.85">
        <ellipse cx="38" cy="32" rx="5.5" ry="4.5" transform="rotate(-14 38 32)" />
        <circle cx="32" cy="26" r="2" /><circle cx="37" cy="24" r="2" /><circle cx="42" cy="25" r="2" />
        <ellipse cx="58" cy="38" rx="5" ry="4" transform="rotate(12 58 38)" />
        <circle cx="53" cy="32" r="1.8" /><circle cx="58" cy="30.5" r="1.8" /><circle cx="62.5" cy="32" r="1.8" />
      </g>
      {/* cleaning cloth arriving */}
      <g transform="rotate(-12 78 66)">
        <rect x="62" y="54" width="28" height="20" rx="6" fill="#FFF8EC" stroke={INK} strokeWidth="2.8" />
        <path d="M66 60 h20 M66 66 h20" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* suds */}
      {[[60, 56, 3], [68, 50, 2.4]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#EAF6FB" stroke="#7DD3FC" strokeWidth="1.4" />
      ))}
    </g>
  ),

  "juice-spill": (
    <g>
      <ellipse cx="50" cy="88" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* tipped glass, juice flowing toward keyboard */}
      <g transform="rotate(104 34 44)">
        <path d="M24 28 h20 l-3 26 h-14 Z" fill="#EAF6FB" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" opacity="0.92" />
        <path d="M26.5 34 h15 l-1.6 17 h-11.8 Z" fill="#F59E0B" opacity="0.85" />
      </g>
      {/* juice puddle running right */}
      <path d="M40 66 q14 -8 30 -2 q10 4 20 0 q-4 8 -14 8 h-26 q-8 0 -10 -6 Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.6" opacity="0.95" />
      <circle cx="52" cy="60" r="2" fill="#F59E0B" opacity="0.7" />
      <circle cx="66" cy="58" r="1.6" fill="#F59E0B" opacity="0.6" />
      {/* worried keyboard below the danger */}
      <path d="M14 72 L86 72 L90 84 L10 84 Z" fill="#F1EBDD" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      {[0, 1].map((r) =>
        Array.from({ length: 8 }, (_, c) => (
          <rect key={`js${r}${c}`} x={15 + c * 9 + (r ? 2.5 : 0)} y={74 + r * 4} width="7.4" height="3.2" rx="1" fill="#FFFDF7" stroke="#A08F76" strokeWidth="0.8" />
        ))
      )}
      {/* alarm dot */}
      <circle cx="88" cy="62" r="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2" />
      <path d="M88 59.6 v3.4" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="88" cy="65" r="0.8" fill="#B45309" />
    </g>
  ),

  "sneak-in": (
    <g>
      <ellipse cx="50" cy="88" rx="28" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* door */}
      <path d="M26 12 a10 10 0 0 1 20 0 v72 h-20 Z" fill="#C68B4E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M31 24 v54 M41 24 v54" stroke="#8B5E3C" strokeWidth="2" opacity="0.7" />
      <circle cx="41" cy="52" r="2.2" fill="#FDE68A" stroke={INK} strokeWidth="1.6" />
      {/* shadowy stranger peeking from behind the door */}
      <g opacity="0.85">
        <circle cx="56" cy="44" r="10" fill="#64748B" stroke={INK} strokeWidth="2.4" />
        <path d="M46 52 q10 -4 20 0 l4 26 q-14 6 -28 0 Z" fill="#64748B" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        <circle cx="52.5" cy="43" r="1.6" fill="#FFF8EC" />
        <circle cx="60" cy="43" r="1.6" fill="#FFF8EC" />
        <path d="M53 49 q3 2 6 0" stroke="#FFF8EC" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* hat brim — incognito */}
        <path d="M45 38 q11 -8 22 0 l-2 -3 q-9 -6 -18 0 Z" fill="#475569" stroke={INK} strokeWidth="2" />
      </g>
      {/* friendly "stop, ask first" palm */}
      <g stroke={INK} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M70 58 V44 q0 -4.5 4.5 -4.5 q4.5 0 4.5 4.5 v9 q0 -4.5 4.5 -4.5 q4.5 0 4.5 4.5 v6 q0 10 -9 12 q-9 2 -9 -8 Z" fill="#F2C79B" />
      </g>
      <path d="M74 34 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2 Z" fill="#FDE68A" />
    </g>
  ),

  "polite-question": (
    <g>
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* big friendly speech bubble with a question mark */}
      <rect x="16" y="16" width="52" height="40" rx="14" fill="#FFFDF7" stroke={INK} strokeWidth="3" />
      <path d="M30 55 l-5 12 14 -12 Z" fill="#FFFDF7" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M38 40 a7 7 0 1 1 7 -7 v2.5 q0 3 -3 4 q-2.4 0.9 -2.4 3.6" fill="none" stroke="#D97706" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="38.4" cy="48.4" r="2.2" fill="#D97706" />
      {/* second smaller bubble — taking turns */}
      <rect x="58" y="52" width="30" height="24" rx="10" fill="#EAF6FB" stroke={INK} strokeWidth="2.6" />
      <path d="M78 75 l3 8 -10 -8 Z" fill="#EAF6FB" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M73 66 a3.4 3.4 0 1 1 3.4 -3.4 v1.2 q0 1.6 -1.6 2 q-1.2 0.5 -1.2 1.8" fill="none" stroke="#0D9488" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="73.2" cy="70.4" r="1.2" fill="#0D9488" />
      {/* sparkles */}
      <path d="M84 22 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2 Z" fill="#FDE68A" />
      <path d="M12 42 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1 Z" fill="#FDE68A" />
    </g>
  ),

  "bang-keys": (
    <g>
      <ellipse cx="50" cy="88" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* keyboard */}
      <path d="M12 62 L88 62 L93 80 L7 80 Z" fill="#F1EBDD" stroke={INK} strokeWidth="2.8" strokeLinejoin="round" />
      {[0, 1].map((r) =>
        Array.from({ length: 9 }, (_, c) => (
          <rect key={`bk${r}${c}`} x={14 + c * 8.2 + (r ? 2.2 : 0)} y={64.5 + r * 6.4} width="6.6" height="5" rx="1.2" fill="#FFFDF7" stroke="#A08F76" strokeWidth="0.9" />
        ))
      )}
      {/* keys popping up (banged!) */}
      <rect x="34" y="48" width="9" height="8" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="2" transform="rotate(-16 38 52)" />
      <rect x="48" y="44" width="9" height="8" rx="2" fill="#FDE68A" stroke={INK} strokeWidth="2" transform="rotate(9 52 48)" />
      <rect x="60" y="50" width="9" height="8" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="2" transform="rotate(21 64 54)" />
      {/* impact stars */}
      <path d="M30 34 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4 Z" fill="#F59E0B" stroke={INK} strokeWidth="1.4" />
      <path d="M52 26 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2 Z" fill="#FDE68A" stroke={INK} strokeWidth="1.2" />
      <path d="M72 32 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1 Z" fill="#FBBF24" stroke={INK} strokeWidth="1.2" />
    </g>
  ),

  /* ==================== WORLD BADGES (map nodes) ==================== */
  "medal-mouse": (
    <g>
      <defs>
        <linearGradient id="mdm-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="22" ry="4" fill="rgba(74,52,33,0.10)" />
      {/* ribbon V */}
      <path d="M38 8 L50 30 L34 46 L26 22 Z" fill="#22C55E" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M62 8 L50 30 L66 46 L74 22 Z" fill="#16A34A" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      {/* disc */}
      <circle cx="50" cy="56" r="30" fill="url(#mdm-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="56" r="23" fill="none" stroke="#B45309" strokeWidth="2" opacity="0.55" />
      {/* embossed mouse */}
      <path d="M50 38 C60 38 66 46 66 55 C66 64 60 71 50 72 C40 71 34 64 34 55 C34 46 40 38 50 38 Z" fill="#FFFDF7" stroke="#B45309" strokeWidth="2.4" />
      <path d="M40 46 q10 -3.4 20 0 M50 43.5 v8" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <rect x="47" y="45" width="6" height="8" rx="3" fill="#CBD5E1" stroke="#B45309" strokeWidth="1.6" />
      <circle cx="50" cy="26" r="2" fill="#FFF8EC" opacity="0.85" />
    </g>
  ),

  "medal-keyboard": (
    <g>
      <defs>
        <linearGradient id="mdk-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="22" ry="4" fill="rgba(74,52,33,0.10)" />
      <path d="M38 8 L50 30 L34 46 L26 22 Z" fill="#8B5CF6" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M62 8 L50 30 L66 46 L74 22 Z" fill="#7C3AED" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="50" cy="56" r="30" fill="url(#mdk-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="56" r="23" fill="none" stroke="#B45309" strokeWidth="2" opacity="0.55" />
      {/* embossed keyboard */}
      <path d="M32 44 L68 44 L71 66 L29 66 Z" fill="#FFFDF7" stroke="#B45309" strokeWidth="2.4" strokeLinejoin="round" />
      {[0, 1].map((r) =>
        Array.from({ length: 5 }, (_, c) => (
          <rect key={`mdk${r}${c}`} x={34 + c * 7} y={47 + r * 7} width="5.4" height="5" rx="1.2" fill="#F1EBDD" stroke="#B45309" strokeWidth="1" />
        ))
      )}
      <rect x="38" y="61" width="24" height="3.6" rx="1.8" fill="#F1EBDD" stroke="#B45309" strokeWidth="1" />
      <circle cx="50" cy="26" r="2" fill="#FFF8EC" opacity="0.85" />
    </g>
  ),

  /* ==================== POSTURE (W3L1) ==================== */
  "posture-good": (
    <g>
      <ellipse cx="50" cy="90" rx="32" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* green approval halo */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#22C55E" strokeWidth="3" opacity="0.5" strokeDasharray="4 7" />
      {/* desk + monitor (side view) */}
      <rect x="56" y="40" width="26" height="18" rx="3" fill="#4B5563" stroke={INK} strokeWidth="2.4" />
      <rect x="59" y="43" width="20" height="12" rx="1.6" fill="#38BDF8" stroke={INK} strokeWidth="1.6" />
      <path d="M66 58 v6 h8 v-6" stroke={INK} strokeWidth="2.2" fill="#9CA3AF" />
      <rect x="54" y="64" width="32" height="6" rx="2.5" fill="#C68B4E" stroke={INK} strokeWidth="2.4" />
      <path d="M84 70 v16 M58 70 v16" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
      {/* child sitting STRAIGHT — back vertical, feet flat, eyes level with screen */}
      <g stroke={INK} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
        {/* head */}
        <circle cx="38" cy="30" r="10" fill="#F2C79B" />
        <path d="M29 26 q9 -12 19 -2 l-1 -4 q-8 -8 -16 -2 Z" fill="#231A12" />
        {/* straight back */}
        <path d="M44 38 q6 2 6 9 v18 q0 6 -6 6 q-6 0 -6 -6 V47 q0 -7 6 -9 Z" fill="#0D9488" />
        {/* thighs horizontal, shins vertical — perfect sitting */}
        <path d="M44 66 h16 v8 h-16 Z" fill="#FFF8EC" />
        <path d="M54 74 v12" strokeWidth="4.4" />
        <path d="M48 86 h13" strokeWidth="3.6" />
        {/* arm reaching to desk */}
        <path d="M48 48 q8 4 14 14" strokeWidth="3.6" fill="none" />
      </g>
      {/* happy eyes + smile */}
      <circle cx="34.5" cy="29" r="1.4" fill={INK} />
      <circle cx="41.5" cy="29" r="1.4" fill={INK} />
      <path d="M35 34 q3 2.4 6 0" stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* check */}
      <path d="M14 20 l4 5 8 -11" fill="none" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),

  "posture-slouch": (
    <g>
      <ellipse cx="50" cy="90" rx="32" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* amber note halo */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.5" strokeDasharray="4 7" />
      {/* desk + monitor */}
      <rect x="56" y="40" width="26" height="18" rx="3" fill="#4B5563" stroke={INK} strokeWidth="2.4" />
      <rect x="59" y="43" width="20" height="12" rx="1.6" fill="#38BDF8" stroke={INK} strokeWidth="1.6" />
      <path d="M66 58 v6 h8 v-6" stroke={INK} strokeWidth="2.2" fill="#9CA3AF" />
      <rect x="54" y="64" width="32" height="6" rx="2.5" fill="#C68B4E" stroke={INK} strokeWidth="2.4" />
      <path d="M84 70 v16 M58 70 v16" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
      {/* child SLOUCHING — curved back, head drooping forward */}
      <g stroke={INK} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="42" cy="42" r="9.5" fill="#F2C79B" />
        <path d="M34 38 q8 -11 17 -2 l-1 -4 q-7 -7 -14 -2 Z" fill="#231A12" />
        {/* hunched C-curve back */}
        <path d="M50 50 q9 4 8 12 q-1 8 -4 14 q-3 6 -9 4 q-6 -2 -4 -9 q3 -8 2 -13 q-1 -5 7 -8 Z" fill="#0D9488" />
        {/* legs tucked under, heels up */}
        <path d="M45 78 h13 v6 h-13 Z" fill="#FFF8EC" />
        <path d="M56 84 l8 3" strokeWidth="4" />
      </g>
      {/* droopy eyes */}
      <path d="M38.5 42.5 q2 -1.5 4 0 M44.5 42.5 q2 -1.5 4 0" stroke={INK} strokeWidth="1.7" fill="none" strokeLinecap="round" />
      <path d="M41 47 q2.4 1.6 5 0" stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* amber "fix it" dot */}
      <circle cx="15" cy="22" r="5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.4" />
      <path d="M15 19.4 v3.4" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="25.4" r="0.9" fill="#B45309" />
    </g>
  ),

  "posture-feetup": (
    <g>
      <ellipse cx="50" cy="90" rx="32" ry="5" fill="rgba(74,52,33,0.10)" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.5" strokeDasharray="4 7" />
      {/* desk + monitor */}
      <rect x="56" y="40" width="26" height="18" rx="3" fill="#4B5563" stroke={INK} strokeWidth="2.4" />
      <rect x="59" y="43" width="20" height="12" rx="1.6" fill="#38BDF8" stroke={INK} strokeWidth="1.6" />
      <rect x="54" y="64" width="32" height="6" rx="2.5" fill="#C68B4E" stroke={INK} strokeWidth="2.4" />
      <path d="M84 70 v16 M58 70 v16" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
      {/* child leaning back, FEET ON THE DESK */}
      <g stroke={INK} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="36" cy="26" r="9.5" fill="#F2C79B" />
        <path d="M27 22 q9 -11 18 -2 l-1 -4 q-7 -7 -14 -2 Z" fill="#231A12" />
        {/* leaning-back body */}
        <path d="M44 34 q8 4 6 12 l-3 14 q-1.5 7 -8 6 q-6 -1 -5 -8 l3 -14 q1 -6 7 -10 Z" fill="#0D9488" />
        {/* legs kicked UP onto the desk */}
        <path d="M42 60 q14 -4 24 -14" strokeWidth="5" fill="none" />
        <path d="M40 66 q16 -2 28 -12" strokeWidth="5" fill="none" />
        {/* shoe on desk */}
        <path d="M63 48 q6 -1 8 3 q1 4 -5 4 l-5 -1 Z" fill="#8B5E3C" />
      </g>
      <circle cx="31" cy="25" r="1.4" fill={INK} />
      <circle cx="38" cy="25" r="1.4" fill={INK} />
      <path d="M32 30 q3 2 5 0" stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* amber alert */}
      <circle cx="15" cy="22" r="5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.4" />
      <path d="M15 19.4 v3.4" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="25.4" r="0.9" fill="#B45309" />
    </g>
  ),

  "posture-tooclose": (
    <g>
      <ellipse cx="50" cy="90" rx="32" ry="5" fill="rgba(74,52,33,0.10)" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.5" strokeDasharray="4 7" />
      {/* monitor (bigger, child right against it) */}
      <rect x="46" y="34" width="34" height="24" rx="3" fill="#4B5563" stroke={INK} strokeWidth="2.4" />
      <rect x="49.5" y="37.5" width="27" height="17" rx="1.6" fill="#38BDF8" stroke={INK} strokeWidth="1.6" />
      <rect x="44" y="58" width="30" height="5" rx="2" fill="#C68B4E" stroke={INK} strokeWidth="2.2" />
      <path d="M72 63 v20 M48 63 v20" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
      {/* child LEANING way too close to screen */}
      <g stroke={INK} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="44" cy="42" r="9" fill="#F2C79B" transform="rotate(14 44 42)" />
        <path d="M36 37 q9 -10 17 -1 l-1 -4 q-7 -7 -13 -2 Z" fill="#231A12" />
        {/* body craned forward */}
        <path d="M52 50 q7 3 5 10 q-2 8 -6 13 q-4 5 -10 2 q-5 -3 -2 -9 q4 -7 4 -12 q0 -5 9 -4 Z" fill="#0D9488" />
        <path d="M44 72 h13 v7 h-13 Z" fill="#FFF8EC" />
        <path d="M50 79 v9" strokeWidth="4.4" />
        {/* stool base */}
        <rect x="40" y="84" width="22" height="4" rx="2" fill="#8B5E3C" />
      </g>
      {/* squinting wide eyes too close */}
      <circle cx="49" cy="41" r="2.2" fill={INK} />
      <circle cx="54" cy="43" r="2" fill={INK} />
      <path d="M50 47 q2.4 1.6 5 0.6" stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* distance ruler hint — should be an arm's length */}
      <path d="M42 24 h6 M45 24 v-6 M39 18 h12" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M20 22 l1 2.2 2.2 1 -2.2 1 -1 2.2 -1 -2.2 -2.2 -1 2.2 -1 Z" fill="#FDE68A" />
    </g>
  ),
};
