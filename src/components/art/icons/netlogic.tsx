import type { ReactNode } from "react";

const INK = "#4A3421";

/** INTERNET-SAFETY + LOGIC/CODING icon set — "Friendly Realism" v3 (docs/02) */
export const NETLOGIC_ICONS: Record<string, ReactNode> = {
  /* ---------------- Internet safety ---------------- */

  browser: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="brw-chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DDF1FD" />
          <stop offset="1" stopColor="#B5DDF6" />
        </linearGradient>
        <linearGradient id="brw-hero" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7DD3FC" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="brw-page" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFDF6" />
          <stop offset="1" stopColor="#F2EBDC" />
        </linearGradient>
      </defs>
      {/* window + chrome bar */}
      <rect x="8" y="17" width="84" height="66" rx="8" fill="url(#brw-page)" stroke={INK} strokeWidth="3" />
      <path d="M8 34 V25 a8 8 0 0 1 8 -8 h68 a8 8 0 0 1 8 8 v9 H8 Z" fill="url(#brw-chrome)" stroke={INK} strokeWidth="3" />
      <circle cx="19" cy="25.5" r="3" fill="#EF4444" stroke={INK} strokeWidth="1" />
      <circle cx="28.5" cy="25.5" r="3" fill="#FBBF24" stroke={INK} strokeWidth="1" />
      <circle cx="38" cy="25.5" r="3" fill="#22C55E" stroke={INK} strokeWidth="1" />
      {/* address bar pill with secure lock */}
      <rect x="45" y="20.5" width="40" height="10" rx="5" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.8" />
      <path d="M48.6 26 v-1.4 a1.6 1.6 0 0 1 3.2 0 V26" fill="none" stroke="#16A34A" strokeWidth="1.4" />
      <rect x="47.8" y="26" width="4.8" height="3.6" rx="0.8" fill="#16A34A" />
      <path d="M55.5 24 h22 M55.5 27 h14" stroke="#C4CFDA" strokeWidth="2" />
      {/* page hero band */}
      <rect x="15" y="40" width="70" height="15" rx="3" fill="url(#brw-hero)" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="18" y="42.5" width="64" height="4" rx="2" fill="#FFFFFF" opacity="0.45" />
      <circle cx="25" cy="48.5" r="3.2" fill="#FFFFFF" opacity="0.9" />
      <path d="M32.5 46.5 h26 M32.5 50 h17" stroke="#FFFFFF" strokeWidth="2.4" opacity="0.85" />
      {/* two content cards */}
      <rect x="15" y="60" width="33" height="18" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
      <rect x="52" y="60" width="33" height="18" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
      <rect x="18.5" y="63.5" width="13" height="3.5" rx="1.75" fill="#FCD34D" />
      <rect x="55.5" y="63.5" width="13" height="3.5" rx="1.75" fill="#5EEAD4" />
      <path d="M18.5 71.5 h25 M18.5 75.5 h17 M55.5 71.5 h25 M55.5 75.5 h13" stroke="#D6CDBB" strokeWidth="2" />
    </g>
  ),

  "globe-net": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="glb-sea" cx="0.38" cy="0.32" r="0.95">
          <stop offset="0" stopColor="#BAE6FD" />
          <stop offset="0.55" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#0369A1" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="24" ry="4.5" fill="rgba(74,52,33,0.10)" />
      {/* thin stand cradle */}
      <path d="M35 67 Q50 86 65 67" fill="none" stroke={INK} strokeWidth="6.5" />
      <path d="M35 67 Q50 86 65 67" fill="none" stroke="#C68B4E" strokeWidth="3.5" />
      {/* ocean sphere */}
      <circle cx="50" cy="45" r="28" fill="url(#glb-sea)" stroke={INK} strokeWidth="3" />
      {/* blobby continents */}
      <path d="M32 28 q6 -6 13 -2 q6 3 4 9 q-1 4 -6 5 q-2 4 -7 2 q-5 -2 -5 -7 q-3 -4 1 -7 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.8" />
      <path d="M58 30 q8 -3 12 3 q4 6 -1 11 q-4 4 -9 3 q-6 1 -8 -5 q-2 -7 6 -12 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.8" />
      <path d="M40 56 q5 -3 9 1 q4 4 0 7 q-4 4 -8 1 q-4 -4 -1 -9 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.8" />
      {/* meridian + parallels */}
      <ellipse cx="50" cy="45" rx="11" ry="27" fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" />
      <path d="M22 45 Q50 51 78 45 M25 33 Q50 38 75 33 M25 57 Q50 62 75 57" fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.55" />
      <path d="M29 37 A21 21 0 0 1 40 25" fill="none" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.55" />
    </g>
  ),

  "link-chain": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="lnk-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E8EEF4" />
          <stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      <ellipse cx="51" cy="74" rx="25" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* rear link */}
      <g transform="rotate(-20 67 49.5)">
        <rect x="47" y="39" width="40" height="21" rx="10.5" fill="none" stroke={INK} strokeWidth="13" />
        <rect x="47" y="39" width="40" height="21" rx="10.5" fill="none" stroke="url(#lnk-steel)" strokeWidth="9.5" />
        <path d="M58 37.5 h12 M58 61.5 h12" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
      </g>
      <ellipse cx="50" cy="51" rx="7" ry="4.5" fill="rgba(74,52,33,0.15)" transform="rotate(-20 50 51)" />
      {/* front link */}
      <g transform="rotate(-20 35 49.5)">
        <rect x="15" y="39" width="40" height="21" rx="10.5" fill="none" stroke={INK} strokeWidth="13" />
        <rect x="15" y="39" width="40" height="21" rx="10.5" fill="none" stroke="url(#lnk-steel)" strokeWidth="9.5" />
        <path d="M26 37.5 h12 M26 61.5 h12" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
      </g>
      {/* weave: rear strand passes over the front link for depth */}
      <path d="M45.5 46 L54.5 42.8" stroke={INK} strokeWidth="13" />
      <path d="M45.5 46 L54.5 42.8" stroke="url(#lnk-steel)" strokeWidth="9.5" />
      <path d="M47.5 45.2 l4 -1.2" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
    </g>
  ),

  "shield-safe": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="shd-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
      <path d="M50 10 L82 23 v20 q0 25 -32 43 Q18 68 18 43 V23 Z" fill="url(#shd-body)" stroke={INK} strokeWidth="3" />
      <path d="M50 16 L76 26.5 v16 q0 19 -26 34 Q24 61.5 24 42.5 v-16 Z" fill="none" stroke="#BBF7D0" strokeWidth="2" opacity="0.55" />
      <path d="M50 14 L78.5 25.3 V29.5 L50 18.5 L21.5 29.5 V25.3 Z" fill="#FFFFFF" opacity="0.35" />
      <path d="M35 48.5 l10.5 10.5 20 -22.5" fill="none" stroke="#166534" strokeWidth="10.5" opacity="0.35" />
      <path d="M35 46 l10.5 10.5 20 -22.5" fill="none" stroke="#FFFFFF" strokeWidth="7.5" />
    </g>
  ),

  "key-password": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="key-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="52" cy="82" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* 45° shaft + two-tooth bit */}
      <path d="M40.5 40.5 L73 73" stroke={INK} strokeWidth="13" />
      <path d="M57 57 L64 50 M66.5 66.5 L73.5 59.5" stroke={INK} strokeWidth="11.5" />
      <path d="M40.5 40.5 L73 73" stroke="url(#key-gold)" strokeWidth="8.5" />
      <path d="M57 57 L64 50 M66.5 66.5 L73.5 59.5" stroke="url(#key-gold)" strokeWidth="7" />
      <path d="M48.5 51.5 L59 62" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.5" />
      {/* round bow with hole */}
      <circle cx="31" cy="31" r="16" fill="url(#key-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="31" cy="31" r="5.5" fill="#FFF8EC" stroke={INK} strokeWidth="2.5" />
      <path d="M21.5 24 a13 13 0 0 1 8 -7" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.55" />
    </g>
  ),

  "letter-message": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="env-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFDF6" />
          <stop offset="1" stopColor="#F3E8D3" />
        </linearGradient>
        <radialGradient id="env-seal" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FDBA74" />
          <stop offset="1" stopColor="#EA580C" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="89" rx="28" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* opened flap, up */}
      <path d="M16 44 L50 12 L84 44 Z" fill="#F1E3C8" stroke={INK} strokeWidth="3" />
      <path d="M23 41 L50 19 L77 41" fill="none" stroke="#E6D7B8" strokeWidth="2.5" />
      {/* letter card peeking out */}
      <rect x="32" y="26" width="36" height="24" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="2.5" />
      <path d="M50 30.5 c-1.6 -2.6 -5.6 -2.1 -5.6 0.9 c0 2 2.8 3.4 5.6 5.6 c2.8 -2.2 5.6 -3.6 5.6 -5.6 c0 -3 -4 -3.5 -5.6 -0.9 Z" fill="#EC4899" stroke={INK} strokeWidth="1.5" />
      <path d="M38.5 41 h23" stroke="#CDBB98" strokeWidth="2.5" />
      {/* envelope body */}
      <rect x="12" y="44" width="76" height="42" rx="6" fill="url(#env-paper)" stroke={INK} strokeWidth="3" />
      <path d="M15 48 L50 69 L85 48" fill="none" stroke="#D9C7A6" strokeWidth="2.5" />
      {/* warm wax seal */}
      <circle cx="50" cy="71" r="8.5" fill="url(#env-seal)" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="71" r="5" fill="none" stroke="#FFF7ED" strokeWidth="1.8" opacity="0.6" />
      <circle cx="47" cy="68" r="1.8" fill="#FFFFFF" opacity="0.55" />
    </g>
  ),

  /* ---------------- Logic / coding ---------------- */

  "block-cmd": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="cmd-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* puzzle block: notch on top, tab on bottom */}
      <path d="M20 24 H44 v7 h12 v-7 h24 a10 10 0 0 1 10 10 v24 a10 10 0 0 1 -10 10 H56 v7 h-12 v-7 H20 a10 10 0 0 1 -10 -10 v-24 a10 10 0 0 1 10 -10 Z" fill="url(#cmd-body)" stroke={INK} strokeWidth="3" />
      <path d="M19 30 H42 M58 30 H81" stroke="#FFFFFF" strokeWidth="3" opacity="0.45" />
      <path d="M40 42 L59 51 L40 60 Z" fill="#FFFFFF" />
    </g>
  ),

  "block-loop": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="lp-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <path d="M20 24 H44 v7 h12 v-7 h24 a10 10 0 0 1 10 10 v24 a10 10 0 0 1 -10 10 H56 v7 h-12 v-7 H20 a10 10 0 0 1 -10 -10 v-24 a10 10 0 0 1 10 -10 Z" fill="url(#lp-body)" stroke={INK} strokeWidth="3" />
      <path d="M19 30 H42 M58 30 H81" stroke="#FFFFFF" strokeWidth="3" opacity="0.45" />
      {/* circular-arrows loop glyph */}
      <path d="M40.5 47.5 A10 10 0 0 1 59.5 47.5 M59.5 53.5 A10 10 0 0 1 40.5 53.5" fill="none" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M56.8 46.7 L63.8 50.7 L59.2 53.7 Z M43.2 55.3 L36.2 51.3 L40.8 48.3 Z" fill="#FFFFFF" />
      <circle cx="50" cy="50.5" r="2.3" fill="#FFFFFF" />
    </g>
  ),

  "block-flag": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="flg-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <path d="M20 24 H44 v7 h12 v-7 h24 a10 10 0 0 1 10 10 v24 a10 10 0 0 1 -10 10 H56 v7 h-12 v-7 H20 a10 10 0 0 1 -10 -10 v-24 a10 10 0 0 1 10 -10 Z" fill="url(#flg-body)" stroke={INK} strokeWidth="3" />
      <path d="M19 30 H42 M58 30 H81" stroke="#FFFFFF" strokeWidth="3" opacity="0.45" />
      {/* checkered finish flag */}
      <path d="M40.5 39.5 V64" stroke="#FFFFFF" strokeWidth="3.5" />
      <rect x="40.5" y="39.5" width="19" height="12" rx="1" fill="#FFFFFF" />
      <rect x="40.5" y="39.5" width="6.33" height="6" fill={INK} />
      <rect x="53.17" y="39.5" width="6.33" height="6" fill={INK} />
      <rect x="46.83" y="45.5" width="6.34" height="6" fill={INK} />
    </g>
  ),

  "loop-arrow": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="la-teal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      {/* two thick semicircle arrows, clockwise */}
      <path d="M24 41 A26 26 0 0 1 76 41 M76 59 A26 26 0 0 1 24 59" fill="none" stroke={INK} strokeWidth="13" />
      <path d="M24 41 A26 26 0 0 1 76 41 M76 59 A26 26 0 0 1 24 59" fill="none" stroke="url(#la-teal)" strokeWidth="8.5" />
      <path d="M70.5 40 H81.5 L76 51 Z" fill="url(#la-teal)" stroke={INK} strokeWidth="2.5" />
      <path d="M29.5 60 H18.5 L24 49 Z" fill="url(#la-teal)" stroke={INK} strokeWidth="2.5" />
      <path d="M33 24 A24 24 0 0 1 44 16.5" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.55" />
      <circle cx="50" cy="50" r="4.5" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
    </g>
  ),

  "if-fork": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="if-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C68B4E" />
          <stop offset="1" stopColor="#8B5E3C" />
        </linearGradient>
        <linearGradient id="if-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF8EC" />
          <stop offset="1" stopColor="#F0E2C6" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="28" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* wooden post */}
      <rect x="45.5" y="42" width="9" height="44" rx="2" fill="url(#if-wood)" stroke={INK} strokeWidth="2.5" />
      <path d="M50 54 V80" stroke="#8B5E3C" strokeWidth="1.5" opacity="0.6" />
      {/* decision diamond */}
      <path d="M50 8 L72 30 L50 52 L28 30 Z" fill="url(#if-plate)" stroke={INK} strokeWidth="3" />
      <path d="M50 13.5 L67 30 L50 46.5 L33 30 Z" fill="none" stroke="#E3D2AE" strokeWidth="2" />
      <path d="M50 9 V51" stroke={INK} strokeWidth="2" opacity="0.25" />
      {/* fork arrows */}
      <path d="M45 35 L33 47" stroke={INK} strokeWidth="11" />
      <path d="M45 35 L33 47" stroke="#F59E0B" strokeWidth="7" />
      <path d="M35.5 49.5 L30.5 44.5 L28.8 51.2 Z" fill="#F59E0B" stroke={INK} strokeWidth="2.2" />
      <path d="M55 35 L67 47" stroke={INK} strokeWidth="11" />
      <path d="M55 35 L67 47" stroke="#0D9488" strokeWidth="7" />
      <path d="M64.5 49.5 L69.5 44.5 L71.2 51.2 Z" fill="#0D9488" stroke={INK} strokeWidth="2.2" />
      {/* choice badges */}
      <circle cx="28.5" cy="63" r="9" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <text x="28.5" y="68" fontSize="13.5" fontWeight="800" textAnchor="middle" fill="#FFF8EC" fontFamily="Arial, sans-serif">?</text>
      <circle cx="71.5" cy="63" r="9" fill="#0D9488" stroke={INK} strokeWidth="2.5" />
      <path d="M67 63.5 l3 3.5 5.5 -7" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    </g>
  ),

  "glitch-bug": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="bug-body" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="0.55" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6D28D9" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="24" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* six little legs */}
      <path d="M31 50 Q23 48 19 41 M29 58 H16 M31 66 Q23 69 20 76 M69 50 Q77 48 81 41 M71 58 H84 M69 66 Q77 69 80 76" fill="none" stroke={INK} strokeWidth="3" />
      {/* round body with spots */}
      <ellipse cx="50" cy="58" rx="21" ry="17" fill="url(#bug-body)" stroke={INK} strokeWidth="3" />
      <path d="M50 42 V74" stroke="#6D28D9" strokeWidth="2" opacity="0.55" />
      <circle cx="42" cy="53" r="3.2" fill="#6D28D9" />
      <circle cx="57.5" cy="52.5" r="2.6" fill="#6D28D9" />
      <circle cx="38" cy="62" r="2.4" fill="#6D28D9" />
      <circle cx="62" cy="63" r="2.8" fill="#6D28D9" />
      <circle cx="49" cy="69" r="2.2" fill="#6D28D9" />
      <path d="M35 55 q2 -6 8 -8" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.4" />
      {/* friendly head */}
      <circle cx="50" cy="38" r="11.5" fill="url(#bug-body)" stroke={INK} strokeWidth="3" />
      <path d="M43 33 q2 -4 6 -5" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.5" />
      <circle cx="45.5" cy="36.5" r="3.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <circle cx="54.5" cy="36.5" r="3.8" fill="#FFFFFF" stroke={INK} strokeWidth="1.5" />
      <circle cx="46.5" cy="37.2" r="1.7" fill={INK} />
      <circle cx="55.5" cy="37.2" r="1.7" fill={INK} />
      <circle cx="45.9" cy="36.3" r="0.6" fill="#FFFFFF" />
      <circle cx="54.9" cy="36.3" r="0.6" fill="#FFFFFF" />
      <path d="M46.5 43.5 q3.5 3 7 0" fill="none" stroke={INK} strokeWidth="2.2" />
      {/* antennae */}
      <path d="M45 27.5 Q42 20 36.5 18.5 M55 27.5 Q58 20 63.5 18.5" fill="none" stroke={INK} strokeWidth="2.5" />
      <circle cx="35.8" cy="18.2" r="2.2" fill="#8B5CF6" stroke={INK} strokeWidth="1.5" />
      <circle cx="64.2" cy="18.2" r="2.2" fill="#8B5CF6" stroke={INK} strokeWidth="1.5" />
      {/* "found a bug!" bubble */}
      <path d="M71 4 h15 a5 5 0 0 1 5 5 v8 a5 5 0 0 1 -5 5 h-8 l-6 5 2 -5 h-3 a5 5 0 0 1 -5 -5 V9 a5 5 0 0 1 5 -5 Z" fill="#FEF08A" stroke={INK} strokeWidth="2.5" />
      <rect x="76.8" y="8.6" width="3.2" height="7" rx="1.6" fill={INK} />
      <circle cx="78.4" cy="19.4" r="1.9" fill={INK} />
    </g>
  ),

  "pattern-blocks": (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* empty slot in the middle: what comes next? (a circle again!) */}
      <rect x="38.5" y="38.5" width="23" height="23" rx="5" fill="#FFF8EC" fillOpacity="0.5" stroke="#A89878" strokeWidth="3" strokeDasharray="5 4" />
      <circle cx="50" cy="50" r="5.8" fill="none" stroke="#A89878" strokeWidth="2.8" strokeDasharray="4 3" />
      {/* circle block (top) */}
      <rect x="38.5" y="12" width="23" height="23" rx="5" fill="#FB7185" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="23.5" r="5.8" fill="#FFF8EC" />
      <rect x="42" y="14.5" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      {/* square block (right) */}
      <rect x="65" y="38.5" width="23" height="23" rx="5" fill="#FBBF24" stroke={INK} strokeWidth="2.5" />
      <rect x="71" y="44.5" width="11" height="11" rx="2" fill="#FFF8EC" />
      <rect x="68.5" y="41" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      {/* triangle block (bottom) */}
      <rect x="38.5" y="65" width="23" height="23" rx="5" fill="#2DD4BF" stroke={INK} strokeWidth="2.5" />
      <path d="M50 70.5 L56.5 81 H43.5 Z" fill="#FFF8EC" />
      <rect x="42" y="67.5" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      {/* star block (left) */}
      <rect x="12" y="38.5" width="23" height="23" rx="5" fill="#A78BFA" stroke={INK} strokeWidth="2.5" />
      <path d="M23.5 43.2 L25.2 47.7 L30 47.9 L26.3 50.9 L27.5 55.5 L23.5 52.9 L19.5 55.5 L20.7 50.9 L17 47.9 L21.8 47.7 Z" fill="#FFF8EC" />
      <rect x="15.5" y="41" width="8" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
    </g>
  ),

  rocket: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="rkt-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DCE5EF" />
        </linearGradient>
        <linearGradient id="rkt-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F87171" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
        <radialGradient id="rkt-win" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#D0EFFE" />
          <stop offset="1" stopColor="#38BDF8" />
        </radialGradient>
      </defs>
      {/* motion speed lines */}
      <path d="M14 30 h9 M11 45 h11 M14 60 h7" stroke="#94A3B8" strokeWidth="3" opacity="0.8" />
      <g transform="translate(5 0) rotate(12 50 52)">
        {/* side fins */}
        <path d="M35 46 Q20 52 18 74 Q30 68 38 58 Z" fill="url(#rkt-red)" stroke={INK} strokeWidth="2.5" />
        <path d="M65 46 Q80 52 82 74 Q70 68 62 58 Z" fill="url(#rkt-red)" stroke={INK} strokeWidth="2.5" />
        {/* 3-layer flame */}
        <path d="M40 66 Q50 72 50 92 Q50 72 60 66 Z" fill="#F97316" stroke={INK} strokeWidth="2.5" />
        <path d="M44 66 Q50 70 50 84 Q50 70 56 66 Z" fill="#FBBF24" />
        <path d="M47 66 Q50 68.5 50 76 Q50 68.5 53 66 Z" fill="#FDE68A" />
        {/* nozzle */}
        <path d="M42 60 h16 l3.5 7 h-23 Z" fill="#64748B" stroke={INK} strokeWidth="2.5" />
        {/* white body */}
        <path d="M50 10 q15 14 15 38 l-4 12 h-22 l-4 -12 q0 -24 15 -38 Z" fill="url(#rkt-body)" stroke={INK} strokeWidth="3" />
        <path d="M37 49 H63" stroke="#CBD5E1" strokeWidth="2.5" opacity="0.8" />
        {/* red nose cone */}
        <path d="M50 9 Q61 19 63 32 Q50 26 37 32 Q39 19 50 9 Z" fill="url(#rkt-red)" stroke={INK} strokeWidth="2.5" />
        <path d="M46 18 Q48 14 51 12.5" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.65" />
        {/* porthole window */}
        <circle cx="50" cy="42" r="8.5" fill="url(#rkt-win)" stroke={INK} strokeWidth="2.5" />
        <circle cx="50" cy="42" r="5.8" fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.65" />
        <path d="M45.5 37.5 a6.5 6.5 0 0 1 4 -2" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
        <path d="M44 22 Q45.5 15.5 50 13" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
      </g>
    </g>
  ),

  "bazaar-stall": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="bza-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C68B4E" />
          <stop offset="1" stopColor="#92613A" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="31" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* stall poles */}
      <rect x="14" y="20" width="4.5" height="66" rx="2" fill="#A16207" stroke={INK} strokeWidth="2" />
      <rect x="81.5" y="20" width="4.5" height="66" rx="2" fill="#A16207" stroke={INK} strokeWidth="2" />
      {/* wooden counter */}
      <rect x="18" y="58" width="64" height="28" rx="3" fill="url(#bza-wood)" stroke={INK} strokeWidth="3" />
      <path d="M19 67.5 h62 M19 76.5 h62" stroke="#8B5E3C" strokeWidth="2" opacity="0.7" />
      <path d="M21 60.5 h58" stroke="#E0B273" strokeWidth="2.5" opacity="0.8" />
      {/* crate of oranges */}
      <circle cx="26.5" cy="42.5" r="3.6" fill="#F97316" stroke={INK} strokeWidth="1.6" />
      <circle cx="33.5" cy="42" r="3.6" fill="#F97316" stroke={INK} strokeWidth="1.6" />
      <circle cx="40.5" cy="42.5" r="3.6" fill="#F97316" stroke={INK} strokeWidth="1.6" />
      <circle cx="30" cy="38.6" r="3.6" fill="#FB923C" stroke={INK} strokeWidth="1.6" />
      <circle cx="37" cy="38.6" r="3.6" fill="#FB923C" stroke={INK} strokeWidth="1.6" />
      <rect x="21" y="45" width="25" height="13.5" rx="2" fill="#B45309" stroke={INK} strokeWidth="2.5" />
      <path d="M29.5 45.5 v12.5 M37.5 45.5 v12.5" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      {/* crate of mangoes */}
      <ellipse cx="57.5" cy="44.5" rx="4" ry="3.4" fill="#FBBF24" stroke={INK} strokeWidth="1.6" />
      <ellipse cx="64.5" cy="43.8" rx="4" ry="3.4" fill="#F59E0B" stroke={INK} strokeWidth="1.6" />
      <ellipse cx="70.5" cy="44.8" rx="3.6" ry="3" fill="#FBBF24" stroke={INK} strokeWidth="1.6" />
      <rect x="52" y="47" width="24" height="11.5" rx="2" fill="#B45309" stroke={INK} strokeWidth="2.5" />
      <path d="M60 47.5 v10.5 M68 47.5 v10.5" stroke={INK} strokeWidth="1.2" opacity="0.5" />
      {/* striped scalloped awning */}
      <rect x="10" y="13" width="80" height="7" rx="3.5" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      <path d="M12 20 h15.2 v6 a7.6 6 0 0 1 -15.2 0 Z" fill="#FBBF24" stroke={INK} strokeWidth="2" />
      <path d="M27.2 20 h15.2 v6 a7.6 6 0 0 1 -15.2 0 Z" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <path d="M42.4 20 h15.2 v6 a7.6 6 0 0 1 -15.2 0 Z" fill="#FBBF24" stroke={INK} strokeWidth="2" />
      <path d="M57.6 20 h15.2 v6 a7.6 6 0 0 1 -15.2 0 Z" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <path d="M72.8 20 h15.2 v6 a7.6 6 0 0 1 -15.2 0 Z" fill="#FBBF24" stroke={INK} strokeWidth="2" />
      {/* hanging fabric roll */}
      <path d="M76 20 V27" stroke={INK} strokeWidth="2" />
      <rect x="66" y="27" width="24" height="11" rx="5.5" fill="#EC4899" stroke={INK} strokeWidth="2.5" />
      <path d="M82 28 V37" stroke="#F9A8D4" strokeWidth="2" opacity="0.7" />
      <circle cx="70.5" cy="32.5" r="3.6" fill="#FBCFE8" stroke={INK} strokeWidth="1.8" />
    </g>
  ),

  /* ---------------- Medals ---------------- */

  "medal-shield": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="mds-gold" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset="0.55" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </radialGradient>
        <linearGradient id="mds-ribL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="mds-ribR" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#115E59" />
        </linearGradient>
        <linearGradient id="mds-shield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <path d="M33 5 H47 L52 34 L38 42 Z" fill="url(#mds-ribL)" stroke={INK} strokeWidth="2.5" />
      <path d="M67 5 H53 L48 34 L62 42 Z" fill="url(#mds-ribR)" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="58" r="26" fill="url(#mds-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="58" r="20.5" fill="none" stroke="#B45309" strokeWidth="2.2" opacity="0.65" />
      <path d="M31 48 A22.5 22.5 0 0 1 43 36.5" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />
      <path d="M50 42.5 L63.5 47.5 V56 q0 9.5 -13.5 15.5 Q36.5 65.5 36.5 56 V47.5 Z" fill="url(#mds-shield)" stroke={INK} strokeWidth="2.5" />
      <path d="M44.5 55.5 l4 4 7.5 -8.5" fill="none" stroke="#FFFFFF" strokeWidth="3" />
    </g>
  ),

  "medal-gem": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="mdg-gold" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset="0.55" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </radialGradient>
        <linearGradient id="mdg-ribL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="mdg-ribR" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#115E59" />
        </linearGradient>
        <linearGradient id="mdg-gem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBCFE8" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <path d="M33 5 H47 L52 34 L38 42 Z" fill="url(#mdg-ribL)" stroke={INK} strokeWidth="2.5" />
      <path d="M67 5 H53 L48 34 L62 42 Z" fill="url(#mdg-ribR)" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="58" r="26" fill="url(#mdg-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="58" r="20.5" fill="none" stroke="#B45309" strokeWidth="2.2" opacity="0.65" />
      <path d="M31 48 A22.5 22.5 0 0 1 43 36.5" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />
      {/* cut pink gem */}
      <path d="M41.5 41.5 H58.5 L66.5 51 L50 72.5 L33.5 51 Z" fill="url(#mdg-gem)" stroke={INK} strokeWidth="2.5" />
      <path d="M41.5 41.5 L50 51 M58.5 41.5 L50 51 M33.5 51 H66.5 M50 51 V72.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.55" />
    </g>
  ),

  "medal-mountain": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="mdm-gold" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset="0.55" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </radialGradient>
        <linearGradient id="mdm-ribL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2DD4BF" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="mdm-ribR" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#115E59" />
        </linearGradient>
        <linearGradient id="mdm-rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A5B8CE" />
          <stop offset="1" stopColor="#5E718A" />
        </linearGradient>
      </defs>
      <path d="M33 5 H47 L52 34 L38 42 Z" fill="url(#mdm-ribL)" stroke={INK} strokeWidth="2.5" />
      <path d="M67 5 H53 L48 34 L62 42 Z" fill="url(#mdm-ribR)" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="58" r="26" fill="url(#mdm-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="58" r="20.5" fill="none" stroke="#B45309" strokeWidth="2.2" opacity="0.65" />
      <path d="M31 48 A22.5 22.5 0 0 1 43 36.5" fill="none" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" />
      {/* two peaks with snow caps */}
      <path d="M31 71.5 L45.5 45.5 L53.5 58.5 L61.5 47.5 L71.5 71.5 Z" fill="url(#mdm-rock)" stroke={INK} strokeWidth="2.5" />
      <path d="M41 52 L45.5 45.5 L50 52 L47.6 50.5 L45.5 53 L43.4 50.5 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
      <path d="M58 53.5 L61.5 47.5 L64.8 53.5 L62.6 52.2 L61.5 54.5 L59.4 52.2 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.2" />
    </g>
  ),
};
