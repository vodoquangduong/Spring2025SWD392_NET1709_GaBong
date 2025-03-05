import { Outlet } from "react-router-dom";
import { TabItem } from "../Search/Search";
import useAuthStore from "@/stores/authStore";
import { Role } from "@/types";

export default function Manage() {
  const { role } = useAuthStore();
  const items = [
    {
      name: "Dashboard",
      path: "/manage/dashboard",
    },
    {
      name: role == Role.CLIENT ? "My projects" : "My working Projects",
      path: "/manage/projects",
    },
    {
      name: "Notifications",
      path: "/manage/notifications",
    },
    {
      name: "Bookmarks",
      path: "/manage/bookmarks",
    },
  ];

  return (
    <div>
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
    </div>
  );
}
