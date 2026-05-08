import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const chain = [];
    let currentUrl = url.startsWith('http') ? url : `https://${url}`;
    let redirectCount = 0;
    const maxRedirects = 5;

    while (redirectCount < maxRedirects) {
      const response = await fetch(currentUrl, {
        method: 'HEAD',
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        },
      });

      const status = response.status;
      const location = response.headers.get('location');

      chain.push({
        url: currentUrl,
        status: status,
        statusText: response.statusText,
      });

      if (status >= 300 && status < 400 && location) {
        // Resolve relative URLs
        currentUrl = new URL(location, currentUrl).href;
        redirectCount++;
      } else {
        break;
      }
    }

    return NextResponse.json({
      success: true,
      chain: chain,
      finalUrl: currentUrl,
      redirects: redirectCount,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
