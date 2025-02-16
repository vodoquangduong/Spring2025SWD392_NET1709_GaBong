import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import { DashboardLayout, GlobalLayout, NormalLayout } from "../layouts";
import { AccountManagement } from "../pages/DashboardTemplate/EmployeeDashboard/AccountManagement";
import { FreelancerManagement } from "../pages/DashboardTemplate/EmployeeDashboard/FreelancerManagement";
import { ProjectManagement } from "../pages/DashboardTemplate/EmployeeDashboard/ProjectManagement";
import PendingServiceList from "../pages/DashboardTemplate/EmployeeDashboard/ProjectManagement/partials/PendingServiceList";
import { ReportManagement } from "../pages/DashboardTemplate/EmployeeDashboard/ReportManagement";
import { ServiceManagement } from "../pages/DashboardTemplate/EmployeeDashboard/ServiceManagement";
import { UserDetail, UserList } from "../pages/DashboardTemplate/UserManager";
import ForgotPassword from "../pages/ForgotPassword";
import { Freelancer } from "../pages/Freelancer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import {
  Bookmark,
  Manage,
  MyProject,
  Notification,
  Dashboard as UserDashboard,
} from "../pages/Manage";
import { Policy } from "../pages/Policy";
import { Portfolio } from "../pages/Portfolio";
import { EditProfile, UserProfile } from "../pages/Profile";
import {
  Project,
  ProjectDetail,
  ProjectPayment,
  ProjectProposal,
} from "../pages/Project";
import Register from "../pages/Register";
import { Search, SearchFreelancer, SearchProject } from "../pages/Search";

export default function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route path="/" element={<NormalLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
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
            <Route path="profile">
              <Route index element={<UserProfile />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>
            <Route path="policy" element={<Policy />} />
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
          <Route path="employee" element={<DashboardLayout />}>
            <Route path="" element={<Navigate to="accounts" />} />
            <Route path="accounts/*" element={<AccountManagement />} />
            <Route path="services/*" element={<ServiceManagement />} />
            <Route path="reports/*" element={<ReportManagement />} />
            <Route path="freelancers/*" element={<FreelancerManagement />} />
            <Route path="projects/*" element={<ProjectManagement />} />
            <Route path="pending-services" element={<PendingServiceList />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}
