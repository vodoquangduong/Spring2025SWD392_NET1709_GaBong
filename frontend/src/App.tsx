import { App as AntApp, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import useConfigStore from "./stores/configStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const { isDarkMode } = useConfigStore();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const queryClient = new QueryClient();

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
