import type { ReactNode } from 'react';
import { getI18nTextArray } from '@nilswg/i18n';
import ProjectCard from './ProjectCard';
import SectionText from './SectionText';
import SectionTitle from './SectionTitle';
import { Trans, useTranslation } from './useI18n';

const projList = [
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
        tags: ['React', 'Next.js', 'Tailwind', 'Zustand'],
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

const ProjectsTexts = () => {
    const { t } = useTranslation('home');
    const projectsTexts = getI18nTextArray(t, 'projects.texts');
    return (
        <>
            <SectionTitle text={t('projects.title', { defaultValue: 'Projects' })} />
            <SectionText>
                {projectsTexts.map((text, i) => (
                    <p key={`projects_text_${i}`}>
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
};

const VerticalFrame = ({ children }: { children: ReactNode }) => (
    <div className="2xl:flex 2xl:w-2/5 2xl:justify-end">
        <div className="w-full max-w-3xl">{children}</div>
    </div>
);

const Projects = () => {
    return (
        <section id="projects" className="bg-myblack w-full py-[var(--navbar-height)]">
            {/* <h1 className="absolute text-lg text-white">{4}</h1> */}
            <VerticalFrame>
                <ProjectsTexts />
                <h1 className="tags ml-6">{'<div class="grid">'}</h1>
            </VerticalFrame>
            <div className="flex w-full flex-col items-center self-center">
                <div className="xs:px-9 grid max-w-4xl grid-cols-1 gap-10 px-0 py-5 lg:grid-cols-2 2xl:max-w-full 2xl:grid-cols-3">
                    {projList.map((proj, i) => (
                        <ProjectCard
                            key={`proj_${proj.id}`}
                            tags={proj.tags}
                            title={proj.title}
                            description={proj.description}
                            demo={proj.demo}
                            github={proj.github}
                            preview={proj.preview}
                        />
                    ))}
                </div>
            </div>
            <VerticalFrame>
                <h1 className="tags ml-6">{'</div>'}</h1>
            </VerticalFrame>
        </section>
    );
};

export default Projects;
