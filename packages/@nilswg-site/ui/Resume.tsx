'use client';

import type { FC, FCX, ReactNode } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { cn } from '@nilswg/utils';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { BiDownload, BiEnvelope, BiMap, BiPhone } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';
import { Experience } from './ExperienceTimeline';
import { useToasts } from './stores/toasts';
import { download } from './utils/fileSaver';
import { getJobDate } from './utils/getJobDate';

type ResumeCompoundComponent = FC<{ children: ReactNode }> & {
    DownloadButton: FC<{ loading: boolean; onClick: () => void }>;
    Certificates: FCX<{ lang: string; title: string }>;
    Experience: FCX<{
        lang: string;
        title: string;
        experiences: Partial<Experience>[];
    }>;
    Information: FCX<{
        lang: string;
        name: string;
        jobTitle: string;
        address: string;
        children: ReactNode;
    }>;
    Languages: FCX<{ lang: string; title: string }>;
    Profile: FCX<{ lang: string; title: string; profileTexts: string[] }>;
    Skills: FCX<{ lang: string; title: string }>;
    Social: FCX<{ lang: string; title: string }>;
};

export const Resume: ResumeCompoundComponent = ({ children }) => {
    return (
        <div id="area-cv" className="grid min-h-[1122px] w-[800px] grid-cols-[.5fr_1fr] bg-[#FCFCFC] shadow-[0_0_8px_rgba(13,12,12,.15)]">
            {children}
        </div>
    );
};

Resume.DownloadButton = ({ loading, onClick }) => {
    return (
        <button
            id="resume-download-btn"
            onClick={onClick}
            disabled={loading}
            className="absolute left-4 top-2 z-[100] mb-[1.5rem] inline-block rounded-full px-4 py-4 font-medium shadow-lg duration-300 hover:bg-[#403A3A] hover:text-[#FAFAFA] disabled:bg-gray-200">
            {loading ? <Loading /> : <BiDownload />}
        </button>
    );
};

