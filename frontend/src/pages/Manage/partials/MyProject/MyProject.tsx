import React from "react";
import { TabItem } from "../../../Search/Search";
import SearchBox from "../../../../components/SearchBox";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

export default function MyProject() {
  return (
    <div>
      <div className="text-3xl font-bold mt-8">My Projects</div>

      <div className="flex items-center gap-4 mt-4">
        <SearchBox
          placeholder="Search Projects..."
          widthClass="w-full py-2"
          className="!bg-gray-100 py-2 dark:!bg-zinc-800"
          value={""}
        />
      </div>
      <Table
        className="mt-4"
        dataSource={[
          {
            key: "1",
            title: "Project 1",
            description: "Description of project 1",
            status: "Active",
            date: "2022-01-01",
            action: <Button>View</Button>,
          },
          {
            key: "2",
            title: "Project 2",
            description: "Description of project 2",
            status: "Active",
            date: "2022-01-01",
            action: <Button>View</Button>,
          },
          {
            key: "3",
            title: "Project 3",
            description: "Description of project 3",
            status: "Active",
            date: "2022-01-01",
            action: <Button>View</Button>,
          },
          {
            key: "4",
            title: "Project 4",
            description: "Description of project 4",
            status: "Active",
            date: "2022-01-01",
            action: <Button>View</Button>,
          },
        ]}
        columns={[
          {
            title: "Project",
            dataIndex: "title",
            key: "title",
            render: (text: string, record: any) => (
              <a href={`/projects/${record.key}`}>{text}</a>
            ),
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
          },
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (text: string, record: any) => (
              <Link to={`/projects/${record.key}/details`}>{text}</Link>
            ),
          },
        ]}
      />
    </div>
  );
}
