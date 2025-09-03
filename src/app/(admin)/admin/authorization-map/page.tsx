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
  MapPin,
  AlertTriangle,
  Eye,
  Edit,
  Plus,
  CheckCircle,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { authMapMock } from '@/lib/mock/authorization'

export default function AuthorizationMapPage() {
  // Use the KPI mapping
  const kpis = KPI.authMap(authMapMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          State Authorization Map
        </h1>
        <p className="text-muted-foreground">
          Manage regulated materials access and state compliance mapping.
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
            <CardTitle className="text-sm font-medium">Total States</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Regulated Materials
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Compliant States
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      {/* State Map */}
      <Card>
        <CardHeader>
          <CardTitle>State Compliance Overview</CardTitle>
          <CardDescription>
            Visual representation of state compliance status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Maharashtra</h3>
                <Badge variant="default">Compliant</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Regulated Materials: 8 • Authorizations: 8 • Status: Active
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Delhi</h3>
                <Badge variant="default">Compliant</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Regulated Materials: 6 • Authorizations: 6 • Status: Active
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Karnataka</h3>
                <Badge variant="destructive">Violation</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Regulated Materials: 7 • Authorizations: 5 • Status: Warning
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Tamil Nadu</h3>
                <Badge variant="secondary">Pending</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Regulated Materials: 6 • Authorizations: 4 • Status: Under
                Review
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Gujarat</h3>
                <Badge variant="default">Compliant</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Regulated Materials: 9 • Authorizations: 9 • Status: Active
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">West Bengal</h3>
                <Badge variant="destructive">Violation</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Regulated Materials: 5 • Authorizations: 3 • Status: Critical
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="mr-1 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regulated Materials */}
      <Card>
        <CardHeader>
          <CardTitle>Regulated Materials</CardTitle>
          <CardDescription>
            Manage materials requiring special authorization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Specialty Lubricants</h3>
                  <p className="text-sm text-muted-foreground">
                    Category: Engine Oils • States: 24 • Authorization Required:
                    Yes
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="destructive">High Risk</Badge>
                    <Badge variant="outline">24 States</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View States
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Industrial Solvents</h3>
                  <p className="text-sm text-muted-foreground">
                    Category: Chemicals • States: 18 • Authorization Required:
                    Yes
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="destructive">High Risk</Badge>
                    <Badge variant="outline">18 States</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View States
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Fire Retardant Oils</h3>
                  <p className="text-sm text-muted-foreground">
                    Category: Specialty • States: 12 • Authorization Required:
                    Yes
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="destructive">Medium Risk</Badge>
                    <Badge variant="outline">12 States</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View States
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
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
