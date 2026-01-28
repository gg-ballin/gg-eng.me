import type { APIRoute } from 'astro';
import { getMetrics } from '@/lib/analytics';

export const prerender = false;

export const GET: APIRoute = async ({ url, locals }) => {
  // Optional authentication via query parameter
  const providedToken = url.searchParams.get('token');
  const expectedToken = (locals.env?.METRICS_TOKEN as string | undefined) 
    || import.meta.env.METRICS_TOKEN;
  
  // If token is configured, require it
  if (expectedToken && providedToken !== expectedToken) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  
  // Get date from query parameter (defaults to today)
  const dateParam = url.searchParams.get('date');
  let date: string;
  
  if (dateParam) {
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateParam)) {
      return new Response(
        JSON.stringify({ error: 'Invalid date format. Use YYYY-MM-DD' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    date = dateParam;
  } else {
    date = new Date().toISOString().split('T')[0];
  }
  
  // Get KV namespace
  const analyticsKv = locals.env?.ANALYTICS_KV as KVNamespace | undefined;
  
  if (!analyticsKv) {
    return new Response(
      JSON.stringify({ error: 'Analytics not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  
  // Retrieve metrics
  const metrics = await getMetrics(analyticsKv, date);
  
  return new Response(
    JSON.stringify({ date, metrics }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
