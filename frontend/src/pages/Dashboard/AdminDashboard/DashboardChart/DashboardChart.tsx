import { defaultAvatar } from "@/modules/default";
import { GET } from "@/modules/request";
import { Portfolio } from "@/pages/Profile/models/types";
import useAuthStore from "@/stores/authStore";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { PaginatedResult, ResultServerResponse } from "@/types/serverResponse";
import { Transaction } from "@/types/transaction";
import { useQueries } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  List,
  Progress,
  Select,
  Spin,
  Statistic,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import ApexCharts components
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
// Fix the import path using the correct relative path
import { Account } from "../AccountManagement/models/types";
// Import the dedicated dashboard service instead of the account management service
import {
  RevenueDataPoint,
  TopFreelancerWithReputation,
  dashboardChartService,
} from "./services/dashboardChartService";

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

  // New state for admin dashboard metrics
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalFreelancers: 0,
    pendingProjects: 0,
    verifiedProjects: 0,
    reverifyProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    totalRevenue: 0,
  });
  const [topFreelancers, setTopFreelancers] = useState<
    TopFreelancerWithReputation[]
  >([]);

  // Revenue chart states
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(30, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [groupBy, setGroupBy] = useState<string>("day"); // day, week, month, year
  const [revenueGraphData, setRevenueGraphData] = useState<RevenueDataPoint[]>(
    []
  );
  const [revenueListData, setRevenueListData] = useState<RevenueDataPoint[]>(
    []
  );
  const [loadingRevenue, setLoadingRevenue] = useState(false);

  // ApexCharts options and series
  const [revenueChartOptions, setRevenueChartOptions] = useState<ApexOptions>({
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: [],
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    colors: ["#1677ff"],
  });

  const [revenueChartSeries, setRevenueChartSeries] = useState<any[]>([
    {
      name: "Revenue",
      data: [],
    },
  ]);

  const [barChartOptions, setBarChartOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      type: "datetime",
      categories: [],
    },
    yaxis: {
      title: {
        text: "Revenue ($)",
      },
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    colors: ["#52c41a"],
  });

  const [barChartSeries, setBarChartSeries] = useState<any[]>([
    {
      name: "Revenue",
      data: [],
    },
  ]);

  // Fetch all admin dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch all metrics in parallel
        const [
          totalFreelancers,
          pendingProjects,
          verifiedProjects,
          reverifyProjects,
          ongoingProjects,
          completedProjects,
          totalRevenue,
          topTenFreelancers,
        ] = await Promise.all([
          dashboardChartService.getTotalFreelancers(),
          dashboardChartService.getTotalPendingProjects(),
          dashboardChartService.getTotalVerifiedProjects(),
          dashboardChartService.getTotalReverifyProjects(),
          dashboardChartService.getTotalOngoingProjects(),
          dashboardChartService.getTotalCompletedProjects(),
          dashboardChartService.getTotalRevenue(),
          dashboardChartService.getTopTenReputation(),
        ]);

        setDashboardStats({
          totalFreelancers,
          pendingProjects,
          verifiedProjects,
          reverifyProjects,
          ongoingProjects,
          completedProjects,
          totalRevenue,
        });

        setTopFreelancers(topTenFreelancers);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Fetch revenue data based on selected date range and grouping
  const fetchRevenueData = async () => {
    setLoadingRevenue(true);
    try {
      const [graphData, listData] = await Promise.all([
        dashboardChartService.getRevenueGraph(startDate, endDate, groupBy),
        dashboardChartService.getRevenueList(startDate, endDate),
      ]);

      setRevenueGraphData(graphData);
      setRevenueListData(listData);

      // Update chart data
      if (graphData && graphData.length > 0) {
        // Update area chart
        setRevenueChartOptions({
          ...revenueChartOptions,
          xaxis: {
            ...revenueChartOptions.xaxis,
            categories: graphData.map((item) => item.date),
          },
        });
        setRevenueChartSeries([
          {
            name: "Revenue",
            data: graphData.map((item) => item.revenue),
          },
        ]);

        // Update bar chart
        if (listData && listData.length > 0) {
          setBarChartOptions({
            ...barChartOptions,
            xaxis: {
              ...barChartOptions.xaxis,
              categories: listData.map((item) => item.date),
            },
          });
          setBarChartSeries([
            {
              name: "Revenue",
              data: listData.map((item) => item.revenue),
            },
          ]);
        }
      } else {
        // Set empty data for charts
        setRevenueChartSeries([{ name: "Revenue", data: [] }]);
        setBarChartSeries([{ name: "Revenue", data: [] }]);
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoadingRevenue(false);
    }
  };

  // Fetch revenue data on initial load and when date/group parameters change
  useEffect(() => {
    fetchRevenueData();
  }, [startDate, endDate, groupBy]);

  // Fetch all accounts for statistics
  useEffect(() => {
    const fetchAccounts = async () => {
      setAccountsLoading(true);
      try {
        // Use the dedicated dashboard service that fetches all accounts without pagination
        const allAccounts =
          await dashboardChartService.getAllAccountsForDashboard();
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
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Main Stats Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Platform Overview</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                <Statistic
                  title="Total Freelancers"
                  value={dashboardStats.totalFreelancers}
                  valueStyle={{ color: "#3f8600" }}
                />
              </div>
              <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                <Statistic
                  title="Total Revenue"
                  value={dashboardStats.totalRevenue}
                  prefix="$"
                  valueStyle={{ color: "#1677ff" }}
                />
              </div>
              <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                <Statistic
                  title="Completed Projects"
                  value={dashboardStats.completedProjects}
                  valueStyle={{ color: "#52c41a" }}
                />
              </div>
              <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                <Statistic
                  title="Ongoing Projects"
                  value={dashboardStats.ongoingProjects}
                  valueStyle={{ color: "#1677ff" }}
                />
              </div>
            </div>

            {/* Project Status Section */}
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Project Status</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                  <Statistic
                    title="Pending Projects"
                    value={dashboardStats.pendingProjects}
                    valueStyle={{ color: "#faad14" }}
                  />
                </div>
                <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                  <Statistic
                    title="Verified Projects"
                    value={dashboardStats.verifiedProjects}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </div>
                <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                  <Statistic
                    title="Reverify Projects"
                    value={dashboardStats.reverifyProjects}
                    valueStyle={{ color: "#cf1322" }}
                  />
                </div>
                <div className="dark:bg-black/20 border shadow rounded-lg p-4 bg-white">
                  <Statistic
                    title="Total Projects"
                    value={
                      dashboardStats.pendingProjects +
                      dashboardStats.verifiedProjects +
                      dashboardStats.reverifyProjects +
                      dashboardStats.ongoingProjects +
                      dashboardStats.completedProjects
                    }
                    valueStyle={{ color: "#1677ff" }}
                  />
                </div>
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
                            (accountStats.freelancers / accountStats.total) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <Progress
                    percent={
                      accountStats.total
                        ? Math.round(
                            (accountStats.freelancers / accountStats.total) *
                              100
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

          {/* Revenue Section */}
          <div className="mt-8 border p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Revenue Overview</h2>
              <div className="flex gap-4">
                <DatePicker.RangePicker
                  value={[dayjs(startDate), dayjs(endDate)]}
                  onChange={(dates) => {
                    if (dates && dates[0] && dates[1]) {
                      setStartDate(dates[0].format("YYYY-MM-DD"));
                      setEndDate(dates[1].format("YYYY-MM-DD"));
                    }
                  }}
                />
                <Select
                  value={groupBy}
                  onChange={setGroupBy}
                  options={[
                    { value: "day", label: "Daily" },
                    { value: "week", label: "Weekly" },
                    { value: "month", label: "Monthly" },
                    { value: "year", label: "Yearly" },
                  ]}
                  style={{ width: 120 }}
                />
                <Button
                  type="primary"
                  onClick={fetchRevenueData}
                  loading={loadingRevenue}
                >
                  Apply
                </Button>
              </div>
            </div>

            {loadingRevenue ? (
              <div className="flex justify-center items-center h-64">
                <Spin />
              </div>
            ) : revenueGraphData.length > 0 ? (
              <div className="h-[400px]">
                <ReactApexChart
                  options={revenueChartOptions}
                  series={revenueChartSeries}
                  type="area"
                  height={350}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p>No revenue data available for the selected period</p>
              </div>
            )}
          </div>

          <div className="w-full grid grid-cols-3 gap-6 mt-8">
            {/* Revenue Listing */}
            {/* <div className="col-span-2 border p-4 h-[500px] bg-white overflow-auto">
              <h2 className="text-xl font-bold mb-4">Revenue Details</h2>
              {loadingRevenue ? (
                <div className="flex justify-center items-center h-64">
                  <Spin />
                </div>
              ) : revenueListData.length > 0 ? (
                <div className="h-[400px]">
                  <ReactApexChart
                    options={barChartOptions}
                    series={barChartSeries}
                    type="bar"
                    height={350}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center h-64">
                  <p>No revenue details available for the selected period</p>
                </div>
              )}
            </div> */}

            {/* Top Freelancers List */}
            <div className="border p-4 h-[500px] bg-white">
              <List
                className="bg-white dark:bg-zinc-900 border-0 overflow-auto max-h-[460px] custom-scrollbar"
                header={
                  <div className="text-xl font-bold sticky top-0 z-10 bg-white py-2">
                    Top 10 Freelancers by Reputation
                  </div>
                }
                bordered
                dataSource={topFreelancers}
                loading={loading}
                locale={{ emptyText: "No freelancers data available" }}
                renderItem={(item: TopFreelancerWithReputation) => (
                  <List.Item className="flex flex-col items-start">
                    <div className="flex w-full">
                      <img
                        className="mt-2 w-12 aspect-square rounded-xl object-cover object-center bg-white border"
                        src={item.avatarURL || defaultAvatar}
                        alt={item.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = defaultAvatar;
                        }}
                      />
                      <div className="flex-1 ml-4 w-3/4">
                        <div
                          title={item?.name}
                          className="hover:text-emerald-400 cursor-pointer font-semibold w-full truncate mb-1"
                          onClick={() =>
                            navigate(`/admin/accounts/${item?.accountId}`)
                          }
                        >
                          {item?.name} - {item?.email}
                        </div>
                        <div className="flex gap-y-2">
                          <div className="flex gap-1 flex-wrap">
                            <Tag className="text-xs" color="blue-inverse">
                              {item?.reputationPoint} Points
                            </Tag>
                            {item.role === 2 ? (
                              <Tag className="text-xs" color="green-inverse">
                                Freelancer
                              </Tag>
                            ) : (
                              <Tag className="text-xs" color="purple-inverse">
                                Client
                              </Tag>
                            )}
                            <Tag className="text-xs" color="orange-inverse">
                              Credit: ${item.totalCredit.toFixed(2)}
                            </Tag>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
                style={{
                  scrollBehavior: "smooth",
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardChart;