export const useResumeDownload = (lang: string, promptStr: string, errorDict: Record<string, string>) => {
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
            .then((blob) => {
                download(blob, 'resume.pdf'); // 下載文件
            })
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

Resume.Certificates = ({ lang, className, title }) => {
    const { fontStyles } = useResume(lang);
    return (
        <div className={cn('pl-0', fontStyles.base, className)}>
            <SectionTitle>{title}</SectionTitle>
            <ul className="ml-3 flex">
                <li key={`resume_toeic`} className="flex items-center gap-3">
                    <Circle />
                    <span className="inline-block w-[16rem] text-[#403A3A]">TOEIC : 595</span>
                </li>
            </ul>
        </div>
    );
};
Resume.Experience = memo(({ lang, className, title, experiences }) => {
    const { fontStyles } = useResume(lang);
    return (
        <section className={cn('py-6', fontStyles.base, className)}>
            <SectionTitle>{title}</SectionTitle>
            {experiences?.length &&
                experiences.map((item) => (
                    <div key={`resume_exp_${item.companyName}`} className="flex">
                        <div className="pr-3">
                            <span className="relative mt-1 block h-3 w-3 rounded-full bg-[#707070]"></span>
                            <span className="block h-[105%] w-[2px] translate-x-[5px] bg-[#707070]"></span>
                        </div>
                        <div className="mb-6 grid gap-1">
                            <h2 className={cn('text-[1rem] font-semibold text-[#403A3A]', fontStyles.jobTitle)}>{item.jobTitle}</h2>
                            <h3 className={cn('text-[.875rem] font-semibold text-[#403A3A]', fontStyles.jobPosition)}>
                                {item.jobPosition + ' | ' + item.companyName}
                            </h3>
                            <span className="text-[.85rem] text-gray-500">
                                {getJobDate(item.begintime, lang)} - {getJobDate(item.endtime, lang)}
                            </span>
                            <span className="text-[.85rem] font-normal tracking-normal text-[#0B0A0A]">
                                {item?.texts?.map((text, i) => (
                                    <p key={i} className={`my-0 flex pl-2`}>
                                        <span className="inline-block">-&nbsp;</span>
                                        <span className="inline-block" key={i}>
                                            {text}
                                        </span>
                                    </p>
                                ))}
                            </span>
                        </div>
                    </div>
                ))}
        </section>
    );
});

Resume.Information = ({ lang, className, name, jobTitle, address, children }) => {
    const { fontStyles } = useResume(lang);
    return (
        <section className={cn('py-6', fontStyles.base, className)}>
            <div className="flex flex-col items-center">
                <div className="relative h-[100px] w-[100px] rounded-full">{children}</div>
                <h1 id="resume_name" className="mt-2 text-center text-xl font-semibold uppercase tracking-widest text-[#403A3A]">
                    {name}
                </h1>
                <h3 className="text-[.938rem]">{jobTitle}</h3>
            </div>
            <div className="mt-10 flex flex-col gap-3">
                <span className="inline-flex items-center text-[.875rem] text-[#403A3A]">
                    <BiMap className="mr-1 text-[1.2rem]" /> {address}
                </span>
                <span className="inline-flex items-center text-[.875rem] text-[#403A3A]">
                    <BiEnvelope className="mr-1 text-[1.2rem]" /> nilsonweng@gmail.com
                </span>
                {process.env.NODE_ENV === 'development' && (
                    <span className="inline-flex items-center text-[.875rem] text-[#403A3A]">
                        <BiPhone className="mr-1 text-[1.2rem]" /> 0988-572-252
                    </span>
                )}
            </div>
        </section>
    );
};
Resume.Languages = ({ lang, className, title }) => {
    const { fontStyles } = useResume(lang);
    return (
        <div className={cn('pl-0', fontStyles.base, className)}>
            <SectionTitle>{title}</SectionTitle>
            <ul className="ml-3 flex flex-col">
                <li className="flex items-center gap-3">
                    <Circle />
                    <span className="inline-block w-[8rem] text-[#403A3A]">{lang === 'en' ? 'Chinese, English' : '中文、英文'}</span>
                </li>
            </ul>
        </div>
    );
};
Resume.Profile = memo(({ lang, className, title, profileTexts }) => {
    const { fontStyles } = useResume(lang);
    return (
        <section className={cn('py-6', fontStyles.base, className)}>
            <SectionTitle>{title}</SectionTitle>
            <div className="text-[.875rem]">
                {profileTexts.map((text, i) => (
                    <p key={i} className="mb-2">
                        {text}
                    </p>
                ))}
            </div>
        </section>
    );
});
Resume.Skills = memo(({ lang, className, title }) => {
    const { fontStyles } = useResume(lang);
    const skillCategories = useMemo(() => $skillCategories(lang), [lang]);
    return (
        <section className={cn('py-6', fontStyles.base, className)}>
            <SectionTitle>{title}</SectionTitle>
            <div className="ml-3 grid grid-cols-3">
                {skillCategories.map((category) => (
                    <ul key={category.name} className="flex flex-col items-start">
                        <h3>{category.name}</h3>
                        <span className="mb-2 h-1 w-[calc(8rem)] border-b-2"></span>
                        {category.skills.map((skill) => (
                            <li key={skill} className="flex items-center gap-3">
                                <span className="inline-block h-[5px] w-[5px] items-center rounded-full bg-[#403A3A]"></span>
                                <span className="inline-block w-[8rem] text-[#403A3A]">{skill}</span>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </section>
    );
});
Resume.Social = ({ lang, title }) => {
    return (
        <section className="font-roboto_condensed py-6">
            <SectionTitle>{title}</SectionTitle>
            <div className="flex flex-col gap-2 pt-1">
                <a
                    className="inline-flex items-center text-[.8rem] text-[#403A3A] hover:text-[#0B0A0A]"
                    href="https://www.linkedin.com/in/nilson-weng-470672218/">
                    <AiFillLinkedin className="mr-1 text-[1.1rem]" />
                    linkedin.com/in/nilson-weng-470672218
                </a>
                <a className="inline-flex items-center text-[.8rem] text-[#403A3A] hover:text-[#0B0A0A]" href="https://github.com/nilswg">
                    <AiFillGithub className="mr-1 text-[1.1rem]" /> github.com/nilswg
                </a>
            </div>
        </section>
    );
};

const SectionTitle: FC<{ children: ReactNode }> = ({ children }) => {
    return <h2 className="mb-2 text-[1.1rem] font-semibold uppercase tracking-[.35rem]">{children}</h2>;
};

const Circle: FC = () => <span className="inline-block h-[5px] w-[5px] items-center rounded-full bg-[#403A3A]"></span>;

const Loading: FC = () => (
    <span className="h-4 w-4 bg-[#403A3A]">
        <CgSpinner className={`animate-[spin_1s_linear_infinite] text-[#403A3A]`} />
    </span>
);

const useResume = (lang: string) => {
    const fontStyles = $fontStyles(lang)! as Fonts;
    return { lang, fontStyles };
};

type Fonts = {
    base: string;
    profile: string;
    jobTitle: string;
    jobPosition: string;
};

// --h1-font-size: 1.5rem;
// --h2-font-size: 1.25rem;
// --h3-font-size: 1rem;
// --normal-font-size: .938rem;
// --small-font-size: .875rem;
// --smaller-font-size: .813rem;

const $fontStyles = (lang: string) => {
    return {
        en: {
            base: /*tw:*/ 'font-roboto',
            profile: /*tw:*/ 'font-roboto_condensed',
            jobTitle: /*tw:*/ 'font-roboto tracking-wide',
            jobPosition: /*tw:*/ 'font-roboto tracking-wide',
        },
        'zh-TW': {
            base: /*tw:*/ 'font-zhtw',
            profile: /*tw:*/ 'font-zhtw',
            jobTitle: /*tw:*/ 'font-zhtw tracking-widest',
            jobPosition: /*tw:*/ 'font-zhtw tracking-wider',
        },
    }[lang];
};

const $skillCategories = (lang: string) => {
    return [
        {
            name: lang === 'en' ? 'Front End' : '前端技能',
            skills: ['TypeScript', 'React', 'Redux', 'Tailwind', 'Angular', 'Babylon.js'],
        },
        {
            name: lang === 'en' ? 'Back End' : '後端技能',
            skills: ['Node.js', 'Next.js', 'Express', 'Docker', 'Redis', 'Linux'],
        },
        {
            name: lang === 'en' ? 'Dev-Tools' : '開發工具',
            skills: ['Webpack', 'Rollup', 'Vite', 'NPM', 'Git', 'Prettier'],
        },
    ];
};
