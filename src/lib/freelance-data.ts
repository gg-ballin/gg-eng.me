import type { ExperienceTechIconConfig } from './experience/technologies';
import { getSkillIconConfig } from './experience-data';

export type Platform = 'web' | 'ios' | 'android';

/** Billing / delivery model for the engagement */
export type EngagementModel = 'project' | 'hourly';

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
  /** How the work was contracted: fixed project delivery vs hourly */
  engagement: EngagementModel;
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
    slug: 'iac-zona-norte',
    dateRange: '2026 — MAINTENANCE',
    role: 'Full Stack Engineer',
    company: 'IAC Zona Norte',
    platforms: ['web'],
    engagement: 'project',
    description:
      'Greenfield rebuild of the Instituto Argentino de Computación (Olivos) institutional site: Astro SSG + Directus/Postgres headless CMS, replacing WordPress. Course catalog, cohort lifecycle, B2B lead capture, and Cloudflare Pages + Hostinger VPS deploy.',
    skills: ['Astro', 'Directus', 'PostgreSQL', 'Cloudflare', 'Tailwind', 'Bun', 'TypeScript'],
    highlight: true,
    details: [
      {
        name: 'Institutional site',
        achievements: [
          'Greenfield Astro 5 SSG front for home, filterable course catalog, course detail, Olivos campus, and Empresas B2B.',
          'Conversion flows: contextual WhatsApp enrollment, multi-line WA rotator, waitlist, and B2B lead forms with reCAPTCHA.',
          'SEO cutover from WordPress: 301 redirects, JSON-LD LocalBusiness, sitemap, robots.txt, and llms.txt.',
        ],
        links: [{ label: 'iaczonanorte.com.ar', href: 'https://www.iaczonanorte.com.ar' }],
      },
      {
        name: 'CMS & infrastructure',
        achievements: [
          'Directus 11 + PostgreSQL 16 domain model: courses, syllabi, pathways, cohorts/cupos, waitlist, payments, B2B clients, site settings.',
          'Custom Directus extensions for cohort expiry/capacity, content approval, Operaciones/Marketing RBAC, and Cloudflare Pages rebuild hooks.',
          'Bun monorepo with Docker bootstrap/seed, GitHub Actions migrate on main, Pages deploy + Hostinger VPS for the CMS.',
        ],
        links: [
          {
            label: 'gestion-iac.iaczonanorte.com.ar',
            href: 'https://www.gestion-iac.iaczonanorte.com.ar',
          },
        ],
      },
    ],
  },
  {
    slug: 'texlab',
    dateRange: '2025 — MAINTENANCE',
    role: 'Full Stack Engineer',
    company: 'texlab',
    platforms: ['web'],
    engagement: 'project',
    description:
      'B2B corporate apparel landing for a small Argentine business. Lead capture, catalog downloads, and campaign-ready CTAs for WhatsApp and email marketing.',
    skills: ['Astro', 'Cloudflare', 'Resend', 'Tailwind', 'Cursor', 'Bun'],
    highlight: true,
    details: [
      {
        name: 'texlab.com.ar',
        achievements: [
          'Astro + Cloudflare Workers deployment with branch preview URLs.',
          'Contact and lead forms wired to Resend for campaign follow-ups.',
          'Mobile-first layout optimized for WhatsApp campaign traffic.',
        ],
        links: [{ label: 'texlab.com.ar', href: 'https://texlab.com.ar' }],
      },
    ],
  },
  {
    slug: 'ccp',
    dateRange: '2023 — 2024',
    role: 'React Native Engineer',
    company: 'CCP Foods',
    platforms: ['android'],
    engagement: 'project',
    description:
      'Android POC for CCP Foods (Compañía Central Pampeana) built with React Native CLI. Shipped APK builds for internal validation — no store launch required.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'Android Studio'],
    details: [
      {
        name: 'Android POC',
        achievements: [
          'Built an Android proof-of-concept with React Native CLI for CCP Foods.',
          'Distributed APK builds for stakeholder testing without Play Store releases.',
          'Scoped delivery to Android only to keep iteration fast on internal feedback loops.',
        ],
      },
    ],
  },
  {
    slug: 'power-app',
    dateRange: 'JUL 2021 — DEC 2021',
    role: 'React Native Engineer',
    company: 'Power App',
    platforms: ['ios', 'android'],
    engagement: 'hourly',
    description:
      'Consumer mobile app for residential battery / solar energy storage. Live power-flow monitoring, historical stats, event timeline, and operating-mode configuration — shipped as a white-label React Native CLI product across multiple OEM store targets.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'Firebase', 'Xcode', 'Android Studio'],
    details: [
      {
        name: 'Homeowner energy monitoring',
        achievements: [
          'Built Power Flow, Stats, Timeline, and Configuration screens against REST energy backends (live kW / SoC, charts, system events).',
          'Implemented operating modes: Backup, Self Supply, Time-of-Use, and Custom schedules with battery reserve controls.',
          'Added support/admin flows, password reset, and Wi-Fi credential capture for system provisioning; Firebase Cloud Messaging for push.',
        ],
      },
      {
        name: 'White-label delivery',
        achievements: [
          'Maintained multi-target iOS AppIcon / Info.plist variants and Android product flavors from a shared RN codebase, switching brand assets and theme colors by bundle ID at runtime.',
          'Shipped parallel store builds for the primary brand plus OEM white-label flavors without forking app logic.',
        ],
      },
    ],
  },
  {
    slug: 'power-tools',
    dateRange: 'JUL 2021 — DEC 2021',
    role: 'React Native Engineer',
    company: 'Power Tools',
    platforms: ['ios', 'android'],
    engagement: 'hourly',
    description:
      'Installer / dealer commissioning app for the same residential energy platform. End-to-end field workflow from enclosure barcode scan through system verification, photo documentation, homeowner invite, and PTO activation — white-labeled for OEM partners.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'Firebase', 'Xcode', 'Android Studio'],
    details: [
      {
        name: 'Installer commissioning flow',
        achievements: [
          'Delivered the v2 commissioning pipeline: scan enclosure → address → backup/size → instructions → system test → mode/config → summary → complete.',
          'Integrated barcode camera capture, Google Places address entry, install photo upload, customer invite, and PTO standby/activate commands.',
          'Supported multi-environment backends (dev / UAT / prod) and pending vs active system lists for field crews.',
        ],
      },
      {
        name: 'White-label delivery',
        achievements: [
          'Maintained four native iOS targets and matching Android flavors with per-brand AppIcons and asset packs from one React Native CLI codebase.',
          'Runtime brand resolution via bundle ID for logos, splash, and theme colors across OEM installer apps.',
        ],
      },
    ],
  },
];

