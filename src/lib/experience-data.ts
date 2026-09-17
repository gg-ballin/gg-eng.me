// Experience data structure and types
import type { ExperienceTechIconConfig, ExperienceTechCategory } from './experience/technologies';
import { getTechIconById } from './experience/technologies';

export interface ProjectLink {
  label: string;
  href: string;
}

export type MobilePlatform = 'ios' | 'android';

/** Clickable App Store / Play Store badge targets */
export interface StoreLink {
  platform: MobilePlatform;
  href: string;
}

export interface DetailBlock {
  name: string;
  achievements: string[];
  links?: ProjectLink[];
  /** Official store download buttons (when live listing exists) */
  storeLinks?: StoreLink[];
  /** Compact iOS/Android indicators when no store URL is available */
  platforms?: MobilePlatform[];
}

/** @deprecated Use DetailBlock */
export type ProjectDeepDive = DetailBlock;

export type EmploymentType = 'full-time' | 'freelance';

export interface ExperienceEntry {
  /** Stable URL identifier, shared between locales (e.g. 'blockdaemon') */
  slug: string;
  dateRange: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  details?: DetailBlock[];
  /** @deprecated Use details */
  projects?: DetailBlock[];
  /** Entry-level store download badges (single-product roles) */
  storeLinks?: StoreLink[];
  /** Entry-level platform indicators when no store URL is available */
  platforms?: MobilePlatform[];
  highlight?: boolean;
  /** 'freelance' entries are web-only: shown on the site but intentionally left out of the CV PDFs */
  employmentType?: EmploymentType;
}

/** Shared verified store URLs (skip delisted / single-store apps). */
export const STORE_LINKS = {
  iplayme2: [
    { platform: 'ios' as const, href: 'https://apps.apple.com/us/app/iplayme2-schedule-and-play/id1451750136' },
    { platform: 'android' as const, href: 'https://play.google.com/store/apps/details?id=com.iplayme2RNXL' },
  ],
  blockdaemon: [
    { platform: 'ios' as const, href: 'https://apps.apple.com/id/app/bd-approver-app/id6508152650' },
    {
      platform: 'android' as const,
      href: 'https://play.google.com/store/apps/details?id=com.blockdaemon.reactnativeapproverapp',
    },
  ],
  bluon: [
    { platform: 'ios' as const, href: 'https://apps.apple.com/us/app/bluon-hvac/id1357521880' },
    { platform: 'android' as const, href: 'https://play.google.com/store/apps/details?id=com.bluon' },
  ],
  siliconAccess: [
    { platform: 'ios' as const, href: 'https://apps.apple.com/us/app/silicon-access/id1525753656' },
    { platform: 'android' as const, href: 'https://play.google.com/store/apps/details?id=com.siliconaccess' },
  ],
  qiraPagos: [
    { platform: 'ios' as const, href: 'https://apps.apple.com/us/app/qira-pagos/id1560066652' },
    { platform: 'android' as const, href: 'https://play.google.com/store/apps/details?id=com.qirapagos' },
  ],
  flixxo: [
    { platform: 'ios' as const, href: 'https://apps.apple.com/us/app/flixxo/id1447682880' },
    { platform: 'android' as const, href: 'https://play.google.com/store/apps/details?id=com.flixxo.apps.flixxoapp' },
  ],
  romedical: [
    { platform: 'ios' as const, href: 'https://apps.apple.com/us/app/ro-medical/id1557535187' },
    { platform: 'android' as const, href: 'https://play.google.com/store/apps/details?id=com.romedical' },
  ],
} satisfies Record<string, StoreLink[]>;

export interface SkillsData {
  hardSkillsByCategory: Record<ExperienceTechCategory, string[]>; // Categorized skills
  softSkills: string[];
  languages: { name: string; level: string }[];
}

/**
 * Maps skill names to technology icon IDs
 */
