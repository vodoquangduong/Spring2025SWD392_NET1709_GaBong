import dayjs from "dayjs";
import React from "react";

export const invoiceColumns = (project: any) => {
  //   const milestones = project?.milestones;

  return [
    {
      title: "No.",
      dataIndex: "index",
      key: "description",
      render: (text: string, _: any, index: number) => index + 1,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: string, record: any) => {
        return (
          <div>
            <div className="font-semibold text-lg">{record.milestoneName}</div>
            <div>{record.milestoneDescription}</div>
          </div>
        );
      },
    },
    {
      title: "Percentage",
      dataIndex: "payAmount",
      key: "amount",
      render: (amount: number) => {
        return <div>{Number(amount).toLocaleString()}%</div>;
      },
    },
    {
      title: "Budget Amount",
      dataIndex: "Budget Amount",
      key: "amount",
      render: (amount: number, record: any) => {
        return (
          <div>
            {Number(
              (project?.estimateBudget * record?.payAmount) / 100
            ).toLocaleString()}{" "}
            USD
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "Budget Amount",
      key: "amount",
      render: (amount: number, record: any) => {
        return (
          <div>
            {Number(
              (project?.estimateBudget * record?.payAmount) / 100
            ).toLocaleString()}{" "}
            USD
          </div>
        );
      },
    },
  ];
};
