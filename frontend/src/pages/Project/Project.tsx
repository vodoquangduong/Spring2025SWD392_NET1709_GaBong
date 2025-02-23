import { Breadcrumb, Skeleton, Tag } from "antd";
import { GoDotFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { useEffect } from "react";
import { getRandomInt } from "../../modules/random";
import { TabItem } from "../Search/Search";
import { Link, Outlet, useParams } from "react-router-dom";
import Sidebar from "./partials/ProjectDetail/partials/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { ProjectDetail } from "@/types/project";
import { GET } from "@/modules/request";
import { formatTimeAgo } from "@/modules/formatTimeAgo";
import dayjs from "dayjs";

export default function Project() {
  const { id: projectId } = useParams();
  const { data, isLoading } = useQuery<ProjectDetail>({
    queryKey: ["projectDetail", projectId],
    queryFn: async () => await GET(`/api/Project/${projectId}`),
  });
  const items = [
    {
      title: <Link to={`/search/projects`}>Projects</Link>,
    },
    {
      title: <Link to={`/projects/${projectId}/details`}>{projectId}</Link>,
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabItems = [
    {
      name: "Details",
      path: `/projects/${projectId}/details`,
    },
    {
      name: "Proposals",
      path: `/projects/${projectId}/proposals`,
    },
    {
      name: "Payments",
      path: `/projects/${projectId}/payments`,
    },
  ];

  return (
    <div>
      <div className="w-full">
        <div className="mx-container border-b dark:border-gray-500">
          <Breadcrumb
            className="pt-4 capitalize font-bold text-base"
            items={items}
          />
          <div>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-semibold flex gap-4 items-center">
                {isLoading ? (
                  <Skeleton.Input active style={{ width: 400 }} />
                ) : (
                  <>
                    {data?.projectName}
                    {dayjs().isBefore(
                      dayjs(data?.postDate!).add(
                        data?.availableTimeRange || 0,
                        "days"
                      )
                    ) ? (
                      <Tag color="green" className="rounded-full !px-3">
                        Open
                      </Tag>
                    ) : (
                      <Tag color="red" className="rounded-full !px-3">
                        Closed
                      </Tag>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-4 items-end">
                <div className="font-semibold flex flex-col gap-2 justify-center">
                  <span>Bids</span>
                  <span className="text-2xl">{getRandomInt(1, 40)}</span>
                </div>
                <GoDotFill size={10} className="mb-2" />
                <div className="font-semibold flex flex-col gap-2 justify-center">
                  <span>Average Bid</span>
                  <span className="text-2xl">
                    $ {getRandomInt(100, 10000).toLocaleString()} USD
                  </span>
                </div>
              </div>
            </div>
            <div className="text-sm">
              {isLoading ? (
                <Skeleton.Input active style={{ width: 200 }} />
              ) : (
                `Posted ${formatTimeAgo(data?.postDate!)}`
              )}
            </div>
            <div className="flex justify-between items-center gap-4 mt-4">
              <div className="flex gap-1 mt-4">
                {tabItems.map((item) => (
                  <TabItem key={item.path} item={item} />
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <span className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full cursor-pointer">
                  <CiBookmark size={24} strokeWidth={1} />
                </span>
                <span className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full cursor-pointer">
                  <IoShareSocial size={24} strokeWidth={1} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-container my-6 gap-6 grid grid-cols-12">
        <div className="col-span-9">
          <Outlet />
        </div>
        <div className="col-span-3 dark:bg-white/5 rounded-md">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
