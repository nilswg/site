'use client';

import { createInstance, Resource } from 'i18next';
import { UserConfig } from 'next-i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

type Props_LocaleProvider = {
    locale: string;
    children: React.ReactNode;
    namespaces: string[];
    resources: import('i18next').Resource;
};

type Args2 = {
    locale: string;
    namespaces: string[];
    resources: Resource;
    i18nInstance: import('next-i18next').I18n;
};

/**
 * 使用已經初始化的完成 i18n 實例
 */
const enableI18nInstance = (i18nConfig: UserConfig['i18n']) => (args: Args2) => {
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

const i18n = createInstance();
export const $I18nProvider =
    (i18nConfig: import('next-i18next').UserConfig['i18n']): React.FC<Props_LocaleProvider> =>
    ({ children, locale, namespaces, resources }) => {
        enableI18nInstance(i18nConfig)({ locale, namespaces, resources, i18nInstance: i18n });
        return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
    };
