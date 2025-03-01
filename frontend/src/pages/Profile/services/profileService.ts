import { getCookie } from "../../../modules/cookie";
import { UserProfileData } from "../models/types";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const profileService = {
  getProfile: async (id: number): Promise<UserProfileData> => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(`${API_URL}/api/Account/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch profile");
      }

      const data = await response.json();
      console.log("Raw API response:", data);

      if (data.isSuccess && data.value) {
        console.log("API response value:", data.value);

        // Map API response to our interface
        const mappedData: UserProfileData = {
          accountId: data.value.accountId,
          role: data.value.role,
          name: data.value.name,
          email: data.value.email,
          phone: data.value.phone || "",
          address: data.value.address || "",
          avatarURL: data.value.avatarURL,
          birthday: data.value.birthday || new Date().toISOString(),
          gender: data.value.gender || 1,
          nationality: data.value.nationality || "",
          reputationPoint: data.value.reputationPoint || 0,
          totalCredit: data.value.totalCredit || 0,
          lockCredit: data.value.lockCredit || 0,
          createdAt: data.value.createdAt || new Date().toISOString(),
          status: data.value.status || 0,
        };

        console.log("Mapped data:", mappedData);
        return mappedData;
      }

      throw new Error("Invalid API response format");
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch profile");
    }
  },

  updateProfile: async (
    id: number,
    data: Partial<UserProfileData>
  ): Promise<UserProfileData> => {
    try {
      const token = getCookie("accessToken");
      const response = await fetch(`${API_URL}/api/Account/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to update profile");
      }

      const responseData = await response.json();
      console.log("Update profile response:", responseData);

      if (responseData.isSuccess && responseData.value) {
        return {
          accountId: responseData.value.accountId,
          role: responseData.value.role,
          name: responseData.value.name,
          email: responseData.value.email,
          phone: responseData.value.phone || "",
          address: responseData.value.address || "",
          avatarURL: responseData.value.avatarURL,
          birthday: responseData.value.birthday || new Date().toISOString(),
          gender: responseData.value.gender || 1,
          nationality: responseData.value.nationality || "",
          reputationPoint: responseData.value.reputationPoint || 0,
          totalCredit: responseData.value.totalCredit || 0,
          lockCredit: responseData.value.lockCredit || 0,
          createdAt: responseData.value.createdAt || new Date().toISOString(),
          status: responseData.value.status || 0,
        };
      }

      throw new Error("Invalid API response format");
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile");
    }
  },
};
