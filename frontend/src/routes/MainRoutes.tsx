import { AnimatePresence } from "motion/react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { Project, ProjectDetail, ProjectProposal } from "../pages/Project";
import { UserDetail, UserList } from "../pages/DashboardTemplate/UserManager";
import { DashboardLayout, GlobalLayout, NormalLayout } from "../layouts";
import { Search, SearchFreelancer, SearchProject } from "../pages/Search";
import ForgotPassword from "../pages/ForgotPassword";

export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="/" element={<NormalLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="search" element={<Search />}>
              <Route path="projects" element={<SearchProject />} />
              <Route path="freelancers" element={<SearchFreelancer />} />
            </Route>
            <Route path="projects">
              <Route path="" element={<Navigate to="/search/projects" />} />
              <Route path=":id" element={<Project />}>
                <Route path="details" element={<ProjectDetail />} />
                <Route path="proposals" element={<ProjectProposal />} />
              </Route>
            </Route>
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
            <Route path="" element={<DashboardLayout />}>
              <Route path="" element={<Navigate to="users" />} />
              <Route
                path="users"
                element={
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
