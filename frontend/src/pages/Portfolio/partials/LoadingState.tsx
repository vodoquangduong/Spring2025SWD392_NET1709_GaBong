import { Card, Space, Spin, Typography } from "antd";

const { Text } = Typography;

const LoadingState: React.FC = () => {
  return (
    <div className="mx-container">
      <Card>
        <div className="flex items-center justify-center h-[400px]">
          <Space direction="vertical" align="center">
            <Spin size="large" />
            <Text>Loading portfolio...</Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default LoadingState;
