import { Card, Space, Typography } from "antd";

const { Title, Text } = Typography;

const PortfolioTips: React.FC = () => {
  return (
    <Card className="bg-white dark:bg-[#27272a]">
      <div style={{ marginBottom: 24 }}>
        <Space direction="vertical" size={4}>
          <Title level={4} style={{ margin: 0 }}>
            Portfolio Tips
          </Title>
          <Text type="secondary">
            Create a compelling portfolio to attract clients
          </Text>
        </Space>
      </div>
      <ul style={{ paddingLeft: 16 }}>
        <li style={{ marginBottom: 8 }}>
          <Text>Keep your title clear and concise</Text>
        </li>
        <li style={{ marginBottom: 8 }}>
          <Text>Highlight your most relevant skills</Text>
        </li>
        <li style={{ marginBottom: 8 }}>
          <Text>Include your most impressive work experiences</Text>
        </li>
        <li style={{ marginBottom: 8 }}>
          <Text>Add certificates to boost your credibility</Text>
        </li>
      </ul>
    </Card>
  );
};

export default PortfolioTips;
