import type { APIRoute } from 'astro';
import { createLineMessage, getMessageOrError, isJson, lineNotify, logError, messageSchema, respJson, useZodError } from '@nilswg-site/service';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    return new Response(
        JSON.stringify({
            method: 'GET',
            msg: 'ok',
        }),
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        },
    );
};

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const requestData = isJson(request) ? await request.json() : await request.formData();
        const lineMessage = createLineMessage(getMessageOrError(requestData));
        /**
         * 使用 Line Notify API 發送訊息
         */
        const resp = await lineNotify($token(), lineMessage);
        if (resp.status === 200) {
            return respJson(resp.status, { message: resp.message });
        }
        /**
         * 發送 Line Notify API 失敗
         */
        logError(resp.message);
        return respJson(500, { errors: 'line_notify_error' });
    } catch (error: any) {
        if (error instanceof Response) {
            return error;
        }
        logError(error.message);
        return respJson(500, { errors: 'server_error' });
    }
};

const $env = (key: string) => import.meta.env?.[key] || process.env?.[key] || '';
const $token = () => {
    const token = $env('LINE_NOTIFY_TOKEN');
    if (!!token) return token;

    logError('LINE_NOTIFY_TOKEN is not found.');
    throw respJson(500, { errors: 'line_notify_token_is_empty' });
};
