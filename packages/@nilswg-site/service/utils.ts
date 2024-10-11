import fs from 'fs';
import path from 'path';
import { z } from 'zod';

export function useZodError(error: z.ZodError) {
    const firstIssue = error.issues[0];
    const zodErrStr = firstIssue.path[0] + '_' + firstIssue.code;
    return {
        errors: zodErrStr,
    };
}

export function logError(error: string) {
    if (process.env.NODE_ENV === 'production') return;
    fs.appendFileSync(path.resolve('../../log/error.log'), new Date().toISOString() + ' ' + error + '\n');
}

export function respJson(status: number, data: object) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'content-type': 'application/json',
        },
    });
}

export function isJson(resp: Request): boolean {
    return resp.headers.get('content-type')?.includes('application/json') ?? false;
}
