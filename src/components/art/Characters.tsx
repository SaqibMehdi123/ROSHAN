/**
 * ROSHAN character cast — hand-drawn flat SVG (storybook style, 3px warm-ink outline).
 * Characters support emotes (pose variations). All art is code-drawn so Phase 1 ships
 * with zero binary assets; artists can later replace each with SVG files (docs/07).
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
  const waking = emote === "waking" || emote === "waking-stretch";
  const sad = emote === "sad-battery" || emote === "battery-empty";
  const shortCircuit = emote === "short-circuit";
  const eyes = sleeping ? (
    <>
      <path d="M62 96 q10 8 20 0" stroke="#22D3EE" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M98 96 q10 8 20 0" stroke="#22D3EE" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ) : sad ? (
    <>
      <circle cx="72" cy="98" r="7" fill="#22D3EE" />
      <circle cx="108" cy="98" r="7" fill="#22D3EE" />
      <path d="M84 118 q6 -4 12 0" stroke="#22D3EE" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ) : (
    <>
      <path d="M62 98 q10 -14 20 0" stroke="#22D3EE" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M98 98 q10 -14 20 0" stroke="#22D3EE" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M84 112 q6 6 12 0" stroke="#22D3EE" strokeWidth="4" fill="none" strokeLinecap="round" />
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
      {/* antenna + lightning tip */}
      <g transform={sad ? "rotate(28 90 40)" : ""}>
        <line x1="90" y1="46" x2="90" y2="22" stroke={INK} strokeWidth="5" strokeLinecap="round" />
        <path
          d="M96 6 L84 26 L92 26 L86 40 L100 20 L92 20 Z"
          fill={sad ? "#B9AC98" : "#F59E0B"}
          stroke={INK}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
      {/* body — big warm egg */}
      <ellipse cx="90" cy="118" rx="62" ry="70" fill="#FDE047" stroke={INK} strokeWidth="4" />
      {/* face screen */}
      <rect x="48" y="78" width="84" height="56" rx="24" fill="#33333B" stroke={INK} strokeWidth="3" />
      {eyes}
      {/* blush */}
      <circle cx="52" cy="128" r="6" fill="#FBBF77" opacity="0.85" />
      <circle cx="128" cy="128" r="6" fill="#FBBF77" opacity="0.85" />
      {/* tummy screen */}
      <circle cx="90" cy="164" r="20" fill="#FFF8EC" stroke={INK} strokeWidth="3" />
      <path
        d="M90 156 l4 8 8 1 -6 6 2 8 -8 -4 -8 4 2 -8 -6 -6 8 -1 Z"
        fill={sad ? "#B9AC98" : "#EC4899"}
      />
      {/* arms */}
      <path d="M30 128 q-14 -4 -16 -16" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M150 128 q14 -4 16 -16" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* tread boots */}
      <rect x="56" y="182" width="28" height="12" rx="6" fill="#0D9488" stroke={INK} strokeWidth="3" />
      <rect x="96" y="182" width="28" height="12" rx="6" fill="#0D9488" stroke={INK} strokeWidth="3" />
      {/* Zzz when sleeping */}
      {sleeping && (
        <text x="132" y="60" fontSize="26" fontWeight="700" fill={INK} fontFamily="sans-serif">
          z
        </text>
      )}
      {waking && <text x="20" y="52" fontSize="26" fill="#F59E0B">✦</text>}
    </svg>
  );
}

