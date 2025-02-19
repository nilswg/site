'use client';

import type { FC, FCX, ReactNode } from 'react';
import { Fragment, memo, useMemo, useState } from 'react';
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
                    active: i === selected,
                    onClick: () => {
                        setSelected(i);
                    },
                };
            }),
        [selected],
    );
    return (
        <ul id="timeline" className="flex list-none flex-col gap-[80px] border-l-8 border-l-sky-800 py-10 pl-8 text-white">
            {itemsProps.map((item, i) => {
                return <Exp.TimeLineItem {...item} {...itemsStatus[i]} key={item.id} />;
            })}
        </ul>
    );
});

Exp.TimeLineItem = ({ active, onClick, fontStyles, companyName, companyImg, jobDate, jobTenure, jobTitle, jobPosition, jobDetails }) => {
    return (
        <li className="relative">
            <CompanyPreview active={active} className={fontStyles} onClick={onClick}>
                <img src={companyImg} alt={companyName} height={60} width={60} loading="lazy" decoding="async" />
            </CompanyPreview>
            <JobTenureDates jobDate={jobDate} jobTenure={jobTenure} className={active ? 'font-bold text-sky-400' : 'text-sky-500'} />
            <div className={`experience-box ${active ? 'open' : ''}`} onClick={onClick}>
                <JobTitle jobTitle={jobTitle} className={active ? 'tracking-wider text-white' : 'text-slate-200'} />
                <JobPosition
                    companyName={companyName}
                    jobPosition={jobPosition}
                    className={active ? 'font-bold text-white' : 'text-slate-200'}
                />
                <JobDetails jobDetails={jobDetails} />
            </div>
        </li>
    );
};

const CompanyPreview: FCX<{ children: ReactNode; active: boolean; onClick: () => void }> = ({ children, active, className, onClick }) => {
    return (
        <div
            id="circle"
            className={cn(
                'box-border',
                'bg-myblack h-10 w-10 cursor-pointer overflow-hidden rounded-full transition-all',
                'absolute top-[50%] -translate-x-[3.55rem] translate-y-[-50%]',
                active ? 'scale-125  border-[3px] border-sky-400' : 'scale-100 border-[5px] border-sky-800',
                className,
            )}
            onClick={onClick}>
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

const JobTitle: FCX<{ jobTitle: string }> = ({ jobTitle, className }) => {
    return (
        <h1
            id="job-title"
            className={cn('font-russon pointer-events-none mt-1 px-3 text-lg transition-transform duration-200 sm:text-xl', className)}>
            {jobTitle}
        </h1>
    );
};

const JobPosition: FCX<{ companyName: string; jobPosition: string }> = ({ companyName, jobPosition, className }) => {
    return (
        <h2
            id="job-position"
            className={cn(
                'font-play pointer-events-none mt-2 px-3 text-base text-white sm:text-lg',
                'transition-all duration-[0.3s] md:mt-3',
                className,
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
