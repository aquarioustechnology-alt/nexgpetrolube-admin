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
  FileText,
  Image,
  Video,
  Edit,
  Plus,
  Eye,
  Trash2,
  Calendar,
  User,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { pagesMock } from '@/lib/mock/cms'

export default function CMSPage() {
  // Use the KPI mapping
  const kpis = KPI.cms(pagesMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Content Management
        </h1>
        <p className="text-muted-foreground">
          Manage website content, banners, and marketing materials.
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
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Banners</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Content</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Page
            </CardTitle>
            <CardDescription>
              Add a new content page to the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Upload Banner
            </CardTitle>
            <CardDescription>
              Add new banner images for promotions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Image className="mr-2 h-4 w-4" />
              Upload Banner
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Add Video
            </CardTitle>
            <CardDescription>Upload or embed video content</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Add Video
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Content Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Content Pages</CardTitle>
          <CardDescription>Manage website pages and content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">About Us</h3>
                  <p className="text-sm text-muted-foreground">
                    Company information and history
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="default">Published</Badge>
                    <Badge variant="outline">Last updated: 2 days ago</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    Preview
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
                <div className="space-y-1">
                  <h3 className="font-semibold">Products & Services</h3>
                  <p className="text-sm text-muted-foreground">
                    Overview of company offerings
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="default">Published</Badge>
                    <Badge variant="outline">Last updated: 1 week ago</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    Preview
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
                <div className="space-y-1">
                  <h3 className="font-semibold">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Company contact details and locations
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary">Draft</Badge>
                    <Badge variant="outline">Last updated: 3 days ago</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="mr-1 h-4 w-4" />
                    Preview
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

      {/* Banners */}
      <Card>
        <CardHeader>
          <CardTitle>Banners & Promotions</CardTitle>
          <CardDescription>
            Manage promotional banners and images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-muted">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">Homepage Hero</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Main promotional banner
              </p>
              <div className="flex gap-2">
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

            <div className="rounded-lg border p-4">
              <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-muted">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">Product Showcase</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Featured products banner
              </p>
              <div className="flex gap-2">
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

            <div className="rounded-lg border p-4">
              <div className="mb-3 flex aspect-video items-center justify-center rounded-lg bg-muted">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">Special Offers</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Discounts and promotions
              </p>
              <div className="flex gap-2">
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
        </CardContent>
      </Card>
    </div>
  )
}
