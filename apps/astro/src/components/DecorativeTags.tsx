import type { FCX, ReactNode } from 'react';
import { cn } from '@nilswg/utils';

export const DecTag: FCX<{ children: string }> = ({ children, className }) => {
    return (
        <span className={cn('tags block', className)}>
            {children}
        </span>
    );
};
