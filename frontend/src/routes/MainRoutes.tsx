import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import { DashboardLayout, GlobalLayout, NormalLayout } from "../layouts";
import { AccountManagement } from "../pages/Dashboard/EmployeeDashboard/AccountManagement";
import { FreelancerManagement } from "../pages/Dashboard/EmployeeDashboard/FreelancerManagement";
import {
  ProjectDetail as DashboardProjectDetail,
  ProjectList,
} from "../pages/Dashboard/EmployeeDashboard/ProjectManagement";
import PendingServiceList from "../pages/Dashboard/EmployeeDashboard/ProjectManagement/partials/PendingServiceList";
import { ReportManagement } from "../pages/Dashboard/EmployeeDashboard/ReportManagement";
import { ServiceManagement } from "../pages/Dashboard/EmployeeDashboard/ServiceManagement";
// import { UserDetail, UserList } from "../pages/Dashboard/UserManager";
import PrivateRoute from "@/components/PrivateRoute";
import { CategoryManagement } from "@/pages/Dashboard/EmployeeDashboard/CategoryManagement";
import { MakeContract } from "@/pages/MakeContract";
import Transaction from "@/pages/Manage/partials/TransactionHistory";
import { Payment, PaymentSuccess } from "@/pages/Payment";
import PostProject from "@/pages/PostProject/PostProject";
import { Role } from "@/types";
import ForgotPassword from "../pages/ForgotPassword";
import { Freelancer } from "../pages/Freelancer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import {
  Manage,
  Dashboard as UserDashboard,
  MyProject,
  Notification,
  Proposal,
  Feedback,
} from "../pages/Manage";
import { Policy } from "../pages/Policy";
import { Portfolio } from "../pages/Portfolio";
import { EditProfile, UserProfile } from "../pages/Profile";
import {
  Project,
  ProjectDetail,
  ProjectPayment,
  ProjectProposal,
  ProjectContract,
} from "../pages/Project";
import Register from "../pages/Register";
import { SearchFreelancer, SearchProject } from "../pages/Search";
import { NotifyGmailChecking, VerifyGmail } from "@/pages/VerifyGmail";
import { Withdraw } from "@/pages/Withdraw";
import {
  WithdrawDetail,
  WithdrawList,
} from "@/pages/Dashboard/EmployeeDashboard/WithdrawManagement";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route path="/" element={<NormalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="search">
            <Route path="projects" element={<SearchProject />} />
            <Route path="freelancers" element={<SearchFreelancer />} />
          </Route>
          {/* <Route path="search" element={<Search />}></Route> */}
          <Route path="projects">
            <Route path="" element={<Navigate to="/search/projects" />} />
            <Route path=":id" element={<Project />}>
              <Route path="details" element={<ProjectDetail />} />
              <Route path="proposals" element={<ProjectProposal />} />
              <Route path="milestones" element={<ProjectPayment />} />
              <Route path="contract" element={<ProjectContract />} />
            </Route>
          </Route>
          <Route path="post-project" element={<PostProject />} />
          <Route path="make-contract" element={<MakeContract />} />
          <Route path="freelancers">
            <Route path="" element={<Navigate to="/search/freelancers" />} />
            <Route path=":id" element={<Freelancer />} />
          </Route>
          <Route path="manage" element={<Manage />}>
            <Route path="" element={<Navigate to="/manage/projects" />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="projects" element={<MyProject />} />
            {/* <Route path="bookmarks" element={<Bookmark />} /> */}
            <Route path="notifications" element={<Notification />} />
            <Route path="transaction-history" element={<Transaction />} />
          </Route>
          <Route path="profile">
            <Route index element={<UserProfile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="policy" element={<Policy />} />
        </Route>
        {/* <Route path="search" element={<Search />}></Route> */}
        <Route path="projects">
          <Route path="" element={<Navigate to="/search/projects" />} />
          <Route path=":id" element={<Project />}>
            <Route path="details" element={<ProjectDetail />} />
            <Route path="proposals" element={<ProjectProposal />} />
            <Route path="milestones" element={<ProjectPayment />} />
            <Route path="contract" element={<ProjectContract />} />
          </Route>
        </Route>
        <Route path="freelancers">
          <Route path="" element={<Navigate to="/search/freelancers" />} />
          <Route path=":id" element={<Freelancer />} />
        </Route>
        <Route path="manage" element={<Manage />}>
          <Route path="" element={<Navigate to="/manage/projects" />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="projects" element={<MyProject />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="proposals" element={<Proposal />} />
          <Route path="feedbacks" element={<Feedback />} />
        </Route>
        <Route path="profile">
          <Route index element={<UserProfile />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>
        <Route path="policy" element={<Policy />} />
      </Route>

      <Route>
        <Route path="payment" element={<Payment />} />
        <Route path="payment-success" element={<PaymentSuccess />} />
        <Route path="withdraw" element={<Withdraw />} />
      </Route>
      <Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="authentication">
          <Route path="" element={<NotifyGmailChecking />} />
          <Route path="verify-gmail" element={<VerifyGmail />} />
        </Route>
      </Route>
      <Route
        path="/"
        element={
          <PrivateRoute
            allowedroles={[Role.ADMIN, Role.STAFF]}
            redirectUrl="/"
            children={<DashboardLayout />}
          />
        }
      >
        <Route path="employee">
          <Route path="" element={<Navigate to="accounts" />} />
          <Route path="accounts/*" element={<AccountManagement />} />
          <Route path="services/*" element={<ServiceManagement />} />
          <Route path="reports/*" element={<ReportManagement />} />
          <Route path="freelancers/*" element={<FreelancerManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="projects">
            <Route index element={<ProjectList />} />
            <Route path=":id" element={<DashboardProjectDetail />} />
          </Route>
          <Route path="withdraws">
            <Route index element={<WithdrawList />} />
            <Route path=":id" element={<WithdrawDetail />} />
          </Route>
          <Route path="pending-services" element={<PendingServiceList />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
