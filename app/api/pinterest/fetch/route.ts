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

    const html = await response.text();
    const pins: any[] = [];
    const seen = new Set();

    // 1. Simple Regex Extraction (Works for both Pins and Boards)
    // Matches the common pattern for Pinterest image objects in SSR data
    const imgRegex = /"(https:\/\/i\.pinimg\.com\/originals\/[a-z0-9\/]+\.jpg)"/gi;
    const thumbRegex = /"(https:\/\/i\.pinimg\.com\/236x\/[a-z0-9\/]+\.jpg)"/gi;
    
    const originals = Array.from(html.matchAll(imgRegex)).map(m => m[1]);
    const thumbnails = Array.from(html.matchAll(thumbRegex)).map(m => m[1]);

    // Pair them up or just take unique originals
    originals.forEach((origUrl, index) => {
      if (!seen.has(origUrl)) {
        seen.add(origUrl);
        pins.push({
          id: `pin_${index}_${Math.random().toString(36).substr(2, 5)}`,
          title: `Pinterest Image ${index + 1}`,
          url: origUrl,
          thumbnail: thumbnails[index] || origUrl
        });
      }
    });

    // 2. Fallback to common JSON-LD pattern if regex missed everything
    if (pins.length === 0) {
      const ldMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      if (ldMatch) {
        try {
          const data = JSON.parse(ldMatch[1]);
          const items = data.itemListElement || [];
          items.forEach((item: any, i: number) => {
            if (item.image && !seen.has(item.image)) {
              seen.add(item.image);
              pins.push({
                id: `ld_${i}`,
                title: item.name || 'Pinterest Image',
                url: item.image,
                thumbnail: item.image
              });
            }
          });
        } catch (e) {}
      }
    }

    if (pins.length === 0) {
      return NextResponse.json({ error: 'No images found. Please ensure the link is public.' }, { status: 404 });
    }

    return NextResponse.json({ pins });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to access the link. Please check the URL.' }, { status: 500 });
  }
}
