import { Resend } from 'resend';
import type { ContactFormData } from './validation';
import type { Language } from '@/i18n/translations';
import { getCVBase64 } from './cv-data';

const getPersonalEmail = (): string => {
  const encoded = 'Z29tZXpnZXIuYTlAZ21haWwuY29t';
  return atob(encoded);
};

export class EmailService {
  private resend: Resend;
  
  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
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
      
      // Get CV as base64 string (Resend expects this format in Cloudflare Workers)
      const cvBase64 = getCVBase64(data.language);
      
      // Send email with CV attachment
      const response = await this.resend.emails.send({
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [data.email],
        replyTo: [getPersonalEmail()],
        subject,
        html: htmlContent,
        attachments: [
          {
            filename: cvFileName,
            content: cvBase64,
          }
        ],
      });
      
      if (response.error) {
        return { success: false, error: response.error.message };
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
      
      const response = await this.resend.emails.send({
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [personalEmail],
        subject,
        html: htmlContent,
      });
      
      if (response.error) {
        return { success: false, error: response.error.message };
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
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
      
      const response = await this.resend.emails.send({
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [email],
        subject,
        html: htmlContent,
      });
      
      if (response.error) {
        return { success: false, error: response.error.message };
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
      const response = await this.resend.emails.send({
        from: 'German Gómez <noreply@gg-eng.me>',
        to: [email],
        subject,
        html: htmlContent,
      });
      
      if (response.error) {
        return { success: false, error: response.error.message };
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
