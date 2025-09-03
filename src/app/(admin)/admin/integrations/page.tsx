"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  Link, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Settings,
  Eye,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react'
import { KpiRow } from "@/components/kpi/kpi-row"
import { KpiCard } from "@/components/kpi/kpi-card"
import { KPI } from "@/lib/page-kpis"
import { integrationsMock } from "@/lib/mock/integrations"

export default function IntegrationsPage() {
  // Use the KPI mapping
  const kpis = KPI.integrations(integrationsMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Manage third-party integrations and API connections.
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
            <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Integration
            </CardTitle>
            <CardDescription>
              Connect to new third-party services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Sync All Integrations
            </CardTitle>
            <CardDescription>
              Refresh data from all connected services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Payment Gateways */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateways</CardTitle>
          <CardDescription>
            Manage payment processing integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">S</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Stripe</h3>
                    <p className="text-sm text-muted-foreground">
                      Credit card and digital wallet processing
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="default">Active</Badge>
                      <Badge variant="outline">Production</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">P</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">PayPal</h3>
                    <p className="text-sm text-muted-foreground">
                      Alternative payment method
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="default">Active</Badge>
                      <Badge variant="outline">Production</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Razorpay</h3>
                    <p className="text-sm text-muted-foreground">
                      Indian payment gateway integration
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">Pending</Badge>
                      <Badge variant="outline">Sandbox</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Services */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Communication */}
        <Card>
          <CardHeader>
            <CardTitle>Communication Services</CardTitle>
            <CardDescription>
              Email, SMS, and notification integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">M</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Mailgun</h4>
                    <p className="text-sm text-muted-foreground">Email delivery service</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default">Active</Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">T</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Twilio</h4>
                    <p className="text-sm text-muted-foreground">SMS and voice services</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default">Active</Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">S</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Slack</h4>
                    <p className="text-sm text-muted-foreground">Team notifications</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="destructive">Error</Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics & Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics & Monitoring</CardTitle>
            <CardDescription>
              Data analytics and system monitoring tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">G</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">Website analytics</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default">Active</Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">S</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sentry</h4>
                    <p className="text-sm text-muted-foreground">Error tracking</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default">Active</Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded flex items-center justify-center">
                    <span className="text-yellow-600 font-bold text-xs">N</span>
                  </div>
                  <div>
                    <h4 className="font-medium">New Relic</h4>
                    <p className="text-sm text-muted-foreground">Performance monitoring</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Pending</Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Management */}
      <Card>
        <CardHeader>
          <CardTitle>API Management</CardTitle>
          <CardDescription>
            Manage external API connections and webhooks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-2">
                <h3 className="font-semibold">Webhook Endpoints</h3>
                <p className="text-sm text-muted-foreground">
                  Configure webhook URLs for real-time data synchronization
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Production: 3 active</Badge>
                  <Badge variant="outline">Sandbox: 2 active</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-2">
                <h3 className="font-semibold">API Keys</h3>
                <p className="text-sm text-muted-foreground">
                  Manage API keys for external service access
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Active Keys: 8</Badge>
                  <Badge variant="outline">Expired: 2</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Key
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Manage Keys
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-2">
                <h3 className="font-semibold">Rate Limiting</h3>
                <p className="text-sm text-muted-foreground">
                  Configure API rate limits and throttling rules
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Default: 1000 req/min</Badge>
                  <Badge variant="outline">Premium: 5000 req/min</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Rules
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
