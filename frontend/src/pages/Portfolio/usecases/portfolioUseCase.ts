import {
  CreatePortfolioDTO,
  PortfolioDTO,
  SkillPerform,
} from "../models/types";
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

      if (portfolioData.title.length > 50) {
        throw new Error("Title must be less than 50 characters");
      }

      if (!portfolioData.about) {
        throw new Error("About information is required");
      }

      if (portfolioData.about.length > 500) {
        throw new Error("About must be less than 500 characters");
      }

      if (portfolioData.status === undefined) {
        portfolioData.status = 3;
      }

      // Validate skillPerforms
      if (
        !portfolioData.skillPerforms ||
        portfolioData.skillPerforms.length === 0
      ) {
        throw new Error("At least one skill is required");
      }

      // Check if works and certificate are valid JSON strings
      try {
        JSON.parse(portfolioData.works);
        JSON.parse(portfolioData.certificate);
      } catch (error) {
        console.error("Invalid JSON format:", error);
        throw new Error("Invalid data format");
      }

      console.log("Creating portfolio with data:", portfolioData);

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

  // Utility functions to process data
  parseWorks: (experiences: any[]): string => {
    return portfolioService.parseWorks(experiences);
  },

  parseCertificates: (certificates: any[]): string => {
    return portfolioService.parseCertificates(certificates);
  },

  // Format skill performs for API
  formatSkillPerforms: (
    skills: { skillId: number; level: number }[]
  ): SkillPerform[] => {
    return skills.map((skill) => ({
      skillId: skill.skillId,
      level: skill.level,
    }));
  },

  // Function to analyze portfolio data from API
  parsePortfolioData: (portfolioData: PortfolioDTO | null) => {
    if (!portfolioData) {
      return {
        title: "",
        about: "",
        experiences: [],
        certificates: [],
        skillPerforms: [],
      };
    }

    let worksData = { experiences: [] };
    let certificatesData = [];

    // Process skillPerformDTOs to match the format expected by the form
    let skillPerforms = portfolioData.skillPerformDTOs
      ? portfolioData.skillPerformDTOs.map((item) => ({
          skillId: item.skills ? item.skills.skillId : 0,
          level: item.skillLevel,
        }))
      : [];

    try {
      // Parse works data (now only for experiences)
      if (portfolioData.works) {
        console.log("Parsing works data:", portfolioData.works);
        worksData = JSON.parse(portfolioData.works);
        console.log("Parsed works data:", worksData);
      } else {
        console.warn("No works data available");
      }

      // Parse certificate data
      if (portfolioData.certificate) {
        console.log("Parsing certificate data:", portfolioData.certificate);
        certificatesData = JSON.parse(portfolioData.certificate);
        console.log("Parsed certificate data:", certificatesData);
      } else {
        console.warn("No certificate data available");
      }

      // Process experiences data to ensure correct format
      const processedExperiences = worksData.experiences
        ? worksData.experiences.map((exp: any) => ({
            ...exp,
            isCurrentPosition:
              exp.isCurrentPosition !== undefined
                ? exp.isCurrentPosition
                : !exp.endDate,
          }))
        : [];

      return {
        title: portfolioData.title || "",
        about: portfolioData.about || "",
        skillPerforms: skillPerforms,
        experiences: processedExperiences,
        certificates: certificatesData || [],
      };
    } catch (error) {
      console.error("Error parsing portfolio data:", error);
      return {
        title: portfolioData.title || "",
        about: portfolioData.about || "",
        skillPerforms: [],
        experiences: [],
        certificates: [],
      };
    }
  },

  updatePortfolio: async (
    portfolioId: number,
    portfolioData: CreatePortfolioDTO
  ): Promise<PortfolioDTO> => {
    try {
      // Check input data
      if (!portfolioData.title) {
        throw new Error("Title is required");
      }

      if (portfolioData.title.length > 50) {
        throw new Error("Title must be less than 50 characters");
      }

      if (!portfolioData.about) {
        throw new Error("About information is required");
      }

      if (portfolioData.about.length > 500) {
        throw new Error("About must be less than 500 characters");
      }

      // Make sure the status field is set
      if (portfolioData.status === undefined) {
        portfolioData.status = 3;
      }

      // Validate skillPerforms
      if (
        !portfolioData.skillPerforms ||
        portfolioData.skillPerforms.length === 0
      ) {
        throw new Error("At least one skill is required");
      }

      // Check if works and certificate are valid JSON strings
      try {
        JSON.parse(portfolioData.works);
        JSON.parse(portfolioData.certificate);
      } catch (error) {
        console.error("Invalid JSON format:", error);
        throw new Error("Invalid data format");
      }

      console.log("Updating portfolio with data:", portfolioData);

      // Call API Update Portfolio
      const result = await portfolioService.updatePortfolio(
        portfolioId,
        portfolioData
      );
      return result;
    } catch (error: any) {
      console.error("Error updating portfolio:", error);
      throw error;
    }
  },

  // Method to send portfolio for verification
  submitPortfolioForVerification: async (): Promise<boolean> => {
    try {
      const result = await portfolioService.submitPortfolioForVerification();
      return result;
    } catch (error: any) {
      console.error("Error submitting portfolio for verification:", error);
      throw error;
    }
  },
};
