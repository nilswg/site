import { createInstance, Resource } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nRouter } from 'next-i18n-router';
import { type UserConfig } from 'next-i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

type Args = {
    locale: string;
    namespaces: string[];
    $resources: (language: string, namespace: string) => Promise<any>;
};

export const $initTranslations = (i18nConfig: UserConfig['i18n']) => async (args: Args) => {
    const i18n = createInstance();
    i18n.use(initReactI18next).use(resourcesToBackend(args.$resources!));
    await i18n.init({
        lng: args.locale,
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        defaultNS: args.namespaces[0],
        fallbackNS: args.namespaces[0],
        ns: args.namespaces,
        preload: i18nConfig.locales,
    });

    return {
        i18n: i18n,
        resources: i18n.services.resourceStore.data,
        t: i18n.t,
    };
};

type Args2 = {
    locale: string;
    namespaces: string[];
    resources: Resource;
    i18nInstance: import('next-i18next').I18n;
};
export const $initTranslations2 = (i18nConfig: UserConfig['i18n']) => (args: Args2) => {
    args.i18nInstance.use(initReactI18next).init({
        lng: args.locale,
        resources: args.resources,
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        defaultNS: args.namespaces[0],
        fallbackNS: args.namespaces[0],
        ns: args.namespaces,
        preload: [],
    });
};

export type InitTranslations = ReturnType<typeof $initTranslations>;

export function createMiddleware(i18nConfig: UserConfig['i18n']) {
    /**
     * @param {import('next/server').NextRequest} request
     * @returns
     */
    return (request: import('next/server').NextRequest) => i18nRouter(request, i18nConfig);
}
