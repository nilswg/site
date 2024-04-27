'use client';

import type { Experience } from '@nilswg-site/ui';
import { DecTag, Exp } from '@nilswg-site/ui';
import { getI18nObjects } from '@nilswg/i18n';
import { useTranslation } from 'next-i18next';
import { SectionTexts } from '@/components/SectionTexts';

const Experience = () => {
    const { t } = useTranslation();
    const experiences = getI18nObjects<Experience>(t, 'home:experience-timeline');
    const lang = t('common:lang');
    return (
        <section id="experience" className="bg-myblack w-full py-navbar">
            <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
                <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
                    <div className="max-w-3xl">
                        <SectionTexts
                            i18nKeys={{
                                title: 'home:experience.title',
                                texts: 'home:experience.texts',
                            }}
                        />
                    </div>
                </div>
                <div className="2xl:w-3/5 2xl:pt-10">
                    <DecTag className="ml-6 2xl:ml-[10%]">{'<timeline>'}</DecTag>
                    <div className="py-5">
                        <Exp>
                            <Exp.TimeLine lang={lang} experiences={experiences} />
                        </Exp>
                    </div>
                    <DecTag className="ml-6 2xl:ml-[10%]">{'</timeline>'}</DecTag>
                </div>
            </div>
        </section>
    );
};

export default Experience;
