import useAuthStore from "../../../stores/authStore";
import { RegisterRequest } from "../models/register.model";
import { registerService } from "../services/registerService";

export const registerUseCase = {
  register: async (data: RegisterRequest) => {
    try {
      const response = await registerService.register(data);

      // Nếu đăng ký thành công và có token, lưu token vào authStore
      if (response.token) {
        const authStore = useAuthStore.getState();
        authStore.login(response.token);
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
};
