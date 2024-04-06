import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useContactStore } from '@/stores/contact';
import { useToastsStore } from '@/stores/toasts';
import { getI18nText, getI18nTextArray } from '@nilswg/i18n';
import ContactButton from './ContactButton';
import ContactTopics from './ContactTopics';
import SectionText from './SectionText';
import SectionTitle from './SectionTitle';
import { Trans, useTranslation } from './useI18n';

const ContactTexts = () => {
    const { t } = useTranslation('home');
    const contractTitle = getI18nText(t, 'contact.title');
    const contactTexts = getI18nTextArray(t, 'contact.texts');
    return (
        <>
            <SectionTitle text={contractTitle} />
            <SectionText>
                {contactTexts.map((text, i) => (
                    <p key={`contact_text_${i}`}>
                        <Trans
                            i18nKey={text}
                            components={{
                                b: <b />,
                            }}
                        />
                    </p>
                ))}
            </SectionText>
        </>
    );
};

const FormFields = () => {
    const { t } = useTranslation('home');
    const common = useTranslation('common');
    const fontStyles = getI18nText(common.t, 'fontStyles');
    const message = useContactStore((state) => state.message);
    const setMessage = useContactStore((state) => state.setMessage);
    const onMessageChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
        },
        [setMessage],
    );
    return (
        <ul className={`flex flex-col gap-8 py-8 ${fontStyles} contact-aufofill text-sm sm:text-lg`}>
            <li className="flex flex-col gap-8 sm:flex-row sm:gap-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        name="name"
                        className="peer h-14 w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-2 text-sky-400 placeholder-transparent outline-none placeholder-shown:text-gray-400"
                        placeholder={'Name'}
                        minLength={3}
                        required
                    />
                    <label className="bg-myblack pointer-events-none absolute left-4 top-0 translate-y-[-50%] px-1 text-base text-sky-600 duration-300 peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-base">
                        {getI18nText(t, 'contact.fields.name')}
                    </label>
                </div>
                <div className="relative w-full">
                    <input
                        type="text"
                        name="email"
                        className="peer h-14 w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-6 text-sky-400 placeholder-transparent outline-none placeholder-shown:text-gray-400"
                        placeholder={'Email'}
                        minLength={8}
                        required
                    />
                    <label
                        htmlFor="email"
                        className="bg-myblack pointer-events-none absolute left-4 top-0 translate-y-[-50%] px-1 text-base text-sky-600 duration-300 peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-base">
                        {getI18nText(t, 'contact.fields.email')}
                    </label>
                </div>
            </li>
            <li>
                <ContactTopics />
            </li>
            <li>
                <div className="relative w-full">
                    <textarea
                        id="contact-message"
                        name="message"
                        className="xs:h-32 peer h-28 w-full rounded-md border-2 border-sky-600 bg-transparent px-4 py-4 text-sky-400 placeholder-transparent outline-none placeholder-shown:text-gray-400 sm:h-40"
                        placeholder={'Message'}
                        minLength={10}
                        required
                        value={message}
                        onChange={onMessageChange}></textarea>
                    <label
                        htmlFor="message"
                        className="bg-myblack pointer-events-none absolute left-4 top-0 translate-y-[-50%] px-1 text-base text-sky-600 duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-base">
                        {getI18nText(t, 'contact.fields.message')}
                    </label>
                </div>
            </li>
            <li className="self-center sm:self-end">
                <ContactButton text={t('contact.send', { defaultValue: 'SEND' })} />
            </li>
        </ul>
    );
};

const FormFrame = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation('common');
    const setLoading = useContactStore((state) => state.setLoading);
    const setMessage = useContactStore((state) => state.setMessage);
    const addToast = useToastsStore((state) => state.addToast);
    const onSubmit = useCallback(
        async (e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();

            const elements = e.target as typeof e.target & {
                email: { value: string };
                message: { value: string };
                name: { value: string };
                topic: { value: string };
            };

            const json = {
                email: elements.email.value,
                message: elements.message.value,
                name: elements.name.value,
                topic: elements.topic.value,
            };

            setLoading(true);

            try {
                const data: { message: string; errors: string } = await fetch('/api/message', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(json),
                }).then((data) => data.json());

                /**
                 * 伺服器回報錯誤，顯示該錯誤
                 */
                if (data.errors) {
                    /**
                     * 如果有在字典檔中查找到對應的訊息，就警示訊息，
                     * 反之，表示為例外錯誤狀況，顯示錯誤訊息。
                     */
                    const zodError = t(`errorDict.${data.errors}`, {
                        defaultValue: '',
                    });

                    if (zodError !== '') {
                        console.log('[ZodError]', zodError);
                        addToast({ type: 'warn', text: zodError });
                    } else {
                        console.log('[ServerError]', data.errors);
                        addToast({ type: 'error', text: t('errorDict.error') });
                    }
                    setLoading(false);
                    return;
                }

                /**
                 * 正確訊息
                 */
                if (data.message === 'ok') {
                    addToast({ type: 'success', text: t('errorDict.success') });
                    setLoading(false);
                    // clear message field
                    setMessage('');
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
                addToast({ type: 'error', text: t('errorDict.error') });
                setLoading(false);
            }
        },
        [setLoading, setMessage, t], // <== t: 強制根據語系改變刷新
    );

    return (
        <div className="flex w-full flex-col items-center self-center">
            <form className="w-full max-w-4xl px-9" onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
};

const VerticalFrame = ({ children }: { children: ReactNode }) => (
    <div className="2xl:flex 2xl:w-2/5 2xl:justify-end">
        <div className="w-full max-w-3xl">{children}</div>
    </div>
);

const Contact = () => (
    <section id="contact" className={`bg-myblack w-full py-[var(--navbar-height)]`}>
        <VerticalFrame>
            <ContactTexts />
            <h1 className="tags pl-6">{'<form>'}</h1>
        </VerticalFrame>
        <FormFrame>
            <FormFields />
        </FormFrame>
        <VerticalFrame>
            <h1 className="tags pl-6">{'</form>'}</h1>
        </VerticalFrame>
    </section>
);

export default Contact;
