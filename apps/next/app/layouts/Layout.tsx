import { initI18n } from '@/i18n';
import { PageLoader, Toasts } from '@nilswg-site/ui';
import { Footer } from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import { Navbar } from '@/components/Navbar';

export async function Layout({ lang, namespaces, children }: { lang: string; namespaces: string[]; children: React.ReactNode }) {
    const { resources } = await initI18n(lang, namespaces);
    return (
        <I18nProvider resources={resources} locale={lang} namespaces={namespaces}>
            <Navbar />
            <main className="w-full">{children}</main>
            <Footer />
            <PageLoader />
            <Toasts />
        </I18nProvider>
    );
}
