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
import CreateModal from "@/components/CreateModal";
import { FaPen } from "react-icons/fa";
import CreateCategoryForm from "../forms/CreateCategoryForm";

// export const formSchema = () => {
//   return z.object({
//     name: z.string().optional(),
//     email: z.string().optional(),
//   });
// };

export const categoryColumns = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { notifyService } = useChatStore();

  return [
    {
      title: "Id",
      dataIndex: "skillId",
      key: "id",
      render: (text: string) => "#" + text,
    },
    {
      title: "Name",
      dataIndex: "skillName",
      key: "skillName",
      render: (text: string) => "#" + text,
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "edit",
      render: (text: string, record: any) => (
        <>
          <CreateModal
            type="default"
            children={<FaPen />}
            modalTitle={"Update Category"}
            form={(
              setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
            ) => (
              <CreateCategoryForm
                setIsModalOpen={setIsModalOpen}
                record={record}
              />
            )}
          />
        </>
      ),
    },
  ];
};
