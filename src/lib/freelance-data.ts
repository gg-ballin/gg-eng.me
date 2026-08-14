import type { ExperienceTechIconConfig } from './experience/technologies';
import { getSkillIconConfig } from './experience-data';

export type Platform = 'web' | 'ios' | 'android';

export interface DetailLink {
  label: string;
  href: string;
}

export interface DetailBlock {
  name: string;
  achievements: string[];
  links?: DetailLink[];
}

export interface FreelanceEntry {
  slug: string;
  dateRange: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
  platforms: Platform[];
  details?: DetailBlock[];
  highlight?: boolean;
}

export function getFreelanceSkillIconConfigs(
  skillNames: string[]
): (ExperienceTechIconConfig | null)[] {
  return skillNames.map((skill) => getSkillIconConfig(skill));
}

export const freelanceEntriesEN: FreelanceEntry[] = [
  {
    slug: 'texlab',
    dateRange: '2025 — PRESENT',
    role: 'Full Stack Engineer',
    company: 'Tex Lab',
    platforms: ['web'],
    description:
      'B2B corporate apparel landing for a small Argentine business. Lead capture, catalog downloads, and campaign-ready CTAs for WhatsApp and email marketing.',
    skills: ['TypeScript', 'Tailwind', 'Cursor'],
    highlight: true,
    details: [
      {
        name: 'texlab.com.ar',
        achievements: [
          'Mock: Astro + Cloudflare Workers deployment with branch preview URLs.',
          'Mock: Contact and lead forms wired to Resend for campaign follow-ups.',
          'Mock: Mobile-first layout optimized for WhatsApp campaign traffic.',
        ],
        links: [{ label: 'texlab.com.ar', href: 'https://texlab.com.ar' }],
      },
    ],
  },
  {
    slug: 'power-tools',
    dateRange: '2024 — 2025',
    role: 'Mobile Engineer',
    company: 'Power Tools',
    platforms: ['ios', 'android'],
    description:
      'Mock: Cross-platform mobile app for field technicians. Feature delivery, store releases, and CI pipeline maintenance on iOS and Android.',
    skills: ['REACT NATIVE', 'EXPO', 'TYPESCRIPT', 'Expo EAS', 'Jest', 'Sentry'],
    details: [
      {
        name: 'Mobile delivery',
        achievements: [
          'Mock: Shipped features across both platforms from a shared React Native codebase.',
          'Mock: Managed EAS builds and store submission workflows.',
          'Mock: Integrated crash reporting and release monitoring with Sentry.',
        ],
      },
    ],
  },
  {
    slug: 'ccp',
    dateRange: '2023 — 2024',
    role: 'Android Engineer',
    company: 'CCP',
    platforms: ['android'],
    description:
      'Mock: Android-only engagement — maintenance, feature work, and Play Store releases for an existing production app.',
    skills: ['KOTLIN', 'REACT NATIVE', 'Jest'],
    details: [
      {
        name: 'Android scope',
        achievements: [
          'Mock: Delivered scoped feature work without expanding to iOS.',
          'Mock: Fixed production issues and prepared Play Store release builds.',
          'Mock: Collaborated async with stakeholders on sprint-based milestones.',
        ],
      },
    ],
  },
];

export const freelanceEntriesES: FreelanceEntry[] = [
  {
    slug: 'texlab',
    dateRange: '2025 — ACTUALIDAD',
    role: 'Full Stack Engineer',
    company: 'Tex Lab',
    platforms: ['web'],
    description:
      'Landing B2B de indumentaria corporativa para una pyme argentina. Captación de leads, descarga de catálogo y CTAs listos para campañas de WhatsApp y email.',
    skills: ['TypeScript', 'Tailwind', 'Cursor'],
    highlight: true,
    details: [
      {
        name: 'texlab.com.ar',
        achievements: [
          'Mock: Deploy en Astro + Cloudflare Workers con preview por branch.',
          'Mock: Formularios de contacto y leads conectados a Resend para seguimiento de campañas.',
          'Mock: Layout mobile-first optimizado para tráfico desde campañas de WhatsApp.',
        ],
        links: [{ label: 'texlab.com.ar', href: 'https://texlab.com.ar' }],
      },
    ],
  },
  {
    slug: 'power-tools',
    dateRange: '2024 — 2025',
    role: 'Mobile Engineer',
    company: 'Power Tools',
    platforms: ['ios', 'android'],
    description:
      'Mock: App móvil cross-platform para técnicos de campo. Entrega de features, releases en stores y mantenimiento de pipeline CI en iOS y Android.',
    skills: ['REACT NATIVE', 'EXPO', 'TYPESCRIPT', 'Expo EAS', 'Jest', 'Sentry'],
    details: [
      {
        name: 'Entrega móvil',
        achievements: [
          'Mock: Features entregadas en ambas plataformas desde un codebase React Native compartido.',
          'Mock: Gestión de builds EAS y flujos de publicación en stores.',
          'Mock: Integración de crash reporting y monitoreo de releases con Sentry.',
        ],
      },
    ],
  },
  {
    slug: 'ccp',
    dateRange: '2023 — 2024',
    role: 'Android Engineer',
    company: 'CCP',
    platforms: ['android'],
    description:
      'Mock: Trabajo solo Android — mantenimiento, features y releases en Play Store para una app en producción.',
    skills: ['KOTLIN', 'REACT NATIVE', 'Jest'],
    details: [
      {
        name: 'Alcance Android',
        achievements: [
          'Mock: Features acotadas sin expandir scope a iOS.',
          'Mock: Corrección de issues en producción y builds para Play Store.',
          'Mock: Colaboración async con stakeholders en milestones por sprint.',
        ],
      },
    ],
  },
];

export function getFreelanceEntries(lang: 'es' | 'en'): FreelanceEntry[] {
  return lang === 'es' ? freelanceEntriesES : freelanceEntriesEN;
}

export function getFreelanceEntryBySlug(
  lang: 'es' | 'en',
  slug: string
): FreelanceEntry | undefined {
  return getFreelanceEntries(lang).find((entry) => entry.slug === slug);
}
