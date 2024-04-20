export const POST = async (request: Request) => {
    return new Response(
        JSON.stringify({
            method: 'POST',
            msg: 'ok',
        }),
    );
};

export const GET = async (request: Request) => {
    return new Response(
        JSON.stringify({
            method: 'GET',
            msg: 'ok',
        }),
    );
};
