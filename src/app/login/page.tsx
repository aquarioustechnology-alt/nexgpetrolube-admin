/**
 * Admin Login Page
 *
 * Demo authentication interface for NexGPetrolube admin portal.
 * Features brand gradient styling, form validation, and demo credentials.
 */
'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, LogIn, Copy, Check } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
})

function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const params = useSearchParams()
  const from = params.get('from') || '/admin'
  const [showPw, setShowPw] = React.useState(false)
  const [copied, setCopied] = React.useState<{
    email: boolean
    password: boolean
  }>({ email: false, password: false })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL ?? 'admin@nexgpetrolube.com',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error((await res.json())?.error ?? 'Login failed')
      router.push(from)
    } catch (err: any) {
      toast({
        title: 'Invalid credentials',
        description: err.message || 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  function CopyBtn({
    text,
    kind,
  }: {
    text: string
    kind: 'email' | 'password'
  }) {
    const isCopied = copied[kind]
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8"
        aria-label={`Copy ${kind}`}
        onClick={async () => {
          await navigator.clipboard.writeText(text)
          setCopied(s => ({ ...s, [kind]: true }))
          setTimeout(() => setCopied(s => ({ ...s, [kind]: false })), 1200)
        }}
      >
        {isCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* top-right theme toggle (optional component if present) */}
      <div className="absolute right-4 top-4">
        {/* If your ThemeToggle component exists, render it here */}
      </div>

      <div className="mx-auto flex w-full max-w-md flex-1 items-center justify-center px-4">
        <div className="w-full">
          <div className="mb-6 text-center">
            <div className="text-2xl font-semibold tracking-tight">
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                NexGPetrolube
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Indian B2B Petroleum Platform
            </p>
          </div>

          <Card className="rounded-2xl p-6 shadow-sm md:p-8">
            <div className="mb-2 flex items-center justify-center">
              <div className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm">
                <LogIn className="h-6 w-6" />
              </div>
            </div>
            <h1 className="text-center text-xl font-semibold">Admin Login</h1>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Sign in to access the NexGPetrolube admin portal
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@nexgpetrolube.com"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pr-10"
                    {...form.register('password')}
                  />
                  <button
                    type="button"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent"
                    onClick={() => setShowPw(s => !s)}
                  >
                    {showPw ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" variant="brand" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Demo account panel */}
            <div className="rounded-xl border bg-muted/40 p-3">
              <div className="mb-1 text-xs font-medium text-muted-foreground">
                Demo Account
              </div>
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="truncate">
                  <span className="text-muted-foreground">Email:</span>{' '}
                  admin@nexgpetrolube.com
                </div>
                <CopyBtn text="admin@nexgpetrolube.com" kind="email" />
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                <div className="truncate">
                  <span className="text-muted-foreground">Password:</span>{' '}
                  Admin@123
                </div>
                <CopyBtn text="Admin@123" kind="password" />
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Need help? Contact{' '}
              <a href="mailto:support@nexgpetrolube.com" className="underline">
                support@nexgpetrolube.com
              </a>
              .
            </p>
          </Card>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} NexGPetrolube. All rights reserved. ·{' '}
            <a className="underline" href="#">
              Privacy Policy
            </a>{' '}
            ·{' '}
            <a className="underline" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
