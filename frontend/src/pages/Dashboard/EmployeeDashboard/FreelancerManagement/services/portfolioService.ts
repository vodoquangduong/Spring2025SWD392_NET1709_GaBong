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
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      console.log(`Fetching portfolio for freelancer ID: ${freelancerId}`);
      const response = await fetch(
        `${API_URL}/api/Portfolio/pending/${freelancerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to fetch portfolio";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If we can't parse the error as JSON, use default message
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching portfolio by freelancer ID:", error);
      throw error;
    }
  },

  getFreelancerIdFromPortfolio: async (
    portfolioId: number
  ): Promise<number> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Use the pending portfolios API to find this portfolio
      const response = await fetch(
        `${API_URL}/api/Portfolio/pending?PageSize=100&PageNumber=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch portfolios");
      }

      const data = await response.json();
      const portfolios = data.value?.items || [];
      const matchingPortfolio = portfolios.find(
        (p: any) => p.portfolioId === portfolioId
      );

      if (!matchingPortfolio) {
        throw new Error(`Portfolio with ID ${portfolioId} not found`);
      }

      return matchingPortfolio.freelancerId;
    } catch (error: any) {
      console.error("Error getting freelancerId from portfolio:", error);
      throw error;
    }
  },

  // New method to get basic portfolio info to extract freelancerId
  getInitialPortfolioData: async (
    portfolioId: number
  ): Promise<{ portfolioId: number; freelancerId: number }> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Get just enough data to extract the freelancerId
      const response = await fetch(`${API_URL}/api/Portfolio/${portfolioId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio information");
      }

      const data = await response.json();
      const portfolioData = data.value || data;

      return {
        portfolioId: portfolioData.portfolioId,
        freelancerId: portfolioData.freelancerId,
      };
    } catch (error: any) {
      console.error("Error fetching initial portfolio data:", error);
      throw error;
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
