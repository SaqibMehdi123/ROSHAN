/**
 * ROSHAN character cast — "Friendly Realism v3" hand-coded SVG storybook art.
 * Multi-layer shading (per-character gradient defs, unique prefixes: bjl-, noor-, cht-,
 * gmt-, uu-), soft cast shadows, blush, two-layer eye highlights, warm-ink outlines.
 * Characters support emote poses; all art is code-drawn so Phase 1 ships with zero
 * binary assets (docs/07). Public API: Bijli, Noor, Chotu, GolMatol, UstaadUlloo +
 * Character dispatcher.
 */
"use client";

import type { CharacterId } from "@/lib/schema";

const INK = "#4A3421";

interface CharProps {
  size?: number;
  emote?: string;
  className?: string;
}

/* ------------------------------- BIJLI ------------------------------- */
export function Bijli({ size = 150, emote = "idle", className }: CharProps) {
  const sleeping = emote === "sleeping";
  const sleepy = emote === "sleepy";
  const waking = emote === "waking" || emote === "waking-stretch";
  const stretch = emote === "waking-stretch";
  const sad = emote === "sad-battery" || emote === "battery-empty";
  const emptyBat = emote === "battery-empty";
  const shortCircuit = emote === "short-circuit";
  const thinking = emote === "thinking";
  const worried = emote === "worried";
  const surprised = emote === "surprised";
  const serious = emote === "serious";
  const waving = emote === "waving";
  const cy = "#22D3EE"; // digital face ink
  const soft = "#A5F3FC"; // glow underlay
  const arm = (d: string, hx: number, hy: number) => (
    <g>
      <path d={d} stroke={INK} strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d={d} stroke="#0D9488" strokeWidth="7.5" fill="none" strokeLinecap="round" />
      <circle cx={hx} cy={hy} r="6" fill="#0D9488" stroke={INK} strokeWidth="3" />
    </g>
  );
  const eyes = sleeping ? (
    <>
      <path d="M62 97 q10 9 20 0 M98 97 q10 9 20 0" stroke={soft} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M62 97 q10 9 20 0 M98 97 q10 9 20 0" stroke={cy} strokeWidth="5.5" fill="none" strokeLinecap="round" />
    </>
  ) : sleepy ? (
    <>
      <path d="M62 99 q10 6 20 0 M98 99 q10 6 20 0" stroke={cy} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M64 93 h16 M100 93 h16" stroke={cy} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ) : sad ? (
    <>
      <circle cx="72" cy="100" r="9" fill={soft} opacity="0.3" /><circle cx="108" cy="100" r="9" fill={soft} opacity="0.3" />
      <circle cx="72" cy="100" r="6" fill={cy} /><circle cx="108" cy="100" r="6" fill={cy} />
      <circle cx="70" cy="98" r="1.5" fill="#EAFBFF" /><circle cx="106" cy="98" r="1.5" fill="#EAFBFF" />
      <path d="M64 92 q8 -6 16 -3 M100 89 q8 -3 16 3" stroke={cy} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  ) : shortCircuit ? (
    <path d="M65 94 l14 12 M79 94 l-14 12 M101 94 l14 12 M115 94 l-14 12" stroke={cy} strokeWidth="5" strokeLinecap="round" fill="none" />
  ) : thinking ? (
    <>
      <circle cx="70" cy="97" r="5.5" fill={cy} /><circle cx="106" cy="97" r="5.5" fill={cy} />
      <circle cx="68.3" cy="95.3" r="1.7" fill="#EAFBFF" /><circle cx="104.3" cy="95.3" r="1.7" fill="#EAFBFF" />
      <path d="M62 87 q9 -6 18 -2 M98 89 q9 -3 18 1" stroke={cy} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  ) : worried ? (
    <>
      <circle cx="72" cy="99" r="4.5" fill={cy} /><circle cx="108" cy="99" r="4.5" fill={cy} />
      <circle cx="70.6" cy="97.6" r="1.4" fill="#EAFBFF" /><circle cx="106.6" cy="97.6" r="1.4" fill="#EAFBFF" />
      <path d="M63 92 q8 -8 17 -4 M100 88 q9 0 17 4" stroke={cy} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  ) : surprised ? (
    <>
      <circle cx="72" cy="99" r="10" fill={soft} opacity="0.25" /><circle cx="108" cy="99" r="10" fill={soft} opacity="0.25" />
      <circle cx="72" cy="99" r="8" fill="none" stroke={cy} strokeWidth="3.5" /><circle cx="108" cy="99" r="8" fill="none" stroke={cy} strokeWidth="3.5" />
      <circle cx="72" cy="99" r="2.5" fill={cy} /><circle cx="108" cy="99" r="2.5" fill={cy} />
      <path d="M62 86 q9 -5 19 -2 M99 84 q9 -3 19 2" stroke={cy} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </>
  ) : serious ? (
    <>
      <rect x="62" y="96" width="20" height="6" rx="3" fill={cy} /><rect x="98" y="96" width="20" height="6" rx="3" fill={cy} />
      <path d="M62 88 h20 M98 88 h20" stroke={cy} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ) : waking ? (
    <>
      <path d="M62 102 q10 -15 20 0" stroke={soft} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M62 102 q10 -15 20 0" stroke={cy} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M98 97 q10 9 20 0" stroke={cy} strokeWidth="5.5" fill="none" strokeLinecap="round" />
    </>
  ) : (
    <>
      <path d="M62 102 q10 -15 20 0 M98 102 q10 -15 20 0" stroke={soft} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M62 102 q10 -15 20 0 M98 102 q10 -15 20 0" stroke={cy} strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="72" cy="95" r="1.8" fill="#EAFBFF" /><circle cx="108" cy="95" r="1.8" fill="#EAFBFF" />
    </>
  );
  const mouth = sleeping || sleepy ? (
    <path d="M85 120 q5 4 10 0" stroke={cy} strokeWidth="3.5" fill="none" strokeLinecap="round" />
  ) : sad ? (
    <path d="M79 122 q11 -8 22 0" stroke={cy} strokeWidth="4" fill="none" strokeLinecap="round" />
  ) : shortCircuit ? (
    <path d="M78 119 l5 4 5 -4 5 4 5 -4 5 4" stroke={cy} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ) : surprised ? (
    <circle cx="90" cy="120" r="6" fill="none" stroke={cy} strokeWidth="4" />
  ) : thinking ? (
    <path d="M82 120 q7 3 14 0" stroke={cy} strokeWidth="4" fill="none" strokeLinecap="round" />
  ) : worried ? (
    <path d="M79 120 q4 4 8 0 q4 -4 8 0 q4 4 8 0" stroke={cy} strokeWidth="3.5" fill="none" strokeLinecap="round" />
  ) : serious ? (
    <path d="M83 120 h14" stroke={cy} strokeWidth="4" strokeLinecap="round" />
  ) : waking ? (
    <path d="M82 119 q8 7 16 0" stroke={cy} strokeWidth="4" fill="none" strokeLinecap="round" />
  ) : (
    <>
      <path d="M78 116 q12 11 24 0" stroke={soft} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M78 116 q12 11 24 0" stroke={cy} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </>
  );
  return (
    <svg
      viewBox="0 0 180 200"
      width={size}
      height={size * 1.11}
      className={`${className ?? ""} ${shortCircuit ? "anim-wiggle" : ""} ${waking ? "anim-bob" : ""}`}
      role="img"
      aria-label="Bijli the robot"
    >
      <defs>
        <radialGradient id="bjl-body" cx="38%" cy="28%" r="85%"><stop offset="0%" stopColor="#FFFBE0" /><stop offset="45%" stopColor="#FDE047" /><stop offset="100%" stopColor="#E8BC2B" /></radialGradient>
        <linearGradient id="bjl-screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#454B5C" /><stop offset="60%" stopColor="#272B33" /><stop offset="100%" stopColor="#1F2229" /></linearGradient>
        <linearGradient id="bjl-bolt" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FDE68A" /><stop offset="60%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#D97706" /></linearGradient>
        <linearGradient id="bjl-tread" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2DD4BF" /><stop offset="55%" stopColor="#0D9488" /><stop offset="100%" stopColor="#0F766E" /></linearGradient>
        <radialGradient id="bjl-tummy" cx="50%" cy="35%" r="80%"><stop offset="0%" stopColor="#FFFDF4" /><stop offset="100%" stopColor="#F7EAC8" /></radialGradient>
      </defs>
      {/* cast shadow */}
      <ellipse cx="90" cy="195" rx="50" ry="4" fill={INK} opacity="0.12" />
      {/* antenna + lightning tip (droops when sad) */}
      <g transform={sad ? "rotate(26 90 52)" : undefined}>
        {!sad && <circle cx="90" cy="18" r="12" fill="#FDE68A" opacity="0.3" />}
        <line x1="90" y1="48" x2="90" y2="26" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path d="M95 3 L81 25 L90 25 L82 44 L101 19 L91 19 Z" fill={sad ? "#B9AC98" : "url(#bjl-bolt)"} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      </g>
      {/* tread feet */}
      <rect x="50" y="177" width="36" height="16" rx="8" fill="url(#bjl-tread)" stroke={INK} strokeWidth="3" />
      <rect x="94" y="177" width="36" height="16" rx="8" fill="url(#bjl-tread)" stroke={INK} strokeWidth="3" />
      <path d="M55 181 h26 M99 181 h26" stroke="#5EEAD4" strokeWidth="2" opacity="0.8" strokeLinecap="round" />
      <circle cx="61" cy="189" r="2.2" fill="#99F6E4" /><circle cx="75" cy="189" r="2.2" fill="#99F6E4" />
      <circle cx="105" cy="189" r="2.2" fill="#99F6E4" /><circle cx="119" cy="189" r="2.2" fill="#99F6E4" />
      {/* body — big warm egg with rim light + panel seam */}
      <ellipse cx="90" cy="116" rx="60" ry="68" fill="url(#bjl-body)" stroke={INK} strokeWidth="4" />
      <path d="M46 74 q-18 34 -4 66" stroke="#FFFDF2" strokeWidth="5" opacity="0.5" fill="none" strokeLinecap="round" />
      <path d="M54 164 q36 12 72 0" stroke="#EAB308" strokeWidth="2.5" opacity="0.5" fill="none" strokeLinecap="round" />
      {/* side ear-pods */}
      <circle cx="31" cy="118" r="6.5" fill="#0D9488" stroke={INK} strokeWidth="3" /><circle cx="149" cy="118" r="6.5" fill="#0D9488" stroke={INK} strokeWidth="3" />
      <circle cx="31" cy="118" r="2.4" fill="#99F6E4" /><circle cx="149" cy="118" r="2.4" fill="#99F6E4" />
      {/* arms */}
      {stretch ? (
        <>{arm("M36 128 q-16 -10 -14 -30", 22, 98)}{arm("M144 128 q16 -10 14 -30", 158, 98)}</>
      ) : sad ? (
        <>{arm("M36 132 q-12 12 -6 26", 30, 158)}{arm("M144 132 q12 12 6 26", 150, 158)}</>
      ) : shortCircuit ? (
        <>{arm("M36 130 q-14 -14 -8 -30", 28, 100)}{arm("M144 132 q14 12 8 28", 152, 160)}</>
      ) : waving ? (
        <>
          {arm("M36 130 q-16 4 -18 18", 18, 150)}
          {arm("M144 128 q18 -6 20 -24", 164, 102)}
          <path d="M170 94 q6 8 3 17" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
        </>
      ) : (
        <>{arm("M36 130 q-16 4 -18 18", 18, 150)}{arm("M144 130 q16 4 18 18", 162, 150)}</>
      )}
      {/* face screen with glass glare */}
      <rect x="50" y="76" width="80" height="58" rx="26" fill="url(#bjl-screen)" stroke={INK} strokeWidth="3" />
      <path d="M58 86 q16 -8 34 -2" stroke="#FFFFFF" strokeWidth="7" opacity="0.16" fill="none" strokeLinecap="round" />
      {eyes}
      {mouth}
      {/* warm blush */}
      <ellipse cx="46" cy="134" rx="6.5" ry="5" fill="#FB9E5E" opacity="0.55" />
      <ellipse cx="134" cy="134" rx="6.5" ry="5" fill="#FB9E5E" opacity="0.55" />
      {/* tummy screen: bolt, or battery meter when sad */}
      <rect x="66" y="146" width="48" height="32" rx="14" fill="url(#bjl-tummy)" stroke={INK} strokeWidth="3" />
      <rect x="69" y="149" width="42" height="26" rx="11" fill="none" stroke="#EBDDBB" strokeWidth="1.5" opacity="0.8" />
      {sad ? (
        <g>
          <rect x="76" y="155" width="28" height="14" rx="3" fill="#FFFDF4" stroke={INK} strokeWidth="2.5" />
          <rect x="102" y="159" width="4" height="6" rx="1.5" fill={INK} />
          <rect x="87" y="158" width="6" height="8" rx="1" fill="#E7DCC0" />
          {emptyBat ? null : <rect x="79" y="158" width="6" height="8" rx="1" fill="#EF4444" />}
        </g>
      ) : (
        <>
          <circle cx="90" cy="163" r="13" fill="#F472B6" opacity="0.18" />
          <path d="M92 150 l-9 14 h6 l-5 12 13 -17 h-6 l6 -12 Z" fill="url(#bjl-bolt)" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        </>
      )}
      {/* antenna base dome */}
      <circle cx="90" cy="52" r="6" fill="#0D9488" stroke={INK} strokeWidth="3" />
      {/* short-circuit sparks */}
      {shortCircuit && (
        <>
          <path d="M34 62 L24 78 L32 78 L24 94 L42 74 L33 74 Z" fill="#FDE047" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M146 60 L158 72 L150 73 L160 86 L140 70 L148 69 Z" fill="#F87171" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <text x="150" y="102" fontSize="16" fill="#F59E0B">✦</text>
        </>
      )}
      {/* zzz + sparkles + thinking bubble */}
      {sleeping && <><text x="132" y="56" fontSize="25" fontWeight="700" fill={INK} fontFamily="sans-serif">z</text><text x="148" y="38" fontSize="16" fill={INK} opacity="0.75" fontFamily="sans-serif">z</text></>}
      {sleepy && <text x="146" y="46" fontSize="18" fill={INK} opacity="0.7" fontFamily="sans-serif">z</text>}
      {waking && <><text x="20" y="50" fontSize="22" fill="#F59E0B">✦</text><text x="148" y="38" fontSize="16" fill="#F59E0B">✦</text><text x="120" y="16" fontSize="13" fill="#F59E0B">✦</text></>}
      {thinking && <><text x="24" y="42" fontSize="24" fontWeight="700" fill="#F59E0B" fontFamily="sans-serif">?</text><circle cx="40" cy="56" r="2.2" fill="#F59E0B" /><circle cx="47" cy="64" r="2.8" fill="#F59E0B" /></>}
    </svg>
  );
}

