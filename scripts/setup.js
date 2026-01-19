import { existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { platform, arch } from 'os';

const ARCH_FILE = '.arch-lock';
const detectedArch = `${platform()}-${arch()}`;

// Read previous architecture from .arch-lock
let previousArch = null;
if (existsSync(ARCH_FILE)) {
  previousArch = readFileSync(ARCH_FILE, 'utf-8').trim();
}

console.log(`🔍 Detected architecture: ${detectedArch}`);

// Check if architecture has changed
let needsReinstall = false;

if (!previousArch) {
  console.log('📝 First time setup');
  needsReinstall = true;
} else if (previousArch !== detectedArch) {
  console.log(`⚠️  Architecture changed: ${previousArch} → ${detectedArch}`);
  needsReinstall = true;
} else {
  console.log('✓ Architecture matches');
}

// Clean and reinstall if needed
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
  
  console.log(`📦 Installing dependencies for ${detectedArch} using npm...`);
  console.log('💡 Using npm ensures correct platform-specific binaries');
  execSync('npm install', { stdio: 'inherit' });
  
  // Save detected architecture
  writeFileSync(ARCH_FILE, detectedArch);
  console.log('✅ Setup complete!');
} else {
  console.log('📦 Running npm install...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies up to date!');
}
