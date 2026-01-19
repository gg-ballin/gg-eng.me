# Security & Privacy

This document outlines the security and privacy measures implemented in the portfolio.

## CV Request System

### Overview
This portfolio uses an email-based request system to control access and track interest.

### How It Works

1. **User Request**: Visitors fill out a contact form with:
   - Name
   - Email
   - Company
   - Language preference (ES/EN)

2. **Validation**: Form data is validated using Zod schemas

3. **Bot Protection**: Honeypot field catches automated bots

4. **Email Delivery**: CV is sent via Resend to the requester's email

5. **Tracking**: All requests are logged server-side for analytics

### Security Measures

#### 1. PDF Protection
- ✅ PDFs stored in private directory (`/src/private/res/`)
- ✅ PDFs NOT served as static assets
- ✅ PDFs read server-side only via Node.js filesystem
- ✅ `robots.txt` blocks `/private/` and `/src/` directories
- ✅ `X-Robots-Tag: noindex` headers on PDF requests
- ✅ `Cache-Control: private` headers prevent caching
- ✅ No direct links to PDFs in the UI

#### 2. Email Obfuscation
- ✅ Contact email encoded with HTML entities
- ✅ Base64 obfuscation in server code
- ✅ No client-side email exposure

#### 3. Form Security
- ✅ **Honeypot field**: Invisible field that catches bots
- ✅ **Server-side validation**: Zod schemas validate all inputs
- ✅ **CSRF protection**: Same-origin policy enforced
- ✅ **Rate limiting**: Recommended for production (see below)

#### 4. HTTP Security Headers

**Content-Security-Policy**
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' https://api.resend.com;
frame-ancestors 'none';
```

**X-Frame-Options**: `DENY`
- Prevents clickjacking attacks

**X-Content-Type-Options**: `nosniff`
- Prevents MIME-type sniffing

**Referrer-Policy**: `strict-origin-when-cross-origin`
- Limits referrer information leakage

**Permissions-Policy**
```
camera=(), microphone=(), geolocation=(), interest-cohort=()
```

### Security Best Practices

1. **Never commit** `.env` files to version control
2. **Rotate API keys** every 90 days
3. **Use different keys** for development and production
4. **Restrict API key permissions** to minimum required scope

## Production Recommendations

### 1. Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// Example with Vercel Edge Config
import { rateLimit } from '@vercel/edge';

const limiter = rateLimit({
  interval: '1m',
  uniqueTokenPerInterval: 500,
});

// In API route
const { success } = await limiter.check(request, 5); // 5 requests per minute
if (!success) {
  return new Response('Too Many Requests', { status: 429 });
}
```

### 2. CAPTCHA (Optional)

For additional bot protection, consider adding Turnstile or reCAPTCHA:

```typescript
// Cloudflare Turnstile validation
const turnstileResponse = await fetch(
  'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET,
      response: token,
    }),
  }
);
```

### 3. Email Verification

Consider requiring email verification before sending CV:

1. User submits form
2. Verification email sent with unique token
3. User clicks link to confirm
4. CV sent after confirmation

### 4. Analytics Integration

Track CV requests for insights:

```typescript
// Example with Plausible
await fetch('https://plausible.io/api/event', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': request.headers.get('user-agent'),
  },
  body: JSON.stringify({
    name: 'CV Request',
    url: request.url,
    domain: 'gg-eng.me',
    props: {
      language: data.language,
      hasCompany: !!data.company,
    },
  }),
});
```

### 5. Monitoring

Set up monitoring for:
- Failed email deliveries
- Unusual request patterns
- API errors
- Honeypot triggers

## Incident Response

### If API Key is Compromised

1. **Immediately rotate** the key in Resend dashboard
2. **Update** environment variables in all deployments
3. **Review** recent email logs for suspicious activity
4. **Monitor** for unusual patterns in the next 48 hours

### If Spam is Detected

1. **Check** honeypot logs to verify it's catching bots
2. **Implement** rate limiting if not already present
3. **Add** CAPTCHA as additional protection
4. **Review** and tighten validation rules

## Compliance

### GDPR Considerations

- Form data is only used for CV delivery
- No data is stored permanently (unless you add logging)
- Consider adding a privacy policy link
- Users can request data deletion

### Data Retention

Current implementation:
- ✅ No database storage of form submissions
- ✅ Emails processed in memory only
- ⚠️ Resend retains email logs (check their retention policy)

## Reporting Security Issues

If you discover a security vulnerability, please email:
- **Email**: (obfuscated in code)
- **Response Time**: Within 48 hours

Please do not publicly disclose the issue until it has been addressed.

## Changelog

- **2026-01-15**: Initial security implementation
  - CV request system
  - Security headers
  - Email obfuscation
  - Honeypot protection
