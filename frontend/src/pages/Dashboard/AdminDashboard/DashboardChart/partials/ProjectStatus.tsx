import { Statistic } from "antd";
import React from "react";

interface ProjectStatusProps {
  dashboardStats: {
    pendingProjects: number;
    verifiedProjects: number;
    reverifyProjects: number;
    ongoingProjects: number;
    completedProjects: number;
  };
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({ dashboardStats }) => {
  return (
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
  );
};

export default ProjectStatus;
