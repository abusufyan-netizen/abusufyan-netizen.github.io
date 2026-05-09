import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    let finalResponse = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      },
    });

    const html = await finalResponse.text();
    const pins: any[] = [];
    const seen = new Set();

    // Aggressive Pin Extraction from ALL script tags
    const scriptMatches = Array.from(html.matchAll(/<script id=".*?" type="application\/json">([\s\S]*?)<\/script>/g));
    
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
        const values = Object.values(obj);
        for (const val of values) {
          deepSearch(val, depth + 1);
        }
      }
    };

    for (const match of scriptMatches) {
      try {
        const data = JSON.parse(match[1]);
        deepSearch(data);
      } catch (e) {}
    }

    // Fallback: LD+JSON
    if (pins.length < 5) {
      const ldMatches = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
      for (const match of ldMatches) {
        try {
          const data = JSON.parse(match[1]);
          const items = data.itemListElement || [];
          items.forEach((item: any) => {
            if (item.image && !seen.has(item.image)) {
              seen.add(item.image);
              pins.push({
                id: `ld_${pins.length}`,
                title: item.name || 'Pinterest Image',
                url: item.image,
                thumbnail: item.image
              });
            }
          });
        } catch (e) {}
      }
    }

    // Final Fallback: Regex for originals
    if (pins.length < 5) {
      const imgRegex = /"(https:\/\/i\.pinimg\.com\/originals\/[a-z0-9\/]+\.jpg)"/gi;
      const matches = Array.from(html.matchAll(imgRegex));
      for (const match of matches) {
        if (!seen.has(match[1])) {
          seen.add(match[1]);
          pins.push({
            id: `reg_${pins.length}`,
            title: `Image ${pins.length + 1}`,
            url: match[1],
            thumbnail: match[1]
          });
        }
      }
    }

    if (pins.length === 0) {
      return NextResponse.json({ error: 'No images found. Ensure the link is public.' }, { status: 404 });
    }

    return NextResponse.json({ pins });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to access the link.' }, { status: 500 });
  }
}
