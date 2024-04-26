'use client';

import type { FC, ReactNode } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { cn } from '@nilswg/utils';
import { t } from 'i18next';
import { atom, map } from 'nanostores';
import { CgMail, CgSpinner } from 'react-icons/cg';
import { useToasts } from './stores/toasts';

type FormCompound = FC<{ children: ReactNode; onSubmit?: (e: React.SyntheticEvent<HTMLFormElement>) => void }> & {
    Field: FC<{ children: ReactNode }>;
    Input: FC<{
        type: string;
        name: string;
        minLength: number;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }>;
    TextArea: FC<{ name: string; minLength: number; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }>;
    Label: FC<{ children: ReactNode; className?: string }>;
    Select: FC<{
        name: string;
        defaultValue: string;
        children: ReactNode;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    }>;
    SendButton: FC<{ text: string; className?: string }>;
};

export const Form: FormCompound = ({ children, onSubmit }) => {
    return (
        <div className="flex w-full flex-col items-center self-center">
            <form className="w-full max-w-4xl px-9" onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
};

Form.Field = ({ children }) => {
    return <div className="relative w-full text-xl">{children}</div>;
};

Form.Input = (props) => {
    return (
        <input
            type={props.type}
            name={props.name}
            className={cn(
                'peer h-14 w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-2 text-sky-400',
                'placeholder-transparent outline-none placeholder-shown:text-gray-400',
            )}
            placeholder={props.name.replace(/^\w/, (c) => c.toUpperCase())}
            minLength={props.minLength}
            required
            onChange={props.onChange} //
        />
    );
};

Form.TextArea = (props) => {
    return (
        <textarea
            name={props.name}
            className={cn(
                'xs:h-32 h-28 sm:h-40',
                'peer w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-2 text-sky-400',
                'placeholder-transparent outline-none placeholder-shown:text-gray-400',
            )}
            placeholder={props.name.replace(/^\w/, (c) => c.toUpperCase())}
            minLength={props.minLength}
            required
            onChange={props.onChange}></textarea>
    );
};

Form.Select = (props) => {
    return (
        <select
            className={cn(
                'peer h-14 w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-2 text-sky-400',
                'placeholder-transparent outline-none placeholder-shown:text-gray-400',
            )}
            name={props.name}
            data-placeholder={props.name.replace(/^\w/, (c) => c.toUpperCase())}
            aria-label="Select a topic"
            required
            defaultValue={props.defaultValue}
            onChange={props.onChange} //
        >
            {props.children}
        </select>
    );
};

Form.Label = ({ children, className }) => {
    return (
        <label
            className={cn(
                'bg-myblack pointer-events-none absolute left-4 top-0 translate-y-[-50%]',
                'duration-300" px-1 text-sky-400 transition-["placeholder"]',
                'text-base peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-base',
                className,
            )}>
            {children}
        </label>
    );
};

Form.SendButton = memo(({ text, className }) => {
    const loading = useForm().isLoading();
    return (
        <button className={cn('flat-btn group flex w-full items-center justify-center gap-0', className)} type="submit" disabled={loading}>
            <input className="cursor-pointer tracking-[0.5rem]" type="submit" value={text} disabled={loading} />
            {loading ? <Loading /> : <Ready />}
        </button>
    );
});

const Loading = () => (
    <span className=" cursor-pointer">
        <CgSpinner className={`h-6 w-8 animate-[spin_1s_linear_infinite] text-sky-400`} />
    </span>
);

const Ready = () => (
    <span className="cursor-pointer group-hover:animate-[3s_both_shakeY_infinite]">
        <CgMail className="h-6 w-8" />
    </span>
);

type Props_FormData = {
    email: string;
    message: string;
    name: string;
    topic: string;
};

const $isLoading = atom<boolean>(false);
const $formData = map<Props_FormData>({
    email: '',
    message: '',
    name: '',
    topic: '',
});
const setName = (e: React.ChangeEvent<HTMLInputElement>) => $formData.setKey('name', e.target.value);
const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => $formData.setKey('email', e.target.value);
const setTopic = (e: React.ChangeEvent<HTMLSelectElement>) => $formData.setKey('topic', e.target.value);
const setMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => $formData.setKey('message', e.target.value);

export const useForm = () => {
    return useMemo(
        () => ({
            setName,
            setEmail,
            setTopic,
            setMessage,
            formData: () => $formData.get(),
            isLoading: () => useStore($isLoading),
            setLoading: (loading: boolean) => $isLoading.set(loading),
        }),
        [],
    );
};
