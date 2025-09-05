/**
 * Users Management Page
 *
 * Admin interface for managing user accounts, roles, and KYC status.
 * Displays user statistics and provides table-based user management.
 */
'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Users,
  UserCheck,
  Store,
  Plus,
  MoreHorizontal,
  Users as UsersIcon,
  ShieldCheck,
  Hourglass,
  Users2,
} from 'lucide-react'

import * as React from 'react'
import { DataTable } from '@/components/tables/data-table'
import { createUsersColumns } from '@/components/tables/columns/users-columns'
import { usersMock } from '@/lib/mock/users'
import { Button } from '@/components/ui/button'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import SectionHeading from '@/components/section-heading'
import { KPI } from '@/lib/page-kpis'
import CreateUserModal from '@/components/users/create-user-modal'
import ViewUserModal from '@/components/users/view-user-modal'
import EditUserModal from '@/components/users/edit-user-modal'
import DisableUserDialog from '@/components/users/disable-user-dialog'
import type { UserRow } from '@/lib/types'

export default function UsersPage() {
  const [openCreate, setOpenCreate] = React.useState(false)
  const [openView, setOpenView] = React.useState(false)
  const [openEdit, setOpenEdit] = React.useState(false)
  const [openDisable, setOpenDisable] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<UserRow | null>(null)
  const [users, setUsers] = React.useState<UserRow[]>(usersMock)

  const kpis = KPI.users(users)

  // Modal handlers
  const handleView = (user: UserRow) => {
    setSelectedUser(user)
    setOpenView(true)
  }

  const handleEdit = (user: UserRow) => {
    setSelectedUser(user)
    setOpenEdit(true)
  }

  const handleDisable = (user: UserRow) => {
    setSelectedUser(user)
    setOpenDisable(true)
  }

  const handleSaveUser = (updatedUser: UserRow) => {
    setUsers(prev =>
      prev.map(user => (user.id === updatedUser.id ? updatedUser : user))
    )
  }

  const handleToggleUserStatus = (userId: string, disabled: boolean) => {
    // For demo purposes, we'll just update the local state
    // In a real app, this would make an API call
    setUsers(prev =>
      prev.map(user => (user.id === userId ? { ...user, disabled } : user))
    )
  }

  const columns = createUsersColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDisable: handleDisable,
  })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="h1-tight">Users</h1>
        <p className="subtle">Manage user accounts and roles</p>
      </div>

      <KpiRow>
        {kpis.map((k, i) => (
          <KpiCard
            key={i}
            label={k.label}
            value={k.value}
            icon={k.icon}
            hint={k.hint}
          />
        ))}
      </KpiRow>

      <SectionHeading>Platform Core Features</SectionHeading>

      <DataTable
        columns={columns}
        data={users}
        searchableColumn="company"
        searchPlaceholder="Search company, email, phone..."
        toolbarExtras={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button
              size="sm"
              variant="brand"
              onClick={() => setOpenCreate(true)}
            >
              Add User
            </Button>
          </div>
        }
      />

      {/* Modals */}
      <CreateUserModal open={openCreate} onOpenChange={setOpenCreate} />

      <ViewUserModal
        open={openView}
        onOpenChange={setOpenView}
        user={selectedUser}
      />

      <EditUserModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        user={selectedUser}
        onSave={handleSaveUser}
      />

      <DisableUserDialog
        open={openDisable}
        onOpenChange={setOpenDisable}
        user={selectedUser}
        isDisabled={selectedUser?.disabled || false}
        onToggle={handleToggleUserStatus}
      />
    </div>
  )
}
