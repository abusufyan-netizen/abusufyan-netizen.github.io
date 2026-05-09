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
    
    // Extract Board ID and Initial Data from multiple possible script tags
    const patterns = [
      /<script id="__PWS_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
      /<script id="__PWS_INITIAL_PROPS__" type="application\/json">([\s\S]*?)<\/script>/
    ];

    let initialData: any = null;
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        try {
          initialData = JSON.parse(match[1]);
          break;
        } catch (e) {}
      }
    }

    if (!initialData) {
      return NextResponse.json({ error: 'Could not find board data. The link might be private or invalid.' }, { status: 404 });
    }

    // Robust Board ID detection
    let boardId = '';
    
    try {
      const reduxState = (initialData as any).props?.initialReduxState || (initialData as any).initialReduxState || {};
      const boards = (reduxState as any).boards || {};
      const boardObj = Object.values(boards).find((b: any) => b?.id);
      if (boardObj) boardId = (boardObj as any).id;
      
      if (!boardId) {
        boardId = (initialData as any).props?.data?.board?.id || 
                  (initialData as any).page_props?.data?.board?.id || 
                  '';
      }
    } catch (e) {
      console.log('Error parsing initialData for boardId');
    }

    // 2. Robust Regex Fallback (Matches modern Pinterest SSR)
    if (!boardId) {
      const boardIdMatch = html.match(/"board":\{"id":"(\d+)"/) || 
                          html.match(/"board_id":"(\d+)"/) ||
                          html.match(/"id":"(\d+)"[^}]*?"type":"board"/);
      if (boardIdMatch) boardId = boardIdMatch[1];
    }
    
    if (!boardId) {
       // Fallback: Just return the initial data if we can't find a board ID for bulk fetching
       return NextResponse.json(initialData);
    }

    // Now we have the board ID, let's fetch in bulk using Pinterest API
    let allPins: any[] = [];
    let bookmark = '';
    const MAX_PINS = 1000;
    const BATCH_SIZE = 50;

    // 3. Extract initial pins from HTML (LD+JSON is more reliable than props)
    try {
      const ldJsonMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
      if (ldJsonMatches) {
        ldJsonMatches.forEach(match => {
          try {
            const content = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
            const parsed = JSON.parse(content);
            
            // Pinterest Board LD+JSON usually has 'itemListElement'
            const items = parsed.itemListElement || (parsed['@graph'] ? parsed['@graph'].find((it: any) => it.itemListElement)?.itemListElement : null);
            
            if (items && Array.isArray(items)) {
              items.forEach((item: any) => {
                const pinUrl = item.url;
                const pinId = pinUrl?.match(/pin\/(\d+)/)?.[1];
                if (pinId) {
                  allPins.push({
                    id: pinId,
                    images: {
                      '736x': { url: item.image }
                    },
                    pinner: { username: 'Pinterest User' },
                    description: item.name || ''
                  });
                }
              });
            }
          } catch (e) {}
        });
      }
    } catch (e) {}

    // 4. Also check initial state for pins (fallback/supplement)
    try {
      const reduxState = (initialData as any).props?.initialReduxState || (initialData as any).initialReduxState || {};
      const initialPins = (reduxState as any).pins || {};
      const statePins = Object.values(initialPins);
      
      // Merge with allPins, avoiding duplicates
      statePins.forEach((pin: any) => {
        if (pin?.id && !allPins.find(p => p.id === pin.id)) {
          allPins.push(pin);
        }
      });
    } catch (e) {}

    // Loop to fetch more if needed
    while (allPins.length < MAX_PINS) {
      const resourceUrl = `https://www.pinterest.com/resource/BoardFeedResource/get/?source_url=${encodeURIComponent(url)}&data=${encodeURIComponent(JSON.stringify({
        options: {
          board_id: boardId,
          page_size: BATCH_SIZE,
          bookmarks: bookmark ? [bookmark] : []
        },
        context: {}
      }))}&_=${Date.now()}`;

      const res = await fetch(resourceUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        }
      });

      if (!res.ok) break;

      const batchData = await res.json();
      const newPins = batchData.resource_response?.data || [];
      if (newPins.length === 0) break;

      allPins = [...allPins, ...newPins];
      bookmark = batchData.resource_response?.bookmark;
      
      if (!bookmark) break;
    }

    return NextResponse.json({ 
      props: { 
        initialReduxState: { 
          pins: allPins.reduce((acc, pin) => ({ ...acc, [pin.id]: pin }), {}) 
        } 
      } 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
