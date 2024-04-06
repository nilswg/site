import { defineConfig, sharpImageService } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next";
import { $config } from './lib/config';

const config = $config();

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), astroI18next()],
  image: {
    service: sharpImageService(),
  },
  // vite: {
  //   build: {
  //     rollupOptions: {
  //       external: ['i18next-http-backend', 'i18next-browser-languagedetector']
  //     }
  //   }
  // }
});

// function CustomHmr() {
//   return {
//     name: 'custom-hmr',
//     enforce: 'post',
//     // HMR
//     handleHotUpdate({ file, server }) {
//       if (file.endsWith('.json')) {
//         console.log('reloading json file...');
//         server.ws.send({
//           type: 'full-reload',
//           path: '*'
//         });
//       }
//     },
//   }
// }