'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Calendar, Clock, User, ArrowUpRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import { RssSourceDialog } from '@/components/rss-source-dialog'
import { useFeed, FeedItem } from '@/hooks/use-feed'
import { Loader } from '@/components/ui/loader'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/footer'
import React from 'react'

function extractImageUrl(item: FeedItem): string | null {
  if (item.media && typeof item.media === 'object' && '$' in item.media && item.media.$ && typeof item.media.$ === 'object' && 'url' in item.media.$) {
    return item.media.$.url as string;
  }

  if (item.content) {
    const match = item.content.match(/<img[^>]+src="([^">]+)"/);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain.replace(/^www\./, '')
  } catch {
    return url
  }
}

const DEFAULT_RSS_SOURCE = 'https://teknogoal.com/feed/'

export default function Home() {
  const [rssSource, setRssSource] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rssSource') || DEFAULT_RSS_SOURCE
    }
    return DEFAULT_RSS_SOURCE
  })
  
  const { feed, isLoading, mutate } = useFeed(rssSource)

  useEffect(() => {
    mutate()
  }, [rssSource])

  const handleSourceChange = (newSource: string) => {
    setRssSource(newSource)
    localStorage.setItem('rssSource', newSource)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        items={feed.items}
        currentRssUrl={rssSource}
        onRefresh={mutate}
      />
      <RssSourceDialog 
        onSourceChange={handleSourceChange}
      />
      
      <main className="flex-1 container mx-auto py-8">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader size={32} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feed.items.slice(0, 9).map((item, index) => {
                const imageUrl = extractImageUrl(item)
                
                return (
                  <Card key={index} className="group hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
                    {imageUrl && (
                      <div className="relative w-full h-48">
                        <Image
                          src={imageUrl}
                          alt={item.title || ''}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white font-medium px-4 py-2 rounded-full border-2 border-white/50 hover:bg-white/10 transition-colors"
                          >
                            Devamını Oku
                          </a>
                        </div>
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <CardTitle className="line-clamp-2 text-lg">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-start gap-2 group">
                          {item.title}
                          <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{item.contentSnippet}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(item.isoDate).toLocaleDateString('tr-TR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {new Date(item.isoDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {item.creator && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {item.creator}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {feed.items.length > 9 && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(`https://${extractDomain(rssSource)}`, '_blank')}
                  className="group"
                >
                  <span className="mr-2">Daha Fazla Göster</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
