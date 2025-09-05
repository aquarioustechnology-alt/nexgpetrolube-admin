import * as React from 'react'
import { FileText, ImageIcon } from 'lucide-react'

type Props = { name: string; url: string; type: 'image' | 'pdf' }

export function DocThumb({ name, url, type }: Props) {
  const isImg = type === 'image'
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-xl border hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={`Open ${name}`}
    >
      <div className="relative flex h-24 items-center justify-center bg-muted">
        {isImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={name}
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="h-5 w-5" /> PDF
          </div>
        )}
      </div>
      <div className="truncate px-2 py-1 text-xs">{name}</div>
    </a>
  )
}
