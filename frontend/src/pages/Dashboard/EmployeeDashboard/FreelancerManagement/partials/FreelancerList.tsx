import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Space, Spin, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PendingPortfolio } from "../models/types";
import { portfolioService } from "../services/portfolioService";
const { Search } = Input;

const FreelancerList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [portfolios, setPortfolios] = useState<PendingPortfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<
    PendingPortfolio[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchPendingPortfolios();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filtered = portfolios.filter(
        (portfolio) =>
          portfolio.name.toLowerCase().includes(searchText.toLowerCase()) ||
          portfolio.email.toLowerCase().includes(searchText.toLowerCase()) ||
          portfolio.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPortfolios(filtered);
    } else {
      setFilteredPortfolios(portfolios);
    }
  }, [searchText, portfolios]);

  const fetchPendingPortfolios = async () => {
    try {
      setLoading(true);
      const data = await portfolioService.getPendingPortfolios();
      const portfolioItems = data.value.items;
      setPortfolios(portfolioItems);
      setFilteredPortfolios(portfolioItems);
      setPagination({
        ...pagination,
        total: data.value.totalCount || portfolioItems.length,
      });
    } catch (error: any) {
      message.error(error.message || "Failed to fetch pending portfolios");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  const getGenderText = (gender: number) => {
    switch (gender) {
      case 0:
        return "Male";
      case 1:
        return "Female";
      default:
        return "Other";
    }
  };

  const columns = [
    {
      title: "Freelancer",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: PendingPortfolio) => (
        <Space>
          <Avatar
            src={record.avatarURL || "https://via.placeholder.com/40"}
            size={40}
          >
            {record.name ? record.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-xs text-gray-500">{record.title}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_: any, record: PendingPortfolio) => (
        <div>
          <div>{record.email}</div>
          <div>{record.phone || "No phone"}</div>
          <div>{record.address || "No address"}</div>
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender: number) => getGenderText(gender),
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
      render: (nationality: string) => nationality || "Not specified",
    },
    {
      title: "Portfolio Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: PendingPortfolio) => (
        <Link to={`/employee/freelancers/${record.portfolioId}`}>
          <Button type="primary" icon={<EyeOutlined />}>
            View Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Pending Portfolios</h2>
        <Search
          placeholder="Search by name, email or title"
          allowClear
          enterButton={<SearchOutlined />}
          size="middle"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredPortfolios}
          rowKey="portfolioId"
          pagination={pagination}
          loading={false}
          onChange={handleTableChange}
        />
      </Spin>
    </div>
  );
};

export default FreelancerList;
