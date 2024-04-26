'use client';

import type { FC } from 'react';
import { Fragment, memo, useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useToasts } from './stores/toasts';

export const Toasts: FC = memo(() => {
    const { $toasts } = useToasts();
    return (
        <div id="toasts" className="fixed right-3 top-20 z-20 w-[20rem]">
            {$toasts().map((e) => (
                <Toast key={e.id} id={e.id} type={e.type} text={e.text} />
            ))}
        </div>
    );
});

const Toast: FC<Props_Toast> = ({ id, type, text }) => {
    const { removeToast } = useToasts();
    const [anim, setAnim] = useState('animate-slideInRight animate-duration-300');
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const onClick = useCallback(() => {
        setAnim('animate-fadeOutRight animate-duration-300');
        if (timeout.current !== null) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => removeToast(id), 300);
    }, [removeToast]);

    useEffect(() => {
        timeout.current = setTimeout(() => onClick(), 5000);
        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current);
            }
        };
    }, []);

    return (
        <div className={`transition-all ${anim}`}>
            <ToastContent type={type} text={text} onClick={onClick} />
        </div>
    );
};

type Props_Toast = {
    id: string;
    type: ToastType;
    text: string;
};
type ToastType = 'error' | 'warn' | 'info' | 'success';

const ToastContent: FC<{
    type: ToastType;
    text: string;
    onClick: () => void;
}> = ({ type, text, onClick }) => {
    const toastStyles = {
        error: {
            bgColor: 'bg-red-500',
            btnColor: 'focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-800 dark:focus:ring-red-700 dark:focus:ring-offset-red-500',
        },
        warn: {
            bgColor: 'bg-yellow-500',
            btnColor:
                'focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-800 dark:focus:ring-yellow-700 dark:focus:ring-offset-yellow-500',
        },
        info: {
            bgColor: 'bg-blue-500',
            btnColor:
                'focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-800 dark:focus:ring-blue-700 dark:focus:ring-offset-blue-500',
        },
        success: {
            bgColor: 'bg-green-500',
            btnColor:
                'focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-800 dark:focus:ring-green-700 dark:focus:ring-offset-green-500',
        },
    };

    const { bgColor, btnColor } = toastStyles[type];

    return (
        <div className={`mb-3 ml-3 max-w-xs rounded-md ${bgColor} text-md text-white shadow-lg`} role="alert">
            <div className="font-zhtw flex p-4">
                {text}
                <div className="ml-auto">
                    <button
                        type="button"
                        className={`inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md text-sm text-white/[.5] transition-all hover:text-white focus:outline-none focus:ring-2 ${btnColor}`}
                        onClick={onClick}>
                        <Close />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Close: FC = () => (
    <Fragment>
        <span id="toast-close" className="sr-only">
            Close
        </span>
        <span className="text-[1.25rem]">
            <HiOutlineX />
        </span>
    </Fragment>
);
