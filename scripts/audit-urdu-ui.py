#!/usr/bin/env python3
"""Extract every Urdu-bearing string literal from UI tsx/ts files for vocab review."""
import glob, re, json

ROOT = "/home/z/my-project/ROSHAN"
UR = re.compile(r'[\u0600-\u06FF]')

files = (glob.glob(f"{ROOT}/src/components/**/*.tsx", recursive=True)
         + glob.glob(f"{ROOT}/src/components/**/*.ts", recursive=True)
         + [f"{ROOT}/src/lib/content.ts", f"{ROOT}/src/lib/store.ts"])

out = {}
for f in sorted(files):
    src = open(f, encoding="utf-8").read()
    hits = []
    for m in re.finditer(r'[>"\'`](\s*[^"\'`<>]*[\u0600-\u06FF][^"\'`<>]*)["\'`<]', src):
        s = m.group(1).strip()
        if UR.search(s) and len(s) > 1:
            # skip pure identifiers/art ids (ascii only checked already)
            hits.append(s)
    if hits:
        out[f.replace(ROOT + "/", "")] = sorted(set(hits))

for f, hits in out.items():
    print(f"\n=== {f} ({len(hits)}) ===")
    for h in hits:
        print("   ", h)
