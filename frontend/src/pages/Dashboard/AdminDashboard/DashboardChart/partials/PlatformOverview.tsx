import { Statistic } from "antd";

interface PlatformOverviewProps {
  dashboardStats: {
    totalFreelancers: number;
    totalRevenue: number;
    completedProjects: number;
    ongoingProjects: number;
    pendingProjects: number;
    verifiedProjects: number;
    reverifyProjects: number;
  };
}

const PlatformOverview: React.FC<PlatformOverviewProps> = ({
  dashboardStats,
}) => {
  return (
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
    </div>
  );
};

export default PlatformOverview;