/* ------------------------------- NOOR ------------------------------- */
export function Noor({ size = 150, emote = "idle", className }: CharProps) {
  const pointing = emote === "pointing";
  const thinking = emote === "thinking";
  const cheer = emote === "celebrating" || emote === "excited";
  return (
    <svg
      viewBox="0 0 160 220"
      width={size}
      height={size * 1.375}
      className={`${className ?? ""} ${cheer ? "anim-cheer" : ""} ${emote === "idle" || emote === "waving" ? "anim-bob" : ""}`}
      role="img"
      aria-label="Noor"
    >
      {/* braids */}
      <circle cx="38" cy="70" r="13" fill="#3B2A1A" stroke={INK} strokeWidth="3" />
      <circle cx="122" cy="70" r="13" fill="#3B2A1A" stroke={INK} strokeWidth="3" />
      <circle cx="38" cy="92" r="10" fill="#3B2A1A" stroke={INK} strokeWidth="3" />
      <circle cx="122" cy="92" r="10" fill="#3B2A1A" stroke={INK} strokeWidth="3" />
      {/* ribbon bows */}
      <circle cx="38" cy="60" r="6" fill="#EC4899" stroke={INK} strokeWidth="2.5" />
      <circle cx="122" cy="60" r="6" fill="#EC4899" stroke={INK} strokeWidth="2.5" />
      {/* head */}
      <circle cx="80" cy="72" r="40" fill="#F2C79B" stroke={INK} strokeWidth="4" />
      {/* hair top */}
      <path d="M42 62 q10 -30 38 -30 t38 30 q-8 -14 -38 -14 t-38 14" fill="#3B2A1A" stroke={INK} strokeWidth="3" />
      {/* eyes */}
      {thinking ? (
        <>
          <circle cx="66" cy="72" r="3.5" fill={INK} />
          <circle cx="94" cy="72" r="3.5" fill={INK} />
        </>
      ) : (
        <>
          <circle cx="66" cy="72" r="5" fill={INK} />
          <circle cx="94" cy="72" r="5" fill={INK} />
          <circle cx="67.5" cy="70.5" r="1.6" fill="#fff" />
          <circle cx="95.5" cy="70.5" r="1.6" fill="#fff" />
        </>
      )}
      {/* brows */}
      <path d={thinking ? "M58 60 q8 -6 16 -2" : "M58 58 q8 -4 16 0"} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d={thinking ? "M86 58 q8 -4 16 2" : "M86 58 q8 -4 16 0"} stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* smile with dimple */}
      <path d="M68 88 q12 10 24 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="64" cy="84" r="2" fill="#D9956B" />
      {/* dupatta behind shoulders */}
      <path d="M116 120 q28 30 14 62" stroke={INK} strokeWidth="3" fill="none" />
      <path d="M116 120 q28 30 14 62 l-16 -6 q8 -26 -10 -50 Z" fill="#F59E0B" opacity="0.95" />
      {/* kameez */}
      <path d="M56 126 q24 -12 48 0 l8 52 q-32 10 -64 0 Z" fill="#0D9488" stroke={INK} strokeWidth="4" />
      {/* arms */}
      {pointing ? (
        <path d="M108 140 q26 -8 34 -26" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      ) : cheer ? (
        <path d="M110 136 q20 -22 10 -40" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M110 136 q12 14 4 30" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      )}
      <path d="M52 136 q-12 14 -4 30" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* shalwar */}
      <path d="M60 178 l-4 30 h14 l6 -26 h8 l6 26 h14 l-4 -30 Z" fill="#fff" stroke={INK} strokeWidth="3.5" />
      {/* thinking bubble */}
      {thinking && <text x="118" y="46" fontSize="22" fill="#F59E0B">؟</text>}
    </svg>
  );
}

