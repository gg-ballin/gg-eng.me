export interface Translations {
  // SEO
  seo: {
    title: string;
    description: string;
  };
  
  // Navigation
  nav: {
    bio: string;
    home: string;
    experience: string;
    blog: string;
    contact: string;
    theme: string;
    recruiterHint: {
      audiences: string[];
      messageAfter: string;
      linkText: string;
      mobileMessageAfter: string;
      mobileLinkText: string;
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
        bun: string;
        cursor: string;
      };
      whyWebpage: string;
      mobileVsWeb: string;
    };
    freelanceCta: string;
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
    detail: string;
    freelanceBadge: string;
    backToExperience: string;
    viewDetail: string;
  };

  // Freelance
  freelance: {
    title: string;
    description: string;
    heading: string;
    intro: string;
    portfolioNote: string;
    detail: string;
    viewDetail: string;
    backToFreelance: string;
    backToBio: string;
    bannerLabel: string;
    bannerText: string;
    bioCta: string;
    platforms: {
      web: string;
      ios: string;
      android: string;
    };
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
    scanMe: string;
    minimize: string;
    open: string;
  };
  
  // Language Switcher Hint
  languageHint: {
    message: string;
  };
}