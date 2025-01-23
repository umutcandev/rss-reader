'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ReactNode } from "react"

type Attribute = 'class' | 'data-theme' | 'data-mode'

interface ThemeProviderProps {
  children: ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  storageKey?: string
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}