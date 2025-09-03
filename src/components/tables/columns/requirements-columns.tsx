'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, MessageSquare, Eye, Flag } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { RequirementRow } from '@/lib/types'

export const requirementsColumns: ColumnDef<RequirementRow>[] = [
  {
    accessorKey: 'title',
    header: 'Requirement',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.title}</p>
        <p className="text-xs text-muted-foreground">
          Buyer: {row.original.buyer}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ getValue }) => (
      <span className="nums font-medium">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: 'urgency',
    header: 'Urgency',
    cell: ({ getValue }) => {
      const v = getValue<string>()
      const variant = v.toLowerCase() as any
      return <Badge variant={variant}>{v}</Badge>
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue<string>()
      const variant = v.toLowerCase() as any
      return <Badge variant={variant}>{v}</Badge>
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'quotes',
    header: 'Quotes',
    cell: ({ getValue }) => (
      <div className="flex items-center gap-1">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <span className="nums">{getValue<number>()}</span>
      </div>
    ),
  },
  {
    accessorKey: 'deadline',
    header: 'Deadline',
    cell: ({ getValue }) => {
      const deadline = new Date(getValue<string>())
      const today = new Date()
      const daysLeft = Math.ceil(
        (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
      const isUrgent = daysLeft <= 3

      return (
        <div className="flex items-center gap-1">
          {isUrgent && <Flag className="h-4 w-4 text-red-500" />}
          <span className={isUrgent ? 'font-medium text-red-600' : ''}>
            {deadline.toLocaleDateString()}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'postedAt',
    header: 'Posted',
    cell: ({ getValue }) => (
      <span className="nums">
        {new Date(getValue<string>()).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button size="sm" variant="ghost" className="h-8 px-2">
          <Eye className="mr-1 h-4 w-4" />
          View
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              View Quotes
            </DropdownMenuItem>
            <DropdownMenuItem>Flag for Review</DropdownMenuItem>
            <DropdownMenuItem>Contact Buyer</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Close Requirement
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]
