# CV Request System - Setup Guide

## Quick Start

### 1. Environment Setup

Create a `.env` file in the project root:

```bash
RESEND_API_KEY=re_your_api_key_here
SENDER_EMAIL=noreply@yourdomain.com
```

### 2. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your domain:
   - Go to **Domains** → **Add Domain**
   - Add your domain (e.g., `gg-eng.me`)
   - Add DNS records as shown (TXT, MX, CNAME)
   - Wait for verification (usually 5-10 minutes)
4. Create API key:
   - Go to **API Keys** → **Create API Key**
   - Name it (e.g., "Production")
   - Set permissions to "Sending access"
   - Copy the key and add to `.env`

### 3. Update Email Configuration

Edit `src/lib/emailService.ts` line 26:

```typescript
from: 'German Gomez <noreply@yourdomain.com>', // Update with YOUR domain
```

Replace `yourdomain.com` with your verified domain.

### 4. Test Locally

```bash
# Verify environment
bun run check-env

# Start dev server
bun run dev
```

Visit `http://localhost:4321/es/contact/` and test the form.

### 5. Deploy

#### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Connect repository in Vercel
3. Add environment variables in project settings:
   - `RESEND_API_KEY`
   - `SENDER_EMAIL`
4. Deploy

#### Netlify

1. Connect repository
2. Build settings:
   - Build command: `bun run build`
   - Publish directory: `dist`
3. Add environment variables in site settings
4. Deploy

## How It Works

### User Flow

1. User visits `/contact` page
2. Fills out form with:
   - Name
   - Email
   - Company (optional)
   - Language preference (ES/EN)
3. Submits form
4. Receives CV via email instantly

### Technical Flow

```
Frontend (ContactForm.astro)
    ↓ POST /api/request-cv
API Route (request-cv.ts)
    ↓ Validates with Zod
    ↓ Checks honeypot
EmailService (emailService.ts)
    ↓ Sends via Resend API
Resend
    ↓ Delivers email
User's Inbox
```

### Security Layers

1. **Validation**: Zod schemas validate all inputs
2. **Honeypot**: Hidden field catches bots
3. **Headers**: CSP, X-Frame-Options, etc.
4. **Obfuscation**: Email addresses encoded
5. **PDF Protection**: Files blocked from search engines

## File Structure

### New Files Created

```
src/
├── api/
│   └── request-cv.ts         # API endpoint
├── lib/
│   ├── validation.ts         # Zod schemas
│   └── emailService.ts       # Email service class
├── components/
│   └── ContactForm.astro     # Contact form component
├── private/
│   └── res/
│       ├── German_Gomez_es.pdf  # Private CV (Spanish)
│       └── German_Gomez_en.pdf  # Private CV (English)
├── middleware.ts             # Security headers
└── env.d.ts                  # TypeScript declarations

public/
└── robots.txt                # SEO protection

docs/
├── SECURITY_AUDIT.md
├── IMPLEMENTATION_SUMMARY.md
├── SECURITY_CHECKLIST.md
└── SETUP_GUIDE.md           # This file

Root files:
└── SECURITY.md              # Security documentation
```

### Modified Files

- `src/pages/[lang]/contact/index.astro` - New contact page
- `src/i18n/translations.ts` - Added contact translations
- `astro.config.mjs` - Added `@/lib` alias
- `tsconfig.json` - Added `@/lib/*` path
- `package.json` - Added `check-env` script
- `README.md` - Updated with security features

## Testing the Form

### Test Email

Use [Resend's test mode](https://resend.com/docs/dashboard/emails/send-test-emails) to send test emails without using your quota:

```typescript
// In emailService.ts, temporarily add:
const response = await this.resend.emails.send({
  // ... existing config
  tags: [{ name: 'env', value: 'test' }], // Mark as test
});
```

### Test Honeypot

Open browser console and run:

```javascript
// Should be silently rejected
document.querySelector('input[name="website"]').value = 'bot';
document.querySelector('#contact-form').requestSubmit();
```

### Test Validation

Try submitting with:
- Invalid email (should show error)
- Missing name (should show error)
- Empty form (should show multiple errors)

## Customization

### Email Template

Edit `src/lib/emailService.ts` method `generateEmailTemplate()`:

```typescript
private generateEmailTemplate(data: ContactFormData): string {
  // Customize HTML template here
}
```

### Form Fields

Add new fields in three places:

1. **Schema** (`src/lib/validation.ts`):
```typescript
export const contactFormSchema = z.object({
  // ... existing fields
  phone: z.string().optional(),
});
```

2. **Form** (`src/components/ContactForm.astro`):
```astro
<input type="tel" name="phone" />
```

3. **API** (`src/pages/api/request-cv.ts`):
```typescript
// Data automatically includes new field
```

### Translations

Update `src/i18n/translations.ts`:

```typescript
contact: {
  // Add new translations here
  phoneLabel: 'Phone',
}
```

## Troubleshooting

### "Email service not configured"

- Check `.env` file exists in project root
- Verify `RESEND_API_KEY` is set
- Run `bun run check-env`

### "Failed to send email"

- Check Resend dashboard for error logs
- Verify domain is verified
- Check API key has "Sending access" permission
- Ensure sender email matches verified domain

### Form doesn't submit

- Check browser console for errors
- Verify API route is accessible at `/api/request-cv`
- Check network tab for request/response

### CV not attached

- Verify PDF files exist in `public/` directory:
  - `German_Gomez_es.pdf`
  - `German_Gomez_en.pdf`
- Check file paths in `emailService.ts` line 17-18

### Bot spam getting through

- Verify honeypot field is hidden (CSS)
- Check server logs for honeypot triggers
- Consider adding rate limiting
- Add CAPTCHA if needed (see SECURITY.md)

## Production Checklist

- [ ] Resend domain verified
- [ ] API key added to environment variables
- [ ] Sender email updated in code
- [ ] CV files uploaded to `public/`
- [ ] `.env` added to `.gitignore` (already done)
- [ ] Test form submission in production
- [ ] Monitor Resend dashboard for deliverability
- [ ] Set up error alerting (optional)
- [ ] Add rate limiting (recommended)
- [ ] Configure analytics tracking (optional)

## Support

### Resources

- [Resend Documentation](https://resend.com/docs)
- [Astro Server Endpoints](https://docs.astro.build/en/core-concepts/endpoints/)
- [Zod Documentation](https://zod.dev)

### Common Issues

**Q: Can I use a different email service?**
A: Yes! Create a new class in `emailService.ts` that implements the same interface. Popular alternatives: SendGrid, Mailgun, Amazon SES.

**Q: How do I track who requested my CV?**
A: Add logging in `src/pages/api/request-cv.ts` or integrate with analytics (see SECURITY.md).

**Q: Can I send confirmation emails to myself?**
A: Yes! Uncomment the `bcc` line in `emailService.ts` line 42.

**Q: What about GDPR compliance?**
A: Current implementation doesn't store data permanently. Add a privacy policy link and data deletion policy if needed.

## Next Steps

1. ✅ Set up Resend account
2. ✅ Add environment variables
3. ✅ Test locally
4. ✅ Deploy to production
5. ⏭️ Monitor email deliverability
6. ⏭️ Consider adding rate limiting
7. ⏭️ Set up analytics tracking

---

**Last Updated**: 2026-01-15  
**Version**: 1.0.0
