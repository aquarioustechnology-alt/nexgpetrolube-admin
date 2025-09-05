'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  X,
  MessageSquare,
  Download,
  Users,
  Clock,
  XCircle,
  CheckCircle2,
} from 'lucide-react'
import { kycData } from '@/lib/mock/kyc'
import { useToast } from '@/hooks/use-toast'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import KycDetailsModal from '@/components/kyc/kyc-details-modal'
import type { KycSubmission } from '@/lib/types/kyc'

export default function KYCReviewPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<KycSubmission | null>(null)
  const [kycSubmissions, setKycSubmissions] = useState<KycSubmission[]>(kycData)

  // Use the KPI mapping
  const kpis = KPI.kyc(kycSubmissions)

  const filteredData = kycSubmissions.filter(item => {
    const matchesSearch =
      item.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.gst.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (id: string) => {
    setKycSubmissions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'Verified' as const } : item
      )
    )
    toast({
      title: 'KYC Approved',
      description: 'KYC submission has been approved successfully',
    })
    toast({
      title: 'Activation email sent (mock)',
      description: 'User will receive a set-password link.',
    })
    // TODO(CR-A1): replace with backend email when available.
  }

  const handleReject = (id: string, reason: string) => {
    setKycSubmissions(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'Rejected' as const } : item
      )
    )
    toast({
      title: 'KYC Rejected',
      description: `KYC submission rejected: ${reason}`,
    })
  }

  const handleAction = (action: string, item: any) => {
    toast({
      title: 'Success',
      description: `${action} action performed for ${item.entity}`,
    })
  }

  const getStatusCount = (status: string) => {
    return kycSubmissions.filter(item => item.status === status).length
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="h1-tight">KYC Review</h1>
        <p className="subtle">
          Review and manage Know Your Customer submissions from buyers and
          sellers.
        </p>
      </div>

      {/* KPI Row */}
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

      {/* Status Overview */}
      <div className="grid gap-5 md:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {kycData.length}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Review
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {getStatusCount('Pending')}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {getStatusCount('Verified')}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {getStatusCount('Rejected')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="h2-tight">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by entity name or GST..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Verified">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KYC Table */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="h2-tight">KYC Submissions</CardTitle>
          <CardDescription>
            Review and manage KYC submissions. Click on a row to view details
            and take action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map(item => (
              <div
                key={item.id}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{item.entity}</h3>
                      <Badge
                        variant={
                          item.status === 'Pending'
                            ? 'secondary'
                            : item.status === 'Verified'
                              ? 'verified'
                              : 'destructive'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground md:grid-cols-4">
                      <div>
                        <span className="font-medium">GST:</span> {item.gst}
                      </div>
                      <div>
                        <span className="font-medium">PAN:</span> {item.pan}
                      </div>
                      <div>
                        <span className="font-medium">Aadhaar:</span>{' '}
                        {item.aadhaarMasked}
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span>{' '}
                        <span className="nums">
                          {new Date(item.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Documents:</span>{' '}
                      {item.documents.length} files
                    </div>
                    {item.reviewer && (
                      <div className="text-sm">
                        <span className="font-medium">Reviewer:</span>{' '}
                        {item.reviewer}
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>

                    {item.status === 'Pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleAction('Approve', item)}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="seller"
                          onClick={() => handleAction('Reject', item)}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAction('Annotate', item)}
                    >
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Notes
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No KYC submissions found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced KYC Details Modal */}
      {selectedItem && (
        <KycDetailsModal
          open={!!selectedItem}
          onOpenChange={open => !open && setSelectedItem(null)}
          submission={selectedItem}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  )
}
