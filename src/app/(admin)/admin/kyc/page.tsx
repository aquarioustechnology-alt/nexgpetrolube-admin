"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  CheckCircle2
} from 'lucide-react'
import { kycData } from '@/lib/mock/kyc'
import { useToast } from '@/hooks/use-toast'
import { KpiRow } from "@/components/kpi/kpi-row"
import { KpiCard } from "@/components/kpi/kpi-card"
import { KPI } from "@/lib/page-kpis"

export default function KYCReviewPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Use the KPI mapping
  const kpis = KPI.kyc(kycData)

  const filteredData = kycData.filter(item => {
    const matchesSearch = item.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.gst.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAction = (action: string, item: any) => {
    toast({
      title: "Success",
      description: `${action} action performed for ${item.entity}`
    })
  }

  const getStatusCount = (status: string) => {
    return kycData.filter(item => item.status === status).length
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="h1-tight">KYC Review</h1>
        <p className="subtle">
          Review and manage Know Your Customer submissions from buyers and sellers.
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
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="text-3xl md:text-4xl font-semibold nums tracking-tight">{kycData.length}</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="text-3xl md:text-4xl font-semibold nums tracking-tight">{getStatusCount('pending')}</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="text-3xl md:text-4xl font-semibold nums tracking-tight">{getStatusCount('approved')}</div>
          </CardContent>
        </Card>
        
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="text-3xl md:text-4xl font-semibold nums tracking-tight">{getStatusCount('rejected')}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="h2-tight">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by entity name or GST..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
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
            Review and manage KYC submissions. Click on a row to view details and take action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{item.entity}</h3>
                      <Badge variant={
                        item.status === 'pending' ? 'secondary' : 
                        item.status === 'approved' ? 'verified' : 'destructive'
                      }>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">GST:</span> {item.gst}
                      </div>
                      <div>
                        <span className="font-medium">PAN:</span> {item.pan}
                      </div>
                      <div>
                        <span className="font-medium">Aadhaar:</span> {item.aadhaar}
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span> <span className="nums">{new Date(item.submitted).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Documents:</span> {item.docs.join(', ')}
                    </div>
                    {item.reviewer && (
                      <div className="text-sm">
                        <span className="font-medium">Reviewer:</span> {item.reviewer}
                      </div>
                    )}
                    {item.notes && (
                      <div className="text-sm">
                        <span className="font-medium">Notes:</span> {item.notes}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    
                    {item.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleAction('Approve', item)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="seller"
                          onClick={() => handleAction('Reject', item)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAction('Annotate', item)}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Notes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No KYC submissions found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Details Side Sheet would go here */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">KYC Details - {selectedItem.entity}</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedItem(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Entity Name</label>
                  <p className="font-medium">{selectedItem.entity}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant={
                    selectedItem.status === 'pending' ? 'secondary' : 
                    selectedItem.status === 'approved' ? 'verified' : 'destructive'
                  }>
                    {selectedItem.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">GST Number</label>
                  <p className="font-mono">{selectedItem.gst}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">PAN Number</label>
                  <p className="font-mono">{selectedItem.pan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Aadhaar</label>
                  <p className="font-mono">{selectedItem.aadhaar}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                  <p className="nums">{new Date(selectedItem.submitted).toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Documents</label>
                <div className="mt-1 space-y-1">
                  {selectedItem.docs.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedItem.reviewer && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reviewer</label>
                  <p>{selectedItem.reviewer}</p>
                </div>
              )}
              
              {selectedItem.notes && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="mt-1 p-3 bg-muted rounded-md">{selectedItem.notes}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              {selectedItem.status === 'pending' && (
                <>
                  <Button onClick={() => handleAction('Approve', selectedItem)}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button variant="seller" onClick={() => handleAction('Reject', selectedItem)}>
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
