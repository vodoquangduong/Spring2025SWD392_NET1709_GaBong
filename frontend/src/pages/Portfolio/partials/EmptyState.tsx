import { Button, Card, Typography } from "antd";

const { Text } = Typography;

interface EmptyStateProps {
  onCreateClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => {
  return (
    <div className="mx-container">
      <Card>
        <div className="flex flex-col items-center justify-center h-[400px]">
          <Text type="secondary" style={{ fontSize: 18, marginBottom: 16 }}>
            No portfolio found
          </Text>
          <Button type="primary" onClick={onCreateClick}>
            Create Portfolio
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EmptyState;
