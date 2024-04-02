// import { LocaleProvider } from '@/components/LocaleProvider';
import { initTranslations } from '@/i18n';
import { Example } from '@/components/Example';
import { TranslationProvider } from '@/components/TranslationProvider';
const $resources = (language: string, namespace: string) => import(`/public/locales/${language}/${namespace}.json`);
export default async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { resources } = await initTranslations({
        locale,
        namespaces: ['home', 'common'],
        $resources,
    });
    return (
        <TranslationProvider resources={resources} locale={locale} namespaces={['home', 'common']}>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Example />
            </main>
        </TranslationProvider>
    );
}
