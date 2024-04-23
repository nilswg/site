'use client';

import type { FC } from 'react';
import { Resume, useResumeDownload } from '@nilswg-site/ui';
import { useTranslation } from 'next-i18next';

export const ResumeDownloadButton: FC<{ lang: string }> = ({ lang }) => {
    const { t } = useTranslation();
    const promptStr = t('common:enter_password');
    const errorDict = t('common:errorDict', { returnObjects: true }) as Record<string, string>;
    const { loading, downloadResume } = useResumeDownload(lang, promptStr, errorDict);
    return <Resume.DownloadButton loading={loading} onClick={downloadResume} />;
};
