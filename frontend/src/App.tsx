import { App as AntApp, Button, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import useConfigStore from "./stores/configStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotifyService } from "./components/ChatPopup/services/notifyService";
import { useEffect } from "react";
import useAuthStore from "./stores/authStore";
import useChatStore from "./components/ChatPopup/stores/chatStore";

export default function App() {
  const { accountId } = useAuthStore();
  const { setNotifyService, setNotification } = useChatStore();
  const { isDarkMode } = useConfigStore();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  // const queryClient = new QueryClient();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const noti = new NotifyService();
        await noti.start();
        await noti.userConnect(Number(accountId));
        noti.onReceiveNotification((message) => {
          console.log("message", message);
          if (message?.accountId == accountId) {
            setNotification(message.notificationType);
          }
        });
        setNotifyService(noti);
      } catch (error) {
        console.log("Failed to start notify service:", error);
      }
    })();
  }, [accountId]);

  return (
    <BrowserRouter>
      <AntApp component={false}>
        <ConfigProvider
          tag={{ className: "text-[14px] font-semibold py-1 px-2" }}
          // componentSize="large"
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            token: {
              colorPrimary: "#00b96b",
              colorLink: "#02cf5b",
              borderRadius: 4,
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <MainRoutes />
          </QueryClientProvider>
        </ConfigProvider>
      </AntApp>
    </BrowserRouter>
  );
}
