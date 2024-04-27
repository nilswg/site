import type { FC, ReactNode } from 'react';
import { FlipAnimation } from './FlipAnimation';

type SkillCompoundComponent = FC<{ children: ReactNode }> & {
    Text: FC<{ id: string }>;
    Image: FC<{ children: ReactNode }>;
};

export const Skill: SkillCompoundComponent = ({ children }) => {
    return (
        <FlipAnimation direction="vertical">
            <div className="group flex flex-col items-center justify-between space-y-2 rounded-lg border border-transparent p-4 transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-sm sm:p-5">
                {children}
            </div>
        </FlipAnimation>
    );
};

Skill.Image = ({ children }) => {
    return <div className="rounded-md transition-transform ease-in-out group-hover:-translate-y-2">{children}</div>;
};

Skill.Text = ({ id }) => {
    return (
        <p className="font-play text-center text-lg text-gray-400 opacity-100 transition-colors ease-in-out group-hover:text-gray-200 sm:text-xl">
            {id}
        </p>
    );
};

export const SkillsContainer: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="container mx-auto max-w-3xl xl:max-w-5xl 2xl:max-w-full">
        <div className="grid grid-cols-2 gap-4 px-6 py-5 sm:grid-cols-4 sm:gap-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6">{children}</div>
    </div>
);

export const MySkills = [
    { id: 'TypeScript', img: '/img/skills/TypeScript.svg' },
    { id: 'Node.js', img: '/img/skills/nodejs.png' },
    { id: 'React', img: '/img/skills/React-Dark.svg' },
    { id: 'Tailwind', img: '/img/skills/tailwind.png' },
    { id: 'Astro', img: '/img/skills/astro.svg' },
    { id: 'Next.js', img: '/img/skills/Next.svg' },
    { id: 'Express', img: '/img/skills/expressjs.png' },
    { id: 'Vite', img: '/img/skills/vite-dark.svg' },
    { id: 'JavaScript', img: '/img/skills/JavaScript.svg' },
    { id: 'HTML', img: '/img/skills/HTML.svg' },
    { id: 'CSS', img: '/img/skills/CSS.svg' },
    { id: 'Sass', img: '/img/skills/sass.png' },
    { id: 'Linux', img: '/img/skills/Linux-Dark.svg' },
    { id: 'Debian', img: '/img/skills/debian.png' },
    { id: 'Bash', img: '/img/skills/Bash-Dark.svg' },
    { id: 'Git', img: '/img/skills/Git.svg' },
    { id: 'Pnpm', img: '/img/skills/pnpm.png' },
    { id: 'Prettier', img: '/img/skills/prettier.png' },
    { id: 'Redux', img: '/img/skills/Redux.svg' },
    { id: 'BabylonJS', img: '/img/skills/babylon.png' },
    { id: 'PixiJS', img: '/img/skills/pixijs.png' },
    { id: 'GreenSock', img: '/img/skills/greensock.png' },
    { id: 'Webpack', img: '/img/skills/webpack-dark.svg' },
    { id: 'Redis', img: '/img/skills/redis.png' },
    { id: 'Docker', img: '/img/skills/Docker.svg' },
    { id: 'MongoDB', img: '/img/skills/mongodb.png' },
    { id: 'PostgreSQL', img: '/img/skills/PostgreSQL.png' },
    { id: 'Golang', img: '/img/skills/golang.svg' },
];
