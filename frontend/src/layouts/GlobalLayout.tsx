import { Outlet } from "react-router-dom";
import { FloatButton } from "antd";
import ToggleTheme from "../components/ToggleTheme";
import { useEffect, useState } from "react";
import useConfigStore from "../stores/configStore";
import { LuMessageCircleMore } from "react-icons/lu";
import useAuthStore from "../stores/authStore";
import ChatPopup from "../components/ChatPopup/ChatPopup";
import useUiStore from "@/stores/uiStore";

export default function GlobalLayout() {
  const { isChatOpen, toogleChatPopup } = useUiStore();
  const { isDarkMode } = useConfigStore();
  const { isAuthenticated } = useAuthStore();

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
      <FloatButton.Group
        className="mb-14"
        shape="circle"
        style={{ insetInlineEnd: 24 }}
      >
        {isAuthenticated && (
          <FloatButton
            icon={<LuMessageCircleMore />}
            onClick={toogleChatPopup}
          />
        )}
        {/* <FloatButton.BackTop visibilityHeight={0} /> */}
      </FloatButton.Group>
      <FloatButton.BackTop type="primary" />
      <div className="dark:bg-secondary text-secondary-foreground">
        <Outlet />
      </div>
      {/* <ChatPopup /> */}
      {isChatOpen && <ChatPopup />}
    </>
  );
}
