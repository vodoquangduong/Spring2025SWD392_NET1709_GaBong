import { ClockCircleOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Space, Timeline, Typography } from "antd";
import { PortfolioDTO } from "../models/types";

const { Title, Text } = Typography;

// Enum PortfolioStatus
enum PortfolioStatus {
  Pending = 0,
  Verified = 1,
  Rejected = 2,
  Modifying = 3,
}

interface VerificationStatusProps {
  portfolio?: PortfolioDTO | null;
}

// Component VerificationStatus
const VerificationStatus: React.FC<VerificationStatusProps> = ({
  portfolio,
}) => {
  // Xác định trạng thái xác minh dựa trên dữ liệu portfolio
  const getStatusInfo = () => {
    if (!portfolio) {
      return {
        status: "default",
        text: "No Portfolio",
        color: "default",
      };
    }

    const status =
      portfolio.status !== undefined
        ? portfolio.status
        : PortfolioStatus.Modifying;

    switch (status) {
      case PortfolioStatus.Pending:
        return {
          status: "warning",
          text: "Pending Verification",
          color: "#d48806",
        };
      case PortfolioStatus.Verified:
        return {
          status: "success",
          text: "Verified",
          color: "#52c41a",
        };
      case PortfolioStatus.Rejected:
        return {
          status: "error",
          text: "Rejected - Needs Revision",
          color: "#f5222d",
        };
      case PortfolioStatus.Modifying:
        return {
          status: "processing",
          text: "Editing",
          color: "#1890ff",
        };
      default:
        return {
          status: "default",
          text: "Unknown",
          color: "default",
        };
    }
  };

  const statusInfo = getStatusInfo();

  // Xác định các mục timeline dựa trên trạng thái
  const getTimelineItems = () => {
    const items = [
      {
        color:
          portfolio && portfolio.status === PortfolioStatus.Pending
            ? "warning"
            : portfolio && portfolio.status === PortfolioStatus.Verified
            ? "success"
            : portfolio && portfolio.status === PortfolioStatus.Rejected
            ? "error"
            : "gray",
        children: (
          <Space direction="vertical" size={4}>
            <Text strong>Document Verification</Text>
            <Text type="secondary">
              {portfolio && portfolio.status === PortfolioStatus.Pending
                ? "Your documents are being reviewed by our team"
                : portfolio && portfolio.status === PortfolioStatus.Verified
                ? "Your documents have been verified"
                : portfolio && portfolio.status === PortfolioStatus.Rejected
                ? "Your documents have been rejected. Please revise and resubmit."
                : "Waiting for document submission"}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {portfolio &&
              (portfolio.status === PortfolioStatus.Pending ||
                portfolio.status === PortfolioStatus.Verified ||
                portfolio.status === PortfolioStatus.Rejected)
                ? "2 days ago"
                : "Waiting"}
            </Text>
          </Space>
        ),
      },
      {
        color:
          portfolio && portfolio.status === PortfolioStatus.Verified
            ? "success"
            : "gray",
        children: (
          <Space direction="vertical" size={4}>
            <Text strong>Skills Assessment</Text>
            <Text type="secondary">
              {portfolio && portfolio.status === PortfolioStatus.Verified
                ? "Your skills have been verified"
                : "Pending technical skills verification"}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {portfolio && portfolio.status === PortfolioStatus.Verified
                ? "1 day ago"
                : "Waiting"}
            </Text>
          </Space>
        ),
      },
    ];

    // Thêm mục "Revision Required" nếu portfolio bị từ chối
    if (portfolio && portfolio.status === PortfolioStatus.Rejected) {
      items.push({
        color: "error",
        children: (
          <Space direction="vertical" size={4}>
            <Text strong>Revision Required</Text>
            <Text type="secondary">
              Your portfolio needs to be revised and resubmitted for
              verification
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              1 day ago
            </Text>
          </Space>
        ),
      });
    }

    return items;
  };

  return (
    <Card className="bg-white dark:bg-[#27272a]">
      <div style={{ marginBottom: 24 }}>
        <Space direction="vertical" size={4}>
          <Title level={4} style={{ margin: 0 }}>
            Verification Status
          </Title>
          <Text type="secondary">
            {portfolio && portfolio.status === PortfolioStatus.Verified
              ? "Your portfolio is verified and publicly visible"
              : "Get your portfolio verified to increase visibility"}
          </Text>
        </Space>
        <div style={{ marginTop: 16 }}>
          <Badge
            status={statusInfo.status as any}
            text={
              <Text style={{ color: statusInfo.color }}>{statusInfo.text}</Text>
            }
          />
        </div>
      </div>

      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", marginBottom: 24 }}
      >
        <Timeline items={getTimelineItems()} />
      </Space>

      <Button
        type="primary"
        block
        style={{ backgroundColor: "#10b981" }}
        icon={<ClockCircleOutlined />}
        disabled={!portfolio || portfolio.status === PortfolioStatus.Modifying}
      >
        Track Verification Progress
      </Button>
    </Card>
  );
};

export default VerificationStatus;
