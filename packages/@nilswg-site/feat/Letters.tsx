'use client';

import { createContext, FC, FCX, Fragment, memo, useContext, useEffect, useRef, useState } from 'react';
import { useAnimationsFn, useDelayEffect, useThrottleFn } from '@nilswg-site/hooks';
import { cn } from '@nilswg/utils';

type Props_OpeningLetters = {
    letters: string[];
    waitMS: number;
};
const LettersContext = createContext<Props_OpeningLetters>({ waitMS: 0, letters: [] });
export const OpeningLetters: FCX<Props_OpeningLetters> = memo(({ letters, waitMS = 0 }) => {
    return (
        <LettersContext.Provider value={{ letters, waitMS }}>
            {letters.map((line, idx) => (
                <Fragment key={idx}>
                    <Line
                        str={line}
                        className={idx < letters.length - 1 ? 'mb-1 ml-9' : 'ml-9'}
                        startIdx={idx > 0 ? letters[idx - 1].length : 0}
                    />
                    {idx < letters.length - 1 && <br />}
                </Fragment>
            ))}
        </LettersContext.Provider>
    );
});

const Line: FCX<{ str: string; startIdx: number }> = memo(({ className, str, startIdx = 0 }) => {
    const { waitMS } = useContext(LettersContext);
    return (
        <span
            className={cn(
                'font-russon inline-block text-xl font-normal text-white',
                'xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
                className,
            )}
            data-cy={str}>
            {str.split('').map((char, i) => {
                const index = startIdx + i;
                if (char === ' ') {
                    return <span key={index}>&nbsp;</span>;
                }
                return <Letter key={index} startMs={waitMS + index * 100} char={char} />;
            })}
        </span>
    );
});

const Letter: FC<{ char: string; startMs: number }> = ({ char, startMs = 0 }) => {
    const [enable, setEnable] = useState(false);
    const ref = useRef<HTMLSpanElement | null>(null);

    /* 設置初始動畫 */
    const [className, setClassName] = useState(/*tw:*/ 'animate-bounceIn');
    const [styles, setStyles] = useState({ animationDelay: `${(startMs / 1000).toFixed(1)}s` });

    /* 因為字母有初始動畫，必須等初始動畫播完才接受觸發 */
    useDelayEffect(() => setEnable(true), startMs, []);

    /**
     * 懸停時觸發動畫效果，動畫播畢後，即一秒後退回原始狀態
     * 其中使用 Throttle，避免動畫被多次觸發。
     */
    const [letterAnimate, clearLetterAnimate] = useAnimationsFn(
        [
            {
                show: () => {
                    setClassName(/*tw:*/ 'animate-[1s_both_rubberBand,_0.5s_reverse_sky400]');
                    setStyles({ animationDelay: '0s' });
                },
                delay: 0,
            },
            { show: () => setClassName(/*tw:*/ 'animate-none'), delay: 1000 },
        ],
        [setClassName],
    );

    const letterAnimateThrottled = useThrottleFn(letterAnimate, 1000, []);

    useEffect(() => {
        /* 等初始動畫播完才接受觸發 */
        if (enable && ref.current) {
            ref.current.addEventListener('pointerenter', letterAnimateThrottled);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('pointerenter', letterAnimateThrottled);
            }
            clearLetterAnimate();
        };
    }, [enable, ref.current, setClassName]);

    return (
        <span className={cn('inline-block min-w-[0.5rem]', className)} ref={ref} style={styles}>
            {char}
        </span>
    );
};
