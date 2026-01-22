/**
 * Get the application version
 * In Cloudflare Workers, we can't read files at runtime, so we use:
 * 1. Build-time injected environment variable (PUBLIC_APP_VERSION)
 * 2. Fallback to default
 * 
 * The version is injected at build time via astro.config.mjs
 * @returns Semantic version string (e.g., "1.0.0")
 */
export const getVersion = (): string => {
  // Priority 1: Environment variable injected at build time
  if (import.meta.env.PUBLIC_APP_VERSION) {
    return import.meta.env.PUBLIC_APP_VERSION;
  }
  
  // Fallback (this should be set via build config)
  return '1.0.0';
};

/**
 * Format version with 'v' prefix
 * @returns Formatted version string (e.g., "v1.0.0")
 */
export const getFormattedVersion = (): string => {
  return `v${getVersion()}`;
};
