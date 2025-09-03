# Admin Panel Scope Document

## Indian Retirement Planning Tool - Admin Interface

### Project Overview

This document defines the complete scope for the admin panel of the Indian retirement planning tool, focusing on compliance, moderation, commerce, and content management. The admin panel will be built using Next.js with shadcn/ui components and follow modern admin dashboard patterns.

---

## 1. Sidebar Navigation (Final IA)

### Core Structure

- **Framework**: Use Sidebar, ScrollArea, Accordion, Command (cmd-K), Tooltip, Badge, Separator, UserNav from shadcn/ui
- **Icons**: lucide-react icon library
- **Organization**: Top to bottom, grouped by daily workflows

### Navigation Modules

#### 1.1 Overview

- Dashboard (main landing page)

#### 1.2 Operations

- **KYC Review**
  - Queues: Pending, Rejected, Verified
  - SLA monitoring and aging
- **Users Management**
  - Buyers, Sellers, Both
  - Role switching capabilities
- **Listings Moderation**
  - Seller listings: Fixed/Negotiation/Bidding
  - Version control and approval workflow
- **Requirements Moderation**
  - Buyer posts: Quick Quote/Reverse
  - Authorization requirements for regulated materials
- **Live Bidding Monitor**
  - Real-time auction tracking
- **Reverse Auctions**
  - Buyer-led auction management
- **Traditional Auctions**
  - Seller-led auctions with block rules
- **Chat Moderation**
  - Filters, mutes, removals, logs
- **Disputes**
  - Cases raised from bidding/deals

#### 1.3 Commercials

- **Commission Rules**
  - By product/category/sub-category/brand
  - Effective date management
- **Invoices & Payments**
  - Commission invoices, status tracking, exports
- **Payment Reconciliation**
  - Webhook retries, T+1 ledger

#### 1.4 Catalog & Compliance

- **Masters**
  - Categories, Sub-categories, Brands, Units, Locations
- **State Authorization Map**
  - Regulated materials access control

#### 1.5 Content

- **CMS Pages & Banners**
  - WYSIWYG editor for static content
- **News Carousel**
  - Curated API → moderation → publish
  - 24h cache management

#### 1.6 Reports

- **Analytics**
  - GMV, Take-Rate, Conversion, Funnel, Cohorts, State Compliance
- **Audit Logs**
  - Append-only actions trail

#### 1.7 Integrations & Settings

- **Integrations**
  - KYC, Payment Gateway, WhatsApp, News, Search
- **Roles & Permissions**
  - RBAC implementation
- **Security**
  - Rate limits, WAF notes

---

## 2. Main Admin Dashboard

### 2.1 Top KPI Strip (Cards)

- **User Metrics**
  - Registered Users (Buyers / Sellers / Both)
- **KYC Status**
  - KYC Queue (Pending / Rejected / SLA aging)
- **Auction Activity**
  - Live Auctions (Reverse / Traditional running now)
- **Financial Metrics**
  - Today's GMV (platform GMV)
  - Take-Rate (= Commission/GMV)
  - Commission Collected
- **Operational Alerts**
  - Payments Requiring Attention (webhook failed / pending capture)
  - Expiring 48-hr Contact Windows (count)

### 2.2 Charts Section

- **GMV & Take-Rate Over Time**
  - Area chart with line overlay
- **Live Bidding Activity**
  - Bids per Minute (real-time)
  - Outbid Alerts volume (WebSocket feed)
- **Category Performance**
  - Category Mix by GMV (Pie/Donut chart)
- **Compliance Monitoring**
  - State Compliance Heatmap (violations/authorizations)

### 2.3 Operational Tables (Paginated)

- **Recent KYC Submissions**
  - Company, GST/PAN flags, submitted at, reviewer, status
  - Actions: Approve/Reject/Annotate (Dialog with reason)
- **Live Bidding Rooms**
  - Type (Reverse/Traditional), product, total qty / filled, #bidders, start–end, status
  - Actions: Open Room, Pause, End, Kick/Mute
- **Moderation Queue**
  - Chat excerpts with blocked tokens, rule hit, room, user
  - Actions: Delete, Mute, Kick, Escalate
- **Commission Invoices**
  - Buyer/seller, deal, amount, status, due in
  - Actions: Send Link, Mark Paid (via webhook), Retry
- **Payment Webhook Failures**
  - Provider, event, attempts, last error
  - Actions: Retry now, View payload
- **News Carousel Pending**
  - Headline, source, fetched at, editor
  - Actions: Approve, Edit, Discard, Pin

### 2.4 Shortcuts & Utilities

- **Command Palette (⌘K)**
  - Jump to user, listing, auction, invoice by ID
  - Quick actions: "Create Commission Rule", "Add Category/Brand", "Publish Banner", "Sync Search Index"

---

## 3. Key Screen Specifications

