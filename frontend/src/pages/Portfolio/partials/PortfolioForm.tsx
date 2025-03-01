import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import { FormInstance } from "antd/lib/form";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCertificate,
  FaGraduationCap,
  FaUserCheck,
} from "react-icons/fa";
import { PortfolioDTO } from "../models/types";
import { skillService } from "../services/skillService";
import PortfolioTips from "./PortfolioTips";
import VerificationStatus from "./VerificationStatus";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface PortfolioFormProps {
  form: FormInstance;
  isEditing: boolean;
  submitting: boolean;
  portfolio: PortfolioDTO | null;
  handleSave: () => Promise<void>;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSubmitForReview: () => Promise<void>;
  handleSubmit: (values: any) => Promise<void>;
  id?: string;
  accountId?: number;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  form,
  isEditing,
  submitting,
  portfolio,
  handleSave,
  handleEdit,
  handleCancel,
  handleSubmitForReview,
  handleSubmit,
  id,
  accountId,
}) => {
  // State để lưu trữ danh sách skills từ API
  const [skillOptions, setSkillOptions] = useState<
    { value: string; label: string; id: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch skills từ API khi component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const skills = await skillService.getSkills();
        const options = skillService.mapSkillsToOptions(skills);
        setSkillOptions(options);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Nếu không có portfolio nhưng đang ở chế độ chỉnh sửa, hiển thị form trống
  if (!portfolio && isEditing) {
    return (
      <div className="container">
        <div className="p-8">
          <Typography.Title level={2}>Create Your Portfolio</Typography.Title>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={24}>
            <Col xs={24} md={18}>
              <Card
                extra={
                  <Space>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleSave}
                      loading={submitting}
                    >
                      Save
                    </Button>
                  </Space>
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
                    <Input
                      placeholder="Enter your professional title"
                      maxLength={20}
                    />
                  </Form.Item>

                  {/* Skills Section - Updated to use API data */}
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
                    <Select
                      mode="multiple"
                      placeholder={
                        loading ? "Loading skills..." : "Select your skills"
                      }
                      style={{ width: "100%" }}
                      options={skillOptions}
                      loading={loading}
                    />
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
                        {
                          required: true,
                          message: "Please enter a description",
                        },
                        {
                          max: 100,
                          message: "About must be less than 100 characters",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Tell clients about your background, skills, and work experience"
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        maxLength={100}
                      />
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
                                <Button
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                  size="small"
                                />
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
                                    <Input placeholder="e.g. Software Engineer" />
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
                                    <Input placeholder="e.g. Google" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "startDate"]}
                                    label="Start Date"
                                  >
                                    <Input
                                      type="date"
                                      placeholder="Start Date"
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "endDate"]}
                                    label="End Date"
                                  >
                                    <Input
                                      type="date"
                                      placeholder="End Date (leave empty if current)"
                                      style={{ width: "100%" }}
                                    />
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
                                <TextArea
                                  placeholder="Describe your responsibilities and achievements"
                                  rows={4}
                                />
                              </Form.Item>
                            </Card>
                          ))}

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
                                <Button
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                  size="small"
                                />
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
                                        message:
                                          "Please enter certificate title",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="e.g. AWS Certified Developer" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "issueDate"]}
                                    label="Issue Date"
                                  >
                                    <Input
                                      type="date"
                                      placeholder="Issue Date"
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Form.Item
                                {...restField}
                                name={[name, "url"]}
                                label="Certificate URL"
                              >
                                <Input placeholder="Link to certificate (optional)" />
                              </Form.Item>
                            </Card>
                          ))}

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
                        </>
                      )}
                    </Form.List>
                  </div>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <PortfolioTips />
            </Col>
          </Row>
        </Form>
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

                {/* Skills Section - Updated to use API data */}
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
                      placeholder={
                        loading ? "Loading skills..." : "Select your skills"
                      }
                      style={{ width: "100%" }}
                      options={skillOptions}
                      loading={loading}
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
                      disabled={
                        isEditing ||
                        (portfolio ? Number(portfolio.status) === 3 : false)
                      }
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

export default PortfolioForm;
