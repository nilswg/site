import type { FC } from 'react';
import { Resume, useResumeDownload } from '@nilswg-site/ui';

export const ResumeDownloadButton: FC<{ lang: string; promptStr: string; errorDict:Record<string, string> }> = ({ lang, promptStr, errorDict }) => {
    const { loading, downloadResume } = useResumeDownload(lang, promptStr, errorDict);
    return <Resume.DownloadButton loading={loading} onClick={downloadResume} />;
};
