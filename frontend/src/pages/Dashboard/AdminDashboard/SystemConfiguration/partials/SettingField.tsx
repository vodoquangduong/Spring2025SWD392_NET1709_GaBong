import { Button, Form, Input, InputNumber, Select, Switch, Upload } from "antd";
import React from "react";
import { FaUpload } from "react-icons/fa";
import { SystemSetting } from "../models/mockSettings";

const { Option } = Select;

interface SettingFieldProps {
  setting: SystemSetting;
}

const SettingField: React.FC<SettingFieldProps> = ({ setting }) => {
  switch (setting.type) {
    case "text":
      return (
        <Form.Item
          name={setting.key}
          label={setting.name}
          tooltip={setting.description}
          rules={[{ required: true, message: `${setting.name} is required` }]}
        >
          <Input className="rounded-md" />
        </Form.Item>
      );

    case "textarea":
      return (
        <Form.Item
          name={setting.key}
          label={setting.name}
          tooltip={setting.description}
          rules={[{ required: true, message: `${setting.name} is required` }]}
        >
          <Input.TextArea rows={4} className="rounded-md" />
        </Form.Item>
      );

    case "number":
      return (
        <Form.Item
          name={setting.key}
          label={setting.name}
          tooltip={setting.description}
          rules={[{ required: true, message: `${setting.name} is required` }]}
        >
          <InputNumber className="w-full rounded-md" />
        </Form.Item>
      );

    case "boolean":
      return (
        <Form.Item
          name={setting.key}
          label={setting.name}
          tooltip={setting.description}
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      );

    case "select":
      return (
        <Form.Item
          name={setting.key}
          label={setting.name}
          tooltip={setting.description}
          rules={[{ required: true, message: `${setting.name} is required` }]}
        >
          <Select className="rounded-md">
            {setting.options?.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );

    case "upload":
      return (
        <Form.Item
          name={setting.key}
          label={setting.name}
          tooltip={setting.description}
        >
          <Upload
            name="file"
            action="/api/upload"
            listType="picture"
            maxCount={1}
            showUploadList={true}
          >
            <Button
              icon={<FaUpload className="mr-2" />}
              className="flex items-center"
            >
              Upload
            </Button>
          </Upload>
        </Form.Item>
      );

    default:
      return null;
  }
};

export default SettingField;
