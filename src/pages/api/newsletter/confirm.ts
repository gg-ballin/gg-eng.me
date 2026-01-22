import type { APIRoute } from 'astro';
import { NewsletterService } from '@/lib/newsletterService';

export const prerender = false;

export const GET: APIRoute = async ({ request, locals, redirect }) => {
  // Feature flag: Controlled via environment variable
  const NEWSLETTER_ENABLED = (locals.env?.NEWSLETTER_ENABLED as string | undefined) 
    || import.meta.env.NEWSLETTER_ENABLED === 'true';
  
  // Check feature flag
  if (!NEWSLETTER_ENABLED) {
    return new Response('Newsletter feature is currently disabled', { status: 503 });
  }

  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      return redirect('/?newsletter=error', 302);
    }
    
    // Get KV namespace
    const kv = locals.env?.NEWSLETTER_KV;
    if (!kv) {
      return redirect('/?newsletter=error', 302);
    }
    
    // Confirm subscription
    const newsletterService = new NewsletterService(kv);
    const result = await newsletterService.confirm(token);
    
    if (!result.success) {
      return redirect('/?newsletter=error', 302);
    }
    
    return redirect('/?newsletter=confirmed', 302);
    
  } catch (error) {
    console.error('Newsletter confirmation error:', error);
    return redirect('/?newsletter=error', 302);
  }
};
