/**
 * Employer logos configuration for the experience section
 * Handles theme-specific variants (SVG) and static images (PNG)
 */

export interface EmployerLogoConfig {
  id: string; // Unique identifier (matches company name in experience data)
  name: string; // Display name
  href?: string; // Optional company website
  iconLight: string; // Path to light theme logo or default logo
  iconDark?: string; // Path to dark theme logo (optional, for SVG variants)
  width?: number; // Optional width override
  showText?: boolean; // Whether to show text label
  isPng?: boolean; // Whether the logo is a PNG (no theme variants)
}

/**
 * Employer logos organized by company
 * Each entry supports theme-specific variants where available
 */
export const EMPLOYER_LOGOS: Record<string, EmployerLogoConfig> = {
  bits0: {
    id: 'bits0',
    name: 'bits0',
    iconLight: '/assets/icons/experience/employers/bits0/bits0_logo_light.svg',
    iconDark: '/assets/icons/experience/employers/bits0/bits0_logo_dark.svg',
    width: 80,
  },
  blockdaemon: {
    id: 'blockdaemon',
    name: 'Blockdaemon',
    iconLight: '/assets/icons/experience/employers/blockdaemon/blockdaemon_logo_light.svg',
    iconDark: '/assets/icons/experience/employers/blockdaemon/blockdaemon_logo_dark.svg',
    width: 120,
  },
  dept: {
    id: 'dept',
    name: 'DEPT',
    iconLight: '/assets/icons/experience/employers/DEPT/dept_logo_light.svg',
    iconDark: '/assets/icons/experience/employers/DEPT/dept_logo_dark.svg',
    width: 90,
  },
  devbase: {
    id: 'devbase',
    name: 'devBase',
    iconLight: '/assets/icons/experience/employers/devBase/devbase_logo_light.svg',
    iconDark: '/assets/icons/experience/employers/devBase/devbase_logo_dark.svg',
    width: 100,
  },
  iplayme2: {
    id: 'iplayme2',
    name: 'iPlayMe2',
    iconLight: '/assets/icons/experience/employers/iPlayMe2/iplayme2.png',
    isPng: true,
    width: 100,
  },
  'mecena-selfers': {
    id: 'mecena-selfers',
    name: 'Mecena Selfers',
    iconLight: '/assets/icons/experience/employers/mecena-selfers/mecena_logo.png',
    isPng: true,
    width: 110,
  },
  selfers: {
    id: 'selfers',
    name: 'Selfers',
    iconLight: '/assets/icons/experience/employers/mecena-selfers/selfers_logo_light.svg',
    iconDark: '/assets/icons/experience/employers/mecena-selfers/selfers_logo_dark.svg',
    width: 100,
  },
  paisanos: {
    id: 'paisanos',
    name: 'Paisanos',
    iconLight: '/assets/icons/experience/employers/paisanos/paisanos_light.svg',
    iconDark: '/assets/icons/experience/employers/paisanos/paisanos_dark.svg',
    width: 100,
  },
};

/**
 * Get employer logo configuration by company ID
 * @param companyId - The company identifier (case-insensitive, normalized)
 */
export function getEmployerLogo(companyId: string): EmployerLogoConfig | undefined {
  // Normalize the company ID (lowercase, handle spaces/hyphens)
  const normalizedId = companyId.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
  
  // Try exact match first
  if (EMPLOYER_LOGOS[normalizedId]) {
    return EMPLOYER_LOGOS[normalizedId];
  }
  
  // Try partial match (e.g., "mecena" or "selfers" for "mecena-selfers")
  const matchingKey = Object.keys(EMPLOYER_LOGOS).find(
    (key) => key.includes(normalizedId) || normalizedId.includes(key)
  );
  
  if (matchingKey) {
    return EMPLOYER_LOGOS[matchingKey];
  }
  
  return undefined;
}

/**
 * Get all employer logos as an array
 */
export function getAllEmployerLogos(): EmployerLogoConfig[] {
  return Object.values(EMPLOYER_LOGOS);
}

/**
 * Get employer logos by multiple company IDs
 */
export function getEmployerLogosByIds(companyIds: string[]): EmployerLogoConfig[] {
  return companyIds
    .map((id) => getEmployerLogo(id))
    .filter((logo): logo is EmployerLogoConfig => logo !== undefined);
}
