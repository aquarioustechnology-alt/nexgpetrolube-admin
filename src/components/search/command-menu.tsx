'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import {
  Users,
  FileText,
  Gavel,
  Receipt,
  Database,
  FileImage,
  BarChart3,
  Settings,
  Zap,
  Plus,
  RefreshCw,
  Image as ImageIcon,
  Search as SearchIcon,
  Sun,
  Moon,
} from 'lucide-react'

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { toast } = useToast()
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpenChange])

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setValue('')
      onOpenChange(false)
      command()
    },
    [onOpenChange]
  )

  const quickActions = [
    {
      name: 'Create Commission Rule',
      icon: Plus,
      action: () => {
        router.push('/admin/commission-rules')
        toast({
          title: 'Success',
          description: 'Navigating to Commission Rules',
        })
      },
    },
    {
      name: 'Add Category/Brand',
      icon: Database,
      action: () => {
        router.push('/admin/masters')
        toast({
          title: 'Success',
          description: 'Navigating to Masters',
        })
      },
    },
    {
      name: 'Publish Banner',
      icon: ImageIcon,
      action: () => {
        router.push('/admin/cms')
        toast({
          title: 'Success',
          description: 'Navigating to CMS',
        })
      },
    },
    {
      name: 'Sync Search Index',
      icon: RefreshCw,
      action: () => {
        toast({
          title: 'Success',
          description: 'Search index sync initiated',
        })
      },
    },
  ]

  const searchItems = [
    {
      name: 'Users',
      icon: Users,
      action: () => router.push('/admin/users'),
    },
    {
      name: 'Listings',
      icon: FileText,
      action: () => router.push('/admin/listings'),
    },
    {
      name: 'Auctions',
      icon: Gavel,
      action: () => router.push('/admin/auctions/reverse'),
    },
    {
      name: 'Invoices',
      icon: Receipt,
      action: () => router.push('/admin/invoices'),
    },
  ]

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        value={value}
        onValueChange={setValue}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          {quickActions.map(item => (
            <CommandItem
              key={item.name}
              onSelect={() => runCommand(item.action)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Search">
          {searchItems.map(item => (
            <CommandItem
              key={item.name}
              onSelect={() => runCommand(item.action)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
            <Sun className="mr-2 h-4 w-4" />
            Light
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
