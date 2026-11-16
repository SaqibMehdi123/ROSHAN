import type { ReactNode } from "react";

const INK = "#4A3421";

/** EVERYDAY OBJECTS / NATURE / VILLAGE LIFE / UI — "Friendly Realism" v3 (docs/02) */
export const OBJECTS_ICONS: Record<string, ReactNode> = {
  /* ============================ PRIORITY — HIGH USE ============================ */

  /** ripe mango — yellow-orange gradient, red blush cheek, stem + leaf, speckles */
  mango: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="mng-body" x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#FDE68A" /><stop offset="0.55" stopColor="#FBBF24" /><stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="mng-blush" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FB7185" stopOpacity="0.7" /><stop offset="1" stopColor="#FB7185" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="27" ry="5.5" fill="rgba(74,52,33,0.10)" />
      <path d="M35 30 q-3 -8 3 -12" stroke="#8B5E3C" strokeWidth="3.5" fill="none" />
      <path d="M37 17 q11 -8 21 -1 q-9 10 -21 1 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <path d="M36 27 C56 18 82 28 82 48 C82 70 64 84 46 81 C30 78 22 62 25 49 C27 38 30 30 36 27 Z" fill="url(#mng-body)" stroke={INK} strokeWidth="3" />
      <ellipse cx="66" cy="40" rx="13" ry="9" fill="url(#mng-blush)" transform="rotate(24 66 40)" />
      <path d="M34 37 q3 -7 10 -9" stroke="#FFFFFF" strokeWidth="4" opacity="0.5" fill="none" />
      <circle cx="46" cy="42" r="1.4" fill="#D97706" opacity="0.55" /><circle cx="56" cy="36" r="1.2" fill="#D97706" opacity="0.55" />
      <circle cx="64" cy="52" r="1.4" fill="#D97706" opacity="0.5" /><circle cx="45" cy="58" r="1.2" fill="#D97706" opacity="0.5" />
      <circle cx="53" cy="67" r="1.3" fill="#D97706" opacity="0.45" /><circle cx="36" cy="50" r="1.2" fill="#D97706" opacity="0.45" />
    </g>
  ),

  /** cut crystal gem — purple-pink facets + white sparkle (Brain Gym) */
  gem: (
    <g strokeLinejoin="round">
      <defs>
        <linearGradient id="gem-crown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F5D0FE" /><stop offset="1" stopColor="#E879F9" /></linearGradient>
        <linearGradient id="gem-pav" x1="0" y1="0" x2="0.6" y2="1"><stop offset="0" stopColor="#E879F9" /><stop offset="1" stopColor="#C026D3" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="87" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M30 20 H70 L84 42 L50 84 L16 42 Z" fill="url(#gem-pav)" stroke={INK} strokeWidth="3" />
      <path d="M30 20 L70 20 L76 31 L24 31 Z" fill="url(#gem-crown)" stroke={INK} strokeWidth="2.5" />
      <path d="M16 42 H84 M30 20 L24 31 M70 20 L76 31 M30 20 L36 42 M70 20 L64 42" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.55" fill="none" />
      <path d="M36 42 L50 84 L64 42" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" fill="none" />
      <path d="M38 22 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6 Z" fill="#FFFFFF" opacity="0.95" />
    </g>
  ),

  /** plump 5-point gold star — gradient + gloss (reward) */
  star: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="stw-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF3C7" /><stop offset="0.45" stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M50 15 L58.8 37.9 L83.3 39.2 L64.3 54.6 L70.6 78.3 L50 65 L29.4 78.3 L35.7 54.6 L16.7 39.2 L41.2 37.9 Z" fill="url(#stw-gold)" stroke={INK} strokeWidth="3" />
      <path d="M34 37 q5 -6 12 -8" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.55" fill="none" />
    </g>
  ),

  /** bunting pennant on a pole — amber/white stripes + pompom */
  "party-flag": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="28" cy="90" rx="14" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M26 16 V90" stroke="#8B5E3C" strokeWidth="5" />
      <path d="M26 18 V88" stroke="#B98A55" strokeWidth="1.6" opacity="0.6" />
      <path d="M29 18 L86 34 L29 28.7 Z" fill="#FBBF24" stroke={INK} strokeWidth="2.5" />
      <path d="M29 28.7 L86 34 L29 39.3 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.5" />
      <path d="M29 39.3 L86 34 L29 50 Z" fill="#FBBF24" stroke={INK} strokeWidth="2.5" />
      <circle cx="26" cy="13" r="6.5" fill="#FDE047" stroke={INK} strokeWidth="2.5" />
      <circle cx="23" cy="11.5" r="1.2" fill="#F59E0B" /><circle cx="28.5" cy="11" r="1.2" fill="#F59E0B" /><circle cx="26" cy="15" r="1.2" fill="#F59E0B" />
    </g>
  ),

  /** friendly 6-petal daisy — pink petals, amber dotted centre, stem + 2 leaves */
  flower: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="flw-petal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#EC4899" /><stop offset="1" stopColor="#FBCFE8" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="16" ry="4" fill="rgba(74,52,33,0.10)" />
      <path d="M50 56 V90" stroke="#16A34A" strokeWidth="4" />
      <path d="M50 72 Q38 70 34 60 Q46 58 50 72 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <path d="M50 80 Q62 78 66 68 Q54 66 50 80 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const px = 50 + 14.5 * Math.cos((a * Math.PI) / 180);
        const py = 42 + 14.5 * Math.sin((a * Math.PI) / 180);
        return <ellipse key={a} cx={px} cy={py} rx="13" ry="7.5" fill="url(#flw-petal)" stroke={INK} strokeWidth="2.2" transform={`rotate(${a} ${px} ${py})`} />;
      })}
      <circle cx="50" cy="42" r="9.5" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <circle cx="47" cy="39.5" r="1.3" fill="#B45309" /><circle cx="53" cy="39.5" r="1.3" fill="#B45309" /><circle cx="50" cy="43.5" r="1.3" fill="#B45309" />
      <circle cx="46.8" cy="45" r="1.2" fill="#B45309" /><circle cx="53.2" cy="45" r="1.2" fill="#B45309" />
    </g>
  ),

  /** speckled brown egg — soft radial shading */
  egg: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="egg-shell" cx="0.38" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#FFF3DF" /><stop offset="0.6" stopColor="#F4DCB8" /><stop offset="1" stopColor="#D9A066" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="24" ry="5.5" fill="rgba(74,52,33,0.10)" />
      <path d="M50 14 C64 14 72 32 72 52 C72 71 63 84 50 84 C37 84 28 71 28 52 C28 32 36 14 50 14 Z" fill="url(#egg-shell)" stroke={INK} strokeWidth="3" />
      <path d="M37 40 q1 -8 7 -11" stroke="#FFFFFF" strokeWidth="4.5" opacity="0.55" fill="none" />
      <circle cx="45" cy="46" r="1.5" fill="#B45309" opacity="0.5" /><circle cx="57" cy="42" r="1.3" fill="#B45309" opacity="0.5" />
      <circle cx="62" cy="56" r="1.5" fill="#B45309" opacity="0.45" /><circle cx="44" cy="62" r="1.4" fill="#B45309" opacity="0.45" />
      <circle cx="53" cy="70" r="1.3" fill="#B45309" opacity="0.4" /><circle cx="36" cy="54" r="1.2" fill="#B45309" opacity="0.4" />
    </g>
  ),

  /** Pakistani chai — clay kulhar, warm tea surface, 2 steam curls, saucer */
  "chai-cup": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="cha-clay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D9885A" /><stop offset="1" stopColor="#B05E33" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="5.5" fill="rgba(74,52,33,0.10)" />
      <ellipse cx="50" cy="81" rx="27" ry="7" fill="#E09B6D" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="50" cy="80.5" rx="17" ry="4" fill="#C97C4E" />
      <path d="M42 32 q-4 -7 1 -12" stroke="#D6CDBB" strokeWidth="3" fill="none" opacity="0.85" />
      <path d="M56 32 q4 -7 -1 -12" stroke="#D6CDBB" strokeWidth="3" fill="none" opacity="0.85" />
      <path d="M31 44 L35 72 Q36 79 43 79 H57 Q64 79 65 72 L69 44 Z" fill="url(#cha-clay)" stroke={INK} strokeWidth="3" />
      <path d="M44 48 L45 74 M56 48 L55 74" stroke="#8C4A26" strokeWidth="2" opacity="0.35" />
      <ellipse cx="50" cy="44" rx="19" ry="5.5" fill="#7C4A2A" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="48" cy="43.5" rx="13" ry="3.5" fill="#A9714B" />
    </g>
  ),

  /** monarch butterfly — amber/brown wings, white dots, diagonal pose */
  butterfly: (
    <g strokeLinejoin="round" strokeLinecap="round" transform="rotate(-12 50 50)">
      <defs>
        <linearGradient id="bfl-wing" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FDBA74" /><stop offset="1" stopColor="#F97316" /></linearGradient>
      </defs>
      <path d="M46 46 C38 24 20 12 11 21 C3 29 13 45 44 52 Z" fill="url(#bfl-wing)" stroke={INK} strokeWidth="3" />
      <path d="M54 46 C62 24 80 12 89 21 C97 29 87 45 56 52 Z" fill="url(#bfl-wing)" stroke={INK} strokeWidth="3" />
      <path d="M46 55 C30 52 17 58 20 69 C23 79 38 78 48 63 Z" fill="#FBBF24" stroke={INK} strokeWidth="2.8" />
      <path d="M54 55 C70 52 83 58 80 69 C77 79 62 78 52 63 Z" fill="#FBBF24" stroke={INK} strokeWidth="2.8" />
      <path d="M44 50 L22 30 M56 50 L78 30 M46 58 L28 62 M54 58 L72 62" stroke="#9A3412" strokeWidth="1.6" opacity="0.55" fill="none" />
      <circle cx="14" cy="24" r="1.8" fill="#FFFDF7" /><circle cx="12" cy="33" r="1.8" fill="#FFFDF7" /><circle cx="17" cy="41" r="1.7" fill="#FFFDF7" />
      <circle cx="86" cy="24" r="1.8" fill="#FFFDF7" /><circle cx="88" cy="33" r="1.8" fill="#FFFDF7" /><circle cx="83" cy="41" r="1.7" fill="#FFFDF7" />
      <circle cx="26" cy="66" r="1.5" fill="#FFFDF7" /><circle cx="74" cy="66" r="1.5" fill="#FFFDF7" />
      <ellipse cx="50" cy="53" rx="5" ry="15" fill="#5B3A1E" stroke={INK} strokeWidth="2" />
      <circle cx="50" cy="35" r="5.5" fill="#5B3A1E" stroke={INK} strokeWidth="2" />
      <circle cx="48" cy="34" r="1.2" fill="#FFF8EC" /><circle cx="52" cy="34" r="1.2" fill="#FFF8EC" />
      <path d="M47 31 Q42 22 37 20 M53 31 Q58 22 63 20" stroke={INK} strokeWidth="2" fill="none" />
      <circle cx="37" cy="20" r="1.8" fill={INK} /><circle cx="63" cy="20" r="1.8" fill={INK} />
    </g>
  ),

  /** traditional patang kite — gradient paper, crossed spars, tail with 3 bows */
  kite: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="kit-paper" x1="0" y1="0" x2="0.7" y2="1"><stop offset="0" stopColor="#FDE047" /><stop offset="1" stopColor="#F97316" /></linearGradient>
      </defs>
      <path d="M50 80 q-6 6 -1 11 q5 5 -1 9" stroke={INK} strokeWidth="1.8" fill="none" opacity="0.8" />
      <path d="M41 84 l6.5 -3.2 v6.4 Z M54 84 l-6.5 -3.2 v6.4 Z" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
      <path d="M42 92 l6 -3 v6 Z M54 92 l-6 -3 v6 Z" fill="#3B82F6" stroke={INK} strokeWidth="1.5" />
      <path d="M45 98 l5 -2.6 v5.2 Z M55 98 l-5 -2.6 v5.2 Z" fill="#22C55E" stroke={INK} strokeWidth="1.3" />
      <path d="M50 10 L83 46 L50 82 L17 46 Z" fill="url(#kit-paper)" stroke={INK} strokeWidth="3" />
      <path d="M50 10 L83 46 L50 46 Z" fill="#FFFFFF" opacity="0.18" />
      <path d="M50 82 L17 46 L50 46 Z" fill="#7C2D12" opacity="0.12" />
      <path d="M50 12 V80" stroke="#92400E" strokeWidth="3" />
      <path d="M19 44 H81" stroke="#92400E" strokeWidth="3" />
      <circle cx="50" cy="44" r="3" fill="#7C2D12" stroke={INK} strokeWidth="1.5" />
    </g>
  ),

  /** THE mouse cursor — white arrow, INK outline, soft shadow, click-spark at tip */
  teer: (
    <g strokeLinejoin="round">
      <g transform="translate(36 20) rotate(20)">
        <path d="M6 3 L6 47 L16 37 L22 52 L29 47 L23 33 L36 31 Z" fill="rgba(74,52,33,0.18)" transform="translate(2.5 3.5)" />
        <path d="M6 3 L6 47 L16 37 L22 52 L29 47 L23 33 L36 31 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      </g>
      <path d="M40 17.5 l1.3 5.2 5.2 1.3 -5.2 1.3 -1.3 5.2 -1.3 -5.2 -5.2 -1.3 5.2 -1.3 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.5" />
    </g>
  ),

  /** glossy water droplet — sky-blue gradient, specular highlight, ripple below */
  "water-drop": (
    <g strokeLinejoin="round">
      <defs>
        <radialGradient id="drp-body" cx="0.38" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#E0F2FE" /><stop offset="0.55" stopColor="#7DD3FC" /><stop offset="1" stopColor="#0EA5E9" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="15" ry="3.5" fill="none" stroke="#BAE6FD" strokeWidth="2" />
      <ellipse cx="50" cy="90" rx="8" ry="2" fill="none" stroke="#BAE6FD" strokeWidth="1.6" opacity="0.7" />
      <path d="M50 12 C58 27 70 39 70 54 A20 20 0 1 1 30 54 C30 39 42 27 50 12 Z" fill="url(#drp-body)" stroke={INK} strokeWidth="3" />
      <ellipse cx="42" cy="50" rx="4.5" ry="8" fill="#FFFFFF" opacity="0.6" transform="rotate(14 42 50)" />
      <circle cx="56" cy="63" r="2.5" fill="#FFFFFF" opacity="0.4" />
    </g>
  ),

  /** warm sun — radial disc + 8 rounded rays (no face) */
  sun: (
    <g strokeLinecap="round">
      <defs>
        <radialGradient id="sun-core" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0" stopColor="#FEF9C3" /><stop offset="0.6" stopColor="#FDE68A" /><stop offset="1" stopColor="#F59E0B" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="30" fill="#FDE68A" opacity="0.25" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1={50 + 25 * Math.cos((a * Math.PI) / 180)} y1={50 + 25 * Math.sin((a * Math.PI) / 180)} x2={50 + 37 * Math.cos((a * Math.PI) / 180)} y2={50 + 37 * Math.sin((a * Math.PI) / 180)} stroke="#F59E0B" strokeWidth="5.5" />
      ))}
      <circle cx="50" cy="50" r="21.5" fill="url(#sun-core)" stroke={INK} strokeWidth="3" />
      <circle cx="43" cy="43" r="4.5" fill="#FFFFFF" opacity="0.45" />
    </g>
  ),

  /** party balloon — rose gradient, gloss streak, knot + curling string */
  gubbara: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="gub-rose" cx="0.38" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#FECDD3" /><stop offset="0.55" stopColor="#FB7185" /><stop offset="1" stopColor="#E11D48" />
        </radialGradient>
      </defs>
      <path d="M50 76 q-7 8 -1 14 q5 5 0 9" stroke={INK} strokeWidth="2" fill="none" opacity="0.85" />
      <path d="M46 68 L54 68 L50 75 Z" fill="#E11D48" stroke={INK} strokeWidth="2" />
      <ellipse cx="50" cy="40" rx="24" ry="27" fill="url(#gub-rose)" stroke={INK} strokeWidth="3" />
      <ellipse cx="41" cy="29" rx="6" ry="10" fill="#FFFFFF" opacity="0.5" transform="rotate(18 41 29)" />
      <path d="M33 40 q3 14 12 21" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.3" fill="none" />
    </g>
  ),

  /** village goat — cream body, grey-brown head, beard, droopy ears, curved horns */
  goat: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M34 66 V82 M44 68 V84 M58 68 V84 M68 66 V82" stroke="#B98A55" strokeWidth="5" />
      <path d="M34 82 v2.5 M44 84 v2.5 M58 84 v2.5 M68 82 v2.5" stroke={INK} strokeWidth="5" />
      <path d="M23 50 q-9 -6 -7 -15 q7 1 9 9 Z" fill="#E8D9BC" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="47" cy="56" rx="25" ry="16" fill="#F5EAD3" stroke={INK} strokeWidth="3" />
      <ellipse cx="75" cy="41" rx="10.5" ry="12" fill="#C9B295" stroke={INK} strokeWidth="3" />
      <ellipse cx="64.5" cy="43" rx="8.5" ry="4.5" fill="#B7A184" stroke={INK} strokeWidth="2.2" transform="rotate(26 64.5 43)" />
      <ellipse cx="85.5" cy="45" rx="8.5" ry="4.5" fill="#B7A184" stroke={INK} strokeWidth="2.2" transform="rotate(-26 85.5 45)" />
      <path d="M70 31 q-1 -8 5 -10 q3 4 -1 9 Z" fill="#D9CDB8" stroke={INK} strokeWidth="2" />
      <path d="M80 31 q1 -8 -5 -10 q-3 4 1 9 Z" fill="#D9CDB8" stroke={INK} strokeWidth="2" />
      <circle cx="78" cy="39" r="2" fill={INK} /><circle cx="78.6" cy="38.4" r="0.7" fill="#FFF8EC" />
      <circle cx="76" cy="47" r="1" fill={INK} opacity="0.7" /><circle cx="80" cy="47" r="1" fill={INK} opacity="0.7" />
      <path d="M73 51 q2 8 7 8 l-2 -9 Z" fill="#B7A184" stroke={INK} strokeWidth="2" />
    </g>
  ),

  /** mango tree — trunk with 2 branches, layered canopy, hanging mangoes */
  "mango-tree": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M47 90 q1 -20 -2 -30 q-3 -7 -10 -10" stroke="#8B5E3C" strokeWidth="6.5" fill="none" />
      <path d="M53 90 q-1 -20 2 -30 q3 -7 10 -10" stroke="#8B5E3C" strokeWidth="6.5" fill="none" />
      <circle cx="50" cy="36" r="23" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <circle cx="30" cy="50" r="13" fill="#16A34A" stroke={INK} strokeWidth="2.5" />
      <circle cx="70" cy="50" r="13" fill="#16A34A" stroke={INK} strokeWidth="2.5" />
      <circle cx="42" cy="29" r="8" fill="#4ADE80" opacity="0.5" />
      <circle cx="32" cy="53" r="4.2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.8" />
      <circle cx="45" cy="57" r="4.2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.8" />
      <circle cx="58" cy="56" r="4.2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.8" />
      <circle cx="69" cy="51" r="4.2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.8" />
      <circle cx="50" cy="44" r="4.2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.8" />
    </g>
  ),

  /** village brick well — stone base, wooden posts + crossbeam, rope & bucket */
  well: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="wel-stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D6D3D1" /><stop offset="1" stopColor="#A8A29E" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="32" ry="5.5" fill="rgba(74,52,33,0.10)" />
      <path d="M27 58 V78 Q27 90 50 90 Q73 90 73 78 V58 Z" fill="url(#wel-stone)" stroke={INK} strokeWidth="3" />
      <path d="M27 66 H73 M27 74 Q50 79 73 74" stroke="#78716C" strokeWidth="2" opacity="0.7" fill="none" />
      <path d="M38 58 v8 M62 58 v8 M32 68 v7 M50 69 v8 M68 68 v7" stroke="#78716C" strokeWidth="2" opacity="0.6" />
      <ellipse cx="50" cy="58" rx="23" ry="9" fill="#B8B2AC" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="58" rx="16.5" ry="6" fill="#57534E" />
      <ellipse cx="50" cy="57" rx="10" ry="3.5" fill="#38BDF8" opacity="0.55" />
      <path d="M30 56 V22 M70 56 V22" stroke="#8B5E3C" strokeWidth="5.5" />
      <path d="M24 20 H76" stroke="#8B5E3C" strokeWidth="6.5" />
      <path d="M30 26 L44 20 M70 26 L56 20" stroke="#8B5E3C" strokeWidth="3.5" opacity="0.8" />
      <path d="M50 24 V42" stroke="#D9CDB8" strokeWidth="2.5" />
      <path d="M44 46 Q50 40 56 46" stroke={INK} strokeWidth="2.2" fill="none" />
      <path d="M44 46 H56 L54.5 56 H45.5 Z" fill="#A16207" stroke={INK} strokeWidth="2.5" />
      <path d="M45.5 51 H54.5" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
    </g>
  ),

  /** charpai — woven bed, wooden frame, alternating straps, 2 cushions */
  charpai: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="chp-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D29A62" /><stop offset="1" stopColor="#B98A55" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="36" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M24 42 V30 M76 42 V30" stroke="#8B5E3C" strokeWidth="5" />
      <rect x="14" y="42" width="72" height="13" rx="4" fill="url(#chp-wood)" stroke={INK} strokeWidth="3" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={20 + i * 8} y="44" width="4" height="9" rx="2" fill={i % 2 ? "#E8CF9F" : "#C89A5B"} />
      ))}
      <path d="M24 55 V82 M76 55 V82" stroke="#8B5E3C" strokeWidth="6.5" />
      <rect x="24" y="30" width="24" height="16" rx="6" fill="#F472B6" stroke={INK} strokeWidth="2.5" transform="rotate(-7 36 38)" />
      <rect x="46" y="29" width="21" height="15" rx="6" fill="#2DD4BF" stroke={INK} strokeWidth="2.5" transform="rotate(5 56 36)" />
      <path d="M29 35 q4 -3 8 -2" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" fill="none" />
      <path d="M51 34 q4 -3 7 -1" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" fill="none" />
    </g>
  ),

  /** cricket bat — willow blade + spine, white-grip handle; red ball with seam */
  "cricket-bat": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="bat-willow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#E8C08F" /><stop offset="0.5" stopColor="#DDB073" /><stop offset="1" stopColor="#C69055" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="32" ry="5.5" fill="rgba(74,52,33,0.10)" />
      <g transform="rotate(-16 50 50)">
        <rect x="46" y="6" width="8" height="24" rx="3" fill="#F1EDE6" stroke={INK} strokeWidth="2.5" />
        <path d="M47 11 h6 M47 16 h6 M47 21 h6" stroke="#C9BCA4" strokeWidth="1.8" />
        <path d="M42 28 H58 V70 Q58 84 50 84 Q42 84 42 70 Z" fill="url(#bat-willow)" stroke={INK} strokeWidth="3" />
        <path d="M50 32 V76" stroke="#B98A55" strokeWidth="2" opacity="0.7" />
        <path d="M43 36 q7 3 14 0" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.35" fill="none" />
      </g>
      <circle cx="73" cy="77" r="8.5" fill="#DC2626" stroke={INK} strokeWidth="2.8" />
      <path d="M66.5 74 Q73 81 79.5 74" stroke="#FFF8EC" strokeWidth="1.6" fill="none" opacity="0.9" />
      <path d="M67.5 71.5 l-1.3 -2 M72 69.5 l-.4 -2.3 M78.5 71.5 l1.3 -2" stroke="#FFF8EC" strokeWidth="1.4" />
      <circle cx="69.5" cy="73.5" r="2.2" fill="#FFFFFF" opacity="0.35" />
    </g>
  ),

  /** fruit basket — woven tan basket with mango, banana, grapes & apple */
  "fruit-basket": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="fbs-weave" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DDA85F" /><stop offset="1" stopColor="#B98A55" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="34" ry="5" fill="rgba(74,52,33,0.10)" />
      <circle cx="34" cy="42" r="9.5" fill="#EF4444" stroke={INK} strokeWidth="2.5" />
      <path d="M34 34 q0 -5 4 -6" stroke="#8B5E3C" strokeWidth="2.5" fill="none" />
      <ellipse cx="51" cy="35" rx="11" ry="8.5" fill="#FBBF24" stroke={INK} strokeWidth="2.5" transform="rotate(-24 51 35)" />
      <path d="M36 24 q10 10 26 6 q2 6 -4 6 q-18 2 -24 -8 Z" fill="#FDE047" stroke={INK} strokeWidth="2.2" />
      {[62, 72, 65, 75, 68].map((x, i) => (
        <circle key={i} cx={x} cy={i < 2 ? 40 : i < 4 ? 48 : 55} r="5" fill={i % 2 ? "#7C3AED" : "#8B5CF6"} stroke={INK} strokeWidth="2" />
      ))}
      <path d="M19 50 H81 L74 80 Q73 85 67 85 H33 Q27 85 26 80 Z" fill="url(#fbs-weave)" stroke={INK} strokeWidth="3" />
      <path d="M22 58 H78 M25 67 H75 M29 76 H71" stroke="#8B5E3C" strokeWidth="2.5" opacity="0.75" />
      <path d="M32 52 q4 16 2 30 M50 52 v33 M68 52 q-4 16 -2 30" stroke="#8B5E3C" strokeWidth="2" opacity="0.5" fill="none" />
      <rect x="15" y="44" width="70" height="11" rx="5.5" fill="#C68B4E" stroke={INK} strokeWidth="3" />
      <path d="M20 49 h60" stroke="#E8CF9F" strokeWidth="2" opacity="0.6" />
    </g>
  ),

  /** soft glowing spot — layered amber radial fade + centre sparkle (click target) */
  "glow-spot": (
    <g>
      <defs>
        <radialGradient id="glw-fade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FDE047" stopOpacity="0.85" /><stop offset="0.55" stopColor="#FDE047" stopOpacity="0.35" /><stop offset="1" stopColor="#FDE047" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill="url(#glw-fade)" />
      <circle cx="50" cy="50" r="16.5" fill="#FDE047" opacity="0.5" />
      <circle cx="50" cy="50" r="12" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M50 30 l2.2 7.8 7.8 2.2 -7.8 2.2 -2.2 7.8 -2.2 -7.8 -7.8 -2.2 7.8 -2.2 Z" fill="#FFFDF7" stroke="#F59E0B" strokeWidth="1.2" />
    </g>
  ),

  /** soap bubble — translucent ring, pink inner tint, white gloss crescent */
  bubble: (
    <g strokeLinecap="round">
      <defs>
        <radialGradient id="bub-glass" cx="0.4" cy="0.32" r="0.85">
          <stop offset="0" stopColor="#F0F9FF" stopOpacity="0.9" /><stop offset="0.6" stopColor="#E0F2FE" stopOpacity="0.45" /><stop offset="1" stopColor="#BAE6FD" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="30" fill="url(#bub-glass)" stroke="#7DD3FC" strokeWidth="3" />
      <path d="M28 62 A26 26 0 0 0 50 78" stroke="#FBCFE8" strokeWidth="3" fill="none" opacity="0.75" />
      <path d="M32 42 q4 -12 16 -14" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.65" />
      <circle cx="62" cy="64" r="3" fill="#FFFFFF" opacity="0.6" />
      <circle cx="57" cy="70" r="1.8" fill="#FFFFFF" opacity="0.45" />
    </g>
  ),

  /** pocket calculator — dark body, LCD "12+34", 4×4 keys, amber column */
  calculator: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="cal-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#475569" /><stop offset="1" stopColor="#334155" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="91" rx="26" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <rect x="27" y="10" width="46" height="79" rx="8" fill="url(#cal-body)" stroke={INK} strokeWidth="3" />
      <rect x="32" y="16" width="36" height="17" rx="3" fill="#C6D2BC" stroke={INK} strokeWidth="2" />
      {/* "12+34" drawn as seven-segment strokes (no text nodes allowed) */}
      <path
        d="M41 20 v8.5 M43 20 h4.5 M47.5 20 v4 M43 24 h4.5 M43 24 v4 M43 28 h4.5 M51 22 v4.5 M49 24.2 h4 M55 20 h4.5 M59.5 20 v4 M55 24 h4.5 M59.5 24 v4 M55 28 h4.5 M61 20 v4 M61 24 h4.5 M65.5 20 v8.5"
        stroke="#3F5B45"
        strokeWidth="1.7"
        fill="none"
      />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={31.5 + c * 9} y={38.5 + r * 9} width="8" height="7" rx="2" fill={c === 3 ? (r === 3 ? "#F59E0B" : "#FBBF24") : "#E7E5E4"} stroke={INK} strokeWidth="1.4" />
        ))
      )}
      <circle cx="50" cy="79.5" r="2.2" fill="#F59E0B" />
    </g>
  ),

  /** ATM — blue-grey cabinet, dark screen, keypad, card slot with card, roof light */
  atm: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="atm-cab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="30" ry="4.5" fill="rgba(74,52,33,0.10)" />
      {/* bank canopy — clear ATM identity */}
      <path d="M18 10 h64 l-5 -7 H23 Z" fill="#1E3A8A" stroke={INK} strokeWidth="2.4" />
      <rect x="14" y="9" width="72" height="7" rx="3" fill="#F8FAFC" stroke={INK} strokeWidth="2.2" />
      <circle cx="50" cy="12.5" r="1.8" fill="#22C55E" />
      {/* cabinet */}
      <rect x="24" y="16" width="52" height="76" rx="7" fill="url(#atm-cab)" stroke={INK} strokeWidth="3" />
      {/* big blue screen with clear UI */}
      <rect x="30" y="22" width="40" height="22" rx="3" fill="#0F172A" stroke={INK} strokeWidth="2.5" />
      <rect x="33" y="25" width="34" height="9" rx="2" fill="#38BDF8" opacity="0.9" />
      <path d="M35 30 h22 M35 33.5 h14" stroke="#E0F2FE" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="33" y="36.5" width="16" height="5" rx="2" fill="#22C55E" />
      <rect x="51" y="36.5" width="16" height="5" rx="2" fill="#FDE047" />
      {/* keypad */}
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={36 + c * 9.6} y={48 + r * 7.6} width="7.6" height="5.8" rx="1.6" fill="#E7E5E4" stroke={INK} strokeWidth="1.2" />
        ))
      )}
      {/* CARD SLOT with card sticking out — the giveaway feature */}
      <rect x="30" y="73" width="30" height="8" rx="2" fill="#1E293B" stroke={INK} strokeWidth="2" />
      <g transform="rotate(-8 45 71)">
        <rect x="36" y="66.5" width="24" height="15" rx="2.5" fill="#FCD34D" stroke={INK} strokeWidth="2" />
        <path d="M40 72 h12 M40 76 h8" stroke="#B45309" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="38" y="70" width="5" height="4" rx="1" fill="#F59E0B" stroke={INK} strokeWidth="0.9" />
      </g>
      {/* cash dispensing slot */}
      <rect x="63" y="74" width="13" height="5.5" rx="1.5" fill="#0F172A" stroke={INK} strokeWidth="1.8" />
      <rect x="65" y="71.5" width="9" height="3.5" rx="1" fill="#22C55E" stroke={INK} strokeWidth="1" />
    </g>
  ),

  /** wristwatch — bezel, 12 ticks, hands at 10:10, leather straps with holes */
  watch: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="wat-bezel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E2E8F0" /><stop offset="1" stopColor="#94A3B8" /></linearGradient>
      </defs>
      <rect x="41" y="6" width="18" height="20" rx="5" fill="#B45309" stroke={INK} strokeWidth="2.8" />
      <rect x="41" y="74" width="18" height="20" rx="5" fill="#B45309" stroke={INK} strokeWidth="2.8" />
      <circle cx="50" cy="13" r="1.6" fill="#78350F" /><circle cx="50" cy="19" r="1.6" fill="#78350F" />
      <rect x="44" y="79" width="12" height="7" rx="2" fill="#94A3B8" stroke={INK} strokeWidth="2" />
      <rect x="77" y="46.5" width="5" height="7" rx="2" fill="#94A3B8" stroke={INK} strokeWidth="1.8" />
      <circle cx="50" cy="50" r="27" fill="url(#wat-bezel)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="50" r="22" fill="#FFFDF7" stroke="#94A3B8" strokeWidth="2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        const r1 = i % 3 === 0 ? 16.5 : 18.5;
        return <line key={i} x1={50 + r1 * Math.sin(a)} y1={50 - r1 * Math.cos(a)} x2={50 + 20.5 * Math.sin(a)} y2={50 - 20.5 * Math.cos(a)} stroke={INK} strokeWidth={i % 3 === 0 ? 2.4 : 1.4} />;
      })}
      <path d="M50 50 L40.9 44.7" stroke={INK} strokeWidth="3.5" />
      <path d="M50 50 L63 42.5" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="50" r="2.6" fill={INK} />
    </g>
  ),

  /** cozy village house — mud-brick walls, thatch roof, warm door, shutters, chimney puff */
  home: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="hom-thatch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DAA85F" /><stop offset="1" stopColor="#B87F42" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="34" ry="5" fill="rgba(74,52,33,0.10)" />
      <rect x="66" y="24" width="9" height="16" rx="1.5" fill="#A16207" stroke={INK} strokeWidth="2.5" />
      <circle cx="72" cy="18" r="4.5" fill="#FFFFFF" opacity="0.9" /><circle cx="77" cy="12" r="3.5" fill="#FFFFFF" opacity="0.8" />
      <rect x="25" y="50" width="50" height="36" rx="2" fill="#EDD9A3" stroke={INK} strokeWidth="3" />
      <path d="M25 62 h50 M25 74 h50 M39 50 v12 M53 62 v12 M39 74 v12" stroke="#D9C49A" strokeWidth="2" opacity="0.9" />
      <path d="M14 52 L50 20 L86 52 Z" fill="url(#hom-thatch)" stroke={INK} strokeWidth="3.5" />
      <path d="M24 46 L50 24 L76 46" stroke="#8B5E3C" strokeWidth="2" opacity="0.55" fill="none" />
      <path d="M20 48 l4 -4 M28 42 l4 -4 M64 38 l4 4 M72 44 l4 4" stroke="#8B5E3C" strokeWidth="2" opacity="0.4" />
      <rect x="43" y="62" width="14" height="24" rx="2" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      <path d="M50 62 v24" stroke="#6B3F22" strokeWidth="1.6" opacity="0.7" />
      <circle cx="46" cy="74" r="1.8" fill="#FDE047" />
      <rect x="29" y="58" width="13" height="12" rx="1.5" fill="#BFE8F5" stroke={INK} strokeWidth="2.2" />
      <path d="M35.5 58 v12" stroke={INK} strokeWidth="1.8" />
    </g>
  ),

  /* ================================ STANDARD SET ================================ */

  /** banana — yellow crescent with brown tips */
  banana: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="ban-peel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FDE96B" /><stop offset="1" stopColor="#FACC15" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M24 34 q4 30 34 36 q14 3 20 -4 q-2 2 -6 2 Q36 64 31 34 Z" fill="url(#ban-peel)" stroke={INK} strokeWidth="3" />
      <path d="M30 42 q6 18 26 24" stroke="#EAB308" strokeWidth="2" opacity="0.6" fill="none" />
      <path d="M24 34 l-3 -5 M78 66 l4 3" stroke="#8B5E3C" strokeWidth="4" />
      <path d="M27 25 q-2 -5 2 -8" stroke="#8B5E3C" strokeWidth="3" fill="none" />
    </g>
  ),

  /** grapes — purple cluster of 9 berries + leaf */
  grapes: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="22" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M50 34 q0 -10 9 -13" stroke="#8B5E3C" strokeWidth="3.5" fill="none" />
      <path d="M54 20 q12 -5 15 5 q-10 6 -15 -5 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      {[[36, 42], [50, 40], [64, 42], [43, 53], [57, 53], [36, 64], [50, 66], [64, 64], [50, 78]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill={i % 2 ? "#7C3AED" : "#8B5CF6"} stroke={INK} strokeWidth="2.4" />
      ))}
      <circle cx="46" cy="38" r="2.5" fill="#FFFFFF" opacity="0.5" /><circle cx="33" cy="60" r="2" fill="#FFFFFF" opacity="0.4" />
    </g>
  ),

  /** watermelon — half slice: red flesh, white rind, green skin, 3 seeds */
  watermelon: (
    <g strokeLinejoin="round">
      <ellipse cx="50" cy="90" rx="28" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M17 62 a33 33 0 0 1 66 0 Z" fill="#15803D" stroke={INK} strokeWidth="3" />
      <path d="M22 62 a28 28 0 0 1 56 0 Z" fill="#F0FDF4" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M26 62 a24 24 0 0 1 48 0 Z" fill="#F87171" />
      <path d="M26 62 a24 24 0 0 1 48 0" fill="none" stroke={INK} strokeWidth="2" opacity="0.4" />
      <ellipse cx="40" cy="54" rx="2.2" ry="3.6" fill="#4A3421" transform="rotate(14 40 54)" />
      <ellipse cx="50" cy="50" rx="2.2" ry="3.6" fill="#4A3421" />
      <ellipse cx="60" cy="54" rx="2.2" ry="3.6" fill="#4A3421" transform="rotate(-14 60 54)" />
    </g>
  ),

  /** chick — fluffy yellow chick, orange beak, stick legs */
  chick: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="22" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M40 80 v8 M58 80 v8" stroke="#F59E0B" strokeWidth="3.5" />
      <path d="M38 88 h5 M55 88 h5" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="56" r="24" fill="#FDE047" stroke={INK} strokeWidth="3" />
      <path d="M46 26 q0 -6 4 -8 M52 28 q2 -5 6 -5" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
      <circle cx="41" cy="50" r="3" fill={INK} /><circle cx="59" cy="50" r="3" fill={INK} />
      <circle cx="42" cy="49" r="1" fill="#FFF8EC" /><circle cx="60" cy="49" r="1" fill="#FFF8EC" />
      <path d="M46 58 l4 4 4 -4 Z" fill="#F59E0B" stroke={INK} strokeWidth="1.8" />
      <path d="M30 58 q-8 0 -10 -6 q8 -1 11 4 Z" fill="#FACC15" stroke={INK} strokeWidth="2" />
      <circle cx="34" cy="57" r="2.5" fill="#FDBA74" opacity="0.7" /><circle cx="66" cy="57" r="2.5" fill="#FDBA74" opacity="0.7" />
    </g>
  ),

  /** hen — brown hen with white neck, comb, beak, wing detail */
  hen: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="28" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M42 80 v8 M56 80 v8" stroke="#F59E0B" strokeWidth="3.5" />
      <path d="M40 88 h5 M54 88 h5" stroke={INK} strokeWidth="3" />
      <path d="M24 46 q-12 -8 -8 -20 q8 2 10 12 q2 -10 10 -12 q4 12 -6 22 Z" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="47" cy="58" rx="26" ry="18" fill="#C0773F" stroke={INK} strokeWidth="3" />
      <ellipse cx="44" cy="66" rx="11" ry="9" fill="#F5EAD3" opacity="0.9" />
      <path d="M36 54 q12 -6 22 2 q-2 10 -12 10 q-9 0 -10 -12 Z" fill="#A15F2E" stroke={INK} strokeWidth="2.2" />
      <path d="M40 58 q6 -2 12 1 M41 63 q5 -2 10 1" stroke="#8B5E3C" strokeWidth="1.8" fill="none" />
      <path d="M60 56 q2 -16 12 -20 l4 8 q-8 3 -9 14 Z" fill="#F5EAD3" stroke={INK} strokeWidth="2.5" />
      <circle cx="74" cy="36" r="11" fill="#F5EAD3" stroke={INK} strokeWidth="2.8" />
      <path d="M68 27 q0 -7 5 -7 q1 5 -1 8 Z M74 25 q2 -7 7 -5 q-1 5 -5 7 Z" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
      <path d="M84 36 l8 3 -8 3 Z" fill="#F59E0B" stroke={INK} strokeWidth="1.8" />
      <path d="M80 44 q3 6 -2 8 q-3 -4 0 -8 Z" fill="#EF4444" stroke={INK} strokeWidth="1.6" />
      <circle cx="77" cy="34" r="2.4" fill={INK} />
    </g>
  ),

  /** bud — green stem with closed teardrop bud */
  bud: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="14" ry="4" fill="rgba(74,52,33,0.10)" />
      <path d="M50 88 V54" stroke="#16A34A" strokeWidth="4" />
      <path d="M50 74 Q40 72 36 64 Q46 62 50 74 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <path d="M50 20 q13 11 11 27 q-2 15 -11 15 q-9 0 -11 -15 q-2 -16 11 -27 Z" fill="#A7F3D0" stroke={INK} strokeWidth="3" />
      <path d="M50 22 q-6 18 0 38 M50 22 q6 18 0 38" stroke="#16A34A" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M50 58 q-8 2 -9 10 q7 -1 9 -6 Z M50 58 q8 2 9 10 q-7 -1 -9 -6 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
    </g>
  ),

  /** bloom — open pink tulip-like bloom on stem */
  bloom: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="14" ry="4" fill="rgba(74,52,33,0.10)" />
      <path d="M50 88 V54" stroke="#16A34A" strokeWidth="4" />
      <path d="M50 78 Q62 76 66 66 Q54 64 50 78 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <path d="M33 34 q-2 20 17 28 q19 -8 17 -28 q-9 12 -17 8 q-8 4 -17 -8 Z" fill="#F472B6" stroke={INK} strokeWidth="3" />
      <path d="M43 32 q-4 12 7 20 q11 -8 7 -20 q-7 8 -14 0 Z" fill="#F9A8D4" stroke={INK} strokeWidth="2.5" />
      <path d="M33 34 q4 -10 8 -8 M67 34 q-4 -10 -8 -8" stroke={INK} strokeWidth="2.5" fill="none" />
    </g>
  ),

  /** frog — green sitting frog, big top eyes, lighter belly */
  frog: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="28" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M28 70 q-9 4 -8 13" stroke={INK} strokeWidth="9.5" fill="none" />
      <path d="M28 70 q-9 4 -8 13" stroke="#4ADE80" strokeWidth="5.5" fill="none" />
      <path d="M72 70 q9 4 8 13" stroke={INK} strokeWidth="9.5" fill="none" />
      <path d="M72 70 q9 4 8 13" stroke="#4ADE80" strokeWidth="5.5" fill="none" />
      <path d="M16 83 h8 M76 83 h8" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="50" cy="62" rx="26" ry="19" fill="#4ADE80" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="69" rx="16" ry="10" fill="#BBF7D0" opacity="0.9" />
      <circle cx="37" cy="42" r="10" fill="#4ADE80" stroke={INK} strokeWidth="2.8" />
      <circle cx="63" cy="42" r="10" fill="#4ADE80" stroke={INK} strokeWidth="2.8" />
      <circle cx="37" cy="42" r="5.5" fill="#FFFDF7" stroke={INK} strokeWidth="1.6" />
      <circle cx="63" cy="42" r="5.5" fill="#FFFDF7" stroke={INK} strokeWidth="1.6" />
      <circle cx="38" cy="43" r="2.6" fill={INK} /><circle cx="62" cy="43" r="2.6" fill={INK} />
      <path d="M38 62 q12 9 24 0" stroke={INK} strokeWidth="2.5" fill="none" />
      <circle cx="45" cy="56" r="1.2" fill={INK} /><circle cx="55" cy="56" r="1.2" fill={INK} />
    </g>
  ),

  /** stone — grey river stone with facet lines + moss */
  stone: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="stn-rock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E7E5E4" /><stop offset="1" stopColor="#A8A29E" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M22 68 q-3 -20 15 -25 q5 -13 22 -9 q19 2 17 20 q3 15 -13 18 H34 q-10 0 -12 -4 Z" fill="url(#stn-rock)" stroke={INK} strokeWidth="3" />
      <path d="M34 48 q8 -4 14 2 M52 66 q10 -3 16 2" stroke="#9CA3AF" strokeWidth="2.2" fill="none" opacity="0.8" />
      <ellipse cx="33" cy="68" rx="6" ry="3.5" fill="#4ADE80" opacity="0.75" />
      <ellipse cx="68" cy="64" rx="4" ry="2.5" fill="#4ADE80" opacity="0.55" />
    </g>
  ),

  /** amrood — guava with leaf + cut half showing pink flesh & seeds */
  amrood: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="amr-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E4FBB0" /><stop offset="1" stopColor="#A3D977" /></linearGradient>
      </defs>
      <ellipse cx="46" cy="88" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M38 33 q-1 -7 6 -9" stroke="#8B5E3C" strokeWidth="3" fill="none" />
      <path d="M44 24 q11 -6 15 3 q-9 7 -15 -3 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <circle cx="38" cy="58" r="23" fill="url(#amr-body)" stroke={INK} strokeWidth="3" />
      <ellipse cx="30" cy="50" rx="6.5" ry="9" fill="#FFFFFF" opacity="0.45" transform="rotate(-20 30 50)" />
      <circle cx="77" cy="63" r="15" fill="url(#amr-body)" stroke={INK} strokeWidth="2.8" />
      <circle cx="77" cy="63" r="10.5" fill="#FB9DB2" stroke="#E11D48" strokeWidth="1.5" />
      <circle cx="73" cy="60" r="1.6" fill="#FFF8EC" /><circle cx="81" cy="60" r="1.6" fill="#FFF8EC" /><circle cx="77" cy="65" r="1.6" fill="#FFF8EC" />
      <circle cx="73.5" cy="66.5" r="1.4" fill="#FFF8EC" /><circle cx="80.5" cy="66.5" r="1.4" fill="#FFF8EC" />
    </g>
  ),

  /** ball — white ball with red pentagons + seams */
  ball: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="88" rx="26" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <circle cx="50" cy="52" r="28" fill="#FFFDF7" stroke={INK} strokeWidth="3" />
      <path d="M50 42.5 l8.2 6 -3.1 9.6 h-10.2 l-3.1 -9.6 Z" fill="#DC2626" stroke={INK} strokeWidth="2.2" />
      <path d="M50 42.5 L50 26 M58.2 48.5 L74 42 M55.1 58.1 L66 71 M44.9 58.1 L34 71 M41.8 48.5 L26 42" stroke={INK} strokeWidth="2.2" fill="none" />
      <path d="M70 33 q6 -3 10 2 l-8 5 Z" fill="#DC2626" stroke={INK} strokeWidth="2" />
      <path d="M30 33 q-6 -3 -10 2 l8 5 Z" fill="#DC2626" stroke={INK} strokeWidth="2" />
      <path d="M70 66 q7 2 6 8 l-9 -2 Z" fill="#DC2626" stroke={INK} strokeWidth="2" />
      <path d="M30 66 q-7 2 -6 8 l9 -2 Z" fill="#DC2626" stroke={INK} strokeWidth="2" />
      <path d="M36 38 q3 -8 11 -10" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" fill="none" />
    </g>
  ),

  /** dhol — barrel drum with X-lacing, two heads, small beater */
  dhol: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="dho-shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#D8A05C" /><stop offset="1" stopColor="#B0803F" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M25 40 q-4 16 0 30 q2 10 25 10 q23 0 25 -10 q4 -14 0 -30 Z" fill="url(#dho-shell)" stroke={INK} strokeWidth="3" />
      <path d="M31 44 L69 74 M69 44 L31 74 M40 42 L60 76 M60 42 L40 76" stroke="#B45309" strokeWidth="2.4" opacity="0.85" />
      <path d="M25 80 a25 8 0 0 0 50 0" fill="#E0CFA8" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="50" cy="40" rx="25" ry="10" fill="#F5EAD3" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="40" rx="17" ry="6" fill="#FFFDF7" stroke="#D9C49A" strokeWidth="1.5" />
      <path d="M80 26 L88 46" stroke="#8B5E3C" strokeWidth="4" />
      <circle cx="79" cy="24" r="4.5" fill="#A16207" stroke={INK} strokeWidth="2" />
    </g>
  ),

  /** fish — orange fish with tail fin, eye, gill arc, 3 bubbles */
  fish: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="fis-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FDBA74" /><stop offset="1" stopColor="#F97316" /></linearGradient>
      </defs>
      <circle cx="80" cy="34" r="4" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.8" />
      <circle cx="86" cy="24" r="2.8" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
      <circle cx="76" cy="18" r="2.2" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.3" />
      <path d="M62 56 l17 -12 q-3 12 0 24 Z" fill="#FB923C" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="42" cy="56" rx="23" ry="15" fill="url(#fis-body)" stroke={INK} strokeWidth="3" />
      <path d="M34 41 q5 -11 15 -8 q-4 7 -3 10 Z" fill="#FB923C" stroke={INK} strokeWidth="2.2" />
      <path d="M40 62 q10 -2 12 6 q-9 4 -12 -6 Z" fill="#FDBA74" stroke={INK} strokeWidth="2" />
      <path d="M31 47 q7 9 0 18" stroke={INK} strokeWidth="2.2" fill="none" />
      <circle cx="30" cy="51" r="3.8" fill="#FFFDF7" stroke={INK} strokeWidth="1.6" />
      <circle cx="30.8" cy="51.6" r="1.9" fill={INK} />
      <path d="M22 60 q3 2.5 6 1" stroke={INK} strokeWidth="1.8" fill="none" />
      <path d="M42 52 q4 -4 8 0 M46 60 q4 -4 8 0" stroke="#C2410C" strokeWidth="1.6" fill="none" opacity="0.6" />
    </g>
  ),

  /** haathi — friendly elephant: grey-blue, big ear, curled trunk, white tusk */
  haathi: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="34" ry="5" fill="rgba(74,52,33,0.10)" />
      <rect x="28" y="68" width="9" height="18" rx="4" fill="#9AA8BC" stroke={INK} strokeWidth="2.5" />
      <rect x="42" y="70" width="9" height="16" rx="4" fill="#9AA8BC" stroke={INK} strokeWidth="2.5" />
      <rect x="56" y="70" width="9" height="16" rx="4" fill="#9AA8BC" stroke={INK} strokeWidth="2.5" />
      <path d="M17 56 q-6 6 -3 13" stroke={INK} strokeWidth="6" fill="none" />
      <path d="M17 56 q-6 6 -3 13" stroke="#A5B3C7" strokeWidth="3" fill="none" />
      <ellipse cx="46" cy="58" rx="30" ry="20" fill="#A5B3C7" stroke={INK} strokeWidth="3" />
      <path d="M60 36 q-14 -6 -18 6 q-2 10 8 14 q8 3 12 -4 Z" fill="#8E9DB3" stroke={INK} strokeWidth="2.5" />
      <circle cx="72" cy="44" r="15" fill="#A5B3C7" stroke={INK} strokeWidth="3" />
      <path d="M78 44 q13 3 11 16 q-1.5 10 -9 10" fill="none" stroke={INK} strokeWidth="10" />
      <path d="M78 44 q13 3 11 16 q-1.5 10 -9 10" fill="none" stroke="#A5B3C7" strokeWidth="5.5" />
      <path d="M72 56 q6 7 12 5" fill="none" stroke={INK} strokeWidth="5.5" />
      <path d="M72 56 q6 7 12 5" fill="none" stroke="#FFFDF7" strokeWidth="2.8" />
      <path d="M72 38 q3.5 -4 7 0" stroke={INK} strokeWidth="2.4" fill="none" />
    </g>
  ),

  /** icecream — soft-serve swirl in a waffle cone with cherry */
  icecream: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="icr-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EEB277" /><stop offset="1" stopColor="#C98A4B" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="18" ry="4" fill="rgba(74,52,33,0.10)" />
      <path d="M35 44 L50 88 L65 44 Z" fill="url(#icr-cone)" stroke={INK} strokeWidth="3" />
      <path d="M37 49 L61 43 M39 57 L59 51 M42 65 L57 59 M46 73 L54 68" stroke="#B87A3E" strokeWidth="1.8" opacity="0.8" />
      <path d="M39 43 L61 49 M41 51 L59 57 M44 59 L57 65 M48 67 L54 73" stroke="#B87A3E" strokeWidth="1.8" opacity="0.8" />
      <ellipse cx="50" cy="40" rx="15.5" ry="9" fill="#FFF4DE" stroke={INK} strokeWidth="2.8" />
      <ellipse cx="50" cy="31" rx="12" ry="7.5" fill="#FFF4DE" stroke={INK} strokeWidth="2.8" />
      <ellipse cx="50" cy="23.5" rx="8.5" ry="6.5" fill="#FFF4DE" stroke={INK} strokeWidth="2.8" />
      <path d="M50 17 q4.5 -6.5 9.5 -3 q-3 4.5 -8 4 Z" fill="#FFF4DE" stroke={INK} strokeWidth="2.5" />
      <circle cx="55" cy="12" r="4" fill="#EF4444" stroke={INK} strokeWidth="2" />
      <path d="M55 8 q1 -3 4 -4" stroke="#16A34A" strokeWidth="2" fill="none" />
    </g>
  ),

  /** jahaz — little boat with sails on water */
  jahaz: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M10 78 q8 -5 16 0 t16 0 t16 0 t16 0 t16 0" stroke="#7DD3FC" strokeWidth="3.5" fill="none" />
      <path d="M22 88 q8 -5 16 0 t16 0 t16 0 t16 0" stroke="#BAE6FD" strokeWidth="3" fill="none" />
      <path d="M50 18 V62" stroke="#8B5E3C" strokeWidth="3.5" />
      <path d="M50 22 q22 3 22 24 H50 Z" fill="#FDE047" stroke={INK} strokeWidth="2.5" />
      <path d="M50 28 q-15 3 -15 18 H50 Z" fill="#FB923C" stroke={INK} strokeWidth="2.5" />
      <path d="M50 18 l9 3.5 -9 3.5 Z" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
      <path d="M16 62 q3 11 14 11 h36 q11 0 14 -11 Z" fill="#B0803F" stroke={INK} strokeWidth="3" />
      <path d="M20 66 h56" stroke="#8B5E3C" strokeWidth="2.5" opacity="0.7" />
      <circle cx="50" cy="69" r="2.5" fill="#FDE047" stroke={INK} strokeWidth="1.5" />
    </g>
  ),

  /** laddu — orange round laddu with boondi dots, silver vark + leaf */
  laddu: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="lad-sweet" cx="0.38" cy="0.32" r="0.95"><stop offset="0" stopColor="#FCD34D" /><stop offset="1" stopColor="#F59E0B" /></radialGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <circle cx="50" cy="56" r="27" fill="url(#lad-sweet)" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="46" r="2" fill="#D97706" opacity="0.75" /><circle cx="50" cy="40" r="2" fill="#D97706" opacity="0.75" />
      <circle cx="62" cy="46" r="2" fill="#D97706" opacity="0.75" /><circle cx="33" cy="58" r="2" fill="#D97706" opacity="0.75" />
      <circle cx="67" cy="58" r="2" fill="#D97706" opacity="0.75" /><circle cx="44" cy="68" r="2" fill="#D97706" opacity="0.75" />
      <circle cx="57" cy="67" r="2" fill="#D97706" opacity="0.75" /><circle cx="50" cy="54" r="2" fill="#D97706" opacity="0.75" />
      <circle cx="39" cy="35" r="2" fill="#D97706" opacity="0.75" /><circle cx="62" cy="35" r="2" fill="#D97706" opacity="0.75" />
      <path d="M42 33 l8 -3 2 6 -8 3 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M56 44 l8 -2 1.5 6 -8 2 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M68 32 q10 -8 17 -2 q-7 9 -17 2 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <path d="M35 44 q3 -9 11 -12" stroke="#FFFFFF" strokeWidth="3.5" opacity="0.5" fill="none" />
    </g>
  ),

  /** naariyal — coconut with 3 dots + husk lines, half-shell with white flesh */
  naariyal: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="naa-husk" cx="0.4" cy="0.32" r="0.95"><stop offset="0" stopColor="#A8764C" /><stop offset="1" stopColor="#7A4A26" /></radialGradient>
      </defs>
      <ellipse cx="46" cy="90" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      <circle cx="38" cy="58" r="24" fill="url(#naa-husk)" stroke={INK} strokeWidth="3" />
      <path d="M22 48 q16 -7 32 0 M18 60 q20 -7 40 0 M22 72 q16 5 32 -2" stroke="#5C381D" strokeWidth="2.2" fill="none" opacity="0.75" />
      <circle cx="30" cy="50" r="2.6" fill={INK} /><circle cx="44" cy="47" r="2.6" fill={INK} /><circle cx="37" cy="58" r="2.6" fill={INK} />
      <path d="M33 38 q1 -8 8 -10" stroke="#16A34A" strokeWidth="3" fill="none" />
      <path d="M41 28 q10 -7 16 1 q-8 8 -16 -1 Z" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <circle cx="77" cy="66" r="14" fill="#8B5E3C" stroke={INK} strokeWidth="2.8" />
      <circle cx="77" cy="66" r="10" fill="#FFF8EC" />
      <circle cx="77" cy="66" r="4.5" fill="#D9A05B" />
    </g>
  ),

  /** orange — dimpled rind, leaf, highlight */
  orange: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="org-rind" cx="0.38" cy="0.3" r="0.95"><stop offset="0" stopColor="#FDBA74" /><stop offset="1" stopColor="#F97316" /></radialGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M50 32 q1 -8 8 -11" stroke="#8B5E3C" strokeWidth="3" fill="none" />
      <path d="M57 22 q12 -6 16 4 q-10 7 -16 -4 Z" fill="#22C55E" stroke={INK} strokeWidth="2.2" />
      <circle cx="50" cy="60" r="26" fill="url(#org-rind)" stroke={INK} strokeWidth="3" />
      <circle cx="42" cy="54" r="1.2" fill="#C2410C" opacity="0.6" /><circle cx="52" cy="50" r="1.2" fill="#C2410C" opacity="0.6" />
      <circle cx="60" cy="58" r="1.2" fill="#C2410C" opacity="0.6" /><circle cx="44" cy="66" r="1.2" fill="#C2410C" opacity="0.6" />
      <circle cx="56" cy="70" r="1.2" fill="#C2410C" opacity="0.6" /><circle cx="34" cy="62" r="1.2" fill="#C2410C" opacity="0.6" />
      <circle cx="66" cy="68" r="1.2" fill="#C2410C" opacity="0.6" /><circle cx="49" cy="60" r="1.2" fill="#C2410C" opacity="0.6" />
      <ellipse cx="40" cy="50" rx="5.5" ry="8" fill="#FFFFFF" opacity="0.4" transform="rotate(20 40 50)" />
    </g>
  ),

  /** poster — rolled poster with swirl ends, ribbon band, tiny picture */
  poster: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="52" cy="90" rx="26" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <rect x="37" y="8" width="26" height="26" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="2.2" />
      <circle cx="45" cy="16" r="3" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M37 30 q6 -8 12 -2 q4 -5 14 -3 v9 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.2" />
      <rect x="32" y="28" width="36" height="58" rx="8" fill="#F6EFE0" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="30" rx="18" ry="6.5" fill="#EDE2CC" stroke={INK} strokeWidth="2.5" />
      <path d="M42 30 a8 4.5 0 0 1 16 0 a8 4.5 0 0 1 -16 0" fill="none" stroke="#C9BCA4" strokeWidth="1.6" />
      <rect x="32" y="52" width="36" height="9" fill="#EC4899" stroke={INK} strokeWidth="2" />
      <path d="M38 52 v9 M62 52 v9" stroke="#BE185D" strokeWidth="1.5" opacity="0.7" />
      <path d="M36 83 a14 5 0 0 0 28 0" fill="none" stroke="#C9BCA4" strokeWidth="1.6" />
    </g>
  ),

  /** qalam — traditional reed pen with cut nib + ink drop */
  qalam: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="qlm-reed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EAD3A0" /><stop offset="1" stopColor="#CBA76B" /></linearGradient>
      </defs>
      <ellipse cx="42" cy="90" rx="26" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M30 78 L37 57 L64 22 q5.5 -6.5 11 -2 q6 4.5 0.5 11 L48 66 Z" fill="url(#qlm-reed)" stroke={INK} strokeWidth="3" />
      <path d="M30 78 l7 -21 11 9 Z" fill="#B98A55" stroke={INK} strokeWidth="2" />
      <path d="M34 74 l6 -5" stroke={INK} strokeWidth="1.6" />
      <path d="M29 79 q-3 3 0 6 q3 -3 0 -6 Z" fill="#3B2F2F" stroke={INK} strokeWidth="1.5" />
      <path d="M18 72 q5 7 0 12 q-5 -5 0 -12 Z" fill="#3B2F2F" stroke={INK} strokeWidth="1.8" />
    </g>
  ),

  /** rickshaw — green auto-rickshaw, yellow canopy, 3 wheels, decorated trim */
  rickshaw: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="rks-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34D399" /><stop offset="1" stopColor="#059669" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="36" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M22 38 q4 -14 26 -14 q22 0 26 14 Z" fill="#FDE047" stroke={INK} strokeWidth="3" />
      <path d="M24 38 h52" stroke="#B45309" strokeWidth="2" opacity="0.6" />
      <path d="M24 38 H72 Q76 52 74 62 Q73 68 66 68 H30 Q24 68 24 60 Z" fill="url(#rks-body)" stroke={INK} strokeWidth="3" />
      <path d="M58 40 q10 2 12 12 l-12 2 Z" fill="#BFE8F5" stroke={INK} strokeWidth="2" />
      <rect x="30" y="44" width="18" height="14" rx="2" fill="#BFE8F5" stroke={INK} strokeWidth="2" />
      <path d="M39 44 v14" stroke={INK} strokeWidth="1.5" />
      <path d="M26 62 q6 -4 12 0 q6 4 12 0 q6 -4 12 0 q6 4 12 0" stroke="#FDE047" strokeWidth="2.2" fill="none" />
      <circle cx="72" cy="58" r="3" fill="#FDE047" stroke={INK} strokeWidth="1.5" />
      <circle cx="15" cy="60" r="3.5" fill="#E7E5E4" opacity="0.8" />
      <circle cx="34" cy="72" r="9" fill="#334155" stroke={INK} strokeWidth="2.8" />
      <circle cx="34" cy="72" r="3.5" fill="#E7E5E4" />
      <circle cx="70" cy="72" r="7" fill="#334155" stroke={INK} strokeWidth="2.8" />
      <circle cx="70" cy="72" r="2.8" fill="#E7E5E4" />
    </g>
  ),

  /** train — toy steam locomotive with chimney puff, 4 wheels, cowcatcher */
  train: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="88" rx="36" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <circle cx="26" cy="22" r="5.5" fill="#FFFFFF" stroke="#D6CDBB" strokeWidth="1.8" opacity="0.95" />
      <circle cx="34" cy="13" r="4.2" fill="#FFFFFF" stroke="#D6CDBB" strokeWidth="1.6" opacity="0.9" />
      <circle cx="20" cy="12" r="3.6" fill="#FFFFFF" stroke="#D6CDBB" strokeWidth="1.5" opacity="0.85" />
      <rect x="22" y="26" width="9" height="14" rx="2" fill="#475569" stroke={INK} strokeWidth="2.5" />
      <rect x="54" y="30" width="22" height="36" rx="4" fill="#DC2626" stroke={INK} strokeWidth="3" />
      <rect x="59" y="36" width="12" height="12" rx="2" fill="#BFE8F5" stroke={INK} strokeWidth="2" />
      <rect x="16" y="40" width="42" height="26" rx="5" fill="#EF4444" stroke={INK} strokeWidth="3" />
      <circle cx="30" cy="50" r="3.5" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
      <path d="M10 66 L20 60 V70 H10 Z" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <circle cx="30" cy="72" r="7" fill="#475569" stroke={INK} strokeWidth="2.8" />
      <circle cx="46" cy="72" r="7" fill="#475569" stroke={INK} strokeWidth="2.8" />
      <circle cx="65" cy="72" r="8" fill="#475569" stroke={INK} strokeWidth="2.8" />
      <circle cx="30" cy="72" r="2.6" fill="#E7E5E4" /><circle cx="46" cy="72" r="2.6" fill="#E7E5E4" /><circle cx="65" cy="72" r="3" fill="#E7E5E4" />
      <path d="M30 72 H65" stroke={INK} strokeWidth="2" opacity="0.6" />
    </g>
  ),

  /** umbrella — alternating amber/white panels, curved handle with crook */
  umbrella: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="umb-amber" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FCD34D" /><stop offset="1" stopColor="#F59E0B" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="24" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M50 18 C36 18 21 30 18 48 q8 -8 16 0 q8 -8 16 0 q8 -8 16 0 q8 -8 16 0 C79 30 64 18 50 18 Z" fill="#FFFDF7" stroke={INK} strokeWidth="3" />
      <path d="M50 19 L34 48 q8 -8 16 0 Z" fill="url(#umb-amber)" stroke={INK} strokeWidth="2.2" />
      <path d="M50 19 L66 48 q-8 -8 -16 0 Z" fill="url(#umb-amber)" stroke={INK} strokeWidth="2.2" />
      <path d="M50 21 L18 47 M50 21 L82 47" stroke={INK} strokeWidth="1.6" opacity="0.5" />
      <path d="M50 18 V72 M50 72 q0 12 -10 12 q-8 0 -8 -8" stroke={INK} strokeWidth="3.2" fill="none" />
      <circle cx="50" cy="17" r="2.5" fill="#F59E0B" stroke={INK} strokeWidth="1.8" />
    </g>
  ),

  /** van — white delivery van with logo dot + hubcaps */
  van: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="van-white" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#E2E8F0" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="36" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M14 42 q0 -8 9 -8 h26 q8 0 13 7 l9 12 q3 4 3 9 v8 q0 6 -6 6 H20 q-6 0 -6 -6 Z" fill="url(#van-white)" stroke={INK} strokeWidth="3" />
      <path d="M60 36 q6 1 9 6 l6 8 h-15 Z" fill="#BFE8F5" stroke={INK} strokeWidth="2" />
      <rect x="21" y="40" width="14" height="12" rx="2" fill="#BFE8F5" stroke={INK} strokeWidth="2" />
      <path d="M42 40 V64" stroke={INK} strokeWidth="2" />
      <path d="M44 52 h5" stroke={INK} strokeWidth="2.5" />
      <circle cx="31" cy="62" r="5" fill="#38BDF8" stroke={INK} strokeWidth="2" />
      <path d="M15 57 H72" stroke="#FBBF24" strokeWidth="3" />
      <circle cx="31" cy="72" r="8.5" fill="#334155" stroke={INK} strokeWidth="2.8" />
      <circle cx="31" cy="72" r="3.5" fill="#E7E5E4" />
      <circle cx="68" cy="72" r="8.5" fill="#334155" stroke={INK} strokeWidth="2.8" />
      <circle cx="68" cy="72" r="3.5" fill="#E7E5E4" />
    </g>
  ),

  /** xylophone — 5 rainbow bars on a frame, 2 crossed mallets */
  xylophone: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="34" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M17 12 L36 78" stroke="#8B5E3C" strokeWidth="5" />
      <path d="M83 12 L64 78" stroke="#8B5E3C" strokeWidth="5" />
      <rect x="18" y="13" width="64" height="10" rx="5" fill="#EF4444" stroke={INK} strokeWidth="2.4" />
      <rect x="22" y="26" width="56" height="10" rx="5" fill="#F59E0B" stroke={INK} strokeWidth="2.4" />
      <rect x="26" y="39" width="48" height="10" rx="5" fill="#FDE047" stroke={INK} strokeWidth="2.4" />
      <rect x="30" y="52" width="40" height="10" rx="5" fill="#22C55E" stroke={INK} strokeWidth="2.4" />
      <rect x="34" y="65" width="32" height="10" rx="5" fill="#3B82F6" stroke={INK} strokeWidth="2.4" />
      <path d="M70 36 L86 16 M76 12 L90 30" stroke="#B98A55" strokeWidth="3" />
      <circle cx="87" cy="15" r="4.2" fill="#FDE047" stroke={INK} strokeWidth="2" />
      <circle cx="91" cy="31" r="4.2" fill="#FDE047" stroke={INK} strokeWidth="2" />
    </g>
  ),

  /** yoyo — red discs, white side dots, string winding to a loop */
  yoyo: (
    <g strokeLinejoin="round" strokeLinecap="round" transform="rotate(-10 50 56)">
      <path d="M50 78 q-8 6 -5 12 q3 5 9 4" stroke="#0D9488" strokeWidth="2.5" fill="none" />
      <ellipse cx="57" cy="95" rx="5" ry="3.5" fill="none" stroke="#0D9488" strokeWidth="2.5" />
      <circle cx="50" cy="54" r="24" fill="#EF4444" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="54" r="9.5" fill="#FEF2F2" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="54" r="3" fill={INK} />
      <circle cx="50" cy="38" r="2" fill="#FFF8EC" /><circle cx="62" cy="47" r="2" fill="#FFF8EC" /><circle cx="62" cy="61" r="2" fill="#FFF8EC" />
      <circle cx="50" cy="70" r="2" fill="#FFF8EC" /><circle cx="38" cy="61" r="2" fill="#FFF8EC" /><circle cx="38" cy="47" r="2" fill="#FFF8EC" />
      <path d="M36 40 q2 -8 9 -11" stroke="#FFFFFF" strokeWidth="3" opacity="0.5" fill="none" />
    </g>
  ),

  /** zebra — head with black stripes, mane, muzzle, ears */
  zebra: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="52" cy="88" rx="30" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M36 30 l-8 -13 12 3 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.5" />
      <path d="M49 26 l-4 -14 11 5 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.5" />
      <path d="M37.5 27 l-4 -6.5 6 1.5 Z" fill="#F9A8D4" />
      <path d="M49.5 24 l-2 -7 5.5 2.5 Z" fill="#F9A8D4" />
      <ellipse cx="52" cy="44" rx="21" ry="17" fill="#FFFDF7" stroke={INK} strokeWidth="3" transform="rotate(18 52 44)" />
      <ellipse cx="67" cy="60" rx="11" ry="8.5" fill="#E7DCC8" stroke={INK} strokeWidth="2.5" transform="rotate(18 67 60)" />
      <circle cx="70" cy="60" r="1.6" fill={INK} /><circle cx="64" cy="64" r="1.6" fill={INK} />
      <path d="M33 34 q3 -12 14 -13" stroke={INK} strokeWidth="5.5" fill="none" />
      <path d="M43 32 q3 9 0 18 M53 30 q4 9 1 19 M62 35 q4 8 2 15" stroke={INK} strokeWidth="3.2" fill="none" />
      <path d="M46 50 q4 6 3 11 M56 50 q4 6 2 11" stroke={INK} strokeWidth="2.6" fill="none" />
      <circle cx="47" cy="42" r="2.8" fill={INK} /><circle cx="48" cy="41" r="0.9" fill="#FFF8EC" />
    </g>
  ),

  /** lattu — wooden spinning top with colour bands, metal tip, coiled string */
  lattu: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="84" rx="22" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M39 24 q11 -15 22 0 Z" fill="#0D9488" stroke={INK} strokeWidth="2.8" />
      <path d="M44 20 q6 -6 12 0" stroke="#2DD4BF" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M39 24 h22 q2 0 1.4 4 L57 56 q-1.4 9 -7 9 q-5.6 0 -7 -9 L37.6 28 q-.6 -4 1.4 -4 Z" fill="#F59E0B" stroke={INK} strokeWidth="3" />
      <path d="M37.8 32 q12.2 4 24.4 0" stroke="#EF4444" strokeWidth="4" fill="none" />
      <path d="M38.6 42 q11.4 4 22.8 0" stroke="#FDE047" strokeWidth="4" fill="none" />
      <path d="M38.5 36 q11.5 -5 23 0 M37.8 46 q12.2 -5 24.4 0" stroke="#D9A05B" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      <path d="M46 65 l4 9 4 -9 Z" fill="#9CA3AF" stroke={INK} strokeWidth="2" />
      <path d="M50 74 v4" stroke="#6B7280" strokeWidth="3" />
      <path d="M22 40 a28 24 0 0 0 3 16" stroke="#B9AC98" strokeWidth="2.5" fill="none" opacity="0.7" />
      <path d="M78 40 a28 24 0 0 1 -3 16" stroke="#B9AC98" strokeWidth="2.5" fill="none" opacity="0.7" />
    </g>
  ),

  /** kettle — stovetop kettle with spout, arched handle, lid, steam */
  kettle: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="ket-blue" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#38BDF8" /><stop offset="1" stopColor="#0369A1" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="28" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M31 50 q-15 -3 -12 -18 l7 2.5 q-2 9 7 11 Z" fill="#0369A1" stroke={INK} strokeWidth="2.5" />
      <path d="M17 26 q-3 -6 2 -9 M22 20 q2 -5 -2 -8" stroke="#B9AC98" strokeWidth="2.5" fill="none" opacity="0.8" />
      <path d="M30 48 q0 -14 20 -14 q20 0 20 14 v20 q0 8 -8 8 H38 q-8 0 -8 -8 Z" fill="url(#ket-blue)" stroke={INK} strokeWidth="3" />
      <path d="M36 36 q14 -18 28 0" fill="none" stroke={INK} strokeWidth="3.5" />
      <ellipse cx="50" cy="34" rx="11" ry="4.5" fill="#0EA5E9" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="29" r="3" fill="#FDE047" stroke={INK} strokeWidth="1.8" />
      <rect x="32" y="74" width="36" height="5" rx="2.5" fill="#64748B" stroke={INK} strokeWidth="2" />
      <path d="M36 56 q14 6 28 0" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.35" fill="none" />
    </g>
  ),

  /** milk-can — steel can with lid, handle arcs, brushed metal */
  "milk-can": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="mca-steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#CBD5E1" /><stop offset="0.5" stopColor="#F1F5F9" /><stop offset="1" stopColor="#94A3B8" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="24" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M36 40 q-4 0 -4 5 v30 q0 12 18 12 q18 0 18 -12 V45 q0 -5 -4 -5 Z" fill="url(#mca-steel)" stroke={INK} strokeWidth="3" />
      <path d="M40 40 q10 -8 20 0 l2 5 H38 Z" fill="#E2E8F0" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="50" cy="32" rx="12" ry="5" fill="#F8FAFC" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="27" r="3" fill="#94A3B8" stroke={INK} strokeWidth="1.8" />
      <path d="M33 48 q-6 4 0 9 M67 48 q6 4 0 9" stroke={INK} strokeWidth="2.5" fill="none" />
      <path d="M42 52 v26 M58 52 v26" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.5" />
      <path d="M46 52 v28 M54 52 v28" stroke="#94A3B8" strokeWidth="1.2" opacity="0.5" />
    </g>
  ),

  /** lock — amber padlock with silver shackle + keyhole */
  lock: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="lck-brass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FCD34D" /><stop offset="1" stopColor="#D97706" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="24" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M38 46 v-8 a12 11 0 0 1 24 0 v8" fill="none" stroke={INK} strokeWidth="8" />
      <path d="M38 46 v-8 a12 11 0 0 1 24 0 v8" fill="none" stroke="#B6C2CF" strokeWidth="4.5" />
      <path d="M41 38 q2 -5 9 -5" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" fill="none" />
      <rect x="31" y="44" width="38" height="34" rx="6" fill="url(#lck-brass)" stroke={INK} strokeWidth="3" />
      <path d="M36 50 q7 -3 14 0" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.5" fill="none" />
      <circle cx="50" cy="56" r="4.2" fill={INK} />
      <rect x="48" y="58" width="4" height="9" rx="2" fill={INK} />
    </g>
  ),

  /** trophy — golden cup with handles, stem, base + star emblem */
  trophy: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="tro-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF3C7" /><stop offset="0.5" stopColor="#FDE047" /><stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="26" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M33 26 h-8 a9 9 0 0 0 9 11 M67 26 h8 a9 9 0 0 1 -9 11" fill="none" stroke={INK} strokeWidth="2.8" />
      <path d="M34 20 h32 v14 a16 16 0 0 1 -32 0 Z" fill="url(#tro-gold)" stroke={INK} strokeWidth="3" />
      <path d="M50 27 l2 4.2 4.6 .6 -3.4 3.2 .9 4.6 -4.1 -2.3 -4.1 2.3 .9 -4.6 -3.4 -3.2 4.6 -.6 Z" fill="#FFF8EC" stroke="#B45309" strokeWidth="1.2" />
      <rect x="46" y="52" width="8" height="10" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <rect x="43" y="61" width="14" height="4" rx="1.5" fill="#FBBF24" stroke={INK} strokeWidth="2" />
      <rect x="35" y="65" width="30" height="10" rx="3" fill="#B45309" stroke={INK} strokeWidth="2.8" />
      <rect x="41" y="68" width="18" height="4" rx="2" fill="#FDE047" stroke={INK} strokeWidth="1.2" />
    </g>
  ),

  /** speaker — megaphone cone with sound arcs + stand */
  speaker: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="spk-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#14B8A6" /><stop offset="1" stopColor="#0F766E" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="26" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M42 70 L34 82 M58 70 L66 82 M50 72 V82" stroke={INK} strokeWidth="3.5" />
      <path d="M28 38 h14 l22 -15 v54 l-22 -15 H28 Z" fill="url(#spk-cone)" stroke={INK} strokeWidth="3" />
      <ellipse cx="64" cy="50" rx="6" ry="24" fill="#99F6E4" stroke={INK} strokeWidth="2.5" />
      <circle cx="64" cy="50" r="2.5" fill="#0F766E" />
      <path d="M76 40 q7 10 0 20" stroke="#F59E0B" strokeWidth="3" fill="none" />
      <path d="M84 33 q11 17 0 34" stroke="#F59E0B" strokeWidth="3" fill="none" opacity="0.75" />
    </g>
  ),

  /** friends — boy & girl holding hands, big smiles */
  friends: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="32" ry="5" fill="rgba(74,52,33,0.10)" />
      <path d="M58 60 h16 l5 22 H53 Z" fill="#EC4899" stroke={INK} strokeWidth="2.8" />
      <path d="M61 82 v6 M70 82 v6" stroke={INK} strokeWidth="3.5" />
      <circle cx="66" cy="40" r="12.5" fill="#3F2A16" stroke={INK} strokeWidth="2.2" />
      <path d="M54.5 42 q-2 12 3 16 l3 -9 Z M77.5 42 q2 12 -3 16 l-3 -9 Z" fill="#3F2A16" stroke={INK} strokeWidth="2" />
      <circle cx="66" cy="41" r="10" fill="#F2C79B" stroke={INK} strokeWidth="2.8" />
      <path d="M57 38 q4 -7 9 -7 q5 0 9 7 q-4 -3 -9 -3 q-5 0 -9 3 Z" fill="#3F2A16" />
      <circle cx="62.5" cy="41" r="2" fill={INK} /><circle cx="69.5" cy="41" r="2" fill={INK} />
      <path d="M63 46 q3 2.5 6 0" stroke={INK} strokeWidth="2" fill="none" />
      <path d="M28 50 h17 l-2.5 21 h-12 Z" fill="#3B82F6" stroke={INK} strokeWidth="2.8" />
      <path d="M31 71 v13 M41 71 v13" stroke={INK} strokeWidth="3.5" />
      <path d="M25 37 q2 -13 11 -13 q9 0 11 13 q-5.5 -6 -11 -6 q-5.5 0 -11 6 Z" fill="#3F2A16" stroke={INK} strokeWidth="2.2" />
      <circle cx="36" cy="38" r="10.5" fill="#F2C79B" stroke={INK} strokeWidth="2.8" />
      <circle cx="32.5" cy="37" r="2" fill={INK} /><circle cx="39.5" cy="37" r="2" fill={INK} />
      <path d="M33 42 q3 2.5 6 0" stroke={INK} strokeWidth="2" fill="none" />
      <path d="M44 59 q6 4 10 4" stroke="#F2C79B" strokeWidth="4.5" fill="none" />
      <path d="M74 64 q-10 4 -17 1" stroke="#F2C79B" strokeWidth="4.5" fill="none" />
      <circle cx="55" cy="63.5" r="3.2" fill="#F2C79B" stroke={INK} strokeWidth="1.5" />
    </g>
  ),

  /** settings — 8-tooth gear with centre hole, silver-warm gradient */
  settings: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="set-brass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EAD9B0" /><stop offset="1" stopColor="#B99A5E" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="28" ry="4.5" fill="rgba(74,52,33,0.10)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="45" y="11" width="10" height="15" rx="3.5" fill="url(#set-brass)" stroke={INK} strokeWidth="2.5" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="26" fill="url(#set-brass)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="50" r="11" fill="#F5EFE2" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4.5" fill="#8A7156" stroke={INK} strokeWidth="2" />
    </g>
  ),

  /** teacher — green chalkboard on a wooden stand, chalk squiggles (Teacher Zone) */
  teacher: (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="90" rx="30" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <path d="M34 66 L28 88 M66 66 L72 88" stroke="#8B5A2B" strokeWidth="4" />
      <rect x="42" y="60" width="16" height="5" rx="2" fill="#A97142" stroke={INK} strokeWidth="2" />
      <rect x="14" y="14" width="72" height="52" rx="7" fill="#8B5A2B" stroke={INK} strokeWidth="3" />
      <rect x="20" y="20" width="60" height="40" rx="4" fill="#2E7D5B" stroke={INK} strokeWidth="2.5" />
      <path d="M27 30 q8 -2 14 1 M27 36 h12 M27 42 q6 3 12 0" stroke="#F7F3E8" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M47 30 q7 3 0 7 q-7 4 0 7" stroke="#F7F3E8" strokeWidth="2.4" fill="none" />
      <rect x="63" y="30" width="12" height="4" rx="2" fill="#F7F3E8" opacity="0.9" />
      <path d="M69 42 l3 6 6 1 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -1 Z" fill="#FFC800" stroke="#B98600" strokeWidth="1.2" />
      <path d="M18 25 q4 -3 8 0" stroke="#F7F3E8" strokeWidth="1.8" opacity="0.6" fill="none" />
    </g>
  ),

  /** close-work — open book with bookmark, warm cover */
  "close-work": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M50 76 q-17 -9 -34 -4 V22 q17 -5 34 4 q17 -9 34 -4 v50 q-17 -5 -34 4 Z" fill="#C2410C" stroke={INK} strokeWidth="3" />
      <path d="M50 72 q-15 -8 -29 -4 V26 q14 -4 29 3 Z" fill="#FFFDF7" stroke={INK} strokeWidth="2.4" />
      <path d="M50 72 q15 -8 29 -4 V26 q-14 -4 -29 3 Z" fill="#F8F1E2" stroke={INK} strokeWidth="2.4" />
      <path d="M50 29 v43" stroke={INK} strokeWidth="2" />
      <path d="M28 34 h14 M28 41 h14 M28 48 h10 M58 34 h14 M58 41 h14 M58 48 h10" stroke="#D6CDBB" strokeWidth="2.2" />
      <path d="M62 25 v20 l4.5 -4.5 4.5 4.5 V27 Z" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
    </g>
  ),

  /** medal-box — lacquer treasure box, lid ajar, glowing gold medal inside */
  "medal-box": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <radialGradient id="mbx-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FDE047" stopOpacity="0.9" /><stop offset="1" stopColor="#FDE047" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="30" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <g transform="rotate(-16 26 46)">
        <rect x="26" y="22" width="50" height="24" rx="5" fill="#B91C1C" stroke={INK} strokeWidth="3" />
        <path d="M31 28 h40" stroke="#FBBF24" strokeWidth="2" opacity="0.8" />
      </g>
      <ellipse cx="56" cy="44" rx="17" ry="11" fill="url(#mbx-glow)" />
      <path d="M51 30 l4 7 4 -7 2 10 h-12 Z" fill="#EF4444" stroke={INK} strokeWidth="1.8" />
      <circle cx="56" cy="42" r="8" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" />
      <path d="M56 38.5 l1.1 2.2 2.4 .4 -1.7 1.6 .4 2.4 -2.2 -1.1 -2.2 1.1 .4 -2.4 -1.7 -1.6 2.4 -.4 Z" fill="#B45309" />
      <rect x="24" y="46" width="52" height="34" rx="5" fill="#991B1B" stroke={INK} strokeWidth="3" />
      <path d="M24 54 h52" stroke="#FBBF24" strokeWidth="2.2" />
      <path d="M30 62 q20 8 40 0" stroke="#7F1D1D" strokeWidth="2" opacity="0.7" fill="none" />
      <circle cx="50" cy="60" r="2.5" fill="#FBBF24" stroke={INK} strokeWidth="1.5" />
    </g>
  ),

  /** space-carpet — magic flying carpet with fringe + woven stripes + sparkles */
  "space-carpet": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="scp-purple" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A78BFA" /><stop offset="1" stopColor="#7C3AED" /></linearGradient>
      </defs>
      <path d="M10 46 Q50 28 90 46 Q50 64 10 46 Z" fill="url(#scp-purple)" stroke={INK} strokeWidth="3" />
      <path d="M17 45 Q50 32 83 45" stroke="#C4B5FD" strokeWidth="2.5" fill="none" />
      <path d="M21 49 Q50 39 79 49" stroke="#FDE047" strokeWidth="2.5" fill="none" />
      <path d="M25 52 Q50 44 75 52" stroke="#DDD6FE" strokeWidth="2" fill="none" opacity="0.8" />
      <circle cx="50" cy="46" r="2.5" fill="#FDE047" />
      <path d="M10 45 l-6 -3 M10 47 l-7 0 M10 49 l-6 3 M90 45 l6 -3 M90 47 l7 0 M90 49 l6 3" stroke="#F59E0B" strokeWidth="2.5" />
      <path d="M28 22 l1.2 3.6 3.6 1.2 -3.6 1.2 -1.2 3.6 -1.2 -3.6 -3.6 -1.2 3.6 -1.2 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.2" />
      <path d="M72 16 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.2" />
    </g>
  ),

  /** enter-door — friendly arched wooden door with handle + welcome mat */
  "enter-door": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="50" cy="94" rx="30" ry="4" fill="rgba(74,52,33,0.10)" />
      <path d="M24 88 V32 a26 24 0 0 1 52 0 V88 Z" fill="#C68B4E" stroke={INK} strokeWidth="3.5" />
      <path d="M30 88 V34 a20 19 0 0 1 40 0 V88 Z" fill="#8B5E3C" stroke={INK} strokeWidth="3" />
      <path d="M43 36 V86 M57 36 V86" stroke="#6B3F22" strokeWidth="1.6" opacity="0.7" />
      <path d="M36 58 v28 M64 58 v28" stroke="#6B3F22" strokeWidth="1.2" opacity="0.4" />
      <circle cx="62" cy="54" r="3.5" fill="#FDE047" stroke={INK} strokeWidth="2" />
      <ellipse cx="50" cy="93" rx="24" ry="5" fill="#B45309" stroke={INK} strokeWidth="2.5" />
      <path d="M31 91 q19 5 38 0 M33 95 q17 4 34 0" stroke="#D97706" strokeWidth="1.8" fill="none" />
    </g>
  ),

  /** bin-green — green waste bin with lid + white recycle triangle */
  "bin-green": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="bgn-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34D399" /><stop offset="1" stopColor="#059669" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(74,52,33,0.10)" />
      <rect x="42" y="22" width="16" height="8" rx="4" fill="#10B981" stroke={INK} strokeWidth="2.5" />
      <rect x="24" y="28" width="52" height="11" rx="5.5" fill="#10B981" stroke={INK} strokeWidth="2.8" />
      <path d="M28 42 h44 l-4 40 q-.5 6 -6 6 H38 q-5.5 0 -6 -6 Z" fill="url(#bgn-body)" stroke={INK} strokeWidth="3" />
      <path d="M40 48 q-1 18 .5 34 M60 48 q1 18 -.5 34" stroke="#065F46" strokeWidth="2" opacity="0.55" fill="none" />
      <path d="M50 56 l9.5 16 h-19 Z" fill="none" stroke="#ECFDF5" strokeWidth="3.5" strokeLinejoin="round" />
    </g>
  ),

  /** bin-teal — teal waste bin with white leaf emblem */
  "bin-teal": (
    <g strokeLinejoin="round" strokeLinecap="round">
      <defs>
        <linearGradient id="bte-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5EEAD4" /><stop offset="1" stopColor="#0F766E" /></linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="26" ry="4" fill="rgba(74,52,33,0.10)" />
      <rect x="42" y="22" width="16" height="8" rx="4" fill="#14B8A6" stroke={INK} strokeWidth="2.5" />
      <rect x="24" y="28" width="52" height="11" rx="5.5" fill="#14B8A6" stroke={INK} strokeWidth="2.8" />
      <path d="M28 42 h44 l-4 40 q-.5 6 -6 6 H38 q-5.5 0 -6 -6 Z" fill="url(#bte-body)" stroke={INK} strokeWidth="3" />
      <path d="M40 48 q-1 18 .5 34 M60 48 q1 18 -.5 34" stroke="#115E59" strokeWidth="2" opacity="0.55" fill="none" />
      <path d="M50 55 q11 3 10 14 q-11 1 -10 -14 Z" fill="#ECFDF5" />
      <path d="M51 68 q3 -6 7 -11" stroke="#0F766E" strokeWidth="2" fill="none" />
    </g>
  ),
};
