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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  ShoppingCart,
  MessageSquare,
  FileText,
  Gavel,
  Clock,
  CreditCard,
  ArrowUpIcon,
  ArrowDownIcon,
} from 'lucide-react'
import { kpiData } from '@/lib/mock/kpis'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'

// Mock data for tables
const recentKYC = [
  {
    id: '1',
    company: 'ABC Petrochemicals',
    gst: '27AABCU9603R1ZX',
    submitted: '2 hours ago',
    status: 'pending',
  },
  {
    id: '2',
    company: 'XYZ Lubricants Ltd',
    gst: '24AACCG0813R6ZN',
    submitted: '4 hours ago',
    status: 'approved',
  },
  {
    id: '3',
    company: 'Global Oil Solutions',
    gst: '32BBFHG4567H1Z5',
    submitted: '1 day ago',
    status: 'rejected',
  },
]

const liveAuctions = [
  {
    id: '1',
    product: 'Engine Oil 20W-50',
    type: 'Reverse',
    qty: '500L',
    bidders: 8,
    endTime: '2 hours',
  },
  {
    id: '2',
    product: 'Industrial Lubricants',
    type: 'Traditional',
    qty: '1000L',
    bidders: 12,
    endTime: '5 hours',
  },
  {
    id: '3',
    product: 'Hydraulic Fluid',
    type: 'Reverse',
    qty: '250L',
    bidders: 5,
    endTime: '30 mins',
  },
]

const moderationQueue = [
  {
    id: '1',
    type: 'Chat',
    content: 'Contact me at 9876543210',
    rule: 'Phone Number',
    user: 'user@example.com',
  },
  {
    id: '2',
    type: 'Listing',
    content: 'Best quality oil available',
    rule: 'Promotional Language',
    user: 'seller@company.com',
  },
]

const paymentIssues = [
  {
    id: '1',
    provider: 'Razorpay',
    event: 'payment.failed',
    attempts: 3,
    error: 'Insufficient funds',
  },
  {
    id: '2',
    provider: 'PayU',
    event: 'webhook.timeout',
    attempts: 2,
    error: 'Gateway timeout',
  },
]

export default function AdminDashboard() {
  const { toast } = useToast()

  const handleApprove = (id: string, type: string) => {
    toast({
      title: 'Approved',
      description: `${type} ${id} has been approved successfully.`,
    })
  }

  const handleReject = (id: string, type: string) => {
    toast({
      title: 'Rejected',
      description: `${type} ${id} has been rejected.`,
    })
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="h1-tight">Dashboard</h1>
        <p className="subtle">Welcome to NexGPetrolube Admin Portal</p>
      </div>

      {/* Top KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {kpiData.find(k => k.title === 'Registered Users')?.value}
            </div>
            <p className="subtle flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              {kpiData.find(k => k.title === 'Registered Users')?.change} from
              last month
            </p>
            <div className="subtle mt-1">
              Buyers: {kpiData.find(k => k.title === 'Buyers')?.value} |
              Sellers: {kpiData.find(k => k.title === 'Sellers')?.value}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s GMV
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {kpiData.find(k => k.title === "Today's GMV")?.value}
            </div>
            <p className="subtle flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              {kpiData.find(k => k.title === "Today's GMV")?.change} from
              yesterday
            </p>
            <div className="subtle mt-1">
              Take Rate: {kpiData.find(k => k.title === 'Take Rate')?.value}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Auctions</CardTitle>
            <Gavel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {kpiData.find(k => k.title === 'Live Auctions')?.value}
            </div>
            <p className="subtle flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
              {kpiData.find(k => k.title === 'Live Auctions')?.change} from last
              week
            </p>
            <div className="subtle mt-1">Reverse: 8 | Traditional: 12</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-5">
            <div className="nums text-3xl font-semibold tracking-tight md:text-4xl">
              {kpiData.find(k => k.title === 'KYC Pending')?.value}
            </div>
            <p className="subtle flex items-center">
              <ArrowDownIcon className="mr-1 h-3 w-3 text-green-500" />
              {kpiData.find(k => k.title === 'KYC Pending')?.change} from last
              month
            </p>
            <div className="subtle mt-1">5 approaching SLA limit</div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Tables */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="h2-tight">Recent KYC Submissions</CardTitle>
            <CardDescription>
              Latest applications requiring review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-[12.5px] uppercase tracking-wide text-muted-foreground">
                  <TableHead>Company</TableHead>
                  <TableHead>GST</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {recentKYC.map(item => (
                  <TableRow key={item.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium">
                      {item.company}
                    </TableCell>
                    <TableCell className="text-xs">{item.gst}</TableCell>
                    <TableCell>{item.submitted}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'approved'
                            ? 'verified'
                            : item.status === 'rejected'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="default">
                            Approve
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="seller">
                                Reject
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Reject KYC Application
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Please provide a reason for rejecting this KYC
                                  application.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleReject(item.id, 'KYC')}
                                >
                                  Reject
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="h2-tight">Live Auctions</CardTitle>
            <CardDescription>Currently active bidding sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-[12.5px] uppercase tracking-wide text-muted-foreground">
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Bidders</TableHead>
                  <TableHead>Ends In</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {liveAuctions.map(auction => (
                  <TableRow key={auction.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium">
                      {auction.product}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          auction.type === 'Reverse' ? 'seller' : 'buyer'
                        }
                      >
                        {auction.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="nums">{auction.qty}</TableCell>
                    <TableCell className="nums">{auction.bidders}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          auction.endTime.includes('mins')
                            ? 'destructive'
                            : 'outline'
                        }
                      >
                        {auction.endTime}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Monitor
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Additional Operational Tables */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="h2-tight">Moderation Queue</CardTitle>
            <CardDescription>Content requiring moderation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moderationQueue.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge variant="destructive">{item.rule}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.content}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.user}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Delete
                    </Button>
                    <Button size="sm" variant="default">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="h2-tight">Payment Issues</CardTitle>
            <CardDescription>
              Webhook failures and payment issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentIssues.map(issue => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{issue.provider}</Badge>
                      <Badge variant="destructive">Failed</Badge>
                    </div>
                    <p className="text-sm font-medium">{issue.event}</p>
                    <p className="text-xs text-muted-foreground">
                      Attempts: {issue.attempts} | {issue.error}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm" variant="brand">
                      Retry
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="h2-tight">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button
              variant="brand"
              className="h-16 w-full shadow-sm transition-shadow hover:shadow"
              aria-label="Review KYC"
            >
              <Users className="h-6 w-6" />
              <span>Review KYC</span>
            </Button>
            <Button
              variant="brand"
              className="h-16 w-full shadow-sm transition-shadow hover:shadow"
              aria-label="Moderate Listings"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Moderate Listings</span>
            </Button>
            <Button
              variant="brand"
              className="h-16 w-full shadow-sm transition-shadow hover:shadow"
              aria-label="Chat Moderation"
            >
              <MessageSquare className="h-6 w-6" />
              <span>Chat Moderation</span>
            </Button>
            <Button
              variant="brand"
              className="h-16 w-full shadow-sm transition-shadow hover:shadow"
              aria-label="Generate Reports"
            >
              <FileText className="h-6 w-6" />
              <span>Generate Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
