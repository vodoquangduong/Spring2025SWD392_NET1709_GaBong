import useAuthStore from "../../../stores/authStore";
import { UserProfileData } from "../models/types";
import { profileService } from "../services/profileService";

export const profileUseCase = {
  getProfile: async () => {
    try {
      const authStore = useAuthStore.getState();
      if (!authStore.isAuthenticated) {
        throw new Error("User not authenticated");
      }

      if (!authStore.accountId) {
        throw new Error("Account ID not found");
      }

      console.log("Getting profile for account ID:", authStore.accountId);
      const response = await profileService.getProfile(authStore.accountId);
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (data: Partial<UserProfileData>) => {
    try {
      const authStore = useAuthStore.getState();
      if (!authStore.isAuthenticated) {
        throw new Error("User not authenticated");
      }

      if (!authStore.accountId) {
        throw new Error("Account ID not found");
      }

      const response = await profileService.updateProfile(
        authStore.accountId,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
