// @ts-check
import { copyFile } from "node:fs/promises";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import varlockAstroIntegration from "@varlock/astro-integration";
import { defineConfig } from "astro/config";

/**
 * `@astrojs/sitemap` writes an index as `sitemap-index.xml`. Keep the
 * conventional `sitemap.xml` URL available too, without maintaining a second
 * sitemap by hand.
 */
const sitemapAlias = {
  name: "sitemap-alias",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      await copyFile(new URL("sitemap-index.xml", dir), new URL("sitemap.xml", dir));
    },
  },
};

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
    sitemapAlias,
    varlockAstroIntegration({ ssrInjectMode: "auto-load" }),
  ],
  // Fully static: every page is prerendered, so any static host (Hostinger
  // included) can serve dist/ with no Node process.
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
