import { App, Breadcrumb, Button, Skeleton, Tag } from "antd";
import { GoDotFill } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { IoShareSocial } from "react-icons/io5";
import { useEffect } from "react";
import { getRandomInt } from "../../modules/random";
import { TabItem } from "../Search/Search";
import { Link, Outlet, useParams } from "react-router-dom";
import Sidebar from "./partials/ProjectDetail/partials/Sidebar";
import { useQueries, useQuery } from "@tanstack/react-query";
import { GET, POST, PUT } from "@/modules/request";
import { formatTimeAgo } from "@/modules/formatTimeAgo";
import dayjs from "dayjs";
import useAuthStore from "@/stores/authStore";
import { ProjectStatus } from "@/types/project";
import { mapProjectStatusToTag } from "@/modules/mapUiStatus";
import { FaLocationDot } from "react-icons/fa6";
import useUiStore from "@/stores/uiStore";

export default function Project() {
  const { revalidate, requestRevalidate } = useUiStore();
  const { id: projectId } = useParams();
  const { accountId } = useAuthStore();
  const { modal } = App.useApp();

  const { data, isLoading } = useQuery<any>({
    queryKey: ["projectDetail", projectId, revalidate],
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
      name:
        data?.clientId == accountId || data?.freelancerId == accountId
          ? "Milestones"
          : "",
      path: `/projects/${projectId}/milestones`,
    },
    {
      name: data?.freelancerId ? "Contract" : "",
      path: `/projects/${projectId}/contract`,
    },
  ];

  const outletContext = {
    project: data,
    isLoading,
    accountId,
  };

  const onCancelProject = () => {
    modal.confirm({
      title: "Are you sure?",
      content: "This action will cancel the project and refund all bids.",
      centered: true,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const projectData = await GET(`/api/Project/${projectId}`);
        console.log("projectData", projectData.value);
        if (projectData.value && !projectData.value.freelancerId) {
          const project = projectData.value;
          const body = {
            availableTimeRange: project.availableTimeRange,
            projectName: project.projectName,
            projectDescription: project.projectDescription,
            estimateBudget: project.estimateBudget,
            location: project.location,
            status: ProjectStatus.CLOSED,
            skillIds: project.skillIds,
          };
          await PUT(`/api/Project/update/${projectId}`, body);
          requestRevalidate();
        }
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                    {data?.projectName}
                    {mapProjectStatusToTag(data?.status)}
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
                    <span className="text-xl">{data?.bids?.length}</span>
                  </div>
                  <div className="font-semibold flex flex-col gap-2 justify-center">
                    <span>Average Bid</span>
                    <span className="text-xl">
                      {data?.bids?.length
                        ? (
                            data?.bids?.reduce(
                              (a: any, b: any) => a + b.bidOffer,
                              0
                            ) / data?.bids?.length
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
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className={"py-2 flex gap-2 items-center"}>
                      <FaLocationDot className="text-emerald-500" />
                      {data?.location}
                    </div>
                    {data?.status == ProjectStatus.PENDING && (
                      <Button onClick={onCancelProject}>Cancel Project</Button>
                    )}
                  </div>
                  {`Posted ${formatTimeAgo(
                    dayjs(data?.postDate, "DD-MM-YYYY").toISOString()
                  )}`}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center gap-4 mt-4">
              <div className="flex gap-1 mt-4">
                {tabItems
                  .filter((item) => item?.name != "")
                  .map((item) => (
                    <TabItem key={item?.path} item={item} />
                  ))}
              </div>
              <div className="flex gap-2 items-center">
                {/* <span className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full cursor-pointer">
                  <CiBookmark size={24} strokeWidth={1} />
                </span>
                <span className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 rounded-full cursor-pointer">
                  <IoShareSocial size={24} strokeWidth={1} />
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-container my-6 gap-6 grid grid-cols-12">
        <div className="col-span-9">
          <Outlet context={outletContext} />
        </div>
        <div className="col-span-3 dark:bg-white/5 rounded-md">
          <Sidebar clientId={data?.clientId} />
        </div>
      </div>
    </div>
  );
}
