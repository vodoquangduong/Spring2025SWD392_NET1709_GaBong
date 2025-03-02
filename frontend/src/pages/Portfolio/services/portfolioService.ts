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

      // Đảm bảo dữ liệu đúng định dạng theo mẫu đã test thành công
      const apiData = {
        title: portfolioData.title,
        works: portfolioData.works,
        certificate: portfolioData.certificate,
        about: portfolioData.about,
        status: 3,
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
        let errorMessage = "";

        // Xử lý riêng cho lỗi 405 Method Not Allowed
        if (response.status === 405) {
          errorMessage =
            "Method Not Allowed (405): The API endpoint does not support this operation.";
          console.error(errorMessage);
          throw new Error(errorMessage);
        }

        try {
          // Try to parse as JSON first
          const errorData = await response.json();
          console.error("API error response:", errorData);

          if (errorData) {
            if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.error) {
              errorMessage = errorData.error;
            } else if (errorData.errors) {
              const errorMessages = Object.values(errorData.errors).flat();
              errorMessage = errorMessages.join(", ");
            } else if (typeof errorData === "string") {
              errorMessage = errorData;
            } else {
              errorMessage = JSON.stringify(errorData);
            }
          }
        } catch (jsonError) {
          // If not JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = errorText;
            }
            console.error("API error response (text):", errorText);
          } catch (textError) {
            console.error("Could not parse error response as text");
            errorMessage = "Unknown error";
          }
        }

        if (!errorMessage) {
          errorMessage = `API Error (${response.status})`;
        }

        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.isSuccess && data.value) {
        return data.value;
      }

      // Nếu response trả về trực tiếp đối tượng portfolio
      if (data.portfolioId !== undefined) {
        return data;
      }

      throw new Error("Invalid API response format");
    } catch (error: any) {
      console.error("API Error:", error);
      throw error; // Trả về lỗi gốc thay vì tạo lỗi mới
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
        const errorText = await response.text();
        throw new Error(errorText || "Failed to get portfolio");
      }

      const data = await response.json();

      if (data.isSuccess && data.value) {
        return data.value;
      }

      throw new Error("Invalid API response format");
    } catch (error: any) {
      console.error("API Error:", error);
      throw new Error(error.message || "Failed to get portfolio");
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

      console.log(`Fetching portfolio for freelancer ID: ${freelancerId}`);

      const response = await fetch(
        `${API_URL}/api/Portfolio/freelancer/${freelancerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Nếu không tìm thấy portfolio (404), trả về null thay vì throw error
      if (response.status === 404) {
        console.log(
          `No portfolio found for freelancer ID: ${freelancerId}. This is normal for new users.`
        );
        return null as any; // Trả về null mà không hiển thị lỗi
      }

      if (!response.ok) {
        let errorMessage = `API Error (${response.status}): `;
        let errorData = null;

        try {
          // Try to parse as JSON first
          errorData = await response.json();
          console.error("API error response:", errorData);

          if (errorData) {
            if (errorData.message) {
              errorMessage += errorData.message;
            } else if (errorData.error) {
              errorMessage += errorData.error;
            } else if (errorData.errors) {
              const errorMessages = Object.values(errorData.errors).flat();
              errorMessage += errorMessages.join(", ");
            } else if (typeof errorData === "string") {
              errorMessage += errorData;
            } else {
              errorMessage += JSON.stringify(errorData);
            }
          }
        } catch (jsonError) {
          // If not JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage += errorText;
            }
            console.error("API error response (text):", errorText);
          } catch (textError) {
            console.error("Could not parse error response as text");
            errorMessage += "Unknown error";
          }
        }

        // Nếu lỗi liên quan đến "không tìm thấy portfolio", trả về null mà không throw error
        if (
          errorMessage.includes("not found") ||
          errorMessage.includes("No portfolio")
        ) {
          console.log(
            `Portfolio not found for freelancer ID: ${freelancerId}. This is normal for new users.`
          );
          return null as any;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      // Check if the response has the expected structure
      if (data.isSuccess && data.value) {
        return data.value;
      }

      // If the response is directly the portfolio object
      if (data.portfolioId !== undefined) {
        console.log("Using direct portfolio object format");
        return data;
      }

      // Nếu không có dữ liệu, trả về null
      if (!data || Object.keys(data).length === 0) {
        console.log(
          `Empty response for freelancer ID: ${freelancerId}. User may not have a portfolio yet.`
        );
        return null as any;
      }

      console.error("Unexpected API response format:", data);
      throw new Error("Invalid API response format");
    } catch (error: any) {
      // Nếu lỗi là 404 hoặc liên quan đến "not found", trả về null mà không throw error
      if (
        error.message &&
        (error.message.includes("404") ||
          error.message.includes("not found") ||
          error.message.includes("No portfolio"))
      ) {
        console.log(
          `Portfolio not found for freelancer ID: ${freelancerId}. This is normal for new users.`
        );
        return null as any;
      }

      console.error("API Error:", error);
      throw error;
    }
  },

  // Hàm chuyển đổi dữ liệu kinh nghiệm làm việc thành chuỗi JSON
  parseWorks: (skills: string[], experiences: any[]): string => {
    // Đảm bảo skills có định dạng đúng
    const processedSkills = skills.map((skill) => ({
      name: skill,
    }));

    // Đảm bảo experiences có định dạng đúng
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

    // Tạo đối tượng works và chuyển đổi thành chuỗi JSON
    const worksObject = {
      skills: processedSkills || [],
      experiences: processedExperiences || [],
    };

    // Chuyển đổi thành chuỗi JSON
    return JSON.stringify(worksObject);
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

  updatePortfolio: async (
    portfolioId: number,
    portfolioData: CreatePortfolioDTO
  ): Promise<PortfolioDTO> => {
    try {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      // Đảm bảo dữ liệu đúng định dạng theo mẫu đã test thành công
      const apiData = {
        title: portfolioData.title,
        works: portfolioData.works,
        certificate: portfolioData.certificate,
        about: portfolioData.about,
        status: 3,
      };

      console.log(
        `Updating portfolio ID ${portfolioId} with data:`,
        JSON.stringify(apiData, null, 2)
      );
      console.log("API URL:", `${API_URL}/api/Portfolio`);
      console.log("Token:", token.substring(0, 15) + "...");

      const response = await fetch(`${API_URL}/api/Portfolio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      });

      // Log response status và headers để debug
      console.log("API Response Status:", response.status);
      console.log(
        "API Response Headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        let errorMessage = "";

        // Xử lý riêng cho lỗi 405 Method Not Allowed
        if (response.status === 405) {
          errorMessage =
            "Method Not Allowed (405): The API endpoint does not support this operation.";
          console.error(errorMessage);
          throw new Error(errorMessage);
        }

        try {
          // Try to parse as JSON first
          const errorData = await response.json();
          console.error("API error response:", errorData);

          if (errorData) {
            if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.error) {
              errorMessage = errorData.error;
            } else if (errorData.errors) {
              const errorMessages = Object.values(errorData.errors).flat();
              errorMessage = errorMessages.join(", ");
            } else if (typeof errorData === "string") {
              errorMessage = errorData;
            } else {
              errorMessage = JSON.stringify(errorData);
            }
          }
        } catch (jsonError) {
          // If not JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = errorText;
            }
            console.error("API error response (text):", errorText);
          } catch (textError) {
            console.error("Could not parse error response as text");
            errorMessage = "Unknown error";
          }
        }

        if (!errorMessage) {
          errorMessage = `API Error (${response.status})`;
        }

        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Check if the response has the expected structure
      if (data.isSuccess && data.value) {
        return data.value;
      }

      // If the response is directly the portfolio object
      if (data.portfolioId !== undefined) {
        return data;
      }

      console.error("Unexpected API response format:", data);
      throw new Error("Invalid API response format");
    } catch (error: any) {
      console.error("API Error:", error);
      throw error;
    }
  },
};
