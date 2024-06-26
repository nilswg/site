import { Layout } from '@/layouts/Layout';
import { MyResume } from '@/components/MyResume';

export default async function Resume({ params }: { params: { locale: string } }) {
    return (
        <Layout lang={params.locale} namespaces={['home', 'common', 'resume']}>
            <div className="mt-[5rem] w-full">
                <MyResume />
            </div>
        </Layout>
    );
}
