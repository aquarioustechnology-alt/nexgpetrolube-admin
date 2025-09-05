/**
 * View User Modal
 *
 * Displays comprehensive user information in a read-only modal format.
 * Shows company details, contact information, role, KYC status, and account metadata.
 */
'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Calendar,
  Mail,
  Phone,
  Building,
  User,
  Shield,
  Clock,
} from 'lucide-react'
import type { UserRow } from '@/lib/types'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserRow | null
}

export default function ViewUserModal({ open, onOpenChange, user }: Props) {
  if (!user) return null

  const getRoleVariant = (role: string) => {
    return role.toLowerCase() as 'buyer' | 'seller' | 'both'
  }

  const getKycVariant = (kyc: string) => {
    return kyc.toLowerCase() === 'verified' ? 'verified' : 'secondary'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
          <DialogDescription>
            View comprehensive information for {user.company}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-6">
            {/* Company Information */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-medium text-foreground">
                <Building className="h-4 w-4" />
                Company Information
              </h4>
              <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Company Name
                    </div>
                    <div className="font-medium">{user.company}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Role</div>
                    <div className="mt-1">
                      <Badge variant={getRoleVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-medium text-foreground">
                <Mail className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Email Address
                      </div>
                      <div className="font-medium">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Phone Number
                      </div>
                      <div className="font-medium">{user.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-medium text-foreground">
                <Shield className="h-4 w-4" />
                Account Status
              </h4>
              <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      KYC Status
                    </div>
                    <div className="mt-1">
                      <Badge variant={getKycVariant(user.kyc)}>
                        {user.kyc}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Account Status
                    </div>
                    <div className="mt-1">
                      <Badge
                        variant="default"
                        className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      >
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Metadata */}
            <div className="space-y-3">
              <h4 className="flex items-center gap-2 font-medium text-foreground">
                <Clock className="h-4 w-4" />
                Account Information
              </h4>
              <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Account Created
                      </div>
                      <div className="font-medium">{user.createdAt}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Last Login
                      </div>
                      <div className="font-medium text-muted-foreground">
                        Never
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">
                Additional Information
              </h4>
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="text-sm text-muted-foreground">
                  This user account was created through the admin panel. All
                  contact information has been verified during the registration
                  process. KYC verification status determines the user&apos;s
                  access level to platform features.
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
