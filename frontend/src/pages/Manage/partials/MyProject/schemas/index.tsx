import CreateModal from "@/components/CreateModal";
import { mapProjectStatusToTag } from "@/modules/mapUiStatus";
import { ProjectStatus } from "@/types/project";
import { App, Button } from "antd";
import React from "react";
import { FaPen } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export const tableColumns = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();

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
    {
      title: "",
      dataIndex: "status",
      key: "6",
      render: (status: ProjectStatus, record: any) => (
        <div>
          {status == ProjectStatus.COMPLETED && (
            <Button type="link" size="small">
              Review freelancer
            </Button>
          )}
          {status == ProjectStatus.REVERIFIED && (
            <Button
              type="link"
              size="small"
              onClick={() => {
                navigate("/post-project", { state: { project: record } });
              }}
              // setProject(record);
            >
              Update project information
            </Button>
          )}
        </div>
      ),
    },
  ];
};
