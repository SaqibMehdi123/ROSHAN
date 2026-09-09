import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  const zai = await ZAI.create();
  const line = 'سلام! میں بجلی ہوں! میں تمھیں کمپیوٹر سکھاؤں گی؟';
  const response = await zai.audio.tts.create({
    input: line,
    voice: 'tongtong',
    speed: 0.9,
    response_format: 'wav',
    stream: false,
  });
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  fs.writeFileSync('/home/z/my-project/scripts/tts-ur-test.wav', buffer);
  console.log('saved', buffer.length, 'bytes');
}

main().catch(e => { console.error('ERR', e.message); process.exit(1); });
