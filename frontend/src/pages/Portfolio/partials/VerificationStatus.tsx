import { CheckCircleFilled, EditFilled } from "@ant-design/icons";
import { Card, Steps, Typography } from "antd";
import { PortfolioDTO } from "../models/types";

const { Title } = Typography;

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
  // Xác định trạng thái hiện tại
  const getCurrentStatus = () => {
    if (!portfolio) return PortfolioStatus.Modifying;
    return portfolio.status !== undefined
      ? portfolio.status
      : PortfolioStatus.Modifying;
  };

  const currentStatus = getCurrentStatus();

  const getStepsItems = () => {
    const items = [
      {
        title: "Modifying",
        status:
          currentStatus === PortfolioStatus.Modifying
            ? "process"
            : currentStatus === PortfolioStatus.Verified
            ? "finish"
            : ("finish" as "process" | "finish" | "wait" | "error"),
        icon:
          currentStatus === PortfolioStatus.Modifying ? (
            <div style={{ color: "#faad14" }}>
              <EditFilled />
            </div>
          ) : (
            <CheckCircleFilled />
          ),
      },
      {
        title: "Pending Verification",
        status:
          currentStatus === PortfolioStatus.Pending
            ? "process"
            : currentStatus === PortfolioStatus.Modifying
            ? "wait"
            : ("finish" as "process" | "finish" | "wait" | "error"),
        icon:
          currentStatus === PortfolioStatus.Pending ? (
            <div style={{ color: "#faad14" }}>
              <EditFilled />
            </div>
          ) : currentStatus === PortfolioStatus.Verified ||
            currentStatus === PortfolioStatus.Rejected ? (
            <CheckCircleFilled />
          ) : null,
      },
    ];

    // Add Verified or Rejected step based on actual status
    if (currentStatus === PortfolioStatus.Verified) {
      items.push({
        title: "Verified",
        status: "finish" as "process" | "finish" | "wait" | "error",
        icon: <CheckCircleFilled />,
      });
    } else if (currentStatus === PortfolioStatus.Rejected) {
      items.push({
        title: "Rejected",
        status: "error" as "process" | "finish" | "wait" | "error",
        icon: (
          <div style={{ color: "#ff4d4f" }}>
            <EditFilled />
          </div>
        ),
      });
    } else if (currentStatus === PortfolioStatus.Pending) {
      items.push({
        title: "Verification Result",
        status: "wait" as "process" | "finish" | "wait" | "error",
        icon: null,
      });
    }

    return items;
  };

  return (
    <Card className="bg-white dark:bg-[#27272a]">
      <Title level={4} style={{ margin: "0 0 20px 0" }}>
        Verification Status
      </Title>

      <Steps
        current={
          currentStatus === PortfolioStatus.Modifying
            ? 0
            : currentStatus === PortfolioStatus.Pending
            ? 1
            : 2
        }
        direction="vertical"
        items={getStepsItems()}
      />
    </Card>
  );
};

export default VerificationStatus;
