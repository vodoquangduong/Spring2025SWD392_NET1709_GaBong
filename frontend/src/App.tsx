import { App as AntApp, Button, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import useConfigStore from "./stores/configStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotifyService } from "./components/ChatPopup/services/notifyService";

export default function App() {
  const { isDarkMode } = useConfigStore();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const noti = new NotifyService();
  // const queryClient = new QueryClient();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const sendNotification = async () => {
    try {
      await noti.start();
      await noti.userConnect(9);
      await noti.sendNotification(1, "test test");
      // await noti.stop();
      noti.onReceiveNotification((message) => {
        console.log(message);
        alert(message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotification2 = async () => {
    try {
      await noti.start();
      await noti.userConnect(1);
      await noti.sendNotification(9, "test test");
      // await noti.stop();
      noti.onReceiveNotification((message) => {
        console.log(message);
        alert(message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const stopNoti = async () => {
    await noti.stop();
  };
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
            <Button onClick={sendNotification}>Connect 9</Button>
            <Button onClick={sendNotification2}>Connect 1</Button>
            <Button onClick={stopNoti}>Stop</Button>
          </QueryClientProvider>
        </ConfigProvider>
      </AntApp>
    </BrowserRouter>
  );
}
