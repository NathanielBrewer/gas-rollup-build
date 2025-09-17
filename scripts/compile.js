import { spawnSync } from 'child_process'
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const projectRoot = process.cwd();
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
const outDir = path.join(projectRoot, '.tmp');
try {
  fs.rmSync(outDir, { recursive: true, force: true });
} catch (error) {
  console.warn('[compile] Unable to clean previous TypeScript output:', error);
}
const tscExecutable = process.platform === 'win32' ? 'tsc.cmd' : 'tsc';
const result = spawnSync(tscExecutable, ['--project', tsconfigPath], {
  stdio: 'inherit'
});
if (result.error) {
  console.error('[compile] Failed to start the TypeScript compiler:', result.error);
  process.exit(1);
}
if (typeof result.status === 'number' && result.status !== 0) {
  process.exit(result.status);
}