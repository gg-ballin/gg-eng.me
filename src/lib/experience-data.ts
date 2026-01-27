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
    languages: { en: 'Languages', es: 'Lenguajes' },
    stateManagement: { en: 'State Management', es: 'Gestión de Estado' },
    backendCloud: { en: 'Backend & Cloud', es: 'Backend y Cloud' },
    developmentTools: { en: 'Development Tools', es: 'Herramientas de Desarrollo' },
    deployment: { en: 'Deployment', es: 'Despliegue' },
    testing: { en: 'Testing', es: 'Testing' },
    monitoring: { en: 'Monitoring', es: 'Monitoreo' },
    apis: { en: 'APIs', es: 'APIs' },
    authentication: { en: 'Authentication', es: 'Autenticación' },
  };
  return categoryNames[category][lang];
}

// Experience entries - English
export const experienceEntriesEN: ExperienceEntry[] = [
  // TODO: Fill in with actual experience data from CV
  {
    dateRange: 'SEP 2024 - PRESENT',
    role: 'Senior Mobile Engineer',
    company: 'Freelance',
    description: 'Working as a freelance mobile developer, focusing on React Native, Expo, and modern mobile architectures.',
    skills: ['REACT NATIVE', 'EXPO', 'TYPESCRIPT', 'SWIFT', 'KOTLIN'],
    projects: [
      {
        name: 'Project Example',
        achievements: [
          'Implemented mobile features for iOS and Android',
          'Optimized app performance and user experience',
        ],
      },
    ],
  },
  {
    dateRange: 'SEP 2024 - PRESENT',
    role: 'Senior Mobile Engineer',
    company: 'Freelance',
    description: 'Working as a freelance mobile developer, focusing on React Native, Expo, and modern mobile architectures.',
    skills: ['REACT NATIVE', 'EXPO', 'TYPESCRIPT', 'SWIFT', 'KOTLIN'],
    projects: [
      {
        name: 'Project Example',
        achievements: [
          'Implemented mobile features for iOS and Android',
          'Optimized app performance and user experience',
        ],
      },
    ],
  },
  {
    dateRange: 'SEP 2024 - PRESENT',
    role: 'Senior Mobile Engineer',
    company: 'Freelance',
    description: 'Working as a freelance mobile developer, focusing on React Native, Expo, and modern mobile architectures.',
    skills: ['REACT NATIVE', 'EXPO', 'TYPESCRIPT', 'SWIFT', 'KOTLIN'],
    projects: [
      {
        name: 'Project Example',
        achievements: [
          'Implemented mobile features for iOS and Android',
          'Optimized app performance and user experience',
        ],
      },
    ],
  },
];

// Experience entries - Spanish
export const experienceEntriesES: ExperienceEntry[] = [
  // TODO: Fill in with actual experience data from CV
  {
    dateRange: 'SEP 2024 - ACTUALIDAD',
    role: 'Senior Mobile Engineer',
    company: 'Freelance',
    description: 'Trabajando como desarrollador móvil freelance, enfocándome en React Native, Expo y arquitecturas móviles modernas.',
    skills: ['REACT NATIVE', 'EXPO', 'TYPESCRIPT', 'SWIFT', 'KOTLIN'],
    projects: [
      {
        name: 'Proyecto Ejemplo',
        achievements: [
          'Implementé características móviles para iOS y Android',
          'Optimicé el rendimiento y la experiencia de usuario',
        ],
      },
    ],
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
