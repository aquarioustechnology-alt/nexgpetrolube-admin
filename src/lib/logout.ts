/**
 * Logout Utility
 *
 * Handles user logout by clearing authentication cookie and redirecting to login.
 * For use in admin components like topbar logout buttons.
 */
export async function logoutAdmin() {
  await fetch('/api/auth/logout', { method: 'POST' })
  if (typeof window !== 'undefined') window.location.href = '/login'
}
