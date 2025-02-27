import { Button, Card, Col, Progress, Row, Space, Typography } from "antd";
import { useState } from "react";
import {
  FaAward,
  FaBrain,
  FaCertificate,
  FaChartLine,
  FaPlus,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { SkillCategory } from "../models/types";

const { Title, Text } = Typography;

interface Skill {
  name: string;
  level: number;
  years: number;
  certified?: boolean;
}

interface SkillsProps {
  isEditing?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isEditing = false }) => {
  const [categories] = useState<SkillCategory[]>([
    {
      name: "Frontend Development",
      icon: <FaBrain />,
      skills: [
        { name: "React", level: 5, years: 3, certified: true },
        { name: "TypeScript", level: 4, years: 2, certified: true },
        { name: "Tailwind CSS", level: 5, years: 2 },
        { name: "Next.js", level: 4, years: 1, certified: true },
      ],
    },
    {
      name: "Backend Development",
      icon: <FaChartLine />,
      skills: [
        { name: "Node.js", level: 5, years: 4, certified: true },
        { name: "Python", level: 4, years: 3 },
        { name: "PostgreSQL", level: 4, years: 3 },
        { name: "GraphQL", level: 3, years: 1 },
      ],
    },
    {
      name: "DevOps & Tools",
      icon: <FaTrophy />,
      skills: [
        { name: "Docker", level: 4, years: 2, certified: true },
        { name: "AWS", level: 3, years: 2, certified: true },
        { name: "Git", level: 5, years: 4 },
        { name: "CI/CD", level: 4, years: 2 },
      ],
    },
  ]);

  const certifications = [
    {
      id: 1,
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "March 2024",
      icon: <FaAward />,
    },
    {
      id: 2,
      name: "Google Cloud Professional",
      issuer: "Google Cloud",
      date: "January 2024",
      icon: <FaAward />,
    },
    {
      id: 3,
      name: "React Native Specialist",
      issuer: "Meta",
      date: "December 2023",
      icon: <FaAward />,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Title level={2}>Skills & Expertise</Title>
          <Text type="secondary">
            Highlight your technical skills and proficiency levels
          </Text>
        </div>
        <Button type="primary" icon={<FaPlus />}>
          Add Skill
        </Button>
      </div>

      {/* Skills Categories */}
      <Row gutter={[24, 24]}>
        {categories.map((category) => (
          <Col key={category.name} xs={24} md={12}>
            <Card>
              <Space align="center" style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 24, color: "#10b981" }}>
                  {category.icon}
                </Text>
                <Title level={3} style={{ margin: 0 }}>
                  {category.name}
                </Title>
              </Space>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <Space
                      align="center"
                      style={{ justifyContent: "space-between", width: "100%" }}
                    >
                      <div>
                        <Space>
                          <Text strong>{skill.name}</Text>
                          {skill.certified && (
                            <FaStar style={{ color: "#fadb14" }} />
                          )}
                        </Space>
                        <br />
                        <Text type="secondary">
                          {skill.years} {skill.years === 1 ? "year" : "years"}{" "}
                          of experience
                        </Text>
                      </div>
                      <Text type="success">{skill.level}/5</Text>
                    </Space>
                    <Progress
                      percent={(skill.level / 5) * 100}
                      showInfo={false}
                      strokeColor="#10b981"
                    />
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Certifications */}
      <div>
        <Space align="center" style={{ marginBottom: 24 }}>
          <FaCertificate style={{ fontSize: 24, color: "#10b981" }} />
          <Title
            level={3}
            style={{
              margin: 0,
              background: "linear-gradient(to right, #10b981, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Certifications
          </Title>
        </Space>
        <Row gutter={[16, 16]}>
          {certifications.map((cert) => (
            <Col key={cert.id} xs={24} md={8}>
              <Card hoverable>
                <Space align="start">
                  <div
                    style={{
                      padding: 8,
                      background: "rgba(16, 185, 129, 0.1)",
                      borderRadius: 8,
                    }}
                  >
                    {cert.icon}
                  </div>
                  <div>
                    <Text strong>{cert.name}</Text>
                    <br />
                    <Text type="secondary">{cert.issuer}</Text>
                    <br />
                    <Text type="success" style={{ fontSize: 12 }}>
                      Issued: {cert.date}
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Space>
  );
};

export default Skills;
