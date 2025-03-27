import { App } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

export const tableColumns = (budget: number) => {
  return [
    {
      title: "Description",
      dataIndex: "milestoneName",
      key: "1",
      render: (text: string, record: any) => (
        <div>
          <div className="font-semibold text-lg">{text}</div>
          <div>{record?.milestoneDescription}</div>
        </div>
      ),
    },
    {
      title: "Percentage",
      dataIndex: "payAmount",
      key: "3",
      render: (text: string) => Number(text).toFixed(2) + " %",
    },
    {
      title: "Budget Amount",
      dataIndex: "description",
      key: "2",
      render: (text: string, record: any) =>
        ((record?.payAmount / 100) * budget).toFixed(2) + " USD",
    },
    {
      title: "Deadline",
      dataIndex: "deadlineDate",
      key: "4",
      render: (text: string) => dayjs(text).format("DD-MM-YYYY HH:mm"),
    },
  ];
};
