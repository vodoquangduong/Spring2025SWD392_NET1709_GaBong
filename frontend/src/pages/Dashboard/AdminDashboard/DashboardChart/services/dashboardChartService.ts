import { getCookie } from "@/modules/cookie";
import { Account } from "../../AccountManagement/models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const dashboardChartService = {
  getAllAccountsForDashboard: async (): Promise<Account[]> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Account/get-all-account?pageNumber=1&pageSize=10000`;

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
            "Failed to fetch accounts for dashboard";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to fetch accounts for dashboard";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching accounts for dashboard:", error);
      throw error;
    }
  },
};
