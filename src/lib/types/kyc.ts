/**
 * KYC Types
 *
 * Type definitions for KYC (Know Your Customer) submissions and documents.
 * Used for KYC review workflow and document management.
 */

export type KycStatus = 'Pending' | 'Verified' | 'Rejected'

export type KycDocument = {
  id: string
  name: string
  type: 'image' | 'pdf' | 'other'
  url: string
  thumbnailUrl?: string // for images
  verified?: boolean
}

export type KycSubmission = {
  id: string
  entity: string
  gst: string
  pan: string
  aadhaarMasked: string
  submittedAt: string // ISO
  reviewer?: string
  status: KycStatus
  slaHours: number
  documents: KycDocument[]
}
