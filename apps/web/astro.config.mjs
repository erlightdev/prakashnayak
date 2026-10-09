// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import varlockAstroIntegration from "@varlock/astro-integration";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Absolute URLs for canonical and social share tags.
  site: "https://prakashnayak.com.np",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.endsWith("/404/"),
      changefreq: "monthly",
      lastmod: new Date(),
    }),
    varlockAstroIntegration({ ssrInjectMode: "auto-load" }),
  ],
  // Fully static: every page is prerendered, so any static host (Hostinger
  // included) can serve dist/ with no Node process.
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
