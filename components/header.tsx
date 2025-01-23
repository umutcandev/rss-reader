'use client'

import { useState, useEffect } from 'react'
import { CommandPalette } from '@/components/command-palette'
import { Button } from '@/components/ui/button'
import { Command, Moon, Sun, Search, ExternalLink } from 'lucide-react'
import { useTheme } from 'next-themes'
import { FeedItem } from '@/hooks/use-feed'
import Link from 'next/link'

function extractDomain(url: string) {
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
}

export function Header({ items, currentRssUrl }: HeaderProps) {
  const { setTheme, theme } = useTheme()
  const [showSearch, setShowSearch] = useState(false)

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

  const domain = extractDomain(currentRssUrl)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <div className="w-[180px] flex-none">
          <div className="flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-flex items-center gap-1.5">
              <Link href="/" className="hover:text-foreground">RSS Reader</Link>
              <a 
                href="https://github.com/umutcandev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                by UmutcanDev
              </a>
            </span>
            <span className="font-bold sm:hidden">RSS</span>
          </div>
        </div>

        {/* Orta boşluk */}
        <div className="flex-1" />

        {/* Arama butonu ve sağ taraftaki butonlar */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-[400px]">
            <Button
              variant="outline"
              className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12"
              onClick={() => setShowSearch(true)}
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="inline-flex">Makalelerde ara...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <Command className="h-3 w-3" />
                <span className="text-xs">S</span>
              </kbd>
            </Button>
          </div>

          {/* Mobil arama butonu */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden z-50"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="default"
            className="hidden sm:flex group"
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