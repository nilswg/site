import AboutImage from '../../public/img/hero2.jpg';
import { getI18nText, getI18nTextArray } from '@nilswg/i18n';
import { Image } from './Image';
import SectionText from './SectionText';
import SectionTitle from './SectionTitle';
import { Trans, useTranslation } from './useI18n';

const AboutTexts = () => {
    const { t } = useTranslation('home');
    const aboutTitle = getI18nText(t, 'about.title');
    const aboutTexts = getI18nTextArray(t, 'about.texts');
    return (
        <div>
            <SectionTitle text={aboutTitle} />
            <SectionText>
                {aboutTexts.map((text, i) => (
                    <p key={`about_text_${i}`}>
                        <Trans
                            i18nKey={text}
                            components={{
                                b: <b />,
                            }}
                        />
                    </p>
                ))}
            </SectionText>
        </div>
    );
};

const About = () => (
    <section id="about" className={`bg-myblack mt-[var(--navbar-height)] w-full py-[var(--navbar-height)]`}>
        {/* <h1 className='absolute text-white text-lg'>{1}</h1> */}
        <div className="w-full 2xl:flex 2xl:flex-row 2xl:justify-center">
            <div className="2xl:flex 2xl:w-2/5 2xl:flex-row 2xl:justify-end">
                <div className="w-full max-w-3xl">
                    <AboutTexts />
                </div>
            </div>
            <div className="2xl:w-3/5 2xl:pt-10 ">
                <h1 className="tags ml-6 2xl:ml-[25%]">{'<img src="me">'}</h1>
                <div className="flex justify-center px-9">
                    <div className="max-w-md">
                        <Image className="blob-mask" src={AboutImage} alt="about image" width={420} />
                    </div>
                </div>
                <h1 className="tags ml-6 2xl:ml-[25%]">{'</img>'}</h1>
            </div>
        </div>
    </section>
);

export default About;
