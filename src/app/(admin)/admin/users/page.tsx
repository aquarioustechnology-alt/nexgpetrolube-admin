"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  Users2
} from 'lucide-react'

import { DataTable } from "@/components/tables/data-table"
import { usersColumns } from "@/components/tables/columns/users-columns"
import { usersMock } from "@/lib/mock/users"
import { Button } from "@/components/ui/button"
import { KpiRow } from "@/components/kpi/kpi-row"
import { KpiCard } from "@/components/kpi/kpi-card"
import SectionHeading from "@/components/section-heading"
import { KPI } from "@/lib/page-kpis"

export default function UsersPage() {
  const kpis = KPI.users(usersMock)

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
        columns={usersColumns}
        data={usersMock}
        searchableColumn="company"
        searchPlaceholder="Search company, email, phone..."
        toolbarExtras={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button size="sm" variant="brand">Add User</Button>
          </div>
        }
      />
    </div>
  )
}