// Claude Code가 세션을 열 때 실행된다 (.claude/settings.json의 SessionStart 훅).
// 1) node_modules가 없으면 npm install  2) 저장소에 든 FFmpeg를 이후 명령에서 쓰도록 환경 변수 설정
import { execSync } from 'node:child_process';
import { existsSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
if (!existsSync(join(root, 'node_modules'))) {
  execSync('npm install --no-audit --no-fund', { cwd: root, stdio: 'ignore' });
}

const require = createRequire(join(root, 'package.json'));
const ffmpeg = require('ffmpeg-static');
const ffprobe = require('ffprobe-static').path;
const q = (s) => `'${s.replace(/'/g, `'\\''`)}'`;
const lines = [
  `export FFMPEG_PATH=${q(ffmpeg)}`,
  `export HYPERFRAMES_FFMPEG_PATH=${q(ffmpeg)}`,
  `export FFPROBE_PATH=${q(ffprobe)}`,
];
// shortcut: Windows에서는 PATH에 넣지 않는다(경로 형식이 달라서). 윈도우 팀원이 ffmpeg 직접 호출에서 막히면 그때 추가.
if (process.platform !== 'win32') {
  lines.push(`export PATH=${q(dirname(ffmpeg))}:${q(dirname(ffprobe))}:"$PATH"`);
}
if (process.env.CLAUDE_ENV_FILE) appendFileSync(process.env.CLAUDE_ENV_FILE, lines.join('\n') + '\n');
console.log('youtube-team 준비 완료: HyperFrames, FFmpeg, Edge TTS를 저장소 안의 것으로 씁니다.');
