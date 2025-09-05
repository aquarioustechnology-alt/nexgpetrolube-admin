Purpose
Ensure every AI/agent change is clean, consistent, scalable, and aligned with scope. This file is the single source of truth for structure, style, and review gates.

0. Agent Contract (read first, every task)

No hallucinations. If a requirement isn’t in this doc, scope.md, or the task prompt, do not invent it. Prefer a small TODO over guessing.

Minimal diffs. Only touch files relevant to the task. Do not rename/move structures unless the task explicitly asks.

Guaranteed build. Your output must pass:
pnpm lint && pnpm typecheck && pnpm build (no errors).

UI-only unless stated. If the task says “frontend,” don’t add server code, DB, or external services.

Idempotent edits. Adding tokens/utilities/components must not break existing pages; re-adding should not duplicate code.

Telemetry, secrets, auth: never introduce real keys or send data. Use placeholders and .env.example.

Mark assumptions. Use // TODO(AGENT): ... for any ambiguity you had to resolve.

Accessibility first. All interactive elements must be keyboard accessible and have proper labels/roles.

Performance budget respected. Don’t regress Core Web Vitals; prefer Server Components, avoid heavy client code.

1. Tech Stack & Versions

Next.js 14+ (App Router), TypeScript (strict), /src dir.

Tailwind CSS + shadcn/ui (Modern theme) for components.

lucide-react for icons.

@tanstack/react-table (tables), zod + react-hook-form (forms).

Zustand for simple global UI state (only where needed).

Recharts for charts.

Testing (when added): Vitest + React Testing Library; e2e: Playwright.

2. Scope Guards (do NOT implement unless approved)

❌ B2C storefront, logistics/insurance booking, inventory/ERP/CRM.

❌ Offline bidding, multilingual UI, multi-currency, SEO tools.

❌ Data migration helpers, native mobile apps, dynamic FX.
If such requirements appear, stop and add // TODO(AGENT): Requires scope change.

3. Repository Structure (authoritative)

