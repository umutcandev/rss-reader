'use client'

import { useState, useEffect } from 'react'

type OS = 'macos' | 'windows' | 'linux' | 'unknown'

export function useOS(): OS {
  const [os, setOs] = useState<OS>('unknown')

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    
    if (userAgent.includes('mac')) {
      setOs('macos')
    } else if (userAgent.includes('win')) {
      setOs('windows')
    } else if (userAgent.includes('linux')) {
      setOs('linux')
    }
  }, [])

  return os
} 