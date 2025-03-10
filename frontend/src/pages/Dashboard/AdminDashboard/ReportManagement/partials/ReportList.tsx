import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Tooltip,
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

// Mock data for reports
const mockReports = [
  {
    id: 1,
    reporter: "Nguyễn Văn A",
    reporterEmail: "nguyenvana@example.com",
    reportedUser: "Trần Văn B",
    reportedUserEmail: "tranvanb@example.com",
    reason: "Không hoàn thành dự án đúng thời hạn",
    description:
      "Freelancer đã không hoàn thành dự án theo thời gian đã thỏa thuận và không thông báo trước.",
    status: "pending",
    date: "2023-10-15",
    category: "project",
    priority: "high",
  },
  {
    id: 2,
    reporter: "Lê Thị C",
    reporterEmail: "lethic@example.com",
    reportedUser: "Phạm Văn D",
    reportedUserEmail: "phamvand@example.com",
    reason: "Thanh toán không đúng hạn",
    description:
      "Khách hàng đã không thanh toán đúng hạn theo hợp đồng đã ký kết.",
    status: "resolved",
    date: "2023-10-14",
    category: "payment",
    priority: "medium",
  },
  {
    id: 3,
    reporter: "Hoàng Văn E",
    reporterEmail: "hoangvane@example.com",
    reportedUser: "Vũ Thị F",
    reportedUserEmail: "vuthif@example.com",
    reason: "Giao tiếp không chuyên nghiệp",
    description:
      "Freelancer có thái độ không chuyên nghiệp trong quá trình làm việc và giao tiếp.",
    status: "pending",
    date: "2023-10-13",
    category: "communication",
    priority: "low",
  },
  {
    id: 4,
    reporter: "Đỗ Văn G",
    reporterEmail: "dovang@example.com",
    reportedUser: "Ngô Thị H",
    reportedUserEmail: "ngothih@example.com",
    reason: "Chất lượng sản phẩm không đạt yêu cầu",
    description:
      "Sản phẩm được giao không đáp ứng các yêu cầu đã thỏa thuận từ đầu.",
    status: "pending",
    date: "2023-10-12",
    category: "quality",
    priority: "high",
  },
  {
    id: 5,
    reporter: "Trịnh Văn I",
    reporterEmail: "trinhvani@example.com",
    reportedUser: "Mai Thị K",
    reportedUserEmail: "maithik@example.com",
    reason: "Vi phạm điều khoản dịch vụ",
    description:
      "Người dùng đã đăng nội dung vi phạm điều khoản dịch vụ của nền tảng.",
    status: "resolved",
    date: "2023-10-11",
    category: "terms",
    priority: "high",
  },
  {
    id: 6,
    reporter: "Lý Văn L",
    reporterEmail: "lyvanl@example.com",
    reportedUser: "Đinh Thị M",
    reportedUserEmail: "dinhthim@example.com",
    reason: "Lừa đảo",
    description:
      "Người dùng có hành vi lừa đảo, nhận tiền nhưng không thực hiện công việc.",
    status: "pending",
    date: "2023-10-10",
    category: "fraud",
    priority: "high",
  },
  {
    id: 7,
    reporter: "Phan Văn N",
    reporterEmail: "phanvann@example.com",
    reportedUser: "Bùi Thị O",
    reportedUserEmail: "buithio@example.com",
    reason: "Hủy dự án không có lý do",
    description:
      "Khách hàng đã hủy dự án mà không có lý do chính đáng sau khi công việc đã được thực hiện một phần.",
    status: "pending",
    date: "2023-10-09",
    category: "project",
    priority: "medium",
  },
  {
    id: 8,
    reporter: "Dương Văn P",
    reporterEmail: "duongvanp@example.com",
    reportedUser: "Hồ Thị Q",
    reportedUserEmail: "hothiq@example.com",
    reason: "Sao chép nội dung",
    description:
      "Freelancer đã sao chép nội dung từ nguồn khác mà không được phép.",
    status: "resolved",
    date: "2023-10-08",
    category: "copyright",
    priority: "medium",
  },
];

