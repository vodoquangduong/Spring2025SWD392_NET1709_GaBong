import { message, Spin } from "antd";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Account } from "../AccountManagement/models/types";
import AccountDistribution from "./partials/AccountDistribution";
import PlatformOverview from "./partials/PlatformOverview";
import ProjectStatus from "./partials/ProjectStatus";
import RevenueChart from "./partials/RevenueChart";
import TopFreelancers from "./partials/TopFreelancers";
import {
  dashboardChartService,
  RevenueDataPoint,
  TopFreelancerWithReputation,
} from "./services/dashboardChartService";

const DashboardChart = () => {
  // State for accounts and statistics
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [topFreelancers, setTopFreelancers] = useState<
    TopFreelancerWithReputation[]
  >([]);
  const [loadingTopFreelancers, setLoadingTopFreelancers] =
    useState<boolean>(false);

  // State for dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({
    totalFreelancers: 0,
    totalRevenue: 0,
    pendingProjects: 0,
    verifiedProjects: 0,
    reverifyProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
  });

  // State for account statistics
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

  // Revenue chart state
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(30, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));
  const [groupBy, setGroupBy] = useState<string>("day");
  const [revenueGraphData, setRevenueGraphData] = useState<RevenueDataPoint[]>(
    []
  );
  const [loadingRevenue, setLoadingRevenue] = useState<boolean>(false);

  // Keep these for compatibility with the RevenueChart component
  const revenueChartOptions: ApexOptions = {};
  const revenueChartSeries = [{ name: "Revenue", data: [] }];

  // Fetch all accounts and calculate statistics
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const accountsData =
          await dashboardChartService.getAllAccountsForDashboard();
        setAccounts(accountsData);

        // Calculate account stats
        const total = accountsData.length;
        const clients = accountsData.filter((a) => a.role === 1).length;
        const freelancers = accountsData.filter((a) => a.role === 2).length;
        const staff = accountsData.filter((a) => a.role === 3).length;
        const admin = accountsData.filter((a) => a.role === 4).length;
        const active = accountsData.filter((a) => a.status === 1).length;
        const suspended = accountsData.filter((a) => a.status === 2).length;
        const banned = accountsData.filter((a) => a.status === 3).length;

        setAccountStats({
          total,
          clients,
          freelancers,
          staff,
          admin,
          active,
          suspended,
          banned,
        });
      } catch (error) {
        message.error("Failed to load accounts data");
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const [
          totalFreelancers,
          pendingProjects,
          verifiedProjects,
          reverifyProjects,
          ongoingProjects,
          completedProjects,
          totalRevenue,
        ] = await Promise.all([
          dashboardChartService.getTotalFreelancers(),
          dashboardChartService.getTotalPendingProjects(),
          dashboardChartService.getTotalVerifiedProjects(),
          dashboardChartService.getTotalReverifyProjects(),
          dashboardChartService.getTotalOngoingProjects(),
          dashboardChartService.getTotalCompletedProjects(),
          dashboardChartService.getTotalRevenue(),
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
      } catch (error) {
        message.error("Failed to load dashboard statistics");
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // Fetch top freelancers
  useEffect(() => {
    const fetchTopFreelancers = async () => {
      try {
        setLoadingTopFreelancers(true);
        const data = await dashboardChartService.getTopTenReputation();
        setTopFreelancers(data);
      } catch (error) {
        message.error("Failed to load top freelancers");
        console.error("Error fetching top freelancers:", error);
      } finally {
        setLoadingTopFreelancers(false);
      }
    };

    fetchTopFreelancers();
  }, []);

  // Fetch revenue data
  const fetchRevenueData = async () => {
    try {
      setLoadingRevenue(true);
      const data = await dashboardChartService.getRevenueGraph(
        startDate,
        endDate,
        groupBy
      );

      setRevenueGraphData(data);
      console.log("Revenue graph data:", data);
    } catch (error) {
      message.error("Failed to load revenue data");
      console.error("Error fetching revenue data:", error);
    } finally {
      setLoadingRevenue(false);
    }
  };

  // Initial load of revenue data
  useEffect(() => {
    fetchRevenueData();
    // Don't include revenueGraphData in dependencies to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="geist min-h-screen pt-6 pb-40">
      <PlatformOverview dashboardStats={dashboardStats} />
      <ProjectStatus dashboardStats={dashboardStats} />

      <div className="w-full grid grid-cols-2 gap-6 mt-8">
        <div className="col-span-1">
          <TopFreelancers
            topFreelancers={topFreelancers}
            loading={loadingTopFreelancers}
          />
        </div>
        <div className="col-span-1">
          <AccountDistribution accountStats={accountStats} />
        </div>
      </div>

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
        revenueChartSeries={revenueChartSeries}
      />
    </div>
  );
};

export default DashboardChart;
