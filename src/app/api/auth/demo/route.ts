/**
 * Demo Authentication API Route
 *
 * Validates demo credentials and sets authentication cookie.
 * This is a demo-only implementation for development purposes.
 */
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}))
  const demoEmail = process.env.NXG_DEMO_EMAIL ?? 'admin@nexgpetrolube.com'
  const demoPass = process.env.NXG_DEMO_PASSWORD ?? 'Admin@123'

  if (email === demoEmail && password === demoPass) {
    const res = NextResponse.json({ ok: true })
    res.cookies.set({
      name: 'nxg_admin',
      value: 'true',
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
    })
    return res
  }

  return NextResponse.json(
    { ok: false, error: 'Invalid credentials' },
    { status: 401 }
  )
}
