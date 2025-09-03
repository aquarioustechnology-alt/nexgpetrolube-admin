"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  FileText,
  ShoppingCart,
  Gavel,
  MessageSquare,
  AlertTriangle,
  CreditCard,
  Receipt,
  Calculator,
  Database,
  Shield,
  FileImage,
  Newspaper,
  BarChart3,
  FileSearch,
  Settings,
  Zap,
  Building2,
  Package,
  Truck,
  MessageCircle,
  HelpCircle
} from 'lucide-react'

const navigation = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        title: "KYC Review",
        href: "/admin/kyc",
        icon: Users,
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: Building2,
      },
      {
        title: "Listings Moderation",
        href: "/admin/listings",
        icon: FileText,
      },
      {
        title: "Requirements Moderation",
        href: "/admin/requirements",
        icon: ShoppingCart,
      },
      {
        title: "Live Bidding Monitor",
        items: [
          {
            title: "Reverse Auctions",
            href: "/admin/auctions/reverse",
            icon: Gavel,
          },
          {
            title: "Traditional Auctions",
            href: "/admin/auctions/traditional",
            icon: Gavel,
          },
        ],
      },
      {
        title: "Chat Moderation",
        href: "/admin/chat",
        icon: MessageCircle,
      },
      {
        title: "Disputes",
        href: "/admin/disputes",
        icon: AlertTriangle,
      },
    ],
  },
  {
    title: "Commercials",
    items: [
      {
        title: "Commission Rules",
        href: "/admin/commission-rules",
        icon: CreditCard,
      },
      {
        title: "Invoices & Payments",
        href: "/admin/invoices",
        icon: Receipt,
      },
      {
        title: "Payment Reconciliation",
        href: "/admin/reconciliation",
        icon: Calculator,
      },
    ],
  },
  {
    title: "Catalog & Compliance",
    items: [
      {
        title: "Masters",
        href: "/admin/masters",
        icon: Database,
      },
      {
        title: "State Authorization Map",
        href: "/admin/authorization-map",
        icon: Shield,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        title: "CMS & Banners",
        href: "/admin/cms",
        icon: FileImage,
      },
      {
        title: "News Carousel",
        href: "/admin/news",
        icon: Newspaper,
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        title: "Analytics",
        href: "/admin/reports",
        icon: BarChart3,
      },
      {
        title: "Audit Logs",
        href: "/admin/audit",
        icon: FileSearch,
      },
    ],
  },
  {
    title: "Integrations & Settings",
    items: [
      {
        title: "Integrations",
        href: "/admin/integrations",
        icon: Zap,
      },
      {
        title: "Roles & Permissions",
        href: "/admin/settings/roles",
        icon: Settings,
      },
    ],
  },
]

interface NavItemProps {
  item: any
  isCollapsed: boolean
  pathname: string
}

function NavItem({ item, isCollapsed, pathname }: NavItemProps) {
  const isActive = pathname === item.href
  const Icon = item.icon

  if (item.items) {
    return (
      <div className="space-y-1">
        {!isCollapsed && (
          <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground">
            {item.title}
          </h4>
        )}
        {item.items.map((subItem: any) => (
          <NavItem
            key={subItem.href}
            item={subItem}
            isCollapsed={isCollapsed}
            pathname={pathname}
          />
        ))}
      </div>
    )
  }

  return (
    <Link href={item.href}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start relative",
          isCollapsed ? "px-2" : "px-3",
          isActive && "bg-secondary before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-[3px] before:rounded-full before:bg-brand-gradient"
        )}
      >
        <Icon className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
        {!isCollapsed && item.title}
      </Button>
    </Link>
  )
}

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebar()
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-semibold">NexGPetrolube</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggle}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-4">
          {navigation.map((group, index) => (
            <div key={index} className="space-y-1">
              {!isCollapsed && (
                <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.title}
                </h4>
              )}
              {group.items.map((item: any) => (
                <NavItem
                  key={item.href || item.title}
                  item={item}
                  isCollapsed={isCollapsed}
                  pathname={pathname}
                />
              ))}
              {index < navigation.length - 1 && !isCollapsed && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
