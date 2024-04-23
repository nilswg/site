import { initI18n } from '@/i18n';
import WithI18n from '@/layouts/withI18n';
import { PageLoader, Toasts } from '@nilswg-site/ui';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export async function Layout({ lang, namespaces, children }: { lang: string; namespaces: string[]; children: React.ReactNode }) {
    return (
        <WithI18n lang={lang} namespaces={namespaces}>
            <Navbar />
            <main className="w-full">{children}</main>
            <Footer />
            <PageLoader />
            <Toasts />
        </WithI18n>
    );
}
