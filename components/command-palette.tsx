'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading
} from '@/components/ui/command'
import { FeedItem } from '@/hooks/use-feed'
import { Loader } from '@/components/ui/loader'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: FeedItem[]
}

export function CommandPalette({ open, onOpenChange, items }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<FeedItem[]>([])

  // Arama fonksiyonu
  const performSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)

    // Boş arama durumu
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    // Arama terimini hazırla
    const searchTerm = query.toLowerCase().trim()

    // Arama yap
    const results = items.filter(item => {
      // Aranabilir içeriği hazırla
      const searchableContent = [
        item.title,
        item.contentSnippet,
        item.content,
        item.creator
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim()

      // Kelime bazlı arama
      const words = searchTerm.split(/\s+/)
      return words.every(word => searchableContent.includes(word))
    })

    setSearchResults(results)
    setIsSearching(false)
  }

  // Dialog kapandığında state'i sıfırla
  useEffect(() => {
    if (!open) {
      setSearchQuery('')
      setSearchResults([])
      setIsSearching(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[calc(100%-32px)] sm:w-full max-w-2xl p-0 md:p-6 gap-0">
        <DialogTitle className="sr-only">Makalelerde Ara</DialogTitle>
        <Command className="rounded-xl border shadow-lg">
          <CommandInput
            placeholder="İçeriklerde ara..."
            value={searchQuery}
            onValueChange={performSearch}
            className="border-b py-4 px-6 text-base"
            autoFocus
          />
          <CommandList className="max-h-[400px] overflow-auto py-2">
            {isSearching ? (
              <CommandLoading>
                <div className="py-8 text-center">
                  <Loader size={20} className="mx-auto" />
                  <p className="text-sm text-muted-foreground mt-3">Aranıyor...</p>
                </div>
              </CommandLoading>
            ) : (
              <>
                {!searchQuery.trim() ? (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Aramak istediğiniz kelimeyi yazın...
                  </div>
                ) : searchResults.length === 0 ? (
                  <CommandEmpty className="py-6 text-center">
                    Sonuç bulunamadı.
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading={`${searchResults.length} sonuç bulundu`} className="px-2">
                    {searchResults.map((item, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => {
                          window.open(item.link, '_blank')
                          onOpenChange(false)
                        }}
                        className="px-4 py-3 rounded-lg my-1 transition-colors"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="font-medium text-base">{item.title}</div>
                          {item.contentSnippet && (
                            <div className="text-sm text-muted-foreground/90 line-clamp-2">
                              {item.contentSnippet}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground/75">
                            {item.creator && <span>{item.creator}</span>}
                            <span>•</span>
                            <time>{new Date(item.isoDate).toLocaleDateString('tr-TR')}</time>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
} 