import type { AstroI18nextConfig } from "node_modules/astro-i18next/src";

const config: AstroI18nextConfig = {
  defaultLocale: "en",
  locales: ["en", "zh-TW"],
  load: ["server", "client"],
  i18nextServer: {
    debug: false,
  },
  i18nextClient: {
    debug: false,
  },
  i18nextServerPlugins: {
    "{initReactI18next}": "react-i18next",
  },
  i18nextClientPlugins: {
    "{initReactI18next}": "react-i18next",
  },
  namespaces: ['home', 'common', 'blog', 'resume'],
  defaultNamespace: 'common',
};

export default config;