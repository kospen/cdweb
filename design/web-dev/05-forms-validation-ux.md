# Forms & Validation UX

> Forms are where users give you their trust. Poor form UX is the #1 cause of signup and checkout abandonment. This file covers every pattern for making forms that feel helpful, not hostile.

---

## Table of Contents

1. [Form Design Principles](#1-form-design-principles)
2. [Input Types & Labels](#2-input-types--labels)
3. [Validation Strategy](#3-validation-strategy)
4. [Error Message Writing](#4-error-message-writing)
5. [React Hook Form + Zod Pattern](#5-react-hook-form--zod-pattern)
6. [Complex Form Patterns](#6-complex-form-patterns)
7. [Form Accessibility](#7-form-accessibility)
8. [Multi-Step Forms](#8-multi-step-forms)
9. [Form Performance](#9-form-performance)
10. [Forms Checklist](#10-forms-checklist)

---

## 1. Form Design Principles

```
1. ONE COLUMN LAYOUT
   Single-column forms are completed faster and with fewer errors.
   Side-by-side fields (first name | last name) slow users down.
   Exception: short, obviously related pairs (city | postcode).

2. LABEL ABOVE FIELD
   Labels placed above inputs are easier to scan and work better on mobile.
   Placeholder text is NOT a substitute for a label — it disappears on focus.

3. SHOW ALL FIELDS UPFRONT (for short forms)
   Don't hide fields behind progressive disclosure for simple forms.
   Users need to see the full scope to set expectations.
   Exception: multi-step forms for >7 questions.

4. MARK REQUIRED VS. OPTIONAL APPROPRIATELY
   If most fields are required: mark the optional ones with "(optional)"
   If most fields are optional: mark required ones with *
   Never leave ambiguity.

5. HELP TEXT UNDER THE FIELD, NOT ON HOVER
   Tooltips require interaction to discover. Put hints inline, always visible.
   Position: below the input, above the error message.

6. APPROPRIATE INPUT SIZE
   Input width should suggest the expected answer length.
   Phone number input should be shorter than "about yourself" text area.

7. KEYBOARD SUBMISSION
   Enter key in the last input field should submit the form.
   Every field should have appropriate inputMode and autocomplete attributes.
```

---

## 2. Input Types & Labels

### HTML Input Attributes that Reduce Friction

```tsx
// Always set these attributes — they trigger correct mobile keyboards and
// enable browser autofill (which users love)

// Email field
<input
  type="email"
  inputMode="email"          // triggers email keyboard on mobile
  autoComplete="email"       // enables browser autofill
  autoCapitalize="off"       // emails are lowercase
  autoCorrect="off"
  spellCheck="false"
/>

// Phone number
<input
  type="tel"
  inputMode="tel"            // triggers numeric pad on mobile
  autoComplete="tel"
/>

// Name fields
<input type="text" autoComplete="name" />         // full name
<input type="text" autoComplete="given-name" />   // first name
<input type="text" autoComplete="family-name" />  // last name

// Password
<input
  type="password"
  autoComplete="new-password"  // for signup (disables autofill of stored passwords)
  // OR
  autoComplete="current-password"  // for login (triggers password manager)
/>

// Card number (Stripe handles this, but if custom)
<input
  type="text"
  inputMode="numeric"
  autoComplete="cc-number"
  pattern="[0-9\s]{13,19}"
/>

// OTP / verification code
<input
  type="text"
  inputMode="numeric"
  autoComplete="one-time-code"  // triggers SMS autofill on mobile
  pattern="[0-9]{6}"
  maxLength={6}
/>
```

### The Label Component

```tsx
// components/ui/FormField.tsx — reusable wrapper handling label + hint + error
interface FormFieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactElement
}

function FormField({ label, error, hint, required = true, children }: FormFieldProps) {
  const id = useId()
  const inputId = `${id}-input`
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  // Clone child to inject accessibility attributes
  const input = React.cloneElement(children, {
    id: inputId,
    'aria-invalid': !!error,
    'aria-describedby': [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined,
  })

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="text-sm font-medium leading-none">
        {label}
        {!required && <span className="text-muted-foreground font-normal ml-1">(optional)</span>}
      </label>

      {input}

      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground">{hint}</p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive flex items-center gap-1">
          <AlertCircleIcon className="h-3 w-3 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}
```

---

## 3. Validation Strategy

### When to Validate

```
The three moments of validation — choose based on context:

1. ON SUBMIT (only)
   Best for: short forms (login, quick settings)
   UX: User fills form at their own pace; errors shown all at once on submit
   Risk: Frustrating for long forms with many errors

2. ON BLUR (when field loses focus)
   Best for: most forms — the sweet spot
   UX: Error appears after user finishes a field, not while typing
   Implementation: validate on blur; clear error as soon as field is valid again

3. ON CHANGE (as user types)
   Best for: password strength meters, real-time search, format hints
   UX: Instant feedback while typing
   Risk: Showing errors before user finishes typing is annoying
   Rule: Never show error messages while the user is still typing.
         Show success/format confirmation (✓ green) while typing. Show errors on blur.

// The hybrid approach (recommended):
// 1. Validate on blur: show error if invalid
// 2. Re-validate on change: clear error as soon as it becomes valid
// 3. Show all errors on submit
```

### Validation Timing Implementation

```tsx
// react-hook-form handles this correctly with mode: 'onTouched'
const { register, handleSubmit, formState } = useForm({
  mode: 'onTouched',       // validate on blur initially
  reValidateMode: 'onChange', // re-validate on change after first touch
})

// Or with Controller for custom inputs:
<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <FormField label="Email" error={fieldState.error?.message}>
      <Input
        {...field}
        type="email"
        // Error only shows after user has touched the field
        className={fieldState.invalid ? 'border-destructive' : ''}
      />
    </FormField>
  )}
/>
```

---

## 4. Error Message Writing

This is the most overlooked part of form design. Error messages should be a helpful assistant, not a system log.

```
THE FOUR RULES OF ERROR MESSAGES:

1. BE SPECIFIC: say exactly what is wrong
   ✗ "Invalid input"
   ✗ "Error"
   ✓ "Email address must include an @ symbol"
   ✓ "Password must be at least 8 characters"

2. BE HUMAN: avoid system language
   ✗ "Value does not match required format"
   ✗ "Field validation failed: REGEX_MISMATCH"
   ✓ "That doesn't look like an email address"
   ✓ "We couldn't find an account with that email"

3. TELL THEM HOW TO FIX IT: don't just say what's wrong
   ✗ "Invalid phone number"
   ✓ "Enter your phone number without spaces (e.g. 07700900000)"

4. DON'T BLAME THE USER
   ✗ "You entered an invalid password"
   ✓ "Incorrect password. Try again or reset your password."
   ✗ "You must fill in all required fields"
   ✓ "Please add your email address to continue"
```

### Error Message Library

```typescript
// lib/errorMessages.ts — centralise all user-facing error messages
export const errors = {
  required: (field: string) => `${field} is required`,
  email: {
    format: "That doesn't look like a valid email address",
    taken: "An account with this email already exists. Try signing in instead.",
    notFound: "We don't have an account with that email address",
  },
  password: {
    tooShort: 'Password must be at least 8 characters',
    tooWeak: 'Add a mix of letters, numbers, or symbols to make your password stronger',
    mismatch: 'Passwords don't match',
    incorrect: 'Incorrect password. Forgot it? You can reset it.',
  },
  card: {
    number: 'Check your card number — it should be 16 digits',
    expiry: 'This card appears to be expired',
    cvc: 'Enter the 3-digit code on the back of your card',
    declined: 'Your card was declined. Try a different card or contact your bank.',
  },
  name: {
    tooShort: 'Name must be at least 2 characters',
    tooLong: 'Name cannot be longer than 100 characters',
  },
  server: {
    generic: 'Something went wrong on our end. Please try again.',
    networkError: 'Check your internet connection and try again.',
    rateLimited: 'Too many attempts. Please wait a minute and try again.',
  },
}
```

---

## 5. React Hook Form + Zod Pattern

The recommended stack: React Hook Form for form state + Zod for schema validation.

```tsx
// 1. Define the schema with user-friendly error messages
import { z } from 'zod'

const signupSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email("That doesn't look like a valid email address"),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)/,
      'Include at least one letter and one number'
    ),

  confirmPassword: z.string(),

  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100),

  agreeToTerms: z
    .boolean()
    .refine(val => val === true, 'You must accept the terms to continue'),
})
.refine(
  data => data.password === data.confirmPassword,
  { message: "Passwords don't match", path: ['confirmPassword'] }
)

type SignupValues = z.infer<typeof signupSchema>

// 2. Wire up the form
function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
  })

  const password = watch('password')  // for real-time password strength

  async function onSubmit(values: SignupValues) {
    try {
      await createAccount(values)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* noValidate disables browser native validation; we handle it */}

      <FormField label="Full name" error={errors.name?.message}>
        <Input autoComplete="name" {...register('name')} />
      </FormField>

      <FormField label="Work email" error={errors.email?.message}>
        <Input type="email" autoComplete="email" {...register('email')} />
      </FormField>

      <FormField
        label="Password"
        error={errors.password?.message}
        hint="At least 8 characters with a letter and number"
      >
        <PasswordInput autoComplete="new-password" {...register('password')} />
        <PasswordStrengthMeter password={password} />
      </FormField>

      <FormField label="Confirm password" error={errors.confirmPassword?.message}>
        <PasswordInput autoComplete="new-password" {...register('confirmPassword')} />
      </FormField>

      <FormField error={errors.agreeToTerms?.message}>
        <div className="flex items-start gap-2">
          <Checkbox id="terms" {...register('agreeToTerms')} />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{' '}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </label>
        </div>
      </FormField>

      <Button type="submit" className="w-full" loading={isSubmitting}>
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
```

---

## 6. Complex Form Patterns

### Password Strength Meter

```tsx
function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = getPasswordStrength(password)  // 0–4

  if (!password) return null

  const levels = [
    { label: 'Too weak', color: 'bg-destructive' },
    { label: 'Weak', color: 'bg-orange-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-blue-500' },
    { label: 'Strong', color: 'bg-green-500' },
  ]

  const current = levels[strength]

  return (
    <div className="mt-2 space-y-1" aria-live="polite">
      <div className="flex gap-1">
        {levels.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i <= strength ? current.color : 'bg-muted'
            )}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Strength: <span className="font-medium">{current.label}</span>
      </p>
    </div>
  )
}
```

### Character Count

```tsx
function TextareaWithCount({
  maxLength,
  value,
  onChange,
  ...props
}: TextareaWithCountProps) {
  const remaining = maxLength - (value?.length ?? 0)
  const isNearLimit = remaining < maxLength * 0.1  // last 10%
  const isOverLimit = remaining < 0

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        aria-describedby="char-count"
        {...props}
      />
      <p
        id="char-count"
        className={cn(
          'absolute bottom-2 right-3 text-xs',
          isOverLimit ? 'text-destructive' : isNearLimit ? 'text-warning' : 'text-muted-foreground'
        )}
        aria-live="polite"
      >
        {remaining < 0 ? `${Math.abs(remaining)} over limit` : `${remaining} remaining`}
      </p>
    </div>
  )
}
```

---

## 7. Form Accessibility

```tsx
// The accessible form pattern — every element connected
<form aria-labelledby="form-title" noValidate>
  <h2 id="form-title">Create a project</h2>

  {/* Global form error (server error) */}
  {serverError && (
    <div role="alert" className="rounded-lg border border-destructive bg-destructive/10 p-3">
      <p className="text-sm text-destructive">{serverError}</p>
    </div>
  )}

  {/* Field with full accessibility chain */}
  <div>
    <label htmlFor="project-name">
      Project name
      <span aria-hidden> *</span>  {/* visual asterisk; aria-required below */}
    </label>
    <input
      id="project-name"
      type="text"
      required
      aria-required="true"
      aria-invalid={!!errors.name}
      aria-describedby={errors.name ? 'name-error' : 'name-hint'}
    />
    <p id="name-hint" className="text-xs text-muted-foreground">
      Choose a name your team will recognise
    </p>
    {errors.name && (
      <p id="name-error" role="alert" className="text-xs text-destructive">
        {errors.name.message}
      </p>
    )}
  </div>

  {/* Submit button communicates state */}
  <button
    type="submit"
    disabled={isSubmitting}
    aria-busy={isSubmitting}
    aria-disabled={isSubmitting}
  >
    {isSubmitting ? 'Creating project…' : 'Create project'}
  </button>
</form>
```

---

## 8. Multi-Step Forms

```tsx
// Multi-step form with URL-based state (shareable, browser-back works)
// app/onboarding/[step]/page.tsx

const STEPS = ['profile', 'workspace', 'team', 'integrations'] as const
type Step = typeof STEPS[number]

function MultiStepForm() {
  const params = useParams()
  const currentStep = params.step as Step
  const currentIndex = STEPS.indexOf(currentStep)
  const router = useRouter()

  const { data, update } = useOnboardingData()  // persists between steps

  function goToNext() {
    const next = STEPS[currentIndex + 1]
    if (next) router.push(`/onboarding/${next}`)
    else router.push('/dashboard')  // final step
  }

  function goToPrev() {
    const prev = STEPS[currentIndex - 1]
    if (prev) router.push(`/onboarding/${prev}`)
  }

  return (
    <div>
      {/* Progress indicator */}
      <nav aria-label="Onboarding steps">
        <ol className="flex gap-2">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span
                aria-current={step === currentStep ? 'step' : undefined}
                className={cn(
                  'h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium',
                  i < currentIndex && 'bg-primary text-primary-foreground',
                  i === currentIndex && 'border-2 border-primary text-primary',
                  i > currentIndex && 'bg-muted text-muted-foreground',
                )}
              >
                {i < currentIndex ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </span>
              {i < STEPS.length - 1 && (
                <div className={cn('h-px w-8', i < currentIndex ? 'bg-primary' : 'bg-muted')} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content rendered by route */}
      <div className="mt-8">
        {currentStep === 'profile' && <ProfileStep data={data} onSave={(d) => { update(d); goToNext() }} />}
        {currentStep === 'workspace' && <WorkspaceStep data={data} onSave={(d) => { update(d); goToNext() }} onBack={goToPrev} />}
      </div>
    </div>
  )
}
```

---

## 9. Form Performance

```tsx
// Avoid re-rendering the entire form on each keystroke
// react-hook-form already prevents this for registered inputs
// But for custom components, use Controller or memo carefully

// ✗ Watching a field triggers parent re-render on every keystroke
function ParentForm() {
  const { watch } = useForm()
  const email = watch('email')  // every keystroke re-renders ParentForm!
  return <div>{/* ... */}</div>
}

// ✓ Use useWatch in the child that needs the value
function EmailPreview() {
  const email = useWatch({ name: 'email' })  // only this component re-renders
  return <p>Preview: {email}</p>
}
```

---

## 10. Forms Checklist

### Form UX Review

- [ ] Single-column layout (no side-by-side fields except obvious pairs)
- [ ] Labels above every input (not placeholder-only)
- [ ] Required vs. optional clearly marked
- [ ] Hint text visible below inputs (not in tooltip)
- [ ] `type`, `inputMode`, and `autoComplete` set on every input
- [ ] Validation: errors shown on blur, cleared on valid
- [ ] Error messages: specific, human, tell user how to fix
- [ ] Error messages use `role="alert"` or `aria-live`
- [ ] Submit button shows loading state during submission
- [ ] Submit button disabled/aria-busy during submission
- [ ] Server errors displayed above the form in an alert
- [ ] `noValidate` on form element (prevents double validation)
- [ ] Form submittable with keyboard (Enter in last field)
- [ ] After error submission, focus moves to first error field
- [ ] Multi-step forms: URL reflects current step; back button works

---

*Related notes: [[01-nextjs-react-best-practices]] | [[03-accessibility-inclusive-design]] | [[06-loading-states-feedback]] | [[04-user-onboarding-flows]] | [[09-error-handling-empty-states]] | [[12-auth-security-ux]] | [[qa-ui-ux-guide]]*

*Last updated: 2026-04-15*
