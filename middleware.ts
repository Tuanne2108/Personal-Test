import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // More robust IP extraction for Next.js 15
    const ip = 
        request.headers.get('x-forwarded-for')?.split(',')[0] || 
        request.headers.get('x-real-ip') ||
        request.ip || 
        'unknown';

    // Create a new headers object
    const headers = new Headers(request.headers);
    headers.set('x-forwarded-for', ip);

    return NextResponse.next({
        headers: {
            // Optional: You can add additional headers if needed
            'x-middleware-cache': 'no-cache'
        },
        request: {
            headers: headers
        }
    });
}

export const config = {
    matcher: [
        // More comprehensive path exclusion
        '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
    ],
};