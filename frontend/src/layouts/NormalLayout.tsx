import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NormalLayout() {
  return (
    <>
      <Header />
      <div className="min-h-screen mt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
