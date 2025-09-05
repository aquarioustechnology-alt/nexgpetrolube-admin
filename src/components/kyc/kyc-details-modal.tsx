'use client'

import * as React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import {
  FileText,
  ImageIcon,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { KycSubmission, KycDocument } from '@/lib/types/kyc'
import { computeSla, slaBadgeClass } from '@/lib/utils'

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  submission: KycSubmission
  onApprove?: (id: string) => void
  onReject?: (id: string, reason: string) => void
}

const rejectSchema = z.object({
  reason: z.string().min(10, 'Please provide at least 10 characters.'),
})

export default function KycDetailsModal({
  open,
  onOpenChange,
  submission,
  onApprove,
  onReject,
}: Props) {
  const { toast } = useToast()
  const [rejectOpen, setRejectOpen] = React.useState(false)
  const [preview, setPreview] = React.useState<KycDocument | null>(null)
  const sla = computeSla(submission.submittedAt, submission.slaHours)

  const form = useForm<z.infer<typeof rejectSchema>>({
    resolver: zodResolver(rejectSchema),
    defaultValues: { reason: '' },
  })

  function DocChip({ doc }: { doc: KycDocument }) {
    const isImg = doc.type === 'image'
    const isPdf = doc.type === 'pdf'
    const Icon = isImg ? ImageIcon : isPdf ? FileText : FileText
    return (
      <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
        <Icon className="h-4 w-4" aria-hidden />
        <span className="max-w-[12rem] truncate">{doc.name}</span>
        {doc.verified ? (
          <CheckCircle2
            className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
            aria-label="Verified"
          />
        ) : (
          <XCircle
            className="h-4 w-4 text-muted-foreground"
            aria-label="Unverified"
          />
        )}
        <a
          href={doc.url}
          target="_blank"
          rel="noreferrer"
          className="rounded p-1 hover:bg-accent"
          aria-label={`Download ${doc.name}`}
        >
          <Download className="h-4 w-4" />
        </a>
        {isImg ? (
          <button
            type="button"
            className="rounded p-1 hover:bg-accent"
            aria-label={`Preview ${doc.name}`}
            onClick={() => setPreview(doc)}
          >
            <Eye className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between gap-3">
              <span>KYC Details — {submission.entity}</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {submission.status.toLowerCase()}
                </Badge>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${slaBadgeClass(sla.state)}`}
                >
                  <Clock className="h-3.5 w-3.5" />{' '}
                  {sla.state === 'BREACHED'
                    ? 'SLA Breached'
                    : sla.state === 'APPROACHING'
                      ? 'SLA Approaching'
                      : 'SLA OK'}{' '}
                  · {sla.hoursLeft}h left
                </span>
              </div>
            </DialogTitle>
            <DialogDescription>
              Review documents and take action. Rejection requires a reason.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[65vh] pr-2">
            <div className="grid grid-cols-1 gap-4">
              {/* Basic fields */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">GST Number</div>
                  <div className="font-medium">{submission.gst}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">PAN Number</div>
                  <div className="font-medium">{submission.pan}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Aadhaar</div>
                  <div className="font-medium">{submission.aadhaarMasked}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Submitted</div>
                  <div className="font-medium">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground">Reviewer</div>
                  <div className="font-medium">
                    {submission.reviewer ?? '—'}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Document chips */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Documents</div>
                <div className="flex flex-wrap gap-2">
                  {submission.documents.map(d => (
                    <DocChip key={d.id} doc={d} />
                  ))}
                </div>
              </div>

              {/* Thumbnails grid (images only) */}
              {submission.documents.some(
                d => d.type === 'image' && (d.thumbnailUrl || d.url)
              ) ? (
                <div className="space-y-2">
                  <div className="text-sm font-medium">Image Previews</div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {submission.documents
                      .filter(d => d.type === 'image')
                      .map(d => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setPreview(d)}
                          className="group overflow-hidden rounded-xl border bg-card hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Image
                            src={d.thumbnailUrl || d.url}
                            alt={d.name}
                            width={320}
                            height={200}
                            className="h-28 w-full object-cover transition-transform group-hover:scale-[1.02]"
                          />
                          <div className="truncate px-2 py-1 text-xs text-muted-foreground">
                            {d.name}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              ) : null}
            </div>
          </ScrollArea>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              variant="seller"
              onClick={() => setRejectOpen(true)}
              aria-label="Reject KYC"
            >
              Reject
            </Button>
            <Button
              onClick={() => {
                onApprove?.(submission.id)
                toast({ title: 'KYC Approved', description: submission.entity })
                onOpenChange(false)
              }}
              aria-label="Approve KYC"
            >
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image preview dialog */}
      <Dialog open={!!preview} onOpenChange={v => !v && setPreview(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{preview?.name}</DialogTitle>
          </DialogHeader>
          {preview ? (
            <div className="relative aspect-video w-full">
              {/* Next/Image keeps performance sane */}
              <Image
                src={preview.url}
                alt={preview.name}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="rounded-md object-contain"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Reject reason required */}
      <AlertDialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject KYC</AlertDialogTitle>
            <AlertDialogDescription>
              Provide a reason. The applicant will see this message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            onSubmit={form.handleSubmit(async values => {
              onReject?.(submission.id, values.reason)
              setRejectOpen(false)
              onOpenChange(false)
            })}
            className="space-y-3"
          >
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Textarea
                id="reason"
                rows={4}
                placeholder="Explain why this KYC is rejected…"
                {...form.register('reason')}
              />
              {form.formState.errors.reason ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.reason.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Minimum 10 characters.
                </p>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                className="bg-red-600 hover:bg-red-600/90"
              >
                Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