export const freelanceEntriesES: FreelanceEntry[] = [
  {
    slug: 'iac-zona-norte',
    dateRange: '2026 — MANTENIMIENTO',
    role: 'Full Stack Engineer',
    company: 'IAC Zona Norte',
    platforms: ['web'],
    engagement: 'project',
    description:
      'Reconstrucción greenfield del sitio institucional del Instituto Argentino de Computación (Olivos): Astro SSG + CMS headless Directus/Postgres, reemplazando WordPress. Catálogo de cursos, ciclo de vida de cohortes, captación B2B y deploy en Cloudflare Pages + VPS Hostinger.',
    skills: ['Astro', 'Directus', 'PostgreSQL', 'Cloudflare', 'Tailwind', 'Bun', 'TypeScript'],
    highlight: true,
    details: [
      {
        name: 'Sitio institucional',
        achievements: [
          'Front Astro 5 SSG greenfield: home, catálogo filtrable, detalle de curso, sede Olivos y Empresas B2B.',
          'Flujos de conversión: inscripción contextual por WhatsApp, rotador multi-línea, waitlist y formularios B2B con reCAPTCHA.',
          'Cutover SEO desde WordPress: redirects 301, JSON-LD LocalBusiness, sitemap, robots.txt y llms.txt.',
        ],
        links: [{ label: 'iaczonanorte.com.ar', href: 'https://www.iaczonanorte.com.ar' }],
      },
      {
        name: 'CMS e infraestructura',
        achievements: [
          'Modelo Directus 11 + PostgreSQL 16: cursos, syllabus, pathways, cohortes/cupos, waitlist, pagos, clientes B2B y settings.',
          'Extensiones Directus para vencimiento/cupos de cohortes, aprobación de contenido, RBAC Operaciones/Marketing y rebuild de Pages.',
          'Monorepo Bun con bootstrap/seed Docker, migrate en GitHub Actions sobre main, deploy Pages + VPS Hostinger para el CMS.',
        ],
        links: [
          {
            label: 'gestion-iac.iaczonanorte.com.ar',
            href: 'https://www.gestion-iac.iaczonanorte.com.ar',
          },
        ],
      },
    ],
  },
  {
    slug: 'texlab',
    dateRange: '2025 — MANTENIMIENTO',
    role: 'Full Stack Engineer',
    company: 'texlab',
    platforms: ['web'],
    engagement: 'project',
    description:
      'Landing B2B de indumentaria corporativa para una pyme argentina. Captación de leads, descarga de catálogo y CTAs listos para campañas de WhatsApp y email.',
    skills: ['Astro', 'Cloudflare', 'Resend', 'Tailwind', 'Cursor', 'Bun'],
    highlight: true,
    details: [
      {
        name: 'texlab.com.ar',
        achievements: [
          'Deploy en Astro + Cloudflare Workers con preview por branch.',
          'Formularios de contacto y leads conectados a Resend para seguimiento de campañas.',
          'Layout mobile-first optimizado para tráfico desde campañas de WhatsApp.',
        ],
        links: [{ label: 'texlab.com.ar', href: 'https://texlab.com.ar' }],
      },
    ],
  },
  {
    slug: 'ccp',
    dateRange: '2023 — 2024',
    role: 'React Native Engineer',
    company: 'CCP Foods',
    platforms: ['android'],
    engagement: 'project',
    description:
      'POC Android para CCP Foods (Compañía Central Pampeana) con React Native CLI. Entrega de APKs para validación interna — sin publicación en stores.',
    skills: ['REACT NATIVE', 'TYPESCRIPT', 'Android Studio'],
    details: [
      {
        name: 'POC Android',
        achievements: [
          'Desarrollé un proof-of-concept Android con React Native CLI para CCP Foods.',
          'Distribuí builds APK para pruebas de stakeholders sin releases en Play Store.',
          'Alcance solo Android para iterar rápido sobre feedback interno.',
        ],
      },
    ],
  },
  {
    slug: 'power-app',
    dateRange: 'JUL 2021 — DIC 2021',
    role: 'React Native Engineer',
    company: 'Power App',
    platforms: ['ios', 'android'],
    engagement: 'hourly',
    description:
      'App móvil consumer para almacenamiento residencial de batería / energía solar. Monitoreo live de power-flow, stats históricas, timeline de eventos y configuración de modos de operación — producto white-label en React Native CLI con múltiples targets OEM en stores.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'Firebase', 'Xcode', 'Android Studio'],
    details: [
      {
        name: 'Monitoreo energético para homeowners',
        achievements: [
          'Screens Power Flow, Stats, Timeline y Configuration contra backends REST de energía (kW / SoC en vivo, charts, eventos de sistema).',
          'Modos de operación: Backup, Self Supply, Time-of-Use y Custom schedules con reserve de batería.',
          'Flujos de support/admin, reset de password y captura de credenciales Wi-Fi para provisioning; push con Firebase Cloud Messaging.',
        ],
      },
      {
        name: 'Entrega white-label',
        achievements: [
          'Targets iOS multi-AppIcon / Info.plist y product flavors Android desde un codebase RN compartido, resolviendo assets y theme colors por bundle ID en runtime.',
          'Builds paralelos en stores para la marca principal y flavors OEM white-label sin forkear la lógica de la app.',
        ],
      },
    ],
  },
  {
    slug: 'power-tools',
    dateRange: 'JUL 2021 — DIC 2021',
    role: 'React Native Engineer',
    company: 'Power Tools',
    platforms: ['ios', 'android'],
    engagement: 'hourly',
    description:
      'App de commissioning para instaladores / dealers de la misma plataforma de energía residencial. Workflow de campo end-to-end: scan de enclosure, verificación de sistema, fotos de instalación, invite al homeowner y activación PTO — white-labeled para partners OEM.',
    skills: ['REACT NATIVE', 'JAVASCRIPT', 'Firebase', 'Xcode', 'Android Studio'],
    details: [
      {
        name: 'Flujo de commissioning',
        achievements: [
          'Pipeline v2 de commissioning: scan enclosure → address → backup/size → instructions → system test → mode/config → summary → complete.',
          'Integración de cámara para barcodes, Google Places para address, upload de fotos de instalación, invite de customer y comandos PTO standby/activate.',
          'Backends multi-environment (dev / UAT / prod) y listas pending vs active para crews de campo.',
        ],
      },
      {
        name: 'Entrega white-label',
        achievements: [
          'Cuatro targets nativos iOS y flavors Android espejo con AppIcons y asset packs por marca, desde un único codebase React Native CLI.',
          'Resolución de brand en runtime vía bundle ID para logos, splash y theme colors en las apps OEM de instaladores.',
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
