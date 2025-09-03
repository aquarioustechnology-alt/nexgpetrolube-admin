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
  Globe,
  TrendingUp,
  Edit,
  Plus,
  Eye,
  Trash2,
  Calendar,
  User,
  ExternalLink,
} from 'lucide-react'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { newsMock } from '@/lib/mock/news'

export default function NewsPage() {
  // Use the KPI mapping
  const kpis = KPI.news(newsMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">News & Updates</h1>
        <p className="text-muted-foreground">
          Manage company news, industry updates, and announcements.
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
            <CardTitle className="text-sm font-medium">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create News Article
            </CardTitle>
            <CardDescription>
              Write and publish new company news
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Article
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Industry Updates
            </CardTitle>
            <CardDescription>Curate industry news and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Globe className="mr-2 h-4 w-4" />
              Add Update
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
          <CardDescription>Latest published news and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      New Product Launch: Advanced Lubricants
                    </h3>
                    <Badge variant="default">Published</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Introducing our latest line of high-performance lubricants
                    designed for extreme conditions...
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      John Smith
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />2 hours ago
                    </span>
                    <Badge variant="outline">Product News</Badge>
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
                    <ExternalLink className="mr-1 h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      Industry Report: Q4 Market Trends
                    </h3>
                    <Badge variant="default">Published</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Analysis of lubricant market trends and future projections
                    for the industry...
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Sarah Johnson
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />1 day ago
                    </span>
                    <Badge variant="outline">Industry Analysis</Badge>
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
                    <ExternalLink className="mr-1 h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">
                      Company Expansion: New Regional Office
                    </h3>
                    <Badge variant="default">Published</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    NexGPetrolube announces opening of new regional office in
                    South India...
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Marketing Team
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />3 days ago
                    </span>
                    <Badge variant="outline">Company News</Badge>
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
                    <ExternalLink className="mr-1 h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Updates</CardTitle>
          <CardDescription>
            Curated industry news and market insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">External</Badge>
                <Badge variant="outline">Market</Badge>
              </div>
              <h3 className="mb-2 font-semibold">Global Oil Prices Update</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Latest updates on global crude oil prices and their impact on
                lubricant costs
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  2 hours ago
                </span>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Read More
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">External</Badge>
                <Badge variant="outline">Technology</Badge>
              </div>
              <h3 className="mb-2 font-semibold">New Lubricant Technology</h3>
              <p className="mb-3 text-sm text-muted-foreground">
                Breakthrough in synthetic lubricant technology promises longer
                engine life
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">1 day ago</span>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Read More
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary">External</Badge>
                <Badge variant="outline">Regulation</Badge>
              </div>
              <h3 className="mb-2 font-semibold">
                Environmental Standards Update
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                New environmental regulations affecting lubricant manufacturing
                and disposal
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  2 days ago
                </span>
                <Button size="sm" variant="outline">
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
