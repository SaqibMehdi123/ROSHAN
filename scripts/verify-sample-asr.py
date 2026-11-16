#!/usr/bin/env python3
"""ASR-verify a sample of clips: transcribe with retry-until-Latin, report vs expected text."""
import json, os, subprocess, sys, time

ROOT = "/home/z/my-project/ROSHAN"
TMP = "/tmp/asrtest"
os.makedirs(TMP, exist_ok=True)
M = {x["key"][:-4]: x["text"] for x in json.load(open(f"{ROOT}/scripts/tts-manifest.json"))}

SAMPLE = [
    # (clip key without .mp3, expected gist in Roman)
    ("ui_welcome", "roshan ki duniya mein khush aamdeed"),
    ("auto-e38da4a54639", "khush aamdeed"),                       # خوش آمدید!
    ("auto-93b659887511", "himmat wali leader ... chalo kuch naya seekhein"),
    ("auto-a1ba2b790ef2", "hansi wala dost ... ohho phir bug aa gaya"),
    ("auto-bae10ad6d9b2", "ustad zone mein khush aamdeed"),
    ("w1l2_do_prompt", "hissa uthao aur bijli par sahi jagah lagao"),
    ("w1l2_s1_l3", "biz-biz-biz oh nahi mere hisse alag ho gaye"),
    ("auto-cec6aea0347f", "baari badlo ab doosre dost ki baari"),
    ("auto-7224bcf86534", "biz-biz-biz oh nahi mere hisse alag ho gaye"),
]

def asr(wav, tries=3, sleep_s=2.5):
    for i in range(tries):
        r = subprocess.run(["z-ai", "asr", "-f", wav, "-o", wav + ".json"],
                           capture_output=True, text=True, timeout=180)
        try:
            txt = (json.load(open(wav + ".json")).get("text") or "").strip()
        except Exception:
            txt = ""
        if txt and any("a" <= c.lower() <= "z" for c in txt):
            return txt, i + 1
        time.sleep(sleep_s)
    return None, tries

out = []
for key, expected in SAMPLE:
    mp3 = f"{ROOT}/public/audio/{key}.mp3"
    if not os.path.exists(mp3):
        print(f"{key}: FILE MISSING"); continue
    wav = f"{TMP}/{key}.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", mp3, "-ar", "16000", "-ac", "1", wav], check=True)
    txt, tries = asr(wav)
    print(f"{key} | tries {tries}")
    print(f"   src: {M.get(key)}")
    print(f"   asr: {txt}")
    print(f"   exp: {expected}")
    out.append({"key": key, "src": M.get(key), "asr": txt, "expected": expected})
    time.sleep(2.0)

json.dump(out, open(f"{ROOT}/scripts/asr-sample-out.json", "w"), ensure_ascii=False, indent=1)
print("done", len(out))
