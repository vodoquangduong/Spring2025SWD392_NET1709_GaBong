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
import { POST, PUT } from "@/modules/request";
import useChatStore from "@/components/ChatPopup/stores/chatStore";
import { NotificationStatus, NotificationType } from "@/types/notification";

// export const formSchema = () => {
//   return z.object({
//     name: z.string().optional(),
//     email: z.string().optional(),
//   });
// };

export const projectColumns = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { notifyService } = useChatStore();
  const mutation = useMutation({
    mutationKey: ["projects"],
    mutationFn: async ({
      projectId,
      isVerified,
      clientId,
    }: {
      projectId: string;
      isVerified: boolean;
      clientId: string;
    }) => {
      await PUT(`/api/Project/verify`, {
        projectId,
        isVerified,
      });
    },
    onError: () => {
      message.destroy();
      message.error("Project approval failed");
    },
    onSuccess: async (data, variables) => {
      message.destroy();
      message.success("Update successfully");

      await POST(`/api/Notification`, {
        accountId: variables.clientId,
        notificationType: NotificationType.GENERAL_ANNOUNCEMENT,
        status: NotificationStatus.UNREAD,
        content: `Your project (#${variables.projectId}) has been ${
          variables.isVerified ? "approved" : "rejected"
        }`,
        time: new Date().toISOString(),
      });
      notifyService?.sendNotification(
        Number(variables.clientId),
        NotificationType.GENERAL_ANNOUNCEMENT,
        ""
      );
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
                    mutation.mutate({
                      projectId: record.projectId,
                      isVerified: true,
                      clientId: record.clientId,
                    });
                  }}
                >
                  <Button type="primary" className="font-bold">
                    Approve
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="Reject the project"
                  description="Are you sure to reject this project?"
                  onConfirm={() => {
                    message.open({
                      type: "loading",
                      content: "Rejecting project ...",
                      duration: 0,
                    });
                    mutation.mutate({
                      projectId: record.projectId,
                      isVerified: false,
                      clientId: record.clientId,
                    });
                  }}
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
