/**
 * CR-A1: Admin User Creation (UI only)
 *
 * Page for creating new users through a 3-step wizard.
 * Handles user basics, KYC upload, and review before submission.
 */

import CreateUserWizard from '@/components/users/create-user-wizard'

export default function NewUserPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Create User</h1>
        <p className="text-sm text-muted-foreground">
          Create a buyer, seller, or both; upload KYC; submit for review.
        </p>
      </div>
      <CreateUserWizard />
    </div>
  )
}
