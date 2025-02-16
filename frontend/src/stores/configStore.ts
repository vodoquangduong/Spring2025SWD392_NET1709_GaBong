import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Role } from "../types";

const useConfigStore = create<{
  isDarkMode: boolean;
  switchTheme: () => void;
}>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      switchTheme: () => {
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        }));
        if (!get().isDarkMode) {
          document.querySelector("html")!.classList.remove("dark");
          document.documentElement.setAttribute("data-color-mode", "light");
        } else {
          document.querySelector("html")!.classList.add("dark");
          document.documentElement.setAttribute("data-color-mode", "dark");
        }
      },
    }),
    {
      name: "config",
      storage: createJSONStorage(() => localStorage),
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useConfigStore;
