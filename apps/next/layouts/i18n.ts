import { initializeI18n } from '@nilswg/i18n-next';
import i18nConfig from '../i18n.config';

export const initI18n = initializeI18n(i18nConfig, (language, namespace) => {
    return import(`../../public/locales/${language}/${namespace}.json`);
});
