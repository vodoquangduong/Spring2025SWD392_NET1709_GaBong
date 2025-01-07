import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NormalLayout from "../layouts/NormalLayout";
import PageNotFound from "../components/PageNotFound";

export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NormalLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
