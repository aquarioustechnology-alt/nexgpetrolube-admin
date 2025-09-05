'use client'

/**
 * CR-A1: Admin User Creation (UI only) — Modal Wizard
 *
 * Compact 3-step modal wizard for creating new users:
 * 1. Basics (company info, contact details, role)
 * 2. KYC Upload (documents with preview)
 * 3. Review & Submit (final confirmation)
 */

import * as React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import {
  UploadCloud,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import { emailExists } from '@/lib/mock/users'
import { pushKycSubmissionFromAdmin } from '@/lib/mock/kyc'
import type { KycUploadItem, KycDocumentType } from '@/lib/types/admin-user'
import { Stepper } from '@/components/common/stepper'
import { DocThumb } from '@/components/common/doc-thumb'

const basicsSchema = z.object({
  company: z.string().min(2, 'Company required'),
  gst: z.string().optional(),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone required'),
  contactName: z.string().min(2, 'Contact name required'),
  address: z.object({
    line1: z.string().min(3, 'Address line 1 required'),
    line2: z.string().optional(),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(4),
    country: z.string().min(2),
  }),
  role: z.enum(['Buyer', 'Seller', 'Both']),
})

type BasicsForm = z.infer<typeof basicsSchema>

// Document Upload Section Component
function DocumentUploadSection({
  title,
  description,
  documentType,
  accept,
  docs,
  onFilesSelected,
  removeDoc,
}: {
  title: string
  description: string
  documentType: KycDocumentType
  accept: string
  docs: KycUploadItem[]
  onFilesSelected: (files: FileList | null, docType: KycDocumentType) => void
  removeDoc: (id: string) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {docs.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            {docs.length} file{docs.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      <label className="flex h-20 cursor-pointer items-center justify-center rounded-lg border border-dashed hover:bg-accent">
        <input
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={e => onFilesSelected(e.target.files, documentType)}
        />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UploadCloud className="h-4 w-4" />
          {docs.length > 0 ? 'Add more files' : 'Click to upload'}
        </div>
      </label>

      {docs.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {docs.map(d => (
            <div
              key={d.id}
              className="flex items-center gap-2 rounded-lg border p-2"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                {d.type === 'image' ? (
                  <img
                    src={d.thumbnailUrl || d.url}
                    className="h-full w-full rounded object-cover"
                    alt={d.name}
                  />
                ) : (
                  <FileText className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{d.name}</p>
                <p className="text-xs capitalize text-muted-foreground">
                  {d.type}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <a
                  className="text-xs underline hover:no-underline"
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open
                </a>
                <button
                  className="text-xs text-destructive underline hover:no-underline"
                  onClick={() => removeDoc(d.id)}
                  type="button"
                  aria-label="Remove file"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function CreateUserModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const { toast } = useToast()
  const router = useRouter()
  const [step, setStep] = React.useState<1 | 2 | 3>(1)
  const [dupEmail, setDupEmail] = React.useState(false)
  const [docs, setDocs] = React.useState<KycUploadItem[]>([])

  const form = useForm<BasicsForm>({
    resolver: zodResolver(basicsSchema),
    defaultValues: {
      company: '',
      gst: '',
      email: '',
      phone: '',
      contactName: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
      },
      role: 'Buyer',
    },
  })

  function onEmailBlur(e: React.FocusEvent<HTMLInputElement>) {
    const v = e.currentTarget.value?.trim()
    if (!v) return
    setDupEmail(emailExists(v))
  }

  function nextFromBasics(values: BasicsForm) {
    if (dupEmail) {
      toast({
        title: 'Email already exists',
        description: 'Use a different primary email.',
        variant: 'destructive',
      })
      return
    }
    setStep(2)
  }

  function onFilesSelected(
    fileList: FileList | null,
    documentType: KycDocumentType
  ) {
    if (!fileList) return
    const arr: KycUploadItem[] = []
    Array.from(fileList).forEach((f, idx) => {
      const isImg = /image\/(png|jpg|jpeg|webp)/i.test(f.type)
      const type = isImg ? 'image' : 'pdf'
      const url = URL.createObjectURL(f)
      arr.push({
        id: `${Date.now()}-${idx}`,
        name: f.name,
        type,
        url,
        thumbnailUrl: isImg ? url : undefined,
        documentType,
      })
    })
    setDocs(prev => [...prev, ...arr])
  }

  function removeDoc(id: string) {
    setDocs(prev => prev.filter(d => d.id !== id))
  }

  async function onSubmitAll(values: BasicsForm) {
    pushKycSubmissionFromAdmin({
      draft: {
        id: crypto.randomUUID(),
        company: values.company,
        gst: values.gst,
        email: values.email,
        phone: values.phone,
        contactName: values.contactName,
        address: values.address,
        role: values.role,
        createdByAdmin: true,
      },
      docs,
    })
    toast({
      title: 'Submitted for KYC review',
      description: `${values.company} is now In Review.`,
    })
    onOpenChange(false)
    router.push('/admin/kyc')
  }

  // compact field wrapper (smaller labels/inputs)
  const Field = ({
    label,
    children,
    className = '',
    required = false,
  }: {
    label: string
    children: React.ReactNode
    className?: string
    required?: boolean
  }) => (
    <div className={className}>
      <Label className="text-xs">
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="mt-1">{children}</div>
    </div>
  )

  return (
    <Dialog
      open={open}
      onOpenChange={v => {
        onOpenChange(v)
        if (!v) {
          setStep(1)
          setDocs([])
          setDupEmail(false)
          form.reset()
        }
      }}
    >
      <DialogContent className="flex h-[90vh] max-h-[90vh] flex-col p-0 sm:max-w-3xl">
        <DialogHeader className="flex-shrink-0 px-5 pt-5">
          <DialogTitle>Create User</DialogTitle>
          <div className="-mt-1 text-xs text-muted-foreground">
            Create a buyer, seller, or both; upload KYC; submit for review.
          </div>
          {/* Stepper */}
          <Stepper
            steps={[
              { key: '1', label: 'Basics' },
              { key: '2', label: 'KYC Upload' },
              { key: '3', label: 'Review' },
            ]}
            current={String(step)}
            className="mt-3 rounded-md bg-background/95 px-2 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/75"
          />
        </DialogHeader>

        {/* Scrollable body */}
        <ScrollArea className="min-h-0 flex-1 pr-2">
          {/* STEP 1 */}
          {step === 1 && (
            <form
              className="grid grid-cols-2 gap-3 px-5 pb-8"
              onSubmit={form.handleSubmit(nextFromBasics)}
            >
              <Field label="Company Name" className="col-span-2" required>
                <Input
                  className="h-9"
                  {...form.register('company')}
                  placeholder="ABC Petrochem Ltd"
                />
              </Field>
              <Field label="GST">
                <Input
                  className="h-9"
                  {...form.register('gst')}
                  placeholder="27AABCA1234Z1Z5"
                />
              </Field>
              <Field label="Role" required>
                <select
                  {...form.register('role')}
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                >
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Both</option>
                </select>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Capabilities are implied by role; no extra permissions to
                  pick.
                </p>
              </Field>
              <Field label="Primary Email" className="col-span-2" required>
                <Input
                  className="h-9"
                  type="email"
                  {...form.register('email')}
                  onBlur={onEmailBlur}
                  placeholder="person@company.com"
                />
                {dupEmail && (
                  <div className="mt-1 text-[11px] text-destructive">
                    This email already exists.
                  </div>
                )}
              </Field>
              <Field label="Phone" className="col-span-2" required>
                <Input
                  className="h-9"
                  {...form.register('phone')}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="Contact Name" className="col-span-2" required>
                <Input
                  className="h-9"
                  {...form.register('contactName')}
                  placeholder="John Doe"
                />
              </Field>
              <Field label="Address Line 1" className="col-span-2" required>
                <Input
                  className="h-9"
                  {...form.register('address.line1')}
                  placeholder="123 Industrial Estate"
                />
              </Field>
              <Field label="Address Line 2 (optional)" className="col-span-2">
                <Input
                  className="h-9"
                  {...form.register('address.line2')}
                  placeholder="Building / Landmark"
                />
              </Field>
              <Field label="City" required>
                <Input className="h-9" {...form.register('address.city')} />
              </Field>
              <Field label="State" required>
                <Input className="h-9" {...form.register('address.state')} />
              </Field>
              <Field label="Pincode" required>
                <Input className="h-9" {...form.register('address.pincode')} />
              </Field>
              <Field label="Country" required>
                <Input className="h-9" {...form.register('address.country')} />
              </Field>
              {/* hidden submit to use Enter key */}
              <button type="submit" className="hidden" />
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-3 px-5 pb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Upload required KYC documents. Each document type has specific
                  file requirements.
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {docs.length} file{docs.length === 1 ? '' : 's'}
                </div>
              </div>

              {/* Document Upload Sections */}
              <div className="grid gap-4">
                {/* PAN Card */}
                <DocumentUploadSection
                  title="PAN Card"
                  description="Upload PAN card (JPG, PNG, PDF)"
                  documentType="pan-card"
                  accept="image/*,application/pdf"
                  docs={docs.filter(d => d.documentType === 'pan-card')}
                  onFilesSelected={onFilesSelected}
                  removeDoc={removeDoc}
                />

                {/* Aadhaar Card */}
                <DocumentUploadSection
                  title="Aadhaar Card"
                  description="Upload Aadhaar card (JPG, PNG, PDF)"
                  documentType="aadhaar-card"
                  accept="image/*,application/pdf"
                  docs={docs.filter(d => d.documentType === 'aadhaar-card')}
                  onFilesSelected={onFilesSelected}
                  removeDoc={removeDoc}
                />

                {/* GST Certificate */}
                <DocumentUploadSection
                  title="GST Certificate"
                  description="Upload GST registration certificate (PDF preferred)"
                  documentType="gst-certificate"
                  accept="image/*,application/pdf"
                  docs={docs.filter(d => d.documentType === 'gst-certificate')}
                  onFilesSelected={onFilesSelected}
                  removeDoc={removeDoc}
                />

                {/* Company Registration */}
                <DocumentUploadSection
                  title="Company Registration"
                  description="Upload company registration documents (PDF preferred)"
                  documentType="company-registration"
                  accept="image/*,application/pdf"
                  docs={docs.filter(
                    d => d.documentType === 'company-registration'
                  )}
                  onFilesSelected={onFilesSelected}
                  removeDoc={removeDoc}
                />

                {/* Bank Statement */}
                <DocumentUploadSection
                  title="Bank Statement"
                  description="Upload recent bank statement (PDF preferred)"
                  documentType="bank-statement"
                  accept="image/*,application/pdf"
                  docs={docs.filter(d => d.documentType === 'bank-statement')}
                  onFilesSelected={onFilesSelected}
                  removeDoc={removeDoc}
                />

                {/* Address Proof */}
                <DocumentUploadSection
                  title="Address Proof"
                  description="Upload address proof document (JPG, PNG, PDF)"
                  documentType="address-proof"
                  accept="image/*,application/pdf"
                  docs={docs.filter(d => d.documentType === 'address-proof')}
                  onFilesSelected={onFilesSelected}
                  removeDoc={removeDoc}
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 px-5 pb-4 text-sm">
              <div>
                Review details before submitting. KYC will be{' '}
                <Badge>In Review</Badge> and visible in the KYC queue.
              </div>

              {/* Company Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  Company Information
                </h4>
                <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Company Name
                      </div>
                      <div className="font-medium">
                        {form.getValues('company')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Role</div>
                      <div className="font-medium">
                        {form.getValues('role')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        GST Number
                      </div>
                      <div className="font-medium">
                        {form.getValues('gst') || 'Not provided'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Contact Person
                      </div>
                      <div className="font-medium">
                        {form.getValues('contactName')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="font-medium">
                        {form.getValues('email')}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Phone</div>
                      <div className="font-medium">
                        {form.getValues('phone')}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Address</div>
                    <div className="font-medium">
                      {form.getValues('address.line1')}
                      {form.getValues('address.line2')
                        ? `, ${form.getValues('address.line2')}`
                        : ''}
                      , {form.getValues('address.city')},{' '}
                      {form.getValues('address.state')}{' '}
                      {form.getValues('address.pincode')},{' '}
                      {form.getValues('address.country')}
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Documents */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">KYC Documents</h4>
                <div className="space-y-3">
                  {[
                    { type: 'pan-card', label: 'PAN Card', required: true },
                    {
                      type: 'aadhaar-card',
                      label: 'Aadhaar Card',
                      required: true,
                    },
                    {
                      type: 'gst-certificate',
                      label: 'GST Certificate',
                      required: false,
                    },
                    {
                      type: 'company-registration',
                      label: 'Company Registration',
                      required: false,
                    },
                    {
                      type: 'bank-statement',
                      label: 'Bank Statement',
                      required: false,
                    },
                    {
                      type: 'address-proof',
                      label: 'Address Proof',
                      required: false,
                    },
                  ].map(({ type, label, required }) => {
                    const typeDocs = docs.filter(d => d.documentType === type)
                    const hasDocs = typeDocs.length > 0

                    return (
                      <div
                        key={type}
                        className="rounded-lg border bg-muted/30 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{label}</span>
                            {required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                            {!required && (
                              <Badge variant="secondary" className="text-xs">
                                Optional
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {hasDocs ? (
                              <Badge
                                variant="default"
                                className="bg-emerald-100 text-xs text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                              >
                                ✓ Uploaded ({typeDocs.length})
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                {required ? 'Missing' : 'Not provided'}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {hasDocs ? (
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {typeDocs.map(doc => (
                              <DocThumb
                                key={doc.id}
                                name={doc.name}
                                url={doc.url}
                                type={doc.type}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs italic text-muted-foreground">
                            {required
                              ? 'This document is required for KYC verification'
                              : 'This document is optional'}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Documents</span>
                  <Badge variant="outline">{docs.length} files uploaded</Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {docs.filter(d =>
                    ['pan-card', 'aadhaar-card'].includes(d.documentType)
                  ).length >= 2
                    ? '✓ Required documents (PAN + Aadhaar) are present'
                    : '⚠ Some required documents may be missing'}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Sticky Footer */}
        <div className="flex flex-shrink-0 justify-between border-t bg-background/95 px-6 py-3">
          {step > 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(s => (s - 1) as 1 | 2 | 3)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button
              size="sm"
              onClick={
                step === 1
                  ? form.handleSubmit(nextFromBasics)
                  : () => setStep(3)
              }
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={form.handleSubmit(onSubmitAll)}
              className="bg-brand-gradient text-white"
            >
              Submit for Review <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
