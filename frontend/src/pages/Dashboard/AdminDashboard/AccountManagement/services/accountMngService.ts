import { getCookie } from "@/modules/cookie";
import {
  AccountDetailResponse,
  AccountsResponse,
  CreateAccountRequest,
  FilteredAccountsParams,
  FilteredAccountsResponse,
  PaginationParams,
  UpdateAccountRequest,
} from "../models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const accountMngService = {
  getAllAccounts: async (
    params?: PaginationParams
  ): Promise<AccountsResponse> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Build query string with pagination parameters
      const queryParams = new URLSearchParams();
      if (params) {
        queryParams.append("pageNumber", params.pageNumber.toString());
        queryParams.append("pageSize", params.pageSize.toString());

        // Add optional filter parameters if provided
        if (params.searchText) {
          queryParams.append("searchText", params.searchText);
        }
        if (params.roleFilter !== undefined) {
          queryParams.append("role", params.roleFilter.toString());
        }
        if (params.statusFilter !== undefined) {
          queryParams.append("status", params.statusFilter.toString());
        }
      }

      const queryString = queryParams.toString();
      const url = `${API_URL}/api/Account/get-all-account${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || "Failed to fetch accounts";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to fetch accounts";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching accounts:", error);
      throw error;
    }
  },

  getAccountById: async (accountId: number): Promise<AccountDetailResponse> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(`${API_URL}/api/Account/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            `Failed to fetch account with ID ${accountId}`;
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : `Failed to fetch account with ID ${accountId}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching account with ID ${accountId}:`, error);
      throw error;
    }
  },

  createAccount: async (accountData: CreateAccountRequest): Promise<any> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Fix: Include "Account" in the URL path
      const response = await fetch(`${API_URL}/api/Account/Create Account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(accountData),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || "Failed to create account";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to create account";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  },

  updateAccount: async (account: UpdateAccountRequest): Promise<any> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(`${API_URL}/api/Account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(account),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || "Failed to update account";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to update account";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating account:", error);
      throw error;
    }
  },

  updateAccountStatus: async (
    accountId: number,
    status: number
  ): Promise<any> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(
        `${API_URL}/api/Account/update-account-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            accountId: accountId,
            status: status.toString(),
          }),
        }
      );

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to update account status";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to update account status";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating account status:", error);
      throw error;
    }
  },

  getFilteredAccounts: async (
    params: FilteredAccountsParams
  ): Promise<FilteredAccountsResponse> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Build query string with filter parameters
      const queryParams = new URLSearchParams();
      queryParams.append("pageSize", params.pageSize.toString());
      queryParams.append("pageNumber", params.pageNumber.toString());

      if (params.accountName) {
        queryParams.append("accountName", params.accountName);
      }
      if (params.accountRole) {
        queryParams.append("accountRole", params.accountRole);
      }
      if (params.accountStatus) {
        queryParams.append("accountStatus", params.accountStatus);
      }
      if (params.sortBy) {
        queryParams.append("sortBy", params.sortBy);
      }

      const queryString = queryParams.toString();
      const url = `${API_URL}/api/Account/get-all-account-filtered${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to fetch filtered accounts";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to fetch filtered accounts";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching filtered accounts:", error);
      throw error;
    }
  },

  getAccountTransactions: async (accountId: number): Promise<any[]> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(`${API_URL}/api/Transaction/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            `Failed to fetch transactions for account ${accountId}`;
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : `Failed to fetch transactions for account ${accountId}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Error fetching transactions for account ${accountId}:`,
        error
      );
      throw error;
    }
  },
};
