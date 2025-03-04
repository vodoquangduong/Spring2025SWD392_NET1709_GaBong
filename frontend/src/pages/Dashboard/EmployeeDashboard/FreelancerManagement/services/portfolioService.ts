import { getCookie } from "../../../../../modules/cookie";

const API_URL = import.meta.env.VITE_SERVER_URL;

export interface PendingPortfolio {
  portfolioId: number;
  freelancerId: number;
  title: string;
  works: string;
  certificate: string;
  about: string;
  status: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarURL: string;
  birthday: string;
  gender: number;
  nationality: string;
  reputationPoint: number;
}

export interface PendingPortfoliosResponse {
  value: {
    items: PendingPortfolio[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
}

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

      // Đầu tiên, lấy thông tin portfolio từ API pending để có được freelancerId
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

      // Sau đó, sử dụng freelancerId để lấy thông tin chi tiết từ API public
      const response = await fetch(
        `${API_URL}/api/Portfolio/public/${portfolioInfo.freelancerId}`,
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

      // Kết hợp dữ liệu từ cả hai API để có thông tin đầy đủ
      const combinedData = {
        ...portfolioInfo,
        ...(data.value || data),
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
};
