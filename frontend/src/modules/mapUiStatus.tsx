import { ProjectStatus } from "@/types/project";
import { Tag } from "antd";

export const mapProjectStatusToTag = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.PENDING:
      return <Tag color="gold">Pending</Tag>;
    case ProjectStatus.OPEN:
      return <Tag color="green">Open</Tag>;
    case ProjectStatus.COMPLETED:
      return <Tag color="green">Completed</Tag>;
    case ProjectStatus.CANCELLED:
      return <Tag color="red">Cancelled</Tag>;
    default:
      return <Tag color="green">Pending</Tag>;
  }
};