const skillToIconIdMap: Record<string, string> = {
  'React Native': 'react-native',
  'react native': 'react-native',
  'REACT NATIVE': 'react-native',
  'Expo': 'expo',
  'expo': 'expo',
  'EXPO': 'expo',
  'TypeScript': 'typescript',
  'typescript': 'typescript',
  'TYPESCRIPT': 'typescript',
  'JavaScript': 'javascript',
  'javascript': 'javascript',
  'JAVASCRIPT': 'javascript',
  'Swift': 'swift',
  'swift': 'swift',
  'SWIFT': 'swift',
  'Kotlin': 'kotlin',
  'kotlin': 'kotlin',
  'KOTLIN': 'kotlin',
  'Redux': 'redux',
  'redux': 'redux',
  'REDUX': 'redux',
  'Redux Toolkit': 'redux',
  'redux toolkit': 'redux',
  'REDUX TOOLKIT': 'redux',
  'redux-toolkit': 'redux',
  'MobX': 'mobx',
  'mobx': 'mobx',
  'MOBX': 'mobx',
  'Zustand': 'zustand',
  'zustand': 'zustand',
  'ZUSTAND': 'zustand',
  'AWS Amplify': 'aws-amplify',
  'aws amplify': 'aws-amplify',
  'AWS AMPLIFY': 'aws-amplify',
  'AWS Cognito': 'aws-cognito',
  'aws cognito': 'aws-cognito',
  'AWS COGNITO': 'aws-cognito',
  'AWS S3': 'aws-s3',
  'aws s3': 'aws-s3',
  'Firebase': 'firebase',
  'firebase': 'firebase',
  'FIREBASE': 'firebase',
  'Android Studio': 'android-studio',
  'android studio': 'android-studio',
  'ANDROID STUDIO': 'android-studio',
  'Google Play Console': 'google-play-console',
  'google play console': 'google-play-console',
  'GOOGLE PLAY CONSOLE': 'google-play-console',
  'Xcode': 'xcode',
  'xcode': 'xcode',
  'XCODE': 'xcode',
  'App Store Connect': 'app-store-connect',
  'app store connect': 'app-store-connect',
  'APP STORE CONNECT': 'app-store-connect',
  'Cursor': 'cursor',
  'cursor': 'cursor',
  'CURSOR': 'cursor',
  'Astro': 'astro',
  'astro': 'astro',
  'ASTRO': 'astro',
  'Cloudflare': 'cloudflare',
  'cloudflare': 'cloudflare',
  'CLOUDFLARE': 'cloudflare',
  'Tailwind': 'tailwind',
  'tailwind': 'tailwind',
  'TAILWIND': 'tailwind',
  'Bun': 'bun',
  'bun': 'bun',
  'BUN': 'bun',
  'Directus': 'directus',
  'directus': 'directus',
  'DIRECTUS': 'directus',
  'PostgreSQL': 'postgresql',
  'postgresql': 'postgresql',
  'POSTGRESQL': 'postgresql',
  'Postgres': 'postgresql',
  'postgres': 'postgresql',
  'Resend': 'resend',
  'resend': 'resend',
  'RESEND': 'resend',
  'Jira': 'jira',
  'jira': 'jira',
  'JIRA': 'jira',
  'Confluence': 'confluence',
  'confluence': 'confluence',
  'CONFLUENCE': 'confluence',
  'Expo EAS': 'expo-eas',
  'expo eas': 'expo-eas',
  'EXPO EAS': 'expo-eas',
  'App Center': 'app-center',
  'app center': 'app-center',
  'APP CENTER': 'app-center',
  'Bitrise': 'bitrise',
  'bitrise': 'bitrise',
  'BITRISE': 'bitrise',
  'Jest': 'jest',
  'jest': 'jest',
  'JEST': 'jest',
  'GraphQL': 'graphql',
  'graphql': 'graphql',
  'GRAPHQL': 'graphql',
  'Apollo': 'apollo',
  'apollo': 'apollo',
  'APOLLO': 'apollo',
  'TanStack Query': 'tanstack-query',
  'tanstack query': 'tanstack-query',
  'TANSTACK QUERY': 'tanstack-query',
  'Sentry': 'sentry',
  'sentry': 'sentry',
  'SENTRY': 'sentry',
  'Auth0': 'auth0',
  'auth0': 'auth0',
  'AUTH0': 'auth0',
  'Okta': 'okta',
  'okta': 'okta',
  'OKTA': 'okta',
};

/**
 * Get technology icon configuration for a skill name
 */
export function getSkillIconConfig(skillName: string): ExperienceTechIconConfig | null {
  const iconId = skillToIconIdMap[skillName];
  if (!iconId) return null;
  
  return getTechIconById(iconId) || null;
}

