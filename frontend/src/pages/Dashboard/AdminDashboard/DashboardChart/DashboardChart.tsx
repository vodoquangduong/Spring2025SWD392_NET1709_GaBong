import { getEarningChartData } from "@/modules/dashboardDataHandler";
import { defaultAvatar } from "@/modules/default";
import { GET } from "@/modules/request";
import EarningChart from "@/pages/Manage/partials/Dashboard/partials/EarningChart";
import { Portfolio } from "@/pages/Profile/models/types";
import useAuthStore from "@/stores/authStore";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { PaginatedResult, ResultServerResponse } from "@/types/serverResponse";
import { Transaction } from "@/types/transaction";
import { useQueries } from "@tanstack/react-query";
import { List, Progress, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Fix the import path using the correct relative path
import { Account } from "../AccountManagement/models/types";
import { accountMngService } from "../AccountManagement/services/accountMngService";

// Helper function to safely parse JSON
const safeJsonParse = (
  jsonString: string | null | undefined,
  defaultValue: any = {}
) => {
  if (!jsonString || jsonString === "string" || jsonString === "")
    return defaultValue;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return defaultValue;
  }
};

const DashboardChart = () => {
  const navigate = useNavigate();
  const { accountId } = useAuthStore();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [accountStats, setAccountStats] = useState({
    total: 0,
    clients: 0,
    freelancers: 0,
    staff: 0,
    admin: 0,
    active: 0,
    suspended: 0,
    banned: 0,
  });

  // Fetch all accounts for statistics
  useEffect(() => {
    const fetchAccounts = async () => {
      setAccountsLoading(true);
      try {
        // Use existing accountMngService to get all accounts
        // Using large pageSize to get all accounts at once
        const result = await accountMngService.getAllAccounts({
          pageNumber: 1,
          pageSize: 1000,
        });

        const allAccounts = result.items || [];
        setAccounts(allAccounts);

        // Calculate account statistics
        const stats = {
          total: allAccounts.length,
          clients: allAccounts.filter((acc) => acc.role === 3).length,
          freelancers: allAccounts.filter((acc) => acc.role === 2).length,
          staff: allAccounts.filter((acc) => acc.role === 1).length,
          admin: allAccounts.filter((acc) => acc.role === 0).length,
          active: allAccounts.filter((acc) => acc.status === 0).length,
          suspended: allAccounts.filter((acc) => acc.status === 1).length,
          banned: allAccounts.filter((acc) => acc.status === 2).length,
        };

        setAccountStats(stats);
      } catch (error) {
        console.error("Error fetching accounts for dashboard:", error);
      } finally {
        setAccountsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Get top freelancers by reputation
  const getTopFreelancers = () => {
    return accounts
      .filter((acc) => acc.role === 2) // Filter freelancers only
      .sort((a, b) => b.reputationPoint - a.reputationPoint) // Sort by reputation points
      .slice(0, 10); // Get top 10
  };

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
            <div className="text-2xl font-bold">
              {accountStats.clients || 0}
            </div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              Total Freelancers
            </div>
            <div className="text-2xl font-bold">
              {accountStats.freelancers || 0}
            </div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              Active Users
            </div>
            <div className="text-2xl font-bold">{accountStats.active || 0}</div>
          </div>
          <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
            <div className="text-sm font-semibold text-gray-500">
              Total Accounts
            </div>
            <div className="text-2xl font-bold">{accountStats.total || 0}</div>
          </div>
        </div>
      </div>

      {/* Account Distribution Charts */}
      <div className="w-full grid grid-cols-2 gap-6 mt-8">
        {/* Role Distribution */}
        <div className="border p-4 h-[250px] bg-white">
          <div className="text-xl font-bold mb-4">
            Account Role Distribution
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between mb-1">
                <span>Clients: {accountStats.clients}</span>
                <span>
                  {accountStats.total
                    ? Math.round(
                        (accountStats.clients / accountStats.total) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
              <Progress
                percent={
                  accountStats.total
                    ? Math.round(
                        (accountStats.clients / accountStats.total) * 100
                      )
                    : 0
                }
                showInfo={false}
                strokeColor="#4096ff"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Freelancers: {accountStats.freelancers}</span>
                <span>
                  {accountStats.total
                    ? Math.round(
                        (accountStats.freelancers / accountStats.total) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
              <Progress
                percent={
                  accountStats.total
                    ? Math.round(
                        (accountStats.freelancers / accountStats.total) * 100
                      )
                    : 0
                }
                showInfo={false}
                strokeColor="#52c41a"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Staff: {accountStats.staff}</span>
                <span>
                  {accountStats.total
                    ? Math.round(
                        (accountStats.staff / accountStats.total) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
              <Progress
                percent={
                  accountStats.total
                    ? Math.round(
                        (accountStats.staff / accountStats.total) * 100
                      )
                    : 0
                }
                showInfo={false}
                strokeColor="#722ed1"
              />
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="border p-4 h-[250px] bg-white">
          <div className="text-xl font-bold mb-4">
            Account Status Distribution
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between mb-1">
                <span>Active: {accountStats.active}</span>
                <span>
                  {accountStats.total
                    ? (
                        (accountStats.active / accountStats.total) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
              </div>
              <Progress
                percent={
                  accountStats.total
                    ? (accountStats.active / accountStats.total) * 100
                    : 0
                }
                showInfo={false}
                strokeColor="#52c41a"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Suspended: {accountStats.suspended}</span>
                <span>
                  {accountStats.total
                    ? (
                        (accountStats.suspended / accountStats.total) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
              </div>
              <Progress
                percent={
                  accountStats.total
                    ? (accountStats.suspended / accountStats.total) * 100
                    : 0
                }
                showInfo={false}
                strokeColor="#faad14"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Banned: {accountStats.banned}</span>
                <span>
                  {accountStats.total
                    ? (
                        (accountStats.banned / accountStats.total) *
                        100
                      ).toFixed(2)
                    : 0}
                  %
                </span>
              </div>
              <Progress
                percent={
                  accountStats.total
                    ? (accountStats.banned / accountStats.total) * 100
                    : 0
                }
                showInfo={false}
                strokeColor="#f5222d"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2 border p-4 h-[600px] bg-white">
          <EarningChart
            data={getEarningChartData(
              Array.isArray(transactions?.data) ? transactions.data : []
            )}
          />
        </div>
        <div className="border p-4 h-[600px] bg-white">
          <List
            className="bg-white dark:bg-zinc-900 border-0"
            header={<div className="text-xl font-bold">Top 10 Freelancers</div>}
            bordered
            dataSource={freelancers.data?.value?.items?.slice(0, 10)}
            loading={freelancers.isLoading}
            renderItem={(item: Portfolio) => {
              // Process portfolio data safely if needed
              const portfolioData = item.works ? safeJsonParse(item.works) : {};

              return (
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
                          navigate(`/admin/accounts/${item?.freelancerId}`)
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
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
