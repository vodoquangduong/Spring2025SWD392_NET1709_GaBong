import {
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Input,
  message,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaEye,
  FaFilter,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Report } from "../models/types";
import { reportMngUsecase } from "../usecases/reportMngUsecase";

const { Title, Text } = Typography;
const { Option } = Select;

const ReportList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchReports();
  }, [pagination.current, pagination.pageSize]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const result = await reportMngUsecase.getReports({
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      });

      setReports(result.reports);
      setPagination((prev) => ({
        ...prev,
        total: result.totalCount,
      }));
    } catch (error) {
      console.error("Error fetching reports:", error);
      message.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  // Handle table pagination change
  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
    });
  };

  // Handle quick status updates (not real API calls)
  const handleStatusAction = (report: Report, newStatus: number) => {
    const action = newStatus === 1 ? "approve" : "reject";
    const confirmAction = () => {
      message.loading(`Processing ${action} action...`, 1.5).then(() => {
        setTimeout(() => {
          message.success(
            `Report #${report.reportId} has been ${action}ed successfully`
          );
          // Update local data to reflect the change
          setReports((prevReports) =>
            prevReports.map((r) =>
              r.reportId === report.reportId ? { ...r, status: newStatus } : r
            )
          );
        }, 1000);
      });
    };

    // Call the confirmation function
    confirmAction();
  };

  const getStatusTag = (status: number) => {
    const statusName = reportMngUsecase.getStatusName(status);
    let color = "blue";
    let icon = null;

    if (status === 1) {
      color = "green";
      icon = <FaCheckCircle />;
    } else if (status === 2) {
      color = "red";
      icon = <FaTimesCircle />;
    }

    return (
      <Tag color={color} icon={icon}>
        {statusName}
      </Tag>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "reportId",
      key: "reportId",
      width: 80,
      render: (id: number) => <Text strong>{id}</Text>,
    },
    {
      title: "Sender",
      dataIndex: "senderId",
      key: "senderId",
      width: 100,
      render: (id: number) => (
        <Tooltip title={`User ID: ${id}`}>User #{id}</Tooltip>
      ),
    },
    {
      title: "Project",
      dataIndex: "projectId",
      key: "projectId",
      width: 100,
      render: (id: number) => (
        <Tooltip title={`Project ID: ${id}`}>Project #{id}</Tooltip>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <Tooltip title={new Date(date).toLocaleString()}>
          {new Date(date).toLocaleDateString()}
        </Tooltip>
      ),
      sorter: (a: Report, b: Report) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
      render: (reason: string) => (
        <Tooltip title={reason}>
          <Text ellipsis>{reason}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => getStatusTag(status),
      filters: [
        { text: "Pending", value: 0 },
        { text: "Approved", value: 1 },
        { text: "Rejected", value: 2 },
      ],
      onFilter: (value: any, record: Report) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 240,
      render: (_: any, record: Report) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              icon={<FaEye />}
              type="primary"
              size="middle"
              shape="circle"
              onClick={() => navigate(`/admin/reports/${record.reportId}`)}
            />
          </Tooltip>

          {record.status === 0 && (
            <>
              <Tooltip title="Approve Report">
                <Button
                  icon={<FaCheckCircle />}
                  type="primary"
                  size="middle"
                  shape="circle"
                  onClick={() => handleStatusAction(record, 1)}
                  style={{ backgroundColor: "green" }}
                />
              </Tooltip>
              <Tooltip title="Reject Report">
                <Button
                  icon={<FaTimesCircle />}
                  danger
                  size="middle"
                  shape="circle"
                  onClick={() => handleStatusAction(record, 2)}
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  // Filter the data client-side for search and filters
  const filteredData = reports.filter((report) => {
    const matchesSearch =
      searchText === "" ||
      report.reportId.toString().includes(searchText) ||
      report.reason.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === null || report.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="report-management">
      <Title level={2}>Report Management</Title>
      <Card
        style={{ marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
        bordered={false}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Input
              placeholder="Search by ID or reason"
              prefix={<FaSearch style={{ color: "#bfbfbf" }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              size="large"
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="Filter by status"
              style={{ width: "100%" }}
              allowClear
              onChange={(value) => setStatusFilter(value)}
              size="large"
              suffixIcon={<FaFilter />}
            >
              <Option value={0}>
                <Badge status="processing" text="Pending" />
              </Option>
              <Option value={1}>
                <Badge status="success" text="Approved" />
              </Option>
              <Option value={2}>
                <Badge status="error" text="Rejected" />
              </Option>
            </Select>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}></Col>
        </Row>
      </Card>

      <Card
        bordered={false}
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
        className="report-table-card"
      >
        {loading ? (
          <Skeleton active paragraph={{ rows: 10 }} />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="reportId"
            loading={loading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
              showTotal: (total) => `Total ${total} reports`,
              style: { marginTop: 16 },
            }}
            onChange={handleTableChange}
            rowClassName={(record) =>
              record.status === 0
                ? "report-row-pending"
                : record.status === 1
                ? "report-row-approved"
                : "report-row-rejected"
            }
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No reports found"
                />
              ),
            }}
            style={{ overflowX: "auto" }}
          />
        )}
      </Card>
    </div>
  );
};

export default ReportList;
