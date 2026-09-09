import { readFileSync, writeFileSync } from "fs";

const p = "public/sw.js";
const src = readFileSync(p, "utf8");
const next = src.replace(/const CACHE = "roshan-v[^"]*";/, `const CACHE = "roshan-v${Date.now().toString(36)}";`);
if (next === src && !/const CACHE = "roshan-v\d+[a-z0-9]*";/.test(src)) {
  console.error("could not patch CACHE constant");
  process.exit(1);
}
writeFileSync(p, next);
console.log("sw cache bumped:", next.match(/const CACHE = "([^"]+)"/)?.[1]);
