import type { ReactNode } from "react";

const INK = "#4A3421";

/**
 * Story scene backgrounds (400x225 stage) — "Friendly Realism" v3 (docs/02)
 *
 * Composition rules baked in:
 *  - Characters (~100-120px) stand at bottom-centre (x 120-280, y 150-225):
 *    that band stays calm — flat ground colours, no texture below y 180.
 *  - Depth stack per scene: sky gradient → far silhouettes (30-50% opacity) →
 *    midground objects (full colour) → foreground ground plane w/ subtle texture.
 *  - No ink outlines on scenery (tone-on-tone edges only); the only INK use is
 *    faint strokes on tiny foreground props.
 *  - All gradient ids are prefixed per scene and document-unique.
 */
export const SCENES: Record<string, ReactNode> = {
  /* ---- W1 · bg-storeroom — dim school storeroom, cosy discovery ---- */
  "bg-storeroom": (
    <g>
      <defs>
        <linearGradient id="srm-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7E5F3D" /><stop offset="1" stopColor="#5A442A" /></linearGradient>
        <linearGradient id="srm-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C09B6C" /><stop offset="1" stopColor="#9E7B50" /></linearGradient>
        <radialGradient id="srm-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFE9B8" stopOpacity="0.55" /><stop offset="1" stopColor="#FFE9B8" stopOpacity="0" /></radialGradient>
        <linearGradient id="srm-shadeL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#3A2B17" stopOpacity="0.45" /><stop offset="1" stopColor="#3A2B17" stopOpacity="0" /></linearGradient>
        <linearGradient id="srm-shadeR" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#3A2B17" stopOpacity="0.45" /><stop offset="1" stopColor="#3A2B17" stopOpacity="0" /></linearGradient>
      </defs>

      {/* back wall + ceiling */}
      <rect x="0" y="0" width="400" height="168" fill="url(#srm-wall)" />
      <rect x="0" y="0" width="400" height="13" fill="#57422A" />
      <path d="M110 0 V13 M260 0 V13" stroke="#4A3823" strokeWidth="2" />

      {/* subtle mud bricks (tone-on-tone, staggered) */}
      <g opacity="0.5">
        {[0, 1, 2, 3, 4, 5, 6].map((row) =>
          [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
            <rect key={`b-${row}-${col}`} x={col * 58 + (row % 2 ? 29 : 0) - 29} y={row * 24} width="54" height="21" rx="2" fill={row % 2 ? "#81633F" : "#8A6C48"} />
          ))
        )}
      </g>

      {/* packed-dirt floor + corner shading for depth */}
      <rect x="0" y="168" width="400" height="57" fill="url(#srm-floor)" />
      <rect x="0" y="0" width="62" height="225" fill="url(#srm-shadeL)" />
      <rect x="338" y="0" width="62" height="225" fill="url(#srm-shadeR)" />

      {/* high small window upper-left + dusty light beam */}
      <ellipse cx="60" cy="40" rx="62" ry="46" fill="url(#srm-glow)" />
      <rect x="34" y="21" width="52" height="37" rx="3" fill="#5F4728" />
      <rect x="39" y="26" width="42" height="27" fill="#FFE9B8" />
      <path d="M60 26 V53 M39 39 h42" stroke="#5F4728" strokeWidth="3" />
      <rect x="31" y="58" width="58" height="5" rx="2" fill="#5F4728" />
      <path d="M38 63 L88 63 L142 168 L58 168 Z" fill="#FFE2A6" opacity="0.26" />
      <path d="M52 63 L76 63 L112 168 L76 168 Z" fill="#FFF3D0" opacity="0.13" />

      {/* wooden shelves on the right — jars, chalk boxes, books */}
      <g>
        <rect x="296" y="56" width="90" height="8" rx="2" fill="#7E5C38" />
        <rect x="300" y="64" width="7" height="102" fill="#6B4E2E" /> <rect x="375" y="64" width="7" height="102" fill="#6B4E2E" />
        <rect x="298" y="86" width="86" height="8" rx="2" fill="#7E5C38" /> <rect x="298" y="124" width="86" height="8" rx="2" fill="#7E5C38" />
        {/* top of the unit */}
        <rect x="306" y="42" width="13" height="14" rx="2" fill="#B8D8C8" /> <rect x="305" y="39" width="15" height="4" rx="1" fill="#EAD9B0" />
        <rect x="330" y="44" width="22" height="12" rx="1.5" fill="#EAD9B0" />
        <path d="M335 44 v-5 M341 44 v-5 M347 44 v-5" stroke="#FFF8EC" strokeWidth="2.2" strokeLinecap="round" />
        {/* shelf 1 */}
        <rect x="308" y="70" width="13" height="16" rx="2" fill="#D9A8A0" /> <rect x="324" y="70" width="13" height="16" rx="2" fill="#B8D8C8" />
        <rect x="307" y="67" width="15" height="4" rx="1" fill="#EAD9B0" /> <rect x="323" y="67" width="15" height="4" rx="1" fill="#EAD9B0" />
        <rect x="341" y="72" width="12" height="14" rx="2" fill="#EAD9B0" />
        <rect x="358" y="72" width="22" height="14" rx="1.5" fill="#9A7448" stroke="#7E5C38" strokeWidth="1.5" />
        {/* shelf 2 — chalk boxes + book stack */}
        <rect x="306" y="110" width="26" height="14" rx="1.5" fill="#EAD9B0" /> <rect x="338" y="110" width="26" height="14" rx="1.5" fill="#E3CFA4" />
        <path d="M311 110 v-6 M317 110 v-6 M323 110 v-6" stroke="#FFF8EC" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M343 110 v-5 M349 110 v-5 M355 110 v-5" stroke="#FFF8EC" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="362" y="118" width="22" height="5" rx="1" fill="#A66A5A" /> <rect x="364" y="113" width="18" height="5" rx="1" fill="#6B8FA3" /> <rect x="366" y="108" width="14" height="5" rx="1" fill="#C9A24E" />
      </g>

      {/* stacked crates + jute sack on the left */}
      <g>
        <ellipse cx="46" cy="196" rx="36" ry="5" fill="#6B4E2E" opacity="0.3" />
        <rect x="10" y="152" width="68" height="42" rx="2" fill="#9A7448" stroke="#7E5C38" strokeWidth="2" />
        <path d="M26 156 V190 M44 156 V190 M62 156 V190" stroke="#7E5C38" strokeWidth="2.5" opacity="0.8" />
        <rect x="30" y="164" width="13" height="11" rx="1" fill="#EAD9B0" opacity="0.85" />
        <rect x="18" y="120" width="52" height="32" rx="2" fill="#A67C4E" stroke="#7E5C38" strokeWidth="2" />
        <path d="M34 124 V148 M52 124 V148" stroke="#7E5C38" strokeWidth="2.5" opacity="0.8" />
        <path d="M88 190 q-12 -4 -12 -14 q0 -12 12 -12 q12 0 12 12 q0 10 -12 14 Z" fill="#C9AE7E" />
        <ellipse cx="88" cy="162" rx="4" ry="3" fill="#B99F72" />
      </g>

      {/* floor texture — sides only, centre stays flat */}
      <g fill="#8F6C44" opacity="0.4">
        <circle cx="30" cy="186" r="1.2" /><circle cx="52" cy="198" r="1.2" /><circle cx="74" cy="186" r="1.2" /><circle cx="18" cy="206" r="1.2" /><circle cx="88" cy="212" r="1.2" />
        <circle cx="312" cy="192" r="1.2" /><circle cx="336" cy="204" r="1.2" /><circle cx="360" cy="188" r="1.2" /><circle cx="384" cy="212" r="1.2" /><circle cx="300" cy="214" r="1.2" />
      </g>
      <path d="M40 216 q8 -3 14 0 M324 218 q8 -3 14 0" stroke="#8F6C44" strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* dust motes drifting in the beam */}
      <g fill="#FFE9B8">
        <circle cx="92" cy="78" r="1.6" opacity="0.8" /><circle cx="118" cy="92" r="1.2" opacity="0.6" /><circle cx="74" cy="108" r="1.8" opacity="0.75" />
        <circle cx="138" cy="74" r="1.1" opacity="0.55" /><circle cx="58" cy="132" r="1.4" opacity="0.65" /><circle cx="104" cy="122" r="1.2" opacity="0.5" />
      </g>
    </g>
  ),

  /* ---- W1 · bg-village-street — sunny lane, mud houses, mango tree ---- */
  "bg-village-street": (
    <g>
      <defs>
        <linearGradient id="vst-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#98D3EB" /><stop offset="1" stopColor="#F4EDD2" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="168" fill="url(#vst-sky)" />

      {/* sun upper-left with soft halo */}
      <circle cx="86" cy="38" r="38" fill="#FFE9A8" opacity="0.15" /> <circle cx="86" cy="38" r="26" fill="#FFE9A8" opacity="0.25" />
      <circle cx="86" cy="38" r="14" fill="#FFDF8E" />

      {/* soft clouds + far birds */}
      <g fill="#FFFFFF">
        <ellipse cx="150" cy="34" rx="26" ry="10" opacity="0.92" /><ellipse cx="168" cy="30" rx="17" ry="8" opacity="0.92" /><ellipse cx="132" cy="30" rx="13" ry="7" opacity="0.92" />
        <ellipse cx="296" cy="50" rx="22" ry="9" opacity="0.85" /><ellipse cx="311" cy="46" rx="14" ry="7" opacity="0.85" /><ellipse cx="352" cy="22" rx="13" ry="6" opacity="0.7" />
      </g>
      <path d="M208 46 q5 -6 10 0 q5 -6 10 0 M234 38 q4 -5 8 0 q4 -5 8 0" stroke="#7A8C99" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* distant hills, two muted layers */}
      <path d="M0 132 Q60 114 128 128 T256 126 T400 132 L400 168 L0 168 Z" fill="#A9C48F" opacity="0.5" />
      <path d="M0 142 Q80 128 160 140 T320 138 T400 142 L400 168 L0 168 Z" fill="#97B87E" opacity="0.55" />

      {/* left house (further back) */}
      <g>
        <rect x="62" y="88" width="78" height="64" fill="#E7D3A8" />
        <rect x="57" y="78" width="88" height="12" rx="2" fill="#C89B6B" /> <rect x="57" y="90" width="88" height="3" fill="#C2A273" opacity="0.8" />
        <path d="M90 152 v-32 a9 9 0 0 1 18 0 v32 Z" fill="#8B5E3C" />
        <path d="M96 124 v24 M102 124 v24" stroke="#7A4E30" strokeWidth="1.5" opacity="0.5" />
        <rect x="116" y="100" width="16" height="15" rx="2" fill="#A8CDDA" stroke="#B99B6C" strokeWidth="2" />
        <path d="M124 100 v15 M116 107 h16" stroke="#B99B6C" strokeWidth="1.5" />
      </g>

      {/* right house (nearer) */}
      <g>
        <rect x="292" y="70" width="106" height="98" fill="#E7D3A8" />
        <rect x="287" y="60" width="116" height="12" rx="2" fill="#C89B6B" />
        <path d="M296 122 h98 M296 142 h98" stroke="#DCC79C" strokeWidth="1.5" opacity="0.6" />
        <path d="M332 168 v-40 a12 12 0 0 1 24 0 v40 Z" fill="#8B5E3C" />
        <path d="M340 130 v34 M348 130 v34" stroke="#7A4E30" strokeWidth="1.5" opacity="0.5" />
        <rect x="328" y="166" width="32" height="6" rx="2" fill="#D9C49A" />
        <rect x="304" y="92" width="16" height="18" rx="2" fill="#A8CDDA" stroke="#B99B6C" strokeWidth="2" />
        <path d="M312 92 v18 M304 101 h16" stroke="#B99B6C" strokeWidth="1.5" />
        <rect x="362" y="92" width="16" height="18" rx="2" fill="#A8CDDA" stroke="#B99B6C" strokeWidth="2" />
        <path d="M370 92 v18 M362 101 h16" stroke="#B99B6C" strokeWidth="1.5" />
        <path d="M316 168 h12 l-2 -12 h-8 Z" fill="#C97B4E" />
      </g>

      {/* mango tree, foreground left */}
      <g>
        <path d="M30 176 C32 150 30 132 36 118 L45 118 C42 134 44 152 46 176 Z" fill="#8B5E3C" />
        <path d="M38 124 Q52 112 62 110" stroke="#8B5E3C" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="104" r="20" fill="#559146" /> <circle cx="72" cy="106" r="16" fill="#5FA24E" />
        <circle cx="46" cy="110" r="18" fill="#63AC57" /> <circle cx="52" cy="94" r="22" fill="#6FB35B" />
        <circle cx="58" cy="86" r="12" fill="#7CBF66" opacity="0.8" />
        <g fill="#F2B33D">
          <ellipse cx="36" cy="112" rx="3.2" ry="4.5" /><ellipse cx="60" cy="104" rx="3.2" ry="4.5" /><ellipse cx="74" cy="112" rx="3.2" ry="4.5" />
        </g>
      </g>

      {/* dirt ground + winding path (flat centre) */}
      <rect x="0" y="165" width="400" height="60" fill="#C6A878" />
      <rect x="0" y="165" width="400" height="3" fill="#B3925F" opacity="0.5" />
      <path d="M178 166 L226 166 L312 225 L84 225 Z" fill="#C9AB79" opacity="0.6" />
      <path d="M184 166 L220 166 L302 225 L94 225 Z" fill="#DCC294" />

      {/* grass tufts + stones at the sides */}
      <g stroke="#7FA055" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M28 190 q-3 -9 -7 -11 M28 190 q0 -11 1 -13 M28 190 q4 -8 8 -10" /> <path d="M58 206 q-3 -9 -7 -11 M58 206 q0 -11 1 -13 M58 206 q4 -8 8 -10" />
        <path d="M352 192 q-3 -9 -7 -11 M352 192 q0 -11 1 -13 M352 192 q4 -8 8 -10" /> <path d="M376 208 q-3 -9 -7 -11 M376 208 q0 -11 1 -13 M376 208 q4 -8 8 -10" />
      </g>
      <g fill="#B39B77" opacity="0.8">
        <ellipse cx="96" cy="180" rx="5" ry="3" /><ellipse cx="306" cy="186" rx="6" ry="3.5" /><ellipse cx="340" cy="216" rx="5" ry="3" />
      </g>
    </g>
  ),

  /* ---- W1 · bg-courtyard — family veraanda, chillies & charpai ---- */
  "bg-courtyard": (
    <g>
      <defs>
        <linearGradient id="crt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A5D8EC" /><stop offset="1" stopColor="#EAF4E4" /></linearGradient>
        <linearGradient id="crt-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FBF0D7" /><stop offset="1" stopColor="#EFE0BC" /></linearGradient>
        <linearGradient id="crt-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DCA96E" /><stop offset="1" stopColor="#C9925C" /></linearGradient>
      </defs>

      {/* sky strip above the courtyard wall */}
      <rect x="0" y="0" width="400" height="46" fill="url(#crt-sky)" />
      <circle cx="48" cy="18" r="22" fill="#FFE9A8" opacity="0.25" /> <circle cx="48" cy="18" r="12" fill="#FFE9A8" />

      {/* cream plaster wall with coping + trowel marks */}
      <rect x="0" y="50" width="400" height="126" fill="url(#crt-wall)" />
      <rect x="0" y="42" width="400" height="8" fill="#E2CF9F" /> <rect x="0" y="50" width="400" height="2" fill="#D6C08C" />
      <path d="M170 82 q10 -4 18 0 M206 122 q10 -4 18 0 M148 132 q10 -4 18 0" stroke="#EBDDB9" strokeWidth="1.5" fill="none" opacity="0.7" />

      {/* bougainvillea spilling over the top-left */}
      <g>
        <circle cx="14" cy="26" r="4" fill="#D95BA0" /><circle cx="22" cy="32" r="3.4" fill="#C74E92" /><circle cx="10" cy="36" r="3.4" fill="#D95BA0" />
        <circle cx="18" cy="42" r="4" fill="#E170B0" /><circle cx="28" cy="40" r="3" fill="#D95BA0" />
        <ellipse cx="8" cy="46" rx="4" ry="2.5" fill="#5C8A4A" /> <ellipse cx="26" cy="48" rx="4" ry="2.5" fill="#5C8A4A" />
        <circle cx="8" cy="54" r="2.4" fill="#D95BA0" opacity="0.85" /> <circle cx="16" cy="58" r="2.4" fill="#C74E92" opacity="0.85" />
      </g>

      {/* little sparrow on the coping */}
      <g>
        <ellipse cx="150" cy="39" rx="5.5" ry="4" fill="#8A7156" /> <circle cx="155" cy="36" r="3" fill="#8A7156" />
        <path d="M158 36 l4 1 -4 1.5 Z" fill="#D9863C" /> <path d="M145 39 l-6 -2 v4 Z" fill="#6B543F" />
        <path d="M148 38 q3 -3 6 0" stroke="#6B543F" strokeWidth="1.2" fill="none" />
      </g>

      {/* arched niche with a little pot */}
      <g>
        <path d="M62 158 v-52 a22 22 0 0 1 44 0 v52 Z" fill="#E6D4AB" />
        <path d="M68 158 v-48 a16 16 0 0 1 32 0 v48 Z" fill="#DFC99B" />
        <ellipse cx="84" cy="108" rx="13" ry="4" fill="#CDB687" opacity="0.7" />
        <rect x="73" y="143" width="22" height="5" rx="2" fill="#B96A42" />
        <path d="M75 148 h18 l-4 12 h-10 Z" fill="#C97B4E" />
        <rect x="58" y="156" width="52" height="4" fill="#D6C08C" />
      </g>

      {/* hanging strands: drying chillies + a marigold string */}
      <path d="M292 54 Q340 66 390 56" stroke="#B99B6C" strokeWidth="2" fill="none" />
      {[0, 1, 2, 3].map((s) => {
        const x = 300 + s * 22;
        const top = [58, 62, 63, 59][s];
        const len = [26, 34, 30, 22][s];
        return (
          <g key={`strand-${s}`}>
            <path d={`M${x} ${top} v${len}`} stroke="#B99B6C" strokeWidth="1.2" />
            {s < 3
              ? [0, 1, 2, 3].map((k) => (
                  <g key={k}>
                    <ellipse cx={x} cy={top + 6 + k * 7} rx="2.2" ry="4.2" fill={k % 2 ? "#C44B3A" : "#D9483B"} transform={`rotate(8 ${x} ${top + 6 + k * 7})`} />
                    <circle cx={x} cy={top + 3 + k * 7} r="1.2" fill="#5C8A4A" />
                  </g>
                ))
              : [0, 1, 2].map((k) => (
                  <circle key={k} cx={x} cy={top + 8 + k * 7} r="3.2" fill={k % 2 ? "#E8862E" : "#F2A03D"} />
                ))}
          </g>
        );
      })}

      {/* charpai on the far right */}
      <g>
        <ellipse cx="356" cy="190" rx="42" ry="5" fill="#B98453" opacity="0.3" />
        <path d="M322 165 v20 M350 165 v20 M378 165 v20" stroke="#8F5F35" strokeWidth="4" strokeLinecap="round" />
        <rect x="314" y="152" width="84" height="13" rx="4" fill="#B07C4A" />
        <path d="M320 156 h72 M320 160 h72 M320 164 h72" stroke="#D9B57E" strokeWidth="1.6" opacity="0.7" />
        <path d="M330 154 v9 M341 154 v9 M352 154 v9 M363 154 v9 M374 154 v9 M385 154 v9" stroke="#C99B63" strokeWidth="1.2" opacity="0.5" />
        <rect x="316" y="145" width="26" height="10" rx="3" fill="#C85C7A" /> <path d="M318 149 h22" stroke="#A94A66" strokeWidth="1.2" />
        <rect x="346" y="146" width="18" height="8" rx="3" fill="#D9863C" />
      </g>

      {/* potted plant left */}
      <g>
        {[-38, -19, 0, 19, 38].map((a, i) => (
          <g key={a} transform={`translate(45 172) rotate(${a})`}>
            <path d="M0 0 C-6 -20 -4 -38 0 -50 C4 -38 6 -20 0 0 Z" fill={i % 2 ? "#5FA24E" : "#4E8A3F"} />
          </g>
        ))}
        <rect x="28" y="172" width="34" height="6" rx="2" fill="#B96A42" />
        <path d="M30 178 h30 l-5 18 h-20 Z" fill="#C97B4E" />
      </g>

      {/* clay-tile floor — seams kept off the calm centre */}
      <rect x="0" y="172" width="400" height="53" fill="url(#crt-floor)" />
      <g stroke="#B98453" strokeWidth="1.5" opacity="0.45">
        <path d="M0 184 H118 M282 184 H400" /> <path d="M0 197 H118 M282 197 H400" /> <path d="M0 211 H118 M282 211 H400" />
        <path d="M34 174 V184 M68 184 V197 M100 174 V184" /> <path d="M330 184 V197 M362 174 V184 M390 197 V211" />
      </g>
      <g fill="#F2A03D" opacity="0.8">
        <circle cx="352" cy="198" r="1.6" /><circle cx="360" cy="204" r="1.6" /><circle cx="344" cy="206" r="1.6" />
      </g>
    </g>
  ),

  /* ---- W1 · bg-lab — the school computer lab, first visit ---- */
  "bg-lab": (
    <g>
      <defs>
        <linearGradient id="lab-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EEF8FB" /><stop offset="1" stopColor="#D7E9F0" /></linearGradient>
        <linearGradient id="lab-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BFE3F2" /><stop offset="1" stopColor="#E8F6FB" /></linearGradient>
        <linearGradient id="lab-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CFD9DF" /><stop offset="1" stopColor="#BCC9D1" /></linearGradient>
      </defs>

      {/* cool wall + ceiling strip light */}
      <rect x="0" y="12" width="400" height="160" fill="url(#lab-wall)" />
      <rect x="0" y="0" width="400" height="12" fill="#CBDCE4" />
      <rect x="140" y="2" width="120" height="10" rx="5" fill="#FFFFFF" opacity="0.25" /> <rect x="148" y="3" width="104" height="7" rx="3.5" fill="#F6FBFD" />

      {/* big barred window, centre-back, with light pooling on the floor */}
      <rect x="154" y="26" width="92" height="84" rx="4" fill="#B9CFDA" />
      <rect x="160" y="32" width="80" height="72" fill="url(#lab-win)" />
      <path d="M180 32 V104 M200 32 V104 M220 32 V104 M160 68 H240" stroke="#B9CFDA" strokeWidth="4" />
      <rect x="150" y="110" width="100" height="7" rx="2" fill="#C6D6DE" />
      <path d="M168 117 L232 117 L260 176 L140 176 Z" fill="#FFFFFF" opacity="0.16" />

      {/* poster + clock on the wall */}
      <rect x="96" y="36" width="46" height="36" rx="3" fill="#F4FAFC" stroke="#C3D6DE" strokeWidth="2" />
      <path d="M104 50 h10 l3 4 h15 v13 h-28 Z" fill="#7FB3E8" /> <path d="M104 50 h10 l3 4 h-13 Z" fill="#5E93CC" />
      <rect x="108" y="62" width="20" height="2.5" rx="1" fill="#C3D6DE" />
      <circle cx="286" cy="48" r="11" fill="#F8FBFC" stroke="#C3D6DE" strokeWidth="3" />
      <path d="M286 48 V41 M286 48 h5" stroke={INK} strokeOpacity="0.45" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="286" cy="48" r="1.2" fill="#8FA5AF" />

      {/* cable sagging along the wall */}
      <path d="M0 122 q25 8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke="#9FB4BE" strokeWidth="2.5" fill="none" />
      <rect x="118" y="126" width="8" height="7" rx="1.5" fill="#A9BCC5" /> <rect x="274" y="126" width="8" height="7" rx="1.5" fill="#A9BCC5" />

      {/* desks receding on both sides, monitors as quiet cream boxes */}
      <g>
        <rect x="16" y="98" width="78" height="9" rx="2" fill="#C89B6B" /> <rect x="16" y="105" width="78" height="3" fill="#A87E4F" />
        <path d="M24 107 V150 M86 107 V150" stroke="#A87E4F" strokeWidth="4" />
        <rect x="38" y="88" width="8" height="6" fill="#D9D2C2" /> <rect x="26" y="64" width="34" height="26" rx="2" fill="#EFE8DA" />
        <rect x="30" y="68" width="26" height="18" fill="#33424B" /> <path d="M34 80 l8 -5" stroke="#4E6270" strokeWidth="2" />
        <rect x="6" y="138" width="112" height="11" rx="3" fill="#C89B6B" /> <rect x="6" y="147" width="112" height="3.5" fill="#A87E4F" />
        <path d="M14 150 V198 M110 150 V198" stroke="#A87E4F" strokeWidth="5" />
        <rect x="44" y="126" width="10" height="12" fill="#D9D2C2" /> <rect x="26" y="96" width="46" height="32" rx="2" fill="#EFE8DA" />
        <rect x="31" y="101" width="36" height="22" fill="#33424B" /> <path d="M36 116 l9 -6" stroke="#4E6270" strokeWidth="2" />
        <rect x="80" y="132" width="11" height="7" rx="3.5" fill="#D9E2E7" /> <path d="M88 132 q6 -8 12 -4" stroke="#9FB4BE" strokeWidth="1.5" fill="none" />
        <rect x="40" y="168" width="24" height="6" rx="2" fill="#B98A5A" /> <path d="M43 174 V192 M61 174 V192" stroke="#A87E4F" strokeWidth="3.5" />
      </g>
      <g>
        <rect x="306" y="98" width="78" height="9" rx="2" fill="#C89B6B" /> <rect x="306" y="105" width="78" height="3" fill="#A87E4F" />
        <path d="M314 107 V150 M376 107 V150" stroke="#A87E4F" strokeWidth="4" />
        <rect x="354" y="88" width="8" height="6" fill="#D9D2C2" /> <rect x="342" y="64" width="34" height="26" rx="2" fill="#EFE8DA" />
        <rect x="346" y="68" width="26" height="18" fill="#33424B" /> <path d="M350 80 l8 -5" stroke="#4E6270" strokeWidth="2" />
        <rect x="282" y="138" width="112" height="11" rx="3" fill="#C89B6B" /> <rect x="282" y="147" width="112" height="3.5" fill="#A87E4F" />
        <path d="M290 150 V198 M386 150 V198" stroke="#A87E4F" strokeWidth="5" />
        <rect x="346" y="126" width="10" height="12" fill="#D9D2C2" /> <rect x="328" y="96" width="46" height="32" rx="2" fill="#EFE8DA" />
        <rect x="333" y="101" width="36" height="22" fill="#33424B" /> <path d="M338 116 l9 -6" stroke="#4E6270" strokeWidth="2" />
        <rect x="326" y="132" width="11" height="7" rx="3.5" fill="#D9E2E7" />
        <rect x="336" y="168" width="24" height="6" rx="2" fill="#B98A5A" /> <path d="M339 174 V192 M357 174 V192" stroke="#A87E4F" strokeWidth="3.5" />
      </g>

      {/* grey tiled floor — seams only at the sides */}
      <rect x="0" y="170" width="400" height="4" fill="#C2D0D8" /> <rect x="0" y="172" width="400" height="53" fill="url(#lab-floor)" />
      <g stroke="#AAB9C1" strokeWidth="1.5" opacity="0.55">
        <path d="M0 186 H114 M286 186 H400" /> <path d="M0 200 H114 M286 200 H400" /> <path d="M0 214 H100 M298 214 H400" />
        <path d="M30 176 V186 M66 186 V200 M96 200 V214" /> <path d="M330 176 V186 M362 186 V200 M310 200 V214" />
      </g>

      {/* dust drifting in the window light */}
      <g fill="#FFFFFF" opacity="0.5">
        <circle cx="190" cy="130" r="1.2" /><circle cx="212" cy="148" r="1" /><circle cx="198" cy="160" r="1.3" />
      </g>
    </g>
  ),

  /* ---- W2 · bg-meadow — Mouse Meadow, playful freedom ---- */
  "bg-meadow": (
    <g>
      <defs>
        <linearGradient id="mdw-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#97D4EE" /><stop offset="1" stopColor="#E9F8EC" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="165" fill="url(#mdw-sky)" />

      {/* friendly sun upper-left + clouds + far birds */}
      <circle cx="64" cy="36" r="36" fill="#FFE9A8" opacity="0.15" /> <circle cx="64" cy="36" r="24" fill="#FFE9A8" opacity="0.25" /> <circle cx="64" cy="36" r="14" fill="#FFDF8E" />
      <g fill="#FFFFFF">
        <ellipse cx="150" cy="34" rx="26" ry="10" opacity="0.92" /><ellipse cx="168" cy="30" rx="17" ry="8" opacity="0.92" /><ellipse cx="132" cy="30" rx="13" ry="7" opacity="0.92" />
        <ellipse cx="296" cy="50" rx="22" ry="9" opacity="0.85" /><ellipse cx="311" cy="46" rx="14" ry="7" opacity="0.85" /><ellipse cx="352" cy="22" rx="13" ry="6" opacity="0.7" />
      </g>
      <path d="M238 44 q5 -6 10 0 q5 -6 10 0 M262 52 q4 -5 8 0 q4 -5 8 0" stroke="#7A99A8" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* rolling hills — two layers */}
      <path d="M0 140 Q70 120 150 136 T310 134 T400 142 L400 170 L0 170 Z" fill="#A9CC8F" opacity="0.6" />
      <path d="M0 160 Q100 144 200 156 T400 152 L400 225 L0 225 Z" fill="#8FBF6B" />

      {/* winding dirt path (flat ribbon, calm centre) */}
      <path d="M202 156 C196 180 158 190 170 212 C178 228 222 228 244 225" stroke="#C8A874" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M202 156 C196 180 158 190 170 212 C178 228 222 228 244 225" stroke="#E4CA96" strokeWidth="20" fill="none" strokeLinecap="round" />

      {/* wildflowers on the sides */}
      <g>
        {([
          [24, 196, "#F2A0C4"], [40, 188, "#F5D55E"], [58, 200, "#FFFFFF"],
          [76, 190, "#F2A03D"], [46, 208, "#F2A0C4"],
          [316, 194, "#F5D55E"], [334, 202, "#F2A03D"], [352, 192, "#FFFFFF"],
          [368, 204, "#F2A03D"], [382, 192, "#F2A0C4"],
        ] as [number, number, string][]).map(([x, y, c], i) => (
          <g key={`fl-${i}`}>
            <path d={`M${x} ${y} v-8`} stroke="#4E8A3F" strokeWidth="2" strokeLinecap="round" />
            <circle cx={x} cy={y - 10} r="3.2" fill={c} />
          </g>
        ))}
        <circle cx="40" cy="150" r="2" fill="#FFFFFF" opacity="0.9" /> <circle cx="356" cy="152" r="2" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* one butterfly far away */}
      <g transform="translate(334 82)">
        <ellipse cx="-4" cy="0" rx="4.5" ry="6.5" fill="#F59E49" transform="rotate(-24)" />
        <ellipse cx="4" cy="0" rx="4.5" ry="6.5" fill="#F5B263" transform="rotate(24)" />
        <path d="M0 -6 V6" stroke="#8A7156" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M-1 -6 q-2 -3 -4 -3 M1 -6 q2 -3 4 -3" stroke="#8A7156" strokeWidth="1" fill="none" />
      </g>

      {/* grass tufts at the sides */}
      <g stroke="#6FA24E" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M30 214 q-4 -10 -8 -12 M30 214 q0 -12 2 -14 M30 214 q4 -10 8 -12" /> <path d="M66 206 q-4 -10 -8 -12 M66 206 q0 -12 2 -14 M66 206 q4 -10 8 -12" />
        <path d="M344 212 q-4 -10 -8 -12 M344 212 q0 -12 2 -14 M344 212 q4 -10 8 -12" /> <path d="M376 202 q-4 -10 -8 -12 M376 202 q0 -12 2 -14 M376 202 q4 -10 8 -12" />
      </g>
    </g>
  ),

  /* ---- W2 · bg-pond — village pond, quiet wonder ---- */
  "bg-pond": (
    <g>
      <defs>
        <linearGradient id="pnd-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9FD6EE" /><stop offset="1" stopColor="#EFF7E0" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="155" fill="url(#pnd-sky)" />

      {/* sun + clouds */}
      <circle cx="56" cy="30" r="26" fill="#FFE9A8" opacity="0.2" /> <circle cx="56" cy="30" r="14" fill="#FFDF8E" />
      <g fill="#FFFFFF">
        <ellipse cx="140" cy="32" rx="24" ry="9" opacity="0.9" /><ellipse cx="156" cy="28" rx="14" ry="7" opacity="0.9" />
        <ellipse cx="300" cy="44" rx="20" ry="8" opacity="0.8" /><ellipse cx="314" cy="40" rx="12" ry="6" opacity="0.8" />
      </g>

      {/* distant treeline, misty */}
      <path d="M0 118 Q24 100 48 112 T96 110 T144 114 T192 108 T240 114 T288 108 T336 112 T384 108 L400 112 L400 152 L0 152 Z" fill="#9DBE8E" opacity="0.4" />
      <path d="M0 132 Q30 118 60 128 T120 126 T180 130 T240 124 T300 130 T360 124 L400 130 L400 155 L0 155 Z" fill="#8FB582" opacity="0.5" />

      {/* grassy ground */}
      <rect x="0" y="150" width="400" height="75" fill="#8CBC66" /> <rect x="0" y="150" width="400" height="3" fill="#79A954" opacity="0.7" />

      {/* the pond, midground-left, + tongue passing under the bridge */}
      <path d="M-24 192 C-24 164 36 152 116 154 C196 156 252 172 256 194 C252 214 196 224 116 224 C36 224 -24 214 -24 192 Z" fill="#6FB8D8" />
      <ellipse cx="120" cy="206" rx="118" ry="12" fill="#58A0C4" opacity="0.35" />
      <ellipse cx="110" cy="172" rx="105" ry="10" fill="#9AD4E8" opacity="0.75" />
      <path d="M248 186 C280 178 318 180 342 190 C346 199 330 208 300 208 C272 208 252 200 248 194 Z" fill="#6FB8D8" />

      {/* ripples + sparkles */}
      <path d="M56 186 q10 5 20 0 M176 172 q9 4 18 0" stroke="#CFEAF4" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M70 166 h10 M128 176 h8 M96 188 h7" stroke="#E8F6FB" strokeWidth="1.8" opacity="0.8" strokeLinecap="round" />

      {/* lily pads + a shy bud */}
      <g>
        <circle cx="50" cy="192" r="10" fill="#57A05C" /> <path d="M50 192 L58 187 L58 197 Z" fill="#6FB8D8" />
        <circle cx="86" cy="198" r="8" fill="#4E9455" /> <path d="M86 198 L93 194 L93 202 Z" fill="#6FB8D8" />
        <circle cx="30" cy="182" r="7" fill="#57A05C" /> <path d="M30 182 L36 178 L36 186 Z" fill="#6FB8D8" />
        <path d="M54 192 V186" stroke="#4E8A3F" strokeWidth="1.5" /> <ellipse cx="54" cy="184" rx="2.5" ry="3.5" fill="#F2A0C4" />
      </g>

      {/* reeds — two tall cattails far-left, a small clump far-right */}
      <g>
        <path d="M18 200 V128" stroke="#4E8A3F" strokeWidth="2.5" /> <rect x="15.5" y="114" width="5" height="15" rx="2.5" fill="#8F5F35" />
        <path d="M18 114 V108" stroke="#4E8A3F" strokeWidth="1.5" />
        <path d="M30 200 V140" stroke="#4E8A3F" strokeWidth="2.5" /> <rect x="27.5" y="127" width="5" height="14" rx="2.5" fill="#8F5F35" />
        <path d="M12 200 q-6 -24 -2 -40 M34 200 q8 -20 4 -36" stroke="#5FA24E" strokeWidth="2" fill="none" />
        <path d="M384 198 V156" stroke="#4E8A3F" strokeWidth="2.2" /> <rect x="381.5" y="145" width="5" height="12" rx="2.5" fill="#8F5F35" />
        <path d="M390 198 q8 -18 4 -32" stroke="#5FA24E" strokeWidth="2" fill="none" />
      </g>

      {/* small wooden bridge on the right */}
      <g>
        <path d="M268 198 Q318 186 366 198" stroke="#58A0C4" strokeWidth="4" fill="none" opacity="0.3" />
        <path d="M290 192 V206 M348 192 V206" stroke="#8F5F35" strokeWidth="5" />
        <path d="M262 184 Q316 156 372 184" stroke="#B07C4A" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M282 171 v10 M306 165 v10 M330 165 v10 M354 171 v10" stroke="#8F5F35" strokeWidth="1.8" opacity="0.7" />
        <path d="M262 168 Q316 140 372 168" stroke="#9A6B3F" strokeWidth="3.5" fill="none" />
        <path d="M276 162 V177 M316 155 V170 M356 162 V177" stroke="#9A6B3F" strokeWidth="3" />
      </g>

      {/* near bank strip — flat ground where characters stand */}
      <path d="M-10 210 Q100 200 200 210 T400 208 L400 225 L0 225 Z" fill="#86B862" />

      {/* bank details: tufts, flowers, a dragonfly */}
      <g stroke="#4E8A3F" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M8 218 q-3 -9 -6 -11 M8 218 q0 -10 1 -12 M8 218 q3 -9 6 -11" /> <path d="M390 216 q-3 -9 -6 -11 M390 216 q0 -10 1 -12 M390 216 q3 -9 6 -11" />
      </g>
      <g>
        <path d="M300 172 v-7 M322 166 v-7 M368 174 v-7" stroke="#4E8A3F" strokeWidth="2" />
        <circle cx="300" cy="163" r="2.6" fill="#F2A0C4" /> <circle cx="322" cy="157" r="2.6" fill="#F5D55E" /> <circle cx="368" cy="165" r="2.6" fill="#F2A03D" />
      </g>
      <g transform="translate(298 96)">
        <path d="M-6 0 h12" stroke="#8A7156" strokeWidth="1.8" strokeLinecap="round" />
        <ellipse cx="-4" cy="-4" rx="5" ry="2.2" fill="#CFE8F2" opacity="0.85" transform="rotate(-18 -4 -4)" />
        <ellipse cx="-4" cy="4" rx="5" ry="2.2" fill="#CFE8F2" opacity="0.85" transform="rotate(18 -4 4)" />
        <ellipse cx="4" cy="-3" rx="4" ry="2" fill="#E2F2F8" opacity="0.85" transform="rotate(-12 4 -3)" />
        <ellipse cx="4" cy="3" rx="4" ry="2" fill="#E2F2F8" opacity="0.85" transform="rotate(12 4 3)" />
      </g>
    </g>
  ),

  /* ---- W3 · bg-castle — Keyboard Kingdom, storybook ---- */
  "bg-castle": (
    <g>
      <defs>
        <linearGradient id="cas-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E2D4F7" /><stop offset="1" stopColor="#F7F2FD" /></linearGradient>
        <linearGradient id="cas-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BCB0CE" /><stop offset="1" stopColor="#A99BC0" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="170" fill="url(#cas-sky)" />

      {/* soft clouds + birds */}
      <g fill="#FFFFFF">
        <ellipse cx="70" cy="36" rx="24" ry="9" opacity="0.85" /><ellipse cx="86" cy="32" rx="14" ry="7" opacity="0.85" />
        <ellipse cx="330" cy="48" rx="20" ry="8" opacity="0.75" /><ellipse cx="344" cy="44" rx="12" ry="6" opacity="0.75" />
      </g>
      <path d="M96 30 q4 -5 8 0 q4 -5 8 0 M118 38 q3.5 -4 7 0 q3.5 -4 7 0" stroke="#8B7BA6" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* far misty hills */}
      <path d="M0 130 Q60 118 120 128 T240 126 T360 130 L400 126 L400 168 L0 168 Z" fill="#D6C6F0" opacity="0.45" />

      {/* low far wall with keyhole arches + merlons */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect key={`m-${i}`} x={44 + i * 38} y="112" width="14" height="8" fill="#CBBBE8" />
        ))}
        <rect x="34" y="118" width="332" height="38" fill="#CBBBE8" opacity="0.9" /> <rect x="34" y="152" width="332" height="4" fill="#BBA9E0" />
        {[76, 142, 208, 274, 340].map((cx) => (
          <g key={`ka-${cx}`}>
            <path d={`M${cx - 8} 152 V138 A8 8 0 0 1 ${cx + 8} 138 V152 Z`} fill="#EDE6FA" />
            <circle cx={cx} cy="133" r="5.5" fill="#EDE6FA" />
          </g>
        ))}
      </g>

      {/* gentle hill the castle sits on + curtain wall with gate */}
      <path d="M88 168 Q200 120 312 168 Z" fill="#C5B6E2" />
      <rect x="124" y="122" width="196" height="28" fill="#D8C9F0" />
      <path d="M188 150 V132 A12 12 0 0 1 212 132 V150 Z" fill="#6D4FB0" />
      <path d="M192 150 V134 A8 8 0 0 1 208 134 V150 Z" fill="#8F5F35" />
      <path d="M198 136 v14 M203 136 v14" stroke="#7A4E30" strokeWidth="1.2" opacity="0.6" />
      <rect x="184" y="148" width="32" height="5" rx="1" fill="#BBA9E0" />

      {/* left tower */}
      <g>
        <rect x="128" y="78" width="40" height="72" fill="#CDBAEE" /> <rect x="158" y="78" width="10" height="72" fill="#B49AE0" opacity="0.6" />
        <rect x="128" y="100" width="40" height="5" fill="#BBA9E0" opacity="0.6" />
        <path d="M143 96 a5 5 0 0 1 10 0 v10 h-10 Z" fill="#FBF6FF" />
        <path d="M122 78 L148 46 L174 78 Z" fill="#8B5CF6" /> <path d="M148 46 L174 78 L148 78 Z" fill="#7E48D8" />
        <path d="M148 46 V32" stroke="#6D4FB0" strokeWidth="2" /> <path d="M148 32 L165 36.5 L148 41 Z" fill="#F2A03D" />
      </g>

      {/* centre tower with the kingdom banner (key emblem) */}
      <g>
        <rect x="178" y="58" width="44" height="92" fill="#D5C4F2" /> <rect x="210" y="58" width="12" height="92" fill="#BCA6E8" opacity="0.6" />
        <rect x="178" y="84" width="44" height="5" fill="#C2B1E8" opacity="0.7" />
        <path d="M193 78 a7 7 0 0 1 14 0 v12 h-14 Z" fill="#FBF6FF" />
        <path d="M172 58 L200 20 L228 58 Z" fill="#7C5CD6" /> <path d="M200 20 L228 58 L200 58 Z" fill="#6A4BC4" />
        <path d="M200 20 V6" stroke="#6D4FB0" strokeWidth="2" />
        <rect x="200" y="7" width="24" height="15" rx="1" fill="#FFF4D9" />
        <circle cx="209" cy="13" r="2.6" fill="none" stroke="#8B5CF6" strokeWidth="1.8" /> <path d="M209 15 v5 M209 18 h3" stroke="#8B5CF6" strokeWidth="1.8" />
      </g>

      {/* right tower */}
      <g>
        <rect x="232" y="86" width="40" height="64" fill="#CDBAEE" /> <rect x="262" y="86" width="10" height="64" fill="#B49AE0" opacity="0.6" />
        <rect x="232" y="106" width="40" height="5" fill="#BBA9E0" opacity="0.6" />
        <path d="M247 104 a5 5 0 0 1 10 0 v10 h-10 Z" fill="#FBF6FF" />
        <path d="M226 86 L252 56 L278 86 Z" fill="#8B5CF6" /> <path d="M252 56 L278 86 L252 86 Z" fill="#7E48D8" />
        <path d="M252 56 V42" stroke="#6D4FB0" strokeWidth="2" /> <path d="M252 42 L268 46.5 L252 51 Z" fill="#4FB3A5" />
      </g>

      {/* purple-grey stone ground + paving at the sides */}
      <rect x="0" y="168" width="400" height="57" fill="url(#cas-ground)" />
      <path d="M176 168 L226 168 L252 225 L148 225 Z" fill="#C9BCDD" opacity="0.55" />
      <g fill="#9C8FBA" opacity="0.35">
        <ellipse cx="30" cy="196" rx="12" ry="5" /><ellipse cx="62" cy="208" rx="10" ry="4" /><ellipse cx="16" cy="214" rx="9" ry="4" /><ellipse cx="88" cy="190" rx="9" ry="4" />
        <ellipse cx="322" cy="192" rx="12" ry="5" /><ellipse cx="352" cy="206" rx="10" ry="4" /><ellipse cx="386" cy="196" rx="9" ry="4" /><ellipse cx="306" cy="216" rx="9" ry="4" />
      </g>

      {/* side bushes + sparkles near the towers */}
      <g>
        <circle cx="28" cy="174" r="11" fill="#7E9C74" /> <circle cx="38" cy="178" r="8" fill="#749268" /> <circle cx="20" cy="178" r="7" fill="#88A67E" />
        <circle cx="372" cy="172" r="10" fill="#7E9C74" /> <circle cx="362" cy="177" r="7" fill="#749268" /> <circle cx="382" cy="177" r="7" fill="#88A67E" />
      </g>
      <g fill="#FFE9A8" opacity="0.75">
        <path d="M118 58 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2 Z" />
        <path d="M288 50 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2 -2.8 -2.8 -1.2 2.8 -1.2 Z" />
        <path d="M250 96 l1 2.4 2.4 1 -2.4 1 -1 2.4 -1 -2.4 -2.4 -1 2.4 -1 Z" />
      </g>
    </g>
  ),

  /* ---- W4 · bg-city — Control City, orderly adventure ---- */
  "bg-city": (
    <g>
      <defs>
        <linearGradient id="cty-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C6E4F6" /><stop offset="1" stopColor="#ECF6FC" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="170" fill="url(#cty-sky)" />

      {/* sun + clouds + a little plane */}
      <circle cx="60" cy="30" r="22" fill="#FFEFC2" opacity="0.25" /> <circle cx="60" cy="30" r="12" fill="#FFE29A" />
      <g fill="#FFFFFF">
        <ellipse cx="150" cy="30" rx="24" ry="9" opacity="0.9" /><ellipse cx="166" cy="26" rx="14" ry="7" opacity="0.9" /><ellipse cx="310" cy="44" rx="18" ry="7" opacity="0.8" />
      </g>
      <path d="M300 20 h18" stroke="#FFFFFF" strokeWidth="2" opacity="0.35" strokeLinecap="round" />
      <path d="M322 22 q8 -4 18 -2 l8 -4 v5 l-8 1 q-10 4 -18 0 Z" fill="#FFFFFF" opacity="0.85" />

      {/* far skyline silhouette */}
      <g fill="#A9C4E2" opacity="0.5">
        <rect x="0" y="112" width="34" height="52" /><rect x="30" y="100" width="26" height="64" /><rect x="52" y="118" width="30" height="46" /><rect x="84" y="96" width="24" height="68" />
        <rect x="246" y="106" width="26" height="58" /><rect x="270" y="120" width="30" height="44" /><rect x="356" y="108" width="28" height="56" /><rect x="380" y="122" width="20" height="42" />
      </g>

      {/* folder tower — a friendly filing cabinet on the left */}
      <g>
        <path d="M34 44 h24 l7 9 h-31 Z" fill="#5E93CC" />
        <rect x="34" y="44" width="64" height="118" rx="3" fill="#7FB3E8" /> <rect x="82" y="44" width="16" height="118" fill="#6AA2DC" opacity="0.5" />
        <path d="M40 70 h52 M40 94 h52 M40 118 h52 M40 142 h52" stroke="#5E93CC" strokeWidth="2" />
        <rect x="56" y="66" width="20" height="3" rx="1.5" fill="#EAF3FB" /> <rect x="56" y="90" width="20" height="3" rx="1.5" fill="#EAF3FB" />
        <rect x="56" y="114" width="20" height="3" rx="1.5" fill="#EAF3FB" /> <rect x="56" y="138" width="20" height="3" rx="1.5" fill="#EAF3FB" />
        <path d="M66 44 V28" stroke="#5E93CC" strokeWidth="2" /> <circle cx="66" cy="26" r="2.5" fill="#F2C14E" />
      </g>

      {/* organised mid buildings */}
      <g>
        <rect x="118" y="126" width="30" height="36" fill="#B7D4F0" />
        <rect x="124" y="132" width="12" height="9" rx="1.5" fill="#EAF3FB" /> <rect x="124" y="148" width="12" height="9" rx="1.5" fill="#FDF3D5" />
        <rect x="150" y="88" width="58" height="74" fill="#A5CBEF" /> <rect x="192" y="88" width="16" height="74" fill="#8FBBE6" opacity="0.5" />
        <rect x="196" y="80" width="12" height="8" rx="1" fill="#C7DFF2" />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect key={`w2-${r}-${c}`} x={158 + c * 24} y={96 + r * 20} width="16" height="11" rx="1.5" fill={(r + c) % 2 ? "#FDF3D5" : "#EAF3FB"} />
          ))
        )}
        <rect x="216" y="102" width="46" height="60" fill="#8FBBE6" />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect key={`w3-${r}-${c}`} x={222 + c * 22} y={110 + r * 18} width="14" height="10" rx="1.5" fill="#EAF3FB" />
          ))
        )}
        <rect x="300" y="78" width="70" height="84" fill="#9CC5EC" /> <rect x="352" y="78" width="18" height="84" fill="#85B2E0" opacity="0.5" />
        <rect x="322" y="66" width="18" height="12" rx="2" fill="#C7DFF2" /> <path d="M326 78 v-10 M336 78 v-10" stroke="#85B2E0" strokeWidth="2" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={`w4-${r}-${c}`} x={308 + c * 22} y={88 + r * 20} width="14" height="10" rx="1.5" fill={(r + c) % 3 === 1 ? "#FDF3D5" : "#EAF3FB"} />
          ))
        )}
        <rect x="328" y="146" width="16" height="16" rx="1.5" fill="#EAF3FB" />
      </g>

      {/* tidy streets: sidewalks + road, markings off the calm centre */}
      <rect x="0" y="166" width="400" height="18" fill="#D5E2EB" /> <rect x="0" y="184" width="400" height="30" fill="#C3D3DE" /> <rect x="0" y="214" width="400" height="11" fill="#D5E2EB" />
      <g stroke="#BECDD8" strokeWidth="1.5" opacity="0.7">
        <path d="M0 184 H116 M284 184 H400" /> <path d="M0 214 H116 M284 214 H400" />
      </g>
      <g fill="#EFF4F7" opacity="0.75">
        {[6, 32, 58, 84].map((x) => (<rect key={`dl-${x}`} x={x} y="197" width="16" height="3.5" rx="1.5" />))}
        {[288, 314, 340, 366].map((x) => (<rect key={`dr-${x}`} x={x} y="197" width="16" height="3.5" rx="1.5" />))}
        {[34, 44, 54, 64].map((x) => (<rect key={`cw-${x}`} x={x} y="187" width="5" height="24" rx="2" />))}
      </g>

      {/* folder-shaped signposts on both sides */}
      <g>
        <path d="M54 196 V150" stroke="#8FA5B4" strokeWidth="3.5" />
        <rect x="32" y="126" width="44" height="26" rx="3" fill="#FFF8EC" /> <path d="M32 126 h16 l5 6 h-21 Z" fill="#F2C14E" />
        <rect x="38" y="138" width="24" height="3" rx="1.5" fill="#C9A24E" opacity="0.6" /> <rect x="38" y="144" width="16" height="3" rx="1.5" fill="#C9A24E" opacity="0.4" />
        <path d="M346 196 V150" stroke="#8FA5B4" strokeWidth="3.5" />
        <rect x="324" y="126" width="44" height="26" rx="3" fill="#EAF3FB" /> <path d="M324 126 h16 l5 6 h-21 Z" fill="#7FB3E8" />
        <rect x="330" y="138" width="24" height="3" rx="1.5" fill="#7FA8C9" opacity="0.6" /> <rect x="330" y="144" width="16" height="3" rx="1.5" fill="#7FA8C9" opacity="0.4" />
      </g>

      {/* sidewalk trees + a bird over the avenue */}
      <g>
        <rect x="18" y="176" width="5" height="16" fill="#8F5F35" /> <circle cx="20" cy="168" r="12" fill="#7FAF6E" /> <circle cx="29" cy="174" r="9" fill="#6FA05E" />
        <rect x="376" y="178" width="5" height="14" fill="#8F5F35" /> <circle cx="378" cy="168" r="11" fill="#7FAF6E" /> <circle cx="370" cy="174" r="8" fill="#6FA05E" />
      </g>
      <path d="M180 60 q4 -5 8 0 q4 -5 8 0" stroke="#7A99A8" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  ),

  /* ---- W5 · bg-workshop — painter's art room (most used, made with love) ---- */
  "bg-workshop": (
    <g>
      <defs>
        <linearGradient id="wrk-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFF2DE" /><stop offset="1" stopColor="#F7DFC0" /></linearGradient>
        <radialGradient id="wrk-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#FFFFFF" stopOpacity="0.4" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" /></radialGradient>
        <linearGradient id="wrk-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#DCA970" /><stop offset="1" stopColor="#C9925C" /></linearGradient>
      </defs>

      {/* warm wall + light from upper-left */}
      <rect x="0" y="0" width="400" height="172" fill="url(#wrk-wall)" />
      <ellipse cx="86" cy="44" rx="130" ry="88" fill="url(#wrk-glow)" />

      {/* celebration bunting */}
      <path d="M6 20 Q200 46 394 20" stroke="#D9A2BC" strokeWidth="2" fill="none" />
      {[
        [45, 24.7], [107, 30], [169, 32.7], [231, 32.7], [293, 30], [355, 24.7],
      ].map(([x, y], i) => (
        <path key={`p-${i}`} d={`M${x - 9} ${y} L${x + 9} ${y} L${x} ${y + 15} Z`} fill={["#F2A03D", "#4FB3A5", "#E36E9A", "#7FB3E8", "#9CBE5E", "#C9A2E8"][i]} />
      ))}

      {/* pegboard with tools, centre-back */}
      <g>
        <rect x="150" y="40" width="104" height="60" rx="4" fill="#E8D3AC" stroke="#D2BA8C" strokeWidth="2" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <circle key={`h-${r}-${c}`} cx={164 + c * 25} cy={54 + r * 15} r="1.4" fill="#C9AE7E" opacity="0.85" />
          ))
        )}
        <path d="M170 62 L178 74 M176 62 L168 74" stroke="#8A7156" strokeWidth="2" strokeLinecap="round" />
        <circle cx="168.5" cy="77" r="3" fill="none" stroke="#8A7156" strokeWidth="1.8" /> <circle cx="177.5" cy="77" r="3" fill="none" stroke="#8A7156" strokeWidth="1.8" />
        <rect x="196" y="56" width="28" height="6" rx="1" fill="#F2DFAE" stroke="#D9C8A4" strokeWidth="1" />
        <path d="M200 56 v3 M205 56 v4 M210 56 v3 M215 56 v4 M220 56 v3" stroke="#C9B48E" strokeWidth="1" />
        <path d="M234 58 V74" stroke="#A97848" strokeWidth="2.5" /> <path d="M231 74 h6 l-1.5 7 h-3 Z" fill="#4FB3A5" />
      </g>

      {/* shelf unit on the left — jars, brushes, tubes, crayons */}
      <g>
        <rect x="10" y="58" width="6" height="112" fill="#A97848" /> <rect x="110" y="58" width="6" height="112" fill="#A97848" />
        <rect x="8" y="74" width="110" height="8" rx="2" fill="#B78454" /> <rect x="8" y="110" width="110" height="8" rx="2" fill="#B78454" /> <rect x="8" y="146" width="110" height="8" rx="2" fill="#B78454" />
        <path d="M8 81 H118 M8 117 H118 M8 153 H118" stroke="#96703F" strokeWidth="1.5" />
        {/* shelf 1: paint jars + brush pot */}
        <rect x="18" y="58" width="13" height="16" rx="2" fill="#4FB3A5" /> <rect x="34" y="58" width="13" height="16" rx="2" fill="#E36E9A" />
        <rect x="50" y="60" width="11" height="14" rx="2" fill="#7FB3E8" /> <rect x="64" y="60" width="11" height="14" rx="2" fill="#F2D55E" />
        <rect x="17" y="55" width="15" height="4" rx="1" fill="#FFF8EC" /> <rect x="33" y="55" width="15" height="4" rx="1" fill="#FFF8EC" />
        <rect x="49" y="57" width="13" height="4" rx="1" fill="#FFF8EC" /> <rect x="63" y="57" width="13" height="4" rx="1" fill="#FFF8EC" />
        <rect x="84" y="54" width="20" height="20" rx="2" fill="#EFE3CC" opacity="0.9" />
        <path d="M89 58 V40 M95 58 V36 M101 58 V42" stroke="#A97848" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="89" cy="38" r="2.5" fill="#E36E9A" /> <circle cx="95" cy="34" r="2.5" fill="#4FB3A5" /> <circle cx="101" cy="40" r="2.5" fill="#F2D55E" />
        {/* shelf 2: paint tubes + paper */}
        <rect x="16" y="98" width="18" height="7" rx="3" fill="#FFF4D9" /> <rect x="34" y="99" width="5" height="5" rx="1" fill="#4FB3A5" />
        <rect x="44" y="100" width="18" height="7" rx="3" fill="#FFF4D9" /> <rect x="62" y="101" width="5" height="5" rx="1" fill="#E36E9A" />
        <rect x="72" y="98" width="18" height="7" rx="3" fill="#FFF4D9" /> <rect x="90" y="99" width="5" height="5" rx="1" fill="#F2A03D" />
        <rect x="96" y="102" width="22" height="7" rx="1" fill="#FBF3E0" /> <path d="M99 105.5 h16" stroke="#E4D5B8" strokeWidth="1" />
        {/* shelf 3: paint can, rolled canvas, crayon box */}
        <rect x="18" y="128" width="17" height="18" rx="1.5" fill="#CBD2D8" /> <rect x="18" y="133" width="17" height="8" fill="#E36E9A" />
        <path d="M18 130 Q26.5 122 35 130" stroke="#A9B2B8" strokeWidth="2" fill="none" />
        <rect x="44" y="136" width="34" height="9" rx="4.5" fill="#EFE3CC" /> <circle cx="44" cy="140.5" r="4.5" fill="#E4D5B8" /> <circle cx="44" cy="140.5" r="1.5" fill="#C9B48E" />
        <rect x="88" y="132" width="24" height="14" fill="#C9A96B" />
        <circle cx="94" cy="130" r="2" fill="#E36E9A" /> <circle cx="100" cy="129" r="2" fill="#F2D55E" /> <circle cx="106" cy="130" r="2" fill="#4FB3A5" />
      </g>

      {/* easel with a half-painted canvas, right edge */}
      <g>
        <path d="M306 208 L344 116 M382 208 L344 116" stroke="#A97848" strokeWidth="5" strokeLinecap="round" />
        <path d="M344 128 L358 206" stroke="#96703F" strokeWidth="4" strokeLinecap="round" />
        <path d="M316 176 L372 176" stroke="#A97848" strokeWidth="3.5" />
        <rect x="314" y="118" width="62" height="52" rx="2" fill="#FFF8EC" stroke="#E9D8B6" strokeWidth="2" />
        <path d="M345 118 H376 V170 H345 Z" fill="#BFE3F0" /> <circle cx="362" cy="130" r="7" fill="#F2C14E" />
        <path d="M345 152 Q360 138 376 150 V170 H345 Z" fill="#8CC18F" />
        <path d="M322 152 Q332 138 344 150" stroke="#D9C8A4" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
        <path d="M345 140 q3 6 0 9 q-3 -3 0 -9 Z" fill="#E36E9A" />
      </g>

      {/* floor: warm planks, seams off the calm centre */}
      <rect x="0" y="168" width="400" height="5" fill="#E8CBA4" /> <rect x="0" y="173" width="400" height="52" fill="url(#wrk-floor)" />
      <g stroke="#B98453" strokeWidth="1.5" opacity="0.5">
        <path d="M0 188 H112 M288 188 H400" /> <path d="M0 204 H104 M296 204 H400" /> <path d="M0 218 H112 M288 218 H400" />
        <path d="M36 176 V188 M78 188 V204 M26 204 V218" /> <path d="M340 176 V188 M312 188 V204 M368 204 V218" />
      </g>

      {/* paint splashes in the corners */}
      <path d="M22 216 q5 -12 15 -8 q9 4 6 12 q-3 8 -13 6 q-9 -2 -8 -10 Z" fill="#E36E9A" opacity="0.45" />
      <g fill="#E36E9A" opacity="0.45">
        <circle cx="44" cy="206" r="1.5" /><circle cx="52" cy="218" r="1.5" /><circle cx="14" cy="204" r="1.5" />
      </g>
      <path d="M306 222 q4 -9 12 -6 q7 3 5 9 q-2 6 -10 5 q-7 -1 -7 -8 Z" fill="#4FB3A5" opacity="0.4" /> <circle cx="326" cy="214" r="1.5" fill="#4FB3A5" opacity="0.4" />
      <circle cx="98" cy="214" r="4" fill="#F2D55E" opacity="0.4" /> <circle cx="104" cy="220" r="2" fill="#F2D55E" opacity="0.4" />

      {/* palette resting by the easel + a sparkle on the canvas */}
      <ellipse cx="382" cy="198" rx="15" ry="8.5" fill="#EFE3CC" stroke={INK} strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="378" cy="200" r="2.2" fill="#D9C49A" /> <circle cx="374" cy="194" r="2" fill="#E36E9A" /> <circle cx="379" cy="192" r="2" fill="#4FB3A5" />
      <circle cx="385" cy="193" r="2" fill="#F2D55E" /> <circle cx="388" cy="197" r="2" fill="#7FB3E8" />
      <path d="M310 104 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4 Z" fill="#FFFFFF" opacity="0.8" />
    </g>
  ),

  /* ---- W6 · bg-bazaar — village bazaar at warm evening ---- */
  "bg-bazaar": (
    <g>
      <defs>
        <linearGradient id="bzr-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFC98C" /><stop offset="1" stopColor="#F9E9C6" /></linearGradient>
        <linearGradient id="bzr-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E5C795" /><stop offset="1" stopColor="#D6B27E" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="170" fill="url(#bzr-sky)" />
      <circle cx="200" cy="34" r="44" fill="#FFDF9E" opacity="0.3" />

      {/* string lights across the top */}
      <path d="M0 12 Q100 34 200 22 Q300 10 400 24" stroke="#8A7156" strokeWidth="2" fill="none" />
      {[
        [40, 22], [88, 29], [136, 32], [184, 30], [232, 25], [280, 19], [328, 18], [366, 22],
      ].map(([x, y], i) => (
        <g key={`bl-${i}`}>
          <path d={`M${x} ${y} v4`} stroke="#8A7156" strokeWidth="1.5" />
          <circle cx={x} cy={y + 7} r="5" fill="#FFD86B" opacity="0.3" />
          <circle cx={x} cy={y + 7} r="2.8" fill={i % 2 ? "#FFE9A8" : "#FFD86B"} />
        </g>
      ))}

      {/* distant shopfronts, muted + evening swifts */}
      <g opacity="0.45">
        <rect x="100" y="90" width="200" height="8" fill="#DCA87E" /> <rect x="104" y="96" width="192" height="54" fill="#E8CD9E" />
        {[128, 184, 240].map((x) => (
          <path key={`sh-${x}`} d={`M${x - 14} 150 v-24 a14 14 0 0 1 28 0 v24 Z`} fill="#D9B27E" />
        ))}
      </g>
      <path d="M250 40 q4 -5 8 0 q4 -5 8 0 M268 34 q3.5 -4 7 0 q3.5 -4 7 0" stroke="#B98A5F" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* left stall — teal canopy, fruit baskets, fabrics */}
      <g>
        <path d="M12 62 V178 M122 62 V178" stroke="#8F5F35" strokeWidth="4" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`ls-${i}`} d={`M${2 + i * 20.6} 50 h20.6 v12 q-10.3 8 -20.6 0 Z`} fill={i % 2 ? "#FFF3DC" : "#2E9B8F"} />
        ))}
        <rect x="6" y="130" width="122" height="9" rx="2" fill="#B07C4A" />
        <rect x="6" y="139" width="122" height="36" fill="#2E9B8F" /> <rect x="6" y="139" width="122" height="4" fill="#268076" />
        <path d="M26 64 h16 v26 h-16 Z" fill="#E36E9A" /> <path d="M30 68 v18 M38 68 v18" stroke="#C95580" strokeWidth="1.2" opacity="0.7" />
        <path d="M74 64 h16 v22 h-16 Z" fill="#7FB3E8" /> <path d="M78 68 v14 M86 68 v14" stroke="#5E93CC" strokeWidth="1.2" opacity="0.7" />
        <path d="M16 128 q14 10 28 0 q-3 -8 -14 -8 q-11 0 -14 8 Z" fill="#B98A5F" />
        <circle cx="22" cy="121" r="3.5" fill="#F2A03D" /> <circle cx="29" cy="119" r="3.5" fill="#E8862E" /> <circle cx="36" cy="121" r="3.5" fill="#F2A03D" />
        <path d="M58 128 q12 9 24 0 q-3 -7 -12 -7 q-9 0 -12 7 Z" fill="#B98A5F" />
        <circle cx="63" cy="122" r="3" fill="#7CA84E" /> <circle cx="70" cy="121" r="3" fill="#9CBE5E" /> <circle cx="77" cy="122" r="3" fill="#7CA84E" />
        <rect x="92" y="122" width="26" height="6" rx="1" fill="#E36E9A" /> <rect x="94" y="116" width="22" height="6" rx="1" fill="#F2D55E" /> <rect x="96" y="110" width="18" height="6" rx="1" fill="#4FB3A5" />
      </g>

      {/* right stall — pink canopy, brass pots, spice sacks, lantern */}
      <g>
        <path d="M278 62 V178 M388 62 V178" stroke="#8F5F35" strokeWidth="4" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`rs-${i}`} d={`M${274 + i * 20.6} 50 h20.6 v12 q-10.3 8 -20.6 0 Z`} fill={i % 2 ? "#FFF3DC" : "#E36E9A"} />
        ))}
        <rect x="272" y="130" width="122" height="9" rx="2" fill="#B07C4A" />
        <rect x="272" y="139" width="122" height="36" fill="#D9648C" /> <rect x="272" y="139" width="122" height="4" fill="#C95580" />
        <path d="M298 128 l4 -12 h12 l4 12 Z" fill="#D9A24E" /> <path d="M318 128 l4 -12 h12 l4 12 Z" fill="#C8913E" /> <path d="M304 114 l4 -11 h11 l4 11 Z" fill="#E3B45E" />
        <path d="M352 130 q-10 -2 -10 -12 q0 -10 10 -10 q10 0 10 10 q0 10 -10 12 Z" fill="#E8C89A" />
        <circle cx="349" cy="105" r="1.8" fill="#C44B3A" /> <circle cx="353" cy="103" r="1.8" fill="#F2C14E" /> <circle cx="356" cy="106" r="1.8" fill="#C44B3A" />
        <path d="M374 130 q-9 -2 -9 -11 q0 -9 9 -9 q9 0 9 9 q0 9 -9 11 Z" fill="#DFBD8C" />
        <circle cx="371" cy="107" r="1.8" fill="#F2C14E" /> <circle cx="375" cy="105" r="1.8" fill="#C44B3A" />
        <path d="M330 62 v8" stroke="#8A7156" strokeWidth="1.5" /> <circle cx="330" cy="76" r="6" fill="#F2C14E" opacity="0.3" />
        <path d="M326 72 h8 l-2 10 h-4 Z" fill="#F2C14E" /> <path d="M328 82 h4" stroke="#B45309" strokeWidth="1.5" />
      </g>

      {/* warm dust ground — flat centre */}
      <rect x="0" y="168" width="400" height="57" fill="url(#bzr-ground)" /> <rect x="0" y="168" width="400" height="3" fill="#C9A874" opacity="0.5" />
      <g fill="#C9A874" opacity="0.5">
        <ellipse cx="46" cy="192" rx="6" ry="3.5" /><ellipse cx="78" cy="210" rx="5" ry="3" /><ellipse cx="318" cy="196" rx="6" ry="3.5" /><ellipse cx="352" cy="216" rx="5" ry="3" />
      </g>

      {/* little pot stack far-left + sparkles near the lights */}
      <g>
        <path d="M14 178 l3 -10 h10 l3 10 Z" fill="#C97B4E" /> <path d="M18 166 l3 -9 h9 l3 9 Z" fill="#B96A42" />
        <circle cx="90" cy="42" r="1.2" fill="#FFFFFF" opacity="0.6" /> <circle cx="186" cy="44" r="1.2" fill="#FFFFFF" opacity="0.6" /> <circle cx="300" cy="32" r="1.2" fill="#FFFFFF" opacity="0.6" />
      </g>
    </g>
  ),

  /* ---- W7 · bg-jungle — logic jungle, green exploration ---- */
  "bg-jungle": (
    <g>
      <defs>
        <linearGradient id="jgl-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E4F3DC" /><stop offset="1" stopColor="#C4E0B8" /></linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="160" fill="url(#jgl-sky)" />

      {/* soft light shafts through the canopy */}
      <path d="M148 0 L192 0 L118 148 L84 148 Z" fill="#FFF6D8" opacity="0.12" />
      <path d="M262 0 L300 0 L250 132 L222 132 Z" fill="#FFF6D8" opacity="0.09" />

      {/* misty distant trees, two depths */}
      <path d="M0 96 Q24 76 48 92 T96 90 T144 92 T192 88 T240 92 T288 88 T336 92 T384 88 L400 92 L400 150 L0 150 Z" fill="#B9D6AE" opacity="0.35" />
      <path d="M0 118 Q30 100 60 114 T120 112 T180 116 T240 110 T300 116 T360 110 L400 116 L400 158 L0 158 Z" fill="#93BE88" opacity="0.5" />
      <rect x="70" y="118" width="4" height="32" fill="#7FA873" opacity="0.4" /> <rect x="150" y="116" width="4" height="34" fill="#7FA873" opacity="0.4" />
      <rect x="240" y="114" width="4" height="36" fill="#7FA873" opacity="0.4" /> <rect x="330" y="118" width="4" height="32" fill="#7FA873" opacity="0.4" />

      {/* jungle floor + clearing path (flat centre) */}
      <rect x="0" y="156" width="400" height="69" fill="#5E9C4B" />
      <path d="M0 196 Q120 184 240 194 T400 190 L400 225 L0 225 Z" fill="#549044" />
      <path d="M186 152 L214 152 L268 225 L132 225 Z" fill="#C2B478" opacity="0.55" />
      <path d="M190 152 L210 152 L258 225 L142 225 Z" fill="#D8CB8E" />

      {/* canopy fringe across the top */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <circle key={`c1-${i}`} cx={-6 + i * 46} cy="10" r="22" fill="#57944B" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <circle key={`c2-${i}`} cx={18 + i * 46} cy="18" r="14" fill="#4E8A44" />
        ))}
        {[60, 150, 240, 330].map((x) => (
          <path key={`lf-${x}`} d={`M${x} 14 q8 18 0 34 q-10 -16 -4 -34 Z`} fill="#4E8A44" />
        ))}
      </g>

      {/* hanging vines */}
      <g>
        <path d="M92 6 q12 26 -2 50 q-9 18 3 36" stroke="#4E8A44" strokeWidth="3" fill="none" />
        <ellipse cx="98" cy="24" rx="5" ry="3" fill="#6FA24E" /> <ellipse cx="86" cy="48" rx="5" ry="3" fill="#6FA24E" /> <ellipse cx="95" cy="72" rx="5" ry="3" fill="#6FA24E" />
        <path d="M205 6 q-10 22 2 44" stroke="#4E8A44" strokeWidth="2.5" fill="none" />
        <ellipse cx="199" cy="22" rx="4.5" ry="2.8" fill="#6FA24E" /> <ellipse cx="208" cy="42" rx="4.5" ry="2.8" fill="#6FA24E" />
        <path d="M312 6 q12 30 -2 56 q-8 16 2 30" stroke="#4E8A44" strokeWidth="3" fill="none" />
        <ellipse cx="318" cy="26" rx="5" ry="3" fill="#6FA24E" /> <ellipse cx="308" cy="52" rx="5" ry="3" fill="#6FA24E" /> <ellipse cx="314" cy="78" rx="5" ry="3" fill="#6FA24E" />
      </g>

      {/* mid foliage clusters at both sides */}
      <g>
        <circle cx="36" cy="120" r="30" fill="#5FA24E" /> <circle cx="66" cy="140" r="24" fill="#559146" /> <circle cx="14" cy="146" r="20" fill="#4E8A44" />
        <circle cx="364" cy="118" r="30" fill="#5FA24E" /> <circle cx="334" cy="142" r="24" fill="#559146" /> <circle cx="388" cy="148" r="20" fill="#4E8A44" />
      </g>

      {/* big foreground leaves at the edges */}
      <g>
        <path d="M4 222 C2 178 22 150 56 142 C46 166 36 194 34 222 Z" fill="#3E7D42" />
        <path d="M10 216 Q26 182 50 148" stroke="#57944B" strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M0 224 C0 196 12 176 34 170 C26 190 20 208 18 224 Z" fill="#346E39" />
        <path d="M396 222 C398 178 378 150 344 142 C354 166 364 194 366 222 Z" fill="#3E7D42" />
        <path d="M390 216 Q374 182 350 148" stroke="#57944B" strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M400 224 C400 198 390 180 370 174 C378 192 384 208 386 224 Z" fill="#346E39" />
      </g>

      {/* ferns + mushroom + red blooms at the sides */}
      <g stroke="#3E7D42" strokeWidth="2" fill="none" opacity="0.8">
        <path d="M30 198 q-6 -14 -14 -18 M30 198 q0 -18 -4 -22 M30 198 q6 -14 14 -18" /> <path d="M72 210 q-6 -14 -14 -18 M72 210 q0 -18 -4 -22 M72 210 q6 -14 14 -18" />
        <path d="M96 190 q-6 -12 -12 -15 M96 190 q0 -15 -3 -18 M96 190 q6 -12 12 -15" />
        <path d="M306 192 q-6 -14 -14 -18 M306 192 q0 -18 -4 -22 M306 192 q6 -14 14 -18" /> <path d="M338 206 q-6 -14 -14 -18 M338 206 q0 -18 -4 -22 M338 206 q6 -14 14 -18" />
        <path d="M368 188 q-6 -12 -12 -15 M368 188 q0 -15 -3 -18 M368 188 q6 -12 12 -15" />
      </g>
      <g>
        <rect x="82.5" y="194" width="3" height="7" fill="#E8D9BE" /> <path d="M76 195 q8 -10 16 0 q-8 4 -16 0 Z" fill="#D96A4E" />
      </g>
      <g>
        <path d="M348 174 v-6 M354 172 v-6 M360 174 v-6" stroke="#4E8A3F" strokeWidth="1.8" />
        <circle cx="348" cy="166" r="2.5" fill="#E24B4B" /> <circle cx="354" cy="164" r="2.5" fill="#E24B4B" /> <circle cx="360" cy="166" r="2.5" fill="#E24B4B" />
      </g>

      {/* fireflies at the jungle edge */}
      {[
        [70, 150], [108, 96], [288, 102], [332, 132],
      ].map(([x, y], i) => (
        <g key={`ff-${i}`}>
          <circle cx={x} cy={y} r="5" fill="#F8E27A" opacity="0.25" />
          <circle cx={x} cy={y} r="1.8" fill="#F8E27A" opacity="0.9" />
        </g>
      ))}
    </g>
  ),

  /* ---- W8 · bg-mountain — Coding Peak at dawn ---- */
  "bg-mountain": (
    <g>
      <defs>
        <linearGradient id="mtn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFCF9E" /><stop offset="0.5" stopColor="#FFE3BC" /><stop offset="1" stopColor="#CBE5F2" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="196" fill="url(#mtn-sky)" />

      {/* fading dawn stars + cloud bands */}
      <g fill="#FFFFFF">
        <circle cx="58" cy="18" r="1.5" opacity="0.6" /><circle cx="328" cy="30" r="1.2" opacity="0.55" /><circle cx="368" cy="14" r="1" opacity="0.5" />
      </g>
      <ellipse cx="120" cy="64" rx="34" ry="7" fill="#FFE9C9" opacity="0.6" /> <ellipse cx="296" cy="84" rx="30" ry="6" fill="#FFE9C9" opacity="0.5" />

      {/* rising sun glowing behind the peaks */}
      <circle cx="208" cy="118" r="36" fill="#FFDFA0" opacity="0.4" /> <circle cx="208" cy="118" r="22" fill="#FFDFA0" opacity="0.45" />

      {/* far misty foothills */}
      <path d="M0 150 Q50 134 100 144 T200 142 T300 146 T400 138 L400 176 L0 176 Z" fill="#CBD9E2" opacity="0.5" />

      {/* second peak (right, behind) */}
      <path d="M214 192 L318 76 L402 192 Z" fill="#A7BCD9" />
      <path d="M318 76 L402 192 L318 192 Z" fill="#93A9C9" opacity="0.7" />
      <path d="M296 102 L318 76 L341 104 L331 99 L322 110 L312 99 L304 108 L298 104 Z" fill="#FFF9EF" />

      {/* main peak with snow cap */}
      <path d="M18 194 L160 38 L270 194 Z" fill="#9AB1D2" />
      <path d="M160 38 L270 194 L160 194 Z" fill="#859BC2" opacity="0.75" />
      <path d="M160 38 L176 66" stroke="#B8C8E2" strokeWidth="1.5" />
      <path d="M130 76 L160 38 L191 76 L181 71 L172 84 L161 68 L151 82 L142 70 L134 76 Z" fill="#FFF9EF" />
      <path d="M160 38 L191 76 L183 72 L166 52 Z" fill="#F2E4CF" opacity="0.5" />

      {/* summit pennant + mid-post flag on the trail */}
      <path d="M160 38 V20" stroke="#8F5F35" strokeWidth="2" /> <path d="M160 20 L179 25 L160 30 Z" fill="#F2A03D" />
      <path d="M108 170 V152" stroke="#8F5F35" strokeWidth="2" />
      <path d="M108 152 h15 v10 h-15 Z" fill="#F2A03D" stroke={INK} strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="115.5" cy="157" r="2.5" fill="#FFF8EC" />

      {/* green foothills over the mountain base */}
      <path d="M0 174 Q60 154 130 168 T260 166 T400 174 L400 225 L0 225 Z" fill="#8CBC66" />
      <path d="M0 196 Q100 180 200 190 T400 194 L400 225 L0 225 Z" fill="#7DB05C" />

      {/* winding trail up the flank */}
      <path d="M214 224 C208 202 180 198 158 188 C138 179 141 165 128 157" stroke="#D9C08C" strokeWidth="15" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M214 224 C208 202 180 198 158 188 C138 179 141 165 128 157" stroke="#EAD7A8" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M128 157 C120 149 128 139 138 133 C149 126 152 115 149 106" stroke="#EAD7A8" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.9" />

      {/* tiny pines on the foothills + morning birds */}
      <g>
        <path d="M34 172 L44 186 L24 186 Z" fill="#55946E" /> <rect x="32.5" y="186" width="3" height="8" fill="#8F5F35" />
        <path d="M58 178 L66 190 L50 190 Z" fill="#4E8A64" /> <rect x="56.5" y="190" width="3" height="7" fill="#8F5F35" />
        <path d="M356 176 L366 190 L346 190 Z" fill="#55946E" /> <rect x="354.5" y="190" width="3" height="8" fill="#8F5F35" />
        <path d="M380 186 L388 198 L372 198 Z" fill="#4E8A64" /> <rect x="378.5" y="198" width="3" height="7" fill="#8F5F35" />
      </g>
      <path d="M92 58 q5 -6 10 0 q5 -6 10 0 M116 66 q4 -5 8 0 q4 -5 8 0" stroke="#7A8C99" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* ground texture at the sides only */}
      <g stroke="#6FA24E" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M26 210 q8 -3 15 0" /> <path d="M52 218 q8 -3 15 0" /> <path d="M336 212 q8 -3 15 0" /> <path d="M364 220 q8 -3 15 0" />
      </g>
      <g fill="#6FA24E" opacity="0.45">
        <circle cx="44" cy="202" r="1.4" /><circle cx="70" cy="208" r="1.4" /><circle cx="332" cy="204" r="1.4" /><circle cx="358" cy="210" r="1.4" />
      </g>
    </g>
  ),
};

/* Stage notes: parent <Art /> wraps each entry in
   <svg viewBox="0 0 400 225" width="100%">…</svg>; characters (100-120px)
   stand over x 120-280 / y 150-225, so that band stays flat and calm. */
