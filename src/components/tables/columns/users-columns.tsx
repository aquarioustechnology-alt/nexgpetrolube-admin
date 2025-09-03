'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { UserRow } from '@/lib/types'

export const usersColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: 'company',
    header: 'Company',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.company}</p>
        <p className="text-muted-foreground">
          {row.original.email} · {row.original.phone}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => {
      const v = getValue<string>()
      return <Badge variant={v.toLowerCase() as any}>{v}</Badge>
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'kyc',
    header: 'KYC',
    cell: ({ getValue }) => {
      const v = getValue<string>()
      const variant = v.toLowerCase() as any
      return <Badge variant={variant}>{v}</Badge>
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ getValue }) => <span className="nums">{getValue<string>()}</span>,
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => console.log('View', row.original.id)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log('Edit', row.original.id)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => console.log('Disable', row.original.id)}
          >
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
