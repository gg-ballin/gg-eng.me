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
      description: 'Ingeniero especializado en desarrollo móvil con pasión por crear experiencias de usuario excepcionales. Enfocado en arquitecturas escalables y código limpio que impulsan productos innovadores.',
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
      description: 'Engineer specialized in mobile development with a passion for creating exceptional user experiences. Focused on scalable architectures and clean code that drive innovative products.',
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
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
