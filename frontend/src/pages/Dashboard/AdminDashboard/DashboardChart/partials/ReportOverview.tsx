import { FileTextOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Statistic } from "antd";

interface ReportOverviewProps {
  reportStats: {
    totalReports: number;
    pendingReports: number;
    resolvedReports: number;
    rejectedReports: number;
  };
}

const ReportOverview = ({ reportStats }: ReportOverviewProps) => {
  const { totalReports, pendingReports, resolvedReports, rejectedReports } =
    reportStats;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "#faad14";
      case "Resolved":
        return "#52c41a";
      case "Rejected":
        return "#f5222d";
      default:
        return "#1890ff";
    }
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <FileTextOutlined className="text-xl" />
          <span>Report Overview</span>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-6">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic
              title="Total Reports"
              value={totalReports}
              valueStyle={{ color: "#1890ff" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Pending"
              value={pendingReports}
              valueStyle={{ color: "#faad14" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Resolved"
              value={resolvedReports}
              valueStyle={{ color: "#52c41a" }}
            />
          </Col>
        </Row>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Pending Reports</span>
              <span>{((pendingReports / totalReports) * 100).toFixed(1)}%</span>
            </div>
            <Progress
              percent={(pendingReports / totalReports) * 100}
              strokeColor={getStatusColor("Pending")}
              showInfo={false}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Resolved Reports</span>
              <span>
                {((resolvedReports / totalReports) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              percent={(resolvedReports / totalReports) * 100}
              strokeColor={getStatusColor("Resolved")}
              showInfo={false}
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Rejected Reports</span>
              <span>
                {((rejectedReports / totalReports) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              percent={(rejectedReports / totalReports) * 100}
              strokeColor={getStatusColor("Rejected")}
              showInfo={false}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReportOverview;
