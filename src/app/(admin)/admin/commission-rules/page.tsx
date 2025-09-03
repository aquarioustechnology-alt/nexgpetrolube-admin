"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Search, 
  CreditCard, 
  Plus, 
  Settings, 
  Eye,
  Edit,
  Trash2,
  Calculator
} from 'lucide-react'
import { KpiRow } from "@/components/kpi/kpi-row"
import { KpiCard } from "@/components/kpi/kpi-card"
import { KPI } from "@/lib/page-kpis"
import { rulesMock } from "@/lib/mock/commissions"

export default function CommissionRulesPage() {
  // Use the KPI mapping
  const kpis = KPI.commissions(rulesMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Commission Rules</h1>
        <p className="text-muted-foreground">
          Configure commission rates by product, category, sub-category, and brand.
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

      {/* Rule Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Commission Rule</CardTitle>
          <CardDescription>
            Set commission rates for specific product combinations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium">Product Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engine-oils">Engine Oils</SelectItem>
                  <SelectItem value="gear-oils">Gear Oils</SelectItem>
                  <SelectItem value="brake-fluids">Brake Fluids</SelectItem>
                  <SelectItem value="coolants">Coolants</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Sub-category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="synthetic">Synthetic</SelectItem>
                  <SelectItem value="mineral">Mineral</SelectItem>
                  <SelectItem value="semi-synthetic">Semi-Synthetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Brand</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="castrol">Castrol</SelectItem>
                  <SelectItem value="mobil">Mobil</SelectItem>
                  <SelectItem value="shell">Shell</SelectItem>
                  <SelectItem value="bp">BP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Commission Rate (%)</label>
              <Input type="number" placeholder="3.5" step="0.1" min="0" max="10" />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
            <Button variant="outline">
              <Calculator className="h-4 w-4 mr-2" />
              Preview Impact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Rules</CardTitle>
          <CardDescription>
            Manage existing commission rules and their rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Engine Oils → Synthetic → Castrol</h3>
                  <p className="text-sm text-muted-foreground">
                    Commission: 3.5% • Effective: Jan 1, 2024 • Status: Active
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="outline">High Volume</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calculator className="h-4 w-4 mr-1" />
                    Impact
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Gear Oils → Mineral → All Brands</h3>
                  <p className="text-sm text-muted-foreground">
                    Commission: 2.8% • Effective: Jan 1, 2024 • Status: Active
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="outline">Standard Rate</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calculator className="h-4 w-4 mr-1" />
                    Impact
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Brake Fluids → DOT4 → All Brands</h3>
                  <p className="text-sm text-muted-foreground">
                    Commission: 4.2% • Effective: Jan 1, 2024 • Status: Active
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="default">Active</Badge>
                    <Badge variant="outline">Premium Rate</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calculator className="h-4 w-4 mr-1" />
                    Impact
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
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