# Semantic Versioning Strategy

This document outlines the versioning strategy for the portfolio site.

## Overview

The project uses **Semantic Versioning (SemVer)** following the `MAJOR.MINOR.PATCH` format:
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## Version Source

The version is managed in `package.json` and automatically read at build time.

### Priority Order

1. **Environment Variable** (`PUBLIC_APP_VERSION`)
   - Useful for CI/CD pipelines
   - Can override package.json version
   - Set in Cloudflare Pages environment variables if needed

2. **package.json** (`version` field)
   - Primary source of truth
   - Update manually when releasing

3. **Fallback**: `1.0.0`
   - Used if neither of the above are available

## Usage

### Reading Version in Code

```typescript
import { getVersion, getFormattedVersion } from '@/utils/version';

// Get raw version: "1.0.0"
const version = getVersion();

// Get formatted version: "v1.0.0"
const formatted = getFormattedVersion();
```

### Displaying Version

The version is automatically displayed in:
- **Bio component**: Shows as a badge (e.g., `v1.0.0`)
- Can be accessed anywhere via the utility functions

## Cloudflare Pages Integration

Cloudflare Pages **does not** provide automatic versioning out-of-the-box. However, you can:

### Option 1: Use package.json (Recommended)
- Update `package.json` version manually
- Version is read at build time automatically
- No additional configuration needed

### Option 2: Use Environment Variables
1. Go to Cloudflare Pages project settings
2. Navigate to **Environment Variables**
3. Add: `PUBLIC_APP_VERSION` = `1.0.0`
4. This will override package.json version

### Option 3: Git Tags (Advanced)
For automated versioning, you can:
1. Use GitHub Actions to read git tags
2. Set `PUBLIC_APP_VERSION` environment variable during build
3. Tag releases: `git tag v1.0.0 && git push --tags`

## Version Update Workflow

1. **Update package.json**:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Commit and push**:
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.0.1"
   git push
   ```

3. **Deploy**: Cloudflare Pages will automatically build with the new version

## Current Version

Check `package.json` for the current version, or look at the version badge in the Bio section of the site.
