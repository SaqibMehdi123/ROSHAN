/**
 * ROSHAN art registry — every activity item, computer part and scene background
 * drawn as compact flat SVG. Lookup via <Art id="…" size={…} />.
 * Asset IDs match docs/07-asset-checklist.md so real illustrations can replace these 1:1.
 */
"use client";

const INK = "#4A3421";

interface ArtProps {
  id: string;
  size?: number;
  className?: string;
}

/* Small icon drawings (each drawn inside a 100×100 viewBox) */
const ICONS: Record<string, React.ReactNode> = {
  /* ---- W1L1 items ---- */
  phone: (
    <g>
      <rect x="32" y="18" width="36" height="64" rx="8" fill="#38BDF8" stroke={INK} strokeWidth="3" />
      <rect x="37" y="26" width="26" height="42" rx="3" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <circle cx="50" cy="75" r="4" fill={INK} />
    </g>
  ),
  calculator: (
    <g>
      <rect x="28" y="14" width="44" height="72" rx="8" fill="#0D9488" stroke={INK} strokeWidth="3" />
      <rect x="34" y="20" width="32" height="16" rx="2" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={34 + c * 11} y={44 + r * 12} width="8" height="8" rx="2" fill="#FDE68A" stroke={INK} strokeWidth="1.5" />
        ))
      )}
    </g>
  ),
  atm: (
    <g>
      <rect x="24" y="12" width="52" height="76" rx="6" fill="#3B82F6" stroke={INK} strokeWidth="3" />
      <rect x="31" y="20" width="38" height="22" rx="3" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <rect x="34" y="50" width="24" height="6" rx="2" fill="#FDE68A" stroke={INK} strokeWidth="1.5" />
      <circle cx="66" cy="53" r="4" fill="#22C55E" stroke={INK} strokeWidth="1.5" />
      <rect x="34" y="66" width="32" height="12" rx="2" fill="#93C5FD" stroke={INK} strokeWidth="1.5" />
    </g>
  ),
  laptop: (
    <g>
      <path d="M30 30 h40 v28 h-40 Z" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M30 30 h40 v28 h-40 Z" fill="none" stroke={INK} strokeWidth="3" />
      <path d="M22 62 h56 l6 8 H16 Z" fill="#8B5CF6" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="35" y="35" width="30" height="18" rx="2" fill="#38BDF8" />
    </g>
  ),
  goat: (
    <g>
      <ellipse cx="50" cy="62" rx="26" ry="18" fill="#F6EBD8" stroke={INK} strokeWidth="3" />
      <circle cx="74" cy="44" r="13" fill="#F6EBD8" stroke={INK} strokeWidth="3" />
      <path d="M66 34 l-6 -10 10 4 Z M82 34 l6 -10 -10 4 Z" fill="#D9CDB8" stroke={INK} strokeWidth="2" />
      <circle cx="78" cy="43" r="2" fill={INK} />
      <path d="M70 50 q5 4 10 0" stroke={INK} strokeWidth="2" fill="none" />
      <path d="M32 78 v10 M48 78 v10 M58 78 v10 M70 76 v10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  "cricket-bat": (
    <g>
      <path d="M46 14 q12 0 12 14 l-2 44 q-1 10 -10 10 t-10 -10 l-2 -44 q0 -14 12 -14" fill="#C68B4E" stroke={INK} strokeWidth="3" />
      <rect x="43" y="76" width="14" height="16" rx="4" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      <circle cx="58" cy="86" r="7" fill="#EC4899" stroke={INK} strokeWidth="2.5" />
    </g>
  ),
  "mango-tree": (
    <g>
      <path d="M46 92 q4 -22 4 -36 M54 92 q-4 -22 -4 -36" stroke="#8B5E3C" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="38" r="22" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <circle cx="32" cy="50" r="12" fill="#16A34A" stroke={INK} strokeWidth="2.5" />
      <circle cx="68" cy="50" r="12" fill="#16A34A" stroke={INK} strokeWidth="2.5" />
      <circle cx="42" cy="56" r="6" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      <circle cx="60" cy="58" r="6" fill="#F59E0B" stroke={INK} strokeWidth="2" />
    </g>
  ),
  well: (
    <g>
      <path d="M28 60 a22 14 0 0 1 44 0 v14 a22 12 0 0 1 -44 0 Z" fill="#9CA3AF" stroke={INK} strokeWidth="3" />
      <path d="M30 30 h40" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M36 32 v-14 M64 32 v-14" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 34 v14" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="52" r="5" fill="#38BDF8" stroke={INK} strokeWidth="2" />
    </g>
  ),
  /* ---- W1L2 parts ---- */
  monitor: (
    <g>
      <rect x="18" y="24" width="64" height="46" rx="6" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <rect x="25" y="31" width="50" height="32" rx="3" fill="#38BDF8" />
      <path d="M42 82 q8 -6 16 0 l4 6 h-24 Z" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="47" r="10" fill="#FFF8EC" opacity="0.9" />
      <path d="M45 47 q5 -7 10 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  "cpu-box": (
    <g>
      <rect x="26" y="14" width="48" height="72" rx="6" fill="#D6D3D1" stroke={INK} strokeWidth="3" />
      <rect x="34" y="24" width="32" height="20" rx="2" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <circle cx="50" cy="34" r="5" fill="#FFF8EC" stroke={INK} strokeWidth="1.5" />
      <path d="M34 56 h32 M34 64 h32 M34 72 h20" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <circle cx="62" cy="76" r="3" fill="#F59E0B" stroke={INK} strokeWidth="1" />
    </g>
  ),
  keyboard: (
    <g>
      <rect x="12" y="34" width="76" height="34" rx="6" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => (
          <rect key={`${r}${c}`} x={17 + c * 11.5} y={40 + r * 9} width="8" height="6" rx="1.5" fill={r === 1 && c >= 1 && c <= 4 ? "#FDE68A" : "#E7DCC8"} stroke={INK} strokeWidth="1" />
        ))
      )}
    </g>
  ),
  mouse: (
    <g>
      <ellipse cx="50" cy="50" rx="22" ry="30" fill="#FDE68A" stroke={INK} strokeWidth="3" />
      <path d="M50 22 q-12 8 -12 26 M50 22 q12 8 12 26" stroke={INK} strokeWidth="2.5" fill="none" />
      <rect x="46" y="34" width="8" height="14" rx="4" fill="#0D9488" stroke={INK} strokeWidth="1.5" />
      <path d="M50 80 q0 8 8 8" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  "slot-face": (
    <g>
      <circle cx="50" cy="50" r="34" fill="none" stroke="#B9AC98" strokeWidth="4" strokeDasharray="8 6" />
      <path d="M38 52 q12 -12 24 0" stroke="#B9AC98" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  "slot-brain": (
    <g>
      <circle cx="50" cy="50" r="30" fill="none" stroke="#B9AC98" strokeWidth="4" strokeDasharray="8 6" />
      <path d="M40 50 q10 -14 20 0 q-10 14 -20 0" stroke="#B9AC98" strokeWidth="3" fill="none" />
    </g>
  ),
  "slot-ears": (
    <g>
      <circle cx="50" cy="50" r="30" fill="none" stroke="#B9AC98" strokeWidth="4" strokeDasharray="8 6" />
      <path d="M38 44 a8 10 0 1 1 0 12 M62 44 a8 10 0 1 0 0 12" stroke="#B9AC98" strokeWidth="3" fill="none" />
    </g>
  ),
  "slot-helper": (
    <g>
      <circle cx="50" cy="50" r="30" fill="none" stroke="#B9AC98" strokeWidth="4" strokeDasharray="8 6" />
      <path d="M46 38 q-10 12 0 24 q10 4 12 -6" stroke="#B9AC98" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  /* ---- W1L3 rule cards ---- */
  "clean-hands": (
    <g>
      <path d="M35 62 q-6 -22 8 -26 q2 -8 10 -6 q8 -6 12 2 q10 0 8 12 l-2 18 q-2 10 -14 10 h-8 q-10 0 -14 -10" fill="#F2C79B" stroke={INK} strokeWidth="3" />
      <path d="M40 34 q-14 6 -10 24" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="4 4" />
      <circle cx="72" cy="30" r="7" fill="#38BDF8" opacity="0.6" />
    </g>
  ),
  "gentle-touch": (
    <g>
      <ellipse cx="50" cy="58" rx="24" ry="18" fill="#FDE68A" stroke={INK} strokeWidth="3" />
      <path d="M40 30 q-4 12 4 16" stroke="#F2C79B" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M44 24 q2 6 -2 10" stroke="#F2C79B" strokeWidth="6" fill="none" strokeLinecap="round" />
      <text x="58" y="42" fontSize="16" fill="#22C55E">♥</text>
    </g>
  ),
  "no-food": (
    <g>
      <circle cx="50" cy="52" r="24" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M36 46 q14 10 28 0 M38 60 q12 8 24 0" stroke="#F59E0B" strokeWidth="3" fill="none" />
      <line x1="28" y1="28" x2="72" y2="76" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" />
    </g>
  ),
  "ask-first": (
    <g>
      <circle cx="42" cy="44" r="16" fill="#F2C79B" stroke={INK} strokeWidth="3" />
      <path d="M20 78 q22 -18 44 0" fill="#0D9488" stroke={INK} strokeWidth="3" />
      <text x="62" y="48" fontSize="34" fontWeight="700" fill="#F59E0B">؟</text>
    </g>
  ),
  "dirty-paws": (
    <g>
      <ellipse cx="50" cy="58" rx="24" ry="16" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <ellipse cx="38" cy="46" rx="10" ry="7" fill="#92400E" stroke={INK} strokeWidth="2.5" />
      <ellipse cx="62" cy="42" rx="10" ry="7" fill="#92400E" stroke={INK} strokeWidth="2.5" />
      <circle cx="44" cy="60" r="2.5" fill="#92400E" />
      <circle cx="56" cy="62" r="2.5" fill="#92400E" />
    </g>
  ),
  "juice-spill": (
    <g>
      <rect x="40" y="22" width="20" height="30" rx="3" fill="#FB923C" stroke={INK} strokeWidth="3" />
      <path d="M46 52 q-2 14 -8 22 M54 52 q6 12 4 24" stroke="#FB923C" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="20" y="66" width="60" height="14" rx="6" fill="#8B5CF6" stroke={INK} strokeWidth="3" />
      <circle cx="76" cy="30" r="8" fill="#EC4899" opacity="0.8" />
    </g>
  ),
  "sneak-in": (
    <g>
      <rect x="24" y="26" width="52" height="52" rx="5" fill="#38BDF8" stroke={INK} strokeWidth="3" />
      <circle cx="62" cy="52" r="3" fill="#22C55E" stroke={INK} strokeWidth="1.5" />
      <path d="M62 56 v14" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 34 q6 8 0 16" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  "polite-question": (
    <g>
      <circle cx="40" cy="42" r="14" fill="#F2C79B" stroke={INK} strokeWidth="3" />
      <path d="M20 72 q20 -16 40 0" fill="#F59E0B" stroke={INK} strokeWidth="3" />
      <path d="M66 34 q10 -6 14 2 q4 8 -8 10 l0 6" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="72" cy="60" r="2.5" fill={INK} />
    </g>
  ),
  "bang-keys": (
    <g>
      <rect x="16" y="40" width="68" height="30" rx="5" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M36 22 q6 10 -4 16 M50 20 q6 10 -4 16 M64 22 q6 10 -4 16" stroke="#EC4899" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M30 52 h40" stroke="#B9AC98" strokeWidth="3" strokeDasharray="4 3" />
    </g>
  ),
  "bin-green": (
    <g>
      <path d="M30 40 h40 l-5 44 h-30 Z" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <rect x="26" y="32" width="48" height="10" rx="4" fill="#16A34A" stroke={INK} strokeWidth="2.5" />
      <text x="50" y="72" fontSize="22" textAnchor="middle" fill="#fff">✓</text>
    </g>
  ),
  "bin-teal": (
    <g>
      <path d="M30 40 h40 l-5 44 h-30 Z" fill="#0D9488" stroke={INK} strokeWidth="3" />
      <rect x="26" y="32" width="48" height="10" rx="4" fill="#0F766E" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="62" r="8" fill="#FDE68A" stroke={INK} strokeWidth="2" />
      <path d="M47 58 l6 8 M53 58 l-6 8" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
  /* ---- Brain Gym & misc ---- */
  mango: (
    <g>
      <path d="M50 22 q26 4 24 32 q-2 26 -24 26 t-24 -26 q-2 -28 24 -32" fill="#F59E0B" stroke={INK} strokeWidth="3" />
      <path d="M50 20 q0 -8 8 -10" stroke="#8B5E3C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M40 40 q-6 10 -2 20" stroke="#FDE68A" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  kite: (
    <g>
      <path d="M50 14 L78 44 L50 74 L22 44 Z" fill="#EC4899" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 14 v60 M22 44 h56" stroke={INK} strokeWidth="2" />
      <path d="M50 74 q-8 10 2 18 q8 6 0 8" stroke={INK} strokeWidth="2" fill="none" />
    </g>
  ),
  sun: (
    <g>
      <circle cx="50" cy="50" r="18" fill="#FDE047" stroke={INK} strokeWidth="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <line key={a} x1={50 + 24 * Math.cos((a * Math.PI) / 180)} y1={50 + 24 * Math.sin((a * Math.PI) / 180)} x2={50 + 32 * Math.cos((a * Math.PI) / 180)} y2={50 + 32 * Math.sin((a * Math.PI) / 180)} stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      ))}
    </g>
  ),
  "chai-cup": (
    <g>
      <path d="M32 42 h36 v18 a18 14 0 0 1 -36 0 Z" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M68 46 q10 4 0 12" stroke={INK} strokeWidth="3" fill="none" />
      <path d="M40 34 q2 -6 -2 -10 M52 34 q2 -6 -2 -10" stroke="#B9AC98" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="42" rx="18" ry="4" fill="#8B5E3C" stroke={INK} strokeWidth="2" />
    </g>
  ),
  kettle: (
    <g>
      <path d="M34 44 q-4 26 16 26 t16 -26 q-16 -10 -32 0" fill="#38BDF8" stroke={INK} strokeWidth="3" />
      <path d="M30 46 q-12 4 -10 14" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M66 46 q10 -2 8 -10" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M44 38 q-2 -8 4 -12" stroke="#B9AC98" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  "milk-can": (
    <g>
      <rect x="34" y="34" width="32" height="40" rx="6" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <rect x="42" y="22" width="16" height="14" rx="3" fill="#0D9488" stroke={INK} strokeWidth="2.5" />
      <text x="50" y="60" fontSize="13" textAnchor="middle" fill="#0D9488">M</text>
    </g>
  ),
  /* SHOW-phase visuals are aliased below (after ICONS is initialized) */
  /* power steps (W1 L4/L5 placeholders for Phase 2 lessons) */
  "power-switch": (
    <g>
      <rect x="26" y="30" width="48" height="40" rx="5" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="50" r="10" fill="#22C55E" stroke={INK} strokeWidth="2.5" />
      <path d="M50 42 v8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  powerpc: (
    <g>
      <circle cx="50" cy="50" r="16" fill="#3B82F6" stroke={INK} strokeWidth="3" />
      <path d="M50 38 v12" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M40 44 a12 12 0 1 0 20 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  monitorbtn: (
    <g>
      <rect x="26" y="28" width="48" height="36" rx="5" fill="#8B5CF6" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="72" r="5" fill="#22C55E" stroke={INK} strokeWidth="2" />
    </g>
  ),
  wait: (
    <g>
      <circle cx="50" cy="50" r="22" fill="#FDE68A" stroke={INK} strokeWidth="3" />
      <path d="M50 36 v14 l10 6" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  shutdown: (
    <g>
      <circle cx="50" cy="50" r="16" fill="#EC4899" stroke={INK} strokeWidth="3" />
      <path d="M44 50 q6 6 12 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  /* map & world medallions */
  "medal-box": (
    <g>
      <rect x="24" y="34" width="52" height="40" rx="5" fill="#F59E0B" stroke={INK} strokeWidth="3" />
      <path d="M24 46 h52 M50 34 v40" stroke={INK} strokeWidth="2.5" />
      <path d="M50 26 l6 8 h-12 Z" fill="#FDE047" stroke={INK} strokeWidth="2" />
    </g>
  ),
  "medal-mouse": null, // aliased below
  "medal-keyboard": null, // aliased below
  "medal-folder": (
    <g>
      <path d="M22 36 h20 l6 8 h30 v34 a5 5 0 0 1 -5 5 H27 a5 5 0 0 1 -5 -5 Z" fill="#3B82F6" stroke={INK} strokeWidth="3" />
      <path d="M30 58 h40" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  "medal-paint": (
    <g>
      <circle cx="50" cy="52" r="26" fill="#EC4899" stroke={INK} strokeWidth="3" />
      <circle cx="42" cy="46" r="5" fill="#FDE68A" />
      <circle cx="58" cy="46" r="5" fill="#38BDF8" />
      <circle cx="50" cy="62" r="5" fill="#22C55E" />
    </g>
  ),
  "medal-shield": (
    <g>
      <path d="M50 20 l24 8 v20 q0 22 -24 32 q-24 -10 -24 -32 V28 Z" fill="#0D9488" stroke={INK} strokeWidth="3" />
      <path d="M40 50 l8 8 14 -16" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  "medal-gem": (
    <g>
      <path d="M50 22 L74 44 L50 78 L26 44 Z" fill="#38BDF8" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 44 h48 M50 22 v56" stroke="#fff" strokeWidth="2" opacity="0.7" />
    </g>
  ),
  "medal-mountain": (
    <g>
      <path d="M22 76 L46 34 L60 56 L70 42 L82 76 Z" fill="#D97706" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M70 42 L82 76 H58 Z" fill="#FDE68A" stroke={INK} strokeWidth="2.5" />
      <path d="M60 34 v-12 M60 22 l10 4 -10 4" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  lock: (
    <g>
      <rect x="32" y="46" width="36" height="30" rx="6" fill="#B9AC98" stroke={INK} strokeWidth="3" />
      <path d="M38 46 v-8 a12 12 0 0 1 24 0 v8" fill="none" stroke={INK} strokeWidth="4" />
      <circle cx="50" cy="60" r="4" fill={INK} />
    </g>
  ),
  star: (
    <path d="M50 14 L60 38 L88 40 L66 57 L73 84 L50 68 L27 84 L34 57 L12 40 L40 38 Z" fill="#FDE047" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
  ),
  home: (
    <g>
      <path d="M24 52 L50 28 L76 52" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 50 v22 h36 V50" fill="#F59E0B" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="45" y="58" width="10" height="14" rx="2" fill="#8B5E3C" stroke={INK} strokeWidth="2" />
    </g>
  ),
  gem: null, // aliased below after ICONS is initialized
  trophy: (
    <g>
      <path d="M36 28 h28 v16 a14 14 0 0 1 -28 0 Z" fill="#FDE047" stroke={INK} strokeWidth="3" />
      <path d="M36 32 h-10 a10 10 0 0 0 10 12 M64 32 h10 a10 10 0 0 1 -10 12" fill="none" stroke={INK} strokeWidth="3" />
      <rect x="46" y="58" width="8" height="10" fill={INK} />
      <rect x="38" y="68" width="24" height="8" rx="3" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
    </g>
  ),
  /* ---- W1 L4–L6 (Phase 2) ---- */
  "close-work": (
    <g>
      <rect x="20" y="24" width="60" height="46" rx="5" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <rect x="20" y="24" width="60" height="12" rx="5" fill="#0D9488" stroke={INK} strokeWidth="3" />
      <circle cx="27" cy="30" r="2.5" fill="#FDE047" />
      <circle cx="35" cy="30" r="2.5" fill="#EC4899" />
      <path d="M44 44 l12 12 M56 44 l-12 12" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />
      <rect x="42" y="76" width="16" height="6" rx="2" fill="#0D9488" stroke={INK} strokeWidth="2" />
    </g>
  ),
  "party-flag": (
    <g>
      <path d="M16 26 q34 14 68 0" stroke={INK} strokeWidth="3" fill="none" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${22 + i * 17} 28 l7 16 l7 -16 Z`} fill={["#EC4899", "#38BDF8", "#FDE047", "#22C55E"][i]} stroke={INK} strokeWidth="2" />
      ))}
    </g>
  ),
  /* ---- W2 Mouse Meadow (Phase 2) ---- */
  teer: (
    <g>
      <path d="M30 18 L70 50 L52 52 L60 74 L48 78 L42 56 L30 66 Z" fill="#FFFFFF" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    </g>
  ),
  "glow-spot": (
    <g>
      <circle cx="50" cy="50" r="26" fill="#FDE047" opacity="0.35" />
      <circle cx="50" cy="50" r="16" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
    </g>
  ),
  butterfly: (
    <g>
      <ellipse cx="36" cy="42" rx="17" ry="22" fill="#EC4899" stroke={INK} strokeWidth="3" transform="rotate(-18 36 42)" />
      <ellipse cx="64" cy="42" rx="17" ry="22" fill="#EC4899" stroke={INK} strokeWidth="3" transform="rotate(18 64 42)" />
      <ellipse cx="40" cy="56" rx="11" ry="14" fill="#38BDF8" stroke={INK} strokeWidth="2.5" transform="rotate(-14 40 56)" />
      <ellipse cx="60" cy="56" rx="11" ry="14" fill="#38BDF8" stroke={INK} strokeWidth="2.5" transform="rotate(14 60 56)" />
      <ellipse cx="50" cy="48" rx="5" ry="22" fill="#4A3421" />
      <circle cx="50" cy="26" r="6" fill="#4A3421" />
      <path d="M46 22 q-6 -8 -10 -10 M54 22 q6 -8 10 -10" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  ),
  flower: (
    <g>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={a} cx={50 + 16 * Math.cos((a * Math.PI) / 180)} cy={42 + 16 * Math.sin((a * Math.PI) / 180)} rx="9" ry="12" fill="#EC4899" stroke={INK} strokeWidth="2" />
      ))}
      <circle cx="50" cy="42" r="9" fill="#FDE047" stroke={INK} strokeWidth="2.5" />
      <path d="M50 54 v30" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 66 q-10 -2 -12 -10 q10 0 12 10" fill="#22C55E" stroke={INK} strokeWidth="2" />
    </g>
  ),
  bubble: (
    <g>
      <circle cx="50" cy="50" r="30" fill="#BFE8F5" opacity="0.55" stroke="#38BDF8" strokeWidth="3" />
      <circle cx="40" cy="38" r="8" fill="#FFFFFF" opacity="0.85" />
      <circle cx="62" cy="60" r="4" fill="#FFFFFF" opacity="0.7" />
    </g>
  ),
  egg: (
    <g>
      <path d="M50 18 q24 4 24 34 q0 30 -24 30 q-24 0 -24 -30 q0 -30 24 -34" fill="#FFF6E3" stroke={INK} strokeWidth="3" />
      <circle cx="42" cy="46" r="4" fill="#F3E5C8" />
      <circle cx="58" cy="58" r="5" fill="#F3E5C8" />
    </g>
  ),
  chick: (
    <g>
      <circle cx="50" cy="56" r="24" fill="#FDE047" stroke={INK} strokeWidth="3" />
      <circle cx="42" cy="50" r="3.5" fill={INK} />
      <circle cx="58" cy="50" r="3.5" fill={INK} />
      <path d="M46 58 l4 4 l4 -4" fill="#F59E0B" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 52 q-12 -2 -14 -10 q10 -2 16 6" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <path d="M40 80 v8 M58 80 v8" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  hen: (
    <g>
      <ellipse cx="48" cy="56" rx="28" ry="20" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <circle cx="72" cy="38" r="13" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M70 24 l4 -8 4 8 Z M76 24 l4 -6 3 7 Z" fill="#EC4899" stroke={INK} strokeWidth="2" />
      <path d="M84 38 l8 3 -8 3" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      <circle cx="76" cy="36" r="2.5" fill={INK} />
      <path d="M38 76 v8 M56 76 v8" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  bud: (
    <g>
      <path d="M50 22 q14 10 12 28 q-2 18 -12 18 q-10 0 -12 -18 q-2 -18 12 -28" fill="#86EFAC" stroke={INK} strokeWidth="3" />
      <path d="M50 26 v40" stroke="#16A34A" strokeWidth="2.5" />
      <path d="M50 66 v20" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  bloom: (
    <g>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={50 + 18 * Math.cos((a * Math.PI) / 180)} cy={40 + 18 * Math.sin((a * Math.PI) / 180)} rx="11" ry="15" fill="#F9A8D4" stroke={INK} strokeWidth="2.5" transform={`rotate(${a} 50 40)`} />
      ))}
      <circle cx="50" cy="40" r="10" fill="#FDE047" stroke={INK} strokeWidth="2.5" />
      <path d="M50 56 v30" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  banana: (
    <g>
      <path d="M26 36 q6 34 44 32 q4 0 4 -6 q-2 2 -6 2 Q34 64 32 34 Z" fill="#FDE047" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 36 l-4 -6 M74 62 l4 4" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  grapes: (
    <g>
      {[36, 50, 64].map((x, r) =>
        [0, 1, 2].map((c) => (
          <circle key={`${r}${c}`} cx={x - r * 7 + c * 14} cy={40 + r * 15} r="10" fill="#8B5CF6" stroke={INK} strokeWidth="2.5" />
        ))
      )}
      <path d="M50 30 q0 -12 10 -14" stroke="#8B5E3C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  watermelon: (
    <g>
      <path d="M20 58 a30 30 0 0 1 60 0 Z" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <path d="M27 58 a23 23 0 0 1 46 0 Z" fill="#FDE047" stroke={INK} strokeWidth="2" />
      <path d="M31 58 a19 19 0 0 1 38 0 Z" fill="#EC4899" stroke={INK} strokeWidth="1.5" />
      {[38, 50, 62].map((x) => (
        <ellipse key={x} cx={x} cy={52} rx="2.5" ry="4" fill="#4A3421" />
      ))}
    </g>
  ),
  "fruit-basket": (
    <g>
      <path d="M22 46 h56 l-8 32 h-40 Z" fill="#C68B4E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M22 46 q28 -18 56 0" fill="none" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 54 h40 M32 62 h36 M36 70 h28" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="42" r="8" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      <circle cx="58" cy="42" r="8" fill="#22C55E" stroke={INK} strokeWidth="2" />
    </g>
  ),
  "water-drop": (
    <g>
      <path d="M50 16 q20 24 20 38 a20 20 0 1 1 -40 0 q0 -14 20 -38" fill="#38BDF8" stroke={INK} strokeWidth="3" />
      <circle cx="42" cy="56" r="6" fill="#FFFFFF" opacity="0.7" />
    </g>
  ),
  frog: (
    <g>
      <ellipse cx="50" cy="60" rx="26" ry="20" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="40" r="11" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <circle cx="62" cy="40" r="11" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="40" r="4.5" fill={INK} />
      <circle cx="62" cy="40" r="4.5" fill={INK} />
      <path d="M40 62 q10 8 20 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  stone: (
    <g>
      <path d="M24 66 q-4 -20 16 -24 q6 -12 22 -8 q18 2 16 20 q2 14 -14 16 h-26 q-12 0 -14 -4" fill="#D6D3D1" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </g>
  ),

  /* ---- W3 Keyboard Kingdom (Phase 3) — letter friends ---- */
  amrood: (
    <g>
      <circle cx="50" cy="55" r="26" fill="#BEF264" stroke={INK} strokeWidth="3" />
      <circle cx="44" cy="50" r="7" fill="#DCFCA7" opacity="0.8" />
      <path d="M50 30 q2 -10 12 -12" stroke="#8B5E3C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M56 20 q10 -6 14 2 q-8 8 -14 -2" fill="#22C55E" stroke={INK} strokeWidth="2" />
    </g>
  ),
  ball: (
    <g>
      <circle cx="50" cy="52" r="27" fill="#FFFFFF" stroke={INK} strokeWidth="3" />
      <path d="M50 32 l11 8 -4 13 h-14 l-4 -13 Z" fill={INK} />
      <path d="M50 25 v7 M61 40 l12 -4 M57 53 l8 11 M43 53 l-8 11 M39 40 l-12 -4" stroke={INK} strokeWidth="2.5" />
    </g>
  ),
  dhol: (
    <g>
      <ellipse cx="50" cy="42" rx="28" ry="12" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M22 42 v22 q0 10 28 10 q28 0 28 -10 V42" fill="#C68B4E" stroke={INK} strokeWidth="3" />
      <path d="M30 48 l40 26 M70 48 l-40 26" stroke="#8B5E3C" strokeWidth="3" />
      <ellipse cx="50" cy="42" rx="28" ry="12" fill="none" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="40" r="2.5" fill={INK} /><circle cx="62" cy="40" r="2.5" fill={INK} />
    </g>
  ),
  fish: (
    <g>
      <ellipse cx="44" cy="55" rx="24" ry="15" fill="#FDE047" stroke={INK} strokeWidth="3" />
      <path d="M66 55 l16 -10 v20 Z" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <circle cx="32" cy="50" r="3" fill={INK} />
      <path d="M40 44 q6 4 12 0 M40 66 q6 -4 12 0" stroke={INK} strokeWidth="2" fill="none" />
    </g>
  ),
  gubbara: (
    <g>
      <ellipse cx="50" cy="42" rx="22" ry="26" fill="#F472B6" stroke={INK} strokeWidth="3" />
      <path d="M50 16 v-6 M40 20 q10 8 20 0 M34 42 q4 14 16 24 M66 42 q-4 14 -16 24" stroke="#BE185D" strokeWidth="2" fill="none" />
      <path d="M48 68 q2 8 -2 14 q-2 6 4 8" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="42" cy="32" rx="6" ry="9" fill="#FBCFE8" opacity="0.85" />
    </g>
  ),
  haathi: (
    <g>
      <ellipse cx="48" cy="58" rx="30" ry="20" fill="#B8B1AD" stroke={INK} strokeWidth="3" />
      <circle cx="72" cy="40" r="15" fill="#B8B1AD" stroke={INK} strokeWidth="3" />
      <path d="M84 42 q10 4 8 16 q-2 10 -12 10 q-4 0 -4 -6" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <circle cx="70" cy="37" r="2.5" fill={INK} />
      <path d="M28 76 v8 M44 76 v8 M60 76 v8 M72 74 v8" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M60 26 q8 -10 14 -4" stroke={INK} strokeWidth="2.5" fill="none" />
    </g>
  ),
  icecream: (
    <g>
      <path d="M36 42 L50 82 L64 42 Z" fill="#E8A25D" stroke={INK} strokeWidth="3" />
      <path d="M40 56 h20 M44 68 h12" stroke={INK} strokeWidth="1.8" />
      <circle cx="42" cy="36" r="11" fill="#F9A8D4" stroke={INK} strokeWidth="2.5" />
      <circle cx="57" cy="33" r="12" fill="#FDE68A" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="26" r="10" fill="#A7F3D0" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="14" r="3.5" fill="#EF4444" stroke={INK} strokeWidth="1.5" />
    </g>
  ),
  jahaz: (
    <g>
      <ellipse cx="48" cy="55" rx="32" ry="11" fill="#93C5FD" stroke={INK} strokeWidth="3" />
      <path d="M40 48 L54 22 L62 24 L52 48 Z" fill="#3B82F6" stroke={INK} strokeWidth="2.5" />
      <path d="M42 62 L56 80 L64 78 L54 60 Z" fill="#3B82F6" stroke={INK} strokeWidth="2.5" />
      <path d="M76 50 l10 -6 v16 Z" fill="#1D4ED8" stroke={INK} strokeWidth="2" />
      <circle cx="30" cy="53" r="2.5" fill={INK} /><circle cx="40" cy="53" r="2.5" fill={INK} />
      <circle cx="70" cy="53" r="2.5" fill={INK} />
    </g>
  ),
  laddu: (
    <g>
      <circle cx="50" cy="54" r="26" fill="#FBBF24" stroke={INK} strokeWidth="3" />
      <circle cx="41" cy="46" r="2.5" fill="#D97706" /><circle cx="58" cy="50" r="2.5" fill="#D97706" />
      <circle cx="50" cy="62" r="2.5" fill="#D97706" /><circle cx="62" cy="64" r="2" fill="#D97706" />
      <circle cx="38" cy="60" r="2" fill="#D97706" /><circle cx="50" cy="42" r="2" fill="#D97706" />
      <path d="M36 40 q8 -10 22 -6" stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  ),
  naariyal: (
    <g>
      <circle cx="50" cy="55" r="25" fill="#92603A" stroke={INK} strokeWidth="3" />
      <path d="M34 46 q16 -8 32 0 M32 58 q18 -6 36 0 M36 70 q14 6 28 0" stroke="#6B3F22" strokeWidth="2.5" fill="none" />
      <circle cx="42" cy="54" r="3" fill={INK} /><circle cx="56" cy="58" r="3" fill={INK} /><circle cx="50" cy="46" r="3" fill={INK} />
      <path d="M50 30 q0 -10 10 -14" stroke="#16A34A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M60 16 q12 -4 14 6 q-10 6 -14 -6" fill="#22C55E" stroke={INK} strokeWidth="2" />
    </g>
  ),
  orange: (
    <g>
      <circle cx="50" cy="56" r="26" fill="#FB923C" stroke={INK} strokeWidth="3" />
      <circle cx="42" cy="48" r="6" fill="#FED7AA" opacity="0.8" />
      <path d="M50 30 q1 -8 8 -10" stroke="#8B5E3C" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M54 20 q12 -6 16 4 q-10 8 -16 -4" fill="#22C55E" stroke={INK} strokeWidth="2" />
      <circle cx="58" cy="64" r="2" fill="#C2410C" /><circle cx="44" cy="62" r="2" fill="#C2410C" /><circle cx="52" cy="70" r="2" fill="#C2410C" />
    </g>
  ),
  poster: (
    <g>
      <rect x="24" y="14" width="52" height="72" rx="5" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <rect x="30" y="22" width="40" height="14" rx="3" fill="#FDE68A" stroke={INK} strokeWidth="1.8" />
      <path d="M50 44 l4.5 9 10 1.5 -7 7 1.6 10 -9.1 -4.8 -9.1 4.8 1.6 -10 -7 -7 10 -1.5 Z" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      <path d="M32 82 h36" stroke="#B9AC98" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
  qalam: (
    <g>
      <path d="M30 78 L38 56 L64 22 q6 -6 11 -1 q5 5 -1 11 L40 66 Z" fill="#F6EBD8" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 78 l8 -22 10 10 Z" fill={INK} />
      <path d="M56 30 l10 10" stroke={INK} strokeWidth="2.5" />
      <path d="M26 84 q10 -4 16 -10" stroke="#0D9488" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  rickshaw: (
    <g>
      <path d="M22 44 q0 -14 16 -14 h14 q22 0 26 20 l2 12 q0 8 -8 8 H30 q-8 0 -8 -8 Z" fill="#FDE047" stroke={INK} strokeWidth="3" />
      <path d="M52 32 v36 M52 44 h26" stroke={INK} strokeWidth="2.5" />
      <rect x="56" y="36" width="18" height="16" rx="2" fill="#C8ECF9" stroke={INK} strokeWidth="2" />
      <circle cx="34" cy="74" r="8" fill="#4A3421" /><circle cx="34" cy="74" r="3" fill="#FFF8EC" />
      <circle cx="68" cy="74" r="8" fill="#4A3421" /><circle cx="68" cy="74" r="3" fill="#FFF8EC" />
    </g>
  ),
  train: (
    <g>
      <rect x="18" y="34" width="52" height="38" rx="7" fill="#EF4444" stroke={INK} strokeWidth="3" />
      <rect x="26" y="42" width="18" height="14" rx="2" fill="#C8ECF9" stroke={INK} strokeWidth="2" />
      <rect x="70" y="48" width="14" height="24" rx="3" fill="#B91C1C" stroke={INK} strokeWidth="3" />
      <rect x="73" y="38" width="8" height="10" rx="2" fill={INK} />
      <circle cx="34" cy="76" r="8" fill="#4A3421" /><circle cx="34" cy="76" r="3" fill="#FFF8EC" />
      <circle cx="56" cy="76" r="8" fill="#4A3421" /><circle cx="56" cy="76" r="3" fill="#FFF8EC" />
      <circle cx="76" cy="76" r="6" fill="#4A3421" />
      <path d="M14 30 h24" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  umbrella: (
    <g>
      <path d="M50 22 q-28 0 -30 26 q10 -6 15 0 q8 -7 15 0 q7 -7 15 0 q5 -6 15 0 q-2 -26 -30 -26" fill="#EF4444" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 22 v-8" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M50 48 v26 q0 8 -8 8 q-7 0 -7 -7" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M30 32 q20 -6 40 0 M38 26 q12 -4 24 0" stroke="#FCA5A5" strokeWidth="2.5" fill="none" />
    </g>
  ),
  van: (
    <g>
      <path d="M16 42 q0 -10 10 -10 h30 q10 0 16 8 l8 10 q4 6 -2 8 H20 q-6 0 -6 -6 Z" fill="#60A5FA" stroke={INK} strokeWidth="3" />
      <rect x="28" y="38" width="14" height="12" rx="2" fill="#C8ECF9" stroke={INK} strokeWidth="2" />
      <rect x="48" y="38" width="12" height="12" rx="2" fill="#C8ECF9" stroke={INK} strokeWidth="2" />
      <circle cx="30" cy="70" r="8" fill="#4A3421" /><circle cx="30" cy="70" r="3" fill="#FFF8EC" />
      <circle cx="62" cy="70" r="8" fill="#4A3421" /><circle cx="62" cy="70" r="3" fill="#FFF8EC" />
      <path d="M12 54 h60" stroke={INK} strokeWidth="2" />
    </g>
  ),
  watch: (
    <g>
      <rect x="42" y="12" width="16" height="18" rx="4" fill="#8B5CF6" stroke={INK} strokeWidth="2.5" />
      <rect x="42" y="70" width="16" height="18" rx="4" fill="#8B5CF6" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="24" fill="#FFF8EC" stroke={INK} strokeWidth="3.5" />
      <circle cx="50" cy="50" r="24" fill="none" stroke="#FDE68A" strokeWidth="4" />
      <path d="M50 50 V36 M50 50 l10 6" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="2.5" fill={INK} />
      <circle cx="74" cy="46" r="3" fill={INK} />
    </g>
  ),
  xylophone: (
    <g>
      <path d="M20 30 L80 26 M20 72 L80 70" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={24 + i * 11} y={30 - i * 2} width="8" height={40 + i * 2} rx="4"
          fill={["#EF4444", "#F59E0B", "#FDE047", "#22C55E", "#3B82F6"][i]} stroke={INK} strokeWidth="2" />
      ))}
      <circle cx="78" cy="22" r="4" fill="#FBBF24" stroke={INK} strokeWidth="1.5" />
    </g>
  ),
  yoyo: (
    <g>
      <circle cx="50" cy="58" r="24" fill="#F472B6" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="58" r="9" fill="#FFF8EC" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="58" r="3" fill={INK} />
      <path d="M50 49 q-2 -20 -18 -26 q-8 -3 -10 4" stroke="#0D9488" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="38" r="5" fill="#0D9488" stroke={INK} strokeWidth="2" />
    </g>
  ),
  zebra: (
    <g>
      <ellipse cx="46" cy="58" rx="28" ry="18" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M28 44 q4 14 2 26 M42 40 q2 16 0 34 M56 42 q0 14 2 30 M68 48 q-2 10 0 20" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="74" cy="36" r="12" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M70 26 q-2 -8 4 -8 M78 26 q2 -8 -4 -8" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="78" cy="34" r="2" fill={INK} />
      <path d="M84 38 q6 2 4 8" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M26 76 v8 M42 76 v8 M58 76 v8 M70 74 v8" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M18 50 q-6 6 -2 14" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  lattu: (
    <g>
      <path d="M50 16 l10 12 -10 10 -10 -10 Z" fill="#0D9488" stroke={INK} strokeWidth="2.5" />
      <path d="M40 36 q-8 16 10 26 q18 -10 10 -26 Z" fill="#F59E0B" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 40 h16 M44 50 h12" stroke="#B45309" strokeWidth="2.5" />
      <path d="M50 62 v10" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="50" cy="78" r="3.5" fill={INK} />
      <path d="M62 24 q10 -2 12 6" stroke="#9CA3AF" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
    </g>
  ),
  "posture-good": (
    <g>
      <circle cx="50" cy="26" r="11" fill="#F2C79B" stroke={INK} strokeWidth="3" />
      <path d="M50 37 v22" stroke="#0D9488" strokeWidth="10" strokeLinecap="round" />
      <path d="M50 42 l-12 8 M50 42 l12 8" stroke="#F2C79B" strokeWidth="6" strokeLinecap="round" />
      <rect x="36" y="58" width="28" height="10" rx="5" fill="#3B82F6" stroke={INK} strokeWidth="2.5" />
      <path d="M40 66 v14 M60 66 v14" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M34 44 q-6 10 4 16" stroke="#8B5E3C" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M40 80 h20" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  "posture-slouch": (
    <g>
      <circle cx="62" cy="40" r="11" fill="#F2C79B" stroke={INK} strokeWidth="3" />
      <path d="M60 50 q-14 4 -18 16" stroke="#0D9488" strokeWidth="10" strokeLinecap="round" fill="none" />
      <rect x="28" y="64" width="28" height="10" rx="5" fill="#3B82F6" stroke={INK} strokeWidth="2.5" />
      <path d="M34 74 v10 M50 74 v10" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M66 52 l10 6" stroke="#F2C79B" strokeWidth="6" strokeLinecap="round" />
      <path d="M76 34 q4 4 0 8" stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),
  "posture-feetup": (
    <g>
      <circle cx="50" cy="26" r="11" fill="#F2C79B" stroke={INK} strokeWidth="3" />
      <path d="M50 37 v20" stroke="#0D9488" strokeWidth="10" strokeLinecap="round" />
      <rect x="34" y="56" width="30" height="10" rx="5" fill="#3B82F6" stroke={INK} strokeWidth="2.5" />
      <path d="M40 66 l-6 8 M60 66 l14 10" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M74 76 l10 -4" stroke="#8B5E3C" strokeWidth="6" strokeLinecap="round" />
      <path d="M78 62 q4 6 0 10 M84 60 q5 6 0 10" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  "posture-tooclose": (
    <g>
      <circle cx="58" cy="34" r="11" fill="#F2C79B" stroke={INK} strokeWidth="3" />
      <path d="M58 45 q-8 8 -10 18" stroke="#0D9488" strokeWidth="10" strokeLinecap="round" fill="none" />
      <rect x="30" y="62" width="28" height="10" rx="5" fill="#3B82F6" stroke={INK} strokeWidth="2.5" />
      <path d="M36 72 v10 M52 72 v10" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <rect x="6" y="26" width="24" height="20" rx="3" fill="#4A3421" stroke={INK} strokeWidth="2.5" />
      <rect x="9" y="29" width="18" height="14" rx="2" fill="#93C5FD" />
      <path d="M70 26 q6 4 2 10 M76 22 q8 6 2 14" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  ),
  "space-carpet": (
    <g>
      <path d="M14 58 q36 -18 72 0 q-36 14 -72 0 Z" fill="#8B5CF6" stroke={INK} strokeWidth="3" />
      <path d="M22 56 q28 -12 56 0 M26 60 q24 10 48 0" stroke="#C4B5FD" strokeWidth="2.5" fill="none" />
      <circle cx="30" cy="57" r="3" fill="#FDE047" /><circle cx="50" cy="54" r="3" fill="#FDE047" /><circle cx="70" cy="57" r="3" fill="#FDE047" />
      <path d="M14 58 l-6 6 M86 58 l6 6" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  "enter-door": (
    <g>
      <rect x="28" y="16" width="44" height="72" rx="6" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <rect x="34" y="22" width="32" height="60" rx="4" fill="#DCFCE7" stroke={INK} strokeWidth="2" />
      <circle cx="60" cy="52" r="4" fill={INK} />
      <path d="M40 34 h20 M40 42 h20" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 50 h10 M12 44 l8 6 -8 6" stroke="#16A34A" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  "magic-eraser": (
    <g>
      <rect x="26" y="36" width="48" height="30" rx="8" transform="rotate(-18 50 50)" fill="#F472B6" stroke={INK} strokeWidth="3" />
      <path d="M32 52 l30 -10" stroke="#FFF8EC" strokeWidth="8" strokeLinecap="round" transform="rotate(-18 50 50)" />
      <path d="M20 78 q14 -6 28 0 q14 6 30 -2" stroke="#93C5FD" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M46 18 l4 -8 M56 22 l6 -6" stroke="#FDE047" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),

  /* ---- W4 Control City — files & folders ---- */
  folder: (
    <g>
      <path d="M16 30 h26 l8 10 h34 a6 6 0 0 1 6 6 v34 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 V36 a6 6 0 0 1 6 -6 Z" fill="#60A5FA" stroke={INK} strokeWidth="3" />
      <path d="M10 46 h80 v34 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 Z" fill="#93C5FD" stroke={INK} strokeWidth="3" />
    </g>
  ),
  "folder-open": (
    <g>
      <path d="M16 30 h26 l8 10 h34 a6 6 0 0 1 6 6 v10 H12 V36 a6 6 0 0 1 4 -6 Z" fill="#60A5FA" stroke={INK} strokeWidth="3" />
      <path d="M8 56 h78 l10 -6 -8 32 a6 6 0 0 1 -6 5 H16 a6 6 0 0 1 -6 -6 Z" fill="#BFDBFE" stroke={INK} strokeWidth="3" />
      <rect x="30" y="60" width="18" height="14" rx="2" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
    </g>
  ),
  "file-doc": (
    <g>
      <path d="M28 12 h30 l16 16 v58 a4 4 0 0 1 -4 4 H28 a4 4 0 0 1 -4 -4 V16 a4 4 0 0 1 4 -4 Z" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M58 12 v16 h16" fill="none" stroke={INK} strokeWidth="3" />
      <path d="M34 44 h32 M34 54 h32 M34 64 h22" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  "file-img": (
    <g>
      <path d="M28 12 h30 l16 16 v58 a4 4 0 0 1 -4 4 H28 a4 4 0 0 1 -4 -4 V16 a4 4 0 0 1 4 -4 Z" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M58 12 v16 h16" fill="none" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="42" r="5" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
      <path d="M30 74 l14 -16 10 10 8 -8 10 14 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
    </g>
  ),
  "file-song": (
    <g>
      <path d="M28 12 h30 l16 16 v58 a4 4 0 0 1 -4 4 H28 a4 4 0 0 1 -4 -4 V16 a4 4 0 0 1 4 -4 Z" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M58 12 v16 h16" fill="none" stroke={INK} strokeWidth="3" />
      <path d="M46 68 v-20 l14 -4 v18" fill="none" stroke="#EC4899" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="42" cy="68" r="5" fill="#EC4899" stroke={INK} strokeWidth="1.5" />
      <circle cx="56" cy="62" r="5" fill="#EC4899" stroke={INK} strokeWidth="1.5" />
    </g>
  ),
  "recycle-bin": (
    <g>
      <path d="M26 30 h48 l-5 52 a6 6 0 0 1 -6 5 H37 a6 6 0 0 1 -6 -5 Z" fill="#A7F3D0" stroke={INK} strokeWidth="3" />
      <rect x="20" y="22" width="60" height="9" rx="4" fill="#22C55E" stroke={INK} strokeWidth="2.5" />
      <path d="M40 14 h20 v8 h-20 Z" fill="#22C55E" stroke={INK} strokeWidth="2.5" />
      <path d="M40 44 l-5 8 M44 44 l5 8 M52 46 l-8 12 M44 62 l10 -6" stroke="#059669" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  ),
  "save-floppy": (
    <g>
      <rect x="18" y="18" width="64" height="64" rx="6" fill="#38BDF8" stroke={INK} strokeWidth="3" />
      <rect x="32" y="18" width="30" height="26" rx="2" fill="#FFF8EC" stroke={INK} strokeWidth="2.5" />
      <rect x="40" y="22" width="14" height="14" fill="#38BDF8" stroke={INK} strokeWidth="1.5" />
      <rect x="28" y="56" width="44" height="24" rx="3" fill="#FFF8EC" stroke={INK} strokeWidth="2.5" />
      <path d="M34 64 h30 M34 72 h22" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),

  /* ---- W5 Creative Workshop — paint tools ---- */
  "paint-brush": (
    <g>
      <path d="M62 14 L78 30 44 60 34 50 Z" fill="#F59E0B" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M34 50 L44 60 q-2 12 -12 14 q-10 2 -18 -2 q6 -4 6 -12 q0 -10 12 -12 q6 -2 12 8 Z" fill="#4A3421" stroke={INK} strokeWidth="2.5" />
      <path d="M26 66 q-6 10 -16 12" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>
  ),
  "paint-bucket": (
    <g>
      <path d="M24 44 L52 20 82 48 54 74 Z" fill="#0D9488" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 44 L54 74 66 62" fill="none" stroke={INK} strokeWidth="3" />
      <path d="M78 62 q6 8 0 14 q-6 -6 0 -14" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <circle cx="52" cy="46" r="7" fill="#FDE68A" stroke={INK} strokeWidth="2" />
    </g>
  ),
  pencil: (
    <g>
      <path d="M26 74 L64 20 l14 10 -38 54 -18 6 Z" fill="#FDE68A" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M58 28 l14 10" stroke={INK} strokeWidth="3" />
      <path d="M26 74 l-6 12 12 -5 Z" fill={INK} />
    </g>
  ),
  "shape-star": (
    <g>
      <path d="M50 12 l10.5 22 24 3 -17.5 16.5 4.5 23.5 L50 65 28.5 77 33 53.5 15.5 37 39.5 34 Z" fill="#FDE047" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </g>
  ),
  "shape-heart": (
    <g>
      <path d="M50 80 C20 58 14 40 24 28 q12 -12 26 4 q14 -16 26 -4 q10 12 -2 30 q-8 12 -24 22 Z" fill="#EC4899" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </g>
  ),
  "undo-arrow": (
    <g>
      <path d="M30 38 a26 26 0 1 1 -8 40" fill="none" stroke="#0D9488" strokeWidth="8" strokeLinecap="round" />
      <path d="M14 26 l4 26 24 -8 Z" fill="#0D9488" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </g>
  ),
  "text-tool": (
    <g>
      <path d="M20 22 h44 M42 22 v56 M30 78 h24" fill="none" stroke="#8B5CF6" strokeWidth="9" strokeLinecap="round" />
    </g>
  ),
  easel: (
    <g>
      <path d="M28 84 L46 22 M72 84 L54 22 M50 40 v0" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      <rect x="24" y="22" width="52" height="36" rx="3" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="34" r="5" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M30 52 l10 -10 8 6 8 -9 10 13 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
      <path d="M38 58 v26 M62 58 v26 M50 62 v22" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
    </g>
  ),

  /* ---- W6 Internet Bazaar — web & safety ---- */
  "globe-net": (
    <g>
      <circle cx="50" cy="50" r="36" fill="#38BDF8" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="50" rx="16" ry="36" fill="none" stroke="#FFF8EC" strokeWidth="3" />
      <path d="M14 50 h72 M22 30 h56 M22 70 h56" fill="none" stroke="#FFF8EC" strokeWidth="3" />
    </g>
  ),
  browser: (
    <g>
      <rect x="12" y="20" width="76" height="60" rx="8" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M12 36 h76" stroke={INK} strokeWidth="2.5" />
      <circle cx="22" cy="28" r="3" fill="#EC4899" /><circle cx="32" cy="28" r="3" fill="#FDE047" /><circle cx="42" cy="28" r="3" fill="#22C55E" />
      <path d="M20 46 h34 a4 4 0 0 1 4 4 v6 a4 4 0 0 1 -4 4 H20 a4 4 0 0 1 -4 -4 v-6 a4 4 0 0 1 4 -4 Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="2" />
      <rect x="60" y="48" width="20" height="12" rx="2" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
      <path d="M20 70 h60 M20 76 h40" stroke="#C68B4E" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  "link-chain": (
    <g>
      <rect x="14" y="42" width="34" height="17" rx="9" transform="rotate(-35 31 50)" fill="none" stroke="#0D9488" strokeWidth="6" />
      <rect x="52" y="42" width="34" height="17" rx="9" transform="rotate(-35 69 50)" fill="none" stroke="#F59E0B" strokeWidth="6" />
      <rect x="38" y="42" width="24" height="17" rx="9" transform="rotate(-35 50 50)" fill="none" stroke={INK} strokeWidth="4" />
    </g>
  ),
  "shield-safe": (
    <g>
      <path d="M50 10 L84 24 v22 q0 26 -34 44 Q16 72 16 46 V24 Z" fill="#22C55E" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 48 l10 10 20 -22" fill="none" stroke="#FFF8EC" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  "key-password": (
    <g>
      <circle cx="32" cy="40" r="16" fill="none" stroke="#F59E0B" strokeWidth="8" />
      <path d="M43 52 L74 82 M64 72 l10 -10 M70 78 l10 -10" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round" />
    </g>
  ),
  "letter-message": (
    <g>
      <rect x="14" y="26" width="72" height="48" rx="6" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path d="M14 30 L50 56 86 30" fill="none" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="72" cy="30" r="10" fill="#EC4899" stroke={INK} strokeWidth="2.5" />
      <text x="72" y="34" fontSize="13" fontWeight="800" textAnchor="middle" fill="#FFF" fontFamily="Arial">!</text>
    </g>
  ),
  "bazaar-stall": (
    <g>
      <rect x="16" y="42" width="68" height="42" rx="3" fill="#F59E0B" stroke={INK} strokeWidth="3" />
      {[0, 1, 2, 3].map((s) => (
        <path key={s} d={`M${16 + s * 17} 22 h17 v12 q-8.5 8 -17 0 Z`} fill={s % 2 ? "#0D9488" : "#FFF8EC"} stroke={INK} strokeWidth="2" />
      ))}
      <rect x="16" y="20" width="68" height="5" fill="#8B5E3C" />
      <path d="M24 42 v42 M76 42 v42" stroke="#8B5E3C" strokeWidth="4" />
      <circle cx="38" cy="56" r="6" fill="#EC4899" stroke={INK} strokeWidth="1.5" />
      <rect x="52" y="50" width="16" height="12" rx="2" fill="#38BDF8" stroke={INK} strokeWidth="1.5" />
      <path d="M24 74 h52" stroke="#8B5E3C" strokeWidth="2" />
    </g>
  ),

  /* ---- W7 Logic Jungle — thinking ---- */
  "pattern-blocks": (
    <g>
      <rect x="12" y="38" width="20" height="20" rx="4" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <circle cx="47" cy="48" r="10" fill="#0D9488" stroke={INK} strokeWidth="2.5" />
      <rect x="62" y="38" width="20" height="20" rx="4" fill="#F59E0B" stroke={INK} strokeWidth="2.5" />
      <path d="M86 40 l6 8 -6 8 -6 -8 Z" fill="#EC4899" stroke={INK} strokeWidth="2" />
      <text x="50" y="82" fontSize="22" fontWeight="800" textAnchor="middle" fill={INK} fontFamily="Arial">?</text>
    </g>
  ),
  "loop-arrow": (
    <g>
      <path d="M28 62 a24 24 0 1 1 44 0 q-6 14 -22 14" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" />
      <path d="M42 66 l-14 12 4 -20 Z" fill="#8B5CF6" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </g>
  ),
  "if-fork": (
    <g>
      <path d="M50 16 v18 M50 34 q0 8 -14 12 L22 54 M50 34 q0 8 14 12 L78 54" fill="none" stroke="#0D9488" strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="20" r="8" fill="#FDE047" stroke={INK} strokeWidth="2.5" />
      <text x="50" y="24" fontSize="10" fontWeight="800" textAnchor="middle" fill={INK} fontFamily="Arial">?</text>
      <rect x="8" y="56" width="26" height="18" rx="4" fill="#22C55E" stroke={INK} strokeWidth="2.5" />
      <rect x="66" y="56" width="26" height="18" rx="4" fill="#EC4899" stroke={INK} strokeWidth="2.5" />
    </g>
  ),
  "glitch-bug": (
    <g>
      <ellipse cx="50" cy="56" rx="20" ry="16" fill="#F472B6" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="34" r="10" fill="#F472B6" stroke={INK} strokeWidth="3" />
      <path d="M36 48 l-12 -8 M64 48 l12 -8 M34 60 h-14 M66 60 h14 M38 70 l-10 10 M62 70 l10 10" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M44 32 l4 4 8 -8" stroke="#FFF8EC" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  ),

  /* ---- W8 Story Mountain — block coding ---- */
  "block-cmd": (
    <g>
      <rect x="10" y="32" width="80" height="32" rx="10" fill="#F59E0B" stroke={INK} strokeWidth="3" />
      <rect x="10" y="58" width="10" height="8" rx="2" fill="#B45309" />
      <circle cx="28" cy="48" r="8" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <path d="M26 48 l4 -3 v6 Z" fill={INK} />
      <path d="M44 44 h34 M44 52 h24" stroke="#FFF8EC" strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  "block-loop": (
    <g>
      <rect x="10" y="32" width="80" height="32" rx="10" fill="#8B5CF6" stroke={INK} strokeWidth="3" />
      <path d="M32 48 a14 14 0 1 1 6 12" fill="none" stroke="#FFF8EC" strokeWidth="5" strokeLinecap="round" />
      <path d="M32 40 l-6 10 12 2 Z" fill="#FFF8EC" />
      <path d="M62 44 h18 M62 52 h12" stroke="#EDE9FE" strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  "block-flag": (
    <g>
      <rect x="10" y="32" width="80" height="32" rx="10" fill="#22C55E" stroke={INK} strokeWidth="3" />
      <path d="M30 40 v18" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M30 40 h16 l-5 5 5 5 h-16" fill="#FFF8EC" stroke={INK} strokeWidth="1.5" />
      <path d="M56 44 h24 M56 52 h16" stroke="#DCFCE7" strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  rocket: (
    <g>
      <path d="M50 8 q16 14 16 40 l-6 14 h-20 l-6 -14 q0 -26 16 -40 Z" fill="#FFF8EC" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="50" cy="36" r="8" fill="#38BDF8" stroke={INK} strokeWidth="2.5" />
      <path d="M30 56 l-10 16 16 -6 Z M70 56 l10 16 -16 -6 Z" fill="#EC4899" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M44 64 q6 14 6 22 q0 -8 6 -22" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
    </g>
  ),
};

/* SHOW-phase & medal visual aliases (must run after ICONS is initialized) */
Object.assign(ICONS, {
  "medal-mouse": ICONS.mouse,
  "medal-keyboard": ICONS.keyboard,
  "gem": ICONS["medal-gem"],
  "show-phone": ICONS.phone,
  "show-calculator": ICONS.calculator,
  "show-atm": ICONS.atm,
  "show-laptop": ICONS.laptop,
  "show-part-monitor": ICONS.monitor,
  "show-part-cpu": ICONS["cpu-box"],
  "show-part-keyboard": ICONS.keyboard,
  "show-part-mouse": ICONS.mouse,
  "show-rule-clean-hands": ICONS["clean-hands"],
  "show-rule-gentle-touch": ICONS["gentle-touch"],
  "show-rule-no-food": ICONS["no-food"],
  "show-rule-ask-first": ICONS["ask-first"],
});
// (the null placeholder entries were overwritten by the aliases above)

/* Scene backgrounds (400×225 viewBox) */
const SCENES: Record<string, React.ReactNode> = {
  "bg-storeroom": (
    <g>
      <rect width="400" height="225" fill="#F3E5C8" />
      <rect x="0" y="168" width="400" height="57" fill="#D9C49A" />
      {/* mud-brick wall */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={col * 52 + (row % 2 ? 26 : 0) - 26}
            y={row * 30}
            width="48"
            height="26"
            rx="3"
            fill={row % 2 ? "#EBDAB4" : "#E4D0A5"}
            stroke="#D9C49A"
            strokeWidth="1.5"
          />
        ))
      )}
      {/* shelf */}
      <rect x="290" y="70" width="90" height="8" rx="3" fill="#8B5E3C" />
      <rect x="290" y="110" width="90" height="8" rx="3" fill="#8B5E3C" />
      {/* dusty light beam */}
      <path d="M140 0 L200 0 L150 168 L110 168 Z" fill="#FFF8EC" opacity="0.55" />
    </g>
  ),
  "bg-village-street": (
    <g>
      <rect width="400" height="225" fill="#BFE8F5" />
      <circle cx="60" cy="42" r="20" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      <rect x="0" y="170" width="400" height="55" fill="#8FBF6B" />
      <rect x="0" y="170" width="400" height="8" fill="#6FA050" />
      {/* mango trees */}
      <rect x="36" y="110" width="12" height="60" fill="#8B5E3C" />
      <circle cx="42" cy="96" r="26" fill="#22C55E" stroke="#16A34A" strokeWidth="3" />
      <circle cx="30" cy="108" r="5" fill="#F59E0B" />
      <circle cx="52" cy="104" r="5" fill="#F59E0B" />
      {/* mud house */}
      <rect x="286" y="104" width="86" height="66" fill="#E4D0A5" stroke="#D9C49A" strokeWidth="2" />
      <path d="M280 104 L329 76 L378 104 Z" fill="#C68B4E" />
      <rect x="316" y="130" width="26" height="40" rx="3" fill="#8B5E3C" />
    </g>
  ),
  "bg-courtyard": (
    <g>
      <rect width="400" height="225" fill="#FFF3DC" />
      <rect x="0" y="172" width="400" height="53" fill="#E4D0A5" />
      <circle cx="70" cy="40" r="18" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      {/* charpai */}
      <rect x="270" y="140" width="110" height="14" rx="4" fill="#C68B4E" stroke="#8B5E3C" strokeWidth="2" />
      <path d="M276 154 v18 M374 154 v18 M290 154 v18 M360 154 v18" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      {/* potted plant */}
      <path d="M60 168 h34 l-6 24 h-22 Z" fill="#EC4899" stroke={INK} strokeWidth="2" />
      <circle cx="77" cy="150" r="16" fill="#22C55E" stroke="#16A34A" strokeWidth="2.5" />
    </g>
  ),
  "bg-lab": (
    <g>
      <rect width="400" height="225" fill="#EAF6FB" />
      <rect x="0" y="176" width="400" height="49" fill="#D6D3D1" />
      {/* benches */}
      <rect x="20" y="120" width="150" height="14" rx="4" fill="#C68B4E" stroke="#8B5E3C" strokeWidth="2" />
      <rect x="230" y="120" width="150" height="14" rx="4" fill="#C68B4E" stroke="#8B5E3C" strokeWidth="2" />
      <path d="M30 134 v40 M160 134 v40 M240 134 v40 M370 134 v40" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      {/* window */}
      <rect x="168" y="30" width="70" height="52" rx="4" fill="#BFE8F5" stroke="#8B5E3C" strokeWidth="3" />
      <path d="M203 30 v52 M168 56 h70" stroke="#8B5E3C" strokeWidth="2.5" />
    </g>
  ),
  /* ---- W2 Mouse Meadow scenes ---- */
  "bg-meadow": (
    <g>
      <rect width="400" height="225" fill="#C8ECF9" />
      <circle cx="330" cy="40" r="22" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      <ellipse cx="90" cy="44" rx="30" ry="12" fill="#FFFFFF" opacity="0.9" />
      <ellipse cx="150" cy="36" rx="22" ry="10" fill="#FFFFFF" opacity="0.8" />
      <path d="M0 150 Q100 118 200 142 T400 138 V225 H0 Z" fill="#8FBF6B" />
      <path d="M0 172 Q120 150 240 170 T400 168 V225 H0 Z" fill="#7DB05C" />
      {[70, 180, 300, 360].map((x, i) => (
        <g key={i}>
          <path d={`M${x} ${150 + i * 8} v16`} stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
          <circle cx={x} cy={148 + i * 8} r="6" fill={["#EC4899", "#FDE047", "#F9A8D4", "#FFFFFF"][i]} stroke="#4A3421" strokeWidth="1.5" />
        </g>
      ))}
    </g>
  ),
  "bg-pond": (
    <g>
      <rect width="400" height="225" fill="#C8ECF9" />
      <circle cx="60" cy="38" r="20" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      <rect x="0" y="150" width="400" height="75" fill="#7DB05C" />
      <ellipse cx="200" cy="185" rx="150" ry="34" fill="#38BDF8" stroke="#0EA5E9" strokeWidth="3" />
      {/* golden fish */}
      {[[150, 178], [230, 192], [280, 176]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <ellipse cx="0" cy="0" rx="14" ry="8" fill="#FDE047" stroke="#4A3421" strokeWidth="2" />
          <path d="M12 0 l10 -6 v12 Z" fill="#F59E0B" stroke="#4A3421" strokeWidth="1.5" />
          <circle cx="-7" cy="-2" r="2" fill="#4A3421" />
        </g>
      ))}
      <path d="M40 150 q4 -28 -6 -40 M52 150 q-2 -22 8 -34" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M350 150 q-4 -26 6 -38 M338 150 q2 -20 -8 -30" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>
  ),
  "bg-castle": (
    <g>
      <rect width="400" height="225" fill="#EDE4FB" />
      <rect x="0" y="170" width="400" height="55" fill="#C4B5FD" />
      {/* back towers */}
      <rect x="18" y="60" width="46" height="120" rx="4" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2.5" />
      <path d="M14 60 h54 l-27 -26 Z" fill="#7C3AED" />
      <rect x="336" y="60" width="46" height="120" rx="4" fill="#A78BFA" stroke="#7C3AED" strokeWidth="2.5" />
      <path d="M332 60 h54 l-27 -26 Z" fill="#7C3AED" />
      {/* arched windows */}
      <path d="M34 92 a7 7 0 0 1 14 0 v16 h-14 Z" fill="#FFF8EC" stroke="#7C3AED" strokeWidth="2" />
      <path d="M352 92 a7 7 0 0 1 14 0 v16 h-14 Z" fill="#FFF8EC" stroke="#7C3AED" strokeWidth="2" />
      {/* wall of key-houses */}
      <rect x="80" y="70" width="240" height="110" rx="8" fill="#DDD1F5" stroke="#7C3AED" strokeWidth="2.5" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const x = 92 + i * 28;
        return (
          <g key={i}>
            <rect x={x} y={92} width="22" height="26" rx="3" fill="#FFF8EC" stroke="#6D28D9" strokeWidth="1.8" />
            <path d={`M${x} 92 h22 l-11 -9 Z`} fill="#F59E0B" stroke="#6D28D9" strokeWidth="1.2" />
            <circle cx={x + 11} cy={106} r="2.4" fill="#6D28D9" />
          </g>
        );
      })}
      {/* banner */}
      <path d="M150 44 h100 v14 l-8 8 h-84 l-8 -8 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <circle cx="200" cy="52" r="5" fill="#FFF8EC" />
      {/* carpet path */}
      <path d="M120 225 q80 -20 160 0" fill="none" stroke="#8B5CF6" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
    </g>
  ),
  /* ---- W4 Control City scenes ---- */
  "bg-city": (
    <g>
      <rect width="400" height="225" fill="#DBEEFB" />
      <circle cx="340" cy="38" r="20" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      <ellipse cx="90" cy="40" rx="32" ry="12" fill="#FFFFFF" opacity="0.9" />
      <rect x="0" y="176" width="400" height="49" fill="#93C5FD" />
      <rect x="0" y="176" width="400" height="7" fill="#60A5FA" />
      {/* folder-shaped buildings */}
      <rect x="24" y="96" width="72" height="80" rx="6" fill="#60A5FA" stroke="#2563EB" strokeWidth="2.5" />
      <path d="M24 96 h28 l8 12 h-36 Z" fill="#3B82F6" />
      {[0, 1, 2].map((r) => [0, 1].map((c) => (
        <rect key={`${r}${c}`} x={36 + c * 26} y={112 + r * 20} width="16" height="12" rx="2" fill="#FFF8EC" stroke="#2563EB" strokeWidth="1.5" />
      )))}
      <rect x="150" y="76" width="86" height="100" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
      <path d="M150 76 h32 l9 12 h-41 Z" fill="#0EA5E9" />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
        <rect key={`${r}${c}`} x={162 + c * 22} y={94 + r * 22} width="14" height="12" rx="2" fill="#FFF8EC" stroke="#0284C7" strokeWidth="1.5" />
      )))}
      <rect x="292" y="106" width="76" height="70" rx="6" fill="#7DD3FC" stroke="#0369A1" strokeWidth="2.5" />
      <path d="M292 106 h26 l8 12 h-34 Z" fill="#0EA5E9" />
      {[0, 1].map((r) => [0, 1].map((c) => (
        <rect key={`${r}${c}`} x={304 + c * 26} y={122 + r * 22} width="16" height="12" rx="2" fill="#FFF8EC" stroke="#0369A1" strokeWidth="1.5" />
      )))}
      {/* flag on the tall tower */}
      <path d="M193 76 v-16 h20 l-6 6 6 6 h-20" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
    </g>
  ),
  /* ---- W5 Creative Workshop scenes ---- */
  "bg-workshop": (
    <g>
      <rect width="400" height="225" fill="#FFF0F6" />
      <rect x="0" y="174" width="400" height="51" fill="#F9C9DC" />
      {/* bunting */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M${10 + i * 56} 22 l28 0 l-14 18 Z`} fill={["#F59E0B", "#0D9488", "#EC4899", "#38BDF8", "#22C55E", "#8B5CF6", "#FDE68A"][i]} stroke="#4A3421" strokeWidth="1" />
      ))}
      <path d="M10 22 H398" stroke="#D9A2BC" strokeWidth="2.5" />
      {/* easel with a painting */}
      <path d="M70 170 l24 -84 M142 170 l-24 -84 M96 120 h20" stroke="#8B5E3C" strokeWidth="6" strokeLinecap="round" />
      <rect x="66" y="104" width="80" height="58" rx="4" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <circle cx="90" cy="126" r="10" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
      <path d="M80 150 q18 -18 36 0" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
      {/* ferris wheel far away */}
      <circle cx="316" cy="96" r="34" fill="none" stroke="#EC4899" strokeWidth="4" />
      {[0, 45, 90, 135].map((a) => (
        <line key={a} x1={316 - 30 * Math.cos((a * Math.PI) / 180)} y1={96 - 30 * Math.sin((a * Math.PI) / 180)} x2={316 + 30 * Math.cos((a * Math.PI) / 180)} y2={96 + 30 * Math.sin((a * Math.PI) / 180)} stroke="#F9A8D4" strokeWidth="3" />
      ))}
      {[[286, 96], [346, 96], [316, 66], [316, 126], [295, 75], [337, 117], [337, 75], [295, 117]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill={["#F59E0B", "#0D9488", "#38BDF8", "#22C55E"][i % 4]} stroke="#4A3421" strokeWidth="1.2" />
      ))}
      <path d="M282 170 h68" stroke="#8B5E3C" strokeWidth="6" strokeLinecap="round" />
    </g>
  ),
  /* ---- W6 Internet Bazaar scenes ---- */
  "bg-bazaar": (
    <g>
      <rect width="400" height="225" fill="#FFF7E0" />
      <circle cx="56" cy="36" r="18" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      <rect x="0" y="178" width="400" height="47" fill="#E4D0A5" />
      {/* striped awning stalls */}
      {[20, 160, 300].map((x, i) => (
        <g key={i}>
          <rect x={x} y="52" width="80" height="10" rx="3" fill="#8B5E3C" />
          {[0, 1, 2, 3].map((s) => (
            <path key={s} d={`M${x + s * 20} 62 h20 v12 q-10 8 -20 0 Z`} fill={s % 2 ? "#0D9488" : "#FFF8EC"} stroke="#0F766E" strokeWidth="1.5" />
          ))}
          <rect x={x + 6} y="86" width="68" height="56" rx="4" fill={["#38BDF8", "#EC4899", "#22C55E"][i]} stroke="#4A3421" strokeWidth="2" />
          <rect x={x + 14} y="96" width="52" height="20" rx="2" fill="#FFF8EC" stroke="#4A3421" strokeWidth="1.5" />
          <rect x={x + 6} y="142" width="68" height="36" fill={["#0EA5E9", "#DB2777", "#16A34A"][i]} stroke="#4A3421" strokeWidth="2" />
        </g>
      ))}
      {/* hanging lanterns */}
      {[100, 200, 260].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 22 v18`} stroke="#8B5E3C" strokeWidth="2" />
          <path d={`M${x - 7} 40 h14 l-3 12 h-8 Z`} fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        </g>
      ))}
    </g>
  ),
  /* ---- W7 Logic Jungle scenes ---- */
  "bg-jungle": (
    <g>
      <rect width="400" height="225" fill="#E8F7E4" />
      <circle cx="330" cy="42" r="20" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      <rect x="0" y="172" width="400" height="53" fill="#5EA345" />
      {/* layered canopy */}
      <circle cx="60" cy="90" r="34" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
      <circle cx="92" cy="110" r="24" fill="#16A34A" stroke="#15803D" strokeWidth="2.5" />
      <circle cx="352" cy="86" r="30" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
      <circle cx="318" cy="112" r="22" fill="#16A34A" stroke="#15803D" strokeWidth="2.5" />
      {/* vines */}
      <path d="M130 0 q14 34 2 66 M150 0 q-10 40 6 74" stroke="#15803D" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* thinking gems on the path */}
      {[[180, 186], [238, 176], [292, 190]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 9} l9 6 l-9 12 l-9 -12 Z`} fill={["#38BDF8", "#A78BFA", "#F472B6"][i]} stroke="#4A3421" strokeWidth="2" />
      ))}
      {/* fireflies */}
      {[[110, 140], [206, 128], [268, 150], [340, 140]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.2" />
      ))}
    </g>
  ),
  /* ---- W8 Story Mountain scenes ---- */
  "bg-mountain": (
    <g>
      <rect width="400" height="225" fill="#E3F2FD" />
      <circle cx="66" cy="40" r="20" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
      <ellipse cx="250" cy="46" rx="36" ry="12" fill="#FFFFFF" opacity="0.9" />
      {/* far peak */}
      <path d="M180 178 L268 60 L356 178 Z" fill="#B8CFF2" stroke="#8FB0E0" strokeWidth="2" />
      {/* main peak with snow cap */}
      <path d="M60 180 L180 34 L300 180 Z" fill="#94A9D6" stroke="#6480B8" strokeWidth="2.5" />
      <path d="M154 66 L180 34 L206 66 L192 78 L180 62 L168 78 Z" fill="#FFFFFF" stroke="#D7E4F7" strokeWidth="2" />
      {/* summit flag */}
      <path d="M180 34 v-18" stroke="#8B5E3C" strokeWidth="3" />
      <path d="M180 16 h22 l-7 7 7 7 h-22" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      {/* winding climb path with story stars */}
      <path d="M30 200 Q120 176 150 148 T240 108 Q300 84 332 64" fill="none" stroke="#FDE68A" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
      {[[110, 178], [190, 128], [268, 96], [326, 62]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 8} l2.6 5.4 6 .7 -4.4 4.1 1.2 5.8 -5.4 -3 -5.4 3 1.2 -5.8 -4.4 -4.1 6 -.7 Z`} fill="#F59E0B" stroke="#B45309" strokeWidth="1.2" />
      ))}
      <rect x="0" y="196" width="400" height="29" fill="#7DB05C" />
    </g>
  ),
};

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
  const icon = ICONS[id];
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
