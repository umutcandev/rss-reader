'use client'

import { useState, useEffect } from 'react'
import { CommandPalette } from '@/components/command-palette'
import { Button } from '@/components/ui/button'
import { Command, Moon, Sun, Search, ExternalLink, RefreshCw, Rss } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FeedItem } from '@/hooks/use-feed'
import Link from 'next/link'

function extractDomain(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain.replace(/^www\./, '')
  } catch {
    return url
  }
}

interface HeaderProps {
  items: FeedItem[]
  currentRssUrl: string
  onRefresh?: () => Promise<void>
}

export function Header({ items, currentRssUrl, onRefresh }: HeaderProps) {
  const { setTheme, theme } = useTheme()
  const [showSearch, setShowSearch] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setShowSearch(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleRefresh = async () => {
    if (!onRefresh || isRefreshing) return
    
    setIsRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setIsRefreshing(false)
    }
  }

  const domain = extractDomain(currentRssUrl)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="w-[180px] flex-none">
          <div className="flex items-center space-x-2">
            <span className="font-bold flex items-center gap-2">
              <Rss className="h-4 w-4" />
              <Link href="/" className="hover:text-foreground">RSS Reader</Link>
            </span>
          </div>
        </div>

        {/* Orta boşluk */}
        <div className="flex-1" />

        {/* Arama butonu ve sağ taraftaki butonlar */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block w-[400px]">
            <Button
              variant="outline"
              className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 h-9"
              onClick={() => setShowSearch(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="inline-flex">Makalelerde ara...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-[50%] translate-y-[-50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <Command className="h-3 w-3" />
                <span className="text-xs">S</span>
              </kbd>
            </Button>
          </div>

          {/* Mobil arama butonu */}
          <Button
            variant="outline"
            size="sm"
            className="md:hidden z-50 h-9 w-9"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Yenileme butonu */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-9 w-9"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="sr-only">Yenile</span>
          </Button>

          {/* Tema değiştirme butonu */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9 relative"
          >
            <Sun className="h-4 w-4 absolute inset-0 m-auto transition-all scale-100 dark:scale-0" />
            <Moon className="h-4 w-4 absolute inset-0 m-auto transition-all scale-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Kaynak ziyaret butonu */}
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex group h-9"
            onClick={() => window.open(`https://${domain}`, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            Kaynağı Ziyaret Et
          </Button>
        </div>
      </div>

      <CommandPalette
        open={showSearch}
        onOpenChange={setShowSearch}
        items={items}
      />
    </header>
  )
} 