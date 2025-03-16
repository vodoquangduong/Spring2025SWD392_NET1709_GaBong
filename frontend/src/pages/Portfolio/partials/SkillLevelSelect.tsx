import { Form, Select, Space, Tag } from "antd";
import React from "react";
import { SkillLevelSelectProps } from "../models/types";
import { skillService } from "../services/skillService";

const SkillLevelSelect: React.FC<SkillLevelSelectProps> = ({
  name,
  label = "Skill Level",
  required = true,
}) => {
  const levelOptions = skillService.getSkillLevelOptions();

  const tagRender = (props: any) => {
    const { label, value, closable, onClose } = props;
    const color = skillService.getSkillLevelColor(value);

    return (
      <Tag
        color={color}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={
        required
          ? [{ required: true, message: "Please select a skill level" }]
          : undefined
      }
    >
      <Select
        placeholder="Select level"
        options={levelOptions}
        className="bg-white dark:bg-[#27272a]"
        tagRender={tagRender}
        optionLabelProp="label"
        optionRender={(option) => (
          <Space>
            <Tag
              color={skillService.getSkillLevelColor(option.value as number)}
            >
              {option.label}
            </Tag>
          </Space>
        )}
      />
    </Form.Item>
  );
};

export default SkillLevelSelect;
