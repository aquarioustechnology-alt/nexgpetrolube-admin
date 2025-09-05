/**
 * Admin User Types
 *
 * Type definitions for admin-created user drafts and KYC upload items.
 * Used for the user creation wizard and KYC submission process.
 */

export type AdminUserDraft = {
  id: string
  company: string
  gst?: string
  email: string
  phone: string
  contactName: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    pincode: string
    country: string
  }
  role: 'Buyer' | 'Seller' | 'Both'
  createdByAdmin: boolean
}

export type KycDocumentType =
  | 'pan-card'
  | 'aadhaar-card'
  | 'gst-certificate'
  | 'company-registration'
  | 'bank-statement'
  | 'address-proof'
  | 'other'

export type KycUploadItem = {
  id: string
  name: string
  type: 'image' | 'pdf'
  url: string
  thumbnailUrl?: string
  documentType: KycDocumentType
}
