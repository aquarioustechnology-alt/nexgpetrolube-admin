'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  AlertTriangle,
  Clock,
  Users,
  Eye,
  MessageSquare,
  CheckCircle,
  X,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { disputesMock } from '@/lib/mock/disputes'

export default function DisputesPage() {
  // Use the KPI mapping
  const kpis = KPI.disputes(disputesMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Disputes Management
        </h1>
        <p className="text-muted-foreground">
          Handle and resolve disputes arising from bidding and deals.
        </p>
      </div>

      {/* KPI Row */}
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search disputes..." className="pl-8" />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bidding">Bidding Issues</SelectItem>
                <SelectItem value="delivery">Delivery Problems</SelectItem>
                <SelectItem value="quality">Quality Issues</SelectItem>
                <SelectItem value="payment">Payment Disputes</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Disputes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Disputes Queue</CardTitle>
          <CardDescription>Review and manage dispute cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">
                    Bidding Dispute - Engine Oil Auction
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Case #DIS001 • Buyer: ABC Petrochem Ltd • Seller: XYZ
                    Lubricants • Opened: 2 hours ago
                  </p>
                  <p className="mt-2 rounded bg-muted p-2 text-sm">
                    Buyer claims winning bid was not properly recorded. Seller
                    disputes the claim.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">Open</Badge>
                    <Badge variant="outline">Bidding Issue</Badge>
                    <Badge variant="destructive">High Priority</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Contact Parties
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Resolve
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">
                    Quality Dispute - Brake Fluid
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Case #DIS002 • Buyer: DEF Oil Solutions • Seller: GHI
                    Petroleum • Opened: 1 day ago
                  </p>
                  <p className="mt-2 rounded bg-muted p-2 text-sm">
                    Buyer reports product does not meet specifications. Seller
                    claims product is within tolerance.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">Investigating</Badge>
                    <Badge variant="outline">Quality Issue</Badge>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    Contact Parties
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Resolve
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">
                    Payment Dispute - Gear Oil Deal
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Case #DIS003 • Buyer: JKL Fuel Distributors • Seller: MNO
                    Oil Solutions • Opened: 3 days ago
                  </p>
                  <p className="mt-2 rounded bg-muted p-2 text-sm">
                    Seller claims payment not received. Buyer shows proof of
                    payment. Bank investigation pending.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="default">Resolved</Badge>
                    <Badge variant="outline">Payment Issue</Badge>
                    <Badge variant="outline">Low Priority</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <X className="mr-1 h-4 w-4" />
                    Close Case
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