const LOCALIZED_TECH_DOCS: Partial<Record<string, { en: string; es: string }>> = {
  javascript: {
    en: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    es: 'https://developer.mozilla.org/es/docs/Web/JavaScript',
  },
  typescript: {
    en: 'https://www.typescriptlang.org/docs/',
    es: 'https://www.typescriptlang.org/docs/',
  },
  swift: {
    en: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/',
    es: 'https://docs.swift.org/swift-book/documentation/the-swift-programming-language/',
  },
  kotlin: {
    en: 'https://kotlinlang.org/docs/home.html',
    es: 'https://kotlinlang.org/docs/home.html',
  },
  firebase: {
    en: 'https://firebase.google.com/docs',
    es: 'https://firebase.google.com/docs?hl=es-419',
  },
  jest: {
    en: 'https://jestjs.io/docs/getting-started',
    es: 'https://jestjs.io/es/docs/getting-started',
  },
  graphql: {
    en: 'https://graphql.org/learn/',
    es: 'https://graphql.org/learn/',
  },
  'aws-amplify': {
    en: 'https://docs.amplify.aws/',
    es: 'https://docs.amplify.aws/es/',
  },
  'aws-cognito': {
    en: 'https://docs.aws.amazon.com/cognito/',
    es: 'https://docs.aws.amazon.com/es_es/cognito/',
  },
  'aws-s3': {
    en: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/',
    es: 'https://docs.aws.amazon.com/es_es/AmazonS3/latest/userguide/',
  },
  'android-studio': {
    en: 'https://developer.android.com/studio/intro',
    es: 'https://developer.android.com/studio/intro?hl=es-419',
  },
  'google-play-console': {
    en: 'https://support.google.com/googleplay/android-developer/',
    es: 'https://support.google.com/googleplay/android-developer/?hl=es',
  },
  xcode: {
    en: 'https://developer.apple.com/documentation/xcode',
    es: 'https://developer.apple.com/documentation/xcode',
  },
  'app-store-connect': {
    en: 'https://developer.apple.com/help/app-store-connect/',
    es: 'https://developer.apple.com/help/app-store-connect/',
  },
  auth0: {
    en: 'https://auth0.com/docs',
    es: 'https://auth0.com/docs/es',
  },
  okta: {
    en: 'https://developer.okta.com/docs/',
    es: 'https://developer.okta.com/docs/',
  },
};

type SoftSkillDocKey = 'leadership' | 'async' | 'scrum' | 'kanban' | 'prReview';

const SOFT_SKILL_DOC_KEYS: Record<string, SoftSkillDocKey> = {
  'proven team leadership': 'leadership',
  'liderazgo de equipo comprobado': 'leadership',
  'asynchronous communication': 'async',
  'comunicación asíncrona': 'async',
  SCRUM: 'scrum',
  scrum: 'scrum',
  kanban: 'kanban',
  KANBAN: 'kanban',
  'code review': 'prReview',
  "revisión de PR's": 'prReview',
};

const SOFT_SKILL_DOC_URLS: Record<SoftSkillDocKey, { en: string; es: string }> = {
  leadership: {
    en: 'https://www.atlassian.com/team-playbook/plays/team-health-monitor',
    es: 'https://www.atlassian.com/es/team-playbook/plays/team-health-monitor',
  },
  async: {
    en: 'https://about.gitlab.com/company/culture/all-remote/asynchronous/',
    es: 'https://about.gitlab.com/es/company/culture/all-remote/asynchronous/',
  },
  scrum: {
    en: 'https://scrumguides.org/scrum-guide.html',
    es: 'https://scrumguides.org/scrum-guide.html',
  },
  kanban: {
    en: 'https://kanban.university/kanban-guide/',
    es: 'https://kanban.university/kanban-guide/',
  },
  prReview: {
    en: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests',
    es: 'https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests',
  },
};

/** Official documentation URL for a hard skill, localized when available. */
export function getSkillDocHref(skillName: string, lang: 'es' | 'en'): string | null {
  const iconConfig = getSkillIconConfig(skillName);
  if (!iconConfig) return null;

  const iconId = skillToIconIdMap[skillName];
  const localized = iconId ? LOCALIZED_TECH_DOCS[iconId] : undefined;
  if (localized) return localized[lang];

  return iconConfig.href ?? null;
}

/** Official documentation URL for a soft skill badge. */
export function getSoftSkillDocUrl(skillLabel: string, lang: 'es' | 'en'): string | null {
  const key = SOFT_SKILL_DOC_KEYS[skillLabel];
  if (!key) return null;
  return SOFT_SKILL_DOC_URLS[key][lang];
}

/**
 * Get all skill icon configurations for an array of skill names
 */
export function getSkillIconConfigs(skillNames: string[]): (ExperienceTechIconConfig | null)[] {
  return skillNames.map((skill) => getSkillIconConfig(skill));
}

/**
 * Flatten categorized skills into a single array
 */
export function flattenSkillsByCategory(skillsByCategory: Record<ExperienceTechCategory, string[]>): string[] {
  return Object.values(skillsByCategory).flat();
}

/**
 * Get category display name (for translations)
 */
