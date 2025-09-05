/**
 * Disable User Dialog
 *
 * Confirmation dialog for disabling/enabling user accounts with clear messaging
 * and proper confirmation flow to prevent accidental actions.
 */
'use client'

import * as React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { Shield, ShieldOff } from 'lucide-react'
import type { UserRow } from '@/lib/types'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserRow | null
  isDisabled: boolean
  onToggle: (userId: string, disabled: boolean) => void
}

export default function DisableUserDialog({
  open,
  onOpenChange,
  user,
  isDisabled,
  onToggle,
}: Props) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleConfirm = async () => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      onToggle(user.id, !isDisabled)
      onOpenChange(false)

      toast({
        title: isDisabled ? 'User Enabled' : 'User Disabled',
        description: `${user.company} has been ${isDisabled ? 'enabled' : 'disabled'} successfully.`,
      })
    } catch (error) {
      toast({
        title: 'Action Failed',
        description: `Failed to ${isDisabled ? 'enable' : 'disable'} user. Please try again.`,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {isDisabled ? (
              <Shield className="h-5 w-5 text-emerald-600" />
            ) : (
              <ShieldOff className="h-5 w-5 text-destructive" />
            )}
            {isDisabled ? 'Enable User Account' : 'Disable User Account'}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Are you sure you want to {isDisabled ? 'enable' : 'disable'} the
              account for <span className="font-medium">{user.company}</span>?
            </p>
            {isDisabled ? (
              <p className="text-sm text-muted-foreground">
                This will restore full access to the platform for this user.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                This will prevent the user from logging in and accessing
                platform features. The user will be notified of this action.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className={
              isDisabled
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-destructive hover:bg-destructive/90'
            }
          >
            {isLoading
              ? isDisabled
                ? 'Enabling...'
                : 'Disabling...'
              : isDisabled
                ? 'Enable Account'
                : 'Disable Account'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
