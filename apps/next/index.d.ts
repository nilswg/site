export declare module 'react' {
    // 導出 memo 函式
    function memo<P>(component: (props: P) => ReactElement | null): (props: P) => ReactElement | null;
    
    /**
     * ### FC with className
     */
    type FCX<P = {}> = FunctionComponent<P & { className?: string }>;
}