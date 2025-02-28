import { ClockCircleOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from "antd";
import { useState } from "react";
import { HiCheckCircle } from "react-icons/hi2";
import { MdPlace } from "react-icons/md";
import Experience from "./partials/Experience";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Danh sách skills mẫu
const SKILLS_OPTIONS = [
  { value: "React", label: "React" },
  { value: "Angular", label: "Angular" },
  { value: "Vue", label: "Vue" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express", label: "Express" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "MySQL", label: "MySQL" },
  { value: "PostgreSQL", label: "PostgreSQL" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "Sass", label: "Sass" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C#", label: "C#" },
  { value: "PHP", label: "PHP" },
  { value: "Ruby", label: "Ruby" },
  { value: "Swift", label: "Swift" },
  { value: "Kotlin", label: "Kotlin" },
];

// Mockup data cho portfolio
const mockPortfolioData = {
  fullName: "Raja Ahmad Ayaz N.",
  title: "Full Stack Developer | 10+ Years of Experience",
  location: "Talisay, Philippines",
  availability: "available",
  description:
    "TAFSOL TECHNOLOGIES Group!!\n\nAiming to deliver $10M+ Projects in 2024-2025...",
  hourlyRate: "$25/hr",
  totalEarned: "$50K+",
  projectsCompleted: 85,
  rating: "4.9",
  skills: ["React", "Node.js", "TypeScript", "MongoDB"],
};

// Component VerificationStatus
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

const Portfolio: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      console.log("Form values:", values);
      message.success("Portfolio saved successfully");
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to save portfolio");
    }
  };

  const handleSubmitForReview = async () => {
    try {
      const values = await form.validateFields();
      console.log("Submit for review:", values);
      message.success("Portfolio submitted for staff review");
    } catch (error) {
      message.error("Please complete all required fields before submitting");
    }
  };

  const items = [
    {
      key: "experience",
      label: "Experience",
      children: <Experience isEditing={isEditing} />,
    },
    {
      key: "description",
      label: "Description",
      children: (
        <Form.Item
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea
            placeholder="Tell clients about your background, skills, and work experience"
            autoSize={{ minRows: 4, maxRows: 8 }}
            disabled={!isEditing}
          />
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="mx-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={mockPortfolioData}
      >
        <Row gutter={24}>
          <Col span={18}>
            <Card>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {/* Header Section */}
                <Space
                  align="start"
                  style={{ width: "100%", justifyContent: "space-between" }}
                >
                  <Space align="start">
                    <Form.Item name="avatar" style={{ margin: 0 }}>
                      <div
                        className="h-20 aspect-square rounded-full bg-center bg-no-repeat bg-cover"
                        style={{
                          backgroundImage:
                            "url(https://picsum.photos/id/10/400/200)",
                        }}
                      />
                    </Form.Item>

                    <Space direction="vertical" size="small">
                      <Space>
                        <Form.Item
                          name="fullName"
                          style={{ margin: 0 }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          {isEditing ? (
                            <Input
                              variant="outlined"
                              className="!text-2xl !font-semibold"
                            />
                          ) : (
                            <div className="text-2xl font-semibold">
                              {mockPortfolioData.fullName}
                            </div>
                          )}
                        </Form.Item>
                        <HiCheckCircle color="green" size={20} />
                      </Space>

                      <Form.Item
                        name="title"
                        style={{ margin: 0 }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your title",
                          },
                        ]}
                      >
                        {isEditing ? (
                          <Input variant="outlined" />
                        ) : (
                          <div>{mockPortfolioData.title}</div>
                        )}
                      </Form.Item>

                      <Space>
                        <MdPlace size={18} />
                        <Form.Item
                          name="location"
                          style={{ margin: 0 }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter your location",
                            },
                          ]}
                        >
                          {isEditing ? (
                            <Input variant="outlined" />
                          ) : (
                            <div>{mockPortfolioData.location}</div>
                          )}
                        </Form.Item>
                        <Form.Item name="availability" style={{ margin: 0 }}>
                          {isEditing ? (
                            <Select style={{ width: 120 }}>
                              <Option value="available">Open to work</Option>
                              <Option value="busy">Busy</Option>
                              <Option value="unavailable">Unavailable</Option>
                            </Select>
                          ) : (
                            <Tag color="green" className="rounded-full !px-3">
                              {mockPortfolioData.availability === "available"
                                ? "Open to work"
                                : mockPortfolioData.availability === "busy"
                                ? "Busy"
                                : "Unavailable"}
                            </Tag>
                          )}
                        </Form.Item>
                      </Space>
                    </Space>
                  </Space>

                  {/* Edit Button */}
                  <Button
                    type={isEditing ? "primary" : "default"}
                    onClick={() => {
                      if (isEditing) {
                        form.submit();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </Space>

                {/* Stats Section - Chỉ hiển thị, không cho phép edit */}
                <Row gutter={16}>
                  <Col span={6}>
                    <div>
                      <Text type="secondary">Hourly Rate</Text>
                      <div>
                        <Text strong>{mockPortfolioData.hourlyRate}</Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Text type="secondary">Total Earned</Text>
                      <div>
                        <Text strong>{mockPortfolioData.totalEarned}</Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Text type="secondary">Projects Completed</Text>
                      <div>
                        <Text strong>
                          {mockPortfolioData.projectsCompleted}
                        </Text>
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <Text type="secondary">Rating</Text>
                      <div>
                        <Text strong>{mockPortfolioData.rating}</Text>
                      </div>
                    </div>
                  </Col>
                </Row>

                {/* Skills Section - Dropdown chọn nhiều với theme mặc định */}
                <Form.Item
                  name="skills"
                  label="Skills"
                  rules={[
                    { required: true, message: "Please select your skills" },
                  ]}
                >
                  {isEditing ? (
                    <Select
                      mode="multiple"
                      placeholder="Select your skills"
                      style={{ width: "100%" }}
                      options={SKILLS_OPTIONS}
                    />
                  ) : (
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                    >
                      {mockPortfolioData.skills.map((skill) => (
                        <Tag key={skill}>{skill}</Tag>
                      ))}
                    </div>
                  )}
                </Form.Item>

                {/* Main Content Tabs */}
                <Tabs items={items} />

                {/* Submit for Review Section */}
                <Divider />
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Title level={4}>Submit for Staff Review</Title>
                  <Space>
                    <Button
                      type="primary"
                      onClick={handleSubmitForReview}
                      disabled={isEditing}
                    >
                      Submit for Review
                    </Button>
                    <Text>
                      Submit your portfolio for staff review to get verified
                      status.
                    </Text>
                  </Space>
                </Space>
              </Space>
            </Card>
          </Col>
          <Col span={6}>
            <VerificationStatus />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Portfolio;
