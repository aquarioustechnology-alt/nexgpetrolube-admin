/**
 * Edit User Modal
 *
 * Provides a form interface for editing user information including company details,
 * contact information, role, and KYC status with validation and save functionality.
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, X } from 'lucide-react'
import type { UserRow, UserRole, KycStatus } from '@/lib/types'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserRow | null
  onSave: (updatedUser: UserRow) => void
}

const editUserSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  role: z.enum(['Buyer', 'Seller', 'Both']),
  kyc: z.enum(['Pending', 'Verified', 'Rejected']),
})

type EditUserForm = z.infer<typeof editUserSchema>

export default function EditUserModal({
  open,
  onOpenChange,
  user,
  onSave,
}: Props) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      company: '',
      email: '',
      phone: '',
      role: 'Buyer',
      kyc: 'Pending',
    },
  })

  // Update form when user changes
  React.useEffect(() => {
    if (user) {
      form.reset({
        company: user.company,
        email: user.email,
        phone: user.phone,
        role: user.role as UserRole,
        kyc: user.kyc as KycStatus,
      })
    }
  }, [user, form])

  const onSubmit = async (data: EditUserForm) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const updatedUser: UserRow = {
        ...user,
        ...data,
      }

      onSave(updatedUser)
      onOpenChange(false)

      toast({
        title: 'User Updated',
        description: `${data.company} has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update user. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    onOpenChange(false)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Edit User
          </DialogTitle>
          <DialogDescription>
            Update information for {user.company}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <ScrollArea className="max-h-[60vh] pr-2">
            <div className="space-y-6">
              {/* Company Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  Company Information
                </h4>
                <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      {...form.register('company')}
                      className={
                        form.formState.errors.company
                          ? 'border-destructive'
                          : ''
                      }
                    />
                    {form.formState.errors.company && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.company.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      className={
                        form.formState.errors.email ? 'border-destructive' : ''
                      }
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...form.register('phone')}
                      className={
                        form.formState.errors.phone ? 'border-destructive' : ''
                      }
                    />
                    {form.formState.errors.phone && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Role and Status */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Role & Status</h4>
                <div className="grid grid-cols-1 gap-4 rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">User Role *</Label>
                    <select
                      id="role"
                      {...form.register('role')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Buyer">Buyer</option>
                      <option value="Seller">Seller</option>
                      <option value="Both">Both</option>
                    </select>
                    {form.formState.errors.role && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.role.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kyc">KYC Status *</Label>
                    <select
                      id="kyc"
                      {...form.register('kyc')}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Verified">Verified</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    {form.formState.errors.kyc && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.kyc.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
