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
