import type { UserRow } from "@/lib/types"

// Mock data for users
export const usersMock: UserRow[] = [
  {
    id: "1",
    company: "NexG Industries",
    email: "john.doe@nexg.com",
    phone: "+1 (555) 123-4567",
    role: "Both",
    kyc: "Verified",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    company: "Tech Solutions Ltd",
    email: "jane.smith@nexg.com",
    phone: "+1 (555) 987-6543",
    role: "Both",
    kyc: "Verified",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    company: "Global Enterprises",
    email: "robert.j@nexg.com",
    phone: "+1 (555) 456-7890",
    role: "Buyer",
    kyc: "Pending",
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    company: "Innovative Corp",
    email: "emily.d@nexg.com",
    phone: "+1 (555) 234-5678",
    role: "Both",
    kyc: "Verified",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    company: "Premium Services",
    email: "michael.w@nexg.com",
    phone: "+1 (555) 876-5432",
    role: "Seller",
    kyc: "Rejected",
    createdAt: "2024-01-08",
  },
];