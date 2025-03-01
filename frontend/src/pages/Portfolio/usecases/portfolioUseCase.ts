import { CreatePortfolioDTO, PortfolioDTO } from "../models/types";
import { portfolioService } from "../services/portfolioService";

export const portfolioUseCase = {
  createPortfolio: async (
    portfolioData: CreatePortfolioDTO
  ): Promise<PortfolioDTO> => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!portfolioData.title) {
        throw new Error("Title is required");
      }

      if (!portfolioData.about) {
        throw new Error("About information is required");
      }

      // Kiểm tra xem works và certificate có phải là chuỗi JSON hợp lệ không
      try {
        JSON.parse(portfolioData.works);
        JSON.parse(portfolioData.certificate);
      } catch (error) {
        console.error("Invalid JSON format:", error);
        throw new Error("Invalid data format");
      }

      console.log("Creating portfolio with data:", portfolioData);

      // Gọi API tạo portfolio
      const result = await portfolioService.createPortfolio(portfolioData);
      return result;
    } catch (error: any) {
      console.error("Error creating portfolio:", error);
      throw error;
    }
  },

  getPortfolioById: async (portfolioId: number): Promise<PortfolioDTO> => {
    try {
      return await portfolioService.getPortfolioById(portfolioId);
    } catch (error: any) {
      console.error("Error getting portfolio by ID:", error);
      throw error;
    }
  },

  getPortfolioByFreelancerId: async (
    freelancerId: number
  ): Promise<PortfolioDTO> => {
    try {
      return await portfolioService.getPortfolioByFreelancerId(freelancerId);
    } catch (error: any) {
      console.error("Error getting portfolio by freelancer ID:", error);
      throw error;
    }
  },

  // Hàm tiện ích để xử lý dữ liệu
  parseWorks: (skills: string[], experiences: any[]): string => {
    return portfolioService.parseWorks(skills, experiences);
  },

  parseCertificates: (certificates: any[]): string => {
    return portfolioService.parseCertificates(certificates);
  },
};
