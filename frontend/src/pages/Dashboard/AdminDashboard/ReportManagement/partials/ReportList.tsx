import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

interface Report {
  reportId: number;
  senderId: number;
  senderName?: string;
  senderEmail?: string;
  projectId: number;
  projectName?: string;
  verifyStaffId: number | null;
  verifyStaffName?: string;
  createdAt: string;
  reason: string;
  status: number;
  priority?: "high" | "medium" | "low";
  category?: string;
}

const mockReports: Report[] = [
  {
    reportId: 4,
    senderId: 34,
    senderName: "John Smith",
    senderEmail: "john.smith@example.com",
    projectId: 37,
    projectName: "Website Redesign Project",
    verifyStaffId: null,
    createdAt: "February 26, 2025",
    reason: "Freelancer didn't deliver the work on time",
    status: 0,
    priority: "high",
    category: "deadline",
  },
  {
    reportId: 5,
    senderId: 42,
    senderName: "Sarah Johnson",
    senderEmail: "sarah.j@example.com",
    projectId: 23,
    projectName: "Mobile App Development",
    verifyStaffId: 2,
    verifyStaffName: "Admin Staff",
    createdAt: "February 25, 2025",
    reason: "Poor quality of deliverables",
    status: 1,
    priority: "medium",
    category: "quality",
  },
  {
    reportId: 6,
    senderId: 18,
    senderName: "Robert Williams",
    senderEmail: "robert.w@example.com",
    projectId: 45,
    projectName: "Logo Design Contest",
    verifyStaffId: null,
    createdAt: "February 24, 2025",
    reason: "Communication issues with the client",
    status: 0,
    priority: "low",
    category: "communication",
  },
  {
    reportId: 7,
    senderId: 51,
    senderName: "Emily Davis",
    senderEmail: "emily.d@example.com",
    projectId: 19,
    projectName: "Content Writing Project",
    verifyStaffId: 3,
    verifyStaffName: "Support Staff",
    createdAt: "February 23, 2025",
    reason: "Payment dispute",
    status: 2,
    priority: "high",
    category: "payment",
  },
];

const ReportList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [loading] = useState(false);

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Investigating";
      case 2:
        return "Resolved";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "orange";
      case 1:
        return "blue";
      case 2:
        return "green";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "default";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "deadline":
        return "purple";
      case "quality":
        return "cyan";
      case "communication":
        return "blue";
      case "payment":
        return "gold";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "reportId",
      key: "reportId",
      width: 60,
    },
    {
      title: "Reporter",
      dataIndex: "senderName",
      key: "senderName",
      render: (_: string, record: Report) => (
        <span>
          {record.senderName}
          <div>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {record.senderEmail}
            </Text>
          </div>
        </span>
      ),
    },
    {
      title: "Project",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => (
        <Tag color={getCategoryColor(category)}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag
          icon={status === 2 ? <FaCheckCircle /> : <FaExclamationTriangle />}
          color={getStatusColor(status)}
        >
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Report) => (
        <Button
          type="primary"
          icon={<FaEye />}
          size="small"
          onClick={() =>
            navigate(`/dashboard/admin/reports/${record.reportId}`)
          }
        >
          View
        </Button>
      ),
    },
  ];

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      searchText === "" ||
      (report.senderName &&
        report.senderName.toLowerCase().includes(searchText.toLowerCase())) ||
      (report.projectName &&
        report.projectName.toLowerCase().includes(searchText.toLowerCase())) ||
      report.reason.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === null || report.status === statusFilter;
    const matchesCategory =
      categoryFilter === null || report.category === categoryFilter;
    const matchesPriority =
      priorityFilter === null || report.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  // Statistics
  const totalReports = mockReports.length;
  const pendingReports = mockReports.filter(
    (report) => report.status === 0
  ).length;
  const resolvedReports = mockReports.filter(
    (report) => report.status === 2
  ).length;

  return (
    <div>
      <Breadcrumb
        items={[
          { title: "Dashboard" },
          { title: "Admin" },
          { title: "Report Management" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Title level={2}>Report Management</Title>

      {/* Statistics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Reports"
              value={totalReports}
              valueStyle={{ color: "#1677ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Pending Reports"
              value={pendingReports}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Resolved Reports"
              value={resolvedReports}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Input
              placeholder="Search by reporter, project or reason"
              prefix={<FaSearch />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={6}>
            <Select
              placeholder="Filter by status"
              style={{ width: "100%" }}
              allowClear
              onChange={(value) => setStatusFilter(value)}
            >
              <Option value={0}>Pending</Option>
              <Option value={1}>Investigating</Option>
              <Option value={2}>Resolved</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select
              placeholder="Filter by category"
              style={{ width: "100%" }}
              allowClear
              onChange={(value) => setCategoryFilter(value)}
            >
              <Option value="deadline">Deadline</Option>
              <Option value="quality">Quality</Option>
              <Option value="communication">Communication</Option>
              <Option value="payment">Payment</Option>
            </Select>
          </Col>
          <Col xs={24} md={6}>
            <Select
              placeholder="Filter by priority"
              style={{ width: "100%" }}
              allowClear
              onChange={(value) => setPriorityFilter(value)}
            >
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Reports Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredReports}
          rowKey="reportId"
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `Total ${total} reports`,
          }}
        />
      </Card>
    </div>
  );
};

export default ReportList;
