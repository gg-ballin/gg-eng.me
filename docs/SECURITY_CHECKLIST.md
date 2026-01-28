# Security Checklist - Quick Reference

✅ = Implemented | ⚠️ = Requires Action | 🔄 = Ongoing

---

## Pre-Deployment Checklist

### Environment Configuration
- [ ] ⚠️ Create Resend account at https://resend.com
- [ ] ⚠️ Verify your domain (add DNS records)
- [ ] ⚠️ Generate API key in Resend dashboard
- [ ] ⚠️ Add `RESEND_API_KEY` to environment variables
- [ ] ⚠️ Update sender email in `src/lib/emailService.ts` (line 30)

### File Verification
- [ ] ✅ CV files exist: `public/German_Gomez_es.pdf`
- [ ] ✅ CV files exist: `public/German_Gomez_en.pdf`
- [ ] ✅ `.env` is in `.gitignore`
- [ ] ✅ No sensitive data committed

### Code Verification
- [ ] ✅ Honeypot field in form (hidden)
- [ ] ✅ Honeypot validation in API
- [ ] ✅ Personal email obfuscated (Base64)
- [ ] ✅ Personal email server-side only
- [ ] ✅ Language logic correct (ES/EN)
- [ ] ✅ Client-side console logs removed
- [ ] ✅ Server-side logging minimal (debugging only)

### Security Headers
- [ ] ✅ X-Frame-Options: DENY
- [ ] ✅ X-Content-Type-Options: nosniff
- [ ] ✅ Content-Security-Policy configured
- [ ] ✅ Referrer-Policy set
- [ ] ✅ Permissions-Policy set

### SEO Protection
- [ ] ✅ robots.txt blocks /api/
- [ ] ✅ robots.txt blocks /*.pdf
- [ ] ✅ robots.txt blocks /public/
- [ ] ✅ X-Robots-Tag on PDF files

---

## Post-Deployment Testing

### Form Functionality
- [ ] ⚠️ Submit valid form → Receive email
- [ ] ⚠️ Spanish selection → Spanish CV attached
- [ ] ⚠️ English selection → English CV attached
- [ ] ⚠️ Reply to email → Goes to personal email
- [ ] ⚠️ Invalid email → Shows error
- [ ] ⚠️ Missing fields → Shows errors

### Bot Protection
- [ ] ⚠️ Fill honeypot → No email sent (fake success)
- [ ] ⚠️ Check server logs → No errors

### Security
- [ ] ⚠️ Check robots.txt accessible: `https://gg-eng.me/robots.txt`
- [ ] ⚠️ Try direct PDF access → Loads but shouldn't index
- [ ] ⚠️ Check security headers with: https://securityheaders.com

---

## Monitoring (First 48 Hours)

- [ ] 🔄 Monitor Resend dashboard for delivery rate
- [ ] 🔄 Check for failed email attempts
- [ ] 🔄 Verify no honeypot spam
- [ ] 🔄 Review form submission patterns

---

## Ongoing Maintenance

### Weekly
- [ ] 🔄 Check Resend deliverability stats
- [ ] 🔄 Monitor for unusual patterns

### Monthly
- [ ] 🔄 Test form functionality
- [ ] 🔄 Update dependencies: `bun update`
- [ ] 🔄 Review CV for updates

### Quarterly (Every 90 Days)
- [ ] 🔄 Security audit review
- [ ] 🔄 Rotate API keys
- [ ] 🔄 Update CSP if needed
- [ ] 🔄 Test all form scenarios

---

## Quick Commands

```bash
# Install dependencies
bun install

# Check environment
bun run check-env

# Development server
bun run dev

# Production build
bun run build

# Preview build
bun run preview

# Update dependencies
bun update
```

---

## Emergency Contacts

### If API Key Compromised
1. **Immediately** rotate in Resend dashboard
2. Update environment variables
3. Redeploy application
4. Monitor logs for 48 hours

### If Spam Detected
1. Verify honeypot is catching bots
2. Check server logs for patterns
3. Add rate limiting if needed
4. Consider adding CAPTCHA

---

## File Quick Reference

| Task | File |
|------|------|
| Update sender email | `src/lib/emailService.ts:76` |
| Modify form fields | `src/components/ContactForm.astro` |
| Change validation rules | `src/lib/validation.ts` |
| Adjust security headers | `src/middleware.ts` |
| Update robots.txt | `public/robots.txt` |
| Change email template | `src/lib/emailService.ts:186+` |
| API endpoint | `src/pages/api/request-cv.ts` |

---

## Key Security Values

```typescript
// Personal email (Base64 encoded)
'Z29tZXpnZXIuYTlAZ21haWwuY29t' → gomezger.a9@gmail.com

// Language mapping
'es' → German_Gomez_es.pdf
'en' → German_Gomez_en.pdf

// Honeypot field
name="website" → must be empty
```

---

## Status Legend

- ✅ **Implemented** - Feature is complete and working
- ⚠️ **Action Required** - You need to configure this
- 🔄 **Ongoing** - Regular maintenance task

---

**Print this page and keep it handy! 📋**

*Last Updated: 2026-01-15*
