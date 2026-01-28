import { defineMiddleware } from 'astro:middleware';

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
  
  return response;
});
