import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Result,
  Row,
  Select,
  Skeleton,
  Space,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaComment,
  FaDownload,
  FaExclamationTriangle,
  FaFileAlt,
  FaFlag,
  FaLink,
  FaPencilAlt,
  FaSave,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

interface ReportDetail {
  reportId: number;
  senderId: number;
  senderName?: string;
  senderEmail?: string;
  projectId: number;
  projectName?: string;
  projectDescription?: string;
  verifyStaffId: number | null;
  verifyStaffName?: string;
  createdAt: string;
  reason: string;
  detailedDescription?: string;
  status: number;
  priority?: "high" | "medium" | "low";
  category?: string;
  resolution?: string;
  attachments?: { id: number; name: string; url: string; type: string }[];
  timeline?: {
    id: number;
    action: string;
    timestamp: string;
    userId: number;
    userName: string;
    note: string;
  }[];
}

const mockReportDetail: ReportDetail = {
  reportId: 4,
  senderId: 34,
  senderName: "John Smith",
  senderEmail: "john.smith@example.com",
  projectId: 37,
  projectName: "Website Redesign Project",
  projectDescription:
    "A complete overhaul of company website with new design and improved functionality.",
  verifyStaffId: null,
  createdAt: "February 26, 2025",
  reason: "Freelancer didn't deliver the work on time",
  detailedDescription:
    "The freelancer was supposed to deliver the project by February 15, 2025, but as of today (February 26), they haven't completed the work. I've attempted to contact them multiple times without success. The delay is causing significant problems for my business launch.",
  status: 0,
  priority: "high",
  category: "deadline",
  attachments: [
    { id: 1, name: "contract.pdf", url: "/files/contract.pdf", type: "pdf" },
    {
      id: 2,
      name: "conversation_screenshot.jpg",
      url: "/files/screenshot.jpg",
      type: "image",
    },
  ],
  timeline: [
    {
      id: 1,
      action: "Report Created",
      timestamp: "February 26, 2025 09:15:22",
      userId: 34,
      userName: "John Smith",
      note: "Initial report submission",
    },
  ],
};

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("details");
  const [updateStatusForm] = Form.useForm();
  const [addNoteForm] = Form.useForm();
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setReport(mockReportDetail);
      setLoading(false);
    }, 800);
  }, [id]);

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

  const handleStatusUpdate = (values: any) => {
    if (!report) return;

    // Simulate API call to update status
    const newStatus = parseInt(values.status);
    const newReport = {
      ...report,
      status: newStatus,
      timeline: [
        ...(report.timeline || []),
        {
          id: (report.timeline?.length || 0) + 1,
          action: "Status Updated",
          timestamp: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          userId: 1, // Current user ID
          userName: "Admin User", // Current username
          note: `Status changed to ${getStatusText(newStatus)}. Note: ${
            values.note
          }`,
        },
      ],
    };

    setReport(newReport);
    message.success(`Report status updated to ${getStatusText(newStatus)}`);
    setStatusModalVisible(false);
    updateStatusForm.resetFields();
  };

  const handleAddNote = (values: any) => {
    if (!report) return;

    // Simulate API call to add note
    const newReport = {
      ...report,
      timeline: [
        ...(report.timeline || []),
        {
          id: (report.timeline?.length || 0) + 1,
          action: "Note Added",
          timestamp: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          userId: 1, // Current user ID
          userName: "Admin User", // Current username
          note: values.note,
        },
      ],
    };

    setReport(newReport);
    message.success("Note added successfully");
    addNoteForm.resetFields();
  };

  if (loading) {
    return (
      <Card>
        <Skeleton active />
      </Card>
    );
  }

  if (!report) {
    return (
      <Card>
        <Result
          status="404"
          title="Report not found"
          subTitle="The report you are looking for does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => navigate("/dashboard/admin/reports")}
            >
              Back to Reports List
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { title: "Dashboard" },
          { title: "Admin" },
          { title: "Reports", href: "/dashboard/admin/reports" },
          { title: `Report #${report.reportId}` },
        ]}
        style={{ marginBottom: 16 }}
      />

      {/* Header Card */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={12}>
            <Space direction="vertical" size={0}>
              <Title level={2} style={{ marginBottom: 8 }}>
                Report #{report.reportId}
              </Title>
              <Paragraph>{report.reason}</Paragraph>
              <Space size="large" wrap>
                <Tag
                  icon={<FaFlag />}
                  color={getCategoryColor(report.category || "")}
                >
                  {(report.category || "").charAt(0).toUpperCase() +
                    (report.category || "").slice(1)}
                </Tag>
                <Tag
                  icon={<FaExclamationTriangle />}
                  color={getPriorityColor(report.priority || "")}
                >
                  {report.priority?.charAt(0).toUpperCase() +
                    (report.priority || "").slice(1)}{" "}
                  Priority
                </Tag>
                <Tag
                  icon={
                    report.status === 2 ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationTriangle />
                    )
                  }
                  color={getStatusColor(report.status)}
                >
                  {getStatusText(report.status)}
                </Tag>
                <Text>
                  <FaCalendarAlt style={{ marginRight: 4 }} />{" "}
                  {report.createdAt}
                </Text>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type={report.status === 2 ? "default" : "primary"}
                onClick={() => setStatusModalVisible(true)}
              >
                Update Status
              </Button>
              <Button onClick={() => navigate("/dashboard/admin/reports")}>
                Back to List
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Row gutter={16}>
        <Col span={24} md={16}>
          <Card style={{ marginBottom: 16 }}>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Details" key="details">
                <Card title="Report Description" bordered={false}>
                  <Paragraph>{report.detailedDescription}</Paragraph>
                </Card>

                <Divider />

                <Card title="Project Information" bordered={false}>
                  <Descriptions
                    column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                  >
                    <Descriptions.Item label="Project ID">
                      {report.projectId}
                    </Descriptions.Item>
                    <Descriptions.Item label="Project Name">
                      {report.projectName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>
                      {report.projectDescription}
                    </Descriptions.Item>
                  </Descriptions>
                  <Button
                    type="link"
                    icon={<FaLink />}
                    onClick={() =>
                      navigate(`/dashboard/admin/projects/${report.projectId}`)
                    }
                  >
                    View Project Details
                  </Button>
                </Card>
              </TabPane>

              <TabPane tab="Timeline" key="timeline">
                <Timeline mode="left">
                  {report.timeline?.map((event) => (
                    <Timeline.Item
                      key={event.id}
                      label={event.timestamp}
                      dot={
                        event.action === "Report Created" ? (
                          <FaFlag style={{ color: "#1677ff" }} />
                        ) : event.action === "Status Updated" ? (
                          <FaClock style={{ color: "#52c41a" }} />
                        ) : (
                          <FaComment style={{ color: "#722ed1" }} />
                        )
                      }
                    >
                      <Card size="small" style={{ marginBottom: 8 }}>
                        <div style={{ marginBottom: 8 }}>
                          <Text strong>{event.action}</Text> by{" "}
                          <Text mark>{event.userName}</Text>
                        </div>
                        <div>{event.note}</div>
                      </Card>
                    </Timeline.Item>
                  ))}
                </Timeline>

                <Divider>Add Note</Divider>

                <Form form={addNoteForm} onFinish={handleAddNote}>
                  <Form.Item
                    name="note"
                    rules={[{ required: true, message: "Please enter a note" }]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Add your notes about this report..."
                    />
                  </Form.Item>
                  <Form.Item style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<FaComment />}
                    >
                      Add Note
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Attachments" key="attachments">
                <Row gutter={[16, 16]}>
                  {report.attachments?.map((attachment) => (
                    <Col xs={24} sm={12} md={8} key={attachment.id}>
                      <Card hoverable>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <FaFileAlt
                              style={{
                                marginRight: 8,
                                fontSize: 24,
                                color: "#1677ff",
                              }}
                            />
                            <Text strong ellipsis>
                              {attachment.name}
                            </Text>
                          </div>
                          <Text type="secondary">
                            {attachment.type.toUpperCase()}
                          </Text>
                          <Button
                            type="primary"
                            icon={<FaDownload />}
                            size="small"
                            style={{ marginTop: 8 }}
                            onClick={() =>
                              message.info(`Downloading ${attachment.name}...`)
                            }
                          >
                            Download
                          </Button>
                        </Space>
                      </Card>
                    </Col>
                  ))}

                  {(!report.attachments || report.attachments.length === 0) && (
                    <Col span={24}>
                      <Empty description="No attachments available" />
                    </Col>
                  )}
                </Row>
              </TabPane>
            </Tabs>
          </Card>
        </Col>

        <Col span={24} md={8}>
          <Card title="Reporter Information" style={{ marginBottom: 16 }}>
            <Space align="start">
              <Avatar size={64} icon={<FaUser />} />
              <Space direction="vertical">
                <Title level={5} style={{ margin: 0 }}>
                  {report.senderName}
                </Title>
                <Text>{report.senderEmail}</Text>
                <Button
                  type="link"
                  size="small"
                  onClick={() =>
                    navigate(`/dashboard/admin/accounts/${report.senderId}`)
                  }
                >
                  View Profile
                </Button>
              </Space>
            </Space>
          </Card>

          <Card title="Status" style={{ marginBottom: 16 }}>
            <Descriptions column={1}>
              <Descriptions.Item label="Current Status">
                <Tag
                  icon={
                    report.status === 2 ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationTriangle />
                    )
                  }
                  color={getStatusColor(report.status)}
                  style={{ fontSize: "14px", padding: "4px 8px" }}
                >
                  {getStatusText(report.status)}
                </Tag>
              </Descriptions.Item>

              {report.verifyStaffId && (
                <Descriptions.Item label="Handled By">
                  {report.verifyStaffName}
                </Descriptions.Item>
              )}

              <Descriptions.Item label="Date Reported">
                {report.createdAt}
              </Descriptions.Item>

              {report.status === 2 && (
                <Descriptions.Item label="Resolution">
                  {report.resolution || "No resolution details provided."}
                </Descriptions.Item>
              )}
            </Descriptions>

            <Divider />

            <Button
              type="primary"
              block
              onClick={() => setStatusModalVisible(true)}
              icon={<FaPencilAlt />}
            >
              Update Status
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Status Update Modal */}
      <Modal
        title="Update Report Status"
        open={statusModalVisible}
        footer={null}
        onCancel={() => setStatusModalVisible(false)}
      >
        <Form
          form={updateStatusForm}
          layout="vertical"
          onFinish={handleStatusUpdate}
          initialValues={{ status: report.status.toString() }}
        >
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Option value="0">Pending</Option>
              <Option value="1">Investigating</Option>
              <Option value="2">Resolved</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="note"
            label="Note"
            rules={[{ required: true, message: "Please enter a note" }]}
          >
            <TextArea
              rows={4}
              placeholder="Add details about this status change..."
            />
          </Form.Item>

          {updateStatusForm.getFieldValue("status") === "2" && (
            <Form.Item name="resolution" label="Resolution">
              <TextArea
                rows={3}
                placeholder="Enter the resolution details..."
              />
            </Form.Item>
          )}

          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setStatusModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<FaSave />}>
                Update Status
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ReportDetail;
