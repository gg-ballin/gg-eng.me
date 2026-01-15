import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // Security Headers
  const headers = response.headers;
  
  const isDev = import.meta.env.DEV;
  
  // Content Security Policy (stricter in production)
  const scriptSrc = isDev 
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" 
    : "script-src 'self' 'unsafe-inline'";
  
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
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
