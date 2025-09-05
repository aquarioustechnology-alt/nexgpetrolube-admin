import { z } from 'zod'

/**
 * Listing Type Schema
 *
 * Defines valid listing types for the platform
 */
export const listingTypeSchema = z.enum(['Fixed', 'Negotiation', 'Bidding'])

/**
 * Listing Status Schema
 *
 * Defines valid listing statuses for moderation
 */
export const listingStatusSchema = z.enum(['Pending', 'Approved', 'Rejected'])

/**
 * Listing Row Schema
 *
 * Defines the structure for listing data in tables and forms
 */
export const listingRowSchema = z.object({
  id: z.string().min(1, 'Listing ID is required'),
  product: z.string().min(1, 'Product name is required'),
  seller: z.string().min(1, 'Seller name is required'),
  type: listingTypeSchema,
  basePrice: z.number().positive('Base price must be positive'),
  moq: z.string().min(1, 'MOQ is required'),
  status: listingStatusSchema,
  submittedAt: z.string().min(1, 'Submission date is required'),
})

/**
 * Listing Creation Schema
 *
 * For creating new listings (without ID and submittedAt)
 */
export const listingCreateSchema = listingRowSchema.omit({
  id: true,
  submittedAt: true,
})

/**
 * Listing Update Schema
 *
 * For updating existing listings (all fields optional except ID)
 */
export const listingUpdateSchema = listingCreateSchema.partial().extend({
  id: z.string().min(1, 'Listing ID is required'),
})

/**
 * Listing Moderation Schema
 *
 * For approving/rejecting listings
 */
export const listingModerationSchema = z.object({
  id: z.string().min(1, 'Listing ID is required'),
  status: listingStatusSchema,
  reason: z.string().optional(),
})

// Export types
export type ListingType = z.infer<typeof listingTypeSchema>
export type ListingStatus = z.infer<typeof listingStatusSchema>
export type ListingRow = z.infer<typeof listingRowSchema>
export type ListingCreate = z.infer<typeof listingCreateSchema>
export type ListingUpdate = z.infer<typeof listingUpdateSchema>
export type ListingModeration = z.infer<typeof listingModerationSchema>
