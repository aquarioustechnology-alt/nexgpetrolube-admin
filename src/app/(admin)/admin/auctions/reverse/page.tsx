'use client'

import { useState } from 'react'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import {
  Search,
  Eye,
  Play,
  Pause,
  Square,
  Users,
  Timer,
  TrendingUp,
  Gavel,
  DollarSign,
  Package,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'

// Mock auction data
const auctionData = [
  {
    id: 'REV001',
    type: 'reverse',
    product: 'Engine Oil 20W-50',
    category: 'Engine Oil',
    buyer: 'Global Transport Corp',
    totalQty: '1000L',
    filledQty: '650L',
    currentBest: 4200,
    bidders: 8,
    startTime: '2024-01-15T10:00:00Z',
    endTime: '2024-01-15T18:00:00Z',
    status: 'live',
    bids: [
      {
        bidder: 'ABC Petrochemicals',
        amount: 4200,
        time: '2024-01-15T16:30:00Z',
        qty: '200L',
      },
      {
        bidder: 'XYZ Lubricants',
        amount: 4250,
        time: '2024-01-15T16:25:00Z',
        qty: '150L',
      },
      {
        bidder: 'Oil Solutions Ltd',
        amount: 4300,
        time: '2024-01-15T16:20:00Z',
        qty: '300L',
      },
    ],
  },
  {
    id: 'TRD002',
    type: 'traditional',
    product: 'Industrial Hydraulic Fluid',
    category: 'Hydraulic Fluids',
    seller: 'Premium Oil Industries',
    totalQty: '500L',
    filledQty: '500L',
    currentBest: 3800,
    bidders: 12,
    startTime: '2024-01-15T09:00:00Z',
    endTime: '2024-01-15T17:00:00Z',
    status: 'completed',
    bids: [
      {
        bidder: 'Transport Solutions',
        amount: 3800,
        time: '2024-01-15T16:45:00Z',
        qty: '100L',
      },
      {
        bidder: 'Heavy Machinery Co',
        amount: 3750,
        time: '2024-01-15T16:40:00Z',
        qty: '200L',
      },
      {
        bidder: 'Industrial Corp',
        amount: 3700,
        time: '2024-01-15T16:35:00Z',
        qty: '200L',
      },
    ],
  },
  {
    id: 'REV003',
    type: 'reverse',
    product: 'Gear Oil SAE 90',
    category: 'Gear Oil',
    buyer: 'Auto Parts Distributor',
    totalQty: '750L',
    filledQty: '0L',
    currentBest: 0,
    bidders: 3,
    startTime: '2024-01-15T14:00:00Z',
    endTime: '2024-01-15T20:00:00Z',
    status: 'paused',
    bids: [],
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'live':
      return (
        <Badge className="animate-pulse bg-green-100 text-green-800">
          Live
        </Badge>
      )
    case 'completed':
      return <Badge variant="outline">Completed</Badge>
    case 'paused':
      return <Badge className="bg-orange-100 text-orange-800">Paused</Badge>
    case 'cancelled':
      return <Badge variant="destructive">Cancelled</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getTimeRemaining = (endTime: string) => {
  const now = new Date()
  const end = new Date(endTime)
  const diff = end.getTime() - now.getTime()

  if (diff <= 0) return 'Ended'

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  return `${hours}h ${minutes}m`
}

function AuctionDetailSheet({
  auction,
  onAction,
}: {
  auction: any
  onAction: (action: string, id: string) => void
}) {
  return (
    <SheetContent className="w-[600px] overflow-y-auto sm:w-[800px]">
      <SheetHeader>
        <SheetTitle>Auction Room - {auction.id}</SheetTitle>
        <SheetDescription>
          Monitor and manage {auction.type} auction
        </SheetDescription>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              AUCTION DETAILS
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{auction.product}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Category: {auction.category}
                <br />
                Type:{' '}
                {auction.type === 'reverse'
                  ? 'Reverse Auction'
                  : 'Traditional Auction'}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              STATUS
            </h4>
            <div className="space-y-2">
              <div>{getStatusBadge(auction.status)}</div>
              <div className="text-sm text-muted-foreground">
                {auction.status === 'live' &&
                  `Ends in: ${getTimeRemaining(auction.endTime)}`}
                {auction.status === 'completed' && 'Auction completed'}
                {auction.status === 'paused' && 'Auction paused by moderator'}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{auction.totalQty}</div>
              <div className="text-sm text-muted-foreground">
                Total Quantity
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{auction.filledQty}</div>
              <div className="text-sm text-muted-foreground">
                Filled Quantity
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{auction.bidders}</div>
              <div className="text-sm text-muted-foreground">
                Active Bidders
              </div>
            </CardContent>
          </Card>
        </div>

        {auction.currentBest > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">
                    Best {auction.type === 'reverse' ? 'Bid' : 'Offer'}: ₹
                    {auction.currentBest.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {auction.type === 'reverse'
                      ? 'Lowest price wins'
                      : 'Highest price wins'}
                  </div>
                </div>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
        )}

        <Separator />

        <div>
          <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
            LIVE BIDDING TABLE
          </h4>
          {auction.bids.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bidder</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auction.bids.map((bid: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{bid.bidder}</TableCell>
                    <TableCell>₹{bid.amount.toLocaleString()}</TableCell>
                    <TableCell>{bid.qty}</TableCell>
                    <TableCell>
                      {new Date(bid.time).toLocaleTimeString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No bids placed yet
            </div>
          )}
        </div>

        <Separator />

        <div className="flex gap-3">
          {auction.status === 'live' && (
            <Button
              variant="outline"
              onClick={() => onAction('pause', auction.id)}
              className="flex-1"
            >
              <Pause className="mr-2 h-4 w-4" />
              Pause Auction
            </Button>
          )}

          {auction.status === 'paused' && (
            <Button
              onClick={() => onAction('resume', auction.id)}
              className="flex-1"
            >
              <Play className="mr-2 h-4 w-4" />
              Resume Auction
            </Button>
          )}

          {(auction.status === 'live' || auction.status === 'paused') && (
            <Button
              variant="destructive"
              onClick={() => onAction('end', auction.id)}
              className="flex-1"
            >
              <Square className="mr-2 h-4 w-4" />
              End Auction
            </Button>
          )}

          {auction.status === 'completed' && (
            <Button
              variant="outline"
              onClick={() => onAction('allocate', auction.id)}
              className="flex-1"
            >
              Split Allocation
            </Button>
          )}
        </div>
      </div>
    </SheetContent>
  )
}

export default function ReverseAuctionsPage() {
  const { toast } = useToast()
  const [selectedAuction, setSelectedAuction] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const reverseAuctions = auctionData.filter(
    auction => auction.type === 'reverse'
  )

  const filteredAuctions = reverseAuctions.filter(
    auction =>
      auction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (auction.buyer &&
        auction.buyer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleAuctionAction = (action: string, id: string) => {
    toast({
      title: 'Action Completed',
      description: `Auction ${id} has been ${action}d successfully.`,
    })
  }

  const getStatusCount = (status: string) => {
    return reverseAuctions.filter(auction => auction.status === status).length
  }

  // Use the KPI mapping
  const kpis = KPI.auctionsReverse(reverseAuctions)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reverse Auctions</h1>
        <p className="text-muted-foreground">
          Monitor buyer-led reverse auctions where sellers compete with lowest
          prices
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reverse Auction Monitor</CardTitle>
              <CardDescription>
                Real-time monitoring of buyer-led reverse auctions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search auctions..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-64 pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Total Qty / Filled</TableHead>
                <TableHead>Best Bid</TableHead>
                <TableHead>Bidders</TableHead>
                <TableHead>Time Remaining</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuctions.map(auction => (
                <TableRow key={auction.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{auction.product}</div>
                      <div className="text-sm text-muted-foreground">
                        {auction.category}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{auction.buyer}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{auction.totalQty}</div>
                      <div className="text-muted-foreground">
                        Filled: {auction.filledQty}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {auction.currentBest > 0 ? (
                      <div className="font-medium text-green-600">
                        ₹{auction.currentBest.toLocaleString()}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No bids</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{auction.bidders}</Badge>
                  </TableCell>
                  <TableCell>
                    {auction.status === 'live' ? (
                      <div className="text-sm">
                        {getTimeRemaining(auction.endTime)}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(auction.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedAuction(auction)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            Monitor
                          </Button>
                        </SheetTrigger>
                        {selectedAuction && (
                          <AuctionDetailSheet
                            auction={selectedAuction}
                            onAction={handleAuctionAction}
                          />
                        )}
                      </Sheet>

                      {auction.status === 'live' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleAuctionAction('pause', auction.id)
                          }
                        >
                          <Pause className="mr-1 h-3 w-3" />
                          Pause
                        </Button>
                      )}

                      {auction.status === 'paused' && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleAuctionAction('resume', auction.id)
                          }
                        >
                          <Play className="mr-1 h-3 w-3" />
                          Resume
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
