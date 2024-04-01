import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { $config } from './lib/config';
const config = $config();

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()]
});