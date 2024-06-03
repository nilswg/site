import type { FC, ReactNode } from 'react';
import { cn } from '@nilswg/utils';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FlipAnimation } from './FlipAnimation';
import { Link } from './Link';

type ProjectCompoudComponent = FC<{ children: ReactNode }> & {
    Links: FC<{ demo: string; github: string }>;
    Title: FC<{ children: string }>;
    Desc: FC<{ children: string }>;
    Tags: FC<{ title: string; tags: string[] }>;
    Preview: FC<{ children: ReactNode }>;
    Content: FC<{ children: ReactNode }>;
};

export const Project: ProjectCompoudComponent = ({ children }) => {
    return (
        <FlipAnimation direction={'horizontal'}>
            <div className="shadow-card group relative h-[210px] w-[280px] overflow-hidden rounded-md sm:h-[300px] sm:w-[400px] 2xl:h-[330px] 2xl:w-[440px]">
                {children}
            </div>
        </FlipAnimation>
    );
};

Project.Preview = ({ children }) => <div className="relative h-[210px] w-full sm:h-[300px] 2xl:h-[330px]">{children}</div>;

Project.Content = ({ children }) => (
    <div
        className={cn(
            'bg-myblack absolute h-full w-full px-6 duration-300',
            'before:absolute before:inset-0 before:top-1',
            'before:border-t-[1px] before:border-t-sky-600',
            'before:border-opacity-0 group-hover:before:border-opacity-100',
            'top-[150px] opacity-60 group-hover:top-[2.5rem]',
            'group-hover:opacity-100 sm:top-[220px] 2xl:top-[250px]',
        )}>
        {children}
    </div>
);

Project.Title = ({ children }) => (
    <p className="font-outfit max-h-[55px] overflow-hidden break-words pb-2 pt-4 text-2xl font-[300] text-white sm:max-h-[70px] sm:pt-6 sm:text-4xl">
        {children}
    </p>
);

Project.Desc = ({ children }) => (
    <p className="font-outfit my-1 max-h-[60px] overflow-hidden break-words text-sm font-[200] text-white sm:my-2 sm:max-h-[90px] sm:text-justify sm:text-lg">
        {children}
    </p>
);

Project.Links = ({ demo, github }) => {
    const LinkStyles =
        'flex h-10 w-10 items-center justify-center rounded-full bg-myblack text-[1.75rem] text-gray-600 duration-200 before:absolute before:top-[50%] before:z-[-1] before:h-[50%] before:w-full before:rounded-b-full before:ring-1 before:ring-sky-600 hover:bg-gray-800 hover:text-sky-400 sm:h-12 sm:w-12 sm:text-[2rem]';

    return (
        <div className="relative -right-[10rem] z-10 duration-300 ease-in-out group-hover:right-0">
            <Link
                href={demo}
                target="_blank"
                className={`${!demo ? 'pointer-events-none' : ''} absolute right-[2.5rem] top-[-15px] sm:right-[3.5rem] sm:top-[-19px]`}>
                <span className={LinkStyles}>{!demo ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</span>
            </Link>
            <Link
                href={github}
                target="_blank"
                className={`${!github ? 'pointer-events-none' : ''} absolute right-[-0.75rem] top-[-15px] sm:right-[-0.5rem] sm:top-[-19px]`}>
                <span className={LinkStyles}>
                    <AiFillGithub />
                </span>
            </Link>
        </div>
    );
};

Project.Tags = ({ title, tags }) => (
    <div className="h-[2.5rem] overflow-hidden pt-2 sm:h-[6rem] ">
        <div className="flex flex-wrap">
            {tags.map((tag, i) => (
                <ProjectTag key={title + '_' + tag} text={tag} />
            ))}
        </div>
    </div>
);

const ProjectTag = ({ text }: { text: string }) => (
    <p className="align-center my-1 mr-2 rounded-full border-[1px] border-sky-600 bg-transparent px-2 py-1 text-[0.5rem] font-semibold leading-4 text-sky-600 sm:px-4 sm:py-2 sm:text-[0.75rem]">
        {text}
    </p>
);
