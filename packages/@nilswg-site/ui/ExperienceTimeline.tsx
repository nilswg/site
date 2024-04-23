'use client';

import type { FC, FCX, ReactNode } from 'react';
import { memo, useMemo, useState } from 'react';
import { cn } from '@nilswg/utils';
import { getJobDate } from './utils/getJobDate';
import { getJobTenure } from './utils/getJobTenure';

export type Experience = {
    id: string;
    companyName: string;
    companyImg: string;
    jobTitle: string;
    jobPosition: string;
    location: string;
    begintime: number[];
    endtime: number[];
    texts: string[];
};

type Props_TimelineItem = {
    companyName: string;
    companyImg: string;
    jobDate: string;
    jobTenure: string;
    jobTitle: string;
    jobPosition: string;
    fontStyles: string;
    jobDetails: string[];
    active: boolean;
    onClick: () => void;
};

type ExperienceCompoundComponent = FC<{ children: ReactNode }> & {
    TimeLine: FC<{ lang: string; experiences: Experience[] }>;
    TimeLineItem: FC<Props_TimelineItem>;
};

// const Experience: FC<{ lang: string; experiences: Experience[] }> = ({ lang, experiences }) => {
//     return (
//         <Exp>
//             <Exp.TimeLine lang={lang} experiences={experiences} />
//         </Exp>
//     );
// };

export const Exp: ExperienceCompoundComponent = ({ children }) => {
    return <div className="flex w-full flex-col items-center pl-6 pr-3 md:pl-56">{children}</div>;
};

Exp.TimeLine = memo(({ lang, experiences }) => {
    const [selected, setSelected] = useState(0);
    const fontStyles = lang === 'zh-TW' ? 'font-zhtw' : 'font-outfit';
    const itemsProps = useMemo(
        () =>
            experiences.map((e, i) => {
                return {
                    id: e.id,
                    companyName: e.companyName,
                    companyImg: e.companyImg,
                    fontStyles,
                    jobDate: `${getJobDate(e.begintime, lang)} - ${getJobDate(e.endtime, lang)}`,
                    jobTenure: getJobTenure(e.begintime, e.endtime, lang),
                    jobTitle: e.jobTitle,
                    jobPosition: e.jobPosition,
                    jobDetails: e.texts ?? [],
                };
            }),
        [experiences],
    );
    const itemsStatus = useMemo(
        () =>
            experiences.map((e, i) => {
                return {
                    active: selected == i,
                    onClick: () => {
                        setSelected(i);
                    },
                };
            }),
        [selected],
    );
    return (
        <ul id="timeline" className="list-none border-l-8 border-l-sky-800 pl-8 text-white">
            {itemsProps.map((item, i) => {
                return (
                    <li className="relative my-20" key={item.id}>
                        <Exp.TimeLineItem {...item} {...itemsStatus[i]} />
                    </li>
                );
            })}
        </ul>
    );
});

Exp.TimeLineItem = ({ active, onClick, fontStyles, companyName, companyImg, jobDate, jobTenure, jobTitle, jobPosition, jobDetails }) => {
    return (
        <>
            <CompanyPreview active={active} className={fontStyles}>
                <img src={companyImg} alt={`image of ${companyName}`} height={60} width={60} loading="lazy" decoding="async" />
            </CompanyPreview>
            <JobTenureDates jobDate={jobDate} jobTenure={jobTenure} className={active ? 'text-sky-300' : 'text-sky-600'} />
            <div className={`experience-box ${active ? 'open' : ''}`} onClick={onClick}>
                <JobTitle jobTitle={jobTitle} />
                <JobPosition companyName={companyName} jobPosition={jobPosition} />
                <JobDetails jobDetails={jobDetails} />
            </div>
        </>
    );
};

const CompanyPreview: FCX<{
    children: ReactNode; // company image
    active: boolean;
}> = ({ children, active, className }) => {
    return (
        <div
            id="circle"
            className={cn(
                'bg-myblack h-10 w-10 overflow-hidden rounded-full transition-all',
                'absolute top-[50%] -ml-[3.55rem] translate-y-[-50%] md:-ml-[3.6rem]',
                active ? 'border-2 border-sky-400' : 'border-[5px] border-sky-800',
                className,
            )}>
            {children}
        </div>
    );
};

const JobTenureDates: FCX<{ jobDate: string; jobTenure: string }> = ({ jobDate, jobTenure, className }) => {
    return (
        <p
            id="job-dates"
            className={cn(
                'pointer-events-none absolute top-[-3rem] cursor-none text-base tracking-wider transition-all',
                'md:absolute md:-left-[18rem] md:top-[50%] md:-mt-6 md:w-[13rem] md:px-0 md:text-right',
                className,
            )}>
            {jobDate} <br /> {jobTenure}
        </p>
    );
};

const JobTitle: FC<{ jobTitle: string }> = ({ jobTitle }) => {
    return (
        <h1 id="job-title" className="font-russon pointer-events-none mt-1 px-3 text-xl transition-transform duration-200 sm:text-xl">
            {jobTitle}
        </h1>
    );
};

const JobPosition: FC<{ companyName: string; jobPosition: string }> = ({ companyName, jobPosition }) => {
    return (
        <h2
            id="job-position"
            className={cn(
                'font-play pointer-events-none mt-2 px-3 text-base text-white',
                'xs:text-base transition-all duration-[0.3s] sm:text-lg md:mt-3',
            )}>
            {companyName}, {jobPosition}
        </h2>
    );
};

const JobDetails: FC<{ jobDetails: string[] }> = ({ jobDetails }) => {
    return (
        <>
            {jobDetails.map((text, i) => (
                <p
                    key={i}
                    className={cn(
                        'my-2 hidden overflow-hidden px-4 text-justify', //
                        'text-sm sm:text-base lg:text-lg',
                    )}>
                    <span className="inline-block">-&nbsp;</span>
                    <span className="inline-block" key={i}>
                        {text}
                    </span>
                </p>
            ))}
        </>
    );
};
