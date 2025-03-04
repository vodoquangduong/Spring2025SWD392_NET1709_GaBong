import { getCookie } from "../../../../../modules/cookie";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const portfolioService = {
  getVerifiedPortfolios: async (
    pageNumber: number = 1,
    pageSize: number = 10
  ) => {
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

      if (!response.ok) throw new Error("Failed to fetch verified portfolios");
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
