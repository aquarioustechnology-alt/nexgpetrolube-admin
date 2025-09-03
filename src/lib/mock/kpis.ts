export interface KPI {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: string
}

export const kpiData: KPI[] = [
  {
    title: "Registered Users",
    value: "12,847",
    change: "+12%",
    changeType: "positive",
    icon: "users"
  },
  {
    title: "Buyers",
    value: "8,234",
    change: "+8%",
    changeType: "positive",
    icon: "user-check"
  },
  {
    title: "Sellers",
    value: "4,613",
    change: "+15%",
    changeType: "positive",
    icon: "store"
  },
  {
    title: "KYC Pending",
    value: "156",
    change: "-5%",
    changeType: "positive",
    icon: "clock"
  },
  {
    title: "KYC Rejected",
    value: "23",
    change: "+2%",
    changeType: "negative",
    icon: "x-circle"
  },
  {
    title: "Live Auctions",
    value: "47",
    change: "+12%",
    changeType: "positive",
    icon: "gavel"
  },
  {
    title: "Today's GMV",
    value: "₹2.4M",
    change: "+18%",
    changeType: "positive",
    icon: "trending-up"
  },
  {
    title: "Take Rate",
    value: "3.2%",
    change: "+0.1%",
    changeType: "positive",
    icon: "percent"
  },
  {
    title: "Commission Collected",
    value: "₹76.8K",
    change: "+22%",
    changeType: "positive",
    icon: "credit-card"
  },
  {
    title: "Payments Attention",
    value: "12",
    change: "+3",
    changeType: "negative",
    icon: "alert-triangle"
  },
  {
    title: "Expiring Contacts",
    value: "8",
    change: "-2",
    changeType: "positive",
    icon: "hourglass"
  }
]
