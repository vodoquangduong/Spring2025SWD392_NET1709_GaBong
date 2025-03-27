import { Bid } from "@/types/bid";
import { FeedbackType } from "@/types/feedback";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const proposalColumns = (): ColumnsType<FeedbackType> => {
  return [
    {
      title: "Project",
      dataIndex: "projectId",
      key: "projectId",
      render: (text: string) => (
        <Link to={`/projects/${text}/details`}>#{text}</Link>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (text: string, record) =>
        text,
        // <Link to={`/projects/${record.projectId}/proposals`}>{text}</Link>
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (text: string) => text,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("DD-MM-YYYY"),
    },
  ];
};
