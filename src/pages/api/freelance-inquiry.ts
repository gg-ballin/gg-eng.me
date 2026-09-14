import type { APIRoute } from 'astro';
import { freelanceInquirySchema } from '@/lib/validation';
import { EmailService } from '@/lib/emailService';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const validationResult = freelanceInquirySchema.safeParse(body);

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

    if (data.website && data.website.length > 0) {
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const turnstileSecretKey = (locals.env?.TURNSTILE_SECRET_KEY as string | undefined)
      || import.meta.env.TURNSTILE_SECRET_KEY;

    if (turnstileSecretKey) {
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

    const emailService = new EmailService(resendApiKey);

    const autoReplyResult = await emailService.sendFreelanceInquiryAutoReply(data);
    if (!autoReplyResult.success) {
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

    try {
      const notificationResult = await emailService.sendFreelanceInquiryNotification(data);
      if (!notificationResult.success) {
        console.error('[Freelance Inquiry] Failed to send notification email:', {
          error: notificationResult.error,
          requesterEmail: data.email,
          requesterName: data.name,
          projectType: data.projectType,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('[Freelance Inquiry] Exception sending notification email:', {
        error: error instanceof Error ? error.message : String(error),
        requesterEmail: data.email,
        requesterName: data.name,
        projectType: data.projectType,
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
    console.error('Freelance inquiry API error:', error);

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
