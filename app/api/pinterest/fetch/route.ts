import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Pinterest page: ${response.statusText}`);
    }

    const html = await response.text();

    // Extract JSON data from script tags
    const patterns = [
      /<script id="__PWS_INITIAL_PROPS__" type="application\/json">([\s\S]*?)<\/script>/,
      /<script id="initial-state" type="application\/json">([\s\S]*?)<\/script>/,
      /<script id="__PWS_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
    ];

    let rawData: any = null;
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        try {
          rawData = JSON.parse(match[1]);
          break;
        } catch (e) {
          continue;
        }
      }
    }

    if (!rawData) {
      // Fallback
      const fallbackMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/g);
      if (fallbackMatch) {
        for (const script of fallbackMatch) {
          if (script.includes('images') && script.includes('736x')) {
            try {
              const jsonStr = script.replace(/<script[^>]*>|<\/script>/g, '');
              rawData = JSON.parse(jsonStr);
              break;
            } catch (e) {}
          }
        }
      }
    }

    if (!rawData) {
      return NextResponse.json({ error: 'No Pin data found. The link might be private or invalid.' }, { status: 404 });
    }

    return NextResponse.json(rawData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
