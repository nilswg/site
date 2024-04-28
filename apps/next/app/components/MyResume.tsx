'use client';

import type { Experience } from '@nilswg-site/ui';
import { FC, useMemo } from 'react';
import Image from 'next/image';
import { Resume, ResumeDownloadButton } from '@nilswg-site/ui';
import { getI18nObjects, getI18nTextArray } from '@nilswg/i18n';
import { useTranslation } from 'next-i18next';
import selfHead from 'public/img/headshot.jpg';

export const MyResume: FC = () => {
    const { t } = useTranslation();
    const { lang, experience, resume, promptStr, errorDict } = useMemo(
        () => ({
            lang: t('common:lang'),
            experience: {
                title: t('home:experience.title'),
                items: getI18nObjects<Experience>(t, 'home:experience-timeline'),
            },
            resume: {
                profileTexts: getI18nTextArray(t, 'resume:profileTexts'),
                name: t('resume:name'),
                jobTitle: t('resume:jobtitle'),
                address: t('resume:address'),
                social: t('resume:social'),
                profile: t('resume:profile'),
                skills: t('resume:skills'),
                certificates: t('resume:certificates'),
                languages: t('resume:languages'),
            },
            promptStr: t('common:enter_password'),
            errorDict: t('common:errorDict', { returnObjects: true }) as Record<string, string>,
        }),
        [],
    );

    return (
        <div className="relative mx-auto max-h-[1122px] max-w-[830px] overflow-hidden bg-[#FCFCFC] shadow-[0_-1px_4px_rgba(0,0,0,.1)]">
            <ResumeDownloadButton lang={lang} prompt={promptStr} errorDict={errorDict} />
            <div className="flex w-full justify-center">
                <Resume>
                    <div className="w-full bg-[#F0EFEF]">
                        <div className="mx-4">
                            <Resume.Information lang={lang} name={resume.name} jobTitle={resume.jobTitle} address={resume.address}>
                                <Image
                                    className="h-full w-full rounded-full object-cover object-center"
                                    src={selfHead}
                                    alt="self image of resume"
                                    width={464}
                                    height={349}
                                />
                            </Resume.Information>
                            <Resume.Social lang={lang} title={resume.social} />
                            <Resume.Profile lang={lang} title={resume.profile} profileTexts={resume.profileTexts} />
                        </div>
                    </div>
                    <div className="w-full bg-[#FCFCFC]">
                        <div className="mx-6">
                            <Resume.Experience lang={lang} title={experience.title} experiences={experience.items} />
                            <Resume.Skills lang={lang} title={resume.skills} />
                            <section className="flex">
                                {/* <Resume.Certificates lang={lang} title={resume.certificates} />  */}
                                <Resume.Languages lang={lang} title={resume.languages} />
                            </section>
                        </div>
                    </div>
                </Resume>
            </div>
        </div>
    );
};
