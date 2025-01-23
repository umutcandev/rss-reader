'use client'

import { useState, useEffect } from 'react'
import Parser from 'rss-parser'

export interface FeedItem {
  title: string
  link: string
  contentSnippet: string
  isoDate: string
  creator: string
  content: string
  media?: {
    $?: {
      url?: string
    }
  }
}

export interface Feed {
  items: FeedItem[]
}

export function useFeed(rssUrl: string) {
  const [feed, setFeed] = useState<Feed>({ items: [] })
  const [isLoading, setIsLoading] = useState(true)

  // Feed'i yükle
  const fetchFeed = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/feed?url=${encodeURIComponent(rssUrl)}`)
      const xmlData = await response.text()

      const parser = new Parser()
      const result = await parser.parseString(xmlData)
      
      const items = result.items.map(item => ({
        title: item.title || 'Başlıksız',
        link: item.link || '#',
        contentSnippet: item.contentSnippet || item.content?.replace(/<[^>]+>/g, '').slice(0, 200) || 'İçerik yok',
        isoDate: item.isoDate || new Date().toISOString(),
        creator: item.creator || item.author || 'Yazar belirtilmemiş',
        content: item.content || item.contentSnippet || 'İçerik yok'
      }))

      setFeed({ items })
    } catch (error) {
      console.error('RSS verisi alınırken hata oluştu:', error)
      setFeed({ items: [] })
    } finally {
      setIsLoading(false)
    }
  }

  // RSS URL'i değiştiğinde feed'i yeniden yükle
  useEffect(() => {
    fetchFeed()
  }, [rssUrl])

  return { feed, isLoading, mutate: fetchFeed }
} 