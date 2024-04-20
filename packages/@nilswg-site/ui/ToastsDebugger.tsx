'use client';

import type { ToastType } from './stores/toasts';
import { createContext, FC, memo, useCallback, useContext, useMemo, useRef } from 'react';
import { useToasts } from './stores/toasts';

const Context = createContext<{
    state: { type: ToastType; text: string };
    onTextChange: (e: any) => void;
    onTypeChange: (e: any) => void;
}>({
    state: { type: 'success', text: 'Toast Alert!' },
    onTextChange: () => {},
    onTypeChange: () => {},
});

const ToastsDebugger = () => {
    return (
        <DebuggerProvider>
            <div className="fixed left-3 top-20 z-20 w-[20rem]">
                <div className="mb-4 flex flex-col gap-4 px-3 text-white">
                    <div className="flex flex-row items-start">
                        <Label>type </Label>
                        <DebugSelect options={['Success', 'Warn', 'Info', 'Error']} />
                    </div>
                    <div className="flex flex-row items-start">
                        <Label>text </Label>
                        <DebugTextarea />
                    </div>
                    <AddToastButton />
                </div>
            </div>
        </DebuggerProvider>
    );
};

const Label = ({ children }: { children: string }) => {
    return <label className="inline-block w-10">{children}</label>;
};

const DebugSelect: FC<{ options: string[] }> = memo(({ options }) => {
    const { onTypeChange } = useContext(Context);
    return (
        <select className="w-full rounded-sm border border-white bg-black bg-transparent" onChange={onTypeChange}>
            {options.map((type) => (
                <option key={type} className="bg-black" value={type.toLowerCase()}>
                    {type}
                </option>
            ))}
        </select>
    );
});

const DebugTextarea = memo(() => {
    const { onTextChange } = useContext(Context);
    return <textarea className="min-h-[5rem] w-full rounded-sm border border-white bg-transparent" onChange={onTextChange} />;
});

const AddToastButton = memo(() => {
    const { state } = useContext(Context);
    const { addToast } = useToasts();
    const onClick = useCallback(() => addToast(state), []);
    return (
        <button className="ml-8 border border-white px-4 py-3" onClick={onClick}>
            add Toast
        </button>
    );
});

const DebuggerProvider = ({ children }: { children: React.ReactNode }) => {
    const state = useRef<{ type: ToastType; text: string }>({ type: 'success', text: 'Toast Alert!' });
    return (
        <Context.Provider
            value={useMemo(
                () => ({
                    state: state.current,
                    onTextChange: (e: any) => {
                        state.current.text = e.target.value;
                    },
                    onTypeChange: (e: any) => {
                        state.current.type = e.target.value;
                    },
                }),
                [],
            )}>
            {children}
        </Context.Provider>
    );
};

export default ToastsDebugger;
