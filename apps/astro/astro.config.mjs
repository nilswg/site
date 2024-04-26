import { defineConfig, sharpImageService } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
// import vercel from "@astrojs/vercel/serverless";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), tailwind(), astroI18next()],
  image: {
    service: sharpImageService()
  },
  vite: {
    build: {
      rollupOptions: {
        external: [
          'util',
          'stream', 'path', 'fs', 'path', 'events', 'child_process', 'os', 'astro', 'astro-i18next',
          // 'i18next',
          // "i18next-browser-languagedetector",
          // 'i18next-fs-backend',
          // 'i18next-http-backend',
          'react-icons', 'sharp'],
        /**
         *  @see https://github.com/vitejs/vite/issues/15012
         *  ignore the "use client" warnings in the first place
         */
        onLog: (level, log, handler) => {
          if (log?.cause?.message === `Can't resolve original location of error.`) {
            return
          }
          handler(level, log)
        }
      }
    }
  },
});
