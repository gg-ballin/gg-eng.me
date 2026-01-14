export type Language = 'es' | 'en';

export interface Translations {
  // SEO
  seo: {
    title: string;
    description: string;
  };
  
  // Navigation
  nav: {
    bio: string;
    blog: string;
    contact: string;
    theme: string;
  };
  
  // Bio page
  bio: {
    name: string;
    role: string;
    location: string;
    description: string;
  };
  
  // Blog
  blog: {
    title: string;
    description: string;
    heading: string;
  };
  
  // Contact
  contact: {
    title: string;
    description: string;
    heading: string;
    cvTitle: string;
    cvToggle: string;
    cvHide: string;
    contactInfo: string;
    email: string;
    location: string;
    locationValue: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    seo: {
      title: 'Germán Gomez - Senior Mobile Engineer',
      description: 'Portfolio de Germán Gomez, Senior Mobile Engineer en Buenos Aires, Argentina.',
    },
    nav: {
      bio: 'Bio',
      blog: 'Blog',
      contact: 'Contacto',
      theme: 'Tema',
    },
    bio: {
      name: 'Germán Gomez',
      role: 'Senior Mobile Engineer',
      location: 'Buenos Aires, Argentina',
      description: 'Ingeniero especializado en desarrollo móvil con pasión por crear experiencias de usuario excepcionales. Enfocado en arquitecturas escalables y código limpio que impulsan productos innovadores.',
    },
    blog: {
      title: 'Blog - Germán Gomez',
      description: 'Reflexiones sobre desarrollo.',
      heading: 'Blog',
    },
    contact: {
      title: 'Contacto - Germán Gomez',
      description: 'Ponte en contacto conmigo.',
      heading: 'Contacto',
      cvTitle: 'Curriculum Vitae',
      cvToggle: 'Ver CV',
      cvHide: 'Ocultar CV',
      contactInfo: 'Información de Contacto',
      email: 'Email',
      location: 'Ubicación',
      locationValue: 'Buenos Aires, Argentina',
    },
  },
  en: {
    seo: {
      title: 'Germán Gomez - Senior Mobile Engineer',
      description: 'Portfolio of Germán Gomez, Senior Mobile Engineer based in Buenos Aires, Argentina.',
    },
    nav: {
      bio: 'Bio',
      blog: 'Blog',
      contact: 'Contact',
      theme: 'Theme',
    },
    bio: {
      name: 'Germán Gomez',
      role: 'Senior Mobile Engineer',
      location: 'Buenos Aires, Argentina',
      description: 'Engineer specialized in mobile development with a passion for creating exceptional user experiences. Focused on scalable architectures and clean code that drive innovative products.',
    },
    blog: {
      title: 'Blog - Germán Gomez',
      description: 'Reflections on development.',
      heading: 'Blog',
    },
    contact: {
      title: 'Contact - Germán Gomez',
      description: 'Get in touch with me.',
      heading: 'Contact',
      cvTitle: 'Resume',
      cvToggle: 'View Resume',
      cvHide: 'Hide Resume',
      contactInfo: 'Contact Information',
      email: 'Email',
      location: 'Location',
      locationValue: 'Buenos Aires, Argentina',
    },
  },
};

// Helper function to get translations
export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
