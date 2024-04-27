import type { FC } from 'react';
import type { Props_Image } from './Image';
import { Fragment, memo } from 'react';
import { Project, ProjectsList } from '@nilswg-site/ui';
import { Image } from './Image';

export const ProjectCardList = memo(() => {
    return (
        <Fragment>
            {ProjectsList.map((proj, i) => (
                <ProjectCard
                    tags={proj.tags}
                    title={proj.title}
                    description={proj.description}
                    demo={proj.demo}
                    github={proj.github}
                    preview={proj.preview}
                    key={proj.id}
                />
            ))}
        </Fragment>
    );
});

type Props_ProjectCard = {
    tags: string[];
    title: string;
    description: string;
    demo: string;
    github: string;
    preview: Props_Image;
};

export const ProjectCard: FC<Props_ProjectCard> = ({ tags, title, description, demo, github, preview }) => (
    <Project>
        <Project.Preview>
            <Image className="object-fill" {...preview} />
        </Project.Preview>
        <Project.Content>
            <Project.Links demo={demo} github={github} />
            <Project.Title>{title}</Project.Title>
            <Project.Desc>{description}</Project.Desc>
            <Project.Tags title={title} tags={tags} />
        </Project.Content>
    </Project>
);
