/**
 * Users Table Columns
 *
 * Defines column configuration for the users data table including role/KYC badges
 * and action dropdown menu with proper accessibility labels.
 */
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

type UsersColumnsProps = {
  onView: (user: UserRow) => void
  onEdit: (user: UserRow) => void
  onDisable: (user: UserRow) => void
}

export const createUsersColumns = ({
  onView,
  onEdit,
  onDisable,
}: UsersColumnsProps): ColumnDef<UserRow>[] => [
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
      const variant = v.toLowerCase() as 'buyer' | 'seller' | 'both'
      return <Badge variant={variant}>{v}</Badge>
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'kyc',
    header: 'KYC',
    cell: ({ getValue }) => {
      const v = getValue<string>()
      const variant = v.toLowerCase() === 'verified' ? 'verified' : 'secondary'
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
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Open user actions menu"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onView(row.original)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDisable(row.original)}
            className="text-destructive focus:text-destructive"
          >
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
