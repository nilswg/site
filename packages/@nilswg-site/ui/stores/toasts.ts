'use client';

import { useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { map } from 'nanostores';

export type ToastType = 'success' | 'info' | 'warn' | 'error';

type Toast = {
    id: string;
    type: ToastType;
    text: string;
};

const toastStore = map<{ index: number; toasts: Toast[] }>({
    index: 0,
    toasts: [],
});

const addToast = (newToast: Omit<Toast, 'id'>) => {
    const { index, toasts } = toastStore.get();
    toastStore.set({
        toasts: [...toasts, { id: '#' + index, ...newToast }],
        index: index + 1,
    });
};

const removeToast = (id: string) => {
    toastStore.setKey(
        'toasts',
        toastStore.get().toasts.filter((e) => e.id !== id),
    );
};

export const useToasts = () => {
    return useMemo(
        () => ({
            $toasts: () => useStore(toastStore).toasts,
            addToast,
            removeToast,
        }),
        [],
    );
};
