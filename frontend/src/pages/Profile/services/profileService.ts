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

      // Map API response to our interface
      const mappedData: UserProfileData = {
        accountId: data.accountId,
        role: data.role,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        address: data.address || "",
        avatarURL: data.avatarURL,
        birthday: data.birthday || new Date().toISOString(),
        gender: data.gender || 1,
        nationality: data.nationality || "",
        reputationPoint: data.reputationPoint || 0,
        totalCredit: data.totalCredit || 0,
        lockCredit: data.lockCredit || 0,
        createdAt: data.createdAt || new Date().toISOString(),
        status: data.status || 0,
      };

      console.log("Mapped data:", mappedData);
      return mappedData;
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

      const updatedData = await response.json();
      return updatedData;
    } catch (error: any) {
      throw new Error(error.message || "Failed to update profile");
    }
  },
};
