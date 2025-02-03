import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import { DashboardLayout, GlobalLayout, NormalLayout } from "../layouts";
import { UserDetail, UserList } from "../pages/DashboardTemplate/UserManager";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import {
  Project,
  ProjectDetail,
  ProjectProposal,
  ProjectPayment,
} from "../pages/Project";
import { Freelancer } from "../pages/Freelancer";
import {
  Bookmark,
  Manage,
  MyProject,
  Notification,
  Dashboard as UserDashboard,
} from "../pages/Manage";
import { Search, SearchFreelancer, SearchProject } from "../pages/Search";
import UserProfile from "../pages/UserProfile/UserProfile";

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
                <Route path="payments" element={<ProjectPayment />} />
              </Route>
            </Route>
            <Route path="freelancers">
              <Route path="" element={<Navigate to="/search/freelancers" />} />
              <Route path=":id" element={<Freelancer />} />
            </Route>
            <Route path="manage" element={<Manage />}>
              <Route path="" element={<Navigate to="/manage/dashboard" />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="projects" element={<MyProject />} />
              <Route path="bookmarks" element={<Bookmark />} />
              <Route path="notifications" element={<Notification />} />
            </Route>
          </Route>
          <Route path="/user-profile" element={<NormalLayout />}>
            <Route path="/user-profile" element={<UserProfile />} />
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
              <Route path="users" element={<Outlet />}>
                <Route path="" element={<UserList />} />
                <Route path=":id" element={<UserDetail />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
