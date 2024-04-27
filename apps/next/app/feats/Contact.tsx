'use client';

import type { FC } from 'react';
import { useMemo } from 'react';
import { ContactForm, DecTag } from '@nilswg-site/ui';
import { getI18nObjects, getI18nText } from '@nilswg/i18n';
import { useTranslation } from 'next-i18next';
import { SectionTexts } from '@/components/SectionTexts';
import { VerticalFrame } from '@/components/VerticalFrame';

export const Contact: FC = () => {
    const { t } = useTranslation();
    const { fields, fontStyles } = useMemo(
        () => ({
            fields: {
                name: getI18nText(t, 'home:contact.fields.name'),
                email: getI18nText(t, 'home:contact.fields.email'),
                topic: getI18nText(t, 'home:contact.fields.topic'),
                message: getI18nText(t, 'home:contact.fields.message'),
                send: t('home:contact.send', { defaultValue: 'SEND' }),
                select: {
                    choose: getI18nText(t, 'home:contact.topics.choose'),
                    options: getI18nObjects<{ id: string; text: string }>(t, 'home:contact.topics.options'),
                },
            },
            fontStyles: getI18nText(t, 'common:fontStyles'),
        }),
        [],
    );
    return (
        <section id="contact" className="bg-myblack w-full py-navbar">
            <VerticalFrame>
                <SectionTexts
                    i18nKeys={{
                        title: 'home:contact.title',
                        texts: 'home:contact.texts',
                    }}
                />
                <DecTag className="ml-6">{'<form>'}</DecTag>
            </VerticalFrame>
            <ContactForm fields={fields} fontStyles={fontStyles} />
            <VerticalFrame>
                <DecTag className="ml-6">{'</form>'}</DecTag>
            </VerticalFrame>
        </section>
    );
};
