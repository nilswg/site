'use client';

import { initTranslations } from '@/i18n';
import { $TranslationProvider } from '@/lib';
import i18nConfig from 'i18n.config';

export const TranslationProvider = $TranslationProvider(initTranslations, i18nConfig);
