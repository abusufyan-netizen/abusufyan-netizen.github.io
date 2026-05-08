import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             '127.0.0.1';

  const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
  const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
  const region = request.headers.get('x-vercel-ip-country-region') || 'Unknown';
  const ua = request.headers.get('user-agent') || 'Unknown';

  return NextResponse.json({
    ip,
    location: {
      city,
      region,
      country,
    },
    userAgent: ua,
    protocol: request.nextUrl.protocol,
  });
}
