// Test ASR API extra params (language / prompt) to stabilize Urdu transcription
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const wav = fs.readFileSync('/tmp/asrwav/w2l5_story_1.wav').toString('base64');
const zai = await ZAI.create();

async function tryBody(label, body) {
  try {
    const r = await zai.audio.asr.create(body);
    console.log(`[${label}] =>`, JSON.stringify(r.text ?? r).slice(0, 200));
  } catch (e) {
    console.log(`[${label}] ERR`, String(e.message).slice(0, 160));
  }
}

await tryBody('plain', { file_base64: wav });
await tryBody('lang-ur', { file_base64: wav, language: 'ur' });
await tryBody('prompt-roman', { file_base64: wav, prompt: 'Transcribe this Urdu audio exactly, in Roman Urdu (Latin script), word by word.' });
