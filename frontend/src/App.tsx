import { App as AntApp, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <AntApp component={false}>
        <ConfigProvider>
          <MainRoutes />
        </ConfigProvider>
      </AntApp>
    </BrowserRouter>
  );
}
