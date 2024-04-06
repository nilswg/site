import type { HTMLAttributes } from 'astro/types';
import type { FC, ImgHTMLAttributes } from 'react';
import { getImage } from 'astro:assets';

// import NextImage from 'next/image' // 這裡之後可以改成所用框架對應的 ImageService 元件
// import AstroImage from 'astro:assets';

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
            const { src, ...restProps } = props;
            return <img {...props.src} {...restProps} />;
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
};

/**
 * 將 Astro 的 getImage 轉換成 React 的 props
 * @param props
 * @returns
 */
export const $imageProps = async (props: Parameters<typeof getImage>[0]) => {
    const _image = await getImage(props);

    const additionalAttributes: HTMLAttributes<'img'> = {};
    if (_image.srcSet.values.length > 0) {
        additionalAttributes.srcset = _image.srcSet.attribute;
    }

    return {
        src: _image.src,
        ...additionalAttributes,
        ..._image.attributes,
    } as Props_Image;
};

export const $assets = async <T extends Record<string, any>>(assetsMap: T) => {
    const res = {} as Record<keyof T, Props_Image>;
    await Promise.all(
        Object.keys(assetsMap).map((key) => {
            const task = $imageProps(assetsMap[key]).then((image) => {
                res[key as keyof T] = image;
            });
            return task;
        }),
    );
    return res;
};
