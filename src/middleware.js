// middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl
    // console.log(pathname)
    // if (pathname.startsWith("/_next") ||  pathname.includes("/api/auth") || token) {
    //     return NextResponse.next()
    // }

    if (!token && pathname.includes("tracks")) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon-light.ico|favicon-dark.ico).*)',
    ],
}