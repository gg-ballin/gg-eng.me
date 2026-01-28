import { defineMiddleware } from 'astro:middleware';
import { trackEvent } from '@/lib/analytics';

const SPANISH_LOCALES = ['es'];

function preferSpanish(acceptLanguage: string | null): boolean {
  if (!acceptLanguage) return false;
  const parts = acceptLanguage.split(',').map((p) => p.trim().split(';')[0].split('-')[0].toLowerCase());
  return parts.some((code) => SPANISH_LOCALES.includes(code));
}

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.locals.runtime?.env) {
    // Type assertion for Cloudflare runtime env
    context.locals.env = context.locals.runtime.env as any;
  }

  const pathname = context.url.pathname;
  
  // Skip i18n routing for API routes - they should be accessible directly
  if (pathname.startsWith('/api/')) {
    return next();
  }
  
  // Root: redirect based on Accept-Language to /es/ or /en/
  if (pathname === '/' || pathname === '') {
    const acceptLang = context.request.headers.get('Accept-Language');
    const locale = preferSpanish(acceptLang) ? 'es' : 'en';
    return context.redirect(`/${locale}/`);
  }
  
  const response = await next();
  
  // Security Headers
  const headers = response.headers;
  
  const isDev = import.meta.env.DEV;
  
  // Content Security Policy (stricter in production)
  const scriptSrc = isDev 
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com" 
    : "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com";
  
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://challenges.cloudflare.com https://api.resend.com",
      "frame-src 'self' https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
  );
  
  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // Block PDF indexing with X-Robots-Tag
  if (context.url.pathname.endsWith('.pdf')) {
    headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
    headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  }
  
  // Track pageview analytics (non-blocking)
  // Skip tracking for API routes, static assets, PDFs, and other non-page routes
  const shouldTrack = 
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/_astro/') &&
    !pathname.startsWith('/assets/') &&
    !pathname.endsWith('.pdf') &&
    !pathname.endsWith('.ico') &&
    !pathname.endsWith('.xml') &&
    !pathname.endsWith('.txt') &&
    response.status === 200; // Only track successful responses
  
  if (shouldTrack) {
    const analyticsKv = context.locals.env?.ANALYTICS_KV;
    if (analyticsKv) {
      // Extract language from pathname (/es/... or /en/...)
      const langMatch = pathname.match(/^\/(es|en)\//);
      const language = langMatch ? langMatch[1] : undefined;
      
      // Track asynchronously (don't await to avoid blocking)
      trackEvent({
        type: 'pageview',
        path: pathname,
        timestamp: Date.now(),
        userAgent: context.request.headers.get('user-agent') || undefined,
        referer: context.request.headers.get('referer') || undefined,
        language,
      }, analyticsKv).catch(() => {
        // Silently fail - analytics shouldn't break the site
      });
    }
  }
  
  return response;
});
