# Germán Gomez - Portfolio 

A modern, bilingual portfolio site built with Astro, featuring a secure CV request system.

## Features

- 🌍 **i18n Support**: Native internationalization with Spanish (default) and English
- 📝 **Blog System**: MDX-powered blog with brutalist timeline design
- 🎨 **Clean Design**: Minimalist aesthetic with Space Grotesk typography
- 🌓 **Dark/Light Theme**: Toggle with persistent preference
- 📧 **CV Request System**: Secure email-based CV delivery with bot protection
- 🔒 **Security Headers**: CSP, X-Frame-Options, and more
- 🚀 **Fast Performance**: Hybrid rendering with Astro
- 📱 **Responsive**: Mobile-first design

## Tech Stack

- **Framework**: [Astro 5](https://astro.build) (Hybrid mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Content**: [MDX](https://mdxjs.com) via @astrojs/mdx
- **Email**: [Resend](https://resend.com) for automated CV delivery
- **Validation**: [Zod](https://zod.dev) for form validation
- **Typography**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- **Package Manager**: Bun

## Project Structure

```
/
├── docs/                          # Documentation
│   ├── SECURITY_AUDIT.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── SECURITY_CHECKLIST.md
│   └── SETUP_GUIDE.md
├── public/
│   └── robots.txt                # SEO configuration
├── src/
│   ├── api/
│   │   └── request-cv.ts         # CV request API endpoint
│   ├── components/
│   │   ├── Bio.astro             # Bio component
│   │   ├── ContactForm.astro     # CV request form
│   │   └── TimelineItem.astro    # Blog timeline item
│   ├── content/
│   │   ├── blog/
│   │   │   ├── es/               # Spanish blog posts
│   │   │   └── en/               # English blog posts
│   │   └── config.ts             # Content collections config
│   ├── i18n/
│   │   ├── interfaces.d.ts       # Type definitions
│   │   └── translations.ts       # Centralized translations
│   ├── layouts/
│   │   └── BaseLayout.astro      # Base layout
│   ├── lib/
│   │   ├── validation.ts         # Zod schemas
│   │   └── emailService.ts       # Email service abstraction
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── index.astro       # Home page
│   │   │   ├── blog/
│   │   │   │   ├── index.astro   # Blog list
│   │   │   │   └── [...slug].astro # Blog post
│   │   │   └── contact/
│   │   │       └── index.astro   # Contact page
│   │   └── index.astro           # Root redirect
│   ├── private/
│   │   └── res/
│   │       ├── German_Gomez_es.pdf  # Private CV files
│   │       └── German_Gomez_en.pdf
│   ├── styles/
│   │   └── global.css            # Global styles + theme
│   ├── middleware.ts             # Security headers
│   └── env.d.ts                  # TypeScript env declarations
├── SECURITY.md                   # Security overview
└── astro.config.mjs              # Astro configuration
```

## Setup

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Resend API Key (get from https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Sender Email (must be verified in Resend)
SENDER_EMAIL=noreply@yourdomain.com
```

### 3. Configure Resend

1. Sign up at [Resend](https://resend.com)
2. Verify your sending domain
3. Create an API key
4. Add the API key to your `.env` file

### 4. Add CV Files

Place your CV PDF files in the private directory:
- `src/private/res/German_Gomez_es.pdf` (Spanish version)
- `src/private/res/German_Gomez_en.pdf` (English version)

**Note**: These files are stored in a private directory and are NOT served as static assets. They are read server-side and sent via email only.

## Development

```bash
bun run dev
```

Visit `http://localhost:4321`

## Build

```bash
bun run build
```

## Preview Production Build

```bash
bun run preview
```

## i18n Routes

- **Spanish (default)**: `/es/`, `/es/blog/`, `/es/contact/`
- **English**: `/en/`, `/en/blog/`, `/en/contact/`
- **Root**: Redirects to `/es/`

## Security Features

### 1. CV Protection
- PDFs blocked from search engine indexing via `robots.txt`
- `X-Robots-Tag` headers on PDF requests
- Private cache headers on CV files

### 2. Form Protection
- Honeypot field to catch bots
- Zod validation for all inputs
- Rate limiting recommended for production

### 3. Security Headers
- **CSP**: Restricts sources to trusted domains
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Referrer-Policy**: Strict referrer control

### 4. Email Obfuscation
- Email addresses encoded in HTML entities
- Server-side only email handling
- No direct email exposure in client code

## Adding Blog Posts

Create new MDX files in `src/content/blog/[lang]/`:

```mdx
---
title: "Your Title"
pubDate: 2026-01-15
description: "Brief description"
language: "es" # or "en"
---

Your content here...
```

## Customization

- **Colors**: Edit CSS variables in `src/styles/global.css`
- **Translations**: Update `src/i18n/translations.ts`
- **Email Templates**: Modify `src/lib/emailService.ts`
- **Security Headers**: Adjust `src/middleware.ts`

## Deployment

### Vercel (Recommended)

1. Connect your repository
2. Add environment variables in project settings
3. Deploy

### Netlify

1. Connect your repository
2. Build command: `bun run build`
3. Publish directory: `dist`
4. Add environment variables in site settings

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- SSR/Hybrid rendering
- Environment variables

## License

MIT
