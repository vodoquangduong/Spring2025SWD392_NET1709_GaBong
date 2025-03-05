import { Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import SearchBox from "../../components/SearchBox";

const items = [
  {
    name: "Projects",
    path: "/search/projects",
  },
  {
    name: "Freelancers",
    path: "/search/freelancers",
  },
];

export const TabItem = ({ item }: { item: any }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(item.path)}
      className={`px-6 py-3 border-b-[3px] transition-all cursor-pointer ${
        window.location.href.includes(item.path)
          ? "font-bold text-emerald-500 border-emerald-500 hover:border-emerald-500"
          : "font-semibold border-transparent hover:border-gray-400"
      }`}
    >
      {item.name}
    </div>
  );
};
