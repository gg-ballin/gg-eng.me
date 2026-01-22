// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";

// Read package.json at build time to inject version
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "package.json"), "utf-8")
);

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Inject version at build time (accessible via import.meta.env.PUBLIC_APP_VERSION)
      "import.meta.env.PUBLIC_APP_VERSION": JSON.stringify(
        packageJson.version || "1.0.0"
      ),
    },
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
