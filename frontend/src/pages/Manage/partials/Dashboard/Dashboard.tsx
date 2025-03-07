import React from "react";
import EarningChart from "./partials/EarningChart";
import { Progress } from "antd";
import BidSummaryChart from "./partials/BidSummaryChart";
import { useQueries } from "@tanstack/react-query";
import useAuthStore from "@/stores/authStore";
import { GET } from "@/modules/request";
import { Transaction } from "@/types/transaction";

const Dashboard = () => {
  const { accountId } = useAuthStore();
  const [transactions] = useQueries({
    queries: [
      {
        queryKey: ["transactions"],
        queryFn: async (): Promise<Transaction[]> =>
          await GET(`/api/Transaction/${accountId}`),
      },
    ],
  });
  return (
    <div className="geist min-h-screen py-8">
      <div>
        <div className="text-3xl font-bold">Dashboard</div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Total Projects
            </div>
            <div className="text-2xl font-bold">120</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Completed Milestones
            </div>
            <div className="text-2xl font-bold">340</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Pending Approvals
            </div>
            <div className="text-2xl font-bold">15</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              New Messages
            </div>
            <div className="text-2xl font-bold">8</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4">
            <div className="text-sm font-semibold text-gray-500">
              Upcoming Deadlines
            </div>
            <div className="text-2xl font-bold">5</div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-3 border p-4 h-[600px]">
          <EarningChart transactions={transactions.data || []} />
        </div>
        <div className="border">
          <div className="text-start font-semibold text-xl p-4 border-b">
            Total earnings
          </div>
          <div className="grid grid-rows-2 gap-y-0 h-[400px]">
            <div className="border-b flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold text-emerald-600">
                3,000
                <span className="text-sm text-zinc-500 pl-1">USD</span>
              </div>
              <div>Your total earnings since joining Freelancer</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold text-emerald-600">
                1,200
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
                percent={75}
              />
            </div>
            <div>
              <div>On-going Jobs</div>
              <Progress
                className="mt-4"
                size={["100%", 20]}
                strokeLinecap="butt"
                percent={75}
              />
            </div>
            <div>
              <div>Pending Jobs</div>
              <Progress
                className="mt-4"
                size={["100%", 20]}
                strokeLinecap="butt"
                percent={75}
              />
            </div>
            <div>
              <div>Cancelled Jobs</div>
              <Progress
                className="mt-4"
                size={["100%", 20]}
                strokeLinecap="butt"
                percent={75}
              />
            </div>
          </div>
        </div>
        <div className="border">
          <div className="text-start font-semibold text-xl p-4 border-b">
            Bid conversion
          </div>
          <div className="grid grid-rows-2 gap-y-0 h-[400px]">
            <div className="border-b flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold text-emerald-600">
                3,000
                <span className="text-sm text-zinc-500 pl-1">USD</span>
              </div>
              <div>Your total earnings since joining Freelancer</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold text-emerald-600">
                1,200
                <span className="text-sm text-zinc-500 pl-1">USD</span>
              </div>
              <div>Your total earnings since last 30 days</div>
            </div>
          </div>
        </div>
        <div className="border">
          <div className="text-start font-semibold text-xl p-4 border-b">
            Bid summary
          </div>
          <BidSummaryChart />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
