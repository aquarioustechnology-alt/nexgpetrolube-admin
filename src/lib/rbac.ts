export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  COMPLIANCE: 'compliance',
  MODERATOR: 'moderator',
  FINANCE: 'finance',
  CMS_EDITOR: 'cms_editor',
  SUPPORT: 'support',
} as const

export const PERMISSIONS = {
  // KYC
  KYC_VIEW: 'kyc_view',
  KYC_APPROVE: 'kyc_approve',
  KYC_REJECT: 'kyc_reject',

  // Users
  USERS_VIEW: 'users_view',
  USERS_EDIT: 'users_edit',

  // Listings
  LISTINGS_VIEW: 'listings_view',
  LISTINGS_APPROVE: 'listings_approve',

  // Auctions
  AUCTIONS_VIEW: 'auctions_view',
  AUCTIONS_MANAGE: 'auctions_manage',

  // Chat
  CHAT_VIEW: 'chat_view',
  CHAT_MODERATE: 'chat_moderate',

  // Financial
  FINANCIAL_VIEW: 'financial_view',
  FINANCIAL_EDIT: 'financial_edit',

  // Content
  CONTENT_VIEW: 'content_view',
  CONTENT_EDIT: 'content_edit',

  // Reports
  REPORTS_VIEW: 'reports_view',

  // Settings
  SETTINGS_VIEW: 'settings_view',
  SETTINGS_EDIT: 'settings_edit',
} as const

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.COMPLIANCE]: [
    PERMISSIONS.KYC_VIEW,
    PERMISSIONS.KYC_APPROVE,
    PERMISSIONS.KYC_REJECT,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.LISTINGS_VIEW,
    PERMISSIONS.LISTINGS_APPROVE,
    PERMISSIONS.CHAT_VIEW,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.REPORTS_VIEW,
  ],
  [ROLES.MODERATOR]: [
    PERMISSIONS.KYC_VIEW,
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.LISTINGS_VIEW,
    PERMISSIONS.LISTINGS_APPROVE,
    PERMISSIONS.AUCTIONS_VIEW,
    PERMISSIONS.CHAT_VIEW,
    PERMISSIONS.CHAT_MODERATE,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.REPORTS_VIEW,
  ],
  [ROLES.FINANCE]: [
    PERMISSIONS.FINANCIAL_VIEW,
    PERMISSIONS.FINANCIAL_EDIT,
    PERMISSIONS.REPORTS_VIEW,
  ],
  [ROLES.CMS_EDITOR]: [
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.REPORTS_VIEW,
  ],
  [ROLES.SUPPORT]: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.CHAT_VIEW,
    PERMISSIONS.REPORTS_VIEW,
  ],
}

export function hasPermission(role: string, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function getUserRole(): string {
  // Mock implementation - in real app this would come from auth context
  return ROLES.SUPER_ADMIN
}
