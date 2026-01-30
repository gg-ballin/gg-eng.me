// Experience data structure and types
import type { ExperienceTechIconConfig, ExperienceTechCategory } from './experience/technologies';
import { getTechIconById } from './experience/technologies';

export interface ProjectDeepDive {
  name: string;
  achievements: string[];
}

export interface ExperienceEntry {
  dateRange: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  projects?: ProjectDeepDive[];
  highlight?: boolean;
}

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
    dateRange: 'APR 2024 - DEC 2025',
    role: 'Senior Mobile Engineer',
    company: 'Blockdaemon',
    description: 'Ported a native iOS application to a cross-platform solution using React Native with Expo, achieving feature parity in 4 months. Integrated custom native modules in Swift and Kotlin to bridge secure functionalities into the React Native environment. Developed a secure approver application for institutional wallets leveraging Multi-Party Computation (MPC). Managed migration from Okta to Auth0 SSO and upgraded Expo SDK from v51 to v54.',
    skills: ['EXPO', 'SWIFT', 'KOTLIN', 'Expo EAS', 'zustand', 'mobx', 'jest', 'Sentry', 'OKTA', 'AUTH0', 'CURSOR'],
    highlight: true,
  },
  {
    dateRange: 'JUN 2023 - OCT 2023',
    role: 'Lead Mobile Engineer',
    company: 'Mecena',
    description: 'Led a team of two Senior Developers in building a FinTech application for content creators. Defined the mobile architecture using a layered approach, with extensive use of custom hooks, i18n, and implemented private login flows. Built animated brutalist UI components (Reanimated v3) and contributed to a design system following atomic design principles.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'REDUX', 'Sentry', 'Firebase', 'App Center', 'Jest'],
  },
  {
    dateRange: 'APR 2023 - JUN 2023',
    role: 'Senior Mobile Engineer',
    company: 'DevBase',
    description: 'Maintained and implemented features for an e-commerce app for technicians using JS and TypeScript. Fixed UI bugs across JavaScript and TypeScript while the app was mid-migration to TypeScript.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
  },
  {
    dateRange: 'APR 2022 - OCT 2022',
    role: 'Senior Mobile Engineer',
    company: 'Coderio',
    description: 'Developed a surfing industry app with 70+ screens, integrating public weather APIs, OAuth integrations and Stripe payments. Integrated OAuth login/account creation with Google, Facebook, and Apple; also integrated Stripe SDK for payments.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
  },
  {
    dateRange: 'SEP 2021 - APR 2022',
    role: 'Lead Mobile Engineer',
    company: 'DEPT',
    description: 'Led a team of 3 Senior Engineers to build a hydroponics startup client from the ground up. Acted as first engineer, making all core architecture and stack decisions. Drove alignment through recurring product and stakeholder meetings with the client\'s Product Owner.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'GraphQL', 'Apollo', 'AWS Amplify', 'AWS Cognito', 'App Center'],
    highlight: true,
  },
  {
    dateRange: 'SEP 2017 - SEP 2021',
    role: 'Mobile Engineer',
    company: 'Paisanos',
    description: 'Delivered over 10 mobile applications for FinTech, AgTech, and Healthcare using React Native. Performed major React Native version migrations (v0.51 to v0.59) using RN Upgrade Helper. Adapted quickly across a high-rotation project environment, ramping into different products and requirements.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'JAVASCRIPT','AWS S3', 'Firebase', 'Swift', 'Kotlin', 'Bitrise' ],
    highlight: true,
  },
  {
    dateRange: 'DEC 2016 - MAY 2019',
    role: 'Full Stack Engineer',
    company: 'Bits0',
    description: 'Developed two mobile applications from the ground up using React Native with Expo and Redux. Built a comprehensive mobile solution for an aesthetic medical center, including features for discounts, coupons, and reservations. Developed and maintained a backend system using PHP and MySQL to support mobile REST APIs. Performed maintenance and bug fixing for a domotic system application for intelligent housing. Managed manual deployments to both App Store and Google Play Store in the early stages of the Expo ecosystem.',
    skills: ['REACT NATIVE', 'EXPO', 'REDUX', 'JAVASCRIPT'],
  },
];

