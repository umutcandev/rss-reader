'use client'

import { Github } from 'lucide-react'
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
    logo: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg'
  },
  {
    name: 'shadcn/ui',
    url: 'https://ui.shadcn.com',
    logo: 'https://avatars.githubusercontent.com/u/139895814?s=200&v=4'
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    logo: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png'
  },
  {
    name: 'Cursor',
    url: 'https://cursor.sh',
    logo: 'https://avatars.githubusercontent.com/u/126759922?s=200&v=4'
  }
]

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row md:py-0">
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
        
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <p className="text-sm text-muted-foreground">
            Built with
          </p>
          <div className="flex flex-wrap justify-center gap-3 items-center">
            {technologies.map((tech, i) => (
              <div key={tech.name} className="flex items-center">
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto px-2 py-1 text-muted-foreground hover:text-foreground flex items-center gap-2"
                  onClick={() => window.open(tech.url, '_blank')}
                >
                  <Image 
                    src={tech.logo} 
                    alt={tech.name} 
                    width={16} 
                    height={16} 
                    className="rounded-sm"
                  />
                  {tech.name}
                </Button>
                {i < technologies.length - 1 && (
                  <span className="text-muted-foreground/40">•</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 