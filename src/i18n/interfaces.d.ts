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
}