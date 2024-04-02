import { createInstance, Resource } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nRouter } from 'next-i18n-router';
import { type UserConfig } from 'next-i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

const i18n = createInstance();
export const initializeI18n =
    (i18nConfig: UserConfig['i18n'], $resources: (language: string, namespace: string) => Promise<Resource>) =>
    async (locale: string, namespaces: string[]) => {
        i18n.use(initReactI18next).use(resourcesToBackend($resources));
        await i18n.init({
            lng: locale,
            fallbackLng: i18nConfig.defaultLocale,
            supportedLngs: i18nConfig.locales,
            defaultNS: namespaces[0],
            fallbackNS: namespaces[0],
            ns: namespaces,
            preload: i18nConfig.locales,
        });

        return {
            i18n: i18n,
            resources: i18n.services.resourceStore.data,
            t: i18n.t,
        };
    };

export function createMiddleware(i18nConfig: UserConfig['i18n']) {
    /**
     * @param {import('next/server').NextRequest} request
     * @returns
     */
    return (request: import('next/server').NextRequest) => i18nRouter(request, i18nConfig);
}
