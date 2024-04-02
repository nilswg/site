'use client';

import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { InitTranslations, $initTranslations2 } from './$initTranslations';

type Props_LocaleProvider = {
    locale: string;
    children: React.ReactNode;
    namespaces: string[];
    resources: import('i18next').Resource;
};

const i18n = createInstance();
export const $TranslationProvider =
    (initTranslations: InitTranslations, i18nConfig: import('next-i18next').UserConfig['i18n']): React.FC<Props_LocaleProvider> =>
    ({ children, locale, namespaces, resources }) => {
        $initTranslations2(i18nConfig)({ locale, namespaces, resources, i18nInstance: i18n });
        return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
    };
