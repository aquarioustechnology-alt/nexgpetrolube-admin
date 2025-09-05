'use client'

/**
 * CR-A1: Admin User Creation (UI only)
 *
 * 3-step wizard for creating new users:
 * 1. Basics (company info, contact details, role)
 * 2. KYC Upload (documents with preview)
 * 3. Review & Submit (final confirmation)
 */

import * as React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import {
  UploadCloud,
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'
import type { AdminUserDraft, KycUploadItem } from '@/lib/types/admin-user'
import { emailExists } from '@/lib/mock/users'
import { pushKycSubmissionFromAdmin } from '@/lib/mock/kyc'

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

export default function CreateUserWizard() {
  const { toast } = useToast()
  const router = useRouter()
  const [step, setStep] = React.useState<1 | 2 | 3>(1)
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

  function nextFromBasics(values: BasicsForm) {
    if (emailExists(values.email)) {
      toast({
        title: 'Email already exists',
        description: 'Use a different primary email.',
        variant: 'destructive',
      })
      return
    }
    setStep(2)
  }

  function onFilesSelected(fileList: FileList | null) {
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
        documentType: 'other', // Default for old wizard
      })
    })
    setDocs(prev => [...prev, ...arr])
  }

  function removeDoc(id: string) {
    setDocs(prev => prev.filter(d => d.id !== id))
  }

  async function onSubmitAll(values: BasicsForm) {
    const draft: AdminUserDraft = {
      id: crypto.randomUUID(),
      company: values.company,
      gst: values.gst,
      email: values.email,
      phone: values.phone,
      contactName: values.contactName,
      address: values.address,
      role: values.role,
      createdByAdmin: true,
    }
    pushKycSubmissionFromAdmin({ draft, docs })
    toast({
      title: 'Submitted for KYC review',
      description: `${values.company} is now In Review.`,
    })
    router.push('/admin/kyc')
  }

  return (
    <Card className="space-y-5 rounded-2xl p-5">
      {/* Stepper */}
      <div className="flex items-center gap-3 text-sm">
        <Badge variant={step === 1 ? 'default' : 'secondary'}>1. Basics</Badge>
        <div className="h-px flex-1 bg-border" />
        <Badge variant={step === 2 ? 'default' : 'secondary'}>
          2. KYC Upload
        </Badge>
        <div className="h-px flex-1 bg-border" />
        <Badge variant={step === 3 ? 'default' : 'secondary'}>3. Review</Badge>
      </div>

      {step === 1 && (
        <form
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          onSubmit={form.handleSubmit(nextFromBasics)}
        >
          <div className="space-y-2 md:col-span-2">
            <Label>Company Name</Label>
            <Input
              {...form.register('company')}
              placeholder="ABC Petrochem Ltd"
            />
          </div>
          <div className="space-y-2">
            <Label>GST</Label>
            <Input {...form.register('gst')} placeholder="27AABCA1234Z1Z5" />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <select
              {...form.register('role')}
              className="h-10 w-full rounded-md border bg-background px-3"
            >
              <option>Buyer</option>
              <option>Seller</option>
              <option>Both</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Primary Email</Label>
            <Input
              type="email"
              {...form.register('email')}
              placeholder="person@company.com"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Phone</Label>
            <Input {...form.register('phone')} placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Contact Name</Label>
            <Input {...form.register('contactName')} placeholder="John Doe" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Address Line 1</Label>
            <Input
              {...form.register('address.line1')}
              placeholder="123 Industrial Estate"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Address Line 2 (optional)</Label>
            <Input
              {...form.register('address.line2')}
              placeholder="Building / Landmark"
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input {...form.register('address.city')} />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input {...form.register('address.state')} />
          </div>
          <div className="space-y-2">
            <Label>Pincode</Label>
            <Input {...form.register('address.pincode')} />
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input {...form.register('address.country')} />
          </div>

          <div className="flex justify-end pt-2 md:col-span-2">
            <Button type="submit">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Upload KYC documents (PDF, JPG, PNG, WEBP). Images show previews;
            PDFs open in a new tab.
          </div>
          <label className="flex h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed hover:bg-accent">
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              className="hidden"
              onChange={e => onFilesSelected(e.target.files)}
            />
            <div className="flex items-center gap-2 text-sm">
              <UploadCloud className="h-4 w-4" /> Click to upload or drag files
            </div>
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map(d => (
              <div key={d.id} className="overflow-hidden rounded-xl border">
                <div className="flex h-28 items-center justify-center bg-muted">
                  {d.type === 'image' ? (
                    <img
                      src={d.thumbnailUrl || d.url}
                      className="h-full w-full object-cover"
                      alt={d.name}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-5 w-5" /> PDF
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className="truncate">{d.name}</span>
                  <div className="flex items-center gap-2">
                    <a
                      className="text-xs underline"
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                    <button
                      className="text-xs underline"
                      onClick={() => removeDoc(d.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={() => setStep(3)}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="text-sm">
            Review details before submitting. KYC will be{' '}
            <Badge>In Review</Badge> and visible in the KYC queue.
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div>
              <div className="text-muted-foreground">Company</div>
              <div className="font-medium">{form.getValues('company')}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Role</div>
              <div className="font-medium">{form.getValues('role')}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Email</div>
              <div className="font-medium">{form.getValues('email')}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Phone</div>
              <div className="font-medium">{form.getValues('phone')}</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-muted-foreground">Address</div>
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
          <Separator />
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmitAll)}
              className="bg-brand-gradient text-white"
            >
              Submit for Review <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
