# Semantic Versioning Strategy

This document defines how the portfolio uses **Semantic Versioning (SemVer)** and how to bump versions safely.

## SemVer basics

Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (`1.10.1 → 2.0.0`): Breaking changes to public behavior or contracts, for example:
  - URL changes that invalidate previously shared links (routing/i18n changes, removed pages).
  - API contract changes for `/api/*` endpoints.
  - Large layout/content changes that could break saved browser states or automation.
- **MINOR** (`1.10.1 → 1.11.0`): Backward‑compatible feature additions.
- **PATCH** (`1.10.1 → 1.10.2`): Bug fixes and internal refactors with no user‑visible breaking change.

Deciding whether something is *breaking* is always a manual judgment call; the tooling only applies the bump you choose.

## Source of truth

- The canonical version lives in the `version` field of [`package.json`](../package.json).
- At build time, Astro reads this value (or an optional environment override) and exposes it via a compile‑time constant.
- The current version is rendered in the site footer as a small `vX.Y.Z` label.

Priority order:

1. **Environment variable** `PUBLIC_APP_VERSION` (optional, for CI/CD overrides).
2. `package.json` `version` field.
3. Fallback `"1.0.0"` (only used if both above are missing).

## Using the version in code

Helper: [`src/lib/version.ts`](../src/lib/version.ts)

```typescript
import { getVersion, getFormattedVersion } from '@/lib/version';

const raw = getVersion();          // "1.0.0"
const formatted = getFormattedVersion(); // "v1.0.0"
```

The footer in `BaseLayout` uses `APP_VERSION` from this helper and shows it as a subtle label under the copyright.

## Bumping versions

Use the built‑in npm `version` command to keep tags and `package.json` in sync:

- **Patch** (bug fix):  
  `npm version patch`  → `1.10.1` → `1.10.2`
- **Minor** (new features, no breaking changes):  
  `npm version minor`  → `1.10.1` → `1.11.0`
- **Major** (breaking changes):  
  `npm version major`  → `1.10.1` → `2.0.0`

This will:

1. Update the `version` field in `package.json`.
2. Create a git commit and tag (never push from here; deployment is handled elsewhere).

## Cloudflare Pages considerations

Cloudflare Pages does not provide built‑in semantic releases on this tier. Instead:

- Deploys always use the `version` from `package.json` (or `PUBLIC_APP_VERSION` if set).
- To override the version for a specific deployment, set `PUBLIC_APP_VERSION` in the Cloudflare Pages environment.

To check what is deployed:

- Look at the footer label (`vX.Y.Z`) on the live site.
- Or inspect `package.json` in the commit that Cloudflare built.
