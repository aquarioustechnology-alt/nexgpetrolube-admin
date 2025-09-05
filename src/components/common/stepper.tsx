import * as React from 'react'
import { cn } from '@/lib/utils'

type StepperProps = {
  steps: { key: string; label: string }[]
  current: string
  className?: string
}

export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <div className={cn('flex items-center gap-3 text-xs', className)}>
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          <div
            className={cn(
              'rounded-full border px-2 py-0.5',
              s.key === current
                ? 'border-foreground bg-foreground text-background'
                : 'text-muted-foreground'
            )}
          >
            {i + 1}. {s.label}
          </div>
          {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
        </React.Fragment>
      ))}
    </div>
  )
}
