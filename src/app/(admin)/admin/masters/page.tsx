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
  Database,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  FolderOpen,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { mastersMock } from '@/lib/mock/masters'

export default function MastersPage() {
  // Use the KPI mapping
  const kpis = KPI.masters(mastersMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Master Data Management
        </h1>
        <p className="text-muted-foreground">
          Manage categories, sub-categories, brands, units, and locations.
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
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sub-categories
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brands</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="text-center">
            <Plus className="mx-auto h-8 w-8 text-primary" />
            <CardTitle className="text-sm">Add Category</CardTitle>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="text-center">
            <Plus className="mx-auto h-8 w-8 text-primary" />
            <CardTitle className="text-sm">Add Sub-category</CardTitle>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="text-center">
            <Plus className="mx-auto h-8 w-8 text-primary" />
            <CardTitle className="text-sm">Add Brand</CardTitle>
          </CardHeader>
        </Card>

        <Card className="cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader className="text-center">
            <Plus className="mx-auto h-8 w-8 text-primary" />
            <CardTitle className="text-sm">Add Location</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
          <CardDescription>Manage main product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Engine Oils</h3>
                  <p className="text-sm text-muted-foreground">
                    Sub-categories: 8 • Products: 156 • Active: Yes
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="outline">High Volume</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Gear Oils</h3>
                  <p className="text-sm text-muted-foreground">
                    Sub-categories: 6 • Products: 89 • Active: Yes
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="outline">Medium Volume</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Brake Fluids</h3>
                  <p className="text-sm text-muted-foreground">
                    Sub-categories: 4 • Products: 67 • Active: Yes
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="outline">Standard Volume</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle>Brands</CardTitle>
          <CardDescription>
            Manage product brands and manufacturers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Castrol</h3>
                <p className="text-sm text-muted-foreground">
                  Products: 45 • Categories: 6 • Status: Active
                </p>
                <div className="flex gap-2">
                  <Badge variant="default">Active</Badge>
                  <Badge variant="outline">Premium</Badge>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Mobil</h3>
                <p className="text-sm text-muted-foreground">
                  Products: 38 • Categories: 5 • Status: Active
                </p>
                <div className="flex gap-2">
                  <Badge variant="default">Active</Badge>
                  <Badge variant="outline">Premium</Badge>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Shell</h3>
                <p className="text-sm text-muted-foreground">
                  Products: 42 • Categories: 7 • Status: Active
                </p>
                <div className="flex gap-2">
                  <Badge variant="default">Active</Badge>
                  <Badge variant="outline">Premium</Badge>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
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
