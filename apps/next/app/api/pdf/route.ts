import fs from 'fs';
import path from 'path';

export const prerender = false;

export const GET = async (request: Request) => {
    try {
        const pdfFilePath = path.join(process.cwd(), `public/pdf/resume_en.pdf`);

        // Read the PDF file into a buffer
        const pdfBuffer = fs.readFileSync(pdfFilePath);

        // Create a ReadableStream from the buffer
        const pdfStream = new ReadableStream({
            start(controller) {
                controller.enqueue(pdfBuffer);
                controller.close();
            },
        });

        // Create a Response object with the PDF stream and headers
        return new Response(pdfStream, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume_en.pdf"',
            },
        });

        return new Response(JSON.stringify({ errors: 'wrong_password' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(JSON.stringify({ errors: 'error' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
};
