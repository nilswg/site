import { FC, useMemo } from 'react';
import { SectionText, SectionTitle } from '@nilswg-site/ui';
import { getI18nTextArray } from '@nilswg/i18n';
import { Trans, useTranslation } from 'next-i18next';

export const SectionTexts: FC<{
    i18nKeys: {
        title: string;
        texts: string;
    };
}> = ({ i18nKeys }) => {
    const { t } = useTranslation('home');
    const lang = t('common:lang');
    const texts = useMemo(() => getI18nTextArray(t, i18nKeys.texts), []);
    return (
        <>
            <SectionTitle lang={lang} text={t(i18nKeys.title)} />
            <SectionText lang={lang}>
                {texts.map((text, i) => (
                    <p key={i}>
                        <Trans i18nKey={text} components={{ b: <b /> }} />
                    </p>
                ))}
            </SectionText>
        </>
    );
};
