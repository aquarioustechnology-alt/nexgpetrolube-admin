/**
 * Authentication Middleware
 *
 * Protects admin routes and handles login redirects.
 * Demo implementation using cookie-based authentication.
 */
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl
  const authed = req.cookies.get('nxg_admin')?.value === 'true'

  // Protect admin routes
  if (pathname.startsWith('/admin') && !authed) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set(
      'from',
      pathname + (searchParams.toString() ? `?${searchParams}` : '')
    )
    return NextResponse.redirect(url)
  }

  // Prevent login when already authenticated
  if (pathname === '/login' && authed) {
    const url = req.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
