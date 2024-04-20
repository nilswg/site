'use client';

import type { FC, ReactNode } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { cn } from '@nilswg/utils';
import { t } from 'i18next';
import { atom, map } from 'nanostores';
import { CgMail, CgSpinner } from 'react-icons/cg';
import { useToasts } from './Toasts';

// export const ContactForm = memo(() => {
//     const { t } = useTranslation();
//     const { setName, setEmail, setTopic, setMessage } = useForm();
//     const fontStyles = getI18nText(t, 'common:fontStyles');

//     const fields = useMemo(() => {
//         return {
//             name: getI18nText(t, 'home:contact.fields.name'),
//             email: getI18nText(t, 'home:contact.fields.email'),
//             topic: getI18nText(t, 'home:contact.fields.topic'),
//             message: getI18nText(t, 'home:contact.fields.message'),
//             send: t('home:contact.send', { defaultValue: 'SEND' }),
//             select: {
//                 choose: getI18nText(t, 'home:contact.topics.choose'),
//                 options: getI18nObjects<{ id: string; text: string }>(t, 'home:contact.topics.options'),
//             },
//         };
//     }, []);

//     return (
//         <Form>
//             <ul className={cn('contact-aufofill flex flex-col gap-8 py-8 text-sm sm:text-lg', fontStyles)}>
//                 <li className="flex flex-col gap-8 sm:flex-row sm:gap-2">
//                     <Form.Field>
//                         <Form.Input type="text" name="name" minLength={3} onChange={setName} />
//                         <Form.Label>{fields.name}</Form.Label>
//                     </Form.Field>
//                     <Form.Field>
//                         <Form.Input type="email" name="email" minLength={8} onChange={setEmail} />
//                         <Form.Label>{fields.email}</Form.Label>
//                     </Form.Field>
//                 </li>
//                 <li>
//                     <Form.Field>
//                         <Form.Select name="topic" onChange={setTopic} defaultValue={fields.select.choose}>
//                             <option disabled className="bg-myblack text-gray-400">
//                                 {fields.select.choose}
//                             </option>
//                             {fields.select.options.map((option) => (
//                                 <option key={option.id} value={option.id} className="bg-myblack text-sky-400">
//                                     {option.text}
//                                 </option>
//                             ))}
//                         </Form.Select>
//                         <Form.Label>{fields.topic}</Form.Label>
//                     </Form.Field>
//                 </li>
//                 <li>
//                     <Form.Field>
//                         <Form.TextArea name={'message'} minLength={10} onChange={setMessage} />
//                         <Form.Label className="peer-placeholder-shown:top-6">{fields.message}</Form.Label>
//                     </Form.Field>
//                 </li>
//                 <li className="self-center sm:self-end">
//                     <Form.SendButton text={fields.send} />
//                 </li>
//             </ul>
//         </Form>
//     );
// });

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
    // const { setMessage, setLoading } = useForm();
    // const { addToast } = useToasts();
    // const onSubmit = useCallback(async (e: React.SyntheticEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         const data = await sendLineMessage(new FormData(e.currentTarget));

    //         /**
    //          * 伺服器回報錯誤，顯示該錯誤
    //          */
    //         if (data.errors) {
    //             /**
    //              * 如果有在字典檔中查找到對應的訊息，就警示訊息，
    //              * 反之，表示為例外錯誤狀況，顯示錯誤訊息。
    //              */
    //             const zodError = t(`common:errorDict.${data.errors}`, {
    //                 defaultValue: '',
    //             });

    //             if (zodError !== '') {
    //                 console.log('[ZodError]', zodError);
    //                 addToast({ type: 'warn', text: zodError });
    //             } else {
    //                 console.log('[ServerError]', data.errors);
    //                 addToast({ type: 'error', text: t('common:errorDict.error') });
    //             }
    //             setLoading(false);
    //             return;
    //         }

    //         /**
    //          * 正確訊息
    //          */
    //         if (data.message === 'ok') {
    //             addToast({ type: 'success', text: t('common:errorDict.success') });
    //             setLoading(false);
    //             // clear message field
    //             // setMessage({ target: { value: '' } } as any);
    //             // page reload
    //             setTimeout(() => window.location.reload(), 1000);
    //             return;
    //         }

    //         /**
    //          * 例外狀況
    //          */
    //         throw new Error('exception');
    //     } catch (error: any) {
    //         /**
    //          * 處理前台語法錯誤
    //          */
    //         console.log('[ERROR]', error.message);
    //         addToast({ type: 'error', text: t('common:errorDict.error') });
    //         setLoading(false);
    //     }
    // }, []);

    return (
        <div className="flex w-full flex-col items-center self-center">
            <form className="w-full max-w-4xl px-9" onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
};

async function sendLineMessage(formData: FormData) {
    const data = await fetch('/api/message', {
        method: 'POST',
        // formData 不需要設定 content-type
        body: formData,
    }).then((data) => data.json());
    return data as { message: string; errors: string };
}

export function useSendLineMessage() {
    const { setLoading } = useForm();
    const { addToast } = useToasts();

    return {
        send: useCallback(async (formData: FormData) => {
            setLoading(true);

            try {
                const data = await sendLineMessage(formData);

                /**
                 * 伺服器回報錯誤，顯示該錯誤
                 */
                if (data.errors) {
                    /**
                     * 如果有在字典檔中查找到對應的訊息，就警示訊息，
                     * 反之，表示為例外錯誤狀況，顯示錯誤訊息。
                     */
                    const zodError = t(`common:errorDict.${data.errors}`, {
                        defaultValue: '',
                    });

                    if (zodError !== '') {
                        console.log('[ZodError]', zodError);
                        addToast({ type: 'warn', text: zodError });
                    } else {
                        console.log('[ServerError]', data.errors);
                        addToast({ type: 'error', text: t('common:errorDict.error') });
                    }
                    setLoading(false);
                    return;
                }

                /**
                 * 正確訊息
                 */
                if (data.message === 'ok') {
                    addToast({ type: 'success', text: t('common:errorDict.success') });
                    setLoading(false);
                    // clear message field
                    // setMessage({ target: { value: '' } } as any);
                    // page reload
                    setTimeout(() => window.location.reload(), 1000);
                    return;
                }

                /**
                 * 例外狀況
                 */
                throw new Error('exception');
            } catch (error: any) {
                /**
                 * 處理前台語法錯誤
                 */
                console.log('[ERROR]', error.message);
                addToast({ type: 'error', text: t('common:errorDict.error') });
                setLoading(false);
            }
        }, []),
    };
}

Form.Field = ({ children }) => {
    return <div className="relative w-full">{children}</div>;
};

Form.Input = (props) => {
    return (
        <input
            type={props.type}
            name={props.name}
            className={cn(
                'h-14',
                'peer w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-2 text-sky-400',
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
            aria-placeholder={props.name.replace(/^\w/, (c) => c.toUpperCase())}
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
                'duration-300" px-1 text-base text-sky-600 transition-["placeholder"]',
                'peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-base',
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
