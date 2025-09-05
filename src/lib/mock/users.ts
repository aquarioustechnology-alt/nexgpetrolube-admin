import type { UserRow } from '@/lib/types'

// Mock data for users
export const usersMock: UserRow[] = [
  {
    id: '1',
    company: 'NexG Industries',
    email: 'john.doe@nexg.com',
    phone: '+1 (555) 123-4567',
    role: 'Both',
    kyc: 'Verified',
    createdAt: '2024-01-15',
    disabled: false,
  },
  {
    id: '2',
    company: 'Tech Solutions Ltd',
    email: 'jane.smith@nexg.com',
    phone: '+1 (555) 987-6543',
    role: 'Both',
    kyc: 'Verified',
    createdAt: '2024-01-14',
    disabled: false,
  },
  {
    id: '3',
    company: 'Global Enterprises',
    email: 'robert.j@nexg.com',
    phone: '+1 (555) 456-7890',
    role: 'Buyer',
    kyc: 'Pending',
    createdAt: '2024-01-10',
    disabled: false,
  },
  {
    id: '4',
    company: 'Innovative Corp',
    email: 'emily.d@nexg.com',
    phone: '+1 (555) 234-5678',
    role: 'Both',
    kyc: 'Verified',
    createdAt: '2024-01-12',
    disabled: false,
  },
  {
    id: '5',
    company: 'Premium Services',
    email: 'michael.w@nexg.com',
    phone: '+1 (555) 876-5432',
    role: 'Seller',
    kyc: 'Rejected',
    createdAt: '2024-01-08',
    disabled: true,
  },
]

/**
 * Check if an email already exists in the system
 * Used for email de-duplication in user creation wizard
 */
export function emailExists(email: string): boolean {
  return usersMock.some(u => u.email?.toLowerCase() === email.toLowerCase())
}
