import type { APIRoute } from 'astro';
import { newsletterSubscribeSchema } from '@/lib/validation';
import { NewsletterService } from '@/lib/newsletterService';
import { EmailService } from '@/lib/emailService';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  // Feature flag: Controlled via environment variable
  const NEWSLETTER_ENABLED = (locals.env?.NEWSLETTER_ENABLED as string | undefined) 
    || import.meta.env.NEWSLETTER_ENABLED === 'true';
  
  // Check feature flag
  if (!NEWSLETTER_ENABLED) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Newsletter feature is currently disabled',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const body = await request.json();
    
    // Validate with Zod
    const validationResult = newsletterSubscribeSchema.safeParse(body);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    const { email, language } = validationResult.data;
    
    // Get KV namespace
    const kv = locals.env?.NEWSLETTER_KV;
    if (!kv) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Newsletter service not configured',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Subscribe
    const newsletterService = new NewsletterService(kv);
    const result = await newsletterService.subscribe(email);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: result.error || 'Failed to subscribe',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Send confirmation email
    const resendApiKey = (locals.env?.RESEND_API_KEY as string | undefined)
      || import.meta.env.RESEND_API_KEY;
    
    if (resendApiKey && result.token) {
      const emailService = new EmailService(resendApiKey);
      await emailService.sendNewsletterConfirmation(email, result.token, language).catch((error) => {
        console.error('Failed to send confirmation email:', error);
        // Don't fail the subscription if email fails
      });
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Confirmation email sent. Please check your inbox.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