/* ------------------------------- NOOR ------------------------------- */
export function Noor({ size = 150, emote = "idle", className }: CharProps) {
  const pointing = emote === "pointing";
  const thinking = emote === "thinking";
  const cheer = emote === "celebrating" || emote === "excited";
  const waving = emote === "waving";
  const gentle = emote === "gentle";
  const brave = emote === "brave";
  const surprised = emote === "surprised";
  const worried = emote === "worried";
  const closedEyes = cheer || gentle;
  const arm = (d: string, hx: number, hy: number, r = 5.5) => (
    <g>
      <path d={d} stroke={INK} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d={d} stroke="#0D9488" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={r} fill="url(#noor-skin)" stroke={INK} strokeWidth="3" />
    </g>
  );
  const leftArm = gentle ? arm("M59 136 q4 14 19 16", 79, 153)
    : surprised ? arm("M59 134 q-11 -2 -8 -20", 51, 113)
    : worried ? arm("M59 136 q2 18 18 22", 78, 159)
    : pointing || brave ? arm("M59 134 q-13 10 -7 24", 53, 158)
    : cheer ? <g>{arm("M59 132 q-16 -20 -8 -38", 50, 92, 6)}<path d="M46 88 l-3 -4 M51 86 l-1 -5 M56 88 l2 -4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" /></g>
    : arm("M59 134 q-10 18 -5 34", 54, 170);
  const rightArm = thinking ? arm("M101 136 q17 4 13 -14 q-3 -11 -15 -11", 99, 109, 5)
    : gentle ? arm("M101 136 q-4 14 -19 16", 81, 152)
    : surprised ? arm("M101 134 q11 -2 8 -20", 109, 113)
    : worried ? arm("M101 136 q-2 18 -18 22", 82, 158)
    : pointing ? <g>{arm("M101 136 q22 -2 36 -14", 139, 120)}<path d="M141 119 l11 -6" stroke={INK} strokeWidth="7" strokeLinecap="round" /><path d="M141 119 l11 -6" stroke="url(#noor-skin)" strokeWidth="3.8" strokeLinecap="round" /></g>
    : brave ? <g>{arm("M101 132 q18 -12 14 -34", 116, 97, 7)}<path d="M111 93 h9 M112 90 h7" stroke={INK} strokeWidth="2" strokeLinecap="round" /></g>
    : waving ? <g>{arm("M101 132 q16 -16 10 -34", 112, 97, 6)}<path d="M107 90 l-2 -5 M112 89 l0 -5 M117 91 l3 -4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" /><path d="M122 88 q6 8 4 18" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" /></g>
    : cheer ? <g>{arm("M101 132 q16 -20 8 -38", 110, 92, 6)}<path d="M114 88 l3 -4 M109 86 l1 -5 M104 88 l-2 -4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" /></g>
    : arm("M101 134 q10 18 5 34", 106, 170);
  return (
    <svg
      viewBox="0 0 160 220"
      width={size}
      height={size * 1.375}
      className={`${className ?? ""} ${cheer ? "anim-cheer" : ""} ${emote === "idle" || emote === "waving" ? "anim-bob" : ""}`}
      role="img"
      aria-label="Noor"
    >
      <defs>
        <radialGradient id="noor-skin" cx="38%" cy="30%" r="80%"><stop offset="0%" stopColor="#F9DDB4" /><stop offset="55%" stopColor="#F2C79B" /><stop offset="100%" stopColor="#E3A574" /></radialGradient>
        <linearGradient id="noor-hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4A3626" /><stop offset="100%" stopColor="#2E2114" /></linearGradient>
        <linearGradient id="noor-kameez" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2DD4BF" /><stop offset="60%" stopColor="#0D9488" /><stop offset="100%" stopColor="#0A756B" /></linearGradient>
        <linearGradient id="noor-dupatta" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FDBA74" /><stop offset="100%" stopColor="#F59E0B" /></linearGradient>
        <linearGradient id="noor-bow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F9A8D4" /><stop offset="100%" stopColor="#EC4899" /></linearGradient>
        <linearGradient id="noor-shoe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C26A2E" /><stop offset="100%" stopColor="#A05221" /></linearGradient>
      </defs>
      {/* cast shadow */}
      <ellipse cx="80" cy="216" rx="42" ry="4" fill={INK} opacity="0.12" />
      {/* braids + pink ribbon bows */}
      <g>
        <circle cx="34" cy="72" r="12.5" fill="url(#noor-hair)" stroke={INK} strokeWidth="3" /><circle cx="34" cy="93" r="10.5" fill="url(#noor-hair)" stroke={INK} strokeWidth="3" /><circle cx="34" cy="112" r="8.5" fill="url(#noor-hair)" stroke={INK} strokeWidth="2.5" />
        <rect x="29" y="103" width="10" height="4" rx="2" fill="url(#noor-bow)" stroke={INK} strokeWidth="1.8" />
        <path d="M34 63 q-11 -9 -12 1 q-1 6 12 3 Z" fill="url(#noor-bow)" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M34 63 q11 -9 12 1 q1 6 -12 3 Z" fill="url(#noor-bow)" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="34" cy="64" r="3" fill="url(#noor-bow)" stroke={INK} strokeWidth="1.8" />
      </g>
      <g>
        <circle cx="126" cy="72" r="12.5" fill="url(#noor-hair)" stroke={INK} strokeWidth="3" /><circle cx="126" cy="93" r="10.5" fill="url(#noor-hair)" stroke={INK} strokeWidth="3" /><circle cx="126" cy="112" r="8.5" fill="url(#noor-hair)" stroke={INK} strokeWidth="2.5" />
        <rect x="121" y="103" width="10" height="4" rx="2" fill="url(#noor-bow)" stroke={INK} strokeWidth="1.8" />
        <path d="M126 63 q-11 -9 -12 1 q-1 6 12 3 Z" fill="url(#noor-bow)" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M126 63 q11 -9 12 1 q1 6 -12 3 Z" fill="url(#noor-bow)" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="126" cy="64" r="3" fill="url(#noor-bow)" stroke={INK} strokeWidth="1.8" />
      </g>
      {/* neck + dupatta trail behind shoulder */}
      <rect x="74" y="112" width="12" height="16" rx="4" fill="url(#noor-skin)" stroke={INK} strokeWidth="3" />
      <path d="M103 127 Q127 160 116 190 L102 184 Q112 158 96 134 Z" fill="url(#noor-dupatta)" stroke={INK} strokeWidth="3" strokeLinejoin="round" opacity="0.95" />
      {/* head + ears + gold jhumki earrings */}
      <circle cx="80" cy="76" r="43" fill="url(#noor-skin)" stroke={INK} strokeWidth="4" />
      <circle cx="38" cy="82" r="6" fill="url(#noor-skin)" stroke={INK} strokeWidth="3" /><circle cx="122" cy="82" r="6" fill="url(#noor-skin)" stroke={INK} strokeWidth="3" />
      <circle cx="39" cy="93" r="2.2" fill="#FBBF24" stroke={INK} strokeWidth="1.2" /><circle cx="121" cy="93" r="2.2" fill="#FBBF24" stroke={INK} strokeWidth="1.2" />
      {/* hair: fringe, side strands, shine */}
      <path d="M37 74 Q36 30 80 29 Q124 30 123 74 Q114 52 99 50 Q90 58 79 52 Q68 46 57 53 Q46 58 37 74 Z" fill="url(#noor-hair)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M38 72 Q31 98 40 118 Q45 97 44 73 Z" fill="url(#noor-hair)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M122 72 Q129 98 120 118 Q115 97 116 73 Z" fill="url(#noor-hair)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M58 42 Q72 33 90 37" stroke="#7A5A3C" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* brows */}
      <path d={thinking ? "M56 64 q9 -7 18 -3" : surprised ? "M55 61 q9 -7 19 -3" : worried ? "M56 68 q10 -8 18 -4" : brave ? "M55 63 q10 6 19 2" : "M56 65 q9 -5 18 -1"} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={thinking ? "M88 62 q9 -5 17 1" : surprised ? "M86 62 q9 -6 19 -1" : worried ? "M104 68 q-10 -8 -18 -4" : brave ? "M105 63 q-10 6 -19 2" : "M86 64 q9 -4 18 1"} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* eyes with two-layer highlights + lashes */}
      {closedEyes ? (
        <>
          <path d="M57 79 q7 -9 14 0 M89 79 q7 -9 14 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M57 74 l-3 -2 M103 74 l3 -2" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx={thinking ? 63 : 64} cy="79" rx={surprised ? 8.5 : 7.5} ry={surprised ? 10.5 : 9} fill="#fff" stroke={INK} strokeWidth="2.5" />
          <ellipse cx={thinking ? 95 : 96} cy="79" rx={surprised ? 8.5 : 7.5} ry={surprised ? 10.5 : 9} fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx={thinking ? 61 : 64} cy={thinking ? 75 : 80} r={surprised || worried ? 3.4 : 4.6} fill={INK} />
          <circle cx={thinking ? 93 : 96} cy={thinking ? 75 : 80} r={surprised || worried ? 3.4 : 4.6} fill={INK} />
          <circle cx={thinking ? 59.6 : 62.4} cy={thinking ? 73.6 : 77.4} r="1.9" fill="#fff" /><circle cx={thinking ? 91.6 : 94.4} cy={thinking ? 73.6 : 77.4} r="1.9" fill="#fff" />
          <circle cx={thinking ? 62.8 : 66} cy={thinking ? 77 : 82} r="1" fill="#fff" /><circle cx={thinking ? 94.8 : 98} cy={thinking ? 77 : 82} r="1" fill="#fff" />
          <path d="M56 74 l-4 -1 M58 71 l-3 -3" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <path d="M104 74 l4 -1 M102 71 l3 -3" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {/* nose + blush + mouth */}
      <path d="M80 87 q3 3 -0.5 5.5" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="59" cy="93" rx="5.5" ry="3.5" fill="#F2987B" opacity="0.5" /><ellipse cx="101" cy="93" rx="5.5" ry="3.5" fill="#F2987B" opacity="0.5" />
      {cheer || pointing ? (
        <>
          <path d="M68 95 q12 15 24 0 Z" fill="#7A3B2D" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="80" cy="102" rx="5" ry="2.4" fill="#F472B6" />
        </>
      ) : surprised ? (
        <ellipse cx="80" cy="100" rx="5" ry="6.5" fill="#7A3B2D" stroke={INK} strokeWidth="3" />
      ) : worried ? (
        <path d="M73 100 q3.5 3 7 0 q3.5 -3 7 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : gentle ? (
        <path d="M73 97 q7 6 14 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : thinking ? (
        <circle cx="80" cy="100" r="3" fill="#7A3B2D" stroke={INK} strokeWidth="2.5" />
      ) : brave ? (
        <path d="M72 96 q8 8 16 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <path d="M70 97 q10 9 20 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="65" cy="94" r="1.5" fill="#D6976B" /><circle cx="95" cy="94" r="1.5" fill="#D6976B" />
        </>
      )}
      {/* teal kameez with folds, buttons, embroidered hem */}
      <path d="M57 127 Q80 115 103 127 L111 182 Q80 193 49 182 Z" fill="url(#noor-kameez)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M64 148 q-3 14 -1 27 M96 148 q3 14 1 27" stroke="#0A6E64" strokeWidth="2" opacity="0.55" fill="none" strokeLinecap="round" />
      <path d="M70 124 q10 8 20 0" stroke="#0A6E64" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="80" cy="134" r="1.6" fill="#FDE68A" /><circle cx="80" cy="141" r="1.6" fill="#FDE68A" />
      <path d="M52 180 q28 10 56 0" stroke="#0A6E64" strokeWidth="3" opacity="0.5" fill="none" />
      <path d="M59 182 h1 M68 185 h1 M80 186 h1 M92 185 h1 M101 182 h1" stroke="#FDE68A" strokeWidth="3.2" strokeLinecap="round" />
      {/* orange dupatta sash across chest */}
      <path d="M58 129 Q84 143 108 170 L97 180 Q74 154 50 141 Z" fill="url(#noor-dupatta)" stroke={INK} strokeWidth="3" strokeLinejoin="round" opacity="0.96" />
      <circle cx="66" cy="140" r="1.5" fill="#FFF7E6" opacity="0.7" /><circle cx="78" cy="152" r="1.5" fill="#FFF7E6" opacity="0.7" /><circle cx="88" cy="163" r="1.5" fill="#FFF7E6" opacity="0.7" />
      {/* arms per emote */}
      {leftArm}
      {rightArm}
      {/* white shalwar + khussa shoes */}
      <path d="M61 183 L56 208 h16 l6 -21 h4 l6 21 h16 L99 183 Z" fill="#FFF8EC" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M57 201 h13 M90 201 h13" stroke="#E3D8BE" strokeWidth="3" />
      <path d="M55 208 q-7 1 -7 5 q0 4 6 4 h13 q3 0 3 -4 v-5 Z" fill="url(#noor-shoe)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M103 208 q7 1 7 5 q0 4 -6 4 h-13 q-3 0 -3 -4 v-5 Z" fill="url(#noor-shoe)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="51" cy="214" r="1.4" fill="#FDE68A" /><circle cx="107" cy="214" r="1.4" fill="#FDE68A" />
      {/* thinking bubble */}
      {thinking && <><text x="127" y="42" fontSize="24" fontWeight="700" fill="#F59E0B" fontFamily="sans-serif">؟</text><circle cx="117" cy="54" r="2.2" fill="#F59E0B" /><circle cx="110" cy="63" r="2.8" fill="#F59E0B" /></>}
    </svg>
  );
}

/* ------------------------------- CHOTU ------------------------------- */
export function Chotu({ size = 145, emote = "idle", className }: CharProps) {
  const surprised = emote === "surprised";
  const oops = emote === "oops";
  const cheer = emote === "celebrating" || emote === "excited";
  const playful = emote === "playful";
  const thinking = emote === "thinking";
  const pointing = emote === "pointing";
  const wide = surprised || oops;
  const arm = (d: string, hx: number, hy: number, r = 5.5) => (
    <g>
      <path d={d} stroke={INK} strokeWidth="9.5" fill="none" strokeLinecap="round" />
      <path d={d} stroke="url(#cht-skin)" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <circle cx={hx} cy={hy} r={r} fill="url(#cht-skin)" stroke={INK} strokeWidth="3" />
    </g>
  );
  const leftArm = oops ? arm("M57 128 q-11 0 -8 -18", 49, 110)
    : surprised ? arm("M57 128 q-12 6 -6 20", 51, 149)
    : cheer ? <g>{arm("M57 126 q-17 -16 -10 -36", 47, 89)}<path d="M43 84 l-2 -4 M48 83 l0 -5 M53 85 l3 -4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" /></g>
    : arm("M57 128 q-13 14 -7 31", 50, 161);
  const rightArm = thinking ? arm("M103 130 q15 3 11 -14 q-3 -10 -15 -10", 99, 105, 5)
    : pointing ? <g>{arm("M103 130 q22 -4 38 -16", 142, 114)}<path d="M144 112 l12 -6" stroke={INK} strokeWidth="6.5" strokeLinecap="round" /><path d="M144 112 l12 -6" stroke="url(#cht-skin)" strokeWidth="3.5" strokeLinecap="round" /></g>
    : oops ? arm("M103 128 q11 0 8 -18", 111, 110)
    : surprised ? arm("M103 128 q12 6 6 20", 109, 149)
    : cheer ? <g>{arm("M103 126 q17 -16 10 -36", 113, 89)}<path d="M117 84 l2 -4 M112 83 l0 -5 M107 85 l-3 -4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" /></g>
    : arm("M103 128 q13 14 7 31", 110, 161);
  return (
    <svg
      viewBox="0 0 160 210"
      width={size}
      height={size * 1.31}
      className={`${className ?? ""} ${cheer ? "anim-cheer" : ""} ${emote === "idle" ? "anim-bob" : ""}`}
      role="img"
      aria-label="Chotu"
    >
      <defs>
        <radialGradient id="cht-skin" cx="38%" cy="30%" r="80%"><stop offset="0%" stopColor="#F5CB99" /><stop offset="55%" stopColor="#E8B27D" /><stop offset="100%" stopColor="#D6995F" /></radialGradient>
        <linearGradient id="cht-hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#33261A" /><stop offset="100%" stopColor="#1F150D" /></linearGradient>
        <linearGradient id="cht-tee" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FBBF24" /><stop offset="60%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#E08A05" /></linearGradient>
        <linearGradient id="cht-shorts" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A06B42" /><stop offset="100%" stopColor="#8B5E3C" /></linearGradient>
      </defs>
      {/* cast shadow */}
      <ellipse cx="80" cy="205" rx="44" ry="4" fill={INK} opacity="0.12" />
      {/* legs + sandals */}
      <path d="M70 190 L70 201 M90 190 L90 201" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M70 190 L70 201 M90 190 L90 201" stroke="url(#cht-skin)" strokeWidth="5" strokeLinecap="round" />
      <path d="M57 200 q-5 0 -5 4 q0 4 6 4 h14 q4 0 4 -4 v-4 Z" fill="#8B5E3C" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M103 200 q5 0 5 4 q0 4 -6 4 h-14 q-4 0 -4 -4 v-4 Z" fill="#8B5E3C" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M67 200 l4 -6 M93 200 l-4 -6" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {/* shorts with waistband, cuffs, pockets */}
      <path d="M59 160 L54 190 H74 L80 172 L86 190 H106 L101 160 Z" fill="url(#cht-shorts)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M60 166 H100" stroke="#6E4B2E" strokeWidth="3" opacity="0.6" />
      <path d="M55 184 H73 M87 184 H105" stroke="#6E4B2E" strokeWidth="2.5" opacity="0.6" />
      <path d="M62 168 q6 5 6 12 M98 168 q-6 5 -6 12" stroke="#6E4B2E" strokeWidth="2" opacity="0.5" fill="none" />
      {/* orange tee with sleeves, folds, lightning print */}
      <path d="M57 120 Q80 108 103 120 L108 162 Q80 172 52 162 Z" fill="url(#cht-tee)" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <path d="M57 120 q-10 2 -13 14 q7 6 15 2 Z" fill="url(#cht-tee)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M103 120 q10 2 13 14 q-7 6 -15 2 Z" fill="url(#cht-tee)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M54 158 q26 9 52 0" stroke="#D97706" strokeWidth="3" opacity="0.5" fill="none" />
      <path d="M65 138 q-2 10 -1 18 M95 138 q2 10 1 18" stroke="#D97706" strokeWidth="2" opacity="0.5" fill="none" strokeLinecap="round" />
      <path d="M83 129 l-9 15 h8 l-6 15 13 -17 h-8 l7 -13 Z" fill="#FFF8EC" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M70 117 q10 9 20 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* arms per emote */}
      {leftArm}
      {rightArm}
      {/* head + ears */}
      <circle cx="80" cy="72" r="41" fill="url(#cht-skin)" stroke={INK} strokeWidth="4" />
      <circle cx="39" cy="76" r="5.5" fill="url(#cht-skin)" stroke={INK} strokeWidth="3" /><circle cx="121" cy="76" r="5.5" fill="url(#cht-skin)" stroke={INK} strokeWidth="3" />
      {/* messy hair with spikes + cowlick + shine */}
      <path d="M40 68 Q40 25 80 24 Q120 25 120 68 Q110 47 97 49 Q89 57 79 51 Q69 45 59 53 Q47 57 40 68 Z" fill="url(#cht-hair)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M70 27 l-3 -12 9 8 Z" fill="url(#cht-hair)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M92 28 Q97 10 111 9 Q101 16 99 29 Z" fill="url(#cht-hair)" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M58 40 Q72 31 88 35" stroke="#4E3A28" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
      {/* brows */}
      <path d={wide ? "M56 58 q9 -7 19 -3" : thinking ? "M56 59 q9 -6 19 -3" : "M57 62 q9 -5 18 -1"} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={wide ? "M85 59 q9 -6 19 -1" : "M85 61 q9 -4 18 1"} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* eyes with two-layer highlights */}
      {wide ? (
        <>
          <circle cx="66" cy="74" r="8" fill="#fff" stroke={INK} strokeWidth="2.5" /><circle cx="94" cy="74" r="8" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx="66" cy="75" r="3.4" fill={INK} /><circle cx="94" cy="75" r="3.4" fill={INK} />
          <circle cx="64.6" cy="73.6" r="1.5" fill="#fff" /><circle cx="92.6" cy="73.6" r="1.5" fill="#fff" />
        </>
      ) : playful ? (
        <>
          <circle cx="66" cy="74" r="5.5" fill={INK} />
          <circle cx="64.4" cy="72.4" r="1.9" fill="#fff" /><circle cx="67.8" cy="76.4" r="0.9" fill="#fff" />
          <path d="M88 75 q6 -8 12 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : thinking ? (
        <>
          <circle cx="66" cy="74" r="5.5" fill={INK} /><circle cx="94" cy="74" r="5.5" fill={INK} />
          <circle cx="64.2" cy="71.8" r="1.9" fill="#fff" /><circle cx="92.2" cy="71.8" r="1.9" fill="#fff" />
          <circle cx="67.8" cy="76" r="0.9" fill="#fff" /><circle cx="95.8" cy="76" r="0.9" fill="#fff" />
        </>
      ) : (
        <>
          <circle cx="66" cy="74" r="5.5" fill={INK} /><circle cx="94" cy="74" r="5.5" fill={INK} />
          <circle cx="64.4" cy="72.4" r="1.9" fill="#fff" /><circle cx="92.4" cy="72.4" r="1.9" fill="#fff" />
          <circle cx="67.8" cy="76.4" r="0.9" fill="#fff" /><circle cx="95.8" cy="76.4" r="0.9" fill="#fff" />
        </>
      )}
      {/* nose + blush */}
      <path d="M79 83 q3 3 -1 4.5" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="58" cy="86" rx="5" ry="3.5" fill="#F09A75" opacity="0.5" /><ellipse cx="102" cy="86" rx="5" ry="3.5" fill="#F09A75" opacity="0.5" />
      {/* mouth — gap-tooth grin / O / wince */}
      {wide ? (
        <ellipse cx="80" cy="95" rx={oops ? 4.5 : 6} ry={oops ? 5 : 7} fill="#7A3B2D" stroke={INK} strokeWidth="3" />
      ) : thinking ? (
        <path d="M74 95 q6 4 12 -1" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <path d={cheer || pointing ? "M64 88 Q80 92 96 88 Q94 106 80 106 Q66 106 64 88 Z" : "M65 89 Q80 92 95 89 Q93 104 80 104 Q67 104 65 89 Z"} fill="#7A3B2D" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <path d="M68 91 h11 v4.5 h-11 Z M81 91 h11 v4.5 h-11 Z" fill="#fff" />
          {playful && <ellipse cx="80" cy="99" rx="5" ry="3" fill="#F472B6" stroke={INK} strokeWidth="2" />}
        </>
      )}
      {/* crossed band-aid on cheek */}
      <g transform="rotate(-22 104 90)">
        <rect x="94" y="87" width="20" height="6.5" rx="3" fill="#FDE68A" stroke={INK} strokeWidth="1.8" />
        <rect x="100.5" y="80" width="7" height="20" rx="3" fill="#FDE68A" stroke={INK} strokeWidth="1.8" />
        <circle cx="98" cy="90.2" r="0.9" fill="#C9A24B" /><circle cx="106" cy="90.2" r="0.9" fill="#C9A24B" />
        <circle cx="104" cy="84.5" r="0.9" fill="#C9A24B" /><circle cx="104" cy="96" r="0.9" fill="#C9A24B" />
      </g>
      {/* oops sweat drop + thinking bubble */}
      {oops && <path d="M120 54 q5.5 8 0 12 q-5.5 -4 0 -12 Z" fill="#9BE1F7" stroke={INK} strokeWidth="1.5" />}
      {thinking && <><text x="124" y="40" fontSize="22" fontWeight="700" fill="#F59E0B" fontFamily="sans-serif">?</text><circle cx="116" cy="52" r="2" fill="#F59E0B" /><circle cx="110" cy="61" r="2.5" fill="#F59E0B" /></>}
    </svg>
  );
}

/* ----------------------------- GOL MATOL ----------------------------- */
export function GolMatol({ size = 140, emote = "idle", className }: CharProps) {
  const guilty = emote === "guilty";
  const sleepy = emote === "sleepy" || emote === "sleeping";
  const sleeping = emote === "sleeping";
  const peeking = emote === "peeking";
  const playful = emote === "playful";
  return (
    <svg
      viewBox="0 0 190 160"
      width={size}
      height={size * 0.84}
      className={`${className ?? ""} ${sleepy ? "anim-bob" : ""}`}
      style={peeking ? { transform: "scaleX(-1)" } : undefined}
      role="img"
      aria-label="Gol Matol the cat"
    >
      <defs>
        <radialGradient id="gmt-fur" cx="38%" cy="30%" r="85%"><stop offset="0%" stopColor="#FFB977" /><stop offset="55%" stopColor="#FB923C" /><stop offset="100%" stopColor="#F97316" /></radialGradient>
        <radialGradient id="gmt-belly" cx="45%" cy="35%" r="80%"><stop offset="0%" stopColor="#FFF7E8" /><stop offset="100%" stopColor="#FFE3BC" /></radialGradient>
        <linearGradient id="gmt-hat" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7DD3FC" /><stop offset="100%" stopColor="#38BDF8" /></linearGradient>
        <radialGradient id="gmt-eye" cx="40%" cy="35%" r="80%"><stop offset="0%" stopColor="#6EE7A0" /><stop offset="100%" stopColor="#16A34A" /></radialGradient>
      </defs>
      {/* cast shadow */}
      <ellipse cx="90" cy="152" rx="56" ry="5" fill={INK} opacity="0.12" />
      {/* question-mark tail */}
      <path d="M144 122 Q178 116 170 84 Q164 58 143 65" stroke={INK} strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M144 122 Q178 116 170 84 Q164 58 143 65" stroke="url(#gmt-fur)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="143" cy="65" r="5.5" fill="#EA580C" stroke={INK} strokeWidth="2.5" />
      {/* big round body + back stripes + cream belly */}
      <ellipse cx="88" cy="104" rx="60" ry="42" fill="url(#gmt-fur)" stroke={INK} strokeWidth="4" />
      <path d="M36 88 q7 12 4 26 M52 72 q7 16 3 34" stroke="#EA580C" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />
      <ellipse cx="88" cy="112" rx="33" ry="25" fill="url(#gmt-belly)" stroke={INK} strokeWidth="2.5" />
      {/* paws with toes */}
      <ellipse cx="58" cy="145" rx="14" ry="9" fill="url(#gmt-belly)" stroke={INK} strokeWidth="3" />
      <ellipse cx="118" cy="145" rx="14" ry="9" fill="url(#gmt-belly)" stroke={INK} strokeWidth="3" />
      <path d="M53 141 v7 M63 141 v7 M113 141 v7 M123 141 v7" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      {/* ears (right one folded; both flatten when guilty) */}
      <path d="M60 28 L50 2 L78 14 Z" fill="url(#gmt-fur)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" transform={guilty ? "rotate(-50 62 28)" : undefined} />
      <path d="M61 24 L55 10 L72 17 Z" fill="#FDBA74" transform={guilty ? "rotate(-50 62 28)" : undefined} />
      <path d="M116 22 Q127 2 140 8 Q133 14 131 32 Q122 30 116 22 Z" fill="#F97316" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" transform={guilty ? "rotate(60 118 24)" : undefined} />
      {/* head + forehead stripes */}
      <circle cx="88" cy="52" r="38" fill="url(#gmt-fur)" stroke={INK} strokeWidth="4" />
      <path d="M77 36 q-2 7 -1 12 M88 33 q0 8 0 13 M99 36 q2 7 1 12" stroke="#EA580C" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" />
      {/* mela party hat with pompom + dots */}
      <g transform="rotate(-9 88 20)">
        <circle cx="88" cy="6" r="5" fill="#F472B6" stroke={INK} strokeWidth="2.5" />
        <path d="M88 8 L107 32 L69 32 Z" fill="url(#gmt-hat)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="86" cy="18" r="2" fill="#FEF3C7" /><circle cx="94" cy="25" r="2" fill="#FEF3C7" /><circle cx="81" cy="26" r="2" fill="#FEF3C7" />
        <ellipse cx="88" cy="32" rx="21" ry="4.5" fill="#38BDF8" stroke={INK} strokeWidth="3" />
      </g>
      {/* green eyes: guilty squint / sleepy closed / playful wink */}
      {sleepy ? (
        <path d="M66 56 q8 6 16 0 M94 56 q8 6 16 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      ) : guilty ? (
        <>
          <path d="M66 55 q8 7 16 0 M94 55 q8 7 16 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M74 52 l-4 -3 M102 52 l4 -3" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : playful ? (
        <>
          <ellipse cx="74" cy="54" rx="8" ry="10" fill="url(#gmt-eye)" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="74" cy="54" rx="2.7" ry="6.5" fill={INK} />
          <circle cx="71.5" cy="49.5" r="2.3" fill="#fff" /><circle cx="76.5" cy="56" r="1.1" fill="#fff" />
          <path d="M95 55 q7 -7 14 0" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="74" cy="54" rx="8" ry="10" fill="url(#gmt-eye)" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="102" cy="54" rx="8" ry="10" fill="url(#gmt-eye)" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="74" cy="54" rx="2.7" ry="6.5" fill={INK} /><ellipse cx="102" cy="54" rx="2.7" ry="6.5" fill={INK} />
          <circle cx="71.5" cy="49.5" r="2.3" fill="#fff" /><circle cx="99.5" cy="49.5" r="2.3" fill="#fff" />
          <circle cx="76.5" cy="56" r="1.1" fill="#fff" /><circle cx="104.5" cy="56" r="1.1" fill="#fff" />
        </>
      )}
      {/* blush */}
      <circle cx="64" cy="64" r="5" fill="#FB7185" opacity="0.4" /><circle cx="112" cy="64" r="5" fill="#FB7185" opacity="0.4" />
      {/* white muzzle + pink nose + mouth */}
      <ellipse cx="88" cy="70" rx="17.5" ry="12" fill="url(#gmt-belly)" stroke={INK} strokeWidth="2.5" />
      <path d="M82.5 64.5 q5.5 -4.5 11 0 q-5.5 5.5 -11 0 Z" fill="#F472B6" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
      {guilty ? (
        <path d="M82 77.5 q6 -3.5 12 0" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      ) : playful ? (
        <>
          <path d="M80 73 q8 9 16 0 q-8 5 -16 0 Z" fill="#7A3B2D" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
          <ellipse cx="88" cy="77" rx="4" ry="2.4" fill="#F472B6" />
        </>
      ) : (
        <path d="M88 68 v4 M88 72 q-5.5 5 -11 1.5 M88 72 q5.5 5 11 1.5" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      )}
      {/* whiskers */}
      <path d="M55 60 l-15 -4 M56 67 h-16 M58 74 l-14 6 M121 60 l15 -4 M120 67 h16 M118 74 l14 6" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      {/* guilty sweat drop + zzz */}
      {guilty && <path d="M46 34 q5 7 0 11 q-5 -4 0 -11 Z" fill="#9BE1F7" stroke={INK} strokeWidth="1.5" />}
      {sleeping && <><text x="150" y="36" fontSize="22" fontWeight="700" fill={INK} fontFamily="sans-serif">z</text><text x="163" y="22" fontSize="15" fill={INK} opacity="0.75" fontFamily="sans-serif">z</text></>}
      {sleepy && !sleeping && <text x="152" y="40" fontSize="17" fill={INK} opacity="0.7" fontFamily="sans-serif">z</text>}
    </svg>
  );
}

/* ---------------------------- USTAAD ULLOO ---------------------------- */
export function UstaadUlloo({ size = 130, emote = "perch", className }: CharProps) {
  const flying = emote === "flying" || emote === "fly-in";
  const nodding = emote === "nodding";
  return (
    <svg
      viewBox="0 0 170 190"
      width={size}
      height={size * 1.12}
      className={`${className ?? ""} ${flying ? "anim-bob" : ""}`}
      role="img"
      aria-label="Ustaad Ulloo the wise owl"
    >
      <defs>
        <radialGradient id="uu-body" cx="40%" cy="28%" r="85%"><stop offset="0%" stopColor="#B06A33" /><stop offset="55%" stopColor="#92400E" /><stop offset="100%" stopColor="#78350F" /></radialGradient>
        <radialGradient id="uu-face" cx="40%" cy="32%" r="80%"><stop offset="0%" stopColor="#FEF3D8" /><stop offset="100%" stopColor="#F1DCA8" /></radialGradient>
        <radialGradient id="uu-belly" cx="45%" cy="32%" r="80%"><stop offset="0%" stopColor="#F8E9C0" /><stop offset="100%" stopColor="#EAD49E" /></radialGradient>
        <linearGradient id="uu-vest" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22C55E" /><stop offset="100%" stopColor="#166534" /></linearGradient>
        <linearGradient id="uu-wing" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A05A2C" /><stop offset="100%" stopColor="#7C431A" /></linearGradient>
        <radialGradient id="uu-lens" cx="35%" cy="30%" r="80%"><stop offset="0%" stopColor="#FBD683" /><stop offset="100%" stopColor="#E89B2D" /></radialGradient>
      </defs>
      {/* cast shadow */}
      <ellipse cx="85" cy="183" rx="48" ry="4.5" fill={INK} opacity="0.12" />
      {/* perch branch with leaves */}
      {!flying && (
        <>
          <path d="M32 172 Q85 165 138 172" stroke={INK} strokeWidth="13" fill="none" strokeLinecap="round" />
          <path d="M32 172 Q85 165 138 172" stroke="#8B5E3C" strokeWidth="7.5" fill="none" strokeLinecap="round" />
          <path d="M40 168 q-9 -12 -20 -10 q7 10 20 10 Z" fill="#65A30D" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M130 168 q9 -12 20 -10 q-7 10 -20 10 Z" fill="#65A30D" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        </>
      )}
      {/* spread feathered wings when flying */}
      {flying ? (
        <>
          <path d="M48 92 Q12 76 6 40 Q20 50 28 46 Q25 30 35 21 Q45 39 53 52 Q57 76 48 92 Z" fill="url(#uu-wing)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M122 92 Q158 76 164 40 Q150 50 142 46 Q145 30 135 21 Q125 39 117 52 Q113 76 122 92 Z" fill="url(#uu-wing)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        </>
      ) : null}
      {/* body + cream belly with feather scallops */}
      <ellipse cx="85" cy="114" rx="50" ry="58" fill="url(#uu-body)" stroke={INK} strokeWidth="4" />
      <ellipse cx="85" cy="122" rx="31" ry="36" fill="url(#uu-belly)" stroke={INK} strokeWidth="3" />
      <path d="M62 116 q9.5 8 19 0 M81 116 q9.5 8 19 0 M100 116 q7 6 14 0 M68 132 q9 7.5 18 0 M87 132 q9 7.5 18 0" stroke="#D9A05F" strokeWidth="2.5" fill="none" opacity="0.8" />
      {/* folded wings on the perch */}
      {!flying ? (
        <>
          <path d="M45 92 Q28 116 36 154 L47 144 L51 158 L61 146 L65 156 Q70 118 58 94 Z" fill="url(#uu-wing)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M125 92 Q142 116 134 154 L123 144 L119 158 L109 146 L105 156 Q100 118 112 94 Z" fill="url(#uu-wing)" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
        </>
      ) : null}
      {/* green waistcoat with buttons + lapels */}
      <path d="M46 94 Q50 142 64 160 L74 147 Q62 128 60 96 Z" fill="url(#uu-vest)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M124 94 Q120 142 106 160 L96 147 Q108 128 110 96 Z" fill="url(#uu-vest)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M60 97 L68 107 M110 97 L102 107" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="61" cy="114" r="2.2" fill="#FDE68A" stroke={INK} strokeWidth="1.5" /><circle cx="64" cy="131" r="2.2" fill="#FDE68A" stroke={INK} strokeWidth="1.5" />
      <circle cx="109" cy="114" r="2.2" fill="#FDE68A" stroke={INK} strokeWidth="1.5" /><circle cx="106" cy="131" r="2.2" fill="#FDE68A" stroke={INK} strokeWidth="1.5" />
      {/* talons: gripping the branch, or tucked in flight */}
      {!flying ? (
        <path d="M62 164 v9 M69 165 v10 M76 164 v9 M94 164 v9 M101 165 v10 M108 164 v9" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      ) : (
        <path d="M72 166 q-3 8 3 11 M98 166 q3 8 -3 11" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      )}
      {/* cream face disc + ear tufts */}
      <circle cx="85" cy="62" r="38" fill="url(#uu-face)" stroke={INK} strokeWidth="3.5" />
      <path d="M60 32 L50 12 L70 24 Z" fill="url(#uu-body)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M110 32 L120 12 L100 24 Z" fill="url(#uu-body)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      {/* scholar cap with tassel */}
      <path d="M72 29 Q85 17 98 29 L94 35 Q85 28 76 35 Z" fill="#166534" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M85 8 L114 21 L85 34 L56 21 Z" fill="#14532D" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="85" cy="21" r="2.4" fill="#FDE68A" stroke={INK} strokeWidth="1.8" />
      <path d="M85 21 Q106 20 109 36" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
      <circle cx="109" cy="38" r="3.5" fill="#F59E0B" stroke={INK} strokeWidth="2" />
      {/* bushy brows */}
      <path d="M54 45 q12 -9 24 -3 M92 42 q12 -6 24 3" stroke="#F8F3E6" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      {/* round amber glasses + eyes with highlights */}
      <path d="M54 58 L46 54 M116 58 L124 54" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      <circle cx="67" cy="60" r="13" fill="url(#uu-lens)" stroke="#B45309" strokeWidth="3.5" />
      <circle cx="103" cy="60" r="13" fill="url(#uu-lens)" stroke="#B45309" strokeWidth="3.5" />
      <path d="M80 58 q5 -4 10 0" stroke="#B45309" strokeWidth="3.5" fill="none" />
      <path d="M60 54 q5 -4 11 -3 M96 54 q5 -4 11 -3" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.65" />
      <circle cx="68" cy="61" r="5" fill="#8A4B0F" /><circle cx="102" cy="61" r="5" fill="#8A4B0F" />
      <circle cx="66.2" cy="59.2" r="1.9" fill="#fff" /><circle cx="100.2" cy="59.2" r="1.9" fill="#fff" />
      <circle cx="70" cy="63" r="1" fill="#fff" /><circle cx="104" cy="63" r="1" fill="#fff" />
      {/* beak */}
      <path d="M85 70 q-8 9 0 15 q8 -6 0 -15 Z" fill="#F59E0B" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* parchment scroll with writing (perch only) */}
      {!flying && (
        <g transform="rotate(-10 135 133)">
          <rect x="116" y="125" width="38" height="17" rx="4" fill="#FFF8EC" stroke={INK} strokeWidth="2.5" />
          <circle cx="116" cy="133.5" r="5.5" fill="#F1E4C3" stroke={INK} strokeWidth="2.5" />
          <circle cx="154" cy="133.5" r="5.5" fill="#F1E4C3" stroke={INK} strokeWidth="2.5" />
          <path d="M124 130 q4 3 8 0 q4 -3 8 0 q4 3 8 0" stroke="#B45309" strokeWidth="1.8" fill="none" />
          <path d="M127 136 q3 2 6 0 q3 -2 6 0" stroke="#B45309" strokeWidth="1.6" fill="none" />
        </g>
      )}
      {/* wise sparkles */}
      {nodding && <><text x="140" y="34" fontSize="22" fill="#F59E0B">✦</text><text x="24" y="52" fontSize="16" fill="#F59E0B">✦</text></>}
    </svg>
  );
}

/* ----------------------------- dispatcher ----------------------------- */
export function Character({
  id,
  size = 150,
  emote = "idle",
  className,
}: CharProps & { id: CharacterId | string }) {
  switch (id) {
    case "noor":
      return <Noor size={size} emote={emote} className={className} />;
    case "chotu":
      return <Chotu size={size} emote={emote} className={className} />;
    case "bijli":
      return <Bijli size={size} emote={emote} className={className} />;
    case "golmatol":
      return <GolMatol size={size} emote={emote} className={className} />;
    case "ustad-ullo":
    case "ustad":
      return <UstaadUlloo size={size} emote={emote} className={className} />;
    default:
      return null;
  }
}
