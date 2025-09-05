/**
 * KYC Mock Data
 *
 * Mock data for KYC submissions with documents and SLA information.
 * Used for UI development and testing.
 */

import type { KycSubmission } from '@/lib/types/kyc'
import type { AdminUserDraft, KycUploadItem } from '@/lib/types/admin-user'

export const kycData: KycSubmission[] = [
  {
    id: 'KYC001',
    entity: 'ABC Petrochem Ltd',
    gst: '27AABCA1234Z1Z5',
    pan: 'AABCA1234Z',
    aadhaarMasked: '1234-****-9012',
    submittedAt: '2024-01-15T10:30:00Z',
    reviewer: 'John Doe',
    status: 'Pending',
    slaHours: 48,
    documents: [
      {
        id: 'doc1',
        name: 'GST Certificate.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
      {
        id: 'doc2',
        name: 'PAN Card.jpg',
        type: 'image',
        url: '/mock/kyc/pan-card.jpg',
        thumbnailUrl: '/mock/kyc/pan-card-thumb.jpg',
        verified: true,
      },
      {
        id: 'doc3',
        name: 'Aadhaar Card.jpg',
        type: 'image',
        url: '/mock/kyc/aadhaar-card.jpg',
        thumbnailUrl: '/mock/kyc/aadhaar-card-thumb.jpg',
        verified: false,
      },
      {
        id: 'doc4',
        name: 'Company Registration.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
    ],
  },
  {
    id: 'KYC002',
    entity: 'XYZ Lubricants Pvt Ltd',
    gst: '29BABCB5678Y2Y6',
    pan: 'BABCB5678Y',
    aadhaarMasked: '2345-****-0123',
    submittedAt: '2024-01-14T14:20:00Z',
    reviewer: 'Jane Smith',
    status: 'Verified',
    slaHours: 48,
    documents: [
      {
        id: 'doc5',
        name: 'GST Certificate.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
      {
        id: 'doc6',
        name: 'PAN Card.jpg',
        type: 'image',
        url: '/mock/kyc/pan-card.jpg',
        thumbnailUrl: '/mock/kyc/pan-card-thumb.jpg',
        verified: true,
      },
      {
        id: 'doc7',
        name: 'Company Registration.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
    ],
  },
  {
    id: 'KYC003',
    entity: 'DEF Oil Solutions',
    gst: '32CACDC9012X3X7',
    pan: 'CACDC9012X',
    aadhaarMasked: '3456-****-1234',
    submittedAt: '2024-01-13T09:15:00Z',
    reviewer: 'Mike Johnson',
    status: 'Rejected',
    slaHours: 48,
    documents: [
      {
        id: 'doc8',
        name: 'GST Certificate.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
      {
        id: 'doc9',
        name: 'PAN Card.jpg',
        type: 'image',
        url: '/mock/kyc/pan-card.jpg',
        thumbnailUrl: '/mock/kyc/pan-card-thumb.jpg',
        verified: false,
      },
    ],
  },
  {
    id: 'KYC004',
    entity: 'GHI Petroleum Co',
    gst: '24DADDD3456W4W8',
    pan: 'DADDD3456W',
    aadhaarMasked: '4567-****-2345',
    submittedAt: '2024-01-12T16:45:00Z',
    reviewer: 'Sarah Wilson',
    status: 'Pending',
    slaHours: 48,
    documents: [
      {
        id: 'doc10',
        name: 'GST Certificate.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
      {
        id: 'doc11',
        name: 'PAN Card.jpg',
        type: 'image',
        url: '/mock/kyc/pan-card.jpg',
        thumbnailUrl: '/mock/kyc/pan-card-thumb.jpg',
        verified: true,
      },
      {
        id: 'doc12',
        name: 'Aadhaar Card.jpg',
        type: 'image',
        url: '/mock/kyc/aadhaar-card.jpg',
        thumbnailUrl: '/mock/kyc/aadhaar-card-thumb.jpg',
        verified: false,
      },
      {
        id: 'doc13',
        name: 'Company Registration.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
      {
        id: 'doc14',
        name: 'Bank Statement.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: false,
      },
    ],
  },
  {
    id: 'KYC005',
    entity: 'JKL Fuel Distributors',
    gst: '06EAEEE7890V5V9',
    pan: 'EAEEE7890V',
    aadhaarMasked: '5678-****-3456',
    submittedAt: '2024-01-11T11:30:00Z',
    reviewer: 'Tom Brown',
    status: 'Verified',
    slaHours: 48,
    documents: [
      {
        id: 'doc15',
        name: 'GST Certificate.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
      {
        id: 'doc16',
        name: 'PAN Card.jpg',
        type: 'image',
        url: '/mock/kyc/pan-card.jpg',
        thumbnailUrl: '/mock/kyc/pan-card-thumb.jpg',
        verified: true,
      },
      {
        id: 'doc17',
        name: 'Aadhaar Card.jpg',
        type: 'image',
        url: '/mock/kyc/aadhaar-card.jpg',
        thumbnailUrl: '/mock/kyc/aadhaar-card-thumb.jpg',
        verified: true,
      },
      {
        id: 'doc18',
        name: 'Company Registration.pdf',
        type: 'pdf',
        url: '/mock/sample.pdf',
        verified: true,
      },
    ],
  },
]

/**
 * Push a new KYC submission from admin user creation
 * Used when admin creates a user through the wizard
 */
export function pushKycSubmissionFromAdmin(payload: {
  draft: AdminUserDraft
  docs: KycUploadItem[]
}): void {
  const now = new Date().toISOString()
  kycData.push({
    id: crypto.randomUUID(),
    entity: payload.draft.company,
    gst: payload.draft.gst ?? '—',
    pan: '—',
    aadhaarMasked: 'xxxx-xxxx-xxxx',
    submittedAt: now,
    reviewer: '—',
    status: 'Pending', // UI label shows "In Review"
    slaHours: 48,
    documents: payload.docs.map(d => ({
      id: d.id,
      name: d.name,
      type: d.type,
      url: d.url,
      thumbnailUrl: d.thumbnailUrl,
      verified: false,
    })),
  })
}
