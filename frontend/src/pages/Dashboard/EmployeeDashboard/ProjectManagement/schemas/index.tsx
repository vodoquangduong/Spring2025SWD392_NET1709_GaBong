import { Button, Calendar, ConfigProvider, Modal, Popover, Tag } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { z } from "zod";
import { Project } from "../models/types";
import { ProjectStatus } from "@/types";

// export const formSchema = () => {
//   return z.object({
//     name: z.string().optional(),
//     email: z.string().optional(),
//   });
// };

export const projectColumns = () => {
  return [
    {
      title: "Id",
      dataIndex: "projectId",
      key: "id",
      render: (text: string) => (
        <Link
          to={`/worker/users/${text}`}
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
          to={`/worker/users/${text}`}
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
      render: (text: string) => <div className="line-clamp-3">{text}</div>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: ProjectStatus) => text,
    },
    // {
    //   title: "Verify",
    //   dataIndex: "verify",
    //   key: "verify",
    //   render: (_text: string, record: User) => (
    //     <div className="flex gap-2">
    //       <div className="flex gap-4">
    //         <UpdateModal
    //           record={record}
    //           form={form(record)}
    //           min={true}
    //           title={`Update user ${record?.name}`}
    //         />
    //       </div>
    //     </div>
    //   ),
    // },
  ];
};
