import type { FC, ReactNode } from 'react';
import { cn } from '@nilswg/utils';
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FlipAnimation } from './FlipAnimation';
import { Link } from './Link';

// type Props_ProjectCard = {
//     tags: string[];
//     title: string;
//     description: string;
//     demo: string;
//     github: string;
//     preview: Props_Image;
// };

// const ProjectCard: FC<Props_ProjectCard> = ({ tags, title, description, demo, github, preview }) => (
//     <Project>
//         <Project.Preview>
//             <Image className="object-fill" {...preview} />
//         </Project.Preview>
//         <Project.Content>
//             <Project.Links demo={demo} github={github} />
//             <Project.Title>{title}</Project.Title>
//             <Project.Desc>{description}</Project.Desc>
//             <Project.Tags title={title} tags={tags} />
//         </Project.Content>
//     </Project>
// );

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
                <ProjectTag key={title+'_'+tag} text={tag} />
            ))}
        </div>
    </div>
);

const ProjectTag = ({ text }: { text: string }) => (
    <p className="align-center my-1 mr-2 rounded-full border-[1px] border-sky-600 bg-transparent px-2 py-1 text-[0.5rem] font-semibold leading-4 text-sky-600 sm:px-4 sm:py-2 sm:text-[0.75rem]">
        {text}
    </p>
);

export const ProjectsList = [
    {
        id: 'ts-next-nilswg-portfolio',
        title: 'Nilswg Portfolio',
        demo: 'https://nilswg-portfolio.vercel.app/',
        github: 'https://github.com/nilswg/ts-next-nilswg-portfolio',
        preview: {
            src: '/img/projects/ts-next-nilswg-portfolio.png',
            alt: 'Project - Nilswg Portfolio',
            width: 800,
            height: 600,
        },
        tags: ['React', 'Next.js', 'Astro', 'Tailwind'],
        description: "Nilson Weng's personal portfolio website.",
    },
    {
        id: 'ts-next-meetup-room',
        title: 'Meetup Room App',
        demo: 'https://nilswg-meet.vercel.app/',
        github: 'https://github.com/nilswg/ts-next-meetup-room/',
        preview: {
            src: '/img/projects/ts-next-meetup-room.png',
            alt: 'Project - Meetup Room App',
            width: 800,
            height: 600,
        },
        tags: ['Next.js', 'Zustand', 'Socket.io', 'Peer.js'],
        description: 'This is a meetup room app for learning WebSocket and building with Next.js, Socket.io, Peer.js, etc.',
    },
    {
        id: 'ts-next-meetup-room-socketio-deno-server',
        title: 'Meetup Deno Server',
        demo: 'https://nilswg-meet.vercel.app/',
        github: 'https://github.com/nilswg/ts-next-meetup-room/tree/main/server/deno',
        // preview: '/img/projects/ts-nilswg-meetup-room-socketio.png',
        preview: {
            src: '/img/projects/ts-nilswg-meetup-room-socketio.png',
            alt: 'Project - Meetup Room App Deno Server',
            width: 800,
            height: 600,
        },
        tags: ['Deno', 'Socket.io', 'Websocket'],
        description: 'This is Socket.io server of meetup room app. Deploy on Deno-Deploy.',
    },
    {
        id: 'ts-vite-react-weather-app',
        title: 'Weather App',
        demo: 'https://nilswg.github.io/ts-vite-react-weather-app/',
        github: 'https://github.com/nilswg/ts-vite-react-weather-app',
        // preview: '/img/projects/ts-vite-react-weather-app.png',
        preview: {
            src: '/img/projects/ts-vite-react-weather-app.png',
            alt: 'Project - Weather App',
            width: 800,
            height: 600,
        },
        tags: ['React', 'Redux Toolkit', 'Vite', 'TypeScript', 'Styled Components'],
        description: 'This is a weather app for learning purposes and built with React and Typescript.',
    },
    {
        id: 'ts-react-lowkeydd-app',
        title: 'Lowkeydd App',
        demo: '',
        github: 'https://github.com/zxcasdjason1/lowkeydd-dev',
        // preview: '/img/projects/ts-react-lowkeydd-app.png',
        preview: {
            src: '/img/projects/ts-react-lowkeydd-app.png',
            alt: 'Project - Lowkeydd App',
            width: 800,
            height: 600,
        },
        tags: ['React', 'Axios', 'Redux', 'Styled Components'],
        description: 'A web app that allows users to watch live streams on YouTube and Twitch.',
    },
    {
        id: 'golang-lowkeydd-server',
        title: "Lowkeydd's Server",
        demo: '',
        github: 'https://github.com/zxcasdjason1/lowkeydd-server',
        // preview: '/img/projects/golang-lowkeydd-server.png',
        preview: {
            src: '/img/projects/golang-lowkeydd-server.png',
            alt: "Project - Lowkeydd's Server",
            width: 800,
            height: 600,
        },
        tags: ['Go-Gin', 'Go-Colly', 'Docker', 'Nginx', 'postgreSQL', 'Redis'],
        description: "Lowkeydd 's Server. Crawling data from YouTube into Redis. Provide APIs with Go-Gin server",
    },
    // {
    //   id: 'proj6',
    //   title: 'Lowkeydd',
    //   demo: '',
    //   github: '',
    //   preview: 'https://mdbootstrap.com/img/new/standard/nature/182.jpg',
    //   tags: ['React', 'Next.js'],
    //   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    // },
];