/src
├─ app/ (App Router pages/layouts)
│ ├─ (admin)/admin/ ← All admin routes live here
│ │ ├─ layout.tsx (App shell: Sidebar + Topbar)
│ │ ├─ page.tsx (Dashboard)
│ │ ├─ kyc/, users/, listings/, requirements/, auctions/, chat/, disputes/, commission-rules/, invoices/, reconciliation/, masters/, authorization-map/, cms/, news/, reports/, audit/, settings/**
│ └─ globals.css, not-found.tsx
├─ components/
│ ├─ layout/** (app shell parts: sidebar, topbar, theme toggle)
│ ├─ tables/** (generic DataTable + page columns)
│ ├─ kpi/** (KpiCard, KpiRow)
│ ├─ charts/** (recharts wrappers)
│ ├─ ui/** (generated shadcn primitives only)
│ └─ section-heading.tsx
├─ lib/
│ ├─ utils.ts (cn, helpers)
│ ├─ rbac.ts (role constants/matrix)
│ ├─ page-kpis.ts (KPI mappers)
│ ├─ schemas/ (zod schemas)
│ ├─ types/ (shared TS types)
│ └─ mock/ (stable mock data for UI dev)
├─ hooks/ (use-sidebar, use-debounce, etc.)
└─ styles/ (optional module css if ever required)

Rules

Do not place business logic in components. Keep calculations in lib/\*.

Only components/ui/\* contains generated shadcn code. Don’t modify generated tokens directly; extend via utilities.

4. Coding Standards
   TypeScript & React

"strict": true in tsconfig. No any unless explicitly justified with a TODO.

Components default to Server Components. Use "use client" only when you need hooks, events, or browser APIs.

Naming:

Components: PascalCase.tsx (export default component).

Hooks: useX.ts.

Lib/utils: camelCase.ts.

Routes/folders: kebab-case.

Props: prefer explicit interfaces; document optional props; sensible defaults.

Children: if a component renders children, type it explicitly.

Tailwind & Styling

Only Tailwind classes + shadcn variants. No inline style for layout/brand.

Use tokens/utilities (e.g., .nums, .bg-brand-gradient) instead of ad-hoc colors.

Respect spacing rhythm: gap-5, card p-5, rounded-2xl.

Forms & Validation

react-hook-form + zodResolver.

All inputs labeled; show inline errors; disable buttons during submit.

Tables

Use the shared DataTable wrapper (sorting, filtering, visibility, pagination).

Header: text-[12.5px] uppercase tracking-wide text-muted-foreground.

Numeric cells use .nums (tabular numerals).

Accessibility

All interactive elements are reachable by keyboard; focus rings visible.

Provide aria-label/aria-describedby where icons/ghost buttons appear.

Use semantic HTML; headings in order; no skipped levels.

5. State Management

Prefer local component state.

Use Zustand only for truly global UI state (sidebar collapse, theme, transient filters).

When backend is added, use TanStack Query/SWR for server state (fetch, cache, revalidate). Do not store server state in Zustand.

6. Data Contracts & Schemas

All external data (when APIs exist) must have a zod schema in lib/schemas/_ and a TypeScript type in lib/types/_.

Parse responses through zod before use: fail fast with typed errors.

For now, mock data lives in lib/mock/\* and mirrors intended schemas.

7. Theming & Branding

Keep blue as primary; support a subtle blue↔red gradient for CTAs, pins, and active slivers (utilities already defined).

next-themes with defaultTheme="light", dark optional.

Do not hardcode random colors; extend via CSS variables/utilities in globals.css.

8. Performance & Security

Prefer Server Components; minimize "use client".

Never import large libs on initial route without dynamic()/ssr:false if non-critical.

Images via next/image; set explicit width/height.

Avoid dangerouslySetInnerHTML. If unavoidable, sanitize input.

No secrets in repo. Environment variables must be referenced via process.env.X and typed (see §10).

Budgets (non-blocking but monitored)

LCP < 2.5s on 3G Fast, TTI < 3.0s.

Bundle increase per PR < 50KB gzip unless justified.

9. UX Patterns (Admin)

Pages begin with Title + subtitle then a KPI row (if applicable), then primary table/content.

Buttons:

Primary CTA: variant="brand" (gradient) sparingly.

Approve/positive: default/emerald tone.

Reject/Block/Send Back: variant="seller" (red tint).

Chips:

Role → Badge variants: buyer, seller, both.

KYC → verified/secondary(pending)/destructive(rejected).

10. Environments & Secrets

.env.example must include all required vars with dummy values.

Prefix public vars with NEXT*PUBLIC*.

Do not connect to real services from dev by default.

11. Git, Commits, and Reviews

Branch: feat/<slug>, fix/<slug>, chore/<slug>.

Conventional Commits (feat:, fix:, refactor:, style:, docs:…).

Every PR includes:

What changed & why (1–3 bullets).

Screenshots/GIF for UI changes (light & dark).

Check results pasted: pnpm lint, pnpm typecheck, pnpm build.

Reviewer checklist

No scope creep (see §2).

No unused deps, no console logs in production code.

No TS any without TODO justification.

Accessibility and keyboard navigation verified.

12. Testing (when enabled)

Unit: Vitest + Testing Library for components, hooks, and lib functions.

E2E: Playwright smoke on critical flows (login gate, table sorting, actions).

Test IDs: use data-testid only when necessary.

13. Error Handling & Logging

UI errors notify via ShadCN toast with clear action (Retry, View).

Centralize fetch errors (when APIs exist) in lib/http.ts with standardized shapes.

No alert() in production code.

14. Adding a New Page (Playbook)

Create route under /src/app/(admin)/admin/<slug>/page.tsx.

Add Title + subtitle, optional KPI row using KpiRow/KpiCard.

If tabular, use the shared DataTable + dedicated columns/<slug>-columns.tsx.

Keep business logic in lib/\*.

Verify build + lint + typecheck.

15. Commands (must pass)
    pnpm lint # ESLint + formatting rules
    pnpm typecheck # tsc --noEmit
    pnpm build # Next.js production build
    pnpm dev # local dev

16. File/Code Style (quick sheet)

Max component file size guideline: ~200–250 LOC. Split when larger.

Prefer composition over prop booleans explosion.

Avoid deep prop drilling (>2 levels) — create context or hook.

No export \* from barrels unless module is stable and small.

Keep imports ordered: react, next, third-party, absolute @/\*, relative.

17. Known Out-of-Scope / Do Not Scaffold

Language switchers, currency switchers, pricing conversions.

Public website pages inside admin.

Payments collection UI beyond admin invoices/reconciliation scaffolds.

Any non-admin consumer workflows.

18. Definition of Done (per task)

Aligned with Scope Guards.

Code follows Coding Standards and Structure.

Passes lint + typecheck + build.

Light & dark mode screenshots attached.

Accessibility checked (keyboard & labels).

Added/updated mocks & zod schemas if data shape changed.

Added // TODO(AGENT) for any unresolved assumption.

By contributing you agree to follow this RULE.md. If a requirement conflicts with these rules, escalate by adding a concise note to the PR and a // TODO(AGENT): scope change marker in code.
