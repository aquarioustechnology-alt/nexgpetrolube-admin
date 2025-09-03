"use client"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import * as React from "react"

type KpiProps = {
  label: string
  value: string | number
  icon?: React.ReactNode
  hint?: string
  align?: "left" | "right"
}
export function KpiCard({ label, value, icon, hint, align="right" }: KpiProps) {
  const valueAlign = align === "right" ? "items-end text-right" : "items-start text-left"
  return (
    <Card className="rounded-2xl shadow-sm p-4 md:p-5">
      <div className={`flex flex-col ${valueAlign} gap-1`}>
        <div className="flex w-full items-center justify-between">
          <span className="text-xs text-muted-foreground">{label}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            {icon ? <span className="inline-flex">{icon}</span> : null}
            {hint ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="rounded-md p-0.5 hover:bg-accent/50">
                      <Info className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{hint}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
            <span aria-hidden className="h-2 w-2 rounded-full bg-brand-gradient shadow-[0_0_0_2px] shadow-background" />
          </div>
        </div>
        <div className="text-3xl md:text-4xl font-semibold tracking-tight nums">{value}</div>
      </div>
    </Card>
  )
}