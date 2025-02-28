import { Account } from "@/pages/Dashboard/EmployeeDashboard/AccountManagement/models/types";

export interface Bid {
  bidId: number;
  bidOwnerId: string;
  bidOffer: number;
  bidDescription: string;
  bidStatus: string;
  bidCreatedAt: string;
  bidUpdatedAt: string;
  bidOwner: Account;
}
