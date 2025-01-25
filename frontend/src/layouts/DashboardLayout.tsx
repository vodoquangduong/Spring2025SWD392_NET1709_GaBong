import { Layout, Menu } from "antd";
import Logo from "../components/Logo";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBox } from "react-icons/fa";
import { Role } from "../types";
import { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { AnimatePresence, motion } from "motion/react";

export const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      label: "Test label 1",
      key: "/worker/dashboard",
      icon: <FaBox />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.GUEST],
    },
    {
      label: "Test label 2",
      key: "/worker/campaigns",
      icon: <FaBox />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.GUEST],
    },
    {
      label: "Test label 3",
      key: "/worker/posts",
      icon: <FaBox />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.GUEST],
    },
    {
      label: "Test label 4",
      key: "/worker/accounts",
      icon: <FaBox />,
      className: "w-full flex font-semibold !text-zinc-200",
      allowedRoles: [Role.GUEST],
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
          className="!bg-zinc-800"
          width={250}
        >
          <Logo size="small" />
          <Menu
            className="px-2 bg-zinc-800"
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
          <div className="m-4 !mb-0">
            {/* <div className="min-h-screen"> */}
            <Outlet />
            {/* </div> */}
          </div>

          {/* <AdminFooter /> */}
        </Layout>
      </Layout>
    </>
  );
};
