import { getCookie } from "../../../../../modules/cookie";
import { VerifiedPortfoliosResponse } from "../models/searchFreelancerModel";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const portfolioService = {
  getVerifiedPortfolios: async (
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<VerifiedPortfoliosResponse> => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(
        `${API_URL}/api/Portfolio/verified?PageNumber=${pageNumber}&PageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch verified portfolios");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching verified portfolios:", error);
      throw error;
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
};