export function getCategoryDisplayName(category: ExperienceTechCategory, lang: 'es' | 'en'): string {
  const categoryNames: Record<ExperienceTechCategory, { en: string; es: string }> = {
    mobileFrameworks: { en: 'Mobile Frameworks', es: 'Frameworks Móviles' },
    languages: { en: 'Programming Languages', es: 'Lenguajes de Programación' },
    stateManagement: { en: 'State Management', es: 'Gestión de Estado' },
    backendCloud: { en: 'Backend & Cloud', es: 'Backend y Cloud' },
    developmentTools: { en: 'Development Tools', es: 'Herramientas de Desarrollo' },
    deployment: { en: 'Deployment', es: 'Despliegue' },
    testing: { en: 'Testing', es: 'Testing' },
    monitoring: { en: 'Monitoring', es: 'Monitoreo' },
    apis: { en: 'APIs', es: 'APIs' },
    idioms: { en: 'Idioms', es: 'Idiomas' },
    authentication: { en: 'Authentication', es: 'Autenticación' },
  };
  return categoryNames[category][lang];
}

// Experience entries - English
export const experienceEntriesEN: ExperienceEntry[] = [
  {
    dateRange: 'JAN 2026 - PRESENT',
    role: 'Staff Mobile Engineer (Fractional)',
    slug: 'iplayme2',
    company: 'iPlayMe2',
    description:
      'Led the full rewrite of a production racket-sports app from React Native CLI (0.72) to Expo SDK 54 (RN 0.81), reaching feature parity on App Store and Play Store in under 6 months. Owned mobile architecture and delivery (team of 2): Expo Router, Dev Client/prebuild, config plugins, Redux Toolkit + TanStack Query, MMKV, and Sentry. Designed and implemented the CI/CD migration from Bitrise to Expo EAS Build/Submit across three environments (dev/UAT/prod). Drove post-migration platform quality, cutting crash rate ~89% vs. the legacy app; defined engineering standards and hired/onboarded the co-engineer.',
    skills: [
      'EXPO',
      'REACT NATIVE',
      'TYPESCRIPT',
      'Redux Toolkit',
      'TanStack Query',
      'Expo EAS',
      'Bitrise',
      'Sentry',
      'CURSOR',
    ],
    highlight: true,
    storeLinks: STORE_LINKS.iplayme2,
    details: [
      {
        name: 'Expo rewrite & platform ownership',
        achievements: [
          'Led the full rewrite from React Native CLI (0.72) to Expo SDK 54 (RN 0.81), reaching feature parity on App Store and Play Store in under 6 months.',
          'Owned mobile architecture and delivery (team of 2): Expo Router, Dev Client/prebuild, config plugins, Redux Toolkit + TanStack Query, MMKV, and Sentry.',
          'Designed and implemented the CI/CD migration from Bitrise to Expo EAS Build/Submit across three environments (dev/UAT/prod).',
          'Drove post-migration platform quality, cutting crash rate ~89% vs. the legacy app; defined engineering standards and hired/onboarded the co-engineer.',
        ],
      },
    ],
  },
  {
    dateRange: 'APR 2024 - DEC 2025',
    role: 'Senior Mobile Engineer',
    slug: 'blockdaemon',
    company: 'Blockdaemon',
    description: 'Ported a native iOS application to a cross-platform solution using React Native with Expo, achieving feature parity in 4 months. Integrated custom native modules in Swift and Kotlin to bridge secure functionalities into the React Native environment. Developed a secure approver application for institutional wallets leveraging Multi-Party Computation (MPC). Managed migration from Okta to Auth0 SSO and upgraded Expo SDK from v51 to v54.',
    skills: ['EXPO', 'SWIFT', 'KOTLIN', 'Expo EAS', 'zustand', 'mobx', 'jest', 'Sentry', 'OKTA', 'AUTH0', 'CURSOR'],
    highlight: true,
    storeLinks: STORE_LINKS.blockdaemon,
    details: [
      {
        name: 'BD Approver App (MPC)',
        achievements: [
          'Wrote custom native modules in Swift and Kotlin to bridge secure signing functionality into React Native.',
          'The codebase went through a security audit performed by Zellic, a top-tier security research firm specialized in emerging technologies.',
        ],
        links: [{ label: 'Zellic — Security Audits', href: 'https://www.zellic.io/' }],
      },
    ],
  },
  {
    dateRange: 'JUN 2023 - OCT 2023',
    role: 'Lead Mobile Engineer',
    slug: 'mecena',
    company: 'Mecena',
    description: 'Led a team of two Senior Developers in building a FinTech application for content creators. Defined the mobile architecture using a layered approach, with extensive use of custom hooks, i18n, and implemented private login flows. Built animated brutalist UI components (Reanimated v3) and contributed to a design system following atomic design principles.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'REDUX', 'Sentry', 'Firebase', 'App Center', 'Jest'],
  },
  {
    dateRange: 'APR 2023 - JUN 2023',
    role: 'Senior Mobile Engineer',
    slug: 'devbase',
    company: 'DevBase',
    description: 'Maintained and implemented features for an e-commerce app for technicians using JS and TypeScript. Fixed UI bugs across JavaScript and TypeScript while the app was mid-migration to TypeScript.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
    storeLinks: STORE_LINKS.bluon,
    details: [
      {
        name: 'Bluon HVAC',
        achievements: [
          'Maintained and shipped features for Bluon HVAC, an e-commerce / field-tech tooling app for HVAC technicians.',
          'Fixed UI bugs across JavaScript and TypeScript while the codebase was mid-migration to TypeScript.',
        ],
      },
    ],
  },
  {
    dateRange: 'APR 2022 - OCT 2022',
    role: 'Senior Mobile Engineer',
    slug: 'coderio',
    company: 'Coderio',
    description: 'Developed a surfing industry app with 70+ screens, integrating public weather APIs, OAuth integrations and Stripe payments. Integrated OAuth login/account creation with Google, Facebook, and Apple; also integrated Stripe SDK for payments.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
    details: [
      {
        name: 'Surfland',
        achievements: [
          'Built a surfing industry consumer app with 70+ screens: forecasts, OAuth (Google, Facebook, Apple), and Stripe payments.',
          'Integrated public weather APIs and end-to-end account / payment flows for the surf marketplace product.',
        ],
        links: [{ label: 'surfland.app', href: 'https://surfland.app/' }],
        platforms: ['ios', 'android'],
      },
    ],
  },
  {
    dateRange: 'SEP 2021 - APR 2022',
    role: 'Lead Mobile Engineer',
    slug: 'dept',
    company: 'DEPT',
    description: 'Led a team of 3 Senior Engineers to build a hydroponics startup client from the ground up. Acted as first engineer, making all core architecture and stack decisions. Drove alignment through recurring product and stakeholder meetings with the client\'s Product Owner.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'GraphQL', 'Apollo', 'AWS Amplify', 'AWS Cognito', 'App Center'],
    highlight: true,
    details: [
      {
        name: 'Farmhand (Freight Farms)',
        achievements: [
          'First engineer on Farmhand for Freight Farms: owned core React Native architecture, GraphQL/Apollo data layer, and AWS Amplify/Cognito auth.',
          'Led a team of 3 Senior Engineers and ran recurring product alignment with the client Product Owner.',
        ],
        links: [{ label: 'freightfarms.com/farmhand', href: 'https://www.freightfarms.com/farmhand' }],
        platforms: ['ios', 'android'],
      },
    ],
  },
  {
    dateRange: 'SEP 2017 - SEP 2021',
    role: 'Mobile Engineer',
    slug: 'paisanos',
    company: 'Paisanos',
    description: 'Delivered over 10 mobile applications for FinTech, AgTech, and Healthcare using React Native. Performed major React Native version migrations (v0.51 to v0.59) using RN Upgrade Helper. Adapted quickly across a high-rotation project environment, ramping into different products and requirements.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'JAVASCRIPT','AWS S3', 'Firebase', 'Swift', 'Kotlin', 'Bitrise' ],
    highlight: true,
    details: [
      {
        name: 'Silicon Access',
        achievements: [
          'Neighborhood / access-control consumer app connecting residents, administration, and security in real time.',
        ],
        storeLinks: STORE_LINKS.siliconAccess,
      },
      {
        name: 'Qira Pagos',
        achievements: [
          'AgTech FinTech wallet (“billetera del campo”) for payments, collections, grain exchange, and transfers.',
        ],
        storeLinks: STORE_LINKS.qiraPagos,
      },
      {
        name: 'Flixxo',
        achievements: [
          'Community streaming app for independent microseries and short films with creator-support monetization flows.',
        ],
        storeLinks: STORE_LINKS.flixxo,
      },
    ],
  },
  {
    dateRange: 'DEC 2016 - MAY 2019',
    role: 'Full Stack Engineer',
    slug: 'bits0',
    company: 'Bits0',
    description: 'Developed two mobile applications from the ground up using React Native with Expo and Redux. Built a comprehensive mobile solution for an aesthetic medical center, including features for discounts, coupons, and reservations. Developed and maintained a backend system using PHP and MySQL to support mobile REST APIs. Performed maintenance and bug fixing for a domotic system application for intelligent housing. Managed manual deployments to both App Store and Google Play Store in the early stages of the Expo ecosystem.',
    skills: ['REACT NATIVE', 'EXPO', 'REDUX', 'JAVASCRIPT'],
    storeLinks: STORE_LINKS.romedical,
    details: [
      {
        name: 'Ro Medical (Romedical Art)',
        achievements: [
          'Built the aesthetic medical center mobile product from scratch with React Native + Expo + Redux: discounts, coupons, and reservations.',
          'Owned early Expo-era manual App Store and Google Play releases, plus PHP/MySQL REST backend support.',
        ],
      },
    ],
  },
];

