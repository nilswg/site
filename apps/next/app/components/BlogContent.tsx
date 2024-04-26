'use client';

import { memo, useMemo } from 'react';
import { CommingSoon, CommingSoonTexts } from '@nilswg-site/ui';
import { useTranslation } from 'next-i18next';

export const BlogContent = memo(() => {
    const { t } = useTranslation();
    const texts = useMemo(
        () => ({
            underConstructionText: t('common:website_under_construction'),
            comingSoonText: t('common:coming_soon'),
        }),
        [],
    );
    return (
        <CommingSoon>
            <CommingSoonTexts texts={texts} />
        </CommingSoon>
    );
});
