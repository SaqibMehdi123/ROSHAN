import type { ReactNode } from "react";

const INK = "#4A3421";

/** FILES / FOLDER / PAINT icon set — "Friendly Realism" v3 (docs/02) */
export const FILES_ICONS: Record<string, ReactNode> = {
  /* ------------------------------ FILES & FOLDERS ------------------------------ */

  /** closed manila document folder — tab top-right, white sheets inside */
  folder: (
    <g>
      <defs>
        <linearGradient id="fld-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9D06B" />
          <stop offset="1" stopColor="#F0BC4C" />
        </linearGradient>
        <linearGradient id="fld-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6C453" />
          <stop offset="1" stopColor="#E5A93C" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="5.5" fill="rgba(74,52,33,0.10)" />
      {/* back panel with top-right tab */}
      <path
        d="M16 34 h42 v-11 h22 l3 11 a6 6 0 0 1 6 6 v38 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 V40 a6 6 0 0 1 6 -6 Z"
        fill="url(#fld-back)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* paper sheets peeking above the front panel */}
      <rect x="19" y="38" width="58" height="26" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="2" />
      <rect x="25" y="42" width="46" height="22" rx="2" fill="#F6EFE0" stroke="#D9CDB8" strokeWidth="1.5" />
      {/* front panel */}
      <path
        d="M10 52 h80 v26 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 Z"
        fill="url(#fld-front)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M16 58 h68" stroke="#E0AC47" strokeWidth="2" opacity="0.7" />
      <path
        d="M18 62 q14 -5 30 0 q14 4 30 -2"
        stroke="#FFF8EC"
        strokeWidth="2.5"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />
    </g>
  ),

  /** open folder — flap down, three fanned sheets, one with text lines */
  "folder-open": (
    <g>
      <defs>
        <linearGradient id="fldo-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9D06B" />
          <stop offset="1" stopColor="#EDB84A" />
        </linearGradient>
        <linearGradient id="fldo-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6C453" />
          <stop offset="1" stopColor="#E2A638" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="89" rx="32" ry="5.5" fill="rgba(74,52,33,0.10)" />
      {/* back panel with tab */}
      <path
        d="M16 30 h42 v-18 h22 l3 18 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 H16 a6 6 0 0 1 -6 -6 V36 a6 6 0 0 1 6 -6 Z"
        fill="url(#fldo-back)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* three fanned sheets leaning inside */}
      <rect x="14" y="26" width="32" height="40" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="2" transform="rotate(-9 30 46)" />
      <rect x="54" y="26" width="32" height="40" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="2" transform="rotate(9 70 46)" />
      <rect x="33" y="20" width="34" height="46" rx="2" fill="#FFF8EC" stroke={INK} strokeWidth="2" />
      <path d="M39 32 h22 M39 41 h22 M39 50 h22 M39 59 h15" stroke="#C9BCA4" strokeWidth="2" strokeLinecap="round" />
      {/* front flap rotated down toward the viewer */}
      <path
        d="M10 58 h80 l5 18 a5 5 0 0 1 -5 6 H10 a5 5 0 0 1 -5 -6 Z"
        fill="url(#fldo-front)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M14 68 h72" stroke="#E0AC47" strokeWidth="2" opacity="0.6" />
    </g>
  ),

  /** white document page, folded corner, orange ABC header band */
  "file-doc": (
    <g>
      <defs>
        <linearGradient id="doc-page" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F0E7D4" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="89" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <path
        d="M58 10 l16 16 v58 a4 4 0 0 1 -4 4 H34 a4 4 0 0 1 -4 -4 V14 a4 4 0 0 1 4 -4 Z"
        fill="url(#doc-page)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M58 10 v12 a4 4 0 0 0 4 4 h12 Z" fill="#E8DEC6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="36" y="34" width="30" height="13" rx="3" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      <text x="51" y="44" fontSize="9.5" fontWeight="800" textAnchor="middle" fill="#FFF8EC" fontFamily="Arial, sans-serif">
        ABC
      </text>
      <path d="M36 56 h28 M36 65 h28 M36 74 h28 M36 83 h18" stroke="#B9AC98" strokeWidth="3" strokeLinecap="round" />
    </g>
  ),

  /** document page showing a printed photo — sky, hills, sun */
  "file-img": (
    <g>
      <defs>
        <linearGradient id="img-page" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F0E7D4" />
        </linearGradient>
        <linearGradient id="img-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FCDEE" />
          <stop offset="1" stopColor="#C9EAFB" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="89" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <path
        d="M58 10 l16 16 v58 a4 4 0 0 1 -4 4 H34 a4 4 0 0 1 -4 -4 V14 a4 4 0 0 1 4 -4 Z"
        fill="url(#img-page)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M58 10 v12 a4 4 0 0 0 4 4 h12 Z" fill="#E8DEC6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* the printed photo */}
      <rect x="35" y="34" width="34" height="26" rx="2" fill="url(#img-sky)" stroke={INK} strokeWidth="2.5" />
      <circle cx="60" cy="41" r="4.5" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M35 60 L46 45 L53 54 L58 49 L69 60 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M40 66 h24" stroke="#B9AC98" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),

  /** song page — eighth note + three teal sound-wave bars */
  "file-song": (
    <g>
      <defs>
        <linearGradient id="song-page" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F0E7D4" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="89" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <path
        d="M58 10 l16 16 v58 a4 4 0 0 1 -4 4 H34 a4 4 0 0 1 -4 -4 V14 a4 4 0 0 1 4 -4 Z"
        fill="url(#song-page)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M58 10 v12 a4 4 0 0 0 4 4 h12 Z" fill="#E8DEC6" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* eighth note */}
      <ellipse cx="39" cy="64" rx="6" ry="4.8" fill="#0D9488" stroke={INK} strokeWidth="2.2" transform="rotate(-18 39 64)" />
      <circle cx="37" cy="62" r="1.5" fill="#FFFFFF" opacity="0.55" />
      <path d="M44.5 63 V40 q9 2 8 11" fill="none" stroke="#0D9488" strokeWidth="3.2" strokeLinecap="round" />
      {/* sound-wave bars */}
      <rect x="52" y="55" width="5" height="14" rx="2.5" fill="#14B8A6" stroke={INK} strokeWidth="1.8" />
      <rect x="58.5" y="47" width="5" height="22" rx="2.5" fill="#0D9488" stroke={INK} strokeWidth="1.8" />
      <rect x="65" y="52" width="5" height="17" rx="2.5" fill="#0F766E" stroke={INK} strokeWidth="1.8" />
    </g>
  ),

  /** mesh waste bin with green recycle arrows */
  "recycle-bin": (
    <g>
      <defs>
        <linearGradient id="bin-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EDF1F5" />
          <stop offset="0.5" stopColor="#D7DEE6" />
          <stop offset="1" stopColor="#B9C2CC" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88.5" rx="27" ry="5.5" fill="rgba(74,52,33,0.10)" />
      {/* trapezoid body */}
      <path
        d="M27 34 l5 47 a5 5 0 0 0 5 4.5 h26 a5 5 0 0 0 5 -4.5 l5 -47 Z"
        fill="url(#bin-body)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* wire mesh */}
      <path d="M39 37 l2.5 46 M50 37.5 v46 M61 37 l-2.5 46" stroke="#9AA6B2" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <path d="M30.5 50 h39 M32.5 63 h35 M34.5 75 h31" stroke="#9AA6B2" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      {/* rim + dark inside */}
      <ellipse cx="50" cy="33" rx="24" ry="7" fill="#CBD5E1" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="33" rx="18.5" ry="4.8" fill="#8B95A1" stroke="#6B7684" strokeWidth="1.5" />
      {/* green recycle arrows */}
      <g transform="translate(50 61)">
        {[0, 120, 240].map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <path d="M-9 5.5 h10.5 v4.5 h-10.5 Z" fill="#22C55E" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M1.5 2.5 l7.5 5 -7.5 5 Z" fill="#22C55E" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          </g>
        ))}
      </g>
    </g>
  ),

  /** realistic 3.5" floppy — the "save" teacher */
  "save-floppy": (
    <g>
      <defs>
        <linearGradient id="flo-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#148F84" />
          <stop offset="1" stopColor="#0B5F58" />
        </linearGradient>
        <linearGradient id="flo-shutter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEF2F6" />
          <stop offset="1" stopColor="#C3CCD6" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88.5" rx="28" ry="5.5" fill="rgba(74,52,33,0.10)" />
      {/* body with chamfered top-right corner + bottom-left corner notch */}
      <path
        d="M24 16 H68 L84 32 V78 a6 6 0 0 1 -6 6 H26 L18 76 V22 a6 6 0 0 1 6 -6 Z"
        fill="url(#flo-body)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M23 34 q-1 -9 8 -11" stroke="#FFFFFF" strokeWidth="3" opacity="0.3" fill="none" strokeLinecap="round" />
      {/* metal shutter with sliding window */}
      <rect x="43" y="16" width="25" height="24" rx="1.5" fill="url(#flo-shutter)" stroke={INK} strokeWidth="2.5" />
      <rect x="48.5" y="21" width="14" height="13" rx="1" fill="#9AA6B2" stroke={INK} strokeWidth="1.8" />
      <rect x="51" y="24" width="9" height="7" rx="1" fill="#7B8794" />
      {/* paper label with faint pen lines */}
      <rect x="34" y="54" width="42" height="24" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="2.5" />
      <path d="M40 62 h26 M40 70 h18" stroke="#9AA6B2" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  ),

  /* ------------------------------ PAINT & CREATIVE ------------------------------ */

  /** paintbrush at 45° — wood handle, metal ferrule, orange-dipped bristles */
  "paint-brush": (
    <g>
      <defs>
        <linearGradient id="brush-handle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D99C5F" />
          <stop offset="1" stopColor="#B97B3F" />
        </linearGradient>
        <linearGradient id="brush-ferrule" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EDF1F5" />
          <stop offset="1" stopColor="#C3CCD6" />
        </linearGradient>
        <linearGradient id="brush-bristle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9C28E" />
          <stop offset="1" stopColor="#C08A52" />
        </linearGradient>
      </defs>
      <ellipse cx="48" cy="87" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <g transform="rotate(-45 50 50)">
        {/* bristles */}
        <path
          d="M50 41.5 C41 41 34 44 28.5 49.5 C34 55 41 58.5 50 59 Z"
          fill="url(#brush-bristle)"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M45 43.5 l-9 4 M45 57 l-9 -4 M38 45.5 l-7 4" stroke="#A9713B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        {/* orange paint on the tip */}
        <path
          d="M31 46.5 q-6.5 1.5 -6 6.5 q.5 4.5 5.5 5 l3 -1 q3 -1.5 3 -4.5 v-3.5 Z"
          fill="#F59E0B"
          stroke={INK}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* metal ferrule */}
        <rect x="50" y="41" width="13" height="18.5" rx="2" fill="url(#brush-ferrule)" stroke={INK} strokeWidth="2.5" />
        <path d="M54 42.5 v16 M57.5 42.5 v16" stroke="#9AA6B2" strokeWidth="1.3" />
        {/* wooden handle with grain */}
        <rect x="62" y="42.5" width="27" height="15" rx="7.5" fill="url(#brush-handle)" stroke={INK} strokeWidth="2.5" />
        <path d="M68 50 h16" stroke="#A9713B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <path d="M66 46 q10 -2 20 0" stroke="#FFF8EC" strokeWidth="2" opacity="0.4" strokeLinecap="round" fill="none" />
      </g>
      {/* paint drip falling from the tip */}
      <path
        d="M33.5 64 q-3.5 4 -3.5 8 a3.7 3.7 0 0 0 7.4 0 q0 -4 -3.9 -8 Z"
        fill="#F59E0B"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  ),

  /** paint bucket — teal body, metal rim + handle, drip and puddle */
  "paint-bucket": (
    <g>
      <defs>
        <linearGradient id="bkt-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2BC0B0" />
          <stop offset="0.5" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="27" ry="5.5" fill="rgba(74,52,33,0.10)" />
      {/* metal handle arc */}
      <path d="M29 44 Q50 18 71 44" fill="none" stroke={INK} strokeWidth="6.5" strokeLinecap="round" />
      <path d="M29 44 Q50 18 71 44" fill="none" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
      {/* tapered body */}
      <path
        d="M28 46 L33 81 a5 5 0 0 0 5 4.5 h24 a5 5 0 0 0 5 -4.5 L72 46 Z"
        fill="url(#bkt-body)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M34 52 q-1.5 13 1 26" stroke="#FFF8EC" strokeWidth="3.5" opacity="0.4" fill="none" strokeLinecap="round" />
      {/* silver rim + orange paint inside */}
      <ellipse cx="50" cy="46" rx="22" ry="6.5" fill="#CBD5E1" stroke={INK} strokeWidth="3" />
      <ellipse cx="50" cy="46" rx="16.5" ry="4.2" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      {/* drip over the side */}
      <path
        d="M70 47.5 q2.5 7 1 13 q-1.2 4.6 -5 3.6 q-3.6 -1 -2.2 -5 q1.1 -3.2 .5 -7.3 Z"
        fill="#F59E0B"
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* puddle below */}
      <ellipse cx="53" cy="87.5" rx="11" ry="3.6" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      <ellipse cx="53" cy="87" rx="6" ry="1.8" fill="#FBBF24" />
    </g>
  ),

  /** classic yellow pencil — hex body, pink eraser, sharpened tip */
  pencil: (
    <g>
      <defs>
        <linearGradient id="pen-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCD34D" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="pen-ferrule" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EDF1F5" />
          <stop offset="1" stopColor="#C3CCD6" />
        </linearGradient>
      </defs>
      <ellipse cx="48" cy="87" rx="26" ry="5" fill="rgba(74,52,33,0.10)" />
      <g transform="rotate(-45 50 50)">
        {/* pink eraser */}
        <rect x="82" y="41.5" width="12" height="17" rx="5.5" fill="#FB7185" stroke={INK} strokeWidth="2.5" />
        {/* silver ferrule with crimps */}
        <rect x="73.5" y="41.5" width="9.5" height="17" fill="url(#pen-ferrule)" stroke={INK} strokeWidth="2.5" />
        <path d="M76.5 42.5 v15 M80 42.5 v15" stroke="#9AA6B2" strokeWidth="1.2" />
        {/* hexagonal yellow body */}
        <rect x="31" y="41.5" width="43" height="17" fill="url(#pen-body)" stroke={INK} strokeWidth="2.5" />
        <path d="M34 46.2 h35 M34 53.8 h35" stroke="#D97706" strokeWidth="1.6" opacity="0.85" />
        <path d="M36 44.3 q16 -2 32 0" stroke="#FFFFFF" strokeWidth="2" opacity="0.35" fill="none" strokeLinecap="round" />
        {/* sharpened wood cone + graphite point */}
        <path d="M31 41.5 L13 50 L31 58.5 Z" fill="#F3D9A5" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M13 50 L21.5 46.4 L21.5 53.6 Z" fill={INK} />
      </g>
    </g>
  ),

  /** text tool — big ink T on a button with a blinking caret */
  "text-tool": (
    <g>
      <defs>
        <linearGradient id="txt-btn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F1E9DA" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="30" ry="5.5" fill="rgba(74,52,33,0.10)" />
      <rect x="16" y="18" width="68" height="66" rx="12" fill="url(#txt-btn)" stroke={INK} strokeWidth="3" />
      <rect x="21.5" y="23.5" width="57" height="55" rx="8.5" fill="none" stroke="#E3D8C2" strokeWidth="2" />
      {/* chunky letter T */}
      <path d="M27 33 h46 v10 h-18 v33 h-10 v-33 h-18 Z" fill={INK} strokeLinejoin="round" />
      {/* blinking caret after the T */}
      <rect x="63" y="65" width="4.5" height="12" rx="1.5" fill="#F59E0B" />
    </g>
  ),

  /** wooden A-frame easel holding a painted canvas */
  easel: (
    <g>
      <defs>
        <linearGradient id="easel-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D69A5C" />
          <stop offset="1" stopColor="#B97B3F" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="89" rx="30" ry="5" fill="rgba(74,52,33,0.10)" />
      {/* back leg (behind everything) */}
      <path d="M48.5 27 L53.5 29 L63.5 85 L58 85.5 Z" fill="#8B5E3C" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {/* canvas with a painted hill + sun scene */}
      <rect x="26" y="24" width="48" height="40" rx="2" fill="#FFFDF7" stroke={INK} strokeWidth="3" />
      <circle cx="61" cy="33" r="4.5" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M26 64 L40 45 L49 56 L57 48 L74 64 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round" />
      {/* tray holding the canvas */}
      <rect x="30.5" y="61" width="39" height="6.5" rx="2" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      {/* front legs */}
      <path d="M45.5 22 L51.5 24.5 L32 86 L25.5 86 Z" fill="url(#easel-wood)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M48.5 24.5 L54.5 22 L74.5 86 L68 86 Z" fill="url(#easel-wood)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* top hinge knob */}
      <circle cx="50" cy="23" r="4" fill="#8B5E3C" stroke={INK} strokeWidth="2" />
    </g>
  ),

  /** thick U-turn (undo) arrow — teal ribbon with darker outline */
  "undo-arrow": (
    <g>
      <defs>
        <linearGradient id="undo-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2BC0B0" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
      <path
        d="M24 26 a6 6 0 0 1 12 0 V46 a14 14 0 0 0 28 0 V24 H58 L70 6 L82 24 H76 V46 a26 26 0 0 1 -52 0 Z"
        fill="url(#undo-ribbon)"
        stroke="#0F766E"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </g>
  ),

  /** pink-white eraser at 45° with soft sparkle stars */
  "magic-eraser": (
    <g>
      <defs>
        <linearGradient id="era-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCA5B5" />
          <stop offset="1" stopColor="#F2688F" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="87" rx="26" ry="4.5" fill="rgba(74,52,33,0.10)" />
      <g transform="rotate(-45 50 50)">
        {/* pink body */}
        <rect x="23" y="40.5" width="52" height="19" rx="6" fill="url(#era-pink)" stroke={INK} strokeWidth="2.5" />
        <path d="M28.5 46.5 q5 -2.5 10 -0.5" stroke="#E1578C" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        {/* white sleeve band */}
        <path
          d="M49 40.5 h9 a6 6 0 0 1 6 6 v7 a6 6 0 0 1 -6 6 h-9 Z"
          fill="#FFFDF7"
          stroke={INK}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
      {/* soft sparkles */}
      <path
        d="M25 15 L27 20.5 L32.5 22.5 L27 24.5 L25 30 L23 24.5 L17.5 22.5 L23 20.5 Z"
        fill="#FDE68A"
        stroke="#F59E0B"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M79 24 L81.2 30 L87.2 32 L81.2 34 L79 40 L76.8 34 L70.8 32 L76.8 30 Z"
        fill="#FDE68A"
        stroke="#F59E0B"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M62 71 L63.5 74.8 L67.3 76.3 L63.5 77.8 L62 81.6 L60.5 77.8 L56.7 76.3 L60.5 74.8 Z"
        fill="#FCE7F3"
        stroke="#F9A8D4"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </g>
  ),

  /* ------------------------------ SHAPES ------------------------------ */

  /** five-point star — warm gold gradient, rounded joins */
  "shape-star": (
    <g>
      <defs>
        <linearGradient id="str-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path
        d="M50 18 L59.1 40.5 L83.3 42.2 L64.8 57.8 L70.6 81.3 L50 68.5 L29.4 81.3 L35.2 57.8 L16.7 42.2 L40.9 40.5 Z"
        fill="url(#str-gold)"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse cx="44" cy="48" rx="6" ry="4" fill="#FFFFFF" opacity="0.5" transform="rotate(-25 44 48)" />
    </g>
  ),

  /** plump heart — rose gradient with gloss */
  "shape-heart": (
    <g>
      <defs>
        <linearGradient id="hrt-rose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FB7185" />
          <stop offset="1" stopColor="#F43F5E" />
        </linearGradient>
      </defs>
      <path
        d="M50 82 C28 66 16 52 18 38 C19.5 27 29 21 38 24 C44 26 48 30 50 35 C52 30 56 26 62 24 C71 21 80.5 27 82 38 C84 52 72 66 50 82 Z"
        fill="url(#hrt-rose)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="36" cy="33" rx="7" ry="4.5" fill="#FFFFFF" opacity="0.55" transform="rotate(-28 36 33)" />
    </g>
  ),

  /* ------------------------------ STORAGE & MEDALS ------------------------------ */

  /** wooden storage crate — planks, braces, corner joints */
  crate: (
    <g>
      <defs>
        <linearGradient id="crt-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D69A5C" />
          <stop offset="1" stopColor="#C68B4E" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="88" rx="32" ry="5.5" fill="rgba(74,52,33,0.10)" />
      {/* plank face */}
      <rect x="14" y="26" width="72" height="56" rx="4" fill="url(#crt-wood)" stroke={INK} strokeWidth="3" />
      <path d="M14 53 h72" stroke="#8B5E3C" strokeWidth="2.5" />
      <path
        d="M30 47 q10 -2 18 0 M52 58 q9 2 16 0 M26 74 q9 -2 16 0"
        stroke="#B98757"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      {/* corner dovetail joints */}
      <path d="M17 29 l10 10 M83 29 l-10 10 M17 79 l10 -10 M83 79 l-10 -10" stroke={INK} strokeWidth="2" opacity="0.5" />
      {/* two horizontal braces with nails */}
      <rect x="11" y="34" width="78" height="10" rx="2" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      <rect x="11" y="63" width="78" height="10" rx="2" fill="#8B5E3C" stroke={INK} strokeWidth="2.5" />
      <circle cx="24" cy="39" r="1.7" fill={INK} />
      <circle cx="50" cy="39" r="1.7" fill={INK} />
      <circle cx="76" cy="39" r="1.7" fill={INK} />
      <circle cx="24" cy="68" r="1.7" fill={INK} />
      <circle cx="50" cy="68" r="1.7" fill={INK} />
      <circle cx="76" cy="68" r="1.7" fill={INK} />
    </g>
  ),

  /** gold medal — teal ribbon V, folder embossed on the disc */
  "medal-folder": (
    <g>
      <defs>
        <linearGradient id="mdf-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* ribbon V */}
      <path d="M36 10 L47 34 L39 40 L27 16 Z" fill="#0F766E" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M64 10 L53 34 L61 40 L73 16 Z" fill="#0D9488" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* disc + inner ring */}
      <circle cx="50" cy="58" r="27" fill="url(#mdf-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="58" r="21" fill="none" stroke="#D97706" strokeWidth="2.5" />
      <path d="M31 47 a23 23 0 0 1 12 -9" stroke="#FFF8EC" strokeWidth="4" opacity="0.55" fill="none" strokeLinecap="round" />
      {/* embossed folder */}
      <path
        d="M37 52 h9 l4 4 h13 v10 a3 3 0 0 1 -3 3 H40 a3 3 0 0 1 -3 -3 Z"
        fill="#D97706"
        stroke="#B45309"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M40 61 h19" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
    </g>
  ),

  /** gold medal — paintbrush embossed on the disc */
  "medal-paint": (
    <g>
      <defs>
        <linearGradient id="mdp-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* ribbon V */}
      <path d="M36 10 L47 34 L39 40 L27 16 Z" fill="#0F766E" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M64 10 L53 34 L61 40 L73 16 Z" fill="#0D9488" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* disc + inner ring */}
      <circle cx="50" cy="58" r="27" fill="url(#mdp-gold)" stroke={INK} strokeWidth="3" />
      <circle cx="50" cy="58" r="21" fill="none" stroke="#D97706" strokeWidth="2.5" />
      <path d="M31 47 a23 23 0 0 1 12 -9" stroke="#FFF8EC" strokeWidth="4" opacity="0.55" fill="none" strokeLinecap="round" />
      {/* embossed paintbrush at 45° */}
      <g transform="rotate(45 50 59)">
        <path d="M49.5 56.5 L41 57.5 L39.5 59 L41 60.5 L49.5 61.5 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="49.5" y="56" width="7" height="6" rx="1" fill="#92400E" stroke="#B45309" strokeWidth="1.2" />
        <rect x="56" y="56.5" width="13" height="5" rx="2.5" fill="#B45309" stroke="#92400E" strokeWidth="1.2" />
        <circle cx="39" cy="59" r="2.6" fill="#B45309" stroke="#92400E" strokeWidth="1.2" />
      </g>
    </g>
  ),
};