// Experience entries - Spanish
export const experienceEntriesES: ExperienceEntry[] = [
  {
    dateRange: 'ABR 2024 - DIC 2025',
    role: 'Senior Mobile Engineer',
    company: 'Blockdaemon',
    description: 'Migración de una aplicación nativa de iOS a una solución multiplataforma utilizando React Native con Expo, logrando paridad de funciones en 4 meses. Integración de módulos nativos personalizados en Swift y Kotlin para conectar funcionalidades seguras al entorno de React Native. Desarrollo de una aplicación de aprobación segura para billeteras institucionales utilizando Computación Multipartita (MPC). Gestión de la migración de Okta a Auth0 SSO y actualización del SDK de Expo de v51 a v54.',
    skills: ['EXPO', 'SWIFT', 'KOTLIN', 'Expo EAS', 'zustand', 'mobx', 'jest', 'Sentry', 'OKTA', 'AUTH0', 'CURSOR'],
    highlight: true,
  },
  {
    dateRange: 'JUN 2023 - OCT 2023',
    role: 'Lead Mobile Engineer',
    company: 'Mecena',
    description: 'Liderazgo de un equipo de dos desarrolladores Senior en la creación de una aplicación FinTech para creadores de contenido. Definición de la arquitectura móvil mediante un enfoque por capas, uso extensivo de hooks personalizados, i18n e implementación de flujos de inicio de sesión privados. Construcción de componentes de interfaz de usuario de estilo brutalista animados (Reanimated v3) y contribución a un sistema de diseño siguiendo principios de diseño atómico.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'REDUX', 'Sentry', 'Firebase', 'App Center', 'Jest'],
  },
  {
    dateRange: 'ABR 2023 - JUN 2023',
    role: 'Senior Mobile Engineer',
    company: 'DevBase',
    description: 'Mantenimiento e implementación de funciones para una aplicación de comercio electrónico para técnicos utilizando JS y TypeScript. Corrección de errores de interfaz de usuario en JavaScript y TypeScript mientras la aplicación se encontraba en medio de la migración a TypeScript.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
  },
  {
    dateRange: 'ABR 2022 - OCT 2022',
    role: 'Senior Mobile Engineer',
    company: 'Coderio',
    description: 'Desarrollo de una aplicación para la industria del surf con más de 70 pantallas, integrando APIs meteorológicas públicas, OAuth y pagos con Stripe. Integración de inicio de sesión/creación de cuenta con Google, Facebook y Apple; también se integró el SDK de Stripe para pagos.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'App Center', 'Jest', 'Firebase'],
  },
  {
    dateRange: 'SEP 2021 - ABR 2022',
    role: 'Lead Mobile Engineer',
    company: 'DEPT',
    description: 'Liderazgo de un equipo de 3 ingenieros Senior para construir el cliente de una startup de hidroponía desde cero. Primer ingeniero en el proyecto, tomando todas las decisiones sobre la arquitectura principal y el stack tecnológico. Alineación mediante reuniones recurrentes de producto y con stakeholders (Product Owner del cliente).',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'GraphQL', 'Apollo', 'AWS Amplify', 'AWS Cognito', 'App Center'],
    highlight: true,
  },
  {
    dateRange: 'SEP 2017 - SEP 2021',
    role: 'Mobile Engineer',
    company: 'Paisanos',
    description: 'Entrega de más de 10 aplicaciones móviles para FinTech, AgTech y Healthcare utilizando React Native. Realización de migraciones mayores de versiones de React Native (v0.51 a v0.59) utilizando RN Upgrade Helper. Adaptación rápida en un entorno de proyectos de alta rotación, integrándose a diferentes productos y requisitos.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'JAVASCRIPT','AWS S3', 'Firebase', 'Swift', 'Kotlin', 'Bitrise' ],
    highlight: true,
  },
  {
    dateRange: 'DIC 2016 - MAYO 2019',
    role: 'Full Stack Engineer',
    company: 'Bits0',
    description: 'Desarrollo de dos aplicaciones móviles desde cero utilizando React Native con Expo y Redux. Creación de una solución móvil integral para un centro de medicina estética, incluyendo funciones de descuentos, cupones y reservas. Desarrollo y mantenimiento de un sistema backend utilizando PHP y MySQL para dar soporte a REST APIs móviles. Mantenimiento y corrección de errores para una aplicación de sistema domótico para viviendas inteligentes. Gestión de despliegues manuales tanto en App Store como en Google Play Store en las etapas iniciales del ecosistema Expo.',
    skills: ['REACT NATIVE', 'EXPO', 'REDUX', 'JAVASCRIPT'],
  },
];

// Skills data - English
export const skillsDataEN: SkillsData = {
  hardSkillsByCategory: {
    mobileFrameworks: ['React Native', 'Expo'],
    languages: ['TypeScript', 'JavaScript', 'Swift', 'Kotlin'],
    stateManagement: ['Redux', 'MobX', 'Zustand'],
    backendCloud: ['AWS Amplify', 'AWS Cognito', 'AWS S3', 'Firebase'],
    developmentTools: ['Android Studio', 'Google Play Console', 'Xcode', 'App Store Connect', 'Cursor'],
    deployment: ['Expo EAS', 'App Center', 'Bitrise'],
    testing: ['Jest'],
    monitoring: ['Sentry'],
    apis: ['GraphQL', 'Apollo', 'TanStack Query'],
    authentication: ['Auth0', 'Okta'],
    idioms: ['English', 'Spanish'],
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
    mobileFrameworks: ['React Native', 'Expo'],
    languages: ['TypeScript', 'JavaScript', 'Swift', 'Kotlin'],
    stateManagement: ['Redux', 'MobX', 'Zustand'],
    backendCloud: ['AWS Amplify', 'AWS Cognito', 'AWS S3', 'Firebase'],
    developmentTools: ['Android Studio', 'Google Play Console', 'Xcode', 'App Store Connect', 'Cursor'],
    deployment: ['Expo EAS', 'App Center', 'Bitrise'],
    testing: ['Jest'],
    monitoring: ['Sentry'],
    apis: ['GraphQL', 'Apollo', 'TanStack Query'],
    authentication: ['Auth0', 'Okta'],
    idioms: ['Español', 'Inglés'],
  },
  softSkills: [
    'liderazgo de equipo comprobado',
    'comunicación asíncrona',
    'SCRUM',
    'kanban',
    'revisión de código',
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'C2' },
  ],
};

export function getExperienceEntries(lang: 'es' | 'en'): ExperienceEntry[] {
  return lang === 'es' ? experienceEntriesES : experienceEntriesEN;
}

export function getSkillsData(lang: 'es' | 'en'): SkillsData {
  return lang === 'es' ? skillsDataES : skillsDataEN;
}
