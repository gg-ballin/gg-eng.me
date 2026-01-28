// Polyfill stub for Node.js buffer module in Cloudflare Workers
// Cloudflare Workers have native TextEncoder/TextDecoder and ArrayBuffer support
// This provides a minimal Buffer-like interface for Resend

class BufferStub {
  private data: Uint8Array;

  constructor(data?: any, encoding?: string) {
    if (typeof data === 'string') {
      const encoder = new TextEncoder();
      this.data = encoder.encode(data);
    } else if (data instanceof ArrayBuffer) {
      this.data = new Uint8Array(data);
    } else if (Array.isArray(data)) {
      this.data = new Uint8Array(data);
    } else if (data instanceof Uint8Array) {
      this.data = data;
    } else if (typeof data === 'number') {
      this.data = new Uint8Array(data);
    } else {
      this.data = new Uint8Array(0);
    }
  }

  get length(): number {
    return this.data.length;
  }

  [index: number]: number;
  
  static from(data: any, encoding?: string): BufferStub {
    return new BufferStub(data, encoding);
  }

  static alloc(size: number, fill?: number | string): BufferStub {
    const buf = new BufferStub(size);
    if (fill !== undefined) {
      if (typeof fill === 'string') {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(fill);
        buf.data.set(encoded);
      } else {
        buf.data.fill(fill);
      }
    }
    return buf;
  }

  toString(encoding: string = 'utf8'): string {
    const decoder = new TextDecoder(encoding === 'base64' ? undefined : encoding);
    return decoder.decode(this.data);
  }

  toJSON() {
    return Array.from(this.data);
  }

  equals(other: BufferStub): boolean {
    if (this.data.length !== other.data.length) return false;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== other.data[i]) return false;
    }
    return true;
  }

  // Make it work like Uint8Array for array access
  get(index: number): number {
    return this.data[index];
  }

  set(index: number, value: number): void {
    this.data[index] = value;
  }

  // Convert to Uint8Array when needed
  valueOf(): Uint8Array {
    return this.data;
  }
}

// Export as both default and named exports
export const Buffer = BufferStub;
export default BufferStub;
