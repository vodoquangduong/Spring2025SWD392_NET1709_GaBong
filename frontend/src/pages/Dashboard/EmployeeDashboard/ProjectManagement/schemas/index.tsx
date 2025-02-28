import {
  App,
  Button,
  Calendar,
  ConfigProvider,
  Modal,
  Popconfirm,
  Popover,
  Tag,
} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { z } from "zod";
import { Project } from "../models/types";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { approveService, rejectService } from "../services/verifyService";
import { mapProjectStatusToTag } from "@/modules/mapUiStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PUT } from "@/modules/request";

// export const formSchema = () => {
//   return z.object({
//     name: z.string().optional(),
//     email: z.string().optional(),
//   });
// };

export const projectColumns = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async ({
      projectId,
      isVerified,
    }: {
      projectId: string;
      isVerified: boolean;
    }) =>
      await PUT(`/api/Project/verify`, {
        projectId,
        isVerified,
      }),
    onError: () => {
      message.destroy();
      message.error("Project approval failed");
    },
    onSuccess: () => {
      message.destroy();
      message.success("Project approved successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  return [
    {
      title: "Id",
      dataIndex: "projectId",
      key: "id",
      render: (text: string) => (
        <Link
          to={`/projects/${text}/details`}
          className="text-xs"
        >{`#${text}`}</Link>
      ),
    },
    {
      title: "Client Id",
      dataIndex: "clientId",
      key: "clientId",
      render: (text: string) => (
        <Link
          to={`/employee/users/${text}`}
          className="text-xs"
        >{`#${text}`}</Link>
      ),
    },
    {
      title: "Post Date",
      dataIndex: "postDate",
      key: "postDate",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: "Project Description",
      dataIndex: "projectDescription",
      key: "projectDescription",
      render: (text: string) => <div className="line-clamp-4">{text}</div>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: ProjectStatus) => mapProjectStatusToTag(text),
    },
    {
      title: "Verify",
      dataIndex: "verify",
      key: "verify",
      render: (_text: string, record: ProjectDetail) => (
        <div className="flex gap-2">
          <div className="flex gap-4">
            {record.status == ProjectStatus.PENDING && (
              <>
                <Popconfirm
                  title="Approve the project"
                  description="Are you sure to approve this project?"
                  onConfirm={() => {
                    message.open({
                      type: "loading",
                      content: "Approving project ...",
                      duration: 0,
                    });
                    approveService(record.projectId, mutation);
                  }}
                >
                  <Button type="primary" className="font-bold">
                    Approve
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="Reject the project"
                  description="Are you sure to reject this project?"
                  onConfirm={() => rejectService(record.projectId, mutation)}
                >
                  <Button type="primary" danger className="font-bold">
                    Reject
                  </Button>
                </Popconfirm>
              </>
            )}
          </div>
        </div>
      ),
    },
  ];
};
