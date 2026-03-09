import type { Translations } from "./interfaces";

export type Language = 'es' | 'en';

export const translations: Record<Language, Translations> = {
  es: {
    seo: {
      title: 'Germán Gómez - Senior Mobile Engineer',
      description: 'Portfolio de Germán Gómez, Senior Mobile Engineer en Buenos Aires, Argentina.',
    },
    nav: {
      bio: 'bio',
      experience: 'experiencia',
      blog: 'blog',
      contact: 'contacto',
      theme: 'Theme',
      recruiterHint: {
        message: '👋 Tech Recruiters: Para solicitar mi CV, ir a',
        linkText: 'contacto',
        mobileMessage: '👋 Tech Recruiters:',
        mobileLinkText: 'Solicitar mi CV aquí',
      },
    },
    bio: {
      name: 'hola hola! soy Germán Gómez',
      role: 'Senior Mobile Engineer',
      location: 'Buenos Aires, Argentina',
      description: 'Más de 8 años desarrollando aplicaciones móviles híbridas con React Native, viví la evolución completa del ecosistema: desde los inicios de `expo` (cuándo era difícil renderizar un mapa!) y de `react-native-cli` con Javascript (y sus obsoletos `PropTypes`) hasta los estándares de performance de la era de la Nueva Arquitectura, Fabric. Expo, Typescript, Swift y Kotlin, sintaxis obligatoria que un ingeniero móvil debe dominar para crear aplicaciones, performantes, mantenibles y escalables.',
      techExplanation: {
        intro: 'Este sitio web está construido con:',
        categories: {
          frontend: 'Frontend Technologies',
          deployment: 'Deployment Strategy',
          versionControl: 'Version Control',
          packageManager: 'Package Manager',
          ide: 'IDE',
        },
        technologies: {
          astro: 'Astro',
          framerMotion: 'Motion by Framer',
          typescript: 'TypeScript',
          tailwind: 'Tailwind CSS',
          zod: 'Zod',
          cloudflare: 'Cloudflare',
          cloudflareKV: 'Cloudflare KV',
          github: 'GitHub',
          npm: 'npm',
          cursor: 'Cursor',
        },
        whyWebpage: '¿Por qué un ingeniero móvil necesita un sitio web en 2026? Actualmente, tener un Curriculum muy interesante, no es suficiente. tener una presencia web profesional demuestra versatilidad técnica y capacidad para entender diferentes plataformas y arquitecturas.',
        mobileVsWeb: 'Este sitio web es único tanto en móvil como en web: en móvil, aprovecha las capacidades nativas del dispositivo para una experiencia inmersiva, mientras que en web, utiliza animaciones y transiciones fluidas que solo son posibles en navegadores modernos.',
      },
    },
    yearProgress: {
      day: 'Día',
      left: 'restantes',
    },
    blog: {
      title: 'Blog - Germán Gómez',
      description: 'Reflexiones sobre desarrollo.',
      heading: 'blog',
    },
    experience: {
      title: 'Experiencia - Germán Gómez',
      description: 'Mi experiencia profesional y habilidades.',
      heading: 'experiencia',
      hardSkills: 'Habilidades Técnicas',
      softSkills: 'Habilidades Blandas',
      languages: 'Idiomas',
      downloadCv: 'Descargar CV',
    },
    contact: {
      title: 'Contacto - Germán Gómez',
      description: 'Ponte en contacto conmigo.',
      heading: 'contacto',
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
      copyright: 'Germán Gómez. Todos los derechos reservados.',
      viewSource: 'Ver código fuente de este sitio web',
    },
    newsletter: {
      title: 'Newsletter',
      description: 'Suscríbete para recibir actualizaciones sobre nuevos posts y noticias.',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      submit: 'Suscribirse',
      submitting: 'Suscribiendo...',
      success: '✓ Se ha enviado un correo de confirmación. Por favor revisa tu bandeja de entrada.',
      error: 'Error al suscribirse. Intenta de nuevo.',
    },
    desktopPopup: {
      message: 'Noté que estás viendo este website desde tu computadora/laptop. ¡Escanea el QR para ver este sitio web en móvil! 😉',
      scanMe: 'Escaneame',
    },
    languageHint: {
      message: 'Elegí el idioma en el que querés recibir el CV! 🤠',
    },
  },
  en: {
    seo: {
      title: 'Germán Gómez - Senior Mobile Engineer',
      description: 'Portfolio of Germán Gómez, Senior Mobile Engineer based in Buenos Aires, Argentina.',
    },
    nav: {
      bio: 'bio',
      experience: 'experience',
      blog: 'blog',
      contact: 'contact',
      theme: 'Theme',
      recruiterHint: {
        message: '👋 Tech Recruiters: To request my CV, go to',
        linkText: 'contact',
        mobileMessage: '👋 Tech Recruiters:',
        mobileLinkText: 'Request my CV here',
      },
    },
    bio: {
      name: 'hello there! i\'m Germán Gómez',
      role: 'Senior Mobile Engineer',
      location: 'based in Buenos Aires, Argentina',
      description: '8+ years developing hybrid mobile applications with React Native. I\'ve lived through the ecosystem\'s full evolution: from the early days of `expo` (when rendering a map was a nightmare!) and `react-native-cli` with JavaScript (and its now-obsolete `PropTypes`) to the high-performance standards of the New Architecture era, Fabric.\n\nExpo, TypeScript, Swift, and Kotlin are now the essential stack a mobile engineer must master to build high-performance, maintainable, and scalable applications.',
      techExplanation: {
        intro: 'This website is built with:',
        categories: {
          frontend: 'Frontend Technologies',
          deployment: 'Deployment Strategy',
          versionControl: 'Version Control',
          packageManager: 'Package Manager',
          ide: 'IDE',
        },
        technologies: {
          astro: 'Astro',
          framerMotion: 'Motion by Framer',
          typescript: 'TypeScript',
          tailwind: 'Tailwind CSS',
          zod: 'Zod',
          cloudflare: 'Cloudflare',
          cloudflareKV: 'Cloudflare KV',
          github: 'GitHub',
          npm: 'npm',
          cursor: 'Cursor',
        },
        whyWebpage: 'Why does a mobile engineer need a webpage in 2026? In a world where mobile development is increasingly specialized, having a professional web presence demonstrates technical versatility and the ability to understand different platforms and architectures.',
        mobileVsWeb: 'This website is unique on both mobile and web: on mobile, it leverages native device capabilities for an immersive experience, while on web, it uses fluid animations and transitions that are only possible in modern browsers.',
      },
    },
    yearProgress: {
      day: 'Day',
      left: 'left',
    },
    blog: {
      title: 'Blog - Germán Gómez',
      description: 'Reflections on development.',
      heading: 'blog',
    },
    experience: {
      title: 'Experience - Germán Gómez',
      description: 'My professional experience and skills.',
      heading: 'experience',
      hardSkills: 'Hard Skills',
      softSkills: 'Soft Skills',
      languages: 'Languages',
      downloadCv: 'Download CV',
    },
    contact: {
      title: 'Contact - Germán Gómez',
      description: 'Get in touch with me.',
      heading: 'contact',
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
      copyright: 'Germán Gómez. All rights reserved.',
      viewSource: 'View source code of this website',
    },
    newsletter: {
      title: 'Newsletter',
      description: 'Subscribe to receive updates about new posts and news.',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      submit: 'Subscribe',
      submitting: 'Subscribing...',
      success: '✓ A confirmation email has been sent. Please check your inbox.',
      error: 'Error subscribing. Please try again.',
    },
    desktopPopup: {
      message: 'Hey! Noticed that you are seeing this website from your computer/laptop. Scan the QR to see this website in mobile! 😉',
      scanMe: 'Scan Me',
    },
    languageHint: {
      message: 'Choose the language you want to receive the CV in! 🤠',
    },
  },
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
