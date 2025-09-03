"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Gavel, 
  Clock, 
  Users, 
  Play,
  Pause,
  Square,
  Eye
} from 'lucide-react'
import { KpiRow } from "@/components/kpi/kpi-row"
import { KpiCard } from "@/components/kpi/kpi-card"
import { KPI } from "@/lib/page-kpis"

// Mock auction data for traditional auctions
const traditionalAuctionData = [
  {
    id: "TRD001",
    type: "traditional",
    product: "Gear Oil 80W-90",
    seller: "XYZ Lubricants Pvt Ltd",
    totalQty: "500L",
    filledQty: "500L",
    currentBest: 118.00,
    bidders: 6,
    endTime: "2024-01-15T18:00:00Z",
    status: "live",
    avgPremium: 12.3
  },
  {
    id: "TRD002",
    type: "traditional",
    product: "Transmission Fluid",
    seller: "DEF Oil Solutions",
    totalQty: "800L",
    filledQty: "600L",
    currentBest: 92.50,
    bidders: 8,
    endTime: "2024-01-15T19:30:00Z",
    status: "paused",
    avgPremium: 8.7
  },
  {
    id: "TRD003",
    type: "traditional",
    product: "Hydraulic Oil",
    seller: "GHI Petroleum Co",
    totalQty: "1200L",
    filledQty: "1200L",
    currentBest: 78.25,
    bidders: 12,
    endTime: "2024-01-15T20:15:00Z",
    status: "live",
    avgPremium: 15.2
  }
]

export default function TraditionalAuctionsPage() {
  // Use the KPI mapping
  const kpis = KPI.auctionsTraditional(traditionalAuctionData)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Traditional Auctions</h1>
        <p className="text-muted-foreground">
          Monitor and manage seller-led traditional auctions with block rules.
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

      {/* Live Auctions Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Live Traditional Auctions</CardTitle>
          <CardDescription>
            Real-time monitoring of active seller-led auctions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Gear Oil 80W-90</h3>
                <Badge variant="default">Live</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Seller:</span> XYZ Lubricants Pvt Ltd</p>
                <p><span className="font-medium">Qty:</span> 500L / 500L filled</p>
                <p><span className="font-medium">Lowest Bid:</span> ₹118.00</p>
                <p><span className="font-medium">Bidders:</span> 6 active</p>
                <p><span className="font-medium">Ends:</span> 1h 45m</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button size="sm" variant="destructive">
                  <Square className="h-4 w-4 mr-1" />
                  End
                </Button>
                <Button size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Transmission Fluid</h3>
                <Badge variant="secondary">Paused</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Seller:</span> DEF Oil Solutions</p>
                <p><span className="font-medium">Qty:</span> 800L / 600L filled</p>
                <p><span className="font-medium">Lowest Bid:</span> ₹92.50</p>
                <p><span className="font-medium">Bidders:</span> 8 active</p>
                <p><span className="font-medium">Status:</span> Paused by admin</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Resume
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Hydraulic Oil</h3>
                <Badge variant="default">Live</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Seller:</span> GHI Petroleum Co</p>
                <p><span className="font-medium">Qty:</span> 1200L / 1200L filled</p>
                <p><span className="font-medium">Lowest Bid:</span> ₹78.25</p>
                <p><span className="font-medium">Bidders:</span> 12 active</p>
                <p><span className="font-medium">Ends:</span> 3h 12m</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </Button>
                <Button size="sm" variant="destructive">
                  <Square className="h-4 w-4 mr-1" />
                  End
                </Button>
                <Button size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}