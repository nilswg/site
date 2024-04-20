'use client';

import type { FC, ReactNode } from 'react';
import { useCallback, useMemo } from 'react';
import { cn } from '@nilswg/utils';

type Props_EnChButton = {
    className: string;
    children: ReactNode;
    lang: string;
};

type EnChCompoundComponent = FC<Props_EnChButton> & {
    CheckBox: FC<{ className: string; lang: string; useDefault:boolean }>;
};

const texts = {
    en: ['EN', 'CH'],
    'zh-TW': ['英', '中'],
};

export const EnChButton: EnChCompoundComponent = ({ className, children, lang }) => {
    const [en, ch] = useMemo(() => texts[lang as keyof typeof texts], []);
    return (
        <label className={`font-russon flex cursor-pointer items-center gap-1 px-2 py-2 ${className}`}>
            <span>{en}</span>
            {children}
            <span>{ch}</span>
        </label>
    );
};

EnChButton.CheckBox = ({ className, lang, useDefault }) => {
    const handleLocaleChange = useCallback(() => {
        const newLang = lang === 'en' ? 'zh-TW' : 'en';
        switchLanguage(newLang, useDefault);
        saveLocaleToCookie(newLang);
    }, []);

    return (
        <input
            type="checkbox"
            className={cn(
                'box-content inline-block h-4 w-8 cursor-pointer appearance-none border border-white',
                'before:absolute before:h-4 before:w-4 before:bg-white before:transition-transform',
                'before:duration-300 before:ease-in-out before:content-[""] group-hover:border-sky-500 before:group-hover:bg-sky-500',
                lang === 'en' ? 'before:translate-x-0' : 'before:translate-x-full',
                className,
            )}
            onChange={handleLocaleChange}
            checked={lang === 'en' ? true : false}
        />
    );
};

function switchLanguage(language: string, useDefault = false) {
    // 在這個函數中，你可以根據所選的語言生成新的URL
    var currentPath = window.location.pathname; // 取得目前的路徑
    var newPath = '';

    // // 根據所選的語言來修改路徑
    switch (language) {
        case 'en':
            newPath = currentPath.replace(/\/zh-TW\/?/, useDefault ? '/en/' : '/'); // 如果 useDefault 為 true，則會將 /zh-TW/ 替換為 /en/
            break;
        case 'zh-TW':
            newPath = currentPath.split('/')[1] === 'en' ? currentPath.replace(/\/en\/?/, '/zh-TW/') : '/zh-TW' + currentPath;
            break;
    }

    // 將網頁重新導向到新的URL
    window.history.pushState({}, '', newPath); //
    window.location.reload();
}

function saveLocaleToCookie(locale: string) {
    /**
     * 當使用者自行切換使用的語言時，將結果保存至 cookies 中。
     * 便於 i18n 下次瀏覽網站時，會自動跳轉到對應語言的網頁。
     *
     * 請參閱: https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
     *
     * 但是，如果在 next.config.js 中，設置 localeDetection = false 時，
     * 將會導致此功能被關閉。
     *
     * 請參閱: https://nextjs.org/docs/advanced-features/i18n-routing#disabling-automatic-locale-detection
     */
    // cookie.set('NEXT_LOCALE', locale, { expires: 365 });
}
