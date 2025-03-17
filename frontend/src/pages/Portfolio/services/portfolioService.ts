import { getCookie } from "../../../modules/cookie";
import { CreatePortfolioDTO, PortfolioDTO } from "../models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const portfolioService = {
  createPortfolio: async (
    portfolioData: CreatePortfolioDTO
  ): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const apiData = {
        title: portfolioData.title,
        works: portfolioData.works,
        certificate: portfolioData.certificate,
        about: portfolioData.about,
        status: portfolioData.status || 3,
        skillPerforms: portfolioData.skillPerforms || [],
      };

      const response = await fetch(`${API_URL}/api/Portfolio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to create portfolio";
        } catch {
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage =
              response.status >= 500
                ? "Server error. Please try again later."
                : "Failed to create portfolio";
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.value || data;
    } catch (error: any) {
      throw error;
    }
  },

  getPortfolioById: async (portfolioId: number): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("accessToken");
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
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || "Failed to get portfolio";
        } catch {
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage =
              response.status >= 500
                ? "Server error. Please try again later."
                : "Failed to get portfolio";
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.value || data;
    } catch (error: any) {
      throw error;
    }
  },

  getPortfolioByFreelancerId: async (
    freelancerId: number
  ): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("accessToken");
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

      // If portfolio not found (404), return null
      if (response.status === 404) {
        return null as any;
      }

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || "Failed to get portfolio";
        } catch {
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage =
              response.status >= 500
                ? "Server error. Please try again later."
                : "Failed to get portfolio";
          }
        }

        // If the error is related to "portfolio not found", return null
        if (
          errorMessage.includes("not found") ||
          errorMessage.includes("No portfolio")
        ) {
          return null as any;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.value || data;
    } catch (error: any) {
      // If the error is 404 or related to "not found", return null
      if (
        error.message &&
        (error.message.includes("404") ||
          error.message.includes("not found") ||
          error.message.includes("No portfolio"))
      ) {
        return null as any;
      }
      throw error;
    }
  },

  // Modified to handle experiences only (skills are completely removed)
  parseWorks: (experiences: any[]): string => {
    // Make sure experiences are in the correct format
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
      isCurrentPosition:
        exp.isCurrentPosition !== undefined
          ? exp.isCurrentPosition
          : !exp.endDate,
    }));

    // Create a works object with only experiences, completely removing the skills field
    const worksObject = {
      experiences: processedExperiences || [],
    };

    // Convert to JSON string
    return JSON.stringify(worksObject);
  },

  // Function to convert certificate data to JSON string
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

  updatePortfolio: async (
    portfolioId: number,
    portfolioData: CreatePortfolioDTO
  ): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const apiData = {
        portfolioId: portfolioId,
        title: portfolioData.title,
        works: portfolioData.works,
        certificate: portfolioData.certificate,
        about: portfolioData.about,
        status: portfolioData.status || 3,
        skillPerforms: portfolioData.skillPerforms || [],
      };

      const response = await fetch(`${API_URL}/api/Portfolio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to update portfolio";
        } catch {
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage =
              response.status >= 500
                ? "Server error. Please try again later."
                : "Failed to update portfolio";
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data.value || data;
    } catch (error: any) {
      throw error;
    }
  },

  submitPortfolioForVerification: async (): Promise<boolean> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      const response = await fetch(
        `${API_URL}/api/Portfolio/freelancer-submit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If status code is 2xx, consider it successful
      if (response.ok) {
        try {
          const data = await response.json();
          return data.isSuccess !== undefined ? data.isSuccess : true;
        } catch {
          return true;
        }
      }

      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message ||
          errorData.error ||
          "Failed to submit portfolio for verification";
      } catch {
        try {
          errorMessage = await response.text();
        } catch {
          errorMessage =
            response.status >= 500
              ? "Server error. Please try again later."
              : "Failed to submit portfolio for verification";
        }
      }

      throw new Error(errorMessage);
    } catch (error: any) {
      throw error;
    }
  },
};
