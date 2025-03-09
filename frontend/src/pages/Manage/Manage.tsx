import useAuthStore from "@/stores/authStore";
import { Role } from "@/types";
import { Outlet } from "react-router-dom";
import { TabItem } from "../Search/Search";

export default function Manage() {
  const { role } = useAuthStore();

  const items = [
    {
      name: "Dashboard",
      path: "/manage/dashboard",
    },
    {
      name: "My projects",
      path: "/manage/projects",
    },
    {
      name: "Notifications",
      path: "/manage/notifications",
    },
    {
      name: role == Role.FREELANCER ? "Proposals" : "",
      path: "/manage/proposals",
    },
    {
      name: role == Role.FREELANCER ? "Feedbacks" : "",
      path: "/manage/feedbacks",
    },
    {
      name: "Transaction History",
      path: "/manage/transaction-history",
    },
  ];

  return (
    <>
      <div className="w-full bg-black text-secondary dark:text-primary">
        <div className="mx-container pt-0">
          <div className="flex gap-1 mt-4">
            {items.map((item) => (
              <TabItem key={item.path} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-container">
        <Outlet />
      </div>
    </>
  );
}
