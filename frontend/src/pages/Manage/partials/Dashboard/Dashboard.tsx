import EarningChart from "./partials/EarningChart";
import { Progress, Tooltip } from "antd";
import BidSummaryChart from "./partials/BidSummaryChart";
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
import { Role } from "@/types";
import { Account } from "@/types/account";

export default function Dashboard() {
  const { accountId, role } = useAuthStore();
  const [transactions, projects, bids, account] = useQueries({
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
        queryKey: ["bids"],
        queryFn: async (): Promise<PaginatedResult<Bid>> =>
          await GET(`/api/Bid/freelancer/${accountId}`),
        staleTime: 0,
      },
      {
        queryKey: ["account"],
        queryFn: async (): Promise<any> =>
          await GET(`/api/Account/${accountId}`),
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
    return projects?.data?.value?.filter(
      (p) => p.freelancerId == accountId || p.clientId == accountId
    )?.length;
  };

  const getTotalMilestones = () => {
    if (!projects?.data?.value) {
      return 0;
    }
    return projects?.data?.value
      ?.filter((p) => p.freelancerId == accountId || p.clientId == accountId)
      .reduce((a, b) => a + b.milestones.length, 0);
  };

  return (
    <div className="geist min-h-screen py-8 pb-40">
      <div>
        <div className="text-3xl font-bold chivo">Dashboard</div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Total Projects
            </div>
            <div className="text-2xl font-bold">{getTotalProjects()}</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Completed Milestones
            </div>
            <div className="text-2xl font-bold">{getTotalMilestones()}</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Total Proposals
            </div>
            <div className="text-2xl font-bold">{bids?.data?.totalCount}</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Total Reputation
            </div>
            <div className="text-2xl font-bold">
              {account?.data?.value?.reputationPoint}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-3 border p-4 h-[600px]">
          <EarningChart data={getEarningChartData(transactions?.data || [])} />
        </div>
        <div className="border">
          <div className="text-start font-semibold text-xl p-4 border-b">
            Total earnings
          </div>
          <div className="grid grid-rows-2 gap-y-0 h-[400px]">
            <div className="border-b flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold text-blue-500">
                {getTotalEarningData(transactions?.data || []).toLocaleString()}
                <span className="text-sm text-zinc-500 pl-1">USD</span>
              </div>
              <div>Your total earnings all time</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold text-blue-500">
                {getTotalEarningData(
                  transactions?.data || [],
                  true
                ).toLocaleString()}
                <span className="text-sm text-zinc-500 pl-1">USD</span>
              </div>
              <div>Your total earnings since last 30 days</div>
            </div>
          </div>
        </div>
        <div className="border">
          <div className="text-start font-semibold text-xl p-4 border-b">
            Job proficiency
          </div>
          <div className="flex flex-col gap-y-4 h-full p-4 uppercase">
            <div>
              <div>Completed Jobs</div>
              <Progress
                className="mt-4"
                size={["100%", 20]}
                strokeLinecap="butt"
                format={(value) =>
                  `${(Number(value) / 100) * getTotalProjects()} jobs`
                }
                percent={getPercentByStatus([ProjectStatus.COMPLETED])}
              />
            </div>
            <div>
              <div>On-going Jobs</div>
              <Progress
                className="mt-4"
                size={["100%", 20]}
                strokeLinecap="butt"
                format={(value) =>
                  `${(Number(value) / 100) * getTotalProjects()} jobs`
                }
                percent={getPercentByStatus([
                  ProjectStatus.ON_GOING,
                  // seed data hoi xau nen phai them 2 cai duoi de duoc 100%
                  ProjectStatus.VERIFIED,
                  ProjectStatus.REVERIFIED,
                ])}
              />
            </div>
            <div>
              <div>Pending Jobs</div>
              <Progress
                className="mt-4"
                size={["100%", 20]}
                strokeLinecap="butt"
                format={(value) =>
                  `${(Number(value) / 100) * getTotalProjects()} jobs`
                }
                percent={getPercentByStatus([ProjectStatus.PENDING])}
              />
            </div>
            <div>
              <div>Cancelled Jobs</div>
              <Progress
                className="mt-4"
                size={["100%", 20]}
                strokeLinecap="butt"
                format={(value) =>
                  `${(Number(value) / 100) * getTotalProjects()} jobs`
                }
                percent={getPercentByStatus([ProjectStatus.CLOSED])}
              />
            </div>
          </div>
        </div>
        <div className="border">
          <div className="text-start font-semibold text-xl p-4 border-b">
            Proposals summary
          </div>
          <div className="mt-16">
            <BidSummaryChart
              bidSumData={getBidSummaryData(
                bids?.data?.items || [],
                projects?.data?.value || [],
                accountId
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
