# Germán Gomez - Portfolio 

A modern, bilingual portfolio site built with Astro, Tailwind CSS, and MDX.

## Features

- 🌍 **i18n Support**: Native internationalization with Spanish (default) and English
- 📝 **Blog System**: MDX-powered blog with content collections
- 🎨 **Clean Design**: Inspired by [pi.website](https://www.pi.website) with serif headings and sans-serif body text
- 🌓 **Dark/Light Theme**: Toggle with persistent preference
- 🚀 **Fast Performance**: Built with Astro for optimal performance
- 📱 **Responsive**: Mobile-first design that works on all devices

## Tech Stack

- **Framework**: [Astro 5](https://astro.build)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Content**: [MDX](https://mdxjs.com) via @astrojs/mdx
- **Typography**: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (body) + Playfair Display (headings)
- **Package Manager**: Bun

## Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Bio.astro           # Bio component
│   ├── content/
│   │   ├── blog/
│   │   │   ├── es/             # Spanish blog posts
│   │   │   └── en/             # English blog posts
│   │   └── config.ts           # Content collections config
│   ├── layouts/
│   │   └── BaseLayout.astro    # Base layout with nav
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── index.astro     # Home page
│   │   │   └── blog/
│   │   │       ├── index.astro        # Blog list
│   │   │       └── [...slug].astro    # Blog post
│   │   └── index.astro         # Root redirect
│   └── styles/
│       └── global.css          # Global styles
└── astro.config.mjs            # Astro configuration
```

## Getting Started

### Install dependencies

```bash
bun install
```

### Start development server

```bash
bun run dev
```

The site will be available at `http://localhost:4321/`

### Build for production

```bash
bun run build
```

### Preview production build

```bash
bun run preview
```

## i18n Routes

- **Spanish (default)**: `/es/` and `/es/blog/`
- **English**: `/en/` and `/en/blog/`
- **Root**: Redirects to `/es/`

## Adding Blog Posts

Create new MDX files in `src/content/blog/[lang]/`:

```mdx
---
title: "Your Title"
pubDate: 2026-01-14
description: "Brief description"
language: "es" # or "en"
---

Your content here...
```

## Customization

- **Colors**: Edit `src/styles/global.css` theme variables
- **Fonts**: Update Google Fonts link in `src/layouts/BaseLayout.astro`
- **Bio Content**: Modify `src/components/Bio.astro`
- **Navigation**: Update translations in `src/layouts/BaseLayout.astro`

## License

MIT
