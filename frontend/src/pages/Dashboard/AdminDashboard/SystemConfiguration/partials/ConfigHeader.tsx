import { Badge, Space, Typography } from "antd";
import React from "react";

const { Title, Paragraph } = Typography;

const ConfigHeader: React.FC = () => {
  return (
    <div className="mb-7 pb-5 border-b border-gray-100">
      <Space direction="vertical" size={2}>
        <Badge.Ribbon text="Settings" color="blue">
          <Title level={2} className="m-0">
            System Configuration
          </Title>
        </Badge.Ribbon>
        <Paragraph className="text-base text-gray-500 mt-2">
          Configure system settings to customize the platform functionality and
          appearance.
        </Paragraph>
      </Space>
    </div>
  );
};

export default ConfigHeader;
