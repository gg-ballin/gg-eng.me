export type TechCategory = 'frontend' | 'deployment' | 'versionControl' | 'packageManager' | 'ide';

export interface TechIconConfig {
  href: string;
  titleKey: keyof {
    astro: string;
    framerMotion: string;
    typescript: string;
    tailwind: string;
    zod: string;
    cloudflare: string;
    cloudflareKV: string;
    github: string;
    npm: string;
    cursor: string;
  };
  iconLight: string;
  iconDark?: string;
  width?: number;
  showText?: boolean; // Whether to show text label
}

export const TECH_ICONS: Record<TechCategory, TechIconConfig[]> = {
  frontend: [
    {
      href: 'https://astro.build',
      titleKey: 'astro',
      iconLight: '/assets/icons/tech/astro/astro_logo_dark.svg',
      iconDark: '/assets/icons/tech/astro/astro_logo_light.svg',
      width: 65,
    },
    {
      href: 'https://www.framer.com/motion/',
      titleKey: 'framerMotion',
      iconLight: '/assets/icons/tech/motion/motion_logo_light.svg',
      iconDark: '/assets/icons/tech/motion/motion_logo_dark.svg',
      showText: true,
    },
    {
      href: 'https://www.typescriptlang.org/',
      titleKey: 'typescript',
      iconLight: '/assets/icons/tech/typescript/typescript_logo.svg',
      showText: true,
    },
    {
      href: 'https://tailwindcss.com',
      titleKey: 'tailwind',
      iconLight: '/assets/icons/tech/tailwind/tailwindcss_logo_light.svg',
      iconDark: '/assets/icons/tech/tailwind/tailwindcss_logo_dark.svg',
      width: 105,
    },
    {
      href: 'https://zod.dev',
      titleKey: 'zod',
      iconLight: '/assets/icons/tech/zod/zod_logo.svg',
      showText: true,
    },
  ],
  deployment: [
    {
      href: 'https://www.cloudflare.com',
      titleKey: 'cloudflare',
      iconLight: '/assets/icons/tech/cloudflare/Cloudflare_Logo.svg',
      width: 85,
    },
    {
      href: 'https://developers.cloudflare.com/kv',
      titleKey: 'cloudflareKV',
      iconLight: '/assets/icons/tech/cloudflare/cloudflare_workers.svg',
      showText: true,
    },
  ],
  versionControl: [
    {
      href: 'https://github.com',
      titleKey: 'github',
      iconLight: '/assets/icons/tech/github/github_logo_dark.svg',
      iconDark: '/assets/icons/tech/github/github_logo_light.svg',
      width: 75,
    },
  ],
  packageManager: [
    {
      href: 'https://www.npmjs.com',
      titleKey: 'npm',
      iconLight: '/assets/icons/tech/npm/Npm_logo.svg',
      showText: true,
    },
  ],
  ide: [
    {
      href: 'https://cursor.sh',
      titleKey: 'cursor',
      iconLight: '/assets/icons/tech/cursor/cursor_logo_dark.svg',
      iconDark: '/assets/icons/tech/cursor/cursor_logo_light.svg',
    },
  ],
};