/* ------------------------------- CHOTU ------------------------------- */
export function Chotu({ size = 145, emote = "idle", className }: CharProps) {
  const surprised = emote === "surprised" || emote === "oops";
  const cheer = emote === "celebrating" || emote === "excited";
  return (
    <svg
      viewBox="0 0 160 210"
      width={size}
      height={size * 1.31}
      className={`${className ?? ""} ${cheer ? "anim-cheer" : ""} ${emote === "idle" ? "anim-bob" : ""}`}
      role="img"
      aria-label="Chotu"
    >
      {/* head */}
      <circle cx="80" cy="70" r="38" fill="#E8B27D" stroke={INK} strokeWidth="4" />
      {/* messy hair with cowlick */}
      <path d="M44 62 q6 -28 36 -28 t36 28 q-10 -12 -36 -12 t-36 12" fill="#231A12" stroke={INK} strokeWidth="3" />
      <path d="M80 34 q2 -14 12 -16 q-4 10 -2 14" fill="#231A12" stroke={INK} strokeWidth="2.5" />
      {/* eyes */}
      {surprised ? (
        <>
          <circle cx="67" cy="70" r="7" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx="93" cy="70" r="7" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx="67" cy="70" r="3" fill={INK} />
          <circle cx="93" cy="70" r="3" fill={INK} />
        </>
      ) : (
        <>
          <circle cx="67" cy="70" r="5" fill={INK} />
          <circle cx="93" cy="70" r="5" fill={INK} />
        </>
      )}
      {/* grin with missing tooth */}
      <path
        d={surprised ? "M70 90 q10 -4 20 0" : "M68 86 q12 12 24 0 l-4 4 q-8 4 -16 0 Z"}
        stroke={INK}
        strokeWidth="3"
        fill={surprised ? "none" : "#fff"}
      />
      {/* band-aid on cheek */}
      <rect x="96" y="84" width="14" height="6" rx="3" fill="#FDE68A" stroke={INK} strokeWidth="1.5" transform="rotate(-18 103 87)" />
      {/* orange tee with lightning */}
      <path d="M54 122 q26 -12 52 0 l6 46 q-32 10 -64 0 Z" fill="#F59E0B" stroke={INK} strokeWidth="4" />
      <path d="M84 134 l-8 14 h7 l-5 14 12 -18 h-7 l6 -10 Z" fill="#fff" />
      {/* arms */}
      {cheer ? (
        <>
          <path d="M110 130 q20 -20 12 -38" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M50 130 q-20 -20 -12 -38" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M110 132 q12 14 4 28" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M50 132 q-12 14 -4 28" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      )}
      {/* shorts */}
      <path d="M58 168 l-4 26 h20 l4 -20 h4 l4 20 h20 l-4 -26 Z" fill="#8B5E3C" stroke={INK} strokeWidth="3.5" />
      {/* legs */}
      <path d="M70 194 v10 M90 194 v10" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ----------------------------- GOL MATOL ----------------------------- */
export function GolMatol({ size = 140, emote = "idle", className }: CharProps) {
  const guilty = emote === "guilty";
  const sleepy = emote === "sleepy" || emote === "sleeping";
  const peeking = emote === "peeking";
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
      {/* question-mark tail */}
      <path d="M158 120 q30 -6 22 -34 q-6 -20 -26 -14" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* big round body */}
      <ellipse cx="88" cy="106" rx="62" ry="44" fill="#FB923C" stroke={INK} strokeWidth="4" />
      {/* belly */}
      <ellipse cx="88" cy="116" rx="36" ry="26" fill="#fff" stroke={INK} strokeWidth="2.5" />
      {/* stripes */}
      <path d="M52 78 q6 10 2 20 M88 66 q4 10 0 22 M124 78 q-6 10 -2 20" stroke="#EA580C" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* head */}
      <circle cx="88" cy="52" r="36" fill="#FB923C" stroke={INK} strokeWidth="4" />
      {/* ears (one folded) */}
      <path d="M60 28 l-6 -20 20 10 Z" fill="#FB923C" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M118 28 l8 -18 -20 8 Z" fill="#EA580C" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      {/* eyes */}
      {sleepy ? (
        <>
          <path d="M68 52 q8 6 16 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M96 52 q8 6 16 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="76" cy="52" rx="8" ry="10" fill="#22C55E" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="102" cy="52" rx="8" ry="10" fill="#22C55E" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="76" cy="52" rx="2.5" ry="6" fill={INK} />
          <ellipse cx="102" cy="52" rx="2.5" ry="6" fill={INK} />
        </>
      )}
      {/* white muzzle + smile */}
      <ellipse cx="89" cy="72" rx="18" ry="12" fill="#fff" stroke={INK} strokeWidth="2" />
      <path d="M89 66 v6 M89 72 l-6 4 M89 72 l6 4" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      {guilty ? (
        <path d="M78 80 q11 -6 22 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M80 80 q9 7 18 0" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
      )}
      {/* whiskers */}
      <path d="M58 68 h-14 M60 74 l-13 4 M120 68 h14 M118 74 l13 4" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      {/* paws */}
      <ellipse cx="60" cy="146" rx="13" ry="8" fill="#fff" stroke={INK} strokeWidth="3" />
      <ellipse cx="116" cy="146" rx="13" ry="8" fill="#fff" stroke={INK} strokeWidth="3" />
      {/* mela party hat */}
      <path d="M88 16 l10 22 h-20 Z" fill="#38BDF8" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="88" cy="14" r="4" fill="#EC4899" stroke={INK} strokeWidth="2" />
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
      {/* body */}
      <ellipse cx="85" cy="112" rx="52" ry="62" fill="#92400E" stroke={INK} strokeWidth="4" />
      {/* belly feathers */}
      <path d="M60 120 q25 22 50 0 M62 138 q23 18 46 0" stroke="#D9A066" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* face disc */}
      <circle cx="85" cy="66" r="40" fill="#FDE68A" stroke={INK} strokeWidth="3.5" />
      {/* bushy brows */}
      <path d="M52 46 q14 -10 26 -2 M92 44 q14 -8 26 2" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* glasses + amber eyes */}
      <circle cx="68" cy="62" r="12" fill="#fff" stroke="#B45309" strokeWidth="3.5" />
      <circle cx="102" cy="62" r="12" fill="#fff" stroke="#B45309" strokeWidth="3.5" />
      <line x1="80" y1="62" x2="90" y2="62" stroke="#B45309" strokeWidth="3" />
      <circle cx="68" cy="62" r="4.5" fill="#B45309" />
      <circle cx="102" cy="62" r="4.5" fill="#B45309" />
      {/* beak */}
      <path d="M85 72 l-7 10 h14 Z" fill="#F59E0B" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      {/* green waistcoat */}
      <path d="M46 96 q10 34 20 40 l6 -10 q-10 -8 -14 -34 Z" fill="#166534" stroke={INK} strokeWidth="3" />
      <path d="M124 96 q-10 34 -20 40 l-6 -10 q10 -8 14 -34 Z" fill="#166534" stroke={INK} strokeWidth="3" />
      {/* wing holding scroll */}
      {flying ? (
        <>
          <path d="M40 96 q-26 -10 -30 -34" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M130 96 q26 -10 30 -34" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M40 100 q-12 16 -2 30" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M130 100 q12 16 2 30" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* parchment scroll */}
          <rect x="118" y="126" width="34" height="16" rx="4" fill="#FFF8EC" stroke={INK} strokeWidth="2.5" transform="rotate(-12 135 134)" />
        </>
      )}
      {/* talons on branch (perch only) */}
      {!flying && <path d="M62 172 h46" stroke="#8B5E3C" strokeWidth="7" strokeLinecap="round" />}
      {/* wise sparkles */}
      {nodding && <text x="130" y="40" fontSize="20" fill="#F59E0B">✦</text>}
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
