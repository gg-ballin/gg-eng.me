import type { APIRoute } from 'astro';
import { NewsletterService } from '@/lib/newsletterService';
import { EmailService } from '@/lib/emailService';

export const prerender = false;

// Admin endpoint to send newsletters to all confirmed subscribers
// This should be protected with authentication in production
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
    const { subject, htmlContent, language = 'en' } = body;
    
    if (!subject || !htmlContent) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Subject and HTML content are required',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
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
    
    // Get all confirmed subscribers
    const newsletterService = new NewsletterService(kv);
    const subscribers = await newsletterService.getConfirmedSubscribers();
    
    if (subscribers.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No confirmed subscribers found',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Get Resend API key
    const resendApiKey = (locals.env?.RESEND_API_KEY as string | undefined)
      || import.meta.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service not configured',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Send newsletter to all subscribers
    const emailService = new EmailService(resendApiKey);
    const results = await Promise.allSettled(
      subscribers.map(email =>
        emailService.sendNewsletter(email, subject, htmlContent, language)
      )
    );
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    return new Response(
      JSON.stringify({
        success: true,
        sent: successful,
        failed,
        total: subscribers.length,
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
