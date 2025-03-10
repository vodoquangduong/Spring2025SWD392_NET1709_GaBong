import { Account } from "@/pages/Dashboard/EmployeeDashboard/AccountManagement/models/types";

export interface Bid {
  bidDescription: string;
  bidId: number;
  bidOffer: number;
  bidOwner: Account;
  bidOwnerId: string;
  bidStatus: string;
  projectId: string;
  createdAt: string;
}
