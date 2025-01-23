import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ items: [] });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('RSS verisi alınırken hata oluştu:', error);
    return NextResponse.json({ items: [] });
  }
} 