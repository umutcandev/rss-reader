import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ isValid: false })
  }

  try {
    const parser = new Parser()
    await parser.parseURL(url)
    return NextResponse.json({ isValid: true })
  } catch (error) {
    return NextResponse.json({ isValid: false })
  }
} 