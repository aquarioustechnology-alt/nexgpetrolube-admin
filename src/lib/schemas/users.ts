import { z } from 'zod'

/**
 * User Role Schema
 *
 * Defines valid user roles for the platform
 */
export const userRoleSchema = z.enum(['Buyer', 'Seller', 'Both'])

/**
 * KYC Status Schema
 *
 * Defines valid KYC verification statuses
 */
export const kycStatusSchema = z.enum(['Pending', 'Verified', 'Rejected'])

/**
 * User Row Schema
 *
 * Defines the structure for user data in tables and forms
 */
export const userRowSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  role: userRoleSchema,
  kyc: kycStatusSchema,
  createdAt: z.string().min(1, 'Creation date is required'),
  disabled: z.boolean().optional().default(false),
})

/**
 * User Creation Schema
 *
 * For creating new users (without ID and createdAt)
 */
export const userCreateSchema = userRowSchema.omit({
  id: true,
  createdAt: true,
})

/**
 * User Update Schema
 *
 * For updating existing users (all fields optional except ID)
 */
export const userUpdateSchema = userCreateSchema.partial().extend({
  id: z.string().min(1, 'User ID is required'),
})

// Export types
export type UserRole = z.infer<typeof userRoleSchema>
export type KycStatus = z.infer<typeof kycStatusSchema>
export type UserRow = z.infer<typeof userRowSchema>
export type UserCreate = z.infer<typeof userCreateSchema>
export type UserUpdate = z.infer<typeof userUpdateSchema>
