export interface Auction {
  id: string
  type: 'reverse' | 'traditional'
  product: string
  totalQty: number
  filledQty: number
  bidders: number
  startTime: string
  endTime: string
  status: 'open' | 'paused' | 'ended'
  bestBid?: number
  lowestBid?: number
  countdown: string
}

export const auctionData: Auction[] = [
  {
    id: "AUCT001",
    type: "reverse",
    product: "Engine Oil 5W-30",
    totalQty: 1000,
    filledQty: 750,
    bidders: 12,
    startTime: "2024-01-15T09:00:00Z",
    endTime: "2024-01-16T09:00:00Z",
    status: "open",
    bestBid: 85.50,
    countdown: "23:45:12"
  },
  {
    id: "AUCT002",
    type: "traditional",
    product: "Gear Oil 80W-90",
    totalQty: 500,
    filledQty: 500,
    bidders: 8,
    startTime: "2024-01-14T10:00:00Z",
    endTime: "2024-01-15T10:00:00Z",
    status: "ended",
    lowestBid: 120.00,
    countdown: "00:00:00"
  },
  {
    id: "AUCT003",
    type: "reverse",
    product: "Brake Fluid DOT4",
    totalQty: 2000,
    filledQty: 1200,
    bidders: 15,
    startTime: "2024-01-15T14:00:00Z",
    endTime: "2024-01-17T14:00:00Z",
    status: "open",
    bestBid: 45.75,
    countdown: "47:32:18"
  },
  {
    id: "AUCT004",
    type: "traditional",
    product: "Transmission Fluid",
    totalQty: 800,
    filledQty: 600,
    bidders: 6,
    startTime: "2024-01-15T08:00:00Z",
    endTime: "2024-01-16T08:00:00Z",
    status: "paused",
    lowestBid: 95.00,
    countdown: "15:22:45"
  },
  {
    id: "AUCT005",
    type: "reverse",
    product: "Coolant 50/50",
    totalQty: 1500,
    filledQty: 1500,
    bidders: 20,
    startTime: "2024-01-13T12:00:00Z",
    endTime: "2024-01-14T12:00:00Z",
    status: "ended",
    bestBid: 28.90,
    countdown: "00:00:00"
  }
]
