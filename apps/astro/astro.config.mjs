import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import { $config } from './lib/config';
const config = $config();

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), astroI18next()],
  vite: {
    build: {
      rollupOptions: {
        external: ['i18next-http-backend', 'i18next-browser-languagedetector']
      }
    }
  }
});