import { Role } from "@/types";
import { MilestoneStatus } from "@/types/milestone";
import { ProjectStatus } from "@/types/project";
import { Tag } from "antd";

export const mapProjectStatusToTag = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.PENDING:
      return <Tag color="gold">Pending</Tag>;
    case ProjectStatus.VERIFIED:
      return <Tag color="green">Verified</Tag>;
    case ProjectStatus.REVERIFIED:
      return <Tag color="red">Re verify</Tag>;
    case ProjectStatus.ON_GOING:
      return <Tag color="blue">On going</Tag>;
    case ProjectStatus.CLOSED:
      return <Tag color="red">Cancelled</Tag>;
    case ProjectStatus.COMPLETED:
      return <Tag color="red">Completed</Tag>;
  }
};

export const mapMilestoneStatusToTag = (status: MilestoneStatus) => {
  switch (status) {
    case MilestoneStatus.NOT_STARTED:
      return <Tag color="gold">Not Started</Tag>;
    case MilestoneStatus.IN_PROGRESS:
      return <Tag color="blue">In Progress</Tag>;
    case MilestoneStatus.SUBMITTED:
      return <Tag color="blue">Submitted</Tag>;
    case MilestoneStatus.COMPLETED:
      return <Tag color="green">Completed</Tag>;
    case MilestoneStatus.CANCELLED:
      return <Tag color="red">Cancelled</Tag>;
  }
};

export const mapRoleToTag = (role: any) => {
  const getRoleName = (role: Role): string => {
    switch (role) {
      case Role.ADMIN:
        return "Admin";
      case Role.STAFF:
        return "Staff";
      case Role.FREELANCER:
        return "Freelancer";
      case Role.CLIENT:
        return "Client";
      default:
        return "Guest";
    }
  };

  return (
    <Tag color="blue" className="px-3 py-1 text-sm font-medium rounded-full">
      {getRoleName(role)}
    </Tag>
  );
};
