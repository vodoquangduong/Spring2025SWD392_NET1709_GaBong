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
      dataIndex: "notificationId",
      key: "1",
      render: (text: string) => text,
    },
    {
      title: "Id",
      dataIndex: "projectId",
      key: "1",
      render: (text: string) => text,
    },
  ];
};
