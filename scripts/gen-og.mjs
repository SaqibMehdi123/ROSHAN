// Render scripts/gen-og.html → public/og-image.png (1200×630) via Playwright
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const html = "file://" + path.join(here, "gen-og.html");
const out = path.resolve(here, "../public/og-image.png");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(html, { waitUntil: "networkidle" });
await page.waitForTimeout(600); // fonts settle
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log("OG image written:", out);
