'use client';

import type { FC } from 'react';
import { DecTag } from '@nilswg-site/ui';
import { SectionTexts } from '@/components/SectionTexts';
import { VerticalFrame } from '@/components/VerticalFrame';
import { ContactForm } from '@/components/ContactForm';

export const Contact: FC = () => {
    return (
        <section id="contact" className="bg-myblack w-full py-[var(--navbar-height)]">
            <VerticalFrame>
                <SectionTexts
                    i18nKeys={{
                        title: 'home:contact.title',
                        texts: 'home:contact.texts',
                    }}
                />
                <DecTag className="ml-6">{'<form>'}</DecTag>
            </VerticalFrame>
            <ContactForm />
            <VerticalFrame>
                <DecTag className="ml-6">{'</form>'}</DecTag>
            </VerticalFrame>
        </section>
    );
};
