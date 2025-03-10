import CreateModal from "@/components/CreateModal";
import { mapProjectStatusToTag } from "@/modules/mapUiStatus";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { App, Button } from "antd";
import React from "react";
import { FaPen } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import CreateFeedbackForm from "../partials/CreateFeedbackForm";
import useAuthStore from "@/stores/authStore";
import { Role } from "@/types";
import { ColumnsType } from "antd/es/table";

export const tableColumns = (): ColumnsType<ProjectDetail> => {
  const { role } = useAuthStore();
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
    ...(role === Role.CLIENT
      ? [
          {
            title: "",
            dataIndex: "status",
            key: "6",
            render: (status: ProjectStatus, record: any) => (
              <div>
                {status == ProjectStatus.COMPLETED && (
                  <CreateModal
                    icon={<MdOutlineFeedback />}
                    children="Feedback freelancer"
                    type="default"
                    modalTitle={"Write feedback to freelancer"}
                    form={(
                      setIsModalOpen: React.Dispatch<
                        React.SetStateAction<boolean>
                      >
                    ) => (
                      <CreateFeedbackForm
                        record={record}
                        setIsModalOpen={setIsModalOpen}
                      />
                    )}
                  />
                )}
                {status == ProjectStatus.REVERIFIED && (
                  <Button
                    icon={<FaPen />}
                    className="font-semibold"
                    onClick={() => {
                      navigate("/post-project", { state: { project: record } });
                      // setProject(record);
                    }}
                  >
                    Update project infor
                  </Button>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];
};
