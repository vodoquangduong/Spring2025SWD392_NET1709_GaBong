import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  message,
  Modal,
  Result,
  Row,
  Skeleton,
  Space,
  Steps,
  Tag,
  Timeline,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaEye,
  FaFileAlt,
  FaInfoCircle,
  FaProjectDiagram,
  FaThumbsUp,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Report } from "../models/types";
import { reportMngUsecase } from "../usecases/reportMngUsecase";

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

// Helper function to safely format dates
const formatDate = (date: Date | string | null | undefined): string => {
  if (!date) return "N/A";

  if (typeof date === "string") {
    // If we still get a string, try to parse it safely
    try {
      if (date.includes("-")) {
        const [day, month, year] = date.split("-").map(Number);
        if (day && month && year) {
          return new Date(year, month - 1, day).toLocaleDateString();
        }
      }
      return new Date(date).toLocaleDateString();
    } catch (e) {
      return date; // Return the original string if parsing fails
    }
  }

  try {
    return new Date(date).toLocaleDateString();
  } catch (e) {
    return "Invalid Date";
  }
};

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id ? parseInt(id) : 0;
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchReportDetails = async () => {
      if (!reportId) return;

      setLoading(true);
      try {
        console.log(`Fetching report details for ID: ${reportId}`);
        const data = await reportMngUsecase.getReportById(reportId);
        console.log("Report data received:", data); // Add debugging

        if (data) {
          setReport(data);
        } else {
          message.error("No report data found or invalid format");
        }
      } catch (error) {
        console.error("Error fetching report details:", error);
        message.error("Failed to load report details");
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, [reportId]);

  // Function to handle report status actions
  const handleStatusAction = (newStatus: number) => {
    if (!report) return;

    const action = newStatus === 1 ? "approve" : "reject";

    Modal.confirm({
      title: `Are you sure you want to ${action} this report?`,
      content: `This will ${action} the report #${report.reportId}.`,
      icon:
        newStatus === 1 ? (
          <FaCheckCircle style={{ color: "green" }} />
        ) : (
          <FaTimesCircle style={{ color: "red" }} />
        ),
      okText: newStatus === 1 ? "Approve" : "Reject",
      okType: newStatus === 1 ? "primary" : "danger",
      okButtonProps: {
        icon: newStatus === 1 ? <FaCheckCircle /> : <FaTimesCircle />,
      },
      cancelButtonProps: {
        type: "text",
      },
      onOk: async () => {
        setActionLoading(true);
        try {
          // Assuming the staff ID would be available from context in a real app
          const staffId = 1; // Mock staff ID for demonstration

          const success = await reportMngUsecase.updateReportStatus({
            reportId: report.reportId,
            verifyStaffId: staffId,
            status: newStatus,
          });

          if (success) {
            message.success({
              content: `Report has been ${action}d successfully`,
              icon: newStatus === 1 ? <FaCheckCircle /> : <FaTimesCircle />,
            });

            // Update local state to reflect the change
            setReport({
              ...report,
              status: newStatus,
              verifyStaffId: staffId,
            });
          } else {
            message.error(`Failed to ${action} report`);
          }
        } catch (error) {
          console.error(`Error ${action}ing report:`, error);
          message.error(`Failed to ${action} report`);
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  const getCurrentStep = (status: number): number => {
    switch (status) {
      case 0:
        return 1; // Pending
      case 1:
        return 2; // Approved
      case 2:
        return 2; // Rejected
      default:
        return 0;
    }
  };

  const getStatusComponent = (status: number) => {
    const statusName = reportMngUsecase.getStatusName(status);

    switch (status) {
      case 0:
        return (
          <Badge
            status="processing"
            text={
              <Text strong style={{ fontSize: "16px", color: "#1890ff" }}>
                {statusName}
              </Text>
            }
          />
        );
      case 1:
        return (
          <Badge
            status="success"
            text={
              <Text strong style={{ fontSize: "16px", color: "#52c41a" }}>
                {statusName}
              </Text>
            }
          />
        );
      case 2:
        return (
          <Badge
            status="error"
            text={
              <Text strong style={{ fontSize: "16px", color: "#f5222d" }}>
                {statusName}
              </Text>
            }
          />
        );
      default:
        return (
          <Badge
            status="default"
            text={
              <Text strong style={{ fontSize: "16px" }}>
                Unknown
              </Text>
            }
          />
        );
    }
  };

  if (loading) {
    return (
      <Card bordered={false} className="report-detail-card">
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </Card>
    );
  }

  if (!report) {
    return (
      <Result
        status="404"
        title="Report Not Found"
        subTitle="Sorry, the report you are looking for does not exist."
        extra={
          <Button type="primary" onClick={() => navigate("/admin/reports")}>
            Back to Report List
          </Button>
        }
      />
    );
  }

  return (
    <div className="report-detail-container">
      <div style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card
              bordered={false}
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
              className="report-header-card"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    icon={<FaFileAlt />}
                    size={64}
                    style={{
                      backgroundColor:
                        report.status === 0
                          ? "#1890ff"
                          : report.status === 1
                          ? "#52c41a"
                          : "#f5222d",
                      marginRight: 16,
                    }}
                  />
                  <div>
                    <Title level={3} style={{ margin: 0 }}>
                      Report #{report.reportId}
                    </Title>
                    <Text type="secondary">
                      Created on {formatDate(report.createdAt)} by User #
                      {report.senderId}
                    </Text>
                  </div>
                </div>
                <div>{getStatusComponent(report.status)}</div>
              </div>

              <Steps
                current={getCurrentStep(report.status)}
                status={report.status === 2 ? "error" : undefined}
                style={{ maxWidth: 800, margin: "24px auto" }}
              >
                <Step
                  title="Submitted"
                  description={formatDate(report.createdAt)}
                  icon={<FaExclamationCircle />}
                />
                <Step
                  title="Under Review"
                  description="Waiting for staff review"
                  icon={<FaEye />}
                />
                <Step
                  title={
                    report.status === 1
                      ? "Approved"
                      : report.status === 2
                      ? "Rejected"
                      : "Pending Decision"
                  }
                  description={
                    report.verifyStaffId
                      ? `By Staff #${report.verifyStaffId}`
                      : "Awaiting staff action"
                  }
                  icon={
                    report.status === 1 ? (
                      <FaCheckCircle />
                    ) : report.status === 2 ? (
                      <FaTimesCircle />
                    ) : (
                      <FaThumbsUp />
                    )
                  }
                />
              </Steps>
            </Card>
          </Col>

          <Col xs={24} md={16}>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaExclamationTriangle
                    style={{ marginRight: 8, color: "#faad14" }}
                  />
                  <span>Report Details</span>
                </div>
              }
              bordered={false}
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
              className="report-content-card"
            >
              <Alert
                message="Report Reason"
                description={
                  <Card
                    type="inner"
                    style={{
                      marginTop: 16,
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #eee",
                    }}
                  >
                    <Paragraph
                      style={{
                        whiteSpace: "pre-wrap",
                        fontSize: 16,
                        marginBottom: 0,
                      }}
                    >
                      {report.reason}
                    </Paragraph>
                  </Card>
                }
                type="info"
                showIcon
                icon={<FaInfoCircle />}
                style={{ marginBottom: 24 }}
              />

              <Divider orientation="left">Related Information</Divider>

              <Descriptions
                bordered
                column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                layout="vertical"
              >
                <Descriptions.Item
                  label={
                    <Space>
                      <FaProjectDiagram /> Related Project
                    </Space>
                  }
                >
                  <Tag
                    color="purple"
                    style={{ fontSize: 14, padding: "4px 8px" }}
                  >
                    <FaProjectDiagram style={{ marginRight: 5 }} />
                    Project #{report.projectId}
                    <Tooltip title="View Project Details">
                      <Button
                        type="link"
                        size="small"
                        icon={<FaEye />}
                        style={{ marginLeft: 8 }}
                        onClick={() =>
                          message.info(
                            `Navigate to project ${report.projectId} details`
                          )
                        }
                      />
                    </Tooltip>
                  </Tag>
                </Descriptions.Item>

                <Descriptions.Item
                  label={
                    <Space>
                      <FaUser /> Report Sender
                    </Space>
                  }
                >
                  <Tag
                    color="geekblue"
                    style={{ fontSize: 14, padding: "4px 8px" }}
                  >
                    <FaUser style={{ marginRight: 5 }} />
                    User #{report.senderId}
                    <Tooltip title="View User Profile">
                      <Button
                        type="link"
                        size="small"
                        icon={<FaEye />}
                        style={{ marginLeft: 8 }}
                        onClick={() =>
                          message.info(
                            `Navigate to user ${report.senderId} profile`
                          )
                        }
                      />
                    </Tooltip>
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FaCalendarAlt style={{ marginRight: 8 }} />
                  <span>Timeline & Actions</span>
                </div>
              }
              bordered={false}
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
              className="report-actions-card"
            >
              <Timeline
                mode="left"
                items={[
                  {
                    label: formatDate(report.createdAt),
                    children: "Report created by User #" + report.senderId,
                    color: "blue",
                    dot: <FaFileAlt />,
                  },
                  report.status === 0
                    ? {
                        label: "Pending",
                        children: "Awaiting staff review",
                        color: "orange",
                        dot: <FaEye />,
                      }
                    : report.status === 1
                    ? {
                        label: "Approved",
                        children: report.verifyStaffId
                          ? `Approved by Staff #${report.verifyStaffId}`
                          : "Approved by staff",
                        color: "green",
                        dot: <FaCheckCircle />,
                      }
                    : {
                        label: "Rejected",
                        children: report.verifyStaffId
                          ? `Rejected by Staff #${report.verifyStaffId}`
                          : "Rejected by staff",
                        color: "red",
                        dot: <FaTimesCircle />,
                      },
                ]}
              />

              <Divider />

              {report.status === 0 && (
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    icon={<FaCheckCircle />}
                    style={{ backgroundColor: "green", width: "100%" }}
                    onClick={() => handleStatusAction(1)}
                    loading={actionLoading}
                    size="large"
                  >
                    Approve Report
                  </Button>
                  <Button
                    danger
                    icon={<FaTimesCircle />}
                    style={{ width: "100%" }}
                    onClick={() => handleStatusAction(2)}
                    loading={actionLoading}
                    size="large"
                  >
                    Reject Report
                  </Button>
                </Space>
              )}

              <Button
                icon={<FaArrowLeft />}
                type="default"
                onClick={() => navigate("/admin/reports")}
                style={{ marginTop: 16, width: "100%" }}
              >
                Back to Report List
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ReportDetail;
