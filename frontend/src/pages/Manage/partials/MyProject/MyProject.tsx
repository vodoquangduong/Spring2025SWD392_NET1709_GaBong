import React from "react";
import { TabItem } from "../../../Search/Search";
import SearchBox from "../../../../components/SearchBox";
import { Button } from "antd";

export default function MyProject() {
  return (
    <div>
      <div className="text-3xl font-bold mt-8">My Projects</div>
      <div className="flex gap-1 mt-8">
        {items.map((item) => (
          <TabItem key={item.path} item={item} />
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4">
        <SearchBox
          placeholder="Search Projects..."
          widthClass="w-full py-2"
          className="!bg-gray-100 py-2 dark:!bg-zinc-800"
          value={""}
        />
      </div>
    </div>
  );
}

const items = [
  {
    name: "Pending Projects",
    path: "/manage/dashboard",
  },
  {
    name: "Open Projects",
    path: "/manage/projects",
  },
  {
    name: "Work in Progress",
    path: "/manage/notifications",
  },
  {
    name: "Past Projects",
    path: "/manage/bookmarks",
  },
];
