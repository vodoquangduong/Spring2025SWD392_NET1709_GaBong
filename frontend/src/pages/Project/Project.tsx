import { Breadcrumb, Skeleton, Tag } from "antd";
import { GoDotFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { useEffect } from "react";
import { getRandomInt } from "../../modules/random";
import { TabItem } from "../Search/Search";
import { Link, Outlet, useParams } from "react-router-dom";
import Sidebar from "./partials/ProjectDetail/partials/Sidebar";
import { useQueries, useQuery } from "@tanstack/react-query";
import { GET } from "@/modules/request";
import { formatTimeAgo } from "@/modules/formatTimeAgo";
import dayjs from "dayjs";
import useAuthStore from "@/stores/authStore";
import { ProjectStatus } from "@/types/project";
import { mapProjectStatusToTag } from "@/modules/mapUiStatus";
import { FaLocationDot } from "react-icons/fa6";

export default function Project() {
  const { id: projectId } = useParams();
  const { accountId } = useAuthStore();

  const { data, isLoading } = useQuery<any>({
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
  ];

  console.log(data?.value?.miletones);
  console.log(data?.value);

  return (
    <div>
      <div className="w-full">
        <div className="mx-container border-b dark:border-gray-500">
          <Breadcrumb
            className="pt-4 capitalize font-bold text-base"
            items={items}
          />
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-semibold flex gap-4 items-center">
                {isLoading ? (
                  <Skeleton.Input active style={{ width: 400 }} />
                ) : (
                  <>
                    {data?.value?.projectName}
                    {mapProjectStatusToTag(data?.value?.status)}
                  </>
                )}
              </div>
              {isLoading ? (
                <Skeleton.Input
                  className="mt-2"
                  active
                  style={{ width: 200 }}
                />
              ) : (
                <div className="flex gap-10 items-end">
                  <div className="font-semibold flex flex-col gap-2 justify-center">
                    <span>Bids</span>
                    <span className="text-xl">{data?.value?.bids?.length}</span>
                  </div>
                  <div className="font-semibold flex flex-col gap-2 justify-center">
                    <span>Average Bid</span>
                    <span className="text-xl">
                      {data?.value?.bids?.length
                        ? (
                            data?.value?.bids?.reduce(
                              (a: any, b: any) => a + b.bidOffer,
                              0
                            ) / data?.value?.bids?.length
                          ).toLocaleString()
                        : 0}{" "}
                      USD
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-sm">
              {isLoading ? (
                <Skeleton.Input active style={{ width: 200 }} />
              ) : (
                <div>
                  <div className={"py-2 flex gap-2 items-center"}>
                    <FaLocationDot className="text-emerald-500" />
                    {data?.value?.location}
                  </div>
                  {`Posted ${formatTimeAgo(
                    dayjs(data?.value?.postDate, "DD-MM-YYYY").toISOString()
                  )}`}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4 mt-4">
              <div className="flex gap-1 mt-4">
                {tabItems.map((item) => (
                  <TabItem key={item?.path} item={item} />
                ))}
                {(data?.value?.clientId == accountId ||
                  data?.value?.freelancerId == accountId) && (
                  <TabItem
                    item={{
                      name: "Milestones",
                      path: `/projects/${projectId}/milestones`,
                    }}
                  />
                )}
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
          <Sidebar clientId={data?.value?.clientId} />
        </div>
      </div>
    </div>
  );
}
