import { Account } from "./account";

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
