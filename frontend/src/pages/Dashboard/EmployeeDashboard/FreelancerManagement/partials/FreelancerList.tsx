import { Rate, Select, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { FaEye, FaFilter, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Freelancer } from "../models/types";

const { Title, Text } = Typography;
const { Option } = Select;

const mockData: Freelancer[] = [
  {
    id: "FL001",
    name: "John Doe",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcazeHuAcZDzv4_61fPLT-S00XnaKXch2YWQ&s",
    email: "john.doe@example.com",
    phone: "+1234567890",
    skills: ["React", "Node.js", "TypeScript"],
    rating: 4.8,
    totalProjects: 25,
    completedProjects: 23,
    status: "active",
    joinDate: "2023-01-15",
    lastActive: "2024-02-03",
  },
];

interface Filters {
  status: "active" | "inactive" | "banned" | "";
  skill: string;
  search: string;
}

const FreelancerList: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    status: "",
    skill: "",
    search: "",
  });

  const columns: ColumnsType<Freelancer> = [
    {
      title: "Freelancer",
      key: "freelancer",
      render: (_, record) => (
        <Space>
          <img
            src={record.avatar}
            alt={record.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/40?text=User";
            }}
          />
          <div>
            <Text strong>{record.name}</Text>
            <div>
              <Text type="secondary">{record.email}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      render: (skills: string[]) => (
        <>
          {skills.map((skill) => (
            <Tag color="blue" key={skill}>
              {skill}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <Rate disabled defaultValue={rating} allowHalf />
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: "Projects",
      key: "projects",
      render: (_, record) => (
        <Space>
          <Text type="success" strong>
            {record.completedProjects}
          </Text>
          <Text type="secondary">/{record.totalProjects}</Text>
        </Space>
      ),
      sorter: (a, b) => a.completedProjects - b.completedProjects,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          active: "success",
          inactive: "warning",
          banned: "error",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
        { text: "Banned", value: "banned" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (date) => <Text type="secondary">{date}</Text>,
      sorter: (a, b) =>
        new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (date) => <Text type="secondary">{date}</Text>,
      sorter: (a, b) =>
        new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <FaEye
          className="text-emerald-600 hover:text-emerald-700 cursor-pointer w-5 h-5"
          onClick={() => navigate("FL001")}
          title="View details"
        />
      ),
    },
  ];

  const filteredData = mockData.filter((freelancer) => {
    const matchesStatus =
      !filters.status || freelancer.status === filters.status;
    const matchesSkill =
      !filters.skill ||
      freelancer.skills.some((skill) =>
        skill.toLowerCase().includes(filters.skill.toLowerCase())
      );
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      freelancer.name.toLowerCase().includes(searchTerm) ||
      freelancer.email.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesSkill && matchesSearch;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2}>Freelancers</Title>
        <Text type="secondary">Manage and monitor all freelancers</Text>
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value as Filters["status"],
                  })
                }
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full md:w-48 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>

            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by skill"
                value={filters.skill}
                onChange={(e) =>
                  setFilters({ ...filters, skill: e.target.value })
                }
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full md:w-48 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
              />
            </div>

            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search freelancers by name or email"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full bg-white dark:bg-zinc-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Space>
    </div>
  );
};

export default FreelancerList;
