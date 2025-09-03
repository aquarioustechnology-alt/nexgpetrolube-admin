"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Calculator, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  RefreshCw,
  Download,
  Clock
} from 'lucide-react'
import { KpiRow } from "@/components/kpi/kpi-row"
import { KpiCard } from "@/components/kpi/kpi-card"
import { KPI } from "@/lib/page-kpis"
import { webhooksMock } from "@/lib/mock/webhooks"

export default function ReconciliationPage() {
  // Use the KPI mapping
  const kpis = KPI.reconciliation(webhooksMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Reconciliation</h1>
        <p className="text-muted-foreground">
          Monitor webhook retries, T+1 ledger, and payment reconciliation.
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

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,847</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webhook Failures</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reconciled Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending T+1</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
          </CardContent>
        </Card>
      </div>

      {/* Webhook Failures */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Failures</CardTitle>
          <CardDescription>
            Failed webhook deliveries requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Payment Gateway Webhook Failure</h3>
                  <p className="text-sm text-muted-foreground">
                    Provider: Razorpay • Event: payment.captured • Attempts: 3/5 • Last Error: Connection timeout
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="destructive">Failed</Badge>
                    <Badge variant="outline">High Priority</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Payload
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Retry Now
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Resolved
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">KYC Provider Webhook Failure</h3>
                  <p className="text-sm text-muted-foreground">
                    Provider: Karvy • Event: kyc.verified • Attempts: 2/5 • Last Error: Invalid signature
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="destructive">Failed</Badge>
                    <Badge variant="outline">Medium Priority</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Payload
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Retry Now
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark Resolved
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* T+1 Ledger */}
      <Card>
        <CardHeader>
          <CardTitle>T+1 Ledger Reconciliation</CardTitle>
          <CardDescription>
            Daily ledger reconciliation and balance verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">January 15, 2024 - Ledger Reconciliation</h3>
                  <p className="text-sm text-muted-foreground">
                    Total Transactions: 1,247 • Platform Revenue: ₹45,230 • Commission Collected: ₹12,450
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="default">Reconciled</Badge>
                    <Badge variant="outline">Balance: ₹0.00</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">January 14, 2024 - Ledger Reconciliation</h3>
                  <p className="text-sm text-muted-foreground">
                    Total Transactions: 1,189 • Platform Revenue: ₹42,150 • Commission Collected: ₹11,890
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="default">Reconciled</Badge>
                    <Badge variant="outline">Balance: ₹0.00</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">January 13, 2024 - Ledger Reconciliation</h3>
                  <p className="text-sm text-muted-foreground">
                    Total Transactions: 1,156 • Platform Revenue: ₹41,230 • Commission Collected: ₹11,450
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Pending</Badge>
                    <Badge variant="outline">Balance: ₹0.00</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Reconcile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}