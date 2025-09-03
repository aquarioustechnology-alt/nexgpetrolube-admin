"use client"
export function KpiRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">{children}</div>
}