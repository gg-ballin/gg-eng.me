import type { Translations } from "./interfaces";

export type Language = 'es' | 'en';

export const translations: Record<Language, Translations> = {
  es: {
    seo: {
      title: 'Germán Gómez - Senior Mobile Engineer',
      description: 'Portfolio de Germán Gómez, Senior Mobile Engineer en Buenos Aires, Argentina.',
    },
    nav: {
      bio: 'Bio',
      blog: 'Blog',
      contact: 'Contacto',
      theme: 'Tema',
    },
    bio: {
      name: 'Hola hola! Soy Germán Gómez',
      role: 'Senior Mobile Engineer',
      location: 'Buenos Aires, Argentina',
      description: 'Más de 8 años desarrollando aplicaciones móviles híbridas con React Native, viví la evolución completa del ecosistema: desde los inicios de `expo` (cuándo era difícil renderizar un mapa!) y de `react-native-cli` con Javascript (y sus obsoletos `PropTypes`) hasta los estándares de performance de la era de la Nueva Arquitectura, Fabric. Expo, Typescript, Swift y Kotlin, sintaxis obligatoria que un ingeniero móvil debe dominar para crear aplicaciones, performantes, mantenibles y escalables.',
    },
    yearProgress: {
      day: 'Día',
      left: 'restantes',
    },
    blog: {
      title: 'Blog - Germán Gómez',
      description: 'Reflexiones sobre desarrollo.',
      heading: 'Blog',
    },
    contact: {
      title: 'Contacto - Germán Gómez',
      description: 'Ponte en contacto conmigo.',
      heading: 'Contacto',
      requestCvTitle: 'Solicitar CV',
      requestCvDescription: 'Completa el formulario y vas a recibir mi CV directamente en tu email.',
      form: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre completo',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        company: 'Empresa',
        companyPlaceholder: 'Tu empresa o institución',
        submit: 'Solicitar CV en Español',
        submitting: 'Enviando...',
        success: '✓ CV enviado a tu email',
        error: 'Error al enviar. Intenta de nuevo.',
      },
    },
    footer: {
      copyright: '© 2025 Germán Gómez. Todos los derechos reservados.',
    },
  },
  en: {
    seo: {
      title: 'Germán Gómez - Senior Mobile Engineer',
      description: 'Portfolio of Germán Gómez, Senior Mobile Engineer based in Buenos Aires, Argentina.',
    },
    nav: {
      bio: 'Bio',
      blog: 'Blog',
      contact: 'Contact',
      theme: 'Theme',
    },
    bio: {
      name: 'Hello there! I\'m Germán Gómez',
      role: 'Senior Mobile Engineer',
      location: 'based in Buenos Aires, Argentina',
      description: '8+ years developing hybrid mobile applications with React Native. I\'ve lived through the ecosystem\'s full evolution: from the early days of `expo` (when rendering a map was a nightmare!) and `react-native-cli` with JavaScript (and its now-obsolete `PropTypes`) to the high-performance standards of the New Architecture era, Fabric.\n\nExpo, TypeScript, Swift, and Kotlin are now the essential stack a mobile engineer must master to build high-performance, maintainable, and scalable applications.',
    },
    yearProgress: {
      day: 'Day',
      left: 'left',
    },
    blog: {
      title: 'Blog - Germán Gómez',
      description: 'Reflections on development.',
      heading: 'Blog',
    },
    contact: {
      title: 'Contact - Germán Gómez',
      description: 'Get in touch with me.',
      heading: 'Contact',
      requestCvTitle: 'Request Resume',
      requestCvDescription: 'Fill out the form and receive my CV directly to your email.',
      form: {
        name: 'Name',
        namePlaceholder: 'Your full name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        company: 'Company',
        companyPlaceholder: 'Your company or institution',
        submit: 'Request resume in english',
        submitting: 'Sending...',
        success: '✓ CV sent to your email',
        error: 'Error sending. Please try again.',
      },
    },
    footer: {
      copyright: '© 2025 Germán Gómez. All rights reserved.',
    },
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
