import Opening from '@/feats/Opening';
import { Layout } from '@/layouts/Layout';
import { DecTag } from '@nilswg-site/ui';

export default async function Home({ params }: { params: { locale: string } }) {
    return (
        <Layout lang={params.locale} namespaces={['home', 'common']}>
            <div className="mt-[var(--navbar-height)]">
                <DecTag className="ml-4 text-xl leading-10">{'<html>'}</DecTag>
                <DecTag className="ml-6 text-xl leading-10">{'<body>'}</DecTag>
                <Opening />
                <DecTag className="ml-6 text-xl leading-10">{'</body>'}</DecTag>
                <DecTag className="ml-4 text-xl leading-10">{'</html>'}</DecTag>
            </div>
        </Layout>
    );
}
