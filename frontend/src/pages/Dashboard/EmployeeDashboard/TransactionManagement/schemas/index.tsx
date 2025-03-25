import {
  App,
  Button,
  Calendar,
  ConfigProvider,
  Modal,
  Popconfirm,
  Popover,
  Tag,
  Typography,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { z } from "zod";
import { ProjectDetail, ProjectStatus } from "@/types/project";
import { approveService, rejectService } from "../services/verifyService";
import {
  mapProjectStatusToTag,
  mapTransactionStatusToTag,
  mapTransactionTypeToTag,
} from "@/modules/mapUiStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST, PUT } from "@/modules/request";
import useChatStore from "@/components/ChatPopup/stores/chatStore";
import { NotificationStatus, NotificationType } from "@/types/notification";
import { FaEye } from "react-icons/fa";
import useUiStore from "@/stores/uiStore";
import { ColumnType } from "antd/es/table";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";
import { TableProps } from "antd/lib";

// export const formSchema = () => {
//   return z.object({
//     name: z.string().optional(),
//     email: z.string().optional(),
//   });
// };

export const transactionColumns = (): ColumnType<Transaction>[] => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { notifyService } = useChatStore();
  const { requestRevalidate } = useUiStore();

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
      requestRevalidate();
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return [
    {
      title: "Trans ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Issuer",
      dataIndex: "accountId",
      key: "accountId",
      render: (text: string) => (
        <Link
          to={`/manage/dashboard/employee/accounts/${text}`}
          className="text-xs"
        >{`#${text}`}</Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: number) => mapTransactionTypeToTag(type),
      filters: [
        { text: "Deposit", value: TransactionType.DEPOSIT },
        { text: "Withdrawal", value: TransactionType.WITHDRAWAL },
        { text: "Earnings", value: TransactionType.EARNINGS },
        { text: "Payment", value: TransactionType.PAYMENT },
        { text: "Fee", value: TransactionType.FEE },
      ],
      onFilter: (value: any, record: Transaction) => record.type === value,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, record: Transaction) => {
        let type: "success" | "danger" | "warning" | undefined;
        if (
          record.type === TransactionType.DEPOSIT ||
          record.type === TransactionType.EARNINGS ||
          record.type === TransactionType.REFUND
        ) {
          type = "success";
        } else if (
          record.type === TransactionType.WITHDRAWAL ||
          record.type === TransactionType.PAYMENT ||
          record.type === TransactionType.FEE
        ) {
          type = "danger";
        }

        const prefix =
          record.type === TransactionType.WITHDRAWAL ||
          record.type === TransactionType.PAYMENT ||
          record.type === TransactionType.FEE
            ? "-"
            : "+";

        return (
          <Typography.Text type={type} strong>
            {prefix} {formatCurrency(amount)}
          </Typography.Text>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => mapTransactionStatusToTag(status),
      filters: [
        { text: "Pending", value: TransactionStatus.PENDING },
        { text: "Completed", value: TransactionStatus.COMPLETED },
        { text: "Failed", value: TransactionStatus.FAILED },
        { text: "Refunded", value: TransactionStatus.REFUNDED },
        { text: "Cancelled", value: TransactionStatus.CANCELLED },
      ],
      onFilter: (value: any, record: Transaction) => record.status === value,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => date,
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (date: string) => date,
    },
  ];
};
