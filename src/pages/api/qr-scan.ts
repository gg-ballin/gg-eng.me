import type { APIRoute } from 'astro';
import { EmailService } from '@/lib/emailService';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  console.log('[QR scan] POST /api/qr-scan received');
  try {
    const resendApiKey = (locals.env?.RESEND_API_KEY as string | undefined)
      || import.meta.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('[QR scan] RESEND_API_KEY not set');
      return new Response(
        JSON.stringify({ success: false, error: 'Email not configured' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userAgent = request.headers.get('user-agent') ?? undefined;
    let path: string | undefined;
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        const body = await request.json() as { path?: string };
        path = body.path;
      } catch {
        // ignore
      }
    }
    if (!path) {
      const referer = request.headers.get('referer');
      path = referer ? new URL(referer).pathname : undefined;
    }

    const emailService = new EmailService(resendApiKey);
    const result = await emailService.sendQRScanNotification({ userAgent, path });

    if (!result.success) {
      console.error('[QR scan] Resend failed:', result.error);
      return new Response(
        JSON.stringify({ success: false, error: result.error }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('[QR scan] Email sent successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[QR scan] Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
