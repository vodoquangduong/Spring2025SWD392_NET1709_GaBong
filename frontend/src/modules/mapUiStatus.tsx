import { ProjectStatus } from "@/types/project";
import { Tag } from "antd";

export const mapProjectStatusToTag = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.PENDING:
      return <Tag color="gold-inverse">Pending</Tag>;
    case ProjectStatus.VERIFIED:
      return <Tag color="green-inverse">Verified</Tag>;
    case ProjectStatus.REVERIFIED:
      return <Tag color="red-inverse">Re verify</Tag>;
    case ProjectStatus.ON_GOING:
      return <Tag color="blue-inverse">On going</Tag>;
    case ProjectStatus.CLOSED:
      return <Tag color="red-inverse">Cancelled</Tag>;
    case ProjectStatus.COMPLETED:
      return <Tag color="red-inverse">Completed</Tag>;
  }
};
