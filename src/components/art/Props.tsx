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
};

export function Art({ id, size = 64, className }: ArtProps) {
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
