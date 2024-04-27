'use client';

import { ReactNode } from 'react';
import { DecTag } from '@nilswg-site/ui';
import { ProjectCardList } from '@/components/ProjectCardList';
import { SectionTexts } from '@/components/SectionTexts';

const VerticalFrame = ({ children }: { children: ReactNode }) => (
    <div className="2xl:flex 2xl:w-2/5 2xl:justify-end">
        <div className="w-full max-w-3xl">{children}</div>
    </div>
);

const Projects = () => {
    return (
        <section id="projects" className="bg-myblack w-full py-navbar">
            <VerticalFrame>
                <SectionTexts
                    i18nKeys={{
                        title: 'home:projects.title',
                        texts: 'home:projects.texts',
                    }}
                />
                <DecTag className="ml-6">{'<div class="grid">'}</DecTag>
            </VerticalFrame>
            <div className="flex w-full flex-col items-center self-center">
                <div className="xs:px-9 grid max-w-4xl grid-cols-1 gap-10 px-0 py-5 lg:grid-cols-2 2xl:max-w-full 2xl:grid-cols-3">
                    <ProjectCardList />
                </div>
            </div>
            <VerticalFrame>
                <DecTag className="ml-6">{'</div>'}</DecTag>
            </VerticalFrame>
        </section>
    );
};

export default Projects;
