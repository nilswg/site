import { useState } from 'react';
import { useAnimations } from '@nilswg-site/hooks';
import { CgChevronDown } from 'react-icons/cg';

type ButtonProps = {
    delayMS: number;
    text: string;
};

const OpeningButton = ({ delayMS, text }: ButtonProps) => {
    const [className, setClassName] = useState('opacity-0');

    const done = useAnimations(
        [
            { show: () => setClassName('opacity-1 animate-fadeIn'), delay: delayMS },
            { show: () => setClassName('opacity-1 animate-rubberBand'), delay: 1000 },
            { show: () => setClassName('opacity-1 animate-none'), delay: 1000 },
        ],
        [setClassName],
    );

    return (
        <a href={'#about'} className={`flat-btn ${className} group`}>
            {text}
            <span className={`ml-2 inline-block align-text-top text-lg group-hover:animate-[3s_both_shakeY_infinite] sm:text-xl`}>
                <CgChevronDown />
            </span>
        </a>
    );
};

export default OpeningButton;
