import type { FC, ReactNode } from 'react';

export const VerticalFrame: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="w-full 2xl:flex 2xl:w-2/5 2xl:justify-end">
            <div className="w-full max-w-3xl">{children}</div>
        </div>
    );
};
