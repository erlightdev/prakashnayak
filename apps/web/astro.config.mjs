// @ts-check
import { rename, rm } from "node:fs/promises";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import varlockAstroIntegration from "@varlock/astro-integration";
import { defineConfig } from "astro/config";

/**
 * `@astrojs/sitemap` writes an index and a child sitemap by default. This
 * portfolio is well below the 50,000-URL sitemap limit, so publish its single
 * generated child as the conventional `/sitemap.xml` instead.
 */
const sitemapAlias = {
  name: "sitemap-alias",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      await rename(new URL("sitemap-0.xml", dir), new URL("sitemap.xml", dir));
      await rm(new URL("sitemap-index.xml", dir));
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
      entryLimit: 50_000,
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
