import { z } from "zod";
import { logError, respJson, useZodError } from "./utils";

export const messageSchema = z.object({
    name: z.string().min(3),
    email: z.string().email().min(8),
    topic: z.enum(['suggest', 'ask', 'job', 'other']),
    message: z.string().min(10),
});
export type LineMessage = z.infer<typeof messageSchema>;

export function createLineMessage(data: LineMessage) {
    const res = `\
【${data.topic}】
[名稱]: ${data.name}
[信箱]: ${data.email}
------------------訊息------------------
 ${data.message}
`;
    const formData = new FormData();
    formData.append('message', res);
    return formData;
}

export function getMessageOrError(data: object | FormData) {
    const result = data instanceof FormData ? messageSchema.safeParse(Object.fromEntries(data)) : messageSchema.safeParse(data);
    if (result.success) {
        return result.data;
    }

    const { errors } = useZodError(result.error);
    logError(JSON.stringify(result.error.issues));
    logError(errors);
    throw respJson(400, { errors });
}