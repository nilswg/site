/**
 * Resume 列印功能是透過 puppeteer 對網站內容進行 pdf 快照。
 * 所以，resume/print 不是給用戶瀏覽，而是專給 puppeteer 生成履歷用。
 */
import { MyResume } from '@/components/MyResume';
import WithI18n from '@/layouts/withI18n';

export default async function ResumePrint({ params }: { params: { locale: string } }) {
    return (
        <WithI18n lang={params.locale} namespaces={['home', 'common', 'resume']}>
            <MyResume/>
        </WithI18n>
    );
}
