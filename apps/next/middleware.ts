// import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18n.config';
import { createMiddleware } from './app/lib/index';

export const middleware = createMiddleware(i18nConfig);
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
