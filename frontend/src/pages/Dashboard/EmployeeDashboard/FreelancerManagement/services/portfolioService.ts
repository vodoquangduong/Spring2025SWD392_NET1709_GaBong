import { getCookie } from "../../../../../modules/cookie";
import { PendingPortfolio, PendingPortfoliosResponse } from "../models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const portfolioService = {
  getPendingPortfolios: async (
    pageSize = 10,
    pageNumber = 1
  ): Promise<PendingPortfoliosResponse> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(
        `${API_URL}/api/Portfolio/pending?PageSize=${pageSize}&PageNumber=${pageNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to get pending portfolios";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to get pending portfolios";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  getPortfolioById: async (portfolioId: number): Promise<PendingPortfolio> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }
      const pendingResponse = await fetch(`${API_URL}/api/Portfolio/pending`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!pendingResponse.ok) {
        throw new Error("Failed to get portfolio information");
      }

      const pendingData = await pendingResponse.json();
      const portfolios = pendingData.value.items;
      const portfolioInfo = portfolios.find(
        (p: PendingPortfolio) => p.portfolioId === portfolioId
      );

      if (!portfolioInfo) {
        throw new Error("Portfolio not found");
      }

      const response = await fetch(
        `${API_URL}/api/Portfolio/pending/${portfolioInfo.freelancerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to get portfolio details";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to get portfolio details";
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Extract data from correct path based on API response structure
      const dataValue = data.value || data;

      // Normalize skillPerform data - ensure it's an array regardless of API response format
      const combinedData = {
        ...portfolioInfo,
        ...dataValue,
      };

      return combinedData;
    } catch (error: any) {
      throw error;
    }
  },

  verifyPortfolio: async (
    portfolioId: number,
    status: number
  ): Promise<boolean> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(
        `${API_URL}/api/Portfolio/verify/${portfolioId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to verify portfolio";
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to verify portfolio";
        }
        throw new Error(errorMessage);
      }

      return true;
    } catch (error: any) {
      throw error;
    }
  },

  getPendingPortfolioByFreelancerId: async (
    freelancerId: number
  ): Promise<PendingPortfolio> => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(
        `${API_URL}/api/Portfolio/pending/${freelancerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch portfolio");
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch portfolio details");
    }
  },

  // Helper to normalize skill data from a portfolio
  normalizeSkillData: (
    portfolio: PendingPortfolio
  ): { name: string; level?: number }[] => {
    // First try to use skillPerform data if available
    if (portfolio.skillPerform && portfolio.skillPerform.length > 0) {
      return portfolio.skillPerform.map((skillItem) => {
        // Handle both API formats (skill or skills)
        const skill = skillItem.skill || skillItem.skills;
        return {
          name: skill ? skill.skillName : "Unknown Skill",
          level: skillItem.skillLevel,
        };
      });
    }

    // Fallback to parsing works JSON
    try {
      if (portfolio.works && portfolio.works !== "string") {
        const worksData = JSON.parse(portfolio.works);
        if (worksData.skills && Array.isArray(worksData.skills)) {
          return worksData.skills;
        }
      }
    } catch (e) {
      console.error("Error parsing works data:", e);
    }

    // Return empty array if no skill data found
    return [];
  },

  // Get skill level name based on level number
  getSkillLevelName: (level?: number): string => {
    switch (level) {
      case 0:
        return "Entry";
      case 1:
        return "Intermediate";
      case 2:
        return "Advanced";
      default:
        return "Unknown";
    }
  },

  // Get skill level color based on level number
  getSkillLevelColor: (level?: number): string => {
    switch (level) {
      case 0:
        return "red";
      case 1:
        return "gold";
      case 2:
        return "green";
      default:
        return "default";
    }
  },
};
