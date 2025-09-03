'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/tables/data-table'
import { requirementsColumns } from '@/components/tables/columns/requirements-columns'
import { requirementsMock } from '@/lib/mock/requirements'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ListChecks, Repeat2, ShieldAlert, Package } from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import SectionHeading from '@/components/section-heading'
import { KPI } from '@/lib/page-kpis'

export default function RequirementsPage() {
  const kpis = KPI.requirements(requirementsMock)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="h1-tight">Requirements Moderation</h1>
        <p className="subtle">
          Monitor buyer requirements and seller responses
        </p>
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
        columns={requirementsColumns}
        data={requirementsMock}
        searchableColumn="title"
        searchPlaceholder="Search requirements, buyers..."
        toolbarExtras={
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue placeholder="Filter urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[140px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        }
      />
    </div>
  )
}
