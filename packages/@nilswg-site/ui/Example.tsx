'use client';

import type { FC } from 'react';
import { t } from 'i18next';

export const Example: FC = () => {
    return <p> {JSON.stringify(t('home:openings.letters', { returnObjects: true }))}</p>;
};
