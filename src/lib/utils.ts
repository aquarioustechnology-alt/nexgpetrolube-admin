import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type SlaState = 'OK' | 'APPROACHING' | 'BREACHED'

export function computeSla(
  submittedAtIso: string,
  slaHours: number
): { state: SlaState; hoursLeft: number } {
  const now = new Date()
  const submitted = new Date(submittedAtIso)
  const elapsedMs = now.getTime() - submitted.getTime()
  const elapsedH = elapsedMs / 36e5
  const remaining = Math.max(0, slaHours - elapsedH)
  let state: SlaState = 'OK'
  if (remaining <= 0) state = 'BREACHED'
  else if (remaining / slaHours <= 0.25) state = 'APPROACHING'
  return { state, hoursLeft: Number(remaining.toFixed(1)) }
}

export function slaBadgeClass(state: SlaState): string {
  if (state === 'OK')
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
  if (state === 'APPROACHING')
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
  return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
}
