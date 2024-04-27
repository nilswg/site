'use client';

import { SectionTexts } from '@/components/SectionTexts';
import { SkillsBoard } from '@/components/SkillsBoard';
import { DecTag } from '@nilswg-site/ui';

const Skills = () => (
    <section id="skills" className="bg-myblack w-full py-navbar">
        <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
            <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
                <div className="max-w-3xl">
                    <SectionTexts
                        i18nKeys={{
                            title: 'home:skills.title',
                            texts: 'home:skills.texts',
                        }}
                    />
                </div>
            </div>
            <div className="2xl:w-3/5 2xl:pt-10">
                <DecTag className="ml-6">{'<div class="grid">'}</DecTag>
                <SkillsBoard />
                <DecTag className="ml-6">{'</div>'}</DecTag>
            </div>
        </div>
    </section>
);

export default Skills;
