'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RssIcon, X, Plus } from "lucide-react"
import { Loader } from "@/components/ui/loader"

interface RssSourceDialogProps {
  onSourceChange: (source: string) => void
}

const DEFAULT_RSS = 'https://teknogoal.com/feed/'

export function RssSourceDialog({ onSourceChange }: RssSourceDialogProps) {
  const [open, setOpen] = useState(false)
  const [rssUrl, setRssUrl] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const hasUserChosen = localStorage.getItem('rssChoice')
    if (!hasUserChosen) {
      setOpen(true)
    }
  }, [])

  const handleDefaultSource = () => {
    localStorage.setItem('rssChoice', 'true')
    localStorage.removeItem('rssSource')
    onSourceChange(DEFAULT_RSS)
    setOpen(false)
  }

  const handleSubmit = async () => {
    if (!rssUrl) {
      handleDefaultSource()
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/validate-rss?url=' + encodeURIComponent(rssUrl))
      const data = await response.json()

      if (data.isValid) {
        localStorage.setItem('rssChoice', 'true')
        localStorage.setItem('rssSource', rssUrl)
        onSourceChange(rssUrl)
        setOpen(false)
      } else {
        setError('Geçersiz RSS kaynağı. Lütfen kontrol edip tekrar deneyin.')
      }
    } catch {
      setError('RSS kaynağı kontrol edilirken bir hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !localStorage.getItem('rssChoice')) {
      localStorage.setItem('rssChoice', 'true')
    }
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-48px)] rounded-lg border shadow-sm">
        <DialogHeader className="space-y-2 pb-2">
          <DialogTitle className="flex items-center gap-2 text-base">
            <RssIcon className="h-4 w-4" />
            RSS Kaynağınızı Seçin
          </DialogTitle>
          <DialogDescription className="text-sm text-left">
            Kendi RSS kaynağınızı ekleyerek içerikleri özelleştirebilirsiniz.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="RSS bağlantınızı yapıştırın..."
                value={rssUrl}
                onChange={(e) => {
                  setRssUrl(e.target.value)
                  setError('')
                }}
                className={`${error ? 'border-red-500' : ''} h-8 text-sm w-[calc(100%-90px)]`}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSubmit} 
                className="h-8 w-[82px]"
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? (
                  <Loader size={14} />
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    Ekle
                  </>
                )}
              </Button>
            </div>
            {error && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <X className="h-3.5 w-3.5" />
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleDefaultSource} 
              variant="outline" 
              disabled={isLoading} 
              className="h-8 text-sm px-4"
              size="sm"
            >
              RSS kaynağım yok
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 