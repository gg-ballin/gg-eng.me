// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { fileURLToPath } from "node:url";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
    // KV namespace binding (configure in wrangler.toml or Cloudflare dashboard)
    // The namespace will be available as locals.runtime.env.NEWSLETTER_KV
  }),
  integrations: [mdx(), react()],
  vite: {
    // @ts-ignore - Tailwind Vite plugin type compatibility with Astro's Vite version
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@/components": fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
        "@/layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@/pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@/styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@/i18n": fileURLToPath(new URL("./src/i18n", import.meta.url)),
        "@/content": fileURLToPath(new URL("./src/content", import.meta.url)),
        "@/lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        // Redirect Node.js stream modules to polyfill stub for Cloudflare Workers
        "stream": fileURLToPath(new URL("./src/lib/stream-polyfill.ts", import.meta.url)),
        "chunks/stream": fileURLToPath(new URL("./src/lib/stream-polyfill.ts", import.meta.url)),
        "node:stream": fileURLToPath(new URL("./src/lib/stream-polyfill.ts", import.meta.url)),
      },
    },
    ssr: {
      noExternal: ['resend'],
      resolve: {
        conditions: ['worker', 'browser'],
      },
    },
    optimizeDeps: {
      exclude: ['resend'],
    },
    define: {
      // Stub out Node.js stream module for Cloudflare Workers
      // Note: Only valid JS identifiers can be used here (no special chars)
      'stream': 'undefined',
    },
    build: {
      rollupOptions: {
        external: (id) => {
          // Don't bundle Node.js stream modules
          if (id === 'stream' || id === 'chunks/stream' || id.startsWith('node:stream')) {
            return true;
          }
          return false;
        },
        output: {
          // Prevent creating chunks that reference stream
          manualChunks: undefined,
          // Use a function to control chunk naming and prevent stream chunks
          chunkFileNames: (chunkInfo) => {
            // Prevent chunks with stream in the name
            if (chunkInfo.name && chunkInfo.name.includes('stream')) {
              return 'chunks/[name]-[hash].js';
            }
            return 'chunks/[name]-[hash].js';
          },
        },
        plugins: [
          {
            name: 'resolve-stream-polyfill',
            resolveId(id) {
              // Intercept stream imports and redirect to polyfill
              if (id === 'stream' || id === 'chunks/stream' || id === 'node:stream') {
                return fileURLToPath(new URL("./src/lib/stream-polyfill.ts", import.meta.url));
              }
              return null;
            },
          },
        ],
      },
      commonjsOptions: {
        // Transform CommonJS modules that use streams
        transformMixedEsModules: true,
      },
    },
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
