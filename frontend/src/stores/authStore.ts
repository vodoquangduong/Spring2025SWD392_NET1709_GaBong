import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Role } from "../types";

import { jwtDecode } from "jwt-decode";
import { setCookie } from "../modules/cookie";
// const jwt_decode = decodeJWT;

interface User {
  email: string;
  name: string;
  avatar?: string;
  role: Role;
}

const useAuthStore = create<{
  isAuthenticated: boolean;
  accountId: number;
  email: string;
  name: string;
  avatar: string;
  role: Role;
  login: (token: string) => void;
  logout: () => void;
}>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accountId: 0,
      email: "",
      name: "",
      avatar: "",
      role: Role.GUEST,
      login: (token: string) => {
        // set({
        //   isAuthenticated: true,
        //   // email: userInfo.email,
        //   // name: userInfo.email,
        //   // avatar: userInfo.email,
        //   // role: userInfo.role,
        // });
        if (typeof token !== "string") {
          console.error("Invalid token:", token);
          return;
        }

        try {
          // Giải mã token để lấy thông tin người dùng
          const decoded: any = jwtDecode(token);

          if (decoded?.email) {
            console.log("Email:", decoded.email);
          } else {
            console.error("Email1 not found in token payload");
          }
          //const userInfo: User = decoded.user;

          // Lưu token vào cookie
          setCookie("accessToken", token, 7); // Token sẽ hết hạn sau 7 ngày
          // Cập nhật trạng thái trong store
          console.log("Token:", decoded);

          set({
            isAuthenticated: true,
            accountId: decoded.accountId || 0,
            email: decoded.email,
            name: decoded.name || decoded.email,
            avatar: decoded.avatar || "",
            role: decoded.role || Role.GUEST,
          });
          console.log("Login successfully");
          console.log("User info:", decoded);
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      },

      logout: () => {
        setCookie("accessToken", "", 0);
        set({
          isAuthenticated: false,
          accountId: 0,
          email: "",
          name: "",
          avatar: "",
          role: Role.GUEST,
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
