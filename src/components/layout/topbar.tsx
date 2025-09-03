"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from './theme-toggle'
import { CommandMenu } from '@/components/search/command-menu'
import {
  Search,
  Bell,
  User,
  ChevronRight,
  Package
} from 'lucide-react'

function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  
  if (segments.length === 0) return null

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {segments.map((segment, index) => (
        <div key={index} className="flex items-center space-x-1">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          <span className={cn(
            "capitalize",
            index === segments.length - 1 && "text-foreground font-medium"
          )}>
            {segment === 'admin' ? 'Dashboard' : segment.replace(/-/g, ' ')}
          </span>
        </div>
      ))}
    </nav>
  )
}

export function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">NexGPetrolube</span>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <Breadcrumb />
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSearchOpen(true)}
          className="h-9 w-9 p-0"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        
        <ThemeToggle />
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button variant="ghost" size="sm" className="h-9 px-3">
          <User className="h-4 w-4 mr-2" />
          Admin User
        </Button>
      </div>
      
      <CommandMenu open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
