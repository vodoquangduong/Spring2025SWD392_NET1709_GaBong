import type { TabsProps } from "antd";
import { Col, Row, Tabs, Typography } from "antd";
import { useState } from "react";
import About from "./partials/About";
import ProjectGallery from "./partials/ProjectGallery";
import ServicesOffered from "./partials/ServicesOffered";
import Skills from "./partials/Skills";
import VerificationStatus from "./partials/VerificationStatus";

const { Title } = Typography;

const Portfolio: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const renderContent = (activeKey: string) => {
    switch (activeKey) {
      case "works":
        return (
          <ProjectGallery
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(!isEditing)}
          />
        );
      case "skills":
        return <Skills isEditing={isEditing} />;
      case "services":
        return (
          <ServicesOffered
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(!isEditing)}
          />
        );
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "works",
      label: "Works",
      children: renderContent("works"),
    },
    {
      key: "skills",
      label: "Skills",
      children: renderContent("skills"),
    },
    {
      key: "services",
      label: "Services",
      children: renderContent("services"),
    },
    {
      key: "about",
      label: "About",
      children: renderContent("about"),
    },
  ];

  return (
    <div style={{ padding: "50px 50px" }}>
      <Row gutter={32}>
        <Col xs={24} lg={16}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <Title level={1}>Portfolio</Title>
            <Tabs defaultActiveKey="works" items={items} size="large" />
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <VerificationStatus />
        </Col>
      </Row>
    </div>
  );
};

export default Portfolio;
