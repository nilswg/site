import { respJson } from '@nilswg-site/service';

export const POST = async (request: Request) => {
    try {
        const body = await request.formData();
        return respJson(200, { message: `Hello, ${body.get('name')}!` });
    } catch (error: any) {
        return respJson(500, { errors: 'server_error' });
    }
};