// Experience entries - Spanish
export const experienceEntriesES: ExperienceEntry[] = [
  {
    dateRange: 'ENE 2026 - ACTUALIDAD',
    role: 'Staff Mobile Engineer (Fractional)',
    slug: 'iplayme2',
    company: 'iPlayMe2',
    description:
      'Lideré la reescritura completa de una app de deportes de raqueta en producción, de React Native CLI (0.72) a Expo SDK 54 (RN 0.81), alcanzando paridad de funciones en App Store y Play Store en menos de 6 meses. Responsable de la arquitectura móvil y la entrega (equipo de 2): Expo Router, Dev Client/prebuild, config plugins, Redux Toolkit + TanStack Query, MMKV y Sentry. Diseñé e implementé la migración de CI/CD de Bitrise a Expo EAS Build/Submit en tres entornos (dev/UAT/prod). Impulsé la calidad de plataforma post-migración, reduciendo la tasa de crashes ~89% frente a la app legacy; definí estándares de ingeniería y contraté/onboardié al co-ingeniero.',
    skills: [
      'EXPO',
      'REACT NATIVE',
      'TYPESCRIPT',
      'Redux Toolkit',
      'TanStack Query',
      'Expo EAS',
      'Bitrise',
      'Sentry',
      'CURSOR',
    ],
    highlight: true,
    storeLinks: STORE_LINKS.iplayme2,
    details: [
      {
        name: 'Reescritura a Expo y ownership de plataforma',
        achievements: [
          'Lideré la reescritura completa de React Native CLI (0.72) a Expo SDK 54 (RN 0.81), alcanzando paridad de funciones en App Store y Play Store en menos de 6 meses.',
          'Responsable de la arquitectura móvil y la entrega (equipo de 2): Expo Router, Dev Client/prebuild, config plugins, Redux Toolkit + TanStack Query, MMKV y Sentry.',
          'Diseñé e implementé la migración de CI/CD de Bitrise a Expo EAS Build/Submit en tres entornos (dev/UAT/prod).',
          'Impulsé la calidad de plataforma post-migración, reduciendo la tasa de crashes ~89% frente a la app legacy; definí estándares de ingeniería y contraté/onboardié al co-ingeniero.',
        ],
      },
    ],
  },
  {
    dateRange: 'ABR 2024 - DIC 2025',
    role: 'Senior Mobile Engineer',
    slug: 'blockdaemon',
    company: 'Blockdaemon',
    description: 'Migración de una aplicación nativa de iOS a una solución multiplataforma utilizando React Native con Expo, logrando paridad de funciones en 4 meses. Integración de módulos nativos personalizados en Swift y Kotlin para conectar funcionalidades seguras al entorno de React Native. Desarrollo de una aplicación de aprobación segura para billeteras institucionales utilizando Computación Multipartita (MPC). Gestión de la migración de Okta a Auth0 SSO y actualización del SDK de Expo de v51 a v54.',
    skills: ['EXPO', 'SWIFT', 'KOTLIN', 'Expo EAS', 'zustand', 'mobx', 'jest', 'Sentry', 'OKTA', 'AUTH0', 'CURSOR'],
    highlight: true,
    storeLinks: STORE_LINKS.blockdaemon,
    details: [
      {
        name: 'BD Approver App (MPC)',
        achievements: [
          'Desarrollo de módulos nativos personalizados en Swift y Kotlin para integrar funcionalidad segura de firmas en React Native.',
          'El código pasó por una auditoría de seguridad realizada por Zellic, una firma de investigación en seguridad de primer nivel especializada en tecnologías emergentes.',
        ],
        links: [{ label: 'Zellic — Auditorías de seguridad', href: 'https://www.zellic.io/' }],
      },
    ],
  },
  {
    dateRange: 'JUN 2023 - OCT 2023',
    role: 'Lead Mobile Engineer',
    slug: 'mecena',
    company: 'Mecena',
    description: 'Liderazgo de un equipo de dos desarrolladores Senior en la creación de una aplicación FinTech para creadores de contenido. Definición de la arquitectura móvil mediante un enfoque por capas, uso extensivo de hooks personalizados, i18n e implementación de flujos de inicio de sesión privados. Construcción de componentes de interfaz de usuario de estilo brutalista animados (Reanimated v3) y contribución a un sistema de diseño siguiendo principios de diseño atómico.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'REDUX', 'Sentry', 'Firebase', 'App Center', 'Jest'],
  },
  {
    dateRange: 'ABR 2023 - JUN 2023',
    role: 'Senior Mobile Engineer',
    slug: 'devbase',
    company: 'DevBase',
    description: 'Mantenimiento e implementación de funciones para una aplicación de comercio electrónico para técnicos utilizando JS y TypeScript. Corrección de errores de interfaz de usuario en JavaScript y TypeScript mientras la aplicación se encontraba en medio de la migración a TypeScript.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
    storeLinks: STORE_LINKS.bluon,
    details: [
      {
        name: 'Bluon HVAC',
        achievements: [
          'Mantuve y entregué features de Bluon HVAC, app de e-commerce / tooling de campo para técnicos HVAC.',
          'Corregí bugs de UI en JavaScript y TypeScript mientras el codebase migraba a TypeScript.',
        ],
      },
    ],
  },
  {
    dateRange: 'ABR 2022 - OCT 2022',
    role: 'Senior Mobile Engineer',
    slug: 'coderio',
    company: 'Coderio',
    description: 'Desarrollo de una aplicación para la industria del surf con más de 70 pantallas, integrando APIs meteorológicas públicas, OAuth y pagos con Stripe. Integración de inicio de sesión/creación de cuenta con Google, Facebook y Apple; también se integró el SDK de Stripe para pagos.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
    details: [
      {
        name: 'Surfland',
        achievements: [
          'App consumer de la industria del surf con 70+ pantallas: forecasts, OAuth (Google, Facebook, Apple) y pagos con Stripe.',
          'Integración de APIs meteorológicas públicas y flujos end-to-end de cuenta / pagos para el marketplace de surf.',
        ],
        links: [{ label: 'surfland.app', href: 'https://surfland.app/' }],
        platforms: ['ios', 'android'],
      },
    ],
  },
  {
    dateRange: 'SEP 2021 - ABR 2022',
    role: 'Lead Mobile Engineer',
    slug: 'dept',
    company: 'DEPT',
    description: 'Liderazgo de un equipo de 3 ingenieros Senior para construir el cliente de una startup de hidroponía desde cero. Primer ingeniero en el proyecto, tomando todas las decisiones sobre la arquitectura principal y el stack tecnológico. Alineación mediante reuniones recurrentes de producto y con stakeholders (Product Owner del cliente).',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'GraphQL', 'Apollo', 'AWS Amplify', 'AWS Cognito', 'App Center'],
    highlight: true,
    details: [
      {
        name: 'Farmhand (Freight Farms)',
        achievements: [
          'Primer ingeniero en Farmhand para Freight Farms: arquitectura React Native, capa GraphQL/Apollo y auth AWS Amplify/Cognito.',
          'Lideré un equipo de 3 Senior Engineers y la alineación recurrente de producto con el Product Owner del cliente.',
        ],
        links: [{ label: 'freightfarms.com/farmhand', href: 'https://www.freightfarms.com/farmhand' }],
        platforms: ['ios', 'android'],
      },
    ],
  },
  {
    dateRange: 'SEP 2017 - SEP 2021',
    role: 'Mobile Engineer',
    slug: 'paisanos',
    company: 'Paisanos',
    description: 'Entrega de más de 10 aplicaciones móviles para FinTech, AgTech y Healthcare utilizando React Native. Realización de migraciones mayores de versiones de React Native (v0.51 a v0.59) utilizando RN Upgrade Helper. Adaptación rápida en un entorno de proyectos de alta rotación, integrándose a diferentes productos y requisitos.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'JAVASCRIPT','AWS S3', 'Firebase', 'Swift', 'Kotlin', 'Bitrise' ],
    highlight: true,
    details: [
      {
        name: 'Silicon Access',
        achievements: [
          'App consumer de barrios / control de accesos que conecta en tiempo real a residentes, administración y seguridad.',
        ],
        storeLinks: STORE_LINKS.siliconAccess,
      },
      {
        name: 'Qira Pagos',
        achievements: [
          'Billetera AgTech FinTech (“billetera del campo”) para pagos, cobros, canje de granos y transferencias.',
        ],
        storeLinks: STORE_LINKS.qiraPagos,
      },
      {
        name: 'Flixxo',
        achievements: [
          'App de streaming comunitario para microseries y cortos independientes, con flujos de soporte a creadores.',
        ],
        storeLinks: STORE_LINKS.flixxo,
      },
    ],
  },
  {
    dateRange: 'DIC 2016 - MAYO 2019',
    role: 'Full Stack Engineer',
    slug: 'bits0',
    company: 'Bits0',
    description: 'Desarrollo de dos aplicaciones móviles desde cero utilizando React Native con Expo y Redux. Creación de una solución móvil integral para un centro de medicina estética, incluyendo funciones de descuentos, cupones y reservas. Desarrollo y mantenimiento de un sistema backend utilizando PHP y MySQL para dar soporte a REST APIs móviles. Mantenimiento y corrección de errores para una aplicación de sistema domótico para viviendas inteligentes. Gestión de despliegues manuales tanto en App Store como en Google Play Store en las etapas iniciales del ecosistema Expo.',
    skills: ['REACT NATIVE', 'EXPO', 'REDUX', 'JAVASCRIPT'],
    storeLinks: STORE_LINKS.romedical,
    details: [
      {
        name: 'Ro Medical (Romedical Art)',
        achievements: [
          'Producto móvil del centro de medicina estética desde cero con React Native + Expo + Redux: descuentos, cupones y reservas.',
          'Releases manuales tempranos a App Store y Google Play en la era inicial de Expo, más backend PHP/MySQL REST.',
        ],
      },
    ],
  },
];

