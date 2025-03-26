import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  PercentageOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import { SystemConfigData } from "../services/dashboardChartService";

interface SystemOverviewProps {
  systemStats: SystemConfigData;
}

const SystemOverview = ({ systemStats }: SystemOverviewProps) => {
  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <PercentageOutlined className="text-xl" />
          <span>Platform Fees & Reputation</span>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-6">
        {/* Fee Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PercentageOutlined />
            Platform Fees
          </h3>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Statistic
                title="Project Fee"
                value={systemStats.paymentPolicy.projectFee}
                suffix="% per project"
                valueStyle={{ color: "#1890ff" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Bid Fee"
                value={systemStats.paymentPolicy.bidFee}
                prefix="$"
                valueStyle={{ color: "#52c41a" }}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Withdrawal Fee"
                value={systemStats.paymentPolicy.withdrawalFee}
                suffix="% per transaction"
                valueStyle={{ color: "#722ed1" }}
              />
            </Col>
          </Row>
        </div>

        {/* Reputation Policy */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrophyOutlined />
            Reputation Points
          </h3>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Statistic
                title="Before Deadline"
                value={systemStats.reputationPolicy.beforeDeadline}
                suffix="pts"
                valueStyle={{ color: "#52c41a" }}
                prefix={<ClockCircleOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="On Deadline"
                value={systemStats.reputationPolicy.rightDeadline}
                suffix="pts"
                valueStyle={{ color: "#1890ff" }}
                prefix={<CheckCircleOutlined />}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Early/Late"
                value={systemStats.reputationPolicy.earlylateDeadline}
                suffix="pts"
                valueStyle={{ color: "#faad14" }}
                prefix={<ClockCircleOutlined />}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-4">
            <Col span={12}>
              <Statistic
                title="Late Penalty"
                value={systemStats.reputationPolicy.lateDeadline}
                suffix="pts"
                valueStyle={{ color: "#f5222d" }}
                prefix={<ClockCircleOutlined />}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Project Completion"
                value={systemStats.reputationPolicy.completeProject}
                suffix="pts"
                valueStyle={{ color: "#52c41a" }}
                prefix={<TrophyOutlined />}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
};

export default SystemOverview;
