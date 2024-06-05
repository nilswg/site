import { FC, memo, useMemo } from 'react';
import { SectionText, SectionTitle } from '@nilswg-site/ui';
import { getI18nTextArray } from '@nilswg/i18n';
import { Trans, useTranslation } from 'next-i18next';

export const SectionTexts: FC<{
    i18nKeys: {
        title: string;
        texts: string;
    };
}> = memo(({ i18nKeys }) => {
    const { t } = useTranslation('home');
    const lang = t('common:lang');
    const texts = useMemo(() => getI18nTextArray(t, i18nKeys.texts), []);
    const { titleStyle, textStyle } = useMemo(() => {
        return lang === 'zh-TW' ? {
            titleStyle: 'font-notosans font-bold mb-3',
            textStyle: 'font-zhtw',
        } : {
            titleStyle: 'font-russon font-normal',
            textStyle: 'font-outfit',
        };
    }, [lang]);
    return (
        <>
            <SectionTitle className={titleStyle} text={t(i18nKeys.title)} />
            <SectionText className={textStyle}>
                {texts.map((text, i) => (
                    <p key={i}>
                        <Trans i18nKey={text} components={{ b: <b /> }} />
                    </p>
                ))}
            </SectionText>
        </>
    );
});
