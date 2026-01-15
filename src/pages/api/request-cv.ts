import type { APIRoute } from 'astro';
import { contactFormSchema } from '@/lib/validation';
import { EmailService } from '@/lib/emailService';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Parse form data
    const body = await request.json();
    
    // Validate with Zod
    const validationResult = contactFormSchema.safeParse(body);
    
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
    
    const data = validationResult.data;
    
    // Check honeypot - silently reject bots
    if (data.website && data.website.length > 0) {
      // Fake success response to confuse bots
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Get Resend API key from environment
    // In Cloudflare, use runtime env; in dev, use import.meta.env
    const resendApiKey = (locals.runtime?.env?.RESEND_API_KEY as string | undefined) 
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
    
    // Send email
    const emailService = new EmailService(resendApiKey);
    const result = await emailService.sendCVRequest(data);
    
    if (!result.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to send email. Please try again later.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ success: true }),
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