### 3.1 KYC Review

**Columns:**

- Entity, GST, PAN/Aadhaar, Docs, Submitted, Notes, Status

**Row Actions:**

- View (Side Sheet), Approve/Reject (Dialog with reason), Assign Reviewer

### 3.2 Listings Moderation

**Columns:**

- Seller, Product, Type (Fixed/Negotiation/Bidding), Base Price/MOQ, Changes vs last version, Flags

**Actions:**

- Approve (rate-only auto-approve), Send Back, Version Diff

### 3.3 Requirements Moderation

**Columns:**

- Buyer, Material/Qty/Unit, Mode (Quick Quote/Reverse), Location/State, Regulated? (auth needed)

**Actions:**

- Approve, Block, Request Authorization Proof

### 3.4 Bidding Monitor (Reverse / Traditional)

**Live Grid:**

- Product, total qty vs filled, highest/lowest (or best), #bidders, end timer, alerts

**Actions:**

- Open Room, Pause, End, Split Allocation Aid (for seller-led), View Bid Table

### 3.5 Chat Moderation

**Features:**

- Filters hit: phone/email/profanity/sensitive terms
- Action log
- Per-user sanctions

### 3.6 Commission Rules

**Scope Selectors:**

- Product → Category → Sub-category → Brand
- Rule value
- Effective dates

**Preview:**

- Impact on last 30 days deals

### 3.7 Invoices & Payments

**Features:**

- Invoice list with statuses
- Consolidated invoices
- Export CSV
- Webhook status & retry

### 3.8 Masters & Authorization Map

**CRUD Operations:**

- Category/Brand/Units/Locations
- State-wise restriction matrix for regulated materials

### 3.9 CMS & News

**Features:**

- Pages/Banners (WYSIWYG)
- News moderation queue with 24h TTL cache controls

### 3.10 Reports & Audit

**Prebuilt Dashboards:**

- GMV/Take-Rate/Funnel/Cohorts/Compliance + export

**Audit Trail:**

- Full audit trail (actor, action, entity, before/after, timestamp)

### 3.11 Integrations

**Provider Management:**

- Provider credentials (masked)
- Webhook endpoints
- Health/last event
- Test ping

### 3.12 Settings (RBAC)

**Roles:**

- Super Admin, Compliance, Moderator, Finance, CMS Editor, Support

**Features:**

- Permission matrix per sidebar module

---

## 4. Technical Requirements

### 4.1 Component Library

**Shadcn/ui Components:**

- **Layout**: Sidebar, ResizablePanel, ScrollArea, Breadcrumb, Tabs
- **Data**: Table (TanStack integration), Badge, DropdownMenu, Select, Popover (date range), Pagination, Skeleton, Progress
- **Feedback**: Alert, AlertDialog, Dialog, Toast
- **Inputs**: Form, Input, Textarea, Checkbox, Switch, Combobox
- **Media/meta**: Avatar, Tooltip, Separator, Sheet (side panels)

### 4.2 Charts & Data Visualization

- **Library**: Recharts
- **Chart Types**: Area, Bar, Pie charts
- **Real-time**: WebSocket integration for live data

### 4.3 Data Management

- **Tables**: TanStack Table integration
- **Pagination**: Built-in pagination for all data tables
- **Search**: Global search with command palette
- **Filters**: Advanced filtering capabilities

---

## 5. Scope Guards (Important)

### 5.1 Out of Scope (Do Not Add)

- B2C storefront
- Logistics/insurance bookings
- Inventory/ERP/CRM systems
- Offline bidding
- SEO/marketing tools
- Data migration tools
- Dynamic currency conversion
- Native mobile applications

### 5.2 Language & Currency

- Language/currency management for end users is not part of admin MVP
- Keep admin focused on compliance, moderation, commerce, and content per SOW
- Static currency mentions in forms are allowed
- Dynamic FX conversion is forbidden

### 5.3 Change Request Process

- If out-of-scope features are identified during UI ideation, park under change-request
- All scope changes must go through proper approval process

---

## 6. Implementation Notes

### 6.1 Development Approach

- Build completely autonomously without asking for permissions or clarifications
- Follow PRD and implementation plan
- Make reasonable decisions independently
- Deliver final working application

### 6.2 Priority Order

1. Core navigation and layout
2. Dashboard widgets and KPIs
3. Key operational screens (KYC, Moderation, Bidding)
4. Commercial and compliance features
5. Content management and reporting
6. Integrations and settings

### 6.3 Quality Standards

- Modern, responsive admin interface
- Consistent component usage
- Proper error handling and loading states
- Accessibility compliance
- Performance optimization for large datasets

---

_This scope document serves as the definitive guide for the Indian retirement planning tool admin panel development. All features and requirements are to be implemented as specified without deviation unless explicitly approved through change request process._
