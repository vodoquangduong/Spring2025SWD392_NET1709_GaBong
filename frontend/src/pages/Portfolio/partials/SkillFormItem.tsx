import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Form,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { FaCertificate } from "react-icons/fa";
import { SkillFormItemProps } from "../models/types";
import { skillService } from "../services/skillService";
import SkillLevelSelect from "./SkillLevelSelect";

const SkillFormItem: React.FC<SkillFormItemProps> = ({ isEditing }) => {
  const [skillOptions, setSkillOptions] = useState<
    { value: number; label: string; id: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const form = Form.useFormInstance(); // Get form instance correctly

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

  return (
    <>
      <Typography.Title level={5}>
        <Space>
          <FaCertificate />
          <span>Skills</span>
        </Space>
      </Typography.Title>
      <Divider style={{ margin: "12px 0" }} />

      <Form.List name="skillPerforms">
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
                      name={[name, "skillId"]}
                      label="Skill"
                      rules={[
                        { required: true, message: "Please select a skill" },
                      ]}
                    >
                      {isEditing ? (
                        <Select
                          placeholder={
                            loading ? "Loading skills..." : "Select a skill"
                          }
                          style={{ width: "100%" }}
                          options={skillOptions}
                          loading={loading}
                          className="bg-white dark:bg-[#27272a]"
                        />
                      ) : (
                        <div>
                          {(() => {
                            // Get form values directly without hooks
                            const formValues = form.getFieldsValue();
                            const skillId =
                              formValues.skillPerforms?.[name]?.skillId;
                            const skillName = skillOptions.find(
                              (s) => s.value === skillId
                            )?.label;

                            return skillName ? (
                              <Tag color="blue">{skillName}</Tag>
                            ) : (
                              <Typography.Text type="secondary">
                                Loading skill...
                              </Typography.Text>
                            );
                          })()}
                        </div>
                      )}
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    {isEditing ? (
                      <SkillLevelSelect name={[name, "level"]} />
                    ) : (
                      <Form.Item label="Level">
                        <Typography.Text>
                          {(() => {
                            // Get form values directly without hooks
                            const formValues = form.getFieldsValue();
                            const level =
                              formValues.skillPerforms?.[name]?.level;
                            const levelName =
                              skillService.getSkillLevelName(level);

                            return (
                              <Tag
                                color={
                                  level === 0
                                    ? "green"
                                    : level === 1
                                    ? "blue"
                                    : level === 2
                                    ? "purple"
                                    : "default"
                                }
                              >
                                {levelName}
                              </Tag>
                            );
                          })()}
                        </Typography.Text>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </Card>
            ))}

            {isEditing && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ skillId: undefined, level: undefined })}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Skill
                </Button>
              </Form.Item>
            )}

            {!isEditing && fields.length === 0 && (
              <Empty description="No skills added yet" />
            )}
          </>
        )}
      </Form.List>
    </>
  );
};

export default SkillFormItem;
