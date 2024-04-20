import { memo, useCallback, useMemo } from 'react';
import { Form, useForm, useSendLineMessage } from '@nilswg-site/ui';
import { getI18nObjects, getI18nText } from '@nilswg/i18n';
import { cn } from '@nilswg/utils';
import { useTranslation } from './useI18n';

export const ContactForm = memo(() => {
    const { t } = useTranslation();
    const { setName, setEmail, setTopic, setMessage } = useForm();
    const fontStyles = getI18nText(t, 'common:fontStyles');
    const { send } = useSendLineMessage();

    const fields = useMemo(() => {
        return {
            name: getI18nText(t, 'home:contact.fields.name'),
            email: getI18nText(t, 'home:contact.fields.email'),
            topic: getI18nText(t, 'home:contact.fields.topic'),
            message: getI18nText(t, 'home:contact.fields.message'),
            send: t('home:contact.send', { defaultValue: 'SEND' }),
            select: {
                choose: getI18nText(t, 'home:contact.topics.choose'),
                options: getI18nObjects<{ id: string; text: string }>(t, 'home:contact.topics.options'),
            },
        };
    }, []);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        send(new FormData(e.currentTarget));
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
