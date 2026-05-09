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

    // 1. Extract the large JSON blob (contains all pins on the page)
    const jsonPattern = /<script id="__PWS_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
    const match = html.match(jsonPattern);
    
    if (match && match[1]) {
      try {
        const data = JSON.parse(match[1]);
        
        // Use a simple deep search for pin objects in the JSON
        const deepSearch = (obj: any, depth = 0) => {
          if (!obj || typeof obj !== 'object' || depth > 10) return;
          
          if (obj.images && (obj.images.orig || obj.images['736x'])) {
            const imgUrl = obj.images.orig?.url || obj.images['736x']?.url;
            if (imgUrl && !seen.has(imgUrl)) {
              seen.add(imgUrl);
              pins.push({
                id: obj.id || `pin_${pins.length}`,
                title: obj.title || obj.grid_title || 'Pinterest Image',
                url: imgUrl,
                thumbnail: obj.images['236x']?.url || obj.images['474x']?.url || imgUrl
              });
            }
          } else {
            Object.values(obj).forEach(val => deepSearch(val, depth + 1));
          }
        };
        
        deepSearch(data);
      } catch (e) {}
    }

    // 2. Fallback: If JSON search missed everything, use Regex on HTML
    if (pins.length === 0) {
      const imgRegex = /"(https:\/\/i\.pinimg\.com\/originals\/[a-z0-9\/]+\.jpg)"/gi;
      const originals = Array.from(html.matchAll(imgRegex)).map(m => m[1]);
      originals.forEach((origUrl, index) => {
        if (!seen.has(origUrl)) {
          seen.add(origUrl);
          pins.push({
            id: `reg_${index}`,
            title: `Image ${index + 1}`,
            url: origUrl,
            thumbnail: origUrl
          });
        }
      });
    }

    if (pins.length === 0) {
      return NextResponse.json({ error: 'No images found. Ensure the link is public.' }, { status: 404 });
    }

    return NextResponse.json({ pins });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to access the link.' }, { status: 500 });
  }
}
