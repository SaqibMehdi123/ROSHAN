#!/usr/bin/env python3
"""ROSHAN audio generator — edge-tts neural Urdu voices.
Reads scripts/tts-manifest.json, writes public/audio/<key>.mp3.
Concurrency 8, 3 retries, resume-safe (skips existing valid files)."""
import asyncio, json, os, sys, time
import edge_tts

ROOT = "/home/z/my-project"
OUT = f"{ROOT}/public/audio"
MANIFEST = f"{ROOT}/scripts/tts-manifest.json"
CONC = 8
SEM = asyncio.Semaphore(CONC)
LOG = open(f"{ROOT}/scripts/tts-gen.log", "a", encoding="utf-8")

def log(msg):
    print(msg, flush=True)
    LOG.write(msg + "\n")
    LOG.flush()

def valid(path):
    try:
        return os.path.getsize(path) > 1200  # real speech clip, not an error stub
    except OSError:
        return False

async def gen(zai_voice_key, item):
    key, text, voice, rate, pitch = item
    path = os.path.join(OUT, key)
    if valid(path):
        return None
    async with SEM:
        for attempt in range(3):
            try:
                com = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch)
                await com.save(path)
                if valid(path):
                    return None
                raise RuntimeError("empty clip")
            except Exception as e:
                if attempt == 2:
                    return (key, str(e)[:120])
                await asyncio.sleep(1.5 * (attempt + 1))
    return None

async def main():
    os.makedirs(OUT, exist_ok=True)
    items = json.load(open(MANIFEST))
    # manifest fields: key, text, voice, rate, pitch
    todo = [(x["key"], x["text"], x["voice"], x["rate"], x["pitch"]) for x in items]
    # de-dupe identical (key) just in case
    seen, uniq = set(), []
    for t in todo:
        if t[0] in seen:
            continue
        seen.add(t[0])
        uniq.append(t)
    already = sum(1 for t in uniq if valid(os.path.join(OUT, t[0])))
    log(f"=== start {time.strftime('%F %T')} total={len(uniq)} done={already} todo={len(uniq)-already}")
    fails = []
    batch, t0 = 0, time.time()
    results = await asyncio.gather(*[gen(None, t) for t in uniq])
    fails = [r for r in results if r]
    done = sum(1 for t in uniq if valid(os.path.join(OUT, t[0])))
    log(f"=== end done={done}/{len(uniq)} failed={len(fails)} in {time.time()-t0:.0f}s")
    for k, e in fails[:50]:
        log(f"FAIL {k}: {e}")
    with open(f"{ROOT}/scripts/tts-failed.json", "w") as f:
        json.dump([{"key": k, "error": e} for k, e in fails], f)

asyncio.run(main())
