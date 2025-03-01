import {
  ClockCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
import { Certificate, Experience as ExperienceType } from "./models/types";
import Experience from "./partials/Experience";
import { portfolioUseCase } from "./usecases/portfolioUseCase";

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
  const [submitting, setSubmitting] = useState(false);

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

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      // Xử lý dữ liệu ngày tháng trước khi chuyển đổi sang JSON
      const processedExperiences = (values.experiences || []).map(
        (exp: ExperienceType) => ({
          ...exp,
          // Chuyển đổi đối tượng Dayjs sang chuỗi ISO
          startDate: exp.startDate
            ? typeof exp.startDate === "object" && exp.startDate.format
              ? exp.startDate.format("YYYY-MM-DD")
              : exp.startDate
            : null,
          endDate: exp.endDate
            ? typeof exp.endDate === "object" && exp.endDate.format
              ? exp.endDate.format("YYYY-MM-DD")
              : exp.endDate
            : null,
          isCurrentPosition: !exp.endDate, // Nếu không có endDate thì đây là vị trí hiện tại
        })
      );

      const processedCertificates = (values.certificates || []).map(
        (cert: Certificate) => ({
          ...cert,
          // Chuyển đổi đối tượng Dayjs sang chuỗi ISO nếu có
          issueDate: cert.issueDate
            ? typeof cert.issueDate === "object" && cert.issueDate.format
              ? cert.issueDate.format("YYYY-MM-DD")
              : cert.issueDate
            : null,
        })
      );

      // Prepare data for API
      const worksData = {
        skills: values.skills || [],
        experiences: processedExperiences || [],
      };

      // Chuyển đổi dữ liệu thành chuỗi JSON
      const worksString = JSON.stringify(worksData);
      const certificatesString = JSON.stringify(processedCertificates || []);

      // Đảm bảo dữ liệu không bị null hoặc undefined và đúng thứ tự
      const portfolioData = {
        title: values.title || "",
        works: worksString,
        certificate: certificatesString,
        about: values.description || "", // Sửa từ about thành description
      };

      // Log dữ liệu cuối cùng sẽ gửi đến API
      console.log("Final portfolio data to send:", portfolioData);

      try {
        // Create new portfolio
        const result = await portfolioUseCase.createPortfolio(portfolioData);
        console.log("Portfolio created successfully:", result);
        message.success("Portfolio saved successfully");
        setIsEditing(false);
      } catch (apiError: any) {
        console.error("API Error:", apiError);
        message.error(apiError.message || "Failed to save portfolio");
      }
    } catch (error: any) {
      console.error("Form validation error:", error);
      message.error("Please check your form inputs and try again");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
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
            <Card
              extra={
                isEditing ? (
                  <Space>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button
                      type="primary"
                      onClick={handleSave}
                      loading={submitting}
                    >
                      Save
                    </Button>
                  </Space>
                ) : (
                  <Button type="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                )
              }
            >
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

                {/* Experience Section */}
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <Title level={5}>Experience</Title>
                    <Divider style={{ margin: "12px 0" }} />
                  </Col>
                  <Col span={24}>
                    <Form.List name="experiences">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Card
                              key={key}
                              style={{ marginBottom: 16 }}
                              extra={
                                isEditing ? (
                                  <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                  />
                                ) : null
                              }
                            >
                              <Row gutter={[16, 16]}>
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "position"]}
                                    label="Position"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter position",
                                      },
                                    ]}
                                  >
                                    {isEditing ? (
                                      <Input
                                        placeholder="e.g. Software Engineer"
                                        variant="outlined"
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "experiences",
                                          name,
                                          "position",
                                        ])}
                                      </div>
                                    )}
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "company"]}
                                    label="Company"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter company",
                                      },
                                    ]}
                                  >
                                    {isEditing ? (
                                      <Input
                                        placeholder="e.g. Google"
                                        variant="outlined"
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "experiences",
                                          name,
                                          "company",
                                        ])}
                                      </div>
                                    )}
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "startDate"]}
                                    label="Start Date"
                                  >
                                    {isEditing ? (
                                      <Input
                                        type="date"
                                        placeholder="Start Date"
                                        variant="outlined"
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "experiences",
                                          name,
                                          "startDate",
                                        ]) &&
                                          new Date(
                                            form.getFieldValue([
                                              "experiences",
                                              name,
                                              "startDate",
                                            ])
                                          ).toLocaleDateString()}
                                      </div>
                                    )}
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "endDate"]}
                                    label="End Date"
                                  >
                                    {isEditing ? (
                                      <Input
                                        type="date"
                                        placeholder="End Date (leave empty if current)"
                                        variant="outlined"
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "experiences",
                                          name,
                                          "endDate",
                                        ])
                                          ? new Date(
                                              form.getFieldValue([
                                                "experiences",
                                                name,
                                                "endDate",
                                              ])
                                            ).toLocaleDateString()
                                          : "Present"}
                                      </div>
                                    )}
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                {...restField}
                                name={[name, "description"]}
                                label="Description"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter job description",
                                  },
                                ]}
                              >
                                {isEditing ? (
                                  <Input.TextArea
                                    placeholder="Describe your responsibilities and achievements"
                                    rows={4}
                                  />
                                ) : (
                                  <div>
                                    {form.getFieldValue([
                                      "experiences",
                                      name,
                                      "description",
                                    ])}
                                  </div>
                                )}
                              </Form.Item>
                            </Card>
                          ))}

                          {isEditing && (
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() =>
                                  add({
                                    position: "",
                                    company: "",
                                    startDate: null,
                                    endDate: null,
                                    description: "",
                                  })
                                }
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Experience
                              </Button>
                            </Form.Item>
                          )}

                          {!isEditing && fields.length === 0 && (
                            <Text type="secondary">
                              No experience added yet.
                            </Text>
                          )}
                        </>
                      )}
                    </Form.List>
                  </Col>
                </Row>

                {/* Certificates Section */}
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col span={24}>
                    <Title level={5}>Certificates</Title>
                    <Divider style={{ margin: "12px 0" }} />
                  </Col>
                  <Col span={24}>
                    <Form.List name="certificates">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Card
                              key={key}
                              style={{ marginBottom: 16 }}
                              extra={
                                isEditing ? (
                                  <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                  />
                                ) : null
                              }
                            >
                              <Row gutter={[16, 16]}>
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "title"]}
                                    label="Certificate Title"
                                    rules={[
                                      {
                                        required: true,
                                        message:
                                          "Please enter certificate title",
                                      },
                                    ]}
                                  >
                                    {isEditing ? (
                                      <Input
                                        placeholder="e.g. AWS Certified Developer"
                                        variant="outlined"
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "certificates",
                                          name,
                                          "title",
                                        ])}
                                      </div>
                                    )}
                                  </Form.Item>
                                </Col>
                                <Col span={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "issueDate"]}
                                    label="Issue Date"
                                  >
                                    {isEditing ? (
                                      <Input
                                        type="date"
                                        placeholder="Issue Date"
                                        variant="outlined"
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "certificates",
                                          name,
                                          "issueDate",
                                        ]) &&
                                          new Date(
                                            form.getFieldValue([
                                              "certificates",
                                              name,
                                              "issueDate",
                                            ])
                                          ).toLocaleDateString()}
                                      </div>
                                    )}
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                {...restField}
                                name={[name, "url"]}
                                label="Certificate URL"
                              >
                                {isEditing ? (
                                  <Input
                                    placeholder="Link to certificate (optional)"
                                    variant="outlined"
                                  />
                                ) : form.getFieldValue([
                                    "certificates",
                                    name,
                                    "url",
                                  ]) ? (
                                  <a
                                    href={form.getFieldValue([
                                      "certificates",
                                      name,
                                      "url",
                                    ])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View Certificate
                                  </a>
                                ) : (
                                  <Text type="secondary">No URL provided</Text>
                                )}
                              </Form.Item>
                            </Card>
                          ))}

                          {isEditing && (
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() =>
                                  add({ title: "", url: "", issueDate: null })
                                }
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Certificate
                              </Button>
                            </Form.Item>
                          )}

                          {!isEditing && fields.length === 0 && (
                            <Text type="secondary">
                              No certificates added yet.
                            </Text>
                          )}
                        </>
                      )}
                    </Form.List>
                  </Col>
                </Row>

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