const ReportList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Statistics for reports
  const statistics = [
    {
      title: "Tổng số báo cáo",
      value: mockReports.length,
      color: "blue",
    },
    {
      title: "Chưa xử lý",
      value: mockReports.filter((report) => report.status === "pending").length,
      color: "red",
    },
    {
      title: "Đã xử lý",
      value: mockReports.filter((report) => report.status === "resolved")
        .length,
      color: "green",
    },
  ];

  // Filter reports based on search and filters
  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      searchText === "" ||
      report.reporter.toLowerCase().includes(searchText.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(searchText.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = !statusFilter || report.status === statusFilter;
    const matchesCategory =
      !categoryFilter || report.category === categoryFilter;
    const matchesPriority =
      !priorityFilter || report.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  // Table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Người báo cáo",
      dataIndex: "reporter",
      key: "reporter",
      render: (text: string, record: any) => (
        <Tooltip title={record.reporterEmail}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Người bị báo cáo",
      dataIndex: "reportedUser",
      key: "reportedUser",
      render: (text: string, record: any) => (
        <Tooltip title={record.reportedUserEmail}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category: string) => {
        let color = "blue";
        switch (category) {
          case "project":
            color = "blue";
            break;
          case "payment":
            color = "gold";
            break;
          case "communication":
            color = "purple";
            break;
          case "quality":
            color = "orange";
            break;
          case "terms":
            color = "red";
            break;
          case "fraud":
            color = "magenta";
            break;
          case "copyright":
            color = "cyan";
            break;
          default:
            color = "blue";
        }
        return (
          <Tag color={color}>
            {category === "project"
              ? "Dự án"
              : category === "payment"
              ? "Thanh toán"
              : category === "communication"
              ? "Giao tiếp"
              : category === "quality"
              ? "Chất lượng"
              : category === "terms"
              ? "Điều khoản"
              : category === "fraud"
              ? "Lừa đảo"
              : category === "copyright"
              ? "Bản quyền"
              : category}
          </Tag>
        );
      },
    },
    {
      title: "Mức độ",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        let color = "blue";
        if (priority === "high") {
          color = "red";
        } else if (priority === "medium") {
          color = "orange";
        } else if (priority === "low") {
          color = "green";
        }
        return (
          <Tag color={color}>
            {priority === "high"
              ? "Cao"
              : priority === "medium"
              ? "Trung bình"
              : "Thấp"}
          </Tag>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          icon={
            status === "pending" ? <FaExclamationTriangle /> : <FaCheckCircle />
          }
          color={status === "pending" ? "volcano" : "green"}
        >
          {status === "pending" ? "Chưa xử lý" : "Đã xử lý"}
        </Tag>
      ),
    },
    {
      title: "Ngày báo cáo",
      dataIndex: "date",
      key: "date",
      sorter: (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<FaEye />}
            onClick={() => navigate(`/dashboard/admin/reports/${record.id}`)}
          >
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { title: "Dashboard" },
          { title: "Admin" },
          { title: "Quản lý báo cáo" },
        ]}
        className="mb-4"
      />

      <Title level={2}>Quản lý báo cáo</Title>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        {statistics.map((stat, index) => (
          <Col xs={24} sm={8} key={index}>
            <Card bordered={false} className="h-full shadow-sm">
              <Statistic
                title={<Text strong>{stat.title}</Text>}
                value={stat.value}
                valueStyle={{ color: `var(--ant-color-${stat.color})` }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Space direction="vertical" className="w-full">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={8}>
              <Input
                placeholder="Tìm kiếm theo người dùng hoặc lý do"
                prefix={<FaSearch />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} md={16}>
              <Space wrap>
                <Select
                  placeholder="Trạng thái"
                  style={{ width: 150 }}
                  allowClear
                  onChange={(value) => setStatusFilter(value)}
                >
                  <Option value="pending">Chưa xử lý</Option>
                  <Option value="resolved">Đã xử lý</Option>
                </Select>
                <Select
                  placeholder="Danh mục"
                  style={{ width: 150 }}
                  allowClear
                  onChange={(value) => setCategoryFilter(value)}
                >
                  <Option value="project">Dự án</Option>
                  <Option value="payment">Thanh toán</Option>
                  <Option value="communication">Giao tiếp</Option>
                  <Option value="quality">Chất lượng</Option>
                  <Option value="terms">Điều khoản</Option>
                  <Option value="fraud">Lừa đảo</Option>
                  <Option value="copyright">Bản quyền</Option>
                </Select>
                <Select
                  placeholder="Mức độ"
                  style={{ width: 150 }}
                  allowClear
                  onChange={(value) => setPriorityFilter(value)}
                >
                  <Option value="high">Cao</Option>
                  <Option value="medium">Trung bình</Option>
                  <Option value="low">Thấp</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Reports Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredReports}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} báo cáo`,
          }}
        />
      </Card>
    </div>
  );
};

export default ReportList;
