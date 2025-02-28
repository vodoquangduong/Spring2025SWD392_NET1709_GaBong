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

export default function Search() {
  return (
    <div>
      <div className="w-full bg-black text-secondary dark:text-primary pb-6">
        <div className="mx-container pt-0">
          <div>
            <div className="text-3xl font-bold">Browse</div>
            <div>
              <div className="">
                <SearchBox
                  placeholder="Search Jobs..."
                  widthClass="w-full py-2"
                  className="!bg-gray-100 py-2 dark:!bg-zinc-800"
                  value={""}
                />
                <Button
                  type="primary"
                  className="mt-2 px-14 py-5 text-lg font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>
            {/* <div className="flex gap-1 mt-4">
              {items.map((item) => (
                <TabItem key={item.path} item={item} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
