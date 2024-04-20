import { GET, POST } from '../../../next/app/api/route'; // 假設您的 API 端點位於 send-message.js 中

// 模擬 request 物件
const mockRequest = {
    name: 'Test User',
    email: 'test@gmail.example.com',
    topic: 'suggest',
    message: 'This is a test message',
};

describe('GET /api', () => {
    it('[next] 測試 GET, 應返回 ok 訊息', async () => {
        // 模擬 API 呼叫
        const response = await GET({} as any);
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ msg: 'ok', method: 'GET' });
    });
    it('[next] 測試 POST, 應返回 ok 訊息', async () => {
        // 模擬 API 呼叫
        const response = await POST(mockRequest as any);
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({ msg: 'ok', method: 'POST' });
    });
});
