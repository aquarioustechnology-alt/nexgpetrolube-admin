import { z } from 'zod'

/**
 * Requirement Status Schema
 *
 * Defines valid requirement statuses
 */
export const requirementStatusSchema = z.enum(['Open', 'Quoted', 'Closed'])

/**
 * Requirement Urgency Schema
 *
 * Defines valid urgency levels for requirements
 */
export const requirementUrgencySchema = z.enum([
  'Low',
  'Medium',
  'High',
  'Urgent',
])

/**
 * Requirement Row Schema
 *
 * Defines the structure for requirement data in tables and forms
 */
export const requirementRowSchema = z.object({
  id: z.string().min(1, 'Requirement ID is required'),
  title: z.string().min(1, 'Requirement title is required'),
  buyer: z.string().min(1, 'Buyer name is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  urgency: requirementUrgencySchema,
  status: requirementStatusSchema,
  quotes: z.number().int().min(0, 'Quotes count must be non-negative'),
  deadline: z.string().min(1, 'Deadline is required'),
  postedAt: z.string().min(1, 'Posting date is required'),
})

/**
 * Requirement Creation Schema
 *
 * For creating new requirements (without ID and postedAt)
 */
export const requirementCreateSchema = requirementRowSchema.omit({
  id: true,
  postedAt: true,
  quotes: true,
})

/**
 * Requirement Update Schema
 *
 * For updating existing requirements (all fields optional except ID)
 */
export const requirementUpdateSchema = requirementCreateSchema
  .partial()
  .extend({
    id: z.string().min(1, 'Requirement ID is required'),
  })

/**
 * Requirement Quote Schema
 *
 * For adding quotes to requirements
 */
export const requirementQuoteSchema = z.object({
  requirementId: z.string().min(1, 'Requirement ID is required'),
  quote: z.string().min(1, 'Quote is required'),
  price: z.number().positive('Price must be positive'),
})

// Export types
export type RequirementStatus = z.infer<typeof requirementStatusSchema>
export type RequirementUrgency = z.infer<typeof requirementUrgencySchema>
export type RequirementRow = z.infer<typeof requirementRowSchema>
export type RequirementCreate = z.infer<typeof requirementCreateSchema>
export type RequirementUpdate = z.infer<typeof requirementUpdateSchema>
export type RequirementQuote = z.infer<typeof requirementQuoteSchema>
