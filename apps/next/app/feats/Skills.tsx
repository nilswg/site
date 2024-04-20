'use client';

import { memo } from 'react';
import { SectionText, SectionTitle } from '@nilswg-site/ui';
import { getI18nTextArray } from '@nilswg/i18n';
import { Trans, useTranslation } from 'next-i18next';
import { SkillsBoard } from '@/components/SkillsBoard';

const Skills = () => (
    <section id="skills" className="bg-myblack w-full py-[var(--navbar-height)]">
        <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
            <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
                <div className="max-w-3xl">
                    <SkillsTexts />
                </div>
            </div>
            <div className="2xl:w-3/5 2xl:pt-10">
                <h1 className="tags ml-6">{'<div class="grid">'}</h1>
                <SkillsBoard />
                <h1 className="tags ml-6">{'</div>'}</h1>
            </div>
        </div>
    </section>
);

const SkillsTexts = memo(() => {
    const { t } = useTranslation();
    const lang = t('common:lang');
    const skillsTexts = getI18nTextArray(t, 'home:skills.texts');
    return (
        <>
            <SectionTitle lang={lang} text={t('home:skills.title', { defaultValue: 'Skills' })} />
            <SectionText lang={lang}>
                {skillsTexts.map((text, i) => (
                    <p key={`skills_text_${i}`}>
                        <Trans i18nKey={text} components={{ b: <b /> }} />
                    </p>
                ))}
            </SectionText>
        </>
    );
});

export default Skills;
