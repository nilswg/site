'use client';

import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { cn } from '@nilswg/utils';
import { t } from 'i18next';
import { Form, useForm } from './Form';
import { useToasts } from './stores/toasts';

type Props_ContactForm = {
    fields: {
        name: string;
        email: string;
        topic: string;
        message: string;
        send: string;
        select: {
            choose: string;
            options: { id: string; text: string }[];
        };
    };
    fontStyles: string;
};

export const ContactForm: FC<Props_ContactForm> = memo(({ fields, fontStyles }) => {
    const { setName, setEmail, setTopic, setMessage } = useForm();
    const { send } = useSendLineMessage();
    const { addToast } = useToasts();
    const { setLoading } = useForm();

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        let __form = e.currentTarget;
        e.preventDefault();
        setLoading(true);
        const res = await send(new FormData(e.currentTarget));
        res.type === 'success' && __form.reset();
        addToast({ type: res.type, text: res.message });
        setLoading(false);
    }, []);

    return (
        <Form onSubmit={onSubmit}>
            <ul className={cn('contact-aufofill flex flex-col gap-8 py-8 text-sm sm:text-lg', fontStyles)}>
                <li className="flex flex-col gap-8 sm:flex-row sm:gap-2">
                    <Form.Field>
                        <Form.Input type="text" name="name" minLength={3} onChange={setName} />
                        <Form.Label>{fields.name}</Form.Label>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input type="email" name="email" minLength={8} onChange={setEmail} />
                        <Form.Label>{fields.email}</Form.Label>
                    </Form.Field>
                </li>
                <li>
                    <Form.Field>
                        <Form.Select name="topic" onChange={setTopic} defaultValue={fields.select.choose}>
                            <option disabled className="bg-myblack text-gray-400">
                                {fields.select.choose}
                            </option>
                            {fields.select.options.map((option) => (
                                <option key={option.id} value={option.id} className="bg-myblack text-sky-400">
                                    {option.text}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Label>{fields.topic}</Form.Label>
                    </Form.Field>
                </li>
                <li>
                    <Form.Field>
                        <Form.TextArea name={'message'} minLength={10} onChange={setMessage} />
                        <Form.Label className="peer-placeholder-shown:top-6">{fields.message}</Form.Label>
                    </Form.Field>
                </li>
                <li className="self-center sm:self-end">
                    <Form.SendButton text={fields.send} />
                </li>
            </ul>
        </Form>
    );
});

export function useSendLineMessage() {
    return {
        send: useCallback(async (formData: FormData): Promise<{ type: 'warn' | 'success' | 'error'; message: string }> => {
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
                        return { type: 'warn', message: zodError };
                    } else {
                        return { type: 'error', message: t('common:errorDict.error') };
                    }
                }

                /**
                 * 正確訊息
                 */
                if (data.message === 'ok') {
                    return { type: 'success', message: t('common:errorDict.success') };
                }

                /**
                 * 例外狀況
                 */
                return { type: 'error', message: 'exception' };
            } catch (error: any) {
                /**
                 * 處理前台語法錯誤
                 */
                return { type: 'error', message: t('common:errorDict.error') };
            }
        }, []),
    };
}

async function sendLineMessage(formData: FormData) {
    const data = await fetch('/api/message', {
        method: 'POST',
        // formData 不需要設定 content-type
        body: formData,
    }).then((data) => data.json());
    return data as { message: string; errors: string };
}
