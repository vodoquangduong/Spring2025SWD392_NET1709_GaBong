import { getCookie } from "../../../modules/cookie";
import { PublicPortfolio } from "../models/freelancerModel";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const freelancerService = {
  getPublicPortfolio: async (
    freelancerId: string
  ): Promise<PublicPortfolio> => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(
        `${API_URL}/api/Portfolio/public/${freelancerId}`,
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
};
