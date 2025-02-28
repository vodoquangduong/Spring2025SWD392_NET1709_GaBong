import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Timeline, Typography } from "antd";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ExperienceProps {
  isEditing?: boolean;
}

// Mockup data - sử dụng trực tiếp cho hiển thị
const mockExperiences = [
  {
    title: "Financial Planning & Analysis Accountant",
    company: "Almarai Company",
    startDate: "March 2013",
    endDate: "February 2016",
    description:
      "Responsible for the production of weekly Flash Financial Statements, monthly Rolling Forecasts, annual Budget and Five Year Plan of the company. Manages profitability of company's subsidiaries thru transfer pricing. Lead major systems implementation, i.e., SAP BPC 7.5, SAP BPC 10.0 and SAP S&OP.",
  },
  {
    title: "Senior Accountant",
    company: "Tech Solutions Inc",
    startDate: "June 2010",
    endDate: "February 2013",
    description:
      "Led a team of 5 accountants in managing financial operations. Implemented new accounting software that improved efficiency by 30%.",
  },
];

const Experience: React.FC<ExperienceProps> = ({ isEditing = false }) => {
  return (
    <div>
      {isEditing ? (
        // Chế độ Edit - Sử dụng Form.List
        <Form.List name="experiences" initialValue={mockExperiences}>
          {(fields, { add, remove }) => (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              {fields.map((field) => (
                <Card key={field.key}>
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Form.Item
                      {...field}
                      name={[field.name, "title"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input position title!",
                        },
                      ]}
                    >
                      <Input placeholder="Position Title" />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, "company"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input company name!",
                        },
                      ]}
                    >
                      <Input placeholder="Company Name" />
                    </Form.Item>

                    <Space>
                      <Form.Item
                        {...field}
                        name={[field.name, "startDate"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input start date!",
                          },
                        ]}
                      >
                        <Input placeholder="Start Date (e.g., March 2023)" />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, "endDate"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input end date!",
                          },
                        ]}
                      >
                        <Input placeholder="End Date (e.g., Present)" />
                      </Form.Item>
                    </Space>

                    <Form.Item
                      {...field}
                      name={[field.name, "description"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input job description!",
                        },
                      ]}
                    >
                      <TextArea
                        placeholder="Job Description"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                      />
                    </Form.Item>

                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                    >
                      Remove
                    </Button>
                  </Space>
                </Card>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Experience
              </Button>
            </Space>
          )}
        </Form.List>
      ) : (
        // Chế độ View - Sử dụng mockExperiences trực tiếp với theme mặc định
        <Timeline
          items={mockExperiences.map((experience, index) => ({
            children: (
              <Space direction="vertical" key={index}>
                <Title level={5} style={{ margin: 0 }}>
                  {experience.title} | {experience.company}
                </Title>
                <Text type="secondary">
                  {experience.startDate} - {experience.endDate}
                </Text>
                <Text>{experience.description}</Text>
              </Space>
            ),
          }))}
        />
      )}
    </div>
  );
};

export default Experience;
