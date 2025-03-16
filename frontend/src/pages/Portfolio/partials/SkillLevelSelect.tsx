import { Form, Select } from "antd";
import React from "react";
import { SkillLevelSelectProps } from "../models/types";
import { skillService } from "../services/skillService";

const SkillLevelSelect: React.FC<SkillLevelSelectProps> = ({
  name,
  label = "Skill Level",
  required = true,
}) => {
  const levelOptions = skillService.getSkillLevelOptions();

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
      />
    </Form.Item>
  );
};

export default SkillLevelSelect;