// Skills data - English
export const skillsDataEN: SkillsData = {
  hardSkillsByCategory: {
    mobileFrameworks: ['Expo', 'React Native'],
    languages: ['TypeScript', 'JavaScript', 'Swift', 'Kotlin'],
    stateManagement: ['Redux Toolkit', 'MobX', 'Zustand'],
    backendCloud: ['AWS Amplify', 'AWS Cognito', 'AWS S3', 'Firebase'],
    developmentTools: ['Android Studio', 'Google Play Console', 'Xcode', 'App Store Connect', 'Cursor'],
    deployment: ['Expo EAS', 'App Center', 'Bitrise'],
    testing: ['Jest'],
    monitoring: ['Sentry'],
    apis: ['GraphQL', 'Apollo', 'TanStack Query'],
    authentication: ['Auth0', 'Okta'],
    idioms: [], // Empty - languages with levels are shown via LanguagesSection component
  },
  softSkills: [
    'proven team leadership',
    'asynchronous communication',
    'SCRUM',
    'kanban',
    'code review',
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'C2' },
  ],
};

// Skills data - Spanish
export const skillsDataES: SkillsData = {
  hardSkillsByCategory: {
    mobileFrameworks: ['Expo', 'React Native'],
    languages: ['TypeScript', 'JavaScript', 'Swift', 'Kotlin'],
    stateManagement: ['Redux Toolkit', 'MobX', 'Zustand'],
    backendCloud: ['AWS Amplify', 'AWS Cognito', 'AWS S3', 'Firebase'],
    developmentTools: ['Android Studio', 'Google Play Console', 'Xcode', 'App Store Connect', 'Cursor'],
    deployment: ['Expo EAS', 'App Center', 'Bitrise'],
    testing: ['Jest'],
    monitoring: ['Sentry'],
    apis: ['GraphQL', 'Apollo', 'TanStack Query'],
    authentication: ['Auth0', 'Okta'],
    idioms: [], // Empty - languages with levels are shown via LanguagesSection component
  },
  softSkills: [
    'liderazgo de equipo comprobado',
    'comunicación asíncrona',
    'SCRUM',
    'kanban',
    "revisión de PR's",
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'C2' },
  ],
};

