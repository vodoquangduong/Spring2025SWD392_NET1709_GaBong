import { getCookie } from "@/modules/cookie";
import { PaginationParams, Report, ReportsResponse } from "../models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

// Helper function to parse dates
const parseDateString = (dateStr: string): Date => {
  // Handle date format like "26-02-2025"
  if (dateStr && typeof dateStr === "string") {
    const [day, month, year] = dateStr.split("-").map(Number);
    if (day && month && year) {
      return new Date(year, month - 1, day);
    }
  }
  return new Date(dateStr);
};

export const reportMngService = {
  getAllReports: async (
    params?: PaginationParams
  ): Promise<ReportsResponse> => {
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
      }

      const queryString = queryParams.toString();
      const url = `${API_URL}/api/Report${
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
            errorData.message || errorData.error || "Failed to fetch reports";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to fetch reports";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      throw error;
    }
  },

  getReportById: async (reportId: number): Promise<Report> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      console.log(
        `Fetching report with ID ${reportId} from API: ${API_URL}/api/Report/${reportId}`
      );

      const response = await fetch(`${API_URL}/api/Report/${reportId}`, {
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
            `Failed to fetch report with ID ${reportId}`;
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : `Failed to fetch report with ID ${reportId}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      // Parse date string from API to Date object
      if (data.createdAt) {
        data.createdAt = parseDateString(data.createdAt);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching report with ID ${reportId}:`, error);
      throw error;
    }
  },
  updateReportStatus: async () => {
    // Update this function to send a PUT request to the API
  },
};
