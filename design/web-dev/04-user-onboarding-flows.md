# User Onboarding Flows & Patterns

> The most important UX work in any SaaS product. Users who don't reach the aha moment within their first session churn at 80%+. This file covers every pattern for getting users to value fast.

---

## Table of Contents

1. [Onboarding Strategy](#1-onboarding-strategy)
2. [Signup Flow Design](#2-signup-flow-design)
3. [First-Run Experience](#3-first-run-experience)
4. [Progressive Onboarding Patterns](#4-progressive-onboarding-patterns)
5. [Empty State Design](#5-empty-state-design)
6. [Product Tours & Tooltips](#6-product-tours--tooltips)
7. [Onboarding Checklists (In-App)](#7-onboarding-checklists-in-app)
8. [Implementation Patterns](#8-implementation-patterns)
9. [Onboarding Metrics](#9-onboarding-metrics)
10. [Onboarding Checklist](#10-onboarding-checklist)

---

## 1. Onboarding Strategy

### The Aha Moment

Define your aha moment before designing any onboarding screen.

```
AHA MOMENT = the first time a user genuinely experiences your product's core value.

Framework to find it:
  Step 1: List all events you track in your analytics
  Step 2: Compare 90-day retained users vs. churned users
  Step 3: Find the event that has the strongest correlation with retention
  Step 4: Find the median TIME to that event for retained users
  Step 5: That event + that timeframe = your activation target

Common aha moments:
  Slack:      "Sent first message in a channel with >2 people"
  Dropbox:    "Synced first file across two devices"
  Notion:     "Created first page with content"
  Figma:      "Collaborated on a file with another user"
  HubSpot:    "Sent first email to a contact"

Your aha moment: ____________________
Time-to-aha target: __________________
```

### Three Types of Onboarding

```
1. TASK-BASED ONBOARDING
   User must complete specific steps before reaching the product.
   Good for: products where setup is required before any value
   Risk: high drop-off if steps are too many or confusing
   Example: Stripe (create account → add business details → set up payment)

2. EXPLORATION-BASED ONBOARDING
   Product is accessible immediately; user explores freely.
   Good for: simple tools with obvious UI
   Risk: users don't discover key features, churn early
   Example: Simple note-taking apps

3. CONTEXTUAL ONBOARDING (recommended for most SaaS)
   Product is accessible immediately; guidance is surfaced contextually.
   Tips appear when relevant; not in sequence.
   Good for: complex products where users have different goals
   Example: Linear, Notion — show tooltips when you hover specific areas
```

---

## 2. Signup Flow Design

### Friction Audit

```
Every field in signup costs you ~5–10% of signups.
Audit: why do you need each field at this moment?

Required at signup:
  ✓ Email (must have for product delivery)
  ✓ Password (or OAuth — eliminate this with SSO)

NOT required at signup (collect later):
  ✗ Full name (can ask in onboarding)
  ✗ Phone number (ask when needed)
  ✗ Company name (can infer from email domain)
  ✗ Use case (ask in first-run experience)
  ✗ Team size (ask after activation)
  ✗ Credit card (unless no free tier)
```

### Signup Page Implementation

```tsx
// Minimal signup — email + password or OAuth
function SignupPage() {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
  })

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground mt-2">
            Start your 14-day free trial. No credit card required.
          </p>
        </div>

        {/* OAuth first — lowest friction */}
        <div className="space-y-3">
          <OAuthButton provider="google" />
          <OAuthButton provider="github" />
        </div>

        <Separator label="or continue with email" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField
            label="Work email"
            error={errors.email?.message}
          >
            <Input
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="you@company.com"
              {...register('email')}
            />
          </FormField>

          <FormField
            label="Password"
            error={errors.password?.message}
            hint="At least 8 characters"
          >
            <PasswordInput
              autoComplete="new-password"
              {...register('password')}
            />
          </FormField>

          <Button type="submit" className="w-full" loading={isSubmitting}>
            Create account
          </Button>
        </form>

        {/* Social proof reduces anxiety at decision point */}
        <p className="text-center text-sm text-muted-foreground">
          Joined by 5,000+ teams. Cancel anytime.
        </p>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
```

### Email Verification UX

```
Best practice:
  1. After signup, send verification email immediately
  2. Show a clear "Check your email" screen — don't leave users on the signup page
  3. Allow resend (with 60-second cooldown)
  4. For low-security products: let users into the product before verifying
     (verify in background; show a banner instead of blocking)

"Check your email" screen:
  - Show the email address they used (so they check the right inbox)
  - "Open Gmail" / "Open Outlook" shortcut buttons
  - "Didn't get it? Check spam or resend" option
  - Don't force them to remember to come back — send a compelling email

// Show "check email" state, not a blank success
function VerifyEmailPrompt({ email }: { email: string }) {
  return (
    <div className="text-center space-y-4">
      <MailIcon className="h-12 w-12 mx-auto text-primary" />
      <h2 className="text-xl font-semibold">Check your inbox</h2>
      <p className="text-muted-foreground">
        We sent a verification link to <strong>{email}</strong>
      </p>
      <Button variant="outline" asChild>
        <a href="https://mail.google.com" target="_blank">Open Gmail</a>
      </Button>
      <ResendButton email={email} cooldownSeconds={60} />
    </div>
  )
}
```

---

## 3. First-Run Experience

### The Setup Wizard Pattern

When your product requires initial configuration, use a focused setup wizard — not the full product with banners pointing everywhere.

```tsx
// Wizard step tracker
interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: 'profile', title: 'Set up your profile', description: 'Add your name and photo', completed: false },
  { id: 'workspace', title: 'Name your workspace', description: 'This is what your team will see', completed: false },
  { id: 'invite', title: 'Invite your first teammate', description: 'Collaboration starts here', completed: false },
]

// Wizard shell — strip away all navigation; one job per screen
function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = useOnboardingSteps()  // from DB or local state

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress — show where they are, not how much is left */}
        <OnboardingProgress current={currentStep} total={steps.length} />

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <StepContent
              step={steps[currentStep]}
              onComplete={() => setCurrentStep(s => s + 1)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Always allow skipping — forced onboarding increases churn */}
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-muted-foreground hover:text-foreground mt-4 block mx-auto"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}
```

### Personalisation Question

Asking "What are you here to do?" lets you tailor the experience. Keep it to 1 question with 3–5 options.

```tsx
function PersonalisationStep({ onComplete }: { onComplete: (goal: UserGoal) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">What brings you to Acme?</h2>
        <p className="text-muted-foreground mt-1">We'll customise your experience.</p>
      </div>

      <div className="grid gap-3">
        {USER_GOALS.map(goal => (
          <button
            key={goal.id}
            onClick={() => onComplete(goal)}
            className="flex items-start gap-3 rounded-lg border p-4 text-left
                       hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <goal.Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="font-medium">{goal.title}</div>
              <div className="text-sm text-muted-foreground">{goal.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
```

---

## 4. Progressive Onboarding Patterns

### Just-in-Time Onboarding

Instead of front-loading all instructions, surface guidance when the user reaches the relevant moment.

```tsx
// Show tooltip only when user hovers over a feature they haven't used yet
function FeatureButton({ feature, children }: FeatureButtonProps) {
  const { isNewFeature, markAsSeen } = useFeatureDiscovery(feature)

  return (
    <Tooltip
      open={isNewFeature}  // controlled: only show if user hasn't seen it
      onOpenChange={(open) => !open && markAsSeen()}
    >
      <TooltipTrigger asChild>
        <Button variant="ghost">{children}</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <p className="font-medium">{feature.tipTitle}</p>
        <p className="text-sm text-muted-foreground">{feature.tipBody}</p>
        <Button size="sm" className="mt-2" onClick={markAsSeen}>Got it</Button>
      </TooltipContent>
    </Tooltip>
  )
}
```

### Activation Nudges

```tsx
// Show contextual nudge when user hasn't completed a key activation step
function DashboardPage() {
  const { user } = useUser()

  return (
    <div>
      {/* Nudge bar — appears only if relevant */}
      {!user.hasInvitedTeammate && (
        <InviteNudge
          message="Collaboration is 3x more powerful with a teammate."
          cta="Invite someone"
          onDismiss={() => user.dismissNudge('invite')}
        />
      )}

      {!user.hasConnectedIntegration && (
        <IntegrationNudge
          message="Connect your tools to unlock automations."
          cta="Connect an integration"
        />
      )}

      <MainContent />
    </div>
  )
}
```

---

## 5. Empty State Design

Empty states are onboarding opportunities, not voids. Every empty state should explain what goes here and give users a clear next step.

```tsx
// ✗ Unhelpful empty state
function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return <p>No projects</p>
  // ...
}

// ✓ Empty state that teaches and activates
function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <FolderIcon className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold">No projects yet</h3>
      <p className="text-muted-foreground mt-2 max-w-sm">
        Projects help you organise your work. Create your first one to get started.
      </p>

      {/* Primary action */}
      <Button className="mt-6" onClick={onCreateProject}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Create your first project
      </Button>

      {/* Secondary: learn more */}
      <Button variant="ghost" size="sm" className="mt-2" asChild>
        <Link href="/docs/projects">See how projects work →</Link>
      </Button>

      {/* Social proof reduces doubt */}
      <p className="text-xs text-muted-foreground mt-6">
        "We shipped our first feature in week 1 using Projects." — Sarah, CTO at Acme
      </p>
    </div>
  )
}
```

### Empty State Variants by Context

```tsx
// First-time use (never had data) — teach and activate
// After filtering (data exists, but nothing matches) — help them adjust
// After deleting (user just cleared the state) — acknowledge and offer next step
// Loading failed (error, not empty) — see [[09-error-handling-empty-states]]

function SearchResults({ query, results }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">
          No results for <strong>"{query}"</strong>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Try different keywords or{' '}
          <button className="text-primary underline" onClick={onClearSearch}>
            clear the search
          </button>
        </p>
      </div>
    )
  }
}
```

---

## 6. Product Tours & Tooltips

### When to Use vs. When to Avoid

```
USE product tours for:
  - New major features affecting existing users
  - Complex setup that can't be simplified
  - Features that require knowing about a less-visible area

AVOID product tours when:
  - The UI should be self-explanatory (a tour is a sign the design failed)
  - Forced on every new signup (most users skip them; they add friction)
  - Blocked by the tour (tour should be dismissible at any point)

The best product tours:
  1. Are contextual (triggered by action, not page load)
  2. Are skippable at every step
  3. Have ≤5 steps (3 is ideal)
  4. End with a clear action ("Let me try it" not "Finish tour")
```

```tsx
// Lightweight contextual tooltip tour using Floating UI
import { FloatingPortal, useFloating, offset, flip, shift } from '@floating-ui/react'

function GuidedTooltip({
  step,
  target,
  children,
  onNext,
  onSkip,
}: GuidedTooltipProps) {
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    middleware: [offset(12), flip(), shift({ padding: 8 })],
  })

  return (
    <>
      <div ref={refs.setReference}>{target}</div>
      <FloatingPortal>
        <div ref={refs.setFloating} style={floatingStyles} className="z-50 max-w-xs rounded-lg bg-foreground text-background p-4 shadow-xl">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs opacity-60">{step.current} of {step.total}</span>
            <button onClick={onSkip} className="opacity-60 hover:opacity-100">
              <XIcon className="h-4 w-4" />
            </button>
          </div>
          <p className="font-medium">{step.title}</p>
          <p className="text-sm opacity-80 mt-1">{step.body}</p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={onNext}>
              {step.isLast ? 'Done' : 'Next →'}
            </Button>
            {!step.isLast && (
              <Button size="sm" variant="ghost" onClick={onSkip}>Skip</Button>
            )}
          </div>
        </div>
      </FloatingPortal>
    </>
  )
}
```

---

## 7. Onboarding Checklists (In-App)

The in-app checklist is one of the highest-ROI activation tools. It shows users what to do and creates a sense of progress.

```tsx
// hooks/useOnboardingChecklist.ts
const CHECKLIST_ITEMS = [
  { id: 'profile', label: 'Complete your profile', href: '/settings/profile', points: 10 },
  { id: 'first_project', label: 'Create your first project', href: null, points: 20 },
  { id: 'invite', label: 'Invite a teammate', href: '/settings/team', points: 15 },
  { id: 'integration', label: 'Connect an integration', href: '/integrations', points: 15 },
  { id: 'first_task', label: 'Create your first task', href: null, points: 10 },
]

// UI — sticky panel or collapsible card in sidebar
function OnboardingChecklist() {
  const { items, completedCount, totalCount } = useOnboardingChecklist()
  const [isOpen, setIsOpen] = useState(completedCount < totalCount)
  const progress = (completedCount / totalCount) * 100

  // Hide checklist once 100% complete (after a brief celebration)
  if (completedCount === totalCount) return <CompletionCelebration />

  return (
    <div className="rounded-lg border bg-card p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between"
      >
        <div>
          <p className="font-medium text-sm">Getting started</p>
          <p className="text-xs text-muted-foreground">
            {completedCount} of {totalCount} complete
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Progress value={progress} className="w-16 h-2" />
          <ChevronIcon className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
        </div>
      </button>

      {isOpen && (
        <ul className="mt-4 space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex items-center gap-3">
              <div className={cn(
                'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0',
                item.completed ? 'border-primary bg-primary' : 'border-muted-foreground'
              )}>
                {item.completed && <CheckIcon className="h-3 w-3 text-primary-foreground" />}
              </div>
              <span className={cn('text-sm', item.completed && 'line-through text-muted-foreground')}>
                {item.href && !item.completed
                  ? <Link href={item.href} className="hover:underline">{item.label}</Link>
                  : item.label
                }
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## 8. Implementation Patterns

### Tracking Onboarding State

```typescript
// Store onboarding progress in the database, not localStorage
// Users may switch devices; localStorage is per-device

// schema.prisma
model OnboardingProgress {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  steps     Json     @default("{}")  // { profile: true, firstProject: false, ... }
  completedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// server/onboarding.ts
export async function completeOnboardingStep(userId: string, step: OnboardingStep) {
  await db.onboardingProgress.upsert({
    where: { userId },
    update: {
      steps: { [step]: true },
      completedAt: allStepsComplete ? new Date() : undefined,
    },
    create: {
      userId,
      steps: { [step]: true },
    },
  })
}
```

---

## 9. Onboarding Metrics

Track these to diagnose where users are dropping off.

```
Funnel to instrument:
  Signup → Email verified → Onboarding started → Step 1 complete → ... → Aha moment → Activated

Key metrics:
  Signup → activation rate:     % who complete the aha moment (target: >40%)
  Time to aha moment:           median hours from signup → aha event (target: <24h)
  Onboarding completion rate:   % who finish all checklist items
  Step-by-step drop-off:        which step loses the most users?
  Day-1 return rate:            do they come back the next day? (target: >50%)
  Day-7 retention:              still active after a week? (target: >30%)

How to instrument:
  Track every step as a product analytics event (PostHog, Mixpanel)
  Build a funnel report from signup → aha moment
  Check conversion rates weekly; A/B test the worst-performing step first
```

See [[10-retention-engagement]] for lifecycle email sequences that support onboarding.

---

## 10. Onboarding Checklist

### New Onboarding Flow Review

- [ ] Aha moment is defined and tracked as an analytics event
- [ ] Signup form: email + password only (or SSO); no unnecessary fields
- [ ] OAuth options (Google, GitHub) available above the form
- [ ] Email verification: clear "check your email" screen with resend option
- [ ] First-run experience: does not show a blank, empty product
- [ ] Sample data or templates available for fresh accounts
- [ ] Onboarding checklist: 4–6 items driving to the aha moment
- [ ] Every empty state has a clear CTA to create the first item
- [ ] Product tour: skippable at any point; ≤5 steps
- [ ] Personalisation question: one question, 3–5 options, tailors experience
- [ ] Mobile: onboarding flow tested and works at 375px
- [ ] Accessibility: signup form fully keyboard-navigable; errors announced
- [ ] Analytics: every onboarding step instrumented in product analytics

---

*Related notes: [[01-nextjs-react-best-practices]] | [[05-forms-validation-ux]] | [[06-loading-states-feedback]] | [[09-error-handling-empty-states]] | [[12-auth-security-ux]] | [[10-retention-engagement]] | [[06-growth-hacking]] | [[qa-ui-ux-guide]]*

*Last updated: 2026-04-15*
