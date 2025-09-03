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
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  UserCheck,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { usersMock } from '@/lib/mock/users'
import { rolesMock } from '@/lib/mock/roles'

export default function RolesPage() {
  // Use the KPI mapping
  const kpis = KPI.roles(usersMock, rolesMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
        <p className="text-muted-foreground">
          Manage user roles, permissions, and access controls.
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
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Role
            </CardTitle>
            <CardDescription>
              Define a new role with custom permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Permission Manager
            </CardTitle>
            <CardDescription>
              Manage system-wide permissions and access rights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Manage Permissions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Default Roles */}
      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            Predefined roles with standard permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Super Administrator</h3>
                    <Badge variant="destructive">System</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full system access with all permissions
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Users: 2</Badge>
                    <Badge variant="outline">Permissions: All</Badge>
                    <Badge variant="outline">Cannot Delete</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
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

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Administrator</h3>
                    <Badge variant="destructive">System</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Administrative access with most permissions
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Users: 8</Badge>
                    <Badge variant="outline">Permissions: 22/24</Badge>
                    <Badge variant="outline">Cannot Delete</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
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

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Moderator</h3>
                    <Badge variant="default">Standard</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Content moderation and user management
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Users: 24</Badge>
                    <Badge variant="outline">Permissions: 18/24</Badge>
                    <Badge variant="outline">Can Edit</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Analyst</h3>
                    <Badge variant="default">Standard</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Data analysis and reporting access
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Users: 15</Badge>
                    <Badge variant="outline">Permissions: 12/24</Badge>
                    <Badge variant="outline">Can Edit</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Roles</CardTitle>
          <CardDescription>
            User-defined roles with specific permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Finance Manager</h3>
                    <Badge variant="secondary">Custom</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Financial operations and payment management
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Users: 6</Badge>
                    <Badge variant="outline">Permissions: 16/24</Badge>
                    <Badge variant="outline">Created: 2 weeks ago</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Support Specialist</h3>
                    <Badge variant="secondary">Custom</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer support and issue resolution
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Users: 12</Badge>
                    <Badge variant="outline">Permissions: 10/24</Badge>
                    <Badge variant="outline">Created: 1 month ago</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Content Editor</h3>
                    <Badge variant="secondary">Custom</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Content management and publishing
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="outline">Users: 8</Badge>
                    <Badge variant="outline">Permissions: 8/24</Badge>
                    <Badge variant="outline">Created: 3 weeks ago</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>
            Overview of permissions across all roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left font-medium">Permission</th>
                  <th className="p-3 text-center font-medium">Super Admin</th>
                  <th className="p-3 text-center font-medium">Admin</th>
                  <th className="p-3 text-center font-medium">Moderator</th>
                  <th className="p-3 text-center font-medium">Analyst</th>
                  <th className="p-3 text-center font-medium">Finance</th>
                  <th className="p-3 text-center font-medium">Support</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3">User Management</td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="secondary">Limited</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-3">Content Moderation</td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="secondary">Limited</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-3">Financial Operations</td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="p-3">Reports & Analytics</td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="secondary">Limited</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="default">Full</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="secondary">Limited</Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">View</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
