import useAuthStore from "../../../stores/authStore";
import { LoginRequest } from "../models/types";
import { loginService } from "../services/loginService";

export const loginUseCase = {
  login: async (data: LoginRequest) => {
    try {
      const response = await loginService.login(data);

      // Nếu login thành công và có token
      if (response.token) {
        // Lưu token và thông tin user vào authStore
        const authStore = useAuthStore.getState();
        authStore.login(response.token);
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
};
