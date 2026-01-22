import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .min(1, 'Email is required')
    .max(254, 'Email must be less than 254 characters')
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Please enter a valid email address',
    }),
  
  company: z.string()
    .min(2, 'Company must be at least 2 characters')
    .max(30, 'Company must be less than 30 characters'),
  
  language: z.enum(['es', 'en']),
  
  // Honeypot field - should remain empty
  website: z.string().max(0, 'Invalid submission').optional(),
  
  // Cloudflare Turnstile token (optional - only required if Turnstile is configured)
  turnstileToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSubscribeSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .max(254, 'Email must be less than 254 characters')
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Please enter a valid email address',
    }),
  language: z.enum(['es', 'en']),
});

export type NewsletterSubscribeData = z.infer<typeof newsletterSubscribeSchema>;
