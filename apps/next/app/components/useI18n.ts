import { useTranslation as nextUseTranslation } from 'next-i18next';

const defaultLocale = 'en';

const locales = new Set(['en', 'zh-TW']);
const isLocale = (locale: string) => locales.has(locale);

/**
 * ex: http://localhost:3000/zh-TW/aaa
 * result: zh-TW
 *
 * ex: http://localhost:3000/en/aaa
 * result: en
 *
 * ex: http://localhost:3000/aaa
 * result:
 *
 * @returns zh-TW
 */
export const getClientLocale = () => {
    // 從 window.location.pathname 中取得語系
    const pathname = window.location.pathname;
    const paths = pathname.split('/');
    if (paths.length > 1 && isLocale(paths[1])) {
        return paths[1];
    }
    return defaultLocale;
};

export const useTranslation = nextUseTranslation;

export const useI18n = nextUseTranslation