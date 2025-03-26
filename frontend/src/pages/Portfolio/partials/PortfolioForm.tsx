import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { FormInstance } from "antd/lib/form";
import { useState } from "react";
import {
  FaBriefcase,
  FaCertificate,
  FaGraduationCap,
  FaUserCheck,
} from "react-icons/fa";
import { PortfolioDTO } from "../models/types";
import PortfolioTips from "./PortfolioTips";
import SkillFormItem from "./SkillFormItem";
import VerificationStatus from "./VerificationStatus";

// Import PortfolioStatus enum
enum PortfolioStatus {
  Pending = 0,
  Verified = 1,
  Rejected = 2,
  Modifying = 3,
}

const { Text } = Typography;
const { TextArea } = Input;

interface PortfolioFormProps {
  form: FormInstance;
  isEditing: boolean;
  submitting: boolean;
  submittingForVerification: boolean;
  portfolio: PortfolioDTO | null;
  handleSave: () => Promise<void>;
  handleEdit: () => void;
  handleCancel: () => void;
  handleSubmitForReview: () => Promise<void>;
  handleSubmit: (values: any) => Promise<void>;
  id?: string;
  accountId?: number;
}

// Update the date validation functions to work with month-year format
const isPastDate = (date: string | null | undefined): boolean => {
  if (!date) return true;

  // Format is YYYY-MM for month input
  const [year, month] = date.split("-").map(Number);
  const selectedDate = new Date(year, month - 1); // month is 0-indexed in JS Date

  const today = new Date();
  today.setDate(1); // Set to first day of month
  today.setHours(0, 0, 0, 0);

  return selectedDate <= today;
};

const isStartBeforeEnd = (
  startDate: string | null | undefined,
  endDate: string | null | undefined
): boolean => {
  if (!startDate || !endDate) return true;

  const [startYear, startMonth] = startDate.split("-").map(Number);
  const [endYear, endMonth] = endDate.split("-").map(Number);

  const start = new Date(startYear, startMonth - 1);
  const end = new Date(endYear, endMonth - 1);

  return start <= end;
};

