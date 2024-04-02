import i18nConfig from './i18n.config';
import { createMiddleware } from '@nilswg/i18n-next';

export const middleware = createMiddleware(i18nConfig);
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
