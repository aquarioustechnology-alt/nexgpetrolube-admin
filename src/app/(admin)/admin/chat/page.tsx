'use client'

import { useState } from 'react'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
import { Separator } from '@/components/ui/separator'
import {
  Search,
  Eye,
  Trash2,
  UserX,
  Volume2,
  VolumeX,
  Flag,
  MessageCircle,
  AlertTriangle,
  Shield,
  Filter,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { KpiRow } from '@/components/kpi/kpi-row'
import { KpiCard } from '@/components/kpi/kpi-card'
import { KPI } from '@/lib/page-kpis'
import { moderationMock } from '@/lib/mock/moderation'

const getSeverityBadge = (severity: string) => {
  switch (severity) {
    case 'high':
      return <Badge variant="destructive">High</Badge>
    case 'medium':
      return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
    case 'low':
      return <Badge className="bg-yellow-100 text-yellow-800">Low</Badge>
    default:
      return <Badge variant="outline">{severity}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary">Pending</Badge>
    case 'resolved':
      return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
    case 'escalated':
      return <Badge className="bg-red-100 text-red-800">Escalated</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getRoomTypeBadge = (type: string) => {
  switch (type) {
    case 'Auction':
      return <Badge className="bg-purple-100 text-purple-800">Auction</Badge>
    case 'Listing':
      return <Badge className="bg-blue-100 text-blue-800">Listing</Badge>
    case 'Negotiation':
      return <Badge className="bg-green-100 text-green-800">Negotiation</Badge>
    case 'General':
      return <Badge variant="outline">General</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

function ChatDetailSheet({
  chat,
  onDelete,
  onMute,
  onKick,
  onEscalate,
  onResolve,
}: {
  chat: any
  onDelete: (id: string) => void
  onMute: (id: string, duration: string) => void
  onKick: (id: string) => void
  onEscalate: (id: string) => void
  onResolve: (id: string) => void
}) {
  return (
    <SheetContent className="w-[600px] overflow-y-auto sm:w-[700px]">
      <SheetHeader>
        <SheetTitle>Chat Moderation - {chat.id}</SheetTitle>
        <SheetDescription>
          Review and take action on flagged message
        </SheetDescription>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              MESSAGE DETAILS
            </h4>
            <div className="space-y-2">
              <div className="rounded-md bg-muted p-3">
                <p className="font-mono text-sm">{chat.message}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Sent at: {new Date(chat.timestamp).toLocaleString()}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              FLAG INFORMATION
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-orange-500" />
                <span className="font-medium">{chat.flaggedBy}</span>
              </div>
              <div className="flex gap-2">
                {getSeverityBadge(chat.severity)}
                {getStatusBadge(chat.status)}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              USER INFORMATION
            </h4>
            <div className="space-y-2">
              <div className="text-sm">
                <strong>Name:</strong> {chat.userName}
              </div>
              <div className="text-sm">
                <strong>Email:</strong> {chat.user}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              ROOM CONTEXT
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{chat.room}</span>
              </div>
              <div>{getRoomTypeBadge(chat.roomType)}</div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
            CONTEXT & HISTORY
          </h4>
          <div className="rounded-md bg-muted p-3 text-sm">{chat.context}</div>

          {chat.actions.length > 0 && (
            <div className="mt-3">
              <label className="text-sm font-medium text-muted-foreground">
                Previous Actions:
              </label>
              <div className="mt-1 space-y-1">
                {chat.actions.map((action: string, index: number) => (
                  <Badge key={index} variant="outline" className="mr-2">
                    {action.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {chat.status === 'pending' && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-3">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Message
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Message</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the flagged message. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(chat.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <VolumeX className="mr-2 h-4 w-4" />
                    Mute User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mute User</AlertDialogTitle>
                    <AlertDialogDescription>
                      How long should this user be muted?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onMute(chat.id, '1 hour')}
                    >
                      1 Hour
                    </AlertDialogAction>
                    <AlertDialogAction
                      onClick={() => onMute(chat.id, '24 hours')}
                    >
                      24 Hours
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <UserX className="mr-2 h-4 w-4" />
                    Kick User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Kick User</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove the user from the current room. They can
                      rejoin if invited.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onKick(chat.id)}>
                      Kick
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                variant="outline"
                onClick={() => onEscalate(chat.id)}
                className="w-full"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Escalate
              </Button>

              <Button
                onClick={() => onResolve(chat.id)}
                className="col-span-2 w-full"
              >
                <Shield className="mr-2 h-4 w-4" />
                Mark as Resolved
              </Button>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  )
}

export default function ChatModerationPage() {
  const { toast } = useToast()
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')

  const filteredChats = moderationMock.filter(chat => {
    const matchesSearch =
      chat.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.room.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity =
      severityFilter === 'all' || chat.severity === severityFilter

    return matchesSearch && matchesSeverity
  })

  const handleDelete = (id: string) => {
    toast({
      title: 'Message Deleted',
      description: `Message ${id} has been deleted and user has been notified.`,
    })
  }

  const handleMute = (id: string, duration: string) => {
    toast({
      title: 'User Muted',
      description: `User has been muted for ${duration}.`,
    })
  }

  const handleKick = (id: string) => {
    toast({
      title: 'User Kicked',
      description: `User has been removed from the room.`,
    })
  }

  const handleEscalate = (id: string) => {
    toast({
      title: 'Case Escalated',
      description: `Case ${id} has been escalated to senior moderators.`,
    })
  }

  const handleResolve = (id: string) => {
    toast({
      title: 'Case Resolved',
      description: `Case ${id} has been marked as resolved.`,
    })
  }

  const getStatusCount = (status: string) => {
    return moderationMock.filter(chat => chat.status === status).length
  }

  const getSeverityCount = (severity: string) => {
    return moderationMock.filter(chat => chat.severity === severity).length
  }

  // Use the KPI mapping
  const kpis = KPI.chat(moderationMock)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat Moderation</h1>
        <p className="text-muted-foreground">
          Monitor and moderate chat messages across auctions, listings, and
          discussions
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Moderation Queue</CardTitle>
              <CardDescription>
                Review and take action on flagged chat messages
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-64 pl-8"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Message</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Rule Violated</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChats.map(chat => (
                <TableRow key={chat.id}>
                  <TableCell className="max-w-xs">
                    <div className="truncate rounded bg-muted p-2 font-mono text-sm">
                      {chat.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{chat.userName}</div>
                      <div className="text-sm text-muted-foreground">
                        {chat.user}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{chat.room}</div>
                      <div className="mt-1">
                        {getRoomTypeBadge(chat.roomType)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{chat.flaggedBy}</Badge>
                  </TableCell>
                  <TableCell>{getSeverityBadge(chat.severity)}</TableCell>
                  <TableCell>{getStatusBadge(chat.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {new Date(chat.timestamp).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedChat(chat)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            Review
                          </Button>
                        </SheetTrigger>
                        {selectedChat && (
                          <ChatDetailSheet
                            chat={selectedChat}
                            onDelete={handleDelete}
                            onMute={handleMute}
                            onKick={handleKick}
                            onEscalate={handleEscalate}
                            onResolve={handleResolve}
                          />
                        )}
                      </Sheet>

                      {chat.status === 'pending' &&
                        chat.severity === 'high' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(chat.id)}
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Delete
                          </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
