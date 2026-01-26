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