// Helper to format month-year date for display
const formatMonthYear = (dateString: string): string => {
  if (!dateString) return "";
  const [year, month] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long" });
};

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  form,
  isEditing,
  submitting,
  submittingForVerification,
  portfolio,
  handleSave,
  handleEdit,
  handleCancel,
  handleSubmitForReview,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  console.log("Portfolio in PortfolioForm:", portfolio);
  console.log("Portfolio status:", portfolio?.status);
  console.log("isEditing:", isEditing);

  const getCurrentStatus = () => {
    if (!portfolio) return PortfolioStatus.Modifying;
    return portfolio.status !== undefined
      ? portfolio.status
      : PortfolioStatus.Modifying;
  };

  const currentStatus = getCurrentStatus();
  console.log("Current status:", currentStatus);
  console.log("Is Modifying:", currentStatus === PortfolioStatus.Modifying);

  const canEdit = () => {
    return (
      currentStatus === PortfolioStatus.Modifying ||
      currentStatus === PortfolioStatus.Rejected
    );
  };

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
                className="bg-white dark:bg-[#27272a]"
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
                        max: 50,
                        message: "Title must be less than 50 characters",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your professional title"
                      maxLength={50}
                      className="bg-white dark:bg-[#27272a]"
                    />
                  </Form.Item>

                  {/* Replace the old Skills Section with SkillFormItem */}
                  <SkillFormItem isEditing={true} />

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
                          max: 500,
                          message: "About must be less than 500 characters",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Tell clients about your background, skills, and work experience"
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        maxLength={500}
                        className="bg-white dark:bg-[#27272a]"
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
                              className="bg-white dark:bg-[#27272a]"
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
                                    <Input
                                      placeholder="e.g. Software Engineer"
                                      className="bg-white dark:bg-[#27272a]"
                                    />
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
                                    <Input
                                      placeholder="e.g. Google"
                                      className="bg-white dark:bg-[#27272a]"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "startDate"]}
                                    label="Start Date"
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select start date",
                                      },
                                      {
                                        validator: (_, value) => {
                                          if (!value) return Promise.resolve();
                                          if (!isPastDate(value)) {
                                            return Promise.reject(
                                              new Error(
                                                "Start date must be in the past"
                                              )
                                            );
                                          }

                                          // Kiểm tra start date < end date
                                          const endDate = form.getFieldValue([
                                            "experiences",
                                            name,
                                            "endDate",
                                          ]);
                                          if (
                                            endDate &&
                                            !isStartBeforeEnd(value, endDate)
                                          ) {
                                            return Promise.reject(
                                              new Error(
                                                "Start date must be before end date"
                                              )
                                            );
                                          }

                                          return Promise.resolve();
                                        },
                                      },
                                    ]}
                                  >
                                    {isEditing ? (
                                      <Input
                                        type="month"
                                        placeholder="Start Date"
                                        style={{ width: "100%" }}
                                        className="bg-white dark:bg-[#27272a]"
                                        max={new Date()
                                          .toISOString()
                                          .split("-")
                                          .slice(0, 2)
                                          .join("-")}
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "experiences",
                                          name,
                                          "startDate",
                                        ]) &&
                                          formatMonthYear(
                                            form.getFieldValue([
                                              "experiences",
                                              name,
                                              "startDate",
                                            ])
                                          )}
                                      </div>
                                    )}
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "endDate"]}
                                    label="End Date"
                                    rules={[
                                      {
                                        validator: (_, value) => {
                                          if (!value) return Promise.resolve(); // Cho phép trống (vì có thể là vị trí hiện tại)

                                          if (!isPastDate(value)) {
                                            return Promise.reject(
                                              new Error(
                                                "End date must be in the past"
                                              )
                                            );
                                          }

                                          // Kiểm tra start date < end date
                                          const startDate = form.getFieldValue([
                                            "experiences",
                                            name,
                                            "startDate",
                                          ]);
                                          if (
                                            startDate &&
                                            !isStartBeforeEnd(startDate, value)
                                          ) {
                                            return Promise.reject(
                                              new Error(
                                                "End date must be after start date"
                                              )
                                            );
                                          }

                                          return Promise.resolve();
                                        },
                                      },
                                    ]}
                                  >
                                    {isEditing ? (
                                      <Input
                                        type="month"
                                        placeholder="End Date (leave empty if current)"
                                        style={{ width: "100%" }}
                                        className="bg-white dark:bg-[#27272a]"
                                        max={new Date()
                                          .toISOString()
                                          .split("-")
                                          .slice(0, 2)
                                          .join("-")}
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "experiences",
                                          name,
                                          "endDate",
                                        ])
                                          ? formatMonthYear(
                                              form.getFieldValue([
                                                "experiences",
                                                name,
                                                "endDate",
                                              ])
                                            )
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
                                <TextArea
                                  placeholder="Describe your responsibilities and achievements"
                                  rows={4}
                                  className="bg-white dark:bg-[#27272a]"
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
                              className="bg-white dark:bg-[#27272a]"
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
                                    <Input
                                      placeholder="e.g. AWS Certified Developer"
                                      className="bg-white dark:bg-[#27272a]"
                                    />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "issueDate"]}
                                    label="Issue Date"
                                    rules={[
                                      {
                                        validator: (_, value) => {
                                          if (!value) return Promise.resolve();
                                          if (!isPastDate(value)) {
                                            return Promise.reject(
                                              new Error(
                                                "Issue date must be in the past"
                                              )
                                            );
                                          }
                                          return Promise.resolve();
                                        },
                                      },
                                    ]}
                                  >
                                    {isEditing ? (
                                      <Input
                                        type="month"
                                        placeholder="Issue Date"
                                        style={{ width: "100%" }}
                                        className="bg-white dark:bg-[#27272a]"
                                        max={new Date()
                                          .toISOString()
                                          .split("-")
                                          .slice(0, 2)
                                          .join("-")}
                                      />
                                    ) : (
                                      <div>
                                        {form.getFieldValue([
                                          "certificates",
                                          name,
                                          "issueDate",
                                        ]) &&
                                          formatMonthYear(
                                            form.getFieldValue([
                                              "certificates",
                                              name,
                                              "issueDate",
                                            ])
                                          )}
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
                                <Input
                                  placeholder="Link to certificate (optional)"
                                  className="bg-white dark:bg-[#27272a]"
                                />
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
    <div className="container mx-auto">
      <div className="p-5">
        <Typography.Title level={1}>Portfolio</Typography.Title>
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
                  canEdit() && (
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                  )
                )
              }
              className="bg-white dark:bg-[#27272a]"
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
                      max: 50,
                      message: "Title must be less than 50 characters",
                    },
                  ]}
                >
                  {isEditing ? (
                    <Input
                      placeholder="Enter your professional title"
                      maxLength={50}
                      className="bg-white dark:bg-[#27272a]"
                    />
                  ) : (
                    <Typography.Title level={4}>
                      {portfolio?.title}
                    </Typography.Title>
                  )}
                </Form.Item>

                {/* Replace the old Skills Section with SkillFormItem */}
                <SkillFormItem isEditing={isEditing} />

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
                        className="bg-white dark:bg-[#27272a]"
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
                            className="bg-white dark:bg-[#27272a]"
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
                                    <Input
                                      placeholder="e.g. Software Engineer"
                                      className="bg-white dark:bg-[#27272a]"
                                    />
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
                                    <Input
                                      placeholder="e.g. Google"
                                      className="bg-white dark:bg-[#27272a]"
                                    />
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
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select start date",
                                    },
                                    {
                                      validator: (_, value) => {
                                        if (!value) return Promise.resolve();
                                        if (!isPastDate(value)) {
                                          return Promise.reject(
                                            new Error(
                                              "Start date must be in the past"
                                            )
                                          );
                                        }

                                        const endDate = form.getFieldValue([
                                          "experiences",
                                          name,
                                          "endDate",
                                        ]);
                                        if (
                                          endDate &&
                                          !isStartBeforeEnd(value, endDate)
                                        ) {
                                          return Promise.reject(
                                            new Error(
                                              "Start date must be before end date"
                                            )
                                          );
                                        }

                                        return Promise.resolve();
                                      },
                                    },
                                  ]}
                                >
                                  {isEditing ? (
                                    <Input
                                      type="month"
                                      placeholder="Start Date"
                                      style={{ width: "100%" }}
                                      className="bg-white dark:bg-[#27272a]"
                                      max={new Date()
                                        .toISOString()
                                        .split("-")
                                        .slice(0, 2)
                                        .join("-")}
                                    />
                                  ) : (
                                    <div>
                                      {form.getFieldValue([
                                        "experiences",
                                        name,
                                        "startDate",
                                      ]) &&
                                        formatMonthYear(
                                          form.getFieldValue([
                                            "experiences",
                                            name,
                                            "startDate",
                                          ])
                                        )}
                                    </div>
                                  )}
                                </Form.Item>
                              </Col>
                              <Col xs={24} md={12}>
                                <Form.Item
                                  {...restField}
                                  name={[name, "endDate"]}
                                  label="End Date"
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        if (!value) return Promise.resolve(); // Cho phép trống (vì có thể là vị trí hiện tại)

                                        if (!isPastDate(value)) {
                                          return Promise.reject(
                                            new Error(
                                              "End date must be in the past"
                                            )
                                          );
                                        }

                                        // Kiểm tra start date < end date
                                        const startDate = form.getFieldValue([
                                          "experiences",
                                          name,
                                          "startDate",
                                        ]);
                                        if (
                                          startDate &&
                                          !isStartBeforeEnd(startDate, value)
                                        ) {
                                          return Promise.reject(
                                            new Error(
                                              "End date must be after start date"
                                            )
                                          );
                                        }

                                        return Promise.resolve();
                                      },
                                    },
                                  ]}
                                >
                                  {isEditing ? (
                                    <Input
                                      type="month"
                                      placeholder="End Date (leave empty if current)"
                                      style={{ width: "100%" }}
                                      className="bg-white dark:bg-[#27272a]"
                                      max={new Date()
                                        .toISOString()
                                        .split("-")
                                        .slice(0, 2)
                                        .join("-")}
                                    />
                                  ) : (
                                    <div>
                                      {form.getFieldValue([
                                        "experiences",
                                        name,
                                        "endDate",
                                      ])
                                        ? formatMonthYear(
                                            form.getFieldValue([
                                              "experiences",
                                              name,
                                              "endDate",
                                            ])
                                          )
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
                                  className="bg-white dark:bg-[#27272a]"
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
                            className="bg-white dark:bg-[#27272a]"
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
                                    <Input
                                      placeholder="e.g. AWS Certified Developer"
                                      className="bg-white dark:bg-[#27272a]"
                                    />
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
                                  rules={[
                                    {
                                      validator: (_, value) => {
                                        if (!value) return Promise.resolve();
                                        if (!isPastDate(value)) {
                                          return Promise.reject(
                                            new Error(
                                              "Issue date must be in the past"
                                            )
                                          );
                                        }
                                        return Promise.resolve();
                                      },
                                    },
                                  ]}
                                >
                                  {isEditing ? (
                                    <Input
                                      type="month"
                                      placeholder="Issue Date"
                                      style={{ width: "100%" }}
                                      className="bg-white dark:bg-[#27272a]"
                                      max={new Date()
                                        .toISOString()
                                        .split("-")
                                        .slice(0, 2)
                                        .join("-")} // Giới hạn ngày tối đa là ngày hiện tại
                                    />
                                  ) : (
                                    <div>
                                      {form.getFieldValue([
                                        "certificates",
                                        name,
                                        "issueDate",
                                      ]) &&
                                        formatMonthYear(
                                          form.getFieldValue([
                                            "certificates",
                                            name,
                                            "issueDate",
                                          ])
                                        )}
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
                                  className="bg-white dark:bg-[#27272a]"
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
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={6}>
            <VerificationStatus portfolio={portfolio} />

            {/* Submit for Review Section */}
            {portfolio && (
              <div style={{ marginTop: 16 }}>
                <Card className="bg-[#f0f5ff] border-[#d6e4ff] dark:bg-[#111827] dark:border-[#111827]">
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <Typography.Title
                        level={5}
                        style={{ margin: 0 }}
                        className="text-[#1890ff] dark:text-white"
                      >
                        Submit for Verification
                      </Typography.Title>
                      <Typography.Paragraph className="text-gray-600 dark:text-gray-300">
                        {currentStatus === PortfolioStatus.Rejected
                          ? "Your portfolio has been rejected. Please revise and resubmit for verification."
                          : currentStatus === PortfolioStatus.Pending
                          ? "Portfolio is being verified. Please wait for verification."
                          : "Submit your portfolio for staff review to get verified status."}
                      </Typography.Paragraph>
                    </div>

                    <Button
                      type="primary"
                      onClick={handleSubmitForReview}
                      disabled={
                        isEditing ||
                        (currentStatus !== PortfolioStatus.Modifying &&
                          currentStatus !== PortfolioStatus.Rejected) ||
                        submittingForVerification
                      }
                      icon={<CheckOutlined />}
                      loading={submittingForVerification}
                      block
                      className="bg-[#10b981] hover:bg-[#0d9668] border-[#10b981]"
                    >
                      {currentStatus === PortfolioStatus.Rejected
                        ? "Resubmit for Verification"
                        : "Submit for Verification"}
                    </Button>
                  </Space>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PortfolioForm;
