import { LoginRequest, LoginResponse } from "../models/types";

export const loginService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const API_URL = import.meta.env.VITE_SERVER_URL;
    try {
      const response = await fetch(`${API_URL}/api/Authentication/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Login failed");
      }

      return responseData;
    } catch (error: any) {
      if (error.message === "Failed to fetch") {
        throw new Error(
          "Cannot connect to server. Please check your connection."
        );
      }
      throw error;
    }
  },
};
