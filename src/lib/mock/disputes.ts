// Mock data for disputes
export const disputesMock = [
  {
    id: "DIS001",
    type: "bidding",
    title: "Bidding Dispute - Engine Oil Auction",
    buyer: "ABC Petrochem Ltd",
    seller: "XYZ Lubricants",
    opened: "2024-01-15T14:30:00Z",
    status: "Open",
    priority: "High",
    description: "Buyer claims winning bid was not properly recorded. Seller disputes the claim.",
    resolvedInLast7d: false,
    slaHours: 48,
    escalated: true
  },
  {
    id: "DIS002",
    type: "quality",
    title: "Quality Dispute - Brake Fluid",
    buyer: "DEF Oil Solutions",
    seller: "GHI Petroleum",
    opened: "2024-01-14T10:15:00Z",
    status: "Investigating",
    priority: "Medium",
    description: "Buyer reports product does not meet specifications. Seller claims product is within tolerance.",
    resolvedInLast7d: true,
    slaHours: 72,
    escalated: false
  },
  {
    id: "DIS003",
    type: "payment",
    title: "Payment Dispute - Gear Oil Deal",
    buyer: "JKL Fuel Distributors",
    seller: "MNO Oil Solutions",
    opened: "2024-01-12T09:45:00Z",
    status: "Resolved",
    priority: "Low",
    description: "Seller claims payment not received. Buyer shows proof of payment. Bank investigation pending.",
    resolvedInLast7d: true,
    slaHours: 24,
    escalated: false
  },
  {
    id: "DIS004",
    type: "delivery",
    title: "Delivery Dispute - Hydraulic Fluid",
    buyer: "PQR Industrial Supplies",
    seller: "STU Lubricants",
    opened: "2024-01-10T16:20:00Z",
    status: "Open",
    priority: "High",
    description: "Buyer claims delivery was delayed by 3 days. Seller claims weather caused delay.",
    resolvedInLast7d: false,
    slaHours: 96,
    escalated: true
  }
]