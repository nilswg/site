# @nilswg/i18n-next
目的於方便在 Next app router 架構中設置並使用 i18n 。  

隱藏與 i18n 配置相關的依賴項與實作細節，僅開放幾個較重要的功能。



## 安裝
```
pnpm i react-i18next @nilswg/i18n-next 
```



## 使用範例
請依照下方步驟進行設置，如下:


### i18n.config.ts (一定要用默認導出)
```ts
/** @type {import("next-i18next").UserConfig} */
export default {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'en',
};
```


### middleware.ts
```ts
import i18nConfig from './i18n.config';
import { createMiddleware } from '@nilswg/i18n-next';

export const middleware = createMiddleware(i18nConfig);
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
```


### app/i18n.ts
```ts
import { initializeI18n } from '@nilswg/i18n-next';
import i18nConfig from '../i18n.config';

export const useI18n = initializeI18n(i18nConfig, (language, namespace) => {
    return import(`/public/locales/${language}/${namespace}.json`);
});
```


### app/components/I18nProvider.tsx
```ts
'use client';  // <= 一定要加

import { $I18nProvider } from '@nilswg/i18n-next';
import i18nConfig from '../../i18n.config';

export const I18nProvider = $I18nProvider(i18nConfig);
```


### app/[locale]/page.tsx
```tsx
import { initI18n } from '@/i18n';
import { Example } from '@/components/Example';
import { I18nProvider } from '@/components/I18nProvider';

export default async function Home(params: { locale: string }) {
    const { resources } = await initI18n(params.locale, ['home', 'common']);
    return (
        <I18nProvider resources={resources} locale={params.locale} namespaces={['home', 'common']}>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Example />
            </main>
        </I18nProvider>
    );
}
```


### app/components/Example.tsx
```tsx
'use client';

import { useTranslation } from 'react-i18next';

export const Example: React.FC = () => {
    const { t } = useTranslation();
    return <p> {JSON.stringify(t('...'))}</p>;
};
```
