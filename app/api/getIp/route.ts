import { NextRequest, NextResponse } from 'next/server';
// import requestIp from 'request-ip';

export async function GET(req: NextRequest) {
    const forwarded = req.headers.get('x-forwarded-for');

    let clientIp = '';
    if (forwarded) {
        const forwardedIps = forwarded.split(',');
        clientIp = forwardedIps[0].trim();
    }

    return NextResponse.json({ ip: clientIp });
}
