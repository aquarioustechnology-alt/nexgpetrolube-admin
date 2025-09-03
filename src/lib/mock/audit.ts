// Mock data for audit logs
export const auditMock = [
  {
    id: "AUD001",
    timestamp: "2024-01-15T14:30:22Z",
    user: "admin@nexg.com",
    action: "User Login",
    resource: "System",
    status: "success",
    today: true,
    week: true
  },
  {
    id: "AUD002",
    timestamp: "2024-01-15T14:25:15Z",
    user: "john.doe",
    action: "Data Export",
    resource: "Reports",
    status: "success",
    today: true,
    week: true
  },
  {
    id: "AUD003",
    timestamp: "2024-01-15T14:20:08Z",
    user: "sarah.johnson",
    action: "User Update",
    resource: "User Management",
    status: "success",
    today: true,
    week: true
  },
  {
    id: "AUD004",
    timestamp: "2024-01-15T14:15:42Z",
    user: "analyst.user",
    action: "Database Query",
    resource: "Analytics DB",
    status: "warning",
    today: true,
    week: true
  }
]