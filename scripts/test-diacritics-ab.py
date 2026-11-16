#!/usr/bin/env python3
"""edge-tts + z-ai ASR round-trip: generate a test clip (mp3→wav16k) and transcribe.
Retries until the ASR returns Latin-script text (it sometimes hallucinates Chinese)."""
import asyncio, json, os, subprocess, sys, time

ROOT = "/home/z/my-project/ROSHAN"
TMP = "/tmp/asrtest"
os.makedirs(TMP, exist_ok=True)

FEMALE = "ur-PK-UzmaNeural"

async def tts(text, path, voice=FEMALE, rate="-10%"):
    import edge_tts
    com = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch="+0Hz")
    await com.save(path)

def asr(wav, tries=3, sleep_s=2.5):
    """Return (text, attempts). Latin-only retry loop; None if all attempts non-Latin."""
    for i in range(tries):
        r = subprocess.run(["z-ai", "asr", "-f", wav, "-o", wav + ".json"],
                           capture_output=True, text=True, timeout=180)
        try:
            d = json.load(open(wav + ".json"))
            txt = (d.get("text") or "").strip()
        except Exception:
            txt = ""
        if txt and any("a" <= c.lower() <= "z" for c in txt):
            return txt, i + 1
        time.sleep(sleep_s)
    return None, tries

async def main():
    # minimal pairs: (label, with_diacritics, without_diacritics, expected_with, expected_without)
    pairs = [
        ("murgi",  "مُرگی", "مرگی",  "murgi/murghi", "margi"),
        ("ussi",   "اُسی",  "اسی",   "ussi/uss e",   "aasi/asi"),
        ("dum",    "دُم",   "دم",    "dum",          "dam"),
        ("beech",  "بِیچ",  "بیچ",   "beech",        "bech"),
        ("chuno",  "چُنو",  "چنو",   "chuno",        "chano/chuno"),
        ("ustad",  "اُستاد", "استاد", "ustad",        "astad/istad"),
    ]
    results = []
    for label, wd, wod, exp_wd, exp_wod in pairs:
        for tag, text in (("with", wd), ("plain", wod)):
            mp3 = f"{TMP}/{label}_{tag}.mp3"
            wav = f"{TMP}/{label}_{tag}.wav"
            await tts(text, mp3)
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", mp3,
                            "-ar", "16000", "-ac", "1", wav], check=True)
            txt, tries = asr(wav)
            print(f"{label:6s} {tag:5s} | src: {text} | asr: {txt} | tries: {tries}")
            results.append({"label": label, "tag": tag, "src": text, "asr": txt})
            time.sleep(2.5)  # global throttle
    json.dump(results, open(f"{ROOT}/scripts/asr-pairs-out.json", "w"), ensure_ascii=False, indent=1)

asyncio.run(main())
