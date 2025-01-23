'use client'

import { Github, Rss, Box, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const technologies = [
  {
    name: 'Next.js',
    url: 'https://nextjs.org',
    logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png'
  },
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    logo: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg'
  },
  {
    name: 'shadcn/ui',
    url: 'https://ui.shadcn.com',
    logo: null,
    icon: Box
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    logo: 'https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png'
  },
  {
    name: 'RSS Parser',
    url: 'https://www.npmjs.com/package/rss-parser',
    logo: null,
    icon: Rss
  },
  {
    name: 'Cursor',
    url: 'https://cursor.sh',
    logo: null,
    icon: Terminal
  }
]

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-muted-foreground hover:text-foreground"
            onClick={() => window.open('https://github.com/umutcandev', '_blank')}
          >
            <Github className="mr-2 h-4 w-4" />
            umutcandev
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-center">
          <p className="flex items-center text-sm text-muted-foreground">
            Built with
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <Button
                key={tech.name}
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted"
                onClick={() => window.open(tech.url, '_blank')}
                title={tech.name}
              >
                {tech.logo ? (
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                ) : tech.icon ? (
                  <tech.icon className="h-5 w-5" />
                ) : null}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 