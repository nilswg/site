import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {
    return new Response(
        JSON.stringify({
            method: 'POST',
            msg: 'ok',
        })
    )
}

export const GET: APIRoute = async ({ params, request }) => {
    return new Response(
        JSON.stringify({
            method: 'GET',
            msg: 'ok',
        })
    )
}