import { App as AntApp, ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import useConfigStore from "./stores/configStore";
import { useEffect } from "react";

export default function App() {
  const { isDarkMode } = useConfigStore();
  const { defaultAlgorithm, darkAlgorithm } = theme;

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
          <MainRoutes />
        </ConfigProvider>
      </AntApp>
    </BrowserRouter>
  );
}
