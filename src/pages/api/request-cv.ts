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
    
    // Validate Cloudflare Turnstile token (only if configured)
    const turnstileSecretKey = (locals.env?.TURNSTILE_SECRET_KEY as string | undefined)
      || import.meta.env.TURNSTILE_SECRET_KEY;
    
    // Only validate if both secret key and token are provided
    // Allow form submission without CAPTCHA if Turnstile is not configured
    if (turnstileSecretKey && data.turnstileToken && data.turnstileToken !== 'disabled') {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecretKey,
          response: data.turnstileToken,
        }),
      });
      
      const turnstileResult = await turnstileResponse.json();
      
      if (!turnstileResult.success) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'CAPTCHA verification failed. Please try again.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }
    
    // Get Resend API key from environment
    // In Cloudflare, use runtime env; in dev, use import.meta.env
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
    
    // Send notification email to owner (non-blocking)
    // Don't fail the request if notification fails
    emailService.sendCVRequestNotification(data)
      .then((result) => {
        if (!result.success) {
          // Log error with more context for Cloudflare Workers
          console.error('Failed to send notification email:', {
            error: result.error,
            requesterEmail: data.email,
            requesterName: data.name,
            timestamp: new Date().toISOString(),
          });
        } else {
          console.log('Notification email sent successfully:', {
            requesterEmail: data.email,
            timestamp: new Date().toISOString(),
          });
        }
      })
      .catch((error) => {
        // More detailed error logging
        console.error('Exception sending notification email:', {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          requesterEmail: data.email,
          requesterName: data.name,
          timestamp: new Date().toISOString(),
        });
      });
    
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error) {
    // Log error for debugging
    console.error('CV request API error:', error);
    
    const errorMessage = error instanceof Error 
      ? `Internal server error: ${error.message}` 
      : 'Internal server error';
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
