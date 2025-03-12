import { Button, Card, Divider, Form, message, Tooltip } from "antd";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

// Import types
import { mockSettings } from "./models/mockSettings";

// Import partial components
import ConfigHeader from "./partials/ConfigHeader";
import ConfigTabs from "./partials/ConfigTabs";

const SystemConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async (values: any) => {
    setLoading(true);

    // Simulate API call
    try {
      console.log("Saving settings:", values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("System settings saved successfully");
      setLoading(false);
    } catch (error) {
      message.error("Failed to save settings");
      setLoading(false);
    }
  };

  // Initialize form with mock settings
  React.useEffect(() => {
    const initialValues: Record<string, any> = {};
    mockSettings.forEach((setting) => {
      initialValues[setting.key] = setting.value;
    });
    form.setFieldsValue(initialValues);
  }, [form]);

  return (
    <div className="pb-6">
      <Card className="">
        <ConfigHeader />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          size="middle"
          className="w-full"
        >
          <ConfigTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <Divider className="my-8" />

          <div className="flex justify-end">
            <Tooltip title="Save all configuration changes">
              <Button
                type="primary"
                icon={<FaSave className="mr-2" />}
                loading={loading}
                htmlType="submit"
                size="large"
                className="flex items-center px-6 h-10 font-medium hover:opacity-90 hover:shadow-md transition-all"
              >
                Save Settings
              </Button>
            </Tooltip>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SystemConfiguration;
