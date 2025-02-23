import { Button, Calendar, ConfigProvider, Modal, Popover, Tag } from "antd";
import { Link } from "react-router-dom";
import UserPopover from "../UserList/partials/UserPopover";
import { useState } from "react";
import dayjs from "dayjs";
import CreateUserForm from "../forms/CreateUserForm";
import UpdateModal from "../../../../components/UpdateModal";
import { defaultAvatar } from "../../../../modules/default";
import { z } from "zod";
import { User } from "../../../../types";

export const schema = () => {
  return z.object({
    name: z.string().optional(),
    email: z.string().optional(),
  });
};

export const userColumns = () => {
  // This function is used to convert the create from to update form
  const form = (record: User) => {
    return (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => (
      <CreateUserForm setIsModalOpen={setIsModalOpen} record={record} />
    );
  };

  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <Link
          to={`/worker/users/${text}`}
          className="text-xs"
        >{`#${text}`}</Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: User) => (
        <Popover content={<UserPopover record={record} />}>
          <Link className="" to={`/worker/users/1`}>
            {text}
          </Link>
        </Popover>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imageLink: string) => (
        <img
          className="fit-picture w-10 aspect-square rounded-full"
          src={imageLink ?? defaultAvatar}
          alt="User's avatar"
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <a className="" href={`mailto:${text}`}>
          {text}
        </a>
      ),
    },

    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (text: string) => (
        <div>{dayjs(text).format("DD/MM/YYYY - HH:mm")}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "update",
      key: "update",
      render: (_text: string, record: User) => (
        <div className="flex gap-2">
          <div className="flex gap-4">
            <UpdateModal
              record={record}
              form={form(record)}
              min={true}
              title={`Update user ${record?.name}`}
            />
          </div>
        </div>
      ),
    },
  ];
};
