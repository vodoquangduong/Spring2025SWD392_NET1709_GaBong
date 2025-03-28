import { getCookie } from "@/modules/cookie";
import { Account } from "../../AccountManagement/models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

// Interface for portfolio with reputation
export interface TopFreelancerWithReputation {
  accountId: number;
  role: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatarURL: string;
  birthday: string;
  gender: number;
  nationality: string;
  reputationPoint: number;
  totalCredit: number;
  lockCredit: number;
  createdAt: string;
  status: number;
}

// Interface for revenue data point
export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

// Interface for report data
export interface ReportData {
  reportId: number;
  reporterId: number;
  reportedId: number;
  reportType: number;
  reportContent: string;
  status: number;
  createdAt: string;
}

// Interface for system configuration data
export interface SystemConfigData {
  paymentPolicy: {
    projectFee: number;
    bidFee: number;
    withdrawalFee: number;
  };
  reputationPolicy: {
    beforeDeadline: number;
    rightDeadline: number;
    earlylateDeadline: number;
    lateDeadline: number;
    completeProject: number;
  };
}

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

  // Get total freelancers count
  getTotalFreelancers: async (): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/total-freelancer`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch total freelancers count");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching total freelancers:", error);
      throw error;
    }
  },

  // Get pending projects count
  getTotalPendingProjects: async (): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/total-pending-projects`; // Fix typo: tota1 -> total
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pending projects count");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching pending projects:", error);
      throw error;
    }
  },

  // Get verified projects count
  getTotalVerifiedProjects: async (): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/total-verified-projects`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch verified projects count");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching verified projects:", error);
      throw error;
    }
  },

  // Get reverify projects count
  getTotalReverifyProjects: async (): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/total-reverify-projects`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reverify projects count");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching reverify projects:", error);
      throw error;
    }
  },

  // Get ongoing projects count
  getTotalOngoingProjects: async (): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/total-ongoing-projects`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ongoing projects count");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching ongoing projects:", error);
      throw error;
    }
  },

  // Get completed projects count
  getTotalCompletedProjects: async (): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/total-completed-projects`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch completed projects count");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching completed projects:", error);
      throw error;
    }
  },

  // Get total revenue
  getTotalRevenue: async (): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/total-revenue`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch total revenue");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching total revenue:", error);
      throw error;
    }
  },

  // Get top ten freelancers by reputation
  getTopTenReputation: async (): Promise<TopFreelancerWithReputation[]> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/top-ten-reputation`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch top freelancers");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching top freelancers:", error);
      throw error;
    }
  },

  // Get revenue graph data
  getRevenueGraph: async (
    startDate: string,
    endDate: string,
    groupBy: string
  ): Promise<RevenueDataPoint[]> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/revenue-graph?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch revenue graph data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching revenue graph data:", error);
      throw error;
    }
  },

  // Get revenue list
  getRevenueList: async (
    startDate: string,
    endDate: string
  ): Promise<RevenueDataPoint[]> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Admin/revenue-list?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch revenue list");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching revenue list:", error);
      throw error;
    }
  },

  // Get all reports without pagination
  getAllReportsForDashboard: async (): Promise<ReportData[]> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const url = `${API_URL}/api/Report?pageNumber=1&pageSize=10000`;

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
            "Failed to fetch reports for dashboard";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to fetch reports for dashboard";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching reports for dashboard:", error);
      throw error;
    }
  },

  // Get system configuration data
  getSystemConfigForDashboard: async (): Promise<SystemConfigData> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(`${API_URL}/api/Admin/get-admin-config`, {
        method: "GET",
        headers: {
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
            "Failed to get configuration";
        } catch {
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage =
              response.status >= 500
                ? "Server error. Please try again later."
                : "Failed to get configuration";
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data; // Trả về trực tiếp vì cấu trúc đã đúng
    } catch (error) {
      console.error("Error fetching system configuration:", error);
      throw error;
    }
  },

  // Get report statistics
  getReportStatistics: async () => {
    try {
      const reports = await dashboardChartService.getAllReportsForDashboard();

      const totalReports = reports.length;
      const pendingReports = reports.filter((r) => r.status === 1).length;
      const resolvedReports = reports.filter((r) => r.status === 2).length;
      const rejectedReports = reports.filter((r) => r.status === 3).length;

      return {
        totalReports,
        pendingReports,
        resolvedReports,
        rejectedReports,
      };
    } catch (error) {
      console.error("Error calculating report statistics:", error);
      throw error;
    }
  },
};
