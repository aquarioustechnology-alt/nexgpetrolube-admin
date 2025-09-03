// Mock data for webhooks
export const webhooksMock = [
  {
    id: 'WH001',
    provider: 'Razorpay',
    status: 'success',
    failed24h: false,
    retrySuccessRate: 95,
    incidentOpen: false,
    lastEvent: '2024-01-15T14:30:00Z',
  },
  {
    id: 'WH002',
    provider: 'Paytm',
    status: 'failed',
    failed24h: true,
    retrySuccessRate: 87,
    incidentOpen: true,
    lastEvent: '2024-01-15T13:45:00Z',
  },
  {
    id: 'WH003',
    provider: 'Stripe',
    status: 'success',
    failed24h: false,
    retrySuccessRate: 98,
    incidentOpen: false,
    lastEvent: '2024-01-15T12:15:00Z',
  },
]
