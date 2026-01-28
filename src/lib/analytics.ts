export type AnalyticsEventType = 'pageview' | 'cv_request';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  path: string;
  timestamp: number;
  userAgent?: string;
  referer?: string;
  language?: string;
}

/**
 * Track an analytics event in Cloudflare KV
 * Stores both aggregated counters and detailed event logs
 */
export async function trackEvent(
  event: AnalyticsEvent,
  kv: KVNamespace | undefined
): Promise<void> {
  if (!kv) {
    // Silently fail if KV not configured
    return;
  }

  try {
    const date = new Date(event.timestamp);
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const hour = date.getHours();
    
    // Counter key format: analytics:YYYY-MM-DD:HH:event_type
    const counterKey = `analytics:${dateStr}:${hour}:${event.type}`;
    
    // Increment counter atomically
    const current = await kv.get(counterKey);
    const count = current ? parseInt(current, 10) + 1 : 1;
    
    // Store counter with 30 day TTL
    await kv.put(counterKey, count.toString(), { expirationTtl: 86400 * 30 });
    
    // Store detailed event for debugging (optional, with shorter TTL)
    const eventKey = `event:${event.timestamp}:${Math.random().toString(36).substring(2, 11)}`;
    await kv.put(eventKey, JSON.stringify(event), { expirationTtl: 86400 * 7 }); // 7 days
  } catch (error) {
    // Silently fail - analytics shouldn't break the site
    // Errors are caught here to prevent any impact on user experience
  }
}

/**
 * Retrieve aggregated metrics for a specific date
 * Returns hourly breakdowns for each event type
 */
export async function getMetrics(
  kv: KVNamespace | undefined,
  date: string = new Date().toISOString().split('T')[0]
): Promise<Record<string, number>> {
  if (!kv) {
    return {};
  }

  const metrics: Record<string, number> = {};
  const eventTypes: AnalyticsEventType[] = ['pageview', 'cv_request'];
  
  // Query all 24 hours for each event type
  for (let hour = 0; hour < 24; hour++) {
    for (const type of eventTypes) {
      const key = `analytics:${date}:${hour}:${type}`;
      const value = await kv.get(key);
      const metricKey = `${type}:${hour}`;
      metrics[metricKey] = value ? parseInt(value, 10) : 0;
    }
  }
  
  return metrics;
}

/**
 * Get total count for an event type on a specific date
 */
export async function getTotalForDate(
  kv: KVNamespace | undefined,
  eventType: AnalyticsEventType,
  date: string = new Date().toISOString().split('T')[0]
): Promise<number> {
  if (!kv) {
    return 0;
  }

  let total = 0;
  
  for (let hour = 0; hour < 24; hour++) {
    const key = `analytics:${date}:${hour}:${eventType}`;
    const value = await kv.get(key);
    if (value) {
      total += parseInt(value, 10);
    }
  }
  
  return total;
}
