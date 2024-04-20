import { describe, it, jest } from '@jest/globals';
import { createLineMessage } from '@nilswg-site/service';
import { GET, POST } from '../../../astro/src/pages/api/message'; // 假設您的 API 端點位於 send-message.js 中

// 模擬 request 物件
const mockRequest = {
    name: 'Test User',
    email: 'test@gmail.example.com',
    topic: 'suggest',
    message: 'This is a test message',
} as const;

const errMockRequest = {
    name: 'Te',
    email: '',
} as const;
describe('[astro] /api/message', () => {
    beforeEach(() => {
        // 模擬環境變數
        // @ts-ignore
        process.env = { LINE_NOTIFY_TOKEN: 'test' };
    });
    it('測試 createLineMessage, 應返回 formData', async () => {
        const formData = createLineMessage(mockRequest);
        expect(formData).toBeInstanceOf(FormData);
        expect(formData.get('message')).toBeTruthy();
    });
    it('測試 GET, 應返回 ok 訊息', async () => {
        const response = await GET({} as any);
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ msg: 'ok', method: 'GET' });
    });
    it('測試 POST, 應返回 zod 錯誤訊息 json', async () => {
        const response = await POST({
            request: {
                headers: new Map([['content-type', 'application/json']]),
                json: () => Promise.resolve(errMockRequest),
            },
        } as any);
        expect(response.status).toBe(400);
        expect(response.headers.get('content-type')).toBe('application/json');
        expect(await response.json()).toHaveProperty('errors');
    });
    it('測試 POST, 應返回 zod 錯誤訊息 [formData]', async () => {
        const response = await POST({
            request: {
                headers: new Map(),
                formData: () => Promise.resolve($formData(errMockRequest)),
            },
        } as any);
        expect(response.status).toBe(400);
        expect(response.headers.get('content-type')).toBe('application/json');
        expect(await response.json()).toHaveProperty('errors');
    });
    it('測試發送 Line Notify API, 應返回成功訊息 [json]', async () => {
        const mockResponse = new Response(JSON.stringify({ message: 'success', status: 200 }));
        // @ts-ignore
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        const response = await POST({
            request: {
                headers: new Map([['content-type', 'application/json']]),
                json: () => Promise.resolve(mockRequest),
            },
        } as any);

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ message: 'success' });
    });
    it('測試發送 Line Notify API, 應返回成功訊息 [formData]', async () => {
        const mockResponse = new Response(JSON.stringify({ message: 'success', status: 200 }));
        // @ts-ignore
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
        const response = await POST({
            request: {
                headers: new Map(),
                formData: () => Promise.resolve($formData(mockRequest)),
            },
        } as any);

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ message: 'success' });
    });
    it('測試發送 Line Notify API, 應返回錯誤訊息 [json]', async () => {
        const mockResponse = new Response(JSON.stringify({ errors: 'line_notify_error', status: 500 }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
        global.fetch = jest.fn<() => Promise<Response>>().mockResolvedValue(mockResponse);
        const response = await POST({
            request: {
                headers: new Map([['content-type', 'application/json']]),
                json: () => Promise.resolve(mockRequest),
            },
        } as any);

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ errors: 'line_notify_error' });
    });
    it('測試發送 Line Notify API, 應返回錯誤訊息 [formData]', async () => {
        const mockResponse = new Response(JSON.stringify({ errors: 'line_notify_error', status: 500 }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
        global.fetch = jest.fn<() => Promise<Response>>().mockResolvedValue(mockResponse);
        const response = await POST({
            request: {
                headers: new Map(),
                formData: () => Promise.resolve($formData(mockRequest)),
            },
        } as any);

        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ errors: 'line_notify_error' });
    });

    function $formData(data: Record<string, string>) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        return formData;
    }
});
