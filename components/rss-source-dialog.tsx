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
        await onSourceChange(rssUrl)
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RssIcon className="h-5 w-5" />
            RSS Kaynağınızı Seçin
          </DialogTitle>
          <DialogDescription>
            Kendi RSS kaynağınızı ekleyerek içerikleri özelleştirebilirsiniz.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="RSS bağlantınızı yapıştırın..."
                value={rssUrl}
                onChange={(e) => {
                  setRssUrl(e.target.value)
                  setError('')
                }}
                className={error ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              <Button 
                onClick={handleSubmit} 
                className="shrink-0 min-w-[100px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader size={16} className="mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Ekleniyor...' : 'Ekle'}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X className="h-4 w-4" />
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleDefaultSource} variant="outline" disabled={isLoading}>
            RSS Kaynağım Yok (Teknogoal RSS Kullan)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 