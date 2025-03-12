import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { mockSettings } from "../models/mockSettings";
import SettingField from "./SettingField";

const { Title, Paragraph } = Typography;

interface SettingsSectionProps {
  title: string;
  description: string;
  category: string;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  category,
}) => {
  const categorySettings = mockSettings.filter(
    (setting) => setting.category === category
  );

  const halfLength = Math.ceil(categorySettings.length / 2);
  const firstHalf = categorySettings.slice(0, halfLength);
  const secondHalf = categorySettings.slice(halfLength);

  return (
    <div>
      <div className="mb-6">
        <Title level={4} className="mb-2">
          {title}
        </Title>
        <Paragraph className="text-gray-500 text-sm">{description}</Paragraph>
      </div>

      <Row gutter={[32, 16]}>
        <Col span={24} md={12}>
          <Card className="rounded-lg shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
            {firstHalf.map((setting) => (
              <div key={setting.key} className="mb-5 last:mb-0">
                <SettingField setting={setting} />
              </div>
            ))}
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card className="rounded-lg shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
            {secondHalf.map((setting) => (
              <div key={setting.key} className="mb-5 last:mb-0">
                <SettingField setting={setting} />
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsSection;
