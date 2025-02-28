import { mapProjectStatusToTag } from "@/modules/mapUiStatus";
import { ProjectStatus } from "@/types/project";
import { App } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const tableColumns = () => {
  const { message } = App.useApp();

  return [
    {
      title: "Id",
      dataIndex: "projectId",
      key: "1",
      render: (text: string) => (
        <Link
          to={`/employee/projects/${text}`}
          className="text-xs"
        >{`#${text}`}</Link>
      ),
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "2",
      render: (text: string, record: any) => (
        <Link to={`/projects/${record.projectId}/details`} className="text-xs">
          {text}
        </Link>
      ),
    },
    {
      title: "Estimate Budget",
      dataIndex: "estimateBudget",
      key: "3",
      render: (text: string) => text,
    },
    {
      title: "Post date",
      dataIndex: "postDate",
      key: "4",
      render: (text: string) => text,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "5",
      render: (text: ProjectStatus) => <div>{mapProjectStatusToTag(text)}</div>,
    },
  ];
};
