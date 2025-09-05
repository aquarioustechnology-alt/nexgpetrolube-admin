/**
 * Listings Moderation Page
 *
 * Admin interface for reviewing and moderating seller listings.
 * Supports Fixed, Negotiation, and Bidding listing types with approval workflow.
 */
'use client'

import { DataTable } from '@/components/tables/data-table'
import { listingsColumns } from '@/components/tables/columns/listings-columns'
import { listingsMock } from '@/lib/mock/listings'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ClipboardList, Undo2, CheckCheck, Gavel } from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import SectionHeading from '@/components/section-heading'
import { KPI } from '@/lib/page-kpis'

export default function ListingsPage() {
  const kpis = KPI.listings(listingsMock)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="h1-tight">Listings Moderation</h1>
        <p className="subtle">
          Review and approve seller listings for Fixed, Negotiation, and Bidding
          modes.
        </p>
      </div>

      <KpiRow>
        {kpis.map((k, i) => (
          <KpiCard
            key={i}
            label={k.label}
            value={k.value}
            icon={k.icon}
            hint={k.hint}
          />
        ))}
      </KpiRow>

      <SectionHeading>Platform Core Features</SectionHeading>

      <DataTable
        columns={listingsColumns}
        data={listingsMock}
        searchableColumn="product"
        searchPlaceholder="Search products, sellers..."
        toolbarExtras={
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue placeholder="Filter type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="bidding">Bidding</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        }
      />
    </div>
  )
}
