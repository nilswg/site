'use client';

import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { cn } from '@nilswg/utils';
import { BiDownload } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { useToasts } from './stores/toasts';
import { download } from './utils/fileSaver';

type Props_ResumeDownloadButton = {
    lang: string;
    prompt: string;
    errorDict: Record<string, string>;
    className?: string;
};

export const ResumeDownloadButton: FC<Props_ResumeDownloadButton> = ({ lang, prompt, errorDict, className }) => {
    const { loading, downloadResume } = useResumeDownload(lang, prompt, errorDict);
    return (
        <button
            id="resume-download-btn"
            onClick={downloadResume}
            disabled={loading}
            className={cn(
                'absolute left-4 top-2 z-[100] mb-[1.5rem]',
                'inline-block rounded-full px-4 py-4',
                'font-medium shadow-lg duration-300',
                'hover:bg-[#403A3A] hover:text-[#FAFAFA] disabled:bg-gray-200',
                className,
            )}>
            {loading ? <Loading /> : <BiDownload />}
        </button>
    );
};

const useResumeDownload = (lang: string, promptStr: string, errorDict: Record<string, string>) => {
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();
    const downloadResume = useCallback(async () => {
        const password = prompt(promptStr);
        if (!password) return;
        setLoading(true);

        await fetch(`/api/resume?lang=${lang}&password=${password}`)
            .then((response) => {
                if (!response.ok) {
                    throw response; // 錯誤則返回錯誤信息
                }
                return response.blob(); // 成功處理，返回 blob
            })
            .then((blob) => download(blob, 'resume.pdf')) // 下載 resume.pdf
            .catch(async (errResp) => {
                /**
                 * 發生錯誤時，返回的會是 json 格式的錯誤信息
                 * 這裡會是一個非同步的事件，需要再用 async/await 來處理
                 */
                const { type, code } = await errResp.json();
                addToast({ type, text: errorDict?.[code] || 'download resume failed.' });
            });

        setLoading(false);
    }, []);

    return { loading, downloadResume };
};

const Loading: FC = () => (
    <span className="h-4 w-4 bg-[#403A3A]">
        <CgSpinner className={`animate-[spin_1s_linear_infinite] text-[#403A3A]`} />
    </span>
);
