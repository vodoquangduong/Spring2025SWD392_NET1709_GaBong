import { AnimatePresence } from "motion/react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import { DashboardLayout } from "../layouts/DashboardLayout";
import GlobalLayout from "../layouts/GlobalLayout";
import NormalLayout from "../layouts/NormalLayout";
import UserDetail from "../pages/DashboardTemplate/UserManager/UserDetail/UserDetail";
import UserList from "../pages/DashboardTemplate/UserManager/UserList/UserList";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="/" element={<NormalLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<GlobalLayout />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/login" element={<GlobalLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/forgot-password" element={<GlobalLayout />}>
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="worker">
            <Route
              path=""
              element={
                // <PrivateRoute
                //   allowedRoles={[Role.ADMIN, Role.STAFF, Role.GUEST]}
                //   redirectUrl="/worker/auth/login"
                //   children={<DashboardLayout />}
                // />
                <DashboardLayout />
              }
            >
              <Route path="" element={<Navigate to="users" />} />
              <Route
                path="users"
                element={
                  // <PrivateRoute
                  //   allowedRoles={[Role.ADMIN, Role.GUEST]}
                  //   redirectUrl="/admin"
                  //   children={<Outlet />}
                  // />
                  <AnimatePresence>
                    <Outlet />
                  </AnimatePresence>
                }
              >
                <Route path="" element={<UserList />} />
                <Route path=":id" element={<UserDetail />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
