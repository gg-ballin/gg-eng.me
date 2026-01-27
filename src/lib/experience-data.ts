// Experience data structure and types

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
  hardSkills: string[];
  softSkills: string[];
  languages: { name: string; level: string }[];
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
  hardSkills: [
    'React Native',
    'Expo',
    'TypeScript',
    'JavaScript',
    'Swift',
    'Kotlin',
    'React',
    'Node.js',
  ],
  softSkills: [
    'Team Leadership',
    'Problem Solving',
    'Communication',
    'Agile Methodologies',
    'Code Review',
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Fluent' },
  ],
};

// Skills data - Spanish
export const skillsDataES: SkillsData = {
  hardSkills: [
    'React Native',
    'Expo',
    'TypeScript',
    'JavaScript',
    'Swift',
    'Kotlin',
    'React',
    'Node.js',
  ],
  softSkills: [
    'Liderazgo de Equipo',
    'Resolución de Problemas',
    'Comunicación',
    'Metodologías Ágiles',
    'Revisión de Código',
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Fluido' },
  ],
};

export function getExperienceEntries(lang: 'es' | 'en'): ExperienceEntry[] {
  return lang === 'es' ? experienceEntriesES : experienceEntriesEN;
}

export function getSkillsData(lang: 'es' | 'en'): SkillsData {
  return lang === 'es' ? skillsDataES : skillsDataEN;
}
