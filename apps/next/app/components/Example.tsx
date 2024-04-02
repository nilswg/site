'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Example: FC = () => {
    const { t } = useTranslation();
    return <p> {JSON.stringify(t('openings.letters'))}</p>;
};
