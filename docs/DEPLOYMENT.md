# Deployment Guide - Cloudflare Pages

This guide walks you through deploying your portfolio to Cloudflare Pages.

## Prerequisites

- ✅ GitHub account with repository
- ✅ Cloudflare account (free tier works)
- ✅ Domain `gg-eng.me` added to Cloudflare
- ✅ Resend account with verified domain

---

## Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/gg-eng.me.git
git branch -M main
git push -u origin main
```

---

## Step 2: Connect to Cloudflare Pages

### A. Create Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** in the sidebar
3. Click **Create a project**
4. Choose **Connect to Git**
5. Select **GitHub** and authorize Cloudflare
6. Select your repository: `gg-eng.me`

### B. Configure Build Settings

**CRITICAL**: Do NOT use `wrangler deploy` command. Use these settings:

| Setting | Value |
|---------|-------|
| **Project name** | `gg-eng-me` |
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Deploy command** | Leave empty (auto-detected) |
| **Root directory** | `/` (leave empty) |
| **Node.js version** | `20.x` |

**Important Notes:**
- **DO NOT** include `wrangler.toml` in your project
- Use `npm run build` (Cloudflare auto-installs dependencies)
- Leave "Deploy command" field EMPTY
- Cloudflare Pages handles deployment automatically

### C. Environment Variables

Click **Add environment variable** and add:

```
RESEND_API_KEY=re_your_production_api_key_here
```

**Important**: Get your production API key from [Resend Dashboard](https://resend.com/api-keys)

### D. Deploy

Click **Save and Deploy**

Your site will build and deploy to: `https://gg-eng-me.pages.dev`

---

## Step 3: Configure Custom Domain

### A. Add Custom Domain in Pages

1. Go to your Pages project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `gg-eng.me`
5. Click **Continue**

### B. DNS Configuration (Auto-configured if using Cloudflare DNS)

If `gg-eng.me` is already on Cloudflare DNS, it will automatically create:

```
Type: CNAME
Name: gg-eng.me
Content: gg-eng-me.pages.dev
Proxy: ✅ Proxied (orange cloud)
```

If you want `www` subdomain:
```
Type: CNAME
Name: www
Content: gg-eng.me.pages.dev
Proxy: ✅ Proxied
```

Wait 1-5 minutes for DNS propagation.

---

## Step 4: Configure Resend Email

Your email sender is `noreply@gg-eng.me`, so you need to verify the domain.

### A. Add Domain in Resend

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **Add Domain**
3. Enter: `gg-eng.me`
4. Click **Add**

### B. Add DNS Records to Cloudflare

Resend will show 3 DNS records to add. Go to Cloudflare DNS and add:

**1. SPF Record (TXT)**
```
Type: TXT
Name: @
Content: v=spf1 include:_spf.resend.com ~all
```

**2. DKIM Record (TXT)**
```
Type: TXT
Name: resend._domainkey
Content: [provided by Resend - unique value]
```

**3. DMARC Record (TXT)** - Optional but recommended
```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none;
```

### C. Verify Domain

Wait 5-10 minutes, then click **Verify** in Resend dashboard.

Status should show: ✅ **Verified**

---

## Step 5: Test Your Deployment

### A. Test Routes

```bash
# Homepage (redirects to /es/)
curl -I https://gg-eng.me

# Spanish homepage
curl -I https://gg-eng.me/es/

# English homepage
curl -I https://gg-eng.me/en/

# Contact page
curl -I https://gg-eng.me/es/contact/

# Blog
curl -I https://gg-eng.me/es/blog/
```

### B. Test Contact Form

1. Visit: `https://gg-eng.me/es/contact/`
2. Fill out the form with your email
3. Click "Solicitar CV"
4. Check your email inbox
5. Verify:
   - ✅ Email received
   - ✅ PDF attached (correct language)
   - ✅ Reply-to goes to `gomezger.a9@gmail.com`

### C. Test Security Headers

```bash
curl -I https://gg-eng.me | grep -E "X-Frame-Options|X-Content-Type-Options|Content-Security-Policy"
```

You should see:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Content-Security-Policy: ...
```

### D. Check robots.txt

```bash
curl https://gg-eng.me/robots.txt
```

Should block `/api/`, `/private/`, `/src/`, and `*.pdf`

---

## Step 6: Monitor & Maintain

### Cloudflare Analytics

- **Analytics** tab shows:
  - Page views
  - Unique visitors
  - Bandwidth usage
  - Core Web Vitals

### Resend Dashboard

- Monitor email delivery rates
- Check for bounces/spam reports
- Review logs for debugging

### Automatic Deployments

Every push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Update content"
git push origin main
```

Cloudflare will:
1. Detect the push
2. Run `bun install`
3. Run `bun run build`
4. Deploy to production

Deploy time: ~2-3 minutes

---

## Build Configuration

Your project is configured with:

**Astro Config** (`astro.config.mjs`):
- Output: `hybrid` (SSR for API routes)
- Adapter: `@astrojs/cloudflare`
- Platform proxy: Enabled

**Environment Variables Required**:
- `RESEND_API_KEY` - Resend API key for sending emails

---

## Troubleshooting

### Build Fails

**Error**: `Command failed: bun run build`

**Solution**:
1. Check build logs in Cloudflare Pages
2. Test build locally: `bun run build`
3. Verify all dependencies are in `package.json`

### Email Not Sending

**Error**: `Failed to send email`

**Solutions**:
1. Verify `RESEND_API_KEY` is set in Cloudflare Pages
2. Check domain is verified in Resend
3. Test API key in Resend dashboard
4. Check Resend logs for errors

### 404 on API Route

**Error**: `POST /api/request-cv 404`

**Solution**:
1. Verify file is at: `src/pages/api/request-cv.ts` (not `src/api/`)
2. Check `output: "hybrid"` in `astro.config.mjs`
3. Ensure Cloudflare adapter is installed

### DNS Not Propagating

**Solution**:
1. Wait 5-10 minutes
2. Check DNS with: `dig gg-eng.me`
3. Clear DNS cache: `sudo dscacheutil -flushcache` (macOS)
4. Try incognito/private browsing

### Security Headers Not Showing

**Solution**:
1. Verify `src/middleware.ts` exists
2. Check Cloudflare proxy is enabled (orange cloud)
3. Test with: `curl -I https://gg-eng.me`

---

## Performance Optimization

Cloudflare Pages automatically provides:

✅ **Global CDN** - Content served from 200+ locations
✅ **HTTP/3** - Latest HTTP protocol
✅ **Brotli Compression** - Smaller file sizes
✅ **Smart Caching** - Intelligent cache rules
✅ **DDoS Protection** - Enterprise-grade security
✅ **Auto HTTPS** - Free SSL certificate

Expected performance:
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+

---

## Costs

| Service | Plan | Cost |
|---------|------|------|
| Cloudflare Pages | Free | $0 |
| Cloudflare DNS | Free | $0 |
| GitHub | Free | $0 |
| Resend | Free tier | $0 (100 emails/day) |
| **Total** | | **$0/month** |

**Upgrade paths** (if needed):
- Resend Pro: $20/month (50,000 emails)
- Cloudflare Pages Pro: $20/month (unlimited builds)

---

## Quick Commands

```bash
# Local development
bun run dev

# Build locally
bun run build

# Preview build
bun run preview

# Check environment
bun run check-env

# Deploy (automatic on push)
git push origin main
```

---

## Support

- **Astro Docs**: https://docs.astro.build
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
- **Resend Docs**: https://resend.com/docs

---

**Last Updated**: 2026-01-15
**Version**: 1.0.0
