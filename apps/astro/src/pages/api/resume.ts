import fs from 'fs';
import path from 'path';
import { URLSearchParams } from 'url';
import type { APIRoute } from 'astro';
import { logError, respJson } from '@nilswg-site/service';

export const prerender = false;

const expectPassword = import.meta.env?.['RESUME_DOWNLOAD_PASSWORD'];

export const GET: APIRoute = async ({ params, request }) => {
    const query = new URLSearchParams(request.url.split('?')[1]);
    const lang = query.get('lang');
    const password = query.get('password');

    if (!lang || typeof password !== 'string') {
        return respJson(400, { type: 'warn', code: 'lang_invalid_string' });
    }

    if (!password || typeof password !== 'string') {
        return respJson(400, { type: 'warn', code: 'password_invalid_string' });
    }

    if (password !== expectPassword) {
        return respJson(400, { type: 'warn', code: 'wrong_password' });
    }

    try {
        const resumeName = `resume_${lang ? lang : 'en'}.pdf`;
        const resumePath = path.join(process.cwd(), `public/pdf/${resumeName}`);

        return new Response(
            new ReadableStream({
                start(controller) {
                    controller.enqueue(fs.readFileSync(resumePath));
                    controller.close();
                },
            }),
            {
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="resume.pdf"',
                },
            },
        );
    } catch (error: unknown) {
        logError(JSON.stringify(error));
        return respJson(500, { type: 'error', code: 'server_error' });
    }
};
