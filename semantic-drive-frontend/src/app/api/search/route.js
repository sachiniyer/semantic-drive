
import { headers } from 'next/headers'


export async function GET(request) {
    const hostname = 'http://127.0.0.1:8000';
    const searchParams = request.nextUrl.searchParams

    const res = await fetch(hostname + '/search', {
        headers: {
            'terms': searchParams,
        }
    });


    return new Response(res.body, {
        status: 200
    })


}