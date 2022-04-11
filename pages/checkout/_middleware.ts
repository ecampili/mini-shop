import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
//import { jwt } from '../../utils';
import {getToken} from 'next-auth/jwt'


export async function middleware( req: NextRequest | any, ev: NextFetchEvent ) {


    const session = await getToken({req,secret:process.env.NEXTAUTH_SECRET})
    // console.log('session',session);

    if(!session){
        const url = req.nextUrl.clone()
        url.pathname = '/auth/login';
        url.search = `page=${req.page.name}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next()

    // const { token = '' } = req.cookies;
    // // return new Response('No autorizado', {
    // //     status: 401
    // // });
    // try {
    //     await jwt.isValidToken( token );
    //     return NextResponse.next();
    // } catch (error) {
        
    //     const url = req.nextUrl.clone()
    //     url.pathname = '/auth/login';
    //     url.search = `page=${req.page.name}`;
    //     return NextResponse.redirect(url);
    // }



}

