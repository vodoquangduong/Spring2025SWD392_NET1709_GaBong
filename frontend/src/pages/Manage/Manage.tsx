import { Outlet } from "react-router-dom";
import { TabItem } from "../Search/Search";

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
    name: "Bookmarks",
    path: "/manage/bookmarks",
  },
];

export default function Manage() {
  return (
    <div>
      <div className="w-full bg-black/90 text-secondary dark:text-primary">
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
