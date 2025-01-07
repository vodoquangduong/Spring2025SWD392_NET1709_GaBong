import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Role } from "../types";
import { setCookie } from "../libs/cookie";

const useAuthStore = create<{
  isAuthenticated: boolean;
  email: string;
  name: string;
  avatar: string;
  role: Role;
  login: (user: any) => void;
  logout: () => void;
}>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      email: "",
      name: "",
      avatar: "",
      role: Role.Guest,
      login: (userInfo: any) => {
        set({
          isAuthenticated: true,
          email: userInfo.email,
          name: userInfo.email,
          avatar: userInfo.email,
          role: userInfo.role,
        });
      },
      logout: () => {
        setCookie("accessToken", "", 0);
        set({
          isAuthenticated: false,
          email: "",
          name: "",
          avatar: "",
          role: Role.Guest,
        });
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
