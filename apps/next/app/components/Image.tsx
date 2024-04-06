import type { FC, ImgHTMLAttributes } from 'react';
import NextImage from 'next/image'; // 這裡之後可以改成所用框架對應的 ImageService 元件

const defaultArgs = {
    $baseUrl: (href: string | undefined) => href + '',
    $optimizedImage: (image: ImageMetaData) => image,
};

/**
 * 客製化 Image 元件
 */
export const $Image = (optArgs: Partial<Args>) => {
    const args = { ...defaultArgs, ...optArgs };
    const NewImage: FC<Props_Image> = (props) => {
        if (isImageMetaData(props.src)) {
            // 圖片優化處理
            // @ts-ignore
            return <NextImage {...props} />;
        }

        // 普通不用優化的 Image 元件
        const { src, ...restProps } = props;
        return <img src={args.$baseUrl(src)} {...restProps} />;
    };
    return NewImage;
};
export const Image = $Image(defaultArgs);

type ImageMetaData = {
    src: string;
    height: number;
    width: number;
};
const isImageMetaData = (src: string | ImageMetaData): src is ImageMetaData => {
    return typeof src !== 'string';
};

type Args = typeof defaultArgs;
export type Props_Image = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
    src: string | ImageMetaData;
    fill?: boolean; // next only props
    priority?: boolean; // next only props
};
