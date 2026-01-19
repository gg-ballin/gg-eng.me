import { Resend } from 'resend';
import type { ContactFormData } from './validation';
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
        ? 'Tu pedido de CV de Germán Gomez'
        : 'Your resume requestfrom Germán Gomez';
      
      const htmlContent = this.generateEmailTemplate(data);
      
      // Get CV as base64 string (Resend expects this format in Cloudflare Workers)
      const cvBase64 = getCVBase64(data.language);
      
      // Send email with CV attachment
      const response = await this.resend.emails.send({
        from: 'German Gomez <noreply@gg-eng.me>',
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
        <strong>Germán Gomez</strong><br/>
        Senior Mobile Engineer<br/>
        Buenos Aires, Argentina</p>
      `
      : `
        <p>Best regards,<br/>
        <strong>Germán Gomez</strong><br/>
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
}
