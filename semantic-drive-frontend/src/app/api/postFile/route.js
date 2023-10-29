
import { headers } from 'next/headers'


export async function POST(request) {
    const hostname = 'http://127.0.0.1:8000';
    const uploadTime = new Date().toISOString();
    const fileType = fileName.split('.').pop();

    const res = await fetch(hostname + '/file', {
        method: 'POST',
        headers: {

            ...request.headers,
            "uploadTime": uploadTime,

        },
        body:request.body
    });


    return new Response(res.body, {
        status: res.status,
    })

}