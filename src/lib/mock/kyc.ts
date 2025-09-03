export interface KYCSubmission {
  id: string
  entity: string
  gst: string
  pan: string
  aadhaar: string
  docs: string[]
  submitted: string
  reviewer: string
  status: 'pending' | 'approved' | 'rejected'
  notes?: string
}

export const kycData: KYCSubmission[] = [
  {
    id: 'KYC001',
    entity: 'ABC Petrochem Ltd',
    gst: '27AABCA1234Z1Z5',
    pan: 'AABCA1234Z',
    aadhaar: '1234-5678-9012',
    docs: ['GST Certificate', 'PAN Card', 'Aadhaar', 'Company Registration'],
    submitted: '2024-01-15T10:30:00Z',
    reviewer: 'John Doe',
    status: 'pending',
  },
  {
    id: 'KYC002',
    entity: 'XYZ Lubricants Pvt Ltd',
    gst: '29BABCB5678Y2Y6',
    pan: 'BABCB5678Y',
    aadhaar: '2345-6789-0123',
    docs: ['GST Certificate', 'PAN Card', 'Aadhaar', 'Company Registration'],
    submitted: '2024-01-14T14:20:00Z',
    reviewer: 'Jane Smith',
    status: 'approved',
    notes: 'All documents verified successfully',
  },
  {
    id: 'KYC003',
    entity: 'DEF Oil Solutions',
    gst: '32CACDC9012X3X7',
    pan: 'CACDC9012X',
    aadhaar: '3456-7890-1234',
    docs: ['GST Certificate', 'PAN Card', 'Aadhaar'],
    submitted: '2024-01-13T09:15:00Z',
    reviewer: 'Mike Johnson',
    status: 'rejected',
    notes: 'Missing company registration document',
  },
  {
    id: 'KYC004',
    entity: 'GHI Petroleum Co',
    gst: '24DADDD3456W4W8',
    pan: 'DADDD3456W',
    aadhaar: '4567-8901-2345',
    docs: [
      'GST Certificate',
      'PAN Card',
      'Aadhaar',
      'Company Registration',
      'Bank Statement',
    ],
    submitted: '2024-01-12T16:45:00Z',
    reviewer: 'Sarah Wilson',
    status: 'pending',
  },
  {
    id: 'KYC005',
    entity: 'JKL Fuel Distributors',
    gst: '06EAEEE7890V5V9',
    pan: 'EAEEE7890V',
    aadhaar: '5678-9012-3456',
    docs: ['GST Certificate', 'PAN Card', 'Aadhaar', 'Company Registration'],
    submitted: '2024-01-11T11:30:00Z',
    reviewer: 'Tom Brown',
    status: 'approved',
    notes: 'Documents verified, company is legitimate',
  },
]
