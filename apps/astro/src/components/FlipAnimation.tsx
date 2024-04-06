import type { FCX, ReactNode } from 'react';
import { useCallback, useState } from 'react';
import { IntersectionLine } from './IntersectionLine';

type Props = {
    direction: 'vertical' | 'horizontal';
    children: ReactNode;
};

/**
 * ## Card Flip Animation
 *
 * ### FlipAnimation
 *
 * 為進入視線進入邊界時，讓卡片呈現翻轉效果。
 *
 * 使用 direction 決定翻轉方向，可為 'vertical' 或 'horizontal'，
 * 分別代表垂直方向與水平方向翻轉。預設為 'vertical'。
 */
export const FlipAnimation: FCX<Props> = ({ direction = 'vertical', children }) => {
    const [cardAnim, setCardAnim] = useState('animate-none');

    const { flipIn, flipOut, intersectionLinePosition } =
        direction === 'vertical'
            ? {
                  flipIn: 'animate-flipInX',
                  flipOut: 'animate-flipOutX',
                  intersectionLinePosition: 'top-[100%]',
              }
            : {
                  flipIn: 'animate-flipInY',
                  flipOut: 'animate-flipOutY',
                  intersectionLinePosition: 'top-[30%]',
              };

    const handleIntersection = useCallback(
        (observer: IntersectionObserver, entry: IntersectionObserverEntry) => {
            const { top } = entry.boundingClientRect;
            if (entry.isIntersecting) {
                setCardAnim(flipIn);
            }
            /**
             * 從上方離開 top、bottom 會是負數；從下方離開 top、bottom 會是正數。
             * 我們希望觀察對象從畫面上方離開時不要觸發動畫效果。
             */
            if (!entry.isIntersecting && top > 0) {
                setCardAnim(flipOut);
            }
        },
        [setCardAnim],
    );

    return (
        <div>
            <IntersectionLine position={intersectionLinePosition} fn={handleIntersection} options={{ threshold: 1 }} visible={false} />
            <div className={cardAnim}>{children}</div>
        </div>
    );
};
