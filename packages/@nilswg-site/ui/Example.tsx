'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const Example: FC = () => {
    const { t } = useTranslation('home');
    return <p> {JSON.stringify(t('openings.letters', { returnObjects: true }))}</p>;
};
