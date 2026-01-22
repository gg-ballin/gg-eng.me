import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the application version from package.json
 * Falls back to environment variable or default if package.json is unavailable
 * @returns Semantic version string (e.g., "1.0.0")
 */
export const getVersion = (): string => {
  // Priority 1: Environment variable (useful for CI/CD)
  if (import.meta.env.PUBLIC_APP_VERSION) {
    return import.meta.env.PUBLIC_APP_VERSION;
  }
  
  // Priority 2: Read from package.json at build time
  try {
    const packagePath = join(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
    if (packageJson?.version) {
      return packageJson.version;
    }
  } catch (error) {
    // Silently fall through to default
  }
  
  // Fallback
  return '1.0.0';
};

/**
 * Format version with 'v' prefix
 * @returns Formatted version string (e.g., "v1.0.0")
 */
export const getFormattedVersion = (): string => {
  return `v${getVersion()}`;
};
