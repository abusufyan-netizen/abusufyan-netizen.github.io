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

    const finalUrl = finalResponse.url;
    const html = await finalResponse.text();
    
    // 1. Unified Pin Extraction Helper
    const extractPins = (data: any) => {
      const pins: any[] = [];
      const seen = new Set();

      const process = (item: any) => {
        if (!item || typeof item !== 'object') return;
        if (item.images && (item.images.orig || item.images['736x'])) {
          const id = item.id || Math.random().toString(36).substr(2, 9);
          const url = item.images.orig?.url || item.images['736x']?.url;
          if (url && !seen.has(url)) {
            seen.add(url);
            pins.push({
              id,
              title: item.title || item.grid_title || item.description || 'Untitled Pin',
              url,
              thumbnail: item.images['236x']?.url || item.images['474x']?.url || url
            });
          }
        }
      };

      const traverse = (obj: any, depth = 0) => {
        if (!obj || typeof obj !== 'object' || depth > 10) return;
        process(obj);
        Object.values(obj).forEach(val => traverse(val, depth + 1));
      };

      traverse(data);
      return pins;
    };

    // 2. Extract Board ID for mass fetching if possible
    let boardId = '';
    const boardIdMatch = html.match(/"board":\{"id":"(\d+)"/) || 
                        html.match(/"board_id":"(\d+)"/) ||
                        html.match(/"id":"(\d+)"[^}]*?"type":"board"/);
    if (boardIdMatch) boardId = boardIdMatch[1];

    // 3. Extract Initial Data
    let initialData: any = {};
    const dataPattern = /<script id="__PWS_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
    const dataMatch = html.match(dataPattern);
    if (dataMatch) {
      try { initialData = JSON.parse(dataMatch[1]); } catch (e) {}
    }

    // 4. Also check LD+JSON for initial pins
    const ldJsonMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    let ldPins: any[] = [];
    if (ldJsonMatches) {
      ldJsonMatches.forEach(match => {
        try {
          const content = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
          const parsed = JSON.parse(content);
          const items = parsed.itemListElement || (parsed['@graph'] ? parsed['@graph'].find((it: any) => it.itemListElement)?.itemListElement : null);
          if (items && Array.isArray(items)) {
            items.forEach((item: any) => {
              ldPins.push({
                images: { '736x': { url: item.image } },
                title: item.name,
                url: item.url
              });
            });
          }
        } catch (e) {}
      });
    }

    // Combine initial sources
    let allPins = [...extractPins(initialData), ...extractPins({ items: ldPins })];

    // 5. Bulk Fetching if it's a board
    if (boardId && allPins.length > 1) {
      let bookmark = '';
      const MAX_PINS = 1000;
      const BATCH_SIZE = 50;

      while (allPins.length < MAX_PINS) {
        const resourceUrl = `https://www.pinterest.com/resource/BoardFeedResource/get/?source_url=${encodeURIComponent(finalUrl)}&data=${encodeURIComponent(JSON.stringify({
          options: { board_id: boardId, page_size: BATCH_SIZE, bookmarks: bookmark ? [bookmark] : [] },
          context: {}
        }))}&_=${Date.now()}`;

        try {
          const res = await fetch(resourceUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
              'X-Requested-With': 'XMLHttpRequest',
              'Accept': 'application/json'
            }
          });
          if (!res.ok) break;
          const batchData = await res.json();
          const newBatchPins = extractPins(batchData);
          if (newBatchPins.length === 0) break;
          allPins = [...allPins, ...newBatchPins];
          bookmark = batchData.resource_response?.bookmark;
          if (!bookmark) break;
        } catch (e) { break; }
      }
    }

    return NextResponse.json({ pins: allPins });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
