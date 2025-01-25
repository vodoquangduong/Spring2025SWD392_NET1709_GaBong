import { Tag, Typography } from "antd";
import React, { useState } from "react";
import userDatas from "../../../../mocks/users.json";
import { useParams } from "react-router-dom";

export default function UserDetail() {
  const userData = userDatas[0];
  return (
    <>
      <div>
        <div className="w-full bg-white dark:bg-secondary rounded-md mb-2 p-4">
          <div className="text-3xl font-semibold">
            User #{userData.id}: {userData.name}
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2 mt-4">
              <Tag color="cyan-inverse">DOB: {userData.dob}</Tag>
              <Tag color="blue-inverse">Major: {userData.major}</Tag>
              <Tag color="magenta-inverse">Degre: {userData.degree}</Tag>
            </div>
            <div className="flex gap-2 mt-4"></div>
          </div>
          <Typography.Title level={3} className="pt-4">
            Description
          </Typography.Title>
        </div>
      </div>
    </>
  );
}
