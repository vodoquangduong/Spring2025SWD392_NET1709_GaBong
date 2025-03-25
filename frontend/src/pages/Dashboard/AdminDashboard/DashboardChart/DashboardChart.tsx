import { GET } from "@/modules/request";
import { Portfolio } from "@/pages/Profile/models/types";
import useAuthStore from "@/stores/authStore";
import { ProjectDetail } from "@/types/project";
import { PaginatedResult, ResultServerResponse } from "@/types/serverResponse";
import { Transaction } from "@/types/transaction";
import { useQueries } from "@tanstack/react-query";
import { Spin } from "antd";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Account } from "../AccountManagement/models/types";
import {
  RevenueDataPoint,
  TopFreelancerWithReputation,
  dashboardChartService,
} from "./services/dashboardChartService";

// Import components directly from their files instead of the index
import AccountDistribution from "./partials/AccountDistribution";
import PlatformOverview from "./partials/PlatformOverview";
import ProjectStatus from "./partials/ProjectStatus";
import RevenueChart from "./partials/RevenueChart";
import TopFreelancers from "./partials/TopFreelancers";

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
        opacityTo: 9,
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

  return (
    <div className="geist min-h-screen pt-6 pb-40">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <PlatformOverview dashboardStats={dashboardStats} />
          <ProjectStatus dashboardStats={dashboardStats} />
          <AccountDistribution accountStats={accountStats} />
          <RevenueChart
            startDate={startDate}
            endDate={endDate}
            groupBy={groupBy}
            revenueGraphData={revenueGraphData}
            loadingRevenue={loadingRevenue}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setGroupBy={setGroupBy}
            fetchRevenueData={fetchRevenueData}
            revenueChartOptions={revenueChartOptions}
            revenueChartSeries={revenueChartSeries}
          />

          <div className="w-full grid grid-cols-1 gap-6 mt-8">
            <TopFreelancers topFreelancers={topFreelancers} loading={loading} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardChart;
