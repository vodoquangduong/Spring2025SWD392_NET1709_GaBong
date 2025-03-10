import { Bid } from "@/types/bid";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const proposalColumns = (): ColumnsType<Bid> => {
  return [
    {
      title: "Project",
      dataIndex: "projectId",
      key: "bidId",
      render: (text: string) => (
        <Link to={`/projects/${text}/details`}>#{text}</Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "bidDescription",
      key: "description",
      render: (text: string, record) => (
        <Link to={`/projects/${record.projectId}/proposals`}>{text}</Link>
      ),
    },
    {
      title: "Offer",
      dataIndex: "bidOffer",
      key: "bidOffer",
      render: (text: string) => Number(text).toLocaleString() + " USD",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("DD-MM-YYYY"),
    },
  ];
};
