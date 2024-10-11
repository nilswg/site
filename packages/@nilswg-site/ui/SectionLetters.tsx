import { FC, ReactNode } from 'react';
import { cn } from '@nilswg/utils';
import { DecTag } from './DecorativeTags';
import { LettersZone } from './Letters';

type Props_SectionText = {
    // lang: string;
    className?: string;
    children: ReactNode;
};

export const SectionText: FC<Props_SectionText> = ({ className, children }) => {
    return (
        <>
            <DecTag className="ml-6">{'<p>'}</DecTag>
            <div
                className={cn(
                    // lang === 'zh-TW' ? 'font-zhtw' : 'font-outfit',
                    'mx-9 my-1 flex flex-col gap-2', //
                    'text-sm tracking-widest text-gray-400',
                    'sm:text-justify sm:text-base',
                    className,
                )}>
                {children}
            </div>
            <DecTag className="mb-1 ml-6">{'</p>'}</DecTag>
        </>
    );
};

type Props_SectionTitle = {
    className?: string;
    text: string;
};

export const SectionTitle: FC<Props_SectionTitle> = ({ className, text }) => {
    return (
        <>
            <DecTag className="ml-6 pt-10">{'<h1>'}</DecTag>
            <LettersZone
                className={cn(
                    // lang === 'zh-TW' ? 'font-notosans_bold font-bold mb-3' : 'font-russon font-normal',
                    'ml-9 inline-block text-[2.75rem] text-sky-400', //
                    'xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl',
                    className,
                )}
                letters={text}
            />
            <br />
            <DecTag className="ml-6">{'</h1>'}</DecTag>
        </>
    );
};
