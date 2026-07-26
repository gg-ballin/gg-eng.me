import type { ContactFormData } from './validation';
import type { Language } from '@/i18n/translations';
import { CV_BASE64 } from './cv-data';

// Use Resend REST API directly (Cloudflare Workers compatible)
const RESEND_API_URL = 'https://api.resend.com/emails';

const getPersonalEmail = (): string => {
  const encoded = 'Z29tZXpnZXIuYTlAZ21haWwuY29t';
  return atob(encoded);
};

async function sendEmailViaAPI(
  apiKey: string,
  payload: {
    from: string;
    to: string[];
    subject: string;
    html: string;
    reply_to?: string[];
    attachments?: Array<{ filename: string; content: string }>;
  }
): Promise<{ success: boolean; error?: string; data?: any }> {
  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      // Include full error details from Resend API for debugging
      const errorDetails = {
        status: response.status,
        statusText: response.statusText,
        message: result.message,
        name: result.name,
        errors: result.errors,
      };
      
      return {
        success: false,
        error: JSON.stringify(errorDetails),
      };
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDeviceSummary(userAgent?: string): { summary: string } {
  if (!userAgent) return { summary: 'Unknown device' };

  let browser = 'Browser';
  const edge = userAgent.match(/Edg\/([\d.]+)/);
  const chrome = userAgent.match(/Chrome\/([\d.]+)/);
  const firefox = userAgent.match(/Firefox\/([\d.]+)/);
  const safari = !chrome && userAgent.match(/Version\/([\d.]+).*Safari/);

  if (edge) browser = `Edge ${edge[1].split('.')[0]}`;
  else if (chrome) browser = `Chrome ${chrome[1].split('.')[0]}`;
  else if (firefox) browser = `Firefox ${firefox[1].split('.')[0]}`;
  else if (safari) browser = `Safari ${safari[1].split('.')[0]}`;

  let os = 'Unknown OS';
  if (/iPhone|iPad|iPod/.test(userAgent)) os = 'iOS';
  else if (/Android/.test(userAgent)) os = 'Android';
  else if (/Windows NT/.test(userAgent)) os = 'Windows';
  else if (/Mac OS X/.test(userAgent)) os = 'macOS';
  else if (/Linux/.test(userAgent)) os = 'Linux';

  return { summary: `${browser} · ${os}` };
}

function formatCountry(country?: string): string {
  if (!country || country === 'XX' || country === 'T1') return '—';
  return country.toUpperCase();
}

function localeFromPath(path?: string): string {
  if (!path) return '—';
  const match = path.match(/^\/(es|en)(?:\/|$)/);
  return match ? match[1] : '—';
}

export class EmailService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async sendCVRequest(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    try {
      const cvFileName = data.language === 'es' 
        ? 'German_Gomez_es.pdf' 
        : 'German_Gomez_en.pdf';
      
      const subject = data.language === 'es'
        ? 'Tu pedido de CV de Germán Gómez'
        : 'Your resume request from Germán Gómez';
      
      const htmlContent = this.generateEmailTemplate(data);
      
      // Get CV as base64 string (Resend expects this format)
      const cvBase64 = CV_BASE64[data.language];
      
      // Send email with CV attachment via Resend API
      const response = await sendEmailViaAPI(this.apiKey, {
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [data.email],
        reply_to: [getPersonalEmail()],
        subject,
        html: htmlContent,
        attachments: [
          {
            filename: cvFileName,
            content: cvBase64,
          }
        ],
      });
      
      if (!response.success) {
        return { success: false, error: response.error };
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
  
  async sendCVRequestNotification(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
    try {
      const personalEmail = getPersonalEmail();
      const timestamp = new Date().toISOString();
      
      const subject = 'New CV Request - gg-eng.me';
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: 'Space Grotesk', Arial, sans-serif; line-height: 1.6; color: #000000; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; }
              .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .info-table td { padding: 10px; border-bottom: 1px solid #ddd; }
              .info-table td:first-child { font-weight: 600; width: 30%; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #000000; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>New CV Request Received</h1>
              <p>Someone has requested your CV through the contact form on gg-eng.me.</p>
              
              <table class="info-table">
                <tr>
                  <td>Name:</td>
                  <td>${data.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td><a href="mailto:${data.email}">${data.email}</a></td>
                </tr>
                <tr>
                  <td>Company:</td>
                  <td>${data.company || 'Not provided'}</td>
                </tr>
                <tr>
                  <td>Language:</td>
                  <td>${data.language === 'es' ? 'Spanish' : 'English'}</td>
                </tr>
                <tr>
                  <td>Requested At:</td>
                  <td>${new Date(timestamp).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Status:</td>
                  <td style="color: #16a34a; font-weight: 600;">✓ CV Sent Successfully</td>
                </tr>
              </table>
              
              <div class="footer">
                <p style="color: #666; font-size: 12px;">
                  This is an automated notification from gg-eng.me
                </p>
              </div>
            </div>
          </body>
        </html>
      `;
      
      const response = await sendEmailViaAPI(this.apiKey, {
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [personalEmail],
        subject,
        html: htmlContent,
      });
      
      if (!response.success) {
        // Include recipient email in error for debugging
        return { 
          success: false, 
          error: `Failed to send notification to ${personalEmail}: ${response.error}` 
        };
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Sends a notification email when someone scans the site QR code (landed with ?from=qr).
   * Single SSR entrypoint — do not also call from the client.
   */
  async sendQRScanNotification(metadata: {
    userAgent?: string;
    path?: string;
    country?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const personalEmail = getPersonalEmail();
      const now = new Date();
      const device = formatDeviceSummary(metadata.userAgent);
      const country = formatCountry(metadata.country);
      const path = escapeHtml(metadata.path ?? '—');
      const locale = localeFromPath(metadata.path);
      const timeLocal = now.toLocaleString('en-GB', {
        timeZone: 'America/Argentina/Buenos_Aires',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const timeUtc = now.toLocaleString('en-GB', {
        timeZone: 'UTC',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const subjectParts = ['QR scan', device.summary];
      if (country !== '—') subjectParts.push(country);
      const subject = subjectParts.join(' · ');

      const row = (label: string, value: string, last = false) => `
        <tr>
          <td style="padding: 14px 20px; ${last ? '' : 'border-bottom: 1px solid #e5e5e5;'} width: 110px; vertical-align: top; font-size: 12px; color: #666; letter-spacing: 0.04em; text-transform: uppercase;">${label}</td>
          <td style="padding: 14px 20px; ${last ? '' : 'border-bottom: 1px solid #e5e5e5;'} font-size: 15px; color: #111; word-break: break-word;">${value}</td>
        </tr>`;

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"></head>
          <body style="margin: 0; padding: 0; background: #f7f8fa; font-family: Helvetica, Arial, sans-serif; line-height: 1.5; color: #111;">
            <div style="max-width: 520px; margin: 0 auto; padding: 40px 24px;">
              <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #666;">gg-eng.me</p>
              <h1 style="margin: 0 0 8px; font-size: 22px; font-weight: 600; color: #000;">QR code scanned</h1>
              <p style="margin: 0 0 28px; font-size: 15px; color: #444;">Someone opened the site via the QR code.</p>
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #e5e5e5;">
                ${row('Device', escapeHtml(device.summary))}
                ${row('Locale', escapeHtml(locale))}
                ${row('Path', path)}
                ${row('Country', escapeHtml(country))}
                ${row('When', `${escapeHtml(timeLocal)} <span style="color:#666;">(UTC-3)</span><br/><span style="font-size:13px;color:#666;">${escapeHtml(timeUtc)} UTC</span>`, !metadata.userAgent)}
                ${metadata.userAgent ? row('UA', `<span style="font-size:12px;color:#666;">${escapeHtml(metadata.userAgent)}</span>`, true) : ''}
              </table>
              <p style="margin: 28px 0 0; font-size: 12px; color: #999;">Automated notification from gg-eng.me</p>
            </div>
          </body>
        </html>
      `;

      const response = await sendEmailViaAPI(this.apiKey, {
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [personalEmail],
        subject,
        html: htmlContent,
      });

      if (!response.success) {
        return { success: false, error: response.error };
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  private generateEmailTemplate(data: ContactFormData): string {
    const isSpanish = data.language === 'es';
    
    const greeting = isSpanish
      ? `Hola ${data.name},`
      : `Hello ${data.name},`;
    
    const personalEmail = getPersonalEmail();
    
    const body = isSpanish
      ? `
        <p>Gracias por tu interés en mi perfil profesional.</p>
        <p>Adjunto encontrarás mi Curriculum Vitae en formato PDF.</p>
        ${data.company ? `<p>Me alegra saber que representas a <strong>${data.company}</strong>.</p>` : ''}
        <p>Si tienes alguna pregunta o deseas discutir oportunidades, contactame directamente a <strong><a href="mailto:${personalEmail}">${personalEmail}</a></strong>.</p>
      `
      : `
        <p>Thank you for your interest in my professional profile.</p>
        <p>Please find my Resume attached as a PDF.</p>
        ${data.company ? `<p>I'm glad to know you represent <strong>${data.company}</strong>.</p>` : ''}
        <p>If you have any questions or would like to discuss opportunities, contact me directly to <strong><a href="mailto:${personalEmail}">${personalEmail}</a></strong>.</p>
      `;
    
    const signature = isSpanish
      ? `
        <p>Saludos,<br/>
        <strong>Germán Gómez</strong><br/>
        Senior Mobile Engineer<br/>
        Buenos Aires, Argentina</p>
      `
      : `
        <p>Best regards,<br/>
        <strong>Germán Gómez</strong><br/>
        Senior Mobile Engineer<br/>
        Buenos Aires, Argentina</p>
      `;
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Space Grotesk', Arial, sans-serif; line-height: 1.6; color: #000000; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #000000; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>${greeting}</h1>
            ${body}
            ${signature}
            <div class="footer">
              <p style="color: #666; font-size: 12px;">
                ${isSpanish 
                  ? 'Este correo fue generado automáticamente desde gg-eng.me' 
                  : 'This email was automatically generated from gg-eng.me'}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
  
  async sendNewsletterConfirmation(
    email: string,
    token: string,
    language: Language
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const isSpanish = language === 'es';
      const baseUrl = 'https://gg-eng.me'; // Update with your domain
      const confirmUrl = `${baseUrl}/api/newsletter/confirm?token=${token}`;
      
      const subject = isSpanish
        ? 'Confirma tu suscripción al newsletter'
        : 'Confirm your newsletter subscription';
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: 'Space Grotesk', Arial, sans-serif; line-height: 1.6; color: #000000; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; }
              .button { display: inline-block; padding: 12px 24px; background-color: var(--color-accent, #000000); color: #ffffff; text-decoration: none; border-radius: 4px; margin: 20px 0; }
              .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #000000; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${isSpanish ? 'Confirma tu suscripción' : 'Confirm your subscription'}</h1>
              <p>${isSpanish 
                ? `Hola,<br/><br/>Gracias por suscribirte al newsletter de Germán Gómez. Para completar tu suscripción, por favor haz clic en el siguiente enlace:`
                : `Hello,<br/><br/>Thank you for subscribing to Germán Gómez's newsletter. To complete your subscription, please click the following link:`}</p>
              <p style="text-align: center;">
                <a href="${confirmUrl}" class="button">${isSpanish ? 'Confirmar suscripción' : 'Confirm subscription'}</a>
              </p>
              <p>${isSpanish 
                ? 'Si no solicitaste esta suscripción, puedes ignorar este correo.'
                : 'If you did not request this subscription, you can ignore this email.'}</p>
              <p>${isSpanish 
                ? 'Este enlace expirará en 24 horas.'
                : 'This link will expire in 24 hours.'}</p>
              <div class="footer">
                <p style="color: #666; font-size: 12px;">
                  ${isSpanish 
                    ? 'Este correo fue generado automáticamente desde gg-eng.me' 
                    : 'This email was automatically generated from gg-eng.me'}
                </p>
              </div>
            </div>
          </body>
        </html>
      `;
      
      const response = await sendEmailViaAPI(this.apiKey, {
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [email],
        subject,
        html: htmlContent,
      });
      
      if (!response.success) {
        return { success: false, error: response.error };
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  async sendNewsletter(
    email: string,
    subject: string,
    htmlContent: string,
    language: Language
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await sendEmailViaAPI(this.apiKey, {
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [email],
        subject,
        html: htmlContent,
      });
      
      if (!response.success) {
        return { success: false, error: response.error };
      }
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
