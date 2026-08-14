import { existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { platform, arch } from 'os';

const ARCH_FILE = '.arch-lock';
const detectedArch = `${platform()}-${arch()}`;

const NATIVE_BINARIES = [
  { parent: 'rollup', binary: `@rollup/rollup-${detectedArch}` },
  { parent: 'lightningcss', binary: `lightningcss-${detectedArch}` },
  { parent: 'esbuild', binary: `@esbuild/${detectedArch}` },
];

function findMissingNativeBinaries() {
  return NATIVE_BINARIES.filter(
    ({ parent, binary }) =>
      existsSync(`node_modules/${parent}`) && !existsSync(`node_modules/${binary}`)
  ).map(({ binary }) => binary);
}

let previousArch = null;
if (existsSync(ARCH_FILE)) {
  previousArch = readFileSync(ARCH_FILE, 'utf-8').trim();
}

console.log(`🔍 Detected architecture: ${detectedArch}`);

let needsReinstall = false;

if (!previousArch) {
  console.log('📝 First time setup');
  needsReinstall = true;
} else if (previousArch !== detectedArch) {
  console.log(`⚠️  Architecture changed: ${previousArch} → ${detectedArch}`);
  needsReinstall = true;
} else {
  console.log('✓ Architecture matches');

  const missing = findMissingNativeBinaries();
  if (missing.length > 0) {
    console.log(`⚠️  Missing native binaries for ${detectedArch}: ${missing.join(', ')}`);
    needsReinstall = true;
  }
}

if (needsReinstall) {
  console.log('🧹 Cleaning node_modules...');

  try {
    if (existsSync('node_modules')) {
      rmSync('node_modules', { recursive: true, force: true });
    }
    if (existsSync('package-lock.json')) {
      rmSync('package-lock.json');
    }
  } catch (error) {
    console.warn('⚠️  Warning during cleanup:', error.message);
  }

  console.log(`📦 Installing dependencies for ${detectedArch} using bun...`);
  execSync('bun install', { stdio: 'inherit' });

  const stillMissing = findMissingNativeBinaries();
  if (stillMissing.length > 0) {
    console.error(`❌ Native binaries still missing after install: ${stillMissing.join(', ')}`);
    process.exit(1);
  }

  writeFileSync(ARCH_FILE, detectedArch);
  console.log('✅ Setup complete!');
} else if (!existsSync('node_modules')) {
  console.log('📦 node_modules not found, running bun install...');
  execSync('bun install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed!');
} else {
  console.log('✅ Dependencies already installed, skipping bun install');
}
