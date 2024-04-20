import type { APIRoute } from 'astro';
import { respJson } from '@nilswg-site/service';

export const prerender = false;

export const POST: APIRoute = async ({ params, request }) => {
    try {
        const body = await request.formData();
        return respJson(200, { message: `Hello, ${body.get('name')}!` });
    } catch (error: any) {
        return respJson(500, { errors: 'server_error' });
    }
};
