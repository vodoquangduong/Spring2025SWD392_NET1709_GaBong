import { Layout, Menu } from "antd";
import { useState } from "react";
import { FaBox, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import Logo from "../components/Logo";
import { Role } from "../types";
import { BiSolidCategory } from "react-icons/bi";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      label: "Dashboard",
      key: "/employee",
      icon: <FaBox />,
      className:
        "w-full flex font-semibold !text-zinc-200 hover:!bg-emerald-600",
      allowedroles: [Role.STAFF, Role.ADMIN],
    },
    {
      label: "Project",
      key: "/employee/projects",
      icon: <FaRegCalendarAlt />,
      className:
        "w-full flex font-semibold !text-zinc-200 hover:!bg-emerald-600",
      allowedroles: [Role.STAFF, Role.ADMIN],
    },
    {
      label: "Category",
      key: "/employee/categories",
      icon: <BiSolidCategory />,
      className:
        "w-full flex font-semibold !text-zinc-200 hover:!bg-emerald-600",
      allowedroles: [Role.STAFF, Role.ADMIN],
    },
    {
      label: "Freelancers",
      key: "/employee/freelancers",
      icon: <FaUsers />,
      className:
        "w-full flex font-semibold !text-zinc-200 hover:!bg-emerald-600",
      allowedroles: [Role.STAFF],
    },
    {
      label: "Test label 3",
      key: "/worker/posts",
      icon: <FaBox />,
      className:
        "w-full flex font-semibold !text-zinc-200 hover:!bg-emerald-600",
      allowedroles: [Role.GUEST],
    },
    {
      label: "Test label 4",
      key: "/worker/accounts",
      icon: <FaBox />,
      className:
        "w-full flex font-semibold !text-zinc-200 hover:!bg-emerald-600",
      allowedroles: [Role.GUEST],
    },
  ];

  return (
    <>
      <Layout className="h-screen">
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme={"dark"}
          className="!bg-zinc-800 pt-4"
          width={250}
        >
          <Logo collapsed={collapsed} />
          <Menu
            className="mt-4 px-2 bg-zinc-800"
            theme={"dark"}
            selectedKeys={location.pathname.split("/").slice(0, 3)}
            mode="vertical"
            items={items}
            onClick={({ key }) => navigate(key)}
          />
        </Layout.Sider>
        <Layout className="overflow-y-scroll small-scrollbar border-l border-zinc-300 dark:border-zinc-600 bg-secondary/30">
          <Layout.Header className="p-4 bg-white flex justify-between items-center dark:bg-zinc-800 border-b border-zinc-300 dark:border-zinc-600">
            <DashboardHeader />
          </Layout.Header>
          <div className="m-16 !mb-0">
            {/* <div className="min-h-screen"> */}
            <Outlet />
            {/* </div> */}
          </div>

          {/* <AdminFooter /> */}
        </Layout>
      </Layout>
    </>
  );
}
