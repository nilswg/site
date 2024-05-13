'use client';

import { FC, memo } from 'react';
import { DecTag, OpeningButton, OpeningLetters, SocialLinks } from '@nilswg-site/ui';
import { getI18nTextArray } from '@nilswg/i18n';
import { useTranslation } from 'next-i18next';
import TypeWriter from 'typewriter-effect';

const Opening = () => {
    const { t } = useTranslation('home');
    const letters = getI18nTextArray(t, 'home:openings.letters');
    const typewriter = getI18nTextArray(t, 'home:openings.typewriter');
    const learnmore = t('home:openings.learnmore', { defaultValue: 'LEARN MORE' });

    return (
        <section className="opening-bg-image flex h-[calc(100vh-10rem)] flex-col items-center justify-between">
            <div className="container flex h-full w-full flex-row items-center justify-between 2xl:w-3/4">
                <div className=" flex w-full justify-center">
                    <div>
                        <DecTag className="animate-fadeIn animate-delay-[3s] ml-6">{'<h1>'}</DecTag>
                        <OpeningLetters letters={letters} waitMS={2000} />
                        <DecTag className="animate-fadeIn animate-delay-[3s] xs:ml-3 ml-6 inline">{'</h1>'}</DecTag>
                        <DecTag className="tags animate-fadeIn animate-delay-[3s] ml-6">{'<p>'}</DecTag>
                        <div className="font-orbitron ml-9 text-xs tracking-wide text-gray-400 sm:text-lg md:text-2xl">
                            <MyTypeWriter texts={typewriter} />
                        </div>
                        <DecTag className="tags animate-fadeIn animate-delay-[3s] ml-6">{'</p>'}</DecTag>
                    </div>
                </div>
                <div>
                    <div className="mr-4 hidden sm:block">
                        <SocialLinks className="flex flex-col gap-5 px-0 py-2 text-5xl text-white opacity-60" />
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-6">
                <OpeningButton delayMS={6000} text={learnmore} />
            </div>
        </section>
    );
};

const MyTypeWriter: FC<{ texts: string[] }> = memo(({ texts }) => {
    return (
        <TypeWriter
            options={{ loop: true }}
            onInit={(w) => {
                w.pauseFor(6000)
                    .typeString(texts[0])
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(texts[1])
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(texts[2])
                    .pauseFor(1000)
                    .deleteAll()
                    .start();
            }}
        />
    );
});

export default Opening;
