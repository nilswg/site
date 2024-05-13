import type { AnchorHTMLAttributes, FC } from 'react';

const defaultArgs = {
    $baseUrl: (href: string | undefined) => href + '',
};

export const $Link = (optArgs: Partial<Args>): FC<Props_Link> => {
    const args = { ...defaultArgs, ...optArgs };
    const newLink = ({ href, children, ...restProps }: Props_Link) => {
        return (
            <a href={args.$baseUrl(href)} {...restProps}>
                {children}
            </a>
        );
    };
    return newLink;
};

// 客製化 Link 元件
export const Link = $Link({
    // 這裡可以自訂參數
    $baseUrl: (href) => href + ''
});

type Args = typeof defaultArgs;
type Props_Link = AnchorHTMLAttributes<HTMLAnchorElement>;
