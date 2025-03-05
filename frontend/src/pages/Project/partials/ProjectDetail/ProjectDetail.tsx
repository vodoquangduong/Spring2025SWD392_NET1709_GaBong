import CreateModal from "@/components/CreateModal";
import Skills from "@/components/Skills";
import { GET } from "@/modules/request";
import useAuthStore from "@/stores/authStore";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Divider, Skeleton, Table } from "antd";
import dayjs from "dayjs";
import { FaClock, FaFlag } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CreateReportForm from "./forms/CreateReportForm";
import PlaceBid from "./partials/PlaceBid";
import { ProjectStatus } from "@/types/project";
import { tableColumns } from "@/pages/MakeContract/schemas";

export default function ProjectDetail() {
  const { accountId } = useAuthStore();
  const { id: projectId } = useParams();

  const [projectDetails, skillCategory] = useQueries({
    queries: [
      {
        queryKey: ["projectDetail", projectId],
        queryFn: async () => await GET(`/api/Project/${projectId}`),
      },
      {
        queryKey: ["myBids", projectId],
        queryFn: async () => await GET(`/api/Project/${projectId}`),
      },
      {
        queryKey: ["skills"],
        queryFn: async () => await GET(`/api/SkillCategory`),
      },
    ],
  });

  if (projectDetails.isLoading) {
    return (
      <Skeleton active paragraph={{ rows: 20, className: "!space-y-6" }} />
    );
  }

  return (
    <>
      <div className="rounded-md dark:bg-white/5 p-6 w-full mb-6 shadow-md">
        <div className="flex justify-between items-center">
          <span className="font-bold text-2xl mr-3">Project Details</span>
          <span className="font-bold mr-3 flex-col items-end">
            <div className="text-end">Total Estimate Budget</div>
            <span className="text-2xl chivo font-bold ml-4 w-full text-end">
              ${projectDetails?.data?.value?.estimateBudget}
              <span className="text-zinc-500 text-sm ml-1">USD</span>
            </span>
          </span>
        </div>
        <div className="mb-8 pb-4 border-b">
          <div className="p-4 flex justify-end text-xs font-bold uppercase items-center gap-2">
            <FaClock />
            <span>
              {dayjs().isBefore(
                dayjs(projectDetails?.data?.value?.postDate!).add(
                  projectDetails?.data?.value?.availableTimeRange || 0,
                  "days"
                )
              )
                ? `Bidding ends in ${dayjs(
                    projectDetails?.data?.value?.postDate!
                  ).format("MMM DD, YYYY")}`
                : "Bidding ended"}
            </span>
          </div>
        </div>
        <p className="text-base whitespace-pre-line tracking-wide border-b pb-8 mb-8">
          {projectDetails?.data?.value?.projectDescription}
        </p>
        <div>
          <span className="font-semibold text-lg mr-3">Skills Required</span>
          <div className="mt-4">
            <Skills items={projectDetails?.data?.value?.skills} />
          </div>
        </div>
        <div className="mt-8">
          <span className="font-semibold text-lg mr-3">Milestones</span>
          <div className="mt-4">
            <Table
              dataSource={projectDetails?.data?.value?.milestones}
              columns={tableColumns(
                projectDetails?.data?.value?.estimateBudget
              )}
              rowKey={(record: any) => record.milestoneId}
              pagination={false}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 mt-6 text-sm">
          {/* <div className="">Project ID: #{projectId}</div> */}
          {/* <CreateModal
            icon={<FaFlag />}
            children="Report Project"
            type="text"
            modalTitle={"Report this project"}
            form={(
              setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
            ) => <CreateReportForm setIsModalOpen={setIsModalOpen} />}
          /> */}
        </div>
      </div>
      {projectDetails?.data?.value?.clientId != accountId &&
        !projectDetails?.data?.value?.bids?.some(
          (bid: any) => bid.bidOwnerId == accountId
        ) &&
        projectDetails?.data?.value?.status != ProjectStatus.VERIFIED && (
          <PlaceBid project={projectDetails?.data?.value} />
        )}
    </>
  );
}
