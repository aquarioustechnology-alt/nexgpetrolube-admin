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
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Eye,
  Download,
  User,
  Calendar,
  Activity,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { auditMock } from '@/lib/mock/audit'

export default function AuditPage() {
  // Use the KPI mapping
  const kpis = KPI.audit(auditMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Audit & Compliance
        </h1>
        <p className="text-muted-foreground">
          Monitor system activities, security events, and compliance status.
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
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Security Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Scan
            </CardTitle>
            <CardDescription>Run comprehensive security audit</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Shield className="mr-2 h-4 w-4" />
              Start Scan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Logs
            </CardTitle>
            <CardDescription>Download audit logs for analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Compliance Check
            </CardTitle>
            <CardDescription>Verify compliance requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Check Compliance
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>
            Latest security alerts and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      Multiple Failed Login Attempts
                    </h3>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    User account &quot;admin@nexg.com&quot; had 5 failed login
                    attempts from IP 192.168.1.100
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      admin@nexg.com
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      15 minutes ago
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      IP: 192.168.1.100
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Shield className="mr-1 h-4 w-4" />
                    Block IP
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Suspicious File Upload</h3>
                    <Badge variant="destructive">Medium Risk</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    File &quot;document.exe&quot; uploaded by user
                    &quot;john.doe&quot; - flagged by antivirus
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      john.doe
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />1 hour ago
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      File: document.exe
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Shield className="mr-1 h-4 w-4" />
                    Quarantine
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      Database Access Pattern Change
                    </h3>
                    <Badge variant="secondary">Low Risk</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Unusual database query patterns detected from user
                    &quot;analyst.user&quot;
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      analyst.user
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />3 hours ago
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      Database: main_db
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Shield className="mr-1 h-4 w-4" />
                    Monitor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Data Protection */}
        <Card>
          <CardHeader>
            <CardTitle>Data Protection Compliance</CardTitle>
            <CardDescription>
              GDPR and data privacy compliance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Data Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      All data encrypted at rest
                    </p>
                  </div>
                </div>
                <Badge variant="default">Compliant</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Access Controls</h4>
                    <p className="text-sm text-muted-foreground">
                      Role-based access implemented
                    </p>
                  </div>
                </div>
                <Badge variant="default">Compliant</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium">Data Retention</h4>
                    <p className="text-sm text-muted-foreground">
                      Policy review pending
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Under Review</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Security */}
        <Card>
          <CardHeader>
            <CardTitle>System Security Status</CardTitle>
            <CardDescription>
              Infrastructure and application security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">SSL/TLS</h4>
                    <p className="text-sm text-muted-foreground">
                      All connections encrypted
                    </p>
                  </div>
                </div>
                <Badge variant="default">Secure</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Firewall</h4>
                    <p className="text-sm text-muted-foreground">
                      Network protection active
                    </p>
                  </div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium">Vulnerability Scan</h4>
                    <p className="text-sm text-muted-foreground">
                      Last scan: 5 days ago
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Due Soon</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
          <CardDescription>
            System activity and user action logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input placeholder="Search logs..." className="max-w-sm" />
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="login">Login Events</SelectItem>
                  <SelectItem value="data">Data Access</SelectItem>
                  <SelectItem value="admin">Admin Actions</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border">
              <div className="border-b bg-muted/50 p-4">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium">
                  <span>Timestamp</span>
                  <span>User</span>
                  <span>Action</span>
                  <span>Resource</span>
                  <span>Status</span>
                </div>
              </div>

              <div className="divide-y">
                <div className="grid grid-cols-5 gap-4 p-4 text-sm">
                  <span>2024-01-15 14:30:22</span>
                  <span>admin@nexg.com</span>
                  <span>User Login</span>
                  <span>System</span>
                  <Badge variant="default">Success</Badge>
                </div>

                <div className="grid grid-cols-5 gap-4 p-4 text-sm">
                  <span>2024-01-15 14:25:15</span>
                  <span>john.doe</span>
                  <span>Data Export</span>
                  <span>Reports</span>
                  <Badge variant="default">Success</Badge>
                </div>

                <div className="grid grid-cols-5 gap-4 p-4 text-sm">
                  <span>2024-01-15 14:20:08</span>
                  <span>sarah.johnson</span>
                  <span>User Update</span>
                  <span>User Management</span>
                  <Badge variant="default">Success</Badge>
                </div>

                <div className="grid grid-cols-5 gap-4 p-4 text-sm">
                  <span>2024-01-15 14:15:42</span>
                  <span>analyst.user</span>
                  <span>Database Query</span>
                  <span>Analytics DB</span>
                  <Badge variant="secondary">Warning</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing 1-20 of 2,847 events
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
