import {headers} from "next/headers";


export async function GET(request) {


    const hostname = 'http://127.0.0.1:8000';


    const res = await fetch(hostname + '/files');

    return new Response(res.body, {
      status: 200,
    })
  }