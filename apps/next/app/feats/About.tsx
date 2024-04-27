'use client';

import Image from 'next/image';
import { SectionTexts } from '@/components/SectionTexts';
import hero from '/public/img/hero2.jpg';

export const About = () => (
    <section id="about" className={`bg-myblack mt-navbar w-full py-navbar`}>
        <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
            <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
                <div className="w-full max-w-3xl">
                    <SectionTexts
                        i18nKeys={{
                            title: 'home:about.title',
                            texts: 'home:about.texts',
                        }}
                    />
                </div>
            </div>
            <div className="2xl:w-3/5 2xl:pt-10 ">
                <h1 className="tags ml-6 2xl:ml-[25%]">{'<img src="me">'}</h1>
                <div className="flex justify-center px-9">
                    <div className="max-w-md">
                        <Image className="blob-mask" src={hero} alt="hero" width={420} />
                    </div>
                </div>
                <h1 className="tags ml-6 2xl:ml-[25%]">{'</img>'}</h1>
            </div>
        </div>
    </section>
);
