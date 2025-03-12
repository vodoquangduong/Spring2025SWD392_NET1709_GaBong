import { Account, UpdateAccountRequest } from "../models/types";
import { accountMngService } from "../services/accountMngService";

export const accountMngUsecase = {
  getAccounts: async (): Promise<Account[]> => {
    try {
      const response = await accountMngService.getAllAccounts();
      return response.items || [];
    } catch (error) {
      console.error("Error in getAccounts usecase:", error);
      return [];
    }
  },

  getAccountById: async (accountId: number): Promise<Account | null> => {
    try {
      const response = await accountMngService.getAccountById(accountId);
      if (response.isSuccess && response.value) {
        return response.value;
      }
      return null;
    } catch (error) {
      console.error(
        `Error in getAccountById usecase for ID ${accountId}:`,
        error
      );
      return null;
    }
  },

  updateAccount: async (account: UpdateAccountRequest): Promise<boolean> => {
    try {
      await accountMngService.updateAccount(account);
      return true;
    } catch (error) {
      console.error("Error in updateAccount usecase:", error);
      return false;
    }
  },

  // Helper functions for UI display
  getRoleName: (role: number): string => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Staff";
      case 2:
        return "Client";
      case 3:
        return "Freelancer";
      default:
        return "Unknown";
    }
  },

  getStatusName: (status: number): string => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Inactive";
      case 2:
        return "Suspended";
      default:
        return "Unknown";
    }
  },

  getGenderName: (gender: number): string => {
    switch (gender) {
      case 0:
        return "Male";
      case 1:
        return "Female";
      case 2:
        return "Other";
      default:
        return "Not specified";
    }
  },
};
