import { getCookie } from "../../../../../modules/cookie";
import useAuthStore from "../../../../../stores/authStore";
import { Role } from "../../../../../types";
import { SystemConfig } from "../models/SystemConfig";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const systemConfigurationService = {
  getConfig: async (): Promise<SystemConfig> => {
    try {
      const token = getCookie("accessToken");
      const { role } = useAuthStore.getState();

      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      if (role !== Role.ADMIN) {
        throw new Error("Access denied. Admin role required.");
      }

      const response = await fetch(`${API_URL}/api/Admin/get-admin-config`, {
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
            errorData.message ||
            errorData.error ||
            "Failed to get configuration";
        } catch {
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage =
              response.status >= 500
                ? "Server error. Please try again later."
                : "Failed to get configuration";
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

  updateConfig: async (config: SystemConfig): Promise<void> => {
    try {
      const token = getCookie("accessToken");
      const { role } = useAuthStore.getState();

      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      if (role !== Role.ADMIN) {
        throw new Error("Access denied. Admin role required.");
      }

      const response = await fetch(`${API_URL}/api/Admin/update-admin-config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message ||
            errorData.error ||
            "Failed to update configuration";
        } catch {
          try {
            errorMessage = await response.text();
          } catch {
            errorMessage =
              response.status >= 500
                ? "Server error. Please try again later."
                : "Failed to update configuration";
          }
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      throw error;
    }
  },
};
