import { RegisterRequest, RegisterResponse } from "../models/register.model";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const registerService = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await fetch(`${API_URL}api/Authentication/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Kiểm tra Content-Type của response
      const contentType = response.headers.get("content-type");
      let responseData;

      if (contentType && contentType.includes("application/json")) {
        // Nếu là JSON thì parse JSON
        responseData = await response.json();
      } else {
        // Nếu không phải JSON thì đọc text
        const text = await response.text();
        responseData = { message: text };
      }

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      return responseData;
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        throw new Error(
          "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng."
        );
      }
      throw error;
    }
  },
};
