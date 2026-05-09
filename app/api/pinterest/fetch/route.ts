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
    
    // Extract Board ID and Initial Data
    const dataMatch = html.match(/<script id="__PWS_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
    if (!dataMatch) {
      return NextResponse.json({ error: 'Could not find board data. Please ensure the link is a public Pinterest board.' }, { status: 404 });
    }

    const initialData = JSON.parse(dataMatch[1]);
    const boardId = initialData.props?.initialReduxState?.boards?.[Object.keys(initialData.props?.initialReduxState?.boards || {})[0]]?.id;
    
    if (!boardId) {
       // Fallback for individual pins or different layout
       return NextResponse.json(initialData);
    }

    // Now we have the board ID, let's fetch in bulk using Pinterest API
    let allPins: any[] = [];
    let bookmark = '';
    const MAX_PINS = 1000;
    const BATCH_SIZE = 50;

    // First, add pins from initial state
    const initialPins = initialData.props?.initialReduxState?.pins || {};
    allPins = Object.values(initialPins);

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
