import { Alert, Button, Card } from "antd";

interface EmptyStateProps {
  onCreateClick: () => void;
  isOwnProfile?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  onCreateClick,
  isOwnProfile = true,
}) => {
  return (
    <div className="mx-container">
      <Card className="bg-white dark:bg-[#27272a]">
        <div className="flex flex-col items-center justify-center h-[400px]">
          <Alert
            message="Portfolio Not Found"
            description={
              isOwnProfile
                ? "You haven't created a portfolio yet. Create one to showcase your skills and experience to potential clients."
                : "This freelancer hasn't created a portfolio yet."
            }
            type="warning"
            showIcon
            style={{ marginBottom: 24, maxWidth: 500 }}
          />

          {isOwnProfile && (
            <Button type="primary" onClick={onCreateClick}>
              Create Portfolio
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmptyState;
