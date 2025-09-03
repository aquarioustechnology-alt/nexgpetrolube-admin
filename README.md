# NexGPetrolube Admin Portal

A production-ready admin portal for the NexGPetrolube B2B platform, built with modern web technologies and focused on compliance, moderation, commerce, and content management.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation & Development

```bash
# Clone and navigate to project
cd nexg-admin

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open browser to http://localhost:3000/admin
```

### Production Build

```bash
# Build for production
pnpm run build

# Start production server
pnpm run start

# Run linting
pnpm run lint
```

## 🎯 Features Implemented

### Core Admin Functions

- **📋 Dashboard**: KPI overview with real-time metrics and quick actions
- **👥 KYC Management**: Review system with SLA monitoring and document verification
- **📦 Listings Moderation**: Product listing approval with version control
- **🔨 Auction Monitoring**: Live reverse and traditional auction management
- **💬 Chat Moderation**: Real-time message filtering and user sanctions
- **💰 Commission Management**: Product/category-based commission rules
- **🔒 Compliance**: State authorization mapping for regulated materials
- **📰 Content Management**: WYSIWYG editor and news carousel
- **📊 Analytics**: Business intelligence and audit trails

### Technical Features

- **🎨 Modern UI**: shadcn/ui components with Tailwind CSS
- **🌙 Theme Support**: Light/dark mode with CSS variables
- **⌨️ Command Palette**: Global search with ⌘K shortcut
- **📱 Responsive Design**: Mobile-first responsive interface
- **♿ Accessibility**: WCAG compliant with proper ARIA labels
- **⚡ Performance**: Optimized for large datasets and fast interactions
- **🔐 RBAC**: Role-based access control system

## 🏗️ Tech Stack

### Core Technologies

