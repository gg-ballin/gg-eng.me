export interface Translations {
  // SEO
  seo: {
    title: string;
    description: string;
  };
  
  // Navigation
  nav: {
    bio: string;
    experience: string;
    blog: string;
    contact: string;
    theme: string;
    recruiterHint: {
      message: string;
      linkText: string;
    };
  };
  
  // Bio page
  bio: {
    name: string;
    role: string;
    location: string;
    description: string;
    techExplanation: {
      intro: string;
      categories: {
        frontend: string;
        deployment: string;
        versionControl: string;
        packageManager: string;
        ide: string;
      };
      technologies: {
        astro: string;
        framerMotion: string;
        typescript: string;
        tailwind: string;
        zod: string;
        cloudflare: string;
        cloudflareKV: string;
        github: string;
        npm: string;
        cursor: string;
      };
      whyWebpage: string;
      mobileVsWeb: string;
    };
  };
  
  // Year Progress
  yearProgress: {
    day: string;
    left: string;
  };
  
  // Blog
  blog: {
    title: string;
    description: string;
    heading: string;
  };
  
  // Experience
  experience: {
    title: string;
    description: string;
    heading: string;
    hardSkills: string;
    softSkills: string;
    languages: string;
    downloadCv: string;
  };
  
  // Contact
  contact: {
    title: string;
    description: string;
    heading: string;
    requestCvTitle: string;
    requestCvDescription: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
  };
  
  // Footer
  footer: {
    copyright: string;
    viewSource: string;
  };
  
  // Newsletter
  newsletter: {
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
  };
  
  // Desktop Popup
  desktopPopup: {
    message: string;
  };
  
  // Language Switcher Hint
  languageHint: {
    message: string;
  };
}