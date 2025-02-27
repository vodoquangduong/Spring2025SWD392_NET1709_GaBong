import { ProjectStatus } from "@/types/project";
import { Tag } from "antd";

export const mapProjectStatusToTag = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.PENDING:
      return <Tag color="gold">Pending</Tag>;
    case ProjectStatus.VERIFIED:
      return <Tag color="green">Verified</Tag>;
    case ProjectStatus.REVERIFIED:
      return <Tag color="gold">Re verify</Tag>;
    case ProjectStatus.CLOSED:
      return <Tag color="red">Cancelled</Tag>;
    case ProjectStatus.COMPLETED:
      return <Tag color="red">Completed</Tag>;
  }
};
