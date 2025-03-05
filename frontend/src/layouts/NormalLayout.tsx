import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

export default function NormalLayout() {
  return (
    <>
      <Header />
      <div className="mt-[72px]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
