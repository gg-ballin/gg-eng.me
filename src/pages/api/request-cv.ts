import type { APIRoute } from 'astro';
import { contactFormSchema } from '@/lib/validation';
import { EmailService } from '@/lib/emailService';
import { trackEvent } from '@/lib/analytics';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

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
    
    // Validate Cloudflare Turnstile token (required if configured)
    const turnstileSecretKey = (locals.env?.TURNSTILE_SECRET_KEY as string | undefined)
      || import.meta.env.TURNSTILE_SECRET_KEY;
    
    // If Turnstile is configured, require a valid token
    if (turnstileSecretKey) {
      // Reject if no token or token is 'disabled'
      if (!data.turnstileToken || data.turnstileToken === 'disabled') {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'CAPTCHA verification is required. Please complete the CAPTCHA and try again.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Verify the token with Cloudflare
      const turnstileResponse = await fetch(TURNSTILE_VERIFY_URL, {
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
    
    // Track CV request analytics (non-blocking)
    // Check both runtime.env (direct Cloudflare binding) and env (set by middleware)
    const analyticsKv = (locals.runtime?.env?.ANALYTICS_KV as KVNamespace | undefined)
      || (locals.env?.ANALYTICS_KV as KVNamespace | undefined);
    if (analyticsKv) {
      trackEvent({
        type: 'cv_request',
        path: '/api/request-cv',
        timestamp: Date.now(),
        language: data.language,
      }, analyticsKv).catch(() => {
        // Silently fail - analytics shouldn't break the request
      });
    }
    
    // Send notification email to owner
    // Await to ensure it completes in Cloudflare Workers (they terminate on response return)
    // Don't fail the request if notification fails, but log detailed errors
    try {
      const notificationResult = await emailService.sendCVRequestNotification(data);
      if (!notificationResult.success) {
        console.error('[CV Request] Failed to send notification email:', {
          error: notificationResult.error,
          requesterEmail: data.email,
          requesterName: data.name,
          timestamp: new Date().toISOString(),
        });
      } else {
        console.log('[CV Request] Notification email sent successfully to owner');
      }
    } catch (error) {
      console.error('[CV Request] Exception sending notification email:', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        requesterEmail: data.email,
        requesterName: data.name,
        timestamp: new Date().toISOString(),
      });
    }
    
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