import { ClockCircleOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Space, Timeline, Typography } from "antd";

const { Title, Text } = Typography;

const VerificationStatus = () => {
  return (
    <Card>
      <div style={{ marginBottom: 24 }}>
        <Space direction="vertical" size={4}>
          <Title level={4} style={{ margin: 0 }}>
            Verification Status
          </Title>
          <Text type="secondary">
            Get your portfolio verified to increase visibility
          </Text>
        </Space>
        <div style={{ marginTop: 16 }}>
          <Badge
            status="warning"
            text={<Text style={{ color: "#d48806" }}>Pending Review</Text>}
          />
        </div>
      </div>

      <Space
        direction="vertical"
        size="middle"
        style={{ width: "100%", marginBottom: 24 }}
      >
        <Timeline
          items={[
            {
              color: "warning",
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>Document Verification</Text>
                  <Text type="secondary">
                    Your documents are being reviewed by our team
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    2 days ago
                  </Text>
                </Space>
              ),
            },
            {
              color: "gray",
              children: (
                <Space direction="vertical" size={4}>
                  <Text strong>Skills Assessment</Text>
                  <Text type="secondary">
                    Pending technical skills verification
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Waiting
                  </Text>
                </Space>
              ),
            },
          ]}
        />
      </Space>

      <Button
        type="primary"
        block
        style={{ backgroundColor: "#10b981" }}
        icon={<ClockCircleOutlined />}
      >
        Track Verification Progress
      </Button>
    </Card>
  );
};

export default VerificationStatus;
