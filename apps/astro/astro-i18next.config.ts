/**
 * @type {import('astro-i18next').AstroI18nextConfig}
 */
const config = {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW'],
    load: ['server', 'client'],
    i18nextServer: {
        debug: false,
    },
    i18nextClient: {
        debug: false,
    },
    // i18nextServerPlugins: {
    //   "{initReactI18next}": "react-i18next",
    // },
    // i18nextClientPlugins: {
    //   "{initReactI18next}": "react-i18next",
    // },
    namespaces: ['home', 'common', 'resume'],
    defaultNamespace: 'common',
    resourcesBasePath: '/locales',
};

export default config;
