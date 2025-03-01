import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Timeline,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCertificate,
  FaGraduationCap,
  FaUserCheck,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import {
  Certificate,
  Experience as ExperienceType,
  PortfolioDTO,
} from "./models/types";
import { portfolioUseCase } from "./usecases/portfolioUseCase";

const { Title, Text } = Typography;
const { TextArea } = Input;

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
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<PortfolioDTO | null>(null);
  const { accountId } = useAuthStore();
  const { id } = useParams<{ id: string }>();

  // Fetch portfolio data on component mount
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        // Use the ID from URL params if available, otherwise use the logged-in user's ID
        const freelancerId = id ? parseInt(id) : accountId;

        if (!freelancerId) {
          throw new Error("No freelancer ID available");
        }

        console.log("Fetching portfolio for freelancer ID:", freelancerId);
        const data = await portfolioUseCase.getPortfolioByFreelancerId(
          freelancerId
        );
        console.log("Portfolio data received:", data);
        setPortfolio(data);

        // Parse JSON strings to objects
        let worksData;
        let certificatesData;

        try {
          // Try to parse the works JSON string
          if (data.works) {
            console.log("Parsing works data:", data.works);
            worksData = JSON.parse(data.works);
            console.log("Parsed works data:", worksData);
          } else {
            console.warn("No works data available");
            worksData = { skills: [], experiences: [] };
          }

          // Try to parse the certificate JSON string
          if (data.certificate) {
            console.log("Parsing certificate data:", data.certificate);
            certificatesData = JSON.parse(data.certificate);
            console.log("Parsed certificate data:", certificatesData);
          } else {
            console.warn("No certificate data available");
            certificatesData = [];
          }
        } catch (parseError) {
          console.error("Error parsing JSON data:", parseError);
          message.error("Error parsing portfolio data");
          worksData = { skills: [], experiences: [] };
          certificatesData = [];
        }

        // Set form values
        form.setFieldsValue({
          title: data.title,
          description: data.about,
          skills: worksData.skills
            ? worksData.skills.map((skill: any) =>
                typeof skill === "string" ? skill : skill.name
              )
            : [],
          experiences: worksData.experiences || [],
          certificates: certificatesData || [],
        });
      } catch (error: any) {
        console.error("Error fetching portfolio:", error);
        message.error(error.message || "Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [accountId, id, form]);

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
      console.log("Form values before processing:", values);

      // Xử lý dữ liệu ngày tháng trước khi chuyển đổi sang JSON
      const processedExperiences = (values.experiences || []).map(
        (exp: ExperienceType) => ({
          position: exp.position,
          company: exp.company,
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
          description: exp.description,
          isCurrentPosition: !exp.endDate, // Nếu không có endDate thì đây là vị trí hiện tại
        })
      );

      // Prepare skills in the correct format
      const processedSkills = (values.skills || []).map((skill: string) => ({
        name: skill,
      }));

      const processedCertificates = (values.certificates || []).map(
        (cert: Certificate) => ({
          title: cert.title,
          url: cert.url || "",
          issueDate: cert.issueDate
            ? typeof cert.issueDate === "object" && cert.issueDate.format
              ? cert.issueDate.format("YYYY-MM-DD")
              : cert.issueDate
            : null,
        })
      );

      // Prepare data for API
      const worksData = {
        skills: processedSkills,
        experiences: processedExperiences || [],
      };

      console.log("Processed works data:", worksData);
      console.log("Processed certificates:", processedCertificates);

      // Chuyển đổi dữ liệu thành chuỗi JSON
      const worksString = JSON.stringify(worksData);
      const certificatesString = JSON.stringify(processedCertificates || []);

      // Đảm bảo dữ liệu không bị null hoặc undefined và đúng thứ tự
      const portfolioData = {
        title: values.title || "",
        works: worksString,
        certificate: certificatesString,
        about: values.description || "",
      };

      // Log dữ liệu cuối cùng sẽ gửi đến API
      console.log("Final portfolio data to send:", portfolioData);

      try {
        // Create or update portfolio
        let result;
        if (portfolio && portfolio.portfolioId) {
          // Update existing portfolio
          // Note: You'll need to implement updatePortfolio in your service
          result = await portfolioUseCase.updatePortfolio(
            portfolio.portfolioId,
            portfolioData
          );
        } else {
          // Create new portfolio
          result = await portfolioUseCase.createPortfolio(portfolioData);
        }

        console.log("Portfolio saved successfully:", result);
        message.success("Portfolio saved successfully");
        setIsEditing(false);

        // Refresh the data
        if (accountId) {
          const refreshedData =
            await portfolioUseCase.getPortfolioByFreelancerId(accountId);
          setPortfolio(refreshedData);
        }
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

  // If loading, show a loading state
  if (loading) {
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
  }

  // If no portfolio data found
  if (!portfolio) {
    return (
      <div className="mx-container">
        <Card>
          <div className="flex flex-col items-center justify-center h-[400px]">
            <Text type="secondary" style={{ fontSize: 18, marginBottom: 16 }}>
              No portfolio found
            </Text>
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Create Portfolio
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="p-8">
        <Typography.Title level={2}>Portfolio</Typography.Title>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col xs={24} md={18}>
            <Card
              extra={
                isEditing ? (
                  <Space>
                    <Button icon={<CloseOutlined />} onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSave}
                      loading={submitting}
                    >
                      Save
                    </Button>
                  </Space>
                ) : (
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={handleEdit}
                  >
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
                {/* Title Field */}
                <Form.Item
                  name="title"
                  label={
                    <Space>
                      <FaUserCheck />
                      <span>Professional Title</span>
                    </Space>
                  }
                  rules={[
                    { required: true, message: "Please enter a title" },
                    {
                      max: 20,
                      message: "Title must be less than 20 characters",
                    },
                  ]}
                >
                  {isEditing ? (
                    <Input
                      placeholder="Enter your professional title"
                      maxLength={20}
                    />
                  ) : (
                    <Typography.Title level={4}>
                      {portfolio?.title}
                    </Typography.Title>
                  )}
                </Form.Item>

                {/* Skills Section */}
                <Form.Item
                  name="skills"
                  label={
                    <Space>
                      <FaCertificate />
                      <span>Skills</span>
                    </Space>
                  }
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
                    <div>
                      {portfolio?.works &&
                        (() => {
                          try {
                            const worksData = JSON.parse(portfolio.works);
                            return (
                              worksData.skills &&
                              worksData.skills.map(
                                (skill: any, index: number) => (
                                  <Tag color="blue" key={index}>
                                    {typeof skill === "string"
                                      ? skill
                                      : skill.name}
                                  </Tag>
                                )
                              )
                            );
                          } catch (e) {
                            console.error("Error rendering skills:", e);
                            return (
                              <Text type="danger">
                                Error parsing skills data
                              </Text>
                            );
                          }
                        })()}
                    </div>
                  )}
                </Form.Item>

                {/* About Section */}
                <div>
                  <Typography.Title level={5}>
                    <Space>
                      <FaUserCheck />
                      <span>About</span>
                    </Space>
                  </Typography.Title>
                  <Divider style={{ margin: "12px 0" }} />

                  <Form.Item
                    name="description"
                    rules={[
                      { required: true, message: "Please enter a description" },
                    ]}
                  >
                    {isEditing ? (
                      <TextArea
                        placeholder="Tell clients about your background, skills, and work experience"
                        autoSize={{ minRows: 4, maxRows: 8 }}
                      />
                    ) : (
                      <Typography.Paragraph>
                        {portfolio?.about}
                      </Typography.Paragraph>
                    )}
                  </Form.Item>
                </div>

                {/* Experience Section */}
                <div>
                  <Typography.Title level={5}>
                    <Space>
                      <FaBriefcase />
                      <span>Experience</span>
                    </Space>
                  </Typography.Title>
                  <Divider style={{ margin: "12px 0" }} />

                  <Form.List name="experiences">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Card
                            key={key}
                            style={{ marginBottom: 16 }}
                            size="small"
                            extra={
                              isEditing ? (
                                <Button
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                  size="small"
                                />
                              ) : null
                            }
                          >
                            <Row gutter={[16, 16]}>
                              <Col xs={24} md={12}>
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
                                    <Input placeholder="e.g. Software Engineer" />
                                  ) : (
                                    <Typography.Text strong>
                                      {form.getFieldValue([
                                        "experiences",
                                        name,
                                        "position",
                                      ])}
                                    </Typography.Text>
                                  )}
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={12}>
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
                                    <Input placeholder="e.g. Google" />
                                  ) : (
                                    <Typography.Text>
                                      {form.getFieldValue([
                                        "experiences",
                                        name,
                                        "company",
                                      ])}
                                    </Typography.Text>
                                  )}
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "startDate"]}
                                  label="Start Date"
                                >
                                  {isEditing ? (
                                    <Input
                                      type="date"
                                      placeholder="Start Date"
                                      style={{ width: "100%" }}
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
                              <Col xs={24} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "endDate"]}
                                  label="End Date"
                                >
                                  {isEditing ? (
                                    <Input
                                      type="date"
                                      placeholder="End Date (leave empty if current)"
                                      style={{ width: "100%" }}
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
                                <TextArea
                                  placeholder="Describe your responsibilities and achievements"
                                  rows={4}
                                />
                              ) : (
                                <Typography.Paragraph>
                                  {form.getFieldValue([
                                    "experiences",
                                    name,
                                    "description",
                                  ])}
                                </Typography.Paragraph>
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
                          <Empty description="No experience added yet" />
                        )}
                      </>
                    )}
                  </Form.List>
                </div>

                {/* Certificates Section */}
                <div>
                  <Typography.Title level={5}>
                    <Space>
                      <FaGraduationCap />
                      <span>Certificates</span>
                    </Space>
                  </Typography.Title>
                  <Divider style={{ margin: "12px 0" }} />

                  <Form.List name="certificates">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Card
                            key={key}
                            style={{ marginBottom: 16 }}
                            size="small"
                            extra={
                              isEditing ? (
                                <Button
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                  size="small"
                                />
                              ) : null
                            }
                          >
                            <Row gutter={[16, 16]}>
                              <Col xs={24} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "title"]}
                                  label="Certificate Title"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter certificate title",
                                    },
                                  ]}
                                >
                                  {isEditing ? (
                                    <Input placeholder="e.g. AWS Certified Developer" />
                                  ) : (
                                    <Typography.Text strong>
                                      {form.getFieldValue([
                                        "certificates",
                                        name,
                                        "title",
                                      ])}
                                    </Typography.Text>
                                  )}
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "issueDate"]}
                                  label="Issue Date"
                                >
                                  {isEditing ? (
                                    <Input
                                      type="date"
                                      placeholder="Issue Date"
                                      style={{ width: "100%" }}
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
                                <Input placeholder="Link to certificate (optional)" />
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
                                  <Button type="link" icon={<FaCertificate />}>
                                    View Certificate
                                  </Button>
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
                          <Empty description="No certificates added yet" />
                        )}
                      </>
                    )}
                  </Form.List>
                </div>

                {/* Submit for Review Section */}
                <Divider />
                <Alert
                  message="Submit for Staff Review"
                  description="Submit your portfolio for staff review to get verified status."
                  type="info"
                  action={
                    <Button
                      type="primary"
                      onClick={handleSubmitForReview}
                      disabled={isEditing || portfolio.status === 3}
                      icon={<CheckOutlined />}
                    >
                      Submit for Review
                    </Button>
                  }
                  showIcon
                />
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <VerificationStatus />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Portfolio;
