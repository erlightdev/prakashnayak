// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import varlockAstroIntegration from "@varlock/astro-integration";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    varlockAstroIntegration({ ssrInjectMode: "auto-load" }),
  ],
  // Fully static: every page is prerendered, so any static host (Hostinger
  // included) can serve dist/ with no Node process.
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
