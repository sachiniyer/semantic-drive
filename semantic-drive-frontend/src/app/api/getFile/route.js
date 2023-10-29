
import { headers } from 'next/headers'
 
 
export async function GET(request) {
   

    const hostname = 'http://127.0.0.1:8000';
    
    const headersList = headers()
    const fileId = headersList.get('fileId')

    // const res = await fetch(hostname + '/file', {
    //     headers: {
    //         'fileId': fileId,
    //     }
    // });

    const res = await fetch("https://link.testfile.org/PDF10MB")

    console.log(res)

    const filename = "Hello";

    return new Response(res.body, {
      status: res.status,
      headers: {
        ...res.headers,
        "content-disposition": `attachment; filename="${filename}`
      }
    })
  }
  
