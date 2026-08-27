# Next.js & React Best Practices

> Patterns and conventions for building maintainable, performant, user-centred React/Next.js applications. Every architectural decision is evaluated against its impact on the end user.

---

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [Component Design Principles](#2-component-design-principles)
3. [Next.js App Router Patterns](#3-nextjs-app-router-patterns)
4. [Data Fetching Strategy](#4-data-fetching-strategy)
5. [Server vs. Client Components](#5-server-vs-client-components)
6. [Rendering Strategies & UX Impact](#6-rendering-strategies--ux-impact)
7. [Type Safety Throughout](#7-type-safety-throughout)
8. [Code Quality Standards](#8-code-quality-standards)

---

## 1. Project Architecture

### Folder Structure (App Router)

```
src/
  app/                        # Next.js App Router
    (auth)/                   # Route group — auth pages (login, signup, reset)
    (dashboard)/              # Route group — authenticated app
      layout.tsx              # Persistent sidebar + nav
      dashboard/page.tsx
      settings/page.tsx
    api/                      # Route handlers
      webhooks/route.ts
    layout.tsx                # Root layout (fonts, providers, metadata)
    page.tsx                  # Marketing homepage
    error.tsx                 # Root error boundary
    not-found.tsx             # 404 page
    global.css

  components/
    ui/                       # Primitive, dumb UI components (Button, Input, Modal)
    features/                 # Feature-specific components (UserCard, BillingPanel)
    layout/                   # Structural components (Sidebar, Header, PageShell)

  hooks/                      # Custom React hooks
  lib/                        # Pure utility functions, constants, config
  server/                     # Server-only code (db queries, auth helpers)
  types/                      # TypeScript interfaces and types
  styles/                     # Global styles, design tokens
```

### Component Category Rules

```
UI components (components/ui/):
  - Zero business logic
  - Fully controlled (all state via props)
  - Accept className for composition
  - Documented with prop types
  - Examples: Button, Input, Badge, Card, Modal, Tooltip

Feature components (components/features/):
  - Business logic allowed
  - May call hooks that fetch data
  - Composed from UI components
  - Not reused outside their feature
  - Examples: UserProfileCard, PlanUpgradePanel

Layout components (components/layout/):
  - Structure only — no business logic
  - Define page shells and navigation
  - Examples: Sidebar, TopNav, PageHeader, TwoColumnLayout
```

---

## 2. Component Design Principles

### The Single Responsibility Principle

Each component should do one thing well. If you can't describe it in one sentence without "and", split it.

```tsx
// ✗ Does too much — renders list AND handles pagination AND fetches data
function UserList() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => { fetch(`/api/users?page=${page}`).then(...) }, [page])
  return (
    <div>
      {users.map(u => <div key={u.id}>{u.name}</div>)}
      <button onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  )
}

// ✓ Each component has one job
function UserListPage() {
  return <UserList />            // orchestrates
}
function UserList() {
  const { data } = useUsers()    // data concern separate
  return data?.users.map(u => <UserCard key={u.id} user={u} />)
}
function UserCard({ user }: { user: User }) {
  return <Card>{user.name}</Card> // presentation only
}
```

### Composition Over Configuration

```tsx
// ✗ Prop explosion — every variant needs a new prop
<Button
  variant="primary"
  size="lg"
  loading={isLoading}
  icon={<PlusIcon />}
  iconPosition="left"
  fullWidth
  onClick={handleClick}
/>

// ✓ Composable — open for extension, closed for modification
<Button size="lg" onClick={handleClick}>
  <PlusIcon className="mr-2 h-4 w-4" />
  {isLoading ? 'Creating...' : 'Create project'}
</Button>

// ✓ Slot pattern for complex layouts
<Card>
  <Card.Header>
    <Card.Title>Usage this month</Card.Title>
    <Card.Action><Button variant="ghost">View all</Button></Card.Action>
  </Card.Header>
  <Card.Body>
    <UsageChart data={usageData} />
  </Card.Body>
</Card>
```

### Props Interface Design

```tsx
// Always define explicit interfaces — never use `any`
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
  // Always spread HTML attributes for accessibility
  'aria-label'?: string
}

// Forward ref for components that wrap native elements
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <Spinner className="mr-2" aria-hidden />}
      {children}
    </button>
  )
)
Button.displayName = 'Button'
```

### Custom Hook Pattern

Extract all non-trivial logic into hooks. Components should contain only rendering logic.

```tsx
// hooks/useProjectForm.ts
export function useProjectForm(projectId?: string) {
  const router = useRouter()
  const { data: project } = useProject(projectId)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ?? { name: '', description: '' },
  })

  const mutation = useMutation({
    mutationFn: (values: ProjectFormValues) =>
      projectId ? updateProject(projectId, values) : createProject(values),
    onSuccess: (data) => {
      toast.success(`Project ${projectId ? 'updated' : 'created'}`)
      router.push(`/projects/${data.id}`)
    },
    onError: (error) => {
      toast.error(error.message ?? 'Something went wrong')
    },
  })

  return { form, isLoading: mutation.isPending, onSubmit: form.handleSubmit(mutation.mutate) }
}

// component stays clean
function ProjectForm({ projectId }: { projectId?: string }) {
  const { form, isLoading, onSubmit } = useProjectForm(projectId)
  return <Form {...form}><form onSubmit={onSubmit}>...</form></Form>
}
```

---

## 3. Next.js App Router Patterns

### Layout Hierarchy

```tsx
// app/layout.tsx — Root: fonts, global providers, metadata
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>         {/* ThemeProvider, QueryClientProvider, etc */}
          {children}
        </Providers>
      </body>
    </html>
  )
}

// app/(dashboard)/layout.tsx — Dashboard shell with sidebar
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <TopNav />
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
```

### Parallel Routes for Complex UIs

```tsx
// app/(dashboard)/@modal/default.tsx
export default function Default() { return null }  // no modal by default

// app/(dashboard)/@modal/(.)projects/[id]/page.tsx
// Intercepts /projects/:id and shows as modal when navigating from dashboard
export default function ProjectModal({ params }: { params: { id: string } }) {
  return <Modal><ProjectDetail id={params.id} /></Modal>
}

// app/(dashboard)/layout.tsx
export default function Layout({ children, modal }: {
  children: React.ReactNode
  modal: React.ReactNode  // receives the @modal slot
}) {
  return <>{children}{modal}</>
}
```

### Loading and Error Boundaries (Per Route)

```
Every page directory should have:
  page.tsx       — the page content
  loading.tsx    — shown while the page streams in (Suspense boundary)
  error.tsx      — error boundary for this route
  not-found.tsx  — 404 for this section (optional)
```

```tsx
// app/(dashboard)/projects/loading.tsx
// This shows instantly while the page data loads — NEVER leave this absent
export default function ProjectsLoading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      {Array.from({ length: 5 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}
```

---

## 4. Data Fetching Strategy

### Server Components: Default Choice for Static Data

```tsx
// app/(dashboard)/projects/page.tsx
// No useEffect, no useState, no loading spinner — data arrives with HTML
async function ProjectsPage() {
  // This runs on the server — direct DB access is fine
  const projects = await db.project.findMany({
    where: { userId: await getCurrentUserId() },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <div>
      <PageHeader title="Projects" action={<NewProjectButton />} />
      {projects.length === 0
        ? <EmptyProjects />
        : <ProjectGrid projects={projects} />
      }
    </div>
  )
}
```

### React Query: Client-Side Dynamic Data

```tsx
// lib/queries/projects.ts — centralise all query definitions
export const projectKeys = {
  all: ['projects'] as const,
  list: (filters: ProjectFilters) => [...projectKeys.all, 'list', filters] as const,
  detail: (id: string) => [...projectKeys.all, 'detail', id] as const,
}

export function useProjects(filters: ProjectFilters) {
  return useQuery({
    queryKey: projectKeys.list(filters),
    queryFn: () => fetchProjects(filters),
    staleTime: 30_000,           // don't refetch for 30s
    placeholderData: keepPreviousData,  // no flash when filters change
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createProject,
    onMutate: async (newProject) => {
      // Optimistic update — see [[06-loading-states-feedback]]
      await queryClient.cancelQueries({ queryKey: projectKeys.all })
      const prev = queryClient.getQueryData(projectKeys.list({}))
      queryClient.setQueryData(projectKeys.list({}), (old: Project[]) => [
        { ...newProject, id: 'temp-id', createdAt: new Date() },
        ...old,
      ])
      return { prev }
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(projectKeys.list({}), context?.prev)
      toast.error('Failed to create project')
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: projectKeys.all }),
  })
}
```

---

## 5. Server vs. Client Components

### Decision Tree

```
Is this component interactive (onClick, onChange, form submit)?
  YES → Client Component ('use client')

Does it use React hooks (useState, useEffect, useRef)?
  YES → Client Component

Does it use browser APIs (window, localStorage, IntersectionObserver)?
  YES → Client Component

Does it need real-time data updates?
  YES → Client Component

Everything else?
  → Server Component (default — no 'use client' needed)

Goal: Push 'use client' as far down the tree as possible.
A Server Component tree renders faster, sends less JS, and improves FCP/LCP.
```

### The Pattern: Server Shell, Client Islands

```tsx
// Server Component (no 'use client') — fetches data, renders shell
async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id)  // direct DB call
  if (!project) notFound()

  return (
    <div>
      <ProjectHeader project={project} />   {/* server: just renders HTML */}
      <ProjectTabs
        projectId={project.id}
        initialData={project}              {/* pass data to client island */}
      />
      <ActivityFeed projectId={project.id} />  {/* server: initial list */}
    </div>
  )
}

// 'use client' only where interactivity is needed
'use client'
function ProjectTabs({ projectId, initialData }: Props) {
  const [activeTab, setActiveTab] = useState('overview')
  // only this subtree is a client component
}
```

---

## 6. Rendering Strategies & UX Impact

### Choosing the Right Strategy

```
STATIC GENERATION (SSG) — generateStaticParams
  When: Marketing pages, blog, docs, pricing
  UX impact: Fastest possible load (cached at edge); perfect LCP scores
  Code: No async in page, or generateStaticParams + async page

SERVER-SIDE RENDERING (SSR) — every request
  When: Personalised pages, real-time data, authenticated pages
  UX impact: Always fresh; slightly slower TTFB than static
  Code: async page component with dynamic = 'force-dynamic'

INCREMENTAL STATIC REGENERATION (ISR)
  When: Semi-dynamic data (pricing, product catalogue, public profiles)
  UX impact: Fast (cached) + fresh (background revalidation)
  Code: export const revalidate = 60  // revalidate every 60 seconds

STREAMING SSR + SUSPENSE
  When: Pages with mixed fast/slow data
  UX impact: Show the fast parts instantly; stream in slow parts progressively
  Code: Wrap slow components in <Suspense fallback={<Skeleton />}>
```

### Streaming Pattern — Never Block the User

```tsx
// app/(dashboard)/page.tsx
export default async function DashboardPage() {
  // Fast data: render immediately
  const user = await getCurrentUser()

  return (
    <PageShell>
      <WelcomeHeader user={user} />   {/* renders immediately */}

      {/* Slow: usage data — streams in with skeleton while loading */}
      <Suspense fallback={<UsageCardSkeleton />}>
        <UsageCard userId={user.id} />
      </Suspense>

      {/* Even slower: analytics — streams in independently */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <AnalyticsPanel userId={user.id} />
      </Suspense>
    </PageShell>
  )
}
```

---

## 7. Type Safety Throughout

### Zod for Runtime Validation + TypeScript Types

```typescript
// lib/validators/project.ts
import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500).optional(),
  status: z.enum(['active', 'archived', 'draft']).default('active'),
  dueDate: z.coerce.date().optional(),
})

// Derive TypeScript type from schema — single source of truth
export type ProjectFormValues = z.infer<typeof projectSchema>
export type Project = ProjectFormValues & { id: string; createdAt: Date; userId: string }

// Use in server actions for safe form handling
export async function createProjectAction(formData: FormData) {
  'use server'
  const raw = Object.fromEntries(formData)
  const result = projectSchema.safeParse(raw)
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors }
  }
  return db.project.create({ data: { ...result.data, userId: await getCurrentUserId() } })
}
```

---

## 8. Code Quality Standards

### ESLint + Prettier Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"  // accessibility linting — critical
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "jsx-a11y/anchor-is-valid": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

### Component Checklist (Before PR)

- [ ] TypeScript: no `any` types; all props explicitly typed
- [ ] Accessibility: interactive elements have labels; keyboard navigable
- [ ] Loading state: component handles `isLoading` gracefully
- [ ] Error state: component handles error without crashing
- [ ] Empty state: component handles empty data with guidance (not blank screen)
- [ ] Mobile: tested at 375px; no horizontal overflow
- [ ] Performance: no unnecessary `useEffect`; no prop drilling >3 levels

---

*Related notes: [[02-performance-core-web-vitals]] | [[03-accessibility-inclusive-design]] | [[06-loading-states-feedback]] | [[10-api-design-frontend]] | [[11-state-management]] | [[15-testing-user-critical]] | [[qa-ui-ux-guide]]*

*Last updated: 2026-04-15*
