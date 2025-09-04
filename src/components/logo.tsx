'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSidebar } from '@/hooks/use-sidebar'

export function Logo() {
  const { theme, resolvedTheme } = useTheme()
  const { isCollapsed } = useSidebar()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder during SSR
    return (
      <div className="lg:h-18 h-12 w-full animate-pulse rounded bg-muted sm:h-14 md:h-16" />
    )
  }

  // Use resolvedTheme to handle system theme preference
  const currentTheme = resolvedTheme || theme

  // Choose logo based on collapsed state and theme
  const logoSrc = isCollapsed
    ? currentTheme === 'dark'
      ? '/images/logo-ico-darkbase.png'
      : '/images/logo-ico-lightbase.png'
    : currentTheme === 'dark'
      ? '/images/logo-darkbase.svg'
      : '/images/logo-lightbase.svg'

  return (
    <Image
      src={logoSrc}
      alt="NexGPetrolube Logo"
      width={200}
      height={64}
      className="lg:h-18 h-12 w-full object-contain sm:h-14 md:h-16"
      priority
    />
  )
}
