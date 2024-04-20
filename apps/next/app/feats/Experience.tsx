'use client';

import type { Experience } from '@nilswg-site/ui';
import { memo } from 'react';
import { DecTag, Exp, SectionText, SectionTitle } from '@nilswg-site/ui';
import { getI18nObjects, getI18nTextArray } from '@nilswg/i18n';
import { Trans, useTranslation } from 'next-i18next';

const Experience = () => {
    const { t } = useTranslation();
    const experiences = getI18nObjects<Experience>(t, 'home:experience-timeline');
    const lang = t('common:lang');
    return (
        <section id="experience" className="bg-myblack w-full py-[var(--navbar-height)]">
            <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
                <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
                    <div className="max-w-3xl">
                        <ExperienceTexts />
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

const ExperienceTexts = memo(() => {
    const { t } = useTranslation();
    const experienceTexts = getI18nTextArray(t, 'home:experience.texts');
    const lang = t('common:lang');
    return (
        <>
            <SectionTitle lang={lang} text={t('home:experience.title', { defaultValue: 'Experience' })} />
            <SectionText lang={lang}>
                {experienceTexts.map((text, i) => (
                    <p key={`experience_text_${i}`}>
                        <Trans
                            i18nKey={text}
                            components={{
                                b: <b />,
                            }}
                        />
                    </p>
                ))}
            </SectionText>
        </>
    );
});

export default Experience;
