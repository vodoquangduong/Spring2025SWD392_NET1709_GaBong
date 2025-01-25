import { Outlet } from "react-router-dom";
import { FloatButton } from "antd";
import ToggleTheme from "../components/ToggleTheme";
import { useEffect } from "react";
import useConfigStore from "../stores/configStore";

export default function GlobalLayout() {
  const { isDarkMode } = useConfigStore();
  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html")!.classList.add("dark");
      document.documentElement.setAttribute("data-color-mode", "dark");
    } else {
      document.querySelector("html")!.classList.remove("dark");
      document.documentElement.setAttribute("data-color-mode", "light");
    }
  }, []);
  return (
    <>
      <ToggleTheme />
      <FloatButton.BackTop type="primary" />
      <div className="dark:bg-secondary text-secondary-foreground">
        <Outlet />
      </div>
    </>
  );
}
