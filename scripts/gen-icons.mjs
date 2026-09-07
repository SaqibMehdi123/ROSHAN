/** Generate ROSHAN PWA icons (Bijli face on cream) from inline SVG via sharp. */
import sharp from "sharp";
import fs from "fs";

const svg = (size, pad = 0) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${pad ? 110 : 0}" fill="#FFF8EC"/>
  <circle cx="256" cy="270" r="190" fill="#FDE047" stroke="#4A3421" stroke-width="12"/>
  <rect x="136" y="196" width="240" height="150" rx="64" fill="#33333B" stroke="#4A3421" stroke-width="8"/>
  <path d="M176 270 q28 -38 56 0" stroke="#22D3EE" stroke-width="17" fill="none" stroke-linecap="round"/>
  <path d="M280 270 q28 -38 56 0" stroke="#22D3EE" stroke-width="17" fill="none" stroke-linecap="round"/>
  <path d="M244 300 q12 12 24 0" stroke="#22D3EE" stroke-width="11" fill="none" stroke-linecap="round"/>
  <line x1="256" y1="96" x2="256" y2="52" stroke="#4A3421" stroke-width="13" stroke-linecap="round"/>
  <path d="M274 18 L242 66 L262 66 L248 96 L282 44 L260 44 Z" fill="#F59E0B" stroke="#4A3421" stroke-width="8" stroke-linejoin="round"/>
  <circle cx="148" cy="330" r="16" fill="#FBBF77"/>
  <circle cx="364" cy="330" r="16" fill="#FBBF77"/>
</svg>`;

fs.mkdirSync("public/icons", { recursive: true });
await sharp(Buffer.from(svg(512, 0))).png().toFile("public/icons/icon-512.png");
await sharp(Buffer.from(svg(192, 0))).resize(192, 192).png().toFile("public/icons/icon-192.png");
await sharp(Buffer.from(svg(512, 1))).resize(512, 512).png().toFile("public/icons/maskable-512.png");
console.log("icons OK");
