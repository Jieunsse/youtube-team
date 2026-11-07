// Edge TTS로 한국어 나레이션을 만든다.
// 사용법: node scripts/tts.mjs <대본.txt> <출력.mp3>
// 출력.mp3 옆에 단어별 시간 정보(출력.mp3.json)도 저장한다. 자막 타이밍을 맞출 때 쓴다.
import { EdgeTTS } from 'node-edge-tts';
import { readFileSync } from 'node:fs';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('사용법: node scripts/tts.mjs <대본.txt> <출력.mp3>');
  process.exit(1);
}
const text = readFileSync(input, 'utf8').trim();
if (!text) {
  console.error(`대본이 비어 있습니다: ${input}`);
  process.exit(1);
}
const tts = new EdgeTTS({
  voice: process.env.TTS_VOICE || 'ko-KR-SunHiNeural',
  lang: 'ko-KR',
  outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
  saveSubtitles: true,
  rate: process.env.TTS_RATE || 'default',
  timeout: 60000,
});
await tts.ttsPromise(text, output);
console.log(`저장: ${output}`);
