# Cross-Platform Development Setup

This project is configured to work seamlessly on both:
- **M2 Mac Mini** (ARM64 / Apple Silicon)
- **MacBook Pro i7** (x64 / Intel)

## How It Works

The setup script automatically:
1. Detects your machine's architecture
2. Installs correct platform-specific binaries
3. Cleans and reinstalls when switching machines
4. Uses npm (not bun) for reliable dependency installation

## Daily Workflow

### On the Same Machine
```bash
npm run dev  # Just start development
```

### When Switching Machines
```bash
npm run clean:full  # Force clean install for new architecture
npm run dev         # Start development
```

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (auto-detects architecture) |
| `npm run setup` | Smart setup (only reinstalls if arch changed) |
| `npm run clean` | Quick clean and reinstall |
| `npm run clean:full` | **Full clean and setup** (use when switching machines) |
| `npm run build` | Build for production |
| `npm run deploy` | Deploy to Cloudflare |

## Architecture Detection

The `.arch-lock` file stores the last installed architecture:
- `darwin-arm64` = M2 Mac Mini (Apple Silicon)
- `darwin-x64` = MacBook Pro i7 (Intel) or Rosetta

**Note:** This file is gitignored and auto-generated per machine.

## Why npm Instead of bun?

npm correctly handles optional dependencies (like rollup's platform-specific binaries), while bun has known issues with them. This ensures:
- ✅ Correct binaries for your architecture
- ✅ No manual intervention needed
- ✅ Works on both M2 and Intel Macs

## Troubleshooting

### Dev server won't start?
```bash
npm run clean:full
```

### Want to check your architecture?
```bash
node -e "console.log('Arch:', process.arch, 'Platform:', process.platform)"
```

### Still having issues?
1. Make sure Node version is 24.0.2+ (`node --version`)
2. Make sure npm version is 11.3.0+ (`npm --version`)
3. Try closing and reopening your terminal
4. Run `npm run clean:full` again

## Files to Never Commit

These are gitignored and generated per-machine:
- `node_modules/`
- `package-lock.json`
- `bun.lock`
- `.arch-lock`
- `src/lib/cv-data.ts`
