import { List, Progress, Tag, Tooltip } from "antd";
import { useQueries } from "@tanstack/react-query";
import useAuthStore from "@/stores/authStore";
import { GET } from "@/modules/request";
import { Transaction } from "@/types/transaction";
import {
  getBidSummaryData,
  getEarningChartData,
  getTotalEarningData,
} from "@/modules/dashboardDataHandler";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { PaginatedResult, ResultServerResponse } from "@/types/serverResponse";
import { Bid } from "@/types/bid";
import EarningChart from "@/pages/Manage/partials/Dashboard/partials/EarningChart";
import BidSummaryChart from "@/pages/Manage/partials/Dashboard/partials/BidSummaryChart";
import { Portfolio } from "@/pages/Profile/models/types";
import { useNavigate } from "react-router-dom";
import { defaultAvatar } from "@/modules/default";

const DashboardChart = () => {
  const navigate = useNavigate();
  const { accountId } = useAuthStore();
  const [transactions, projects, freelancers] = useQueries({
    queries: [
      {
        queryKey: ["transactions"],
        queryFn: async (): Promise<Transaction[]> =>
          await GET(`/api/Transaction/${accountId}`),
      },
      {
        queryKey: ["projects"],
        queryFn: async (): Promise<ResultServerResponse<ProjectDetail[]>> =>
          await GET("/api/Project"),
      },
      {
        queryKey: ["freelancers"],
        queryFn: async (): Promise<
          ResultServerResponse<PaginatedResult<Portfolio>>
        > => await GET(`/api/Portfolio/verified`),
        staleTime: 0,
      },
    ],
  });

  const getPercentByStatus = (status: ProjectStatus[]) => {
    if (!projects?.data?.value) {
      return 0;
    }
    return (
      (projects?.data?.value?.filter(
        (p: ProjectDetail) =>
          status.includes(p.status) && p.freelancerId == accountId
      ).length /
        (projects?.data?.value?.filter((p) => p.freelancerId == accountId)
          ?.length || 1)) *
      100
    );
  };

  const getTotalProjects = () => {
    if (!projects?.data?.value) {
      return 0;
    }
    return projects?.data?.value?.filter((p) => p.freelancerId == accountId)
      ?.length;
  };

  console.log("freelancers: ", freelancers.data?.value?.items);

  return (
    <div className="geist min-h-screen pt-6 pb-40">
      <div>
        <div className="grid grid-cols-5 gap-4">
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              Total Projects
            </div>
            <div className="text-2xl font-bold">{getTotalProjects()}</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              Total Clients
            </div>
            <div className="text-2xl font-bold">340</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              Total Freelancers
            </div>
            <div className="text-2xl font-bold">15</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              System Transactions
            </div>
            <div className="text-2xl font-bold">8</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              Total Income
            </div>
            <div className="text-2xl font-bold">5</div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2 border p-4 h-[600px] bg-white">
          <EarningChart data={getEarningChartData(transactions?.data || [])} />
        </div>
        <div className="border p-4 h-[600px] bg-white">
          <List
            className="bg-white dark:bg-zinc-900 border-0"
            header={<div className="text-xl font-bold">Top 10 Freelancers</div>}
            bordered
            dataSource={freelancers.data?.value?.items?.slice(0, 10)}
            loading={freelancers.isLoading}
            renderItem={(item: Portfolio) => (
              <List.Item className="flex flex-col items-start">
                <div className="flex w-full">
                  <img
                    className="mt-2 w-12 aspect-square rounded-xl object-cover object-center bg-white border"
                    src={item.avatarURL || defaultAvatar}
                    alt="no-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultAvatar;
                    }}
                  />
                  <div className="flex-1 ml-4 w-3/4">
                    <div
                      title={item?.name}
                      className="hover:text-emerald-400 cursor-pointer font-semibold w-full truncate mb-1"
                      onClick={() =>
                        navigate(`/freelancers/${item?.freelancerId}`)
                      }
                    >
                      {item?.name} - {item?.email}
                    </div>
                    <span className="flex gap-y-2 flex-wrap">
                      <Tag className="text-xs" color="blue-inverse">
                        {item?.reputationPoint} Points
                      </Tag>
                    </span>
                  </div>
                </div>

                <div className="w-full text-sm flex mt-1 gap-2 items-center font-semibold justify-end"></div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
