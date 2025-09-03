export type UserRole = "Buyer" | "Seller" | "Both"
export type KycStatus = "Pending" | "Verified" | "Rejected"
export type ListingStatus = "Pending" | "Approved" | "Rejected"
export type ListingType = "Fixed" | "Negotiation" | "Bidding"
export type RequirementStatus = "Open" | "Quoted" | "Closed"
export type RequirementUrgency = "Low" | "Medium" | "High" | "Urgent"

export type UserRow = {
  id: string
  company: string
  email: string
  phone: string
  role: UserRole
  kyc: KycStatus
  createdAt: string
}

export type ListingRow = {
  id: string
  product: string
  seller: string
  type: ListingType
  basePrice: number
  moq: string
  status: ListingStatus
  submittedAt: string
}

export type RequirementRow = {
  id: string
  title: string
  buyer: string
  quantity: string
  urgency: RequirementUrgency
  status: RequirementStatus
  quotes: number
  deadline: string
  postedAt: string
}