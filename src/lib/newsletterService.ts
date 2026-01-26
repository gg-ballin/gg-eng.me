export interface NewsletterSubscriber {
  email: string;
  subscribedAt: string;
  confirmed: boolean;
  confirmationToken?: string;
}

// KVNamespace type from Cloudflare Workers
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string }): Promise<{ keys: Array<{ name: string }> }>;
}

export class NewsletterService {
  private kv: KVNamespace | undefined;
  
  constructor(kv?: KVNamespace) {
    this.kv = kv;
  }
  
  /**
   * Generate a secure random token for email confirmation
   * Uses Web Crypto API (compatible with Cloudflare Workers)
   */
  private generateToken(): string {
    // Use globalThis.crypto to access Web Crypto API
    const webCrypto = globalThis.crypto;
    
    // Use crypto.randomUUID if available (Web Crypto API)
    if (webCrypto && 'randomUUID' in webCrypto && typeof webCrypto.randomUUID === 'function') {
      return webCrypto.randomUUID();
    }
    // Fallback: generate random hex string
    if (webCrypto && 'getRandomValues' in webCrypto && typeof webCrypto.getRandomValues === 'function') {
      const array = new Uint8Array(16);
      webCrypto.getRandomValues(array);
      return Array.from(array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    // Last resort fallback (should not happen in Cloudflare Workers)
    throw new Error('Web Crypto API not available');
  }
  
  /**
   * Subscribe an email to the newsletter (unconfirmed)
   */
  async subscribe(email: string): Promise<{ success: boolean; token?: string; error?: string }> {
    if (!this.kv) {
      return { success: false, error: 'KV storage not configured' };
    }
    
    try {
      // Check if already subscribed
      const existing = await this.kv.get(`newsletter:${email}`);
      if (existing) {
        const subscriber: NewsletterSubscriber = JSON.parse(existing);
        if (subscriber.confirmed) {
          return { success: false, error: 'Email already subscribed' };
        }
        // Resend confirmation if not confirmed
        return { success: true, token: subscriber.confirmationToken };
      }
      
      // Create new subscription
      const token = this.generateToken();
      const subscriber: NewsletterSubscriber = {
        email,
        subscribedAt: new Date().toISOString(),
        confirmed: false,
        confirmationToken: token,
      };
      
      // Store subscriber
      await this.kv.put(`newsletter:${email}`, JSON.stringify(subscriber));
      
      // Store confirmation token (expires in 24 hours)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      await this.kv.put(
        `newsletter:confirm:${token}`,
        JSON.stringify({ email, expiresAt: expiresAt.toISOString() }),
        { expirationTtl: 86400 } // 24 hours in seconds
      );
      
      return { success: true, token };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * Confirm a newsletter subscription using a token
   */
  async confirm(token: string): Promise<{ success: boolean; email?: string; error?: string }> {
    if (!this.kv) {
      return { success: false, error: 'KV storage not configured' };
    }
    
    try {
      // Get confirmation data
      const confirmData = await this.kv.get(`newsletter:confirm:${token}`);
      if (!confirmData) {
        return { success: false, error: 'Invalid or expired confirmation token' };
      }
      
      const { email, expiresAt } = JSON.parse(confirmData);
      
      // Check if token expired
      if (new Date(expiresAt) < new Date()) {
        await this.kv.delete(`newsletter:confirm:${token}`);
        return { success: false, error: 'Confirmation token has expired' };
      }
      
      // Get subscriber
      const subscriberData = await this.kv.get(`newsletter:${email}`);
      if (!subscriberData) {
        return { success: false, error: 'Subscriber not found' };
      }
      
      const subscriber: NewsletterSubscriber = JSON.parse(subscriberData);
      
      // Update to confirmed
      subscriber.confirmed = true;
      delete subscriber.confirmationToken;
      
      await this.kv.put(`newsletter:${email}`, JSON.stringify(subscriber));
      
      // Delete confirmation token
      await this.kv.delete(`newsletter:confirm:${token}`);
      
      return { success: true, email };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  /**
   * Get all confirmed subscribers (for sending newsletters)
   */
  async getConfirmedSubscribers(): Promise<string[]> {
    if (!this.kv) {
      return [];
    }
    
    try {
      // Note: KV doesn't support listing all keys efficiently
      // This is a limitation - in production, you might want to maintain a list
      // or use D1 database instead for better querying
      const list = await this.kv.list({ prefix: 'newsletter:' });
      const subscribers: string[] = [];
      
      for (const key of list.keys) {
        if (key.name.startsWith('newsletter:confirm:')) {
          continue; // Skip confirmation tokens
        }
        
        const data = await this.kv.get(key.name);
        if (data) {
          const subscriber: NewsletterSubscriber = JSON.parse(data);
          if (subscriber.confirmed) {
            subscribers.push(subscriber.email);
          }
        }
      }
      
      return subscribers;
    } catch (error) {
      console.error('Error getting subscribers:', error);
      return [];
    }
  }
  
  /**
   * Unsubscribe an email
   */
  async unsubscribe(email: string): Promise<{ success: boolean; error?: string }> {
    if (!this.kv) {
      return { success: false, error: 'KV storage not configured' };
    }
    
    try {
      await this.kv.delete(`newsletter:${email}`);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
