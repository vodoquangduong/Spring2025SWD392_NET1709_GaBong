import {
  Account,
  PaginationParams,
  UpdateAccountRequest,
} from "../models/types";
import { accountMngService } from "../services/accountMngService";

export const accountMngUsecase = {
  getAccounts: async (
    params?: PaginationParams
  ): Promise<{
    accounts: Account[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> => {
    try {
      const response = await accountMngService.getAllAccounts(params);
      return {
        accounts: response.items || [],
        pageNumber: response.pageNumber || 1,
        pageSize: response.pageSize || 10,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 1,
        hasPreviousPage: response.hasPreviousPage || false,
        hasNextPage: response.hasNextPage || false,
      };
    } catch (error) {
      console.error("Error in getAccounts usecase:", error);
      return {
        accounts: [],
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        totalCount: 0,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      };
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
        return "Freelancer";
      case 3:
        return "Client";
      default:
        return "Unknown";
    }
  },

  getStatusName: (status: number): string => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Suspended";
      case 2:
        return "Banned";
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
