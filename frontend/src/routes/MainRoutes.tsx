import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NormalLayout from "../layouts/NormalLayout";
import PageNotFound from "../components/PageNotFound";
import PrivateRoute from "../components/PrivateRoute";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Role } from "../types";
import UserList from "../pages/DashboardTemplate/UserManager/UserList/UserList";
import UserDetail from "../pages/DashboardTemplate/UserManager/UserDetail/UserDetail";
import GlobalLayout from "../layouts/GlobalLayout";

export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="/" element={<NormalLayout />}>
            <Route path="/" element={<Home />} />
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
                  <Outlet />
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
