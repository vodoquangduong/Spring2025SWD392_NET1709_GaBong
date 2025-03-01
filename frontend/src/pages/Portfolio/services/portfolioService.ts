import { getCookie } from "../../../modules/cookie";
import { CreatePortfolioDTO, PortfolioDTO } from "../models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const portfolioService = {
  createPortfolio: async (
    portfolioData: CreatePortfolioDTO
  ): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      console.log("Sending portfolio data to API:", portfolioData);

      const response = await fetch(`${API_URL}/api/Portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create portfolio");
      }

      const data = await response.json();
      console.log("API Response:", data);

      return data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw new Error(error.message || "Failed to create portfolio");
    }
  },

  getPortfolioById: async (portfolioId: number): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(`${API_URL}/api/Portfolio/${portfolioId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to get portfolio");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw new Error(error.message || "Failed to get portfolio");
    }
  },

  getPortfolioByFreelancerId: async (
    freelancerId: number
  ): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(
        `${API_URL}/api/Portfolio/freelancer/${freelancerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to get portfolio");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("API Error:", error);
      throw new Error(error.message || "Failed to get portfolio");
    }
  },

  // Hàm chuyển đổi dữ liệu kinh nghiệm làm việc thành chuỗi JSON
  parseWorks: (skills: string[], experiences: any[]): string => {
    const processedExperiences = experiences.map((exp) => ({
      position: exp.position,
      company: exp.company,
      startDate: exp.startDate
        ? typeof exp.startDate === "object" && exp.startDate.format
          ? exp.startDate.format("YYYY-MM-DD")
          : exp.startDate
        : null,
      endDate: exp.endDate
        ? typeof exp.endDate === "object" && exp.endDate.format
          ? exp.endDate.format("YYYY-MM-DD")
          : exp.endDate
        : null,
      description: exp.description,
      isCurrentPosition: !exp.endDate,
    }));

    return JSON.stringify({
      skills: skills || [],
      experiences: processedExperiences || [],
    });
  },

  // Hàm chuyển đổi dữ liệu chứng chỉ thành chuỗi JSON
  parseCertificates: (certificates: any[]): string => {
    const processedCertificates = certificates.map((cert) => ({
      title: cert.title,
      url: cert.url || "",
      issueDate: cert.issueDate
        ? typeof cert.issueDate === "object" && cert.issueDate.format
          ? cert.issueDate.format("YYYY-MM-DD")
          : cert.issueDate
        : null,
    }));

    return JSON.stringify(processedCertificates || []);
  },
};
