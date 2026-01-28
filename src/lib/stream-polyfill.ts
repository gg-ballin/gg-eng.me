// Polyfill stub for Node.js stream module in Cloudflare Workers
// This prevents Resend from trying to import Node.js streams
// Resend should work fine without actual stream implementations in Workers

class StreamStub {
  constructor() {}
  pipe() { return this; }
  on() { return this; }
  once() { return this; }
  emit() { return this; }
  removeListener() { return this; }
  destroy() {}
  end() { return this; }
  write() { return true; }
  read() { return null; }
  pause() { return this; }
  resume() { return this; }
}

export const Readable = StreamStub;
export const Writable = StreamStub;
export const Transform = StreamStub;
export const Duplex = StreamStub;
export const PassThrough = StreamStub;
export const Stream = StreamStub;

export default {
  Readable,
  Writable,
  Transform,
  Duplex,
  PassThrough,
  Stream,
};
