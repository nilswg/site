import { Layout } from '@/layouts/Layout';
import { BlogContent } from '@/components/BlogContent';

export default async function Blog({ params }: { params: { locale: string } }) {
    return (
        <Layout lang={params.locale} namespaces={['home', 'common']}>
            <div className="mt-[5rem] w-full">
                <BlogContent />
            </div>
        </Layout>
    );
}
