/**
 * Listings Table Columns
 *
 * Defines column configuration for the listings data table including type/status badges
 * and action buttons with proper accessibility labels.
 */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, CheckCircle, X, Eye, History } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ListingRow } from '@/lib/types'

export const listingsColumns: ColumnDef<ListingRow>[] = [
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.product}</p>
        <p className="text-xs text-muted-foreground">
          Seller: {row.original.seller}
        </p>
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => {
      const v = getValue<string>()
      const variant =
        v.toLowerCase() === 'fixed'
          ? 'default'
          : v.toLowerCase() === 'negotiation'
            ? 'secondary'
            : 'outline'
      return <Badge variant={variant}>{v}</Badge>
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'basePrice',
    header: 'Base Price',
    cell: ({ getValue }) => (
      <span className="nums">₹{getValue<number>().toFixed(2)}</span>
    ),
  },
  {
    accessorKey: 'moq',
    header: 'MOQ',
    cell: ({ getValue }) => <span className="nums">{getValue<number>()}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue<string>()
      const variant =
        v.toLowerCase() === 'approved'
          ? 'verified'
          : v.toLowerCase() === 'rejected'
            ? 'destructive'
            : 'secondary'
      return <Badge variant={variant}>{v}</Badge>
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'submittedAt',
    header: 'Submitted',
    cell: ({ getValue }) => (
      <span className="nums">
        {new Date(getValue<string>()).toLocaleDateString()}
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Eye className="mr-1 h-4 w-4" />
            View
          </Button>
          {status === 'Pending' && (
            <>
              <Button size="sm" variant="default" className="h-8 px-2">
                <CheckCircle className="mr-1 h-4 w-4" />
                Approve
              </Button>
              <Button size="sm" variant="seller" className="h-8 px-2">
                <X className="mr-1 h-4 w-4" />
                Reject
              </Button>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Open listing actions menu"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <History className="mr-2 h-4 w-4" />
                Version History
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