export function getExperienceEntries(lang: 'es' | 'en'): ExperienceEntry[] {
  return lang === 'es' ? experienceEntriesES : experienceEntriesEN;
}

export function getExperienceEntryBySlug(lang: 'es' | 'en', slug: string): ExperienceEntry | undefined {
  return getExperienceEntries(lang).find((entry) => entry.slug === slug);
}

/** Entry-level store badges, or unique storeLinks aggregated from detail blocks. */
export function getEntryStoreLinks(entry: ExperienceEntry): StoreLink[] {
  if (entry.storeLinks?.length) return entry.storeLinks;

  const seen = new Set<string>();
  const links: StoreLink[] = [];
  for (const block of entry.details ?? entry.projects ?? []) {
    for (const link of block.storeLinks ?? []) {
      const key = `${link.platform}:${link.href}`;
      if (seen.has(key)) continue;
      seen.add(key);
      links.push(link);
    }
  }
  return links;
}

/**
 * Platform indicators only when there are no store download links.
 * Prefers entry.platforms; otherwise unions platforms from detail blocks that lack storeLinks.
 */
export function getEntryPlatforms(entry: ExperienceEntry): MobilePlatform[] {
  if (getEntryStoreLinks(entry).length > 0) return [];
  if (entry.platforms?.length) return entry.platforms;

  const seen = new Set<MobilePlatform>();
  for (const block of entry.details ?? entry.projects ?? []) {
    if (block.storeLinks?.length) continue;
    for (const platform of block.platforms ?? []) {
      seen.add(platform);
    }
  }
  return [...seen];
}

export function getSkillsData(lang: 'es' | 'en'): SkillsData {
  return lang === 'es' ? skillsDataES : skillsDataEN;
}
