import Parser from 'rss-parser'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return Response.json({ isValid: false })
  }

  try {
    const response = await fetch(url)
    const xmlData = await response.text()

    const parser = new Parser()
    await parser.parseString(xmlData)

    return Response.json({ isValid: true })
  } catch {
    return Response.json({ isValid: false })
  }
} 