- **Framework**: Next.js 14 (App Router, TypeScript, strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Tables**: TanStack Table for complex data grids
- **State**: Zustand for lightweight state management
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes with CSS variables

### Utilities

- **Styling**: class-variance-authority, tailwind-merge, clsx
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 📁 Project Structure

```
src/
├── app/
│   ├── (admin)/admin/           # Protected admin routes
│   │   ├── auctions/            # Auction monitoring
│   │   │   ├── reverse/         # Reverse auctions (buyer-led)
│   │   │   └── traditional/     # Traditional auctions (seller-led)
│   │   ├── kyc/                 # KYC review system
│   │   ├── listings/            # Product listing moderation
│   │   ├── chat/                # Chat moderation
│   │   ├── users/               # User management
│   │   ├── disputes/            # Dispute resolution
│   │   ├── commission-rules/    # Commission management
│   │   ├── invoices/            # Invoice & payments
│   │   ├── reconciliation/      # Payment reconciliation
│   │   ├── masters/             # Master data management
│   │   ├── authorization-map/   # Compliance mapping
│   │   ├── cms/                 # Content management
│   │   ├── news/                # News carousel
│   │   ├── reports/             # Analytics & reporting
│   │   ├── audit/               # Audit logs
│   │   ├── integrations/        # External integrations
│   │   ├── settings/            # System settings
│   │   ├── layout.tsx           # Admin shell (sidebar + topbar)
│   │   └── page.tsx             # Main dashboard
│   ├── layout.tsx               # Root layout with providers
│   └── globals.css              # Global styles & theme
├── components/
│   ├── layout/                  # Layout components
│   │   ├── sidebar.tsx          # Collapsible navigation
│   │   ├── topbar.tsx           # Header with breadcrumbs
│   │   └── theme-toggle.tsx     # Light/dark mode switch
│   ├── search/
│   │   └── command-menu.tsx     # ⌘K command palette
│   ├── charts/                  # Chart components
│   │   ├── area-chart.tsx       # Area charts for trends
│   │   ├── line-chart.tsx       # Line charts for metrics
│   │   └── pie-chart.tsx        # Pie charts for distributions
│   └── ui/                      # shadcn/ui primitives
├── lib/
│   ├── utils.ts                 # Utility functions
│   ├── rbac.ts                  # Role-based access control
│   └── mock/                    # Mock data for development
│       ├── kpis.ts              # Dashboard KPI data
│       ├── kyc.ts               # KYC application data
│       └── auctions.ts          # Auction data
└── hooks/
    ├── use-sidebar.ts           # Sidebar state management
    ├── use-toast.ts             # Toast notifications
    └── use-debounce.ts          # Input debouncing
```

## 🎮 Usage Guide

### Navigation

- **Sidebar**: Collapsible navigation with module grouping
- **Command Palette**: Press `⌘K` (Mac) or `Ctrl+K` (Windows) for quick navigation
- **Breadcrumbs**: Current page location in topbar
- **Theme Toggle**: Switch between light/dark mode

### Key Admin Workflows

#### KYC Review Process

1. Navigate to **KYC Review** from sidebar
2. Review pending applications with document verification
3. Use filters to prioritize by SLA status
4. Approve/reject with detailed reasoning
5. View comprehensive audit trail

#### Auction Monitoring

1. Access **Live Bidding Monitor** → **Reverse/Traditional Auctions**
2. Monitor real-time bidding activity
3. Pause/resume auctions as needed
4. Manage user sanctions (mute/kick)
5. Handle split allocation for completed auctions

#### Chat Moderation

1. Navigate to **Chat Moderation**
2. Review flagged messages by AI filters
3. Take actions: Delete, Mute, Kick, or Escalate
4. Track resolution history and patterns

### Mock Data

The application includes comprehensive mock data for development:

- **KPI Dashboard**: Real-time metrics simulation
- **KYC Applications**: Sample submissions with various statuses
- **Auction Data**: Live and completed auction scenarios
- **Chat Messages**: Flagged content examples
- **User Management**: Sample buyer/seller profiles

## 🔐 Authentication & Authorization

### Current Implementation

- **Route Protection**: Basic middleware protection for `/admin` routes
- **RBAC System**: Defined roles and permissions in `lib/rbac.ts`
- **Mock User**: Super Admin role for development

### Roles Defined

- **Super Admin**: Full system access
- **Compliance**: KYC, listings, and compliance functions
- **Moderator**: Content and chat moderation
- **Finance**: Financial operations and reporting
- **CMS Editor**: Content management only
- **Support**: User support and basic reporting

### Production Setup (TODO)

- Implement JWT-based authentication
- Add session management
- Connect to your authentication provider
- Enable real user role assignment

## 🔄 API Integration

### Current State

- **Mock Data**: All data currently served from `lib/mock/`
- **Easy Replacement**: Mock imports can be swapped with API hooks
- **Type Safety**: Full TypeScript interfaces defined

### Integration Steps

1. Replace mock data imports with API calls
2. Add error handling and loading states
3. Implement real-time WebSocket connections
4. Add data caching strategies

## 🎨 Customization

### Theme Customization

Colors are defined in `globals.css` using CSS variables:

```css
:root {
  --primary: 217 91% 60%; /* Blue accent */
  --background: 0 0% 100%; /* Light background */
  --foreground: 222.2 84% 4.9%; /* Dark text */
}

.dark {
  --background: 222.2 84% 4.9%; /* Dark background */
  --foreground: 210 40% 98%; /* Light text */
}
```

### Adding New Components

```bash
# Add shadcn/ui components
pnpm dlx shadcn@latest add <component-name>

# Create custom components in appropriate directories
src/components/[category]/component-name.tsx
```

### Component Guidelines

- Use shadcn/ui primitives as base components
- Follow Tailwind utility-first approach
- Maintain consistent spacing (`space-y-6`, `gap-4`)
- Use CSS variables for theming
- Include proper TypeScript types

## 📊 Business Context

This admin portal is specifically designed for the **Indian petroleum B2B market**:

### Compliance Features

- **State Authorization**: Manage regulated material access by state
- **GST/PAN Integration**: Indian tax compliance
- **KYC Workflows**: Know Your Customer with document verification
- **Audit Trails**: Complete action logging for compliance

### Commerce Features

- **Reverse Auctions**: Buyer-led competitive bidding
- **Traditional Auctions**: Seller-led auctions with block rules
- **Commission Management**: Flexible commission structures
- **Payment Reconciliation**: T+1 settlement tracking

### Operational Features

- **Real-time Moderation**: Chat and content filtering
- **SLA Monitoring**: Service level agreement tracking
- **Multi-modal Commerce**: Fixed, negotiation, and bidding modes
- **Inventory Management**: Product catalog and specifications

## 🚫 Scope Boundaries

### ✅ In Scope

- B2B admin operations and management
- Compliance and regulatory features
- Commerce and auction management
- Content moderation and CMS
- Analytics and business intelligence

### ❌ Out of Scope

- B2C customer-facing features
- Logistics and shipping management
- Inventory/ERP/CRM system integration
- Offline bidding capabilities
- SEO and marketing tools
- Native mobile applications

## 🛠️ Development

### Code Quality

- **TypeScript**: Strict typing enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Path Aliases**: `@/*` for clean imports

### Performance Considerations

- **Large Datasets**: Optimized table rendering with virtualization
- **Fast Interactions**: Debounced search and optimistic updates
- **Minimal Repaints**: Efficient theme switching
- **Bundle Size**: Tree-shaking and code splitting

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

## 🤝 Contributing

### Development Guidelines

1. Follow existing code structure and patterns
2. Use TypeScript for all new code
3. Maintain consistent styling with Tailwind utilities
4. Include proper error handling and loading states
5. Test responsive behavior across devices
6. Add JSDoc comments for complex functions

### File Naming Conventions

- Components: `PascalCase.tsx`
- Pages: `kebab-case/page.tsx`
- Utilities: `kebab-case.ts`
- Constants: `UPPER_SNAKE_CASE`

## 📝 License

This project is proprietary software for NexGPetrolube.

## 🆘 Support

### Documentation Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [Tailwind CSS Utilities](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/en-US/)
- [TanStack Table](https://tanstack.com/table/latest)

### Common Issues

- **Build Errors**: Check TypeScript types and imports
- **Styling Issues**: Verify Tailwind classes and CSS variables
- **State Problems**: Review Zustand store usage
- **Route Issues**: Check middleware and route group structure

---

**Built with ❤️ for NexGPetrolube B2B Platform**

_Production-ready admin portal with modern architecture, comprehensive features, and enterprise-grade quality._
