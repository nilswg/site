import { initI18n } from './i18n';
import { I18nProvider } from '@/components/I18nProvider';

export default async function WithI18n({ lang, namespaces, children }: { lang: string; namespaces: string[]; children: React.ReactNode }) {
    const { resources } = await initI18n(lang, namespaces);
    return (
        <I18nProvider resources={resources} locale={lang} namespaces={namespaces}>
            {children}
        </I18nProvider>
    );
}
