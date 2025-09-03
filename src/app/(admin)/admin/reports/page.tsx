'use client'

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
import {
  Search,
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  Eye,
  FileText,
  PieChart,
  LineChart,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'

export default function ReportsPage() {
  // Use the KPI mapping with empty array as placeholder
  const kpis = KPI.reports([])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground">
          Generate and view comprehensive business reports and analytics.
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

      {/* Quick Reports */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sales Report
            </CardTitle>
            <CardDescription>
              Monthly sales performance and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Current Month</span>
                <span className="font-semibold">₹2.4M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Previous Month</span>
                <span className="text-muted-foreground">₹2.1M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Growth</span>
                <span className="text-green-600">+14.3%</span>
              </div>
              <Button className="mt-3 w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription>
              Key performance indicators and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Conversion Rate</span>
                <span className="font-semibold">3.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg. Order Value</span>
                <span className="text-muted-foreground">₹45,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Customer Retention</span>
                <span className="text-green-600">87%</span>
              </div>
              <Button className="mt-3 w-full" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Revenue Analysis
            </CardTitle>
            <CardDescription>
              Revenue breakdown by category and region
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Engine Oils</span>
                <span className="font-semibold">42%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Industrial</span>
                <span className="text-muted-foreground">28%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Specialty</span>
                <span className="text-muted-foreground">30%</span>
              </div>
              <Button className="mt-3 w-full" variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Financial Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>
              Revenue, commission, and financial analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Monthly Revenue Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive revenue analysis
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Commission Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Commission tracking and analysis
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Payment Reconciliation</h4>
                    <p className="text-sm text-muted-foreground">
                      Payment tracking and reconciliation
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operational Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Operational Reports</CardTitle>
            <CardDescription>
              Business operations and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Auction Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Auction success rates and metrics
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">User Activity Report</h4>
                    <p className="text-sm text-muted-foreground">
                      User engagement and activity metrics
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Moderation Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Content moderation and compliance
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Report Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>
            Create custom reports with specific parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Report</SelectItem>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="performance">
                    Performance Report
                  </SelectItem>
                  <SelectItem value="operational">
                    Operational Report
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Export Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Add Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
