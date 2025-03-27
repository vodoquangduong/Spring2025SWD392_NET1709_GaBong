import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EditOutlined,
  LockOutlined,
  PercentageOutlined,
  SaveOutlined,
  TrophyOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { SystemConfig } from "./models/SystemConfig";
import { systemConfigurationService } from "./services/systemConfigurationService";

const { Title, Text } = Typography;
const { confirm } = Modal;

const SystemConfiguration: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [config, setConfig] = useState<SystemConfig | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const data = await systemConfigurationService.getConfig();
      setConfig(data);
      form.setFieldsValue(data);
    } catch (error: any) {
      message.error(error.message || "Failed to fetch configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    form.setFieldsValue(config);
  };

  const showConfirmModal = () => {
    confirm({
      title: "Confirm System Configuration Update",
      icon: <WarningOutlined style={{ color: "#faad14" }} />,
      content: (
        <div>
          <p>You are about to update critical system settings that affect:</p>
          <ul>
            <li>Payment policies for all transactions</li>
            <li>Reputation scoring system</li>
            <li>User experience across the platform</li>
          </ul>
          <p>Are you sure you want to proceed?</p>
        </div>
      ),
      okText: "Yes, Update Configuration",
      cancelText: "Cancel",
      okType: "primary",
      okButtonProps: {
        className: "bg-orange-500 hover:bg-orange-600 border-orange-500",
      },
      onOk: handleSave,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await systemConfigurationService.updateConfig(values);
      setConfig(values);
      setIsEditMode(false);
      message.success("System configuration updated successfully");
    } catch (error: any) {
      message.error(error.message || "Failed to update configuration");
    } finally {
      setLoading(false);
    }
  };

  const renderReadOnlyValue = (value: number, suffix: string) => (
    <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
      <Text strong className="text-lg">
        {value}
      </Text>
      <Tag color="blue" className="ml-2">
        {suffix}
      </Tag>
    </div>
  );

  return (
    <div className="p-6">
      <Card
        className="shadow-lg"
        title={
          <div className="flex justify-between items-center">
            <Space>
              <Title level={3} className="!m-0">
                System Configuration
              </Title>
              <Tooltip title="System settings affect all users and transactions">
                <LockOutlined className="text-gray-400 text-xl" />
              </Tooltip>
            </Space>
            {!isEditMode ? (
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
                className="flex items-center bg-green-500 hover:bg-green-600"
                size="large"
              >
                Edit Configuration
              </Button>
            ) : (
              <Space>
                <Button onClick={handleCancel} size="large">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={showConfirmModal}
                  loading={loading}
                  className="flex items-center"
                  size="large"
                >
                  Save Changes
                </Button>
              </Space>
            )}
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          disabled={!isEditMode || loading}
          className="mt-4"
        >
          <Card
            className="mb-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            title={
              <div className="flex items-center gap-2">
                <DollarOutlined className="text-blue-500 text-xl" />
                <Title level={4} className="!m-0">
                  Payment Policy
                </Title>
              </div>
            }
          >
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <PercentageOutlined className="text-green-500" />
                      <Text strong>Project Fee (% per project)</Text>
                    </Space>
                  }
                  name={["paymentPolicy", "projectFee"]}
                  rules={[
                    { required: true, message: "Please input project fee!" },
                  ]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue(["paymentPolicy", "projectFee"]) *
                        100 || 0,
                      "% per project"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="rounded-lg text-lg"
                      suffix="% per project"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <DollarOutlined className="text-green-500" />
                      <Text strong>Bid Fee ($)</Text>
                    </Space>
                  }
                  name={["paymentPolicy", "bidFee"]}
                  rules={[{ required: true, message: "Please input bid fee!" }]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue(["paymentPolicy", "bidFee"]) || 0,
                      "$"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      className="rounded-lg text-lg"
                      prefix="$"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <PercentageOutlined className="text-green-500" />
                      <Text strong>Withdrawal Fee (% per transaction)</Text>
                    </Space>
                  }
                  name={["paymentPolicy", "withdrawalFee"]}
                  rules={[
                    { required: true, message: "Please input withdrawal fee!" },
                  ]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue(["paymentPolicy", "withdrawalFee"]) *
                        100 || 0,
                      "% per transaction"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="rounded-lg text-lg"
                      suffix="% per transaction"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            title={
              <div className="flex items-center gap-2">
                <TrophyOutlined className="text-yellow-500 text-xl" />
                <Title level={4} className="!m-0">
                  Reputation Policy
                </Title>
              </div>
            }
          >
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <ClockCircleOutlined className="text-blue-500" />
                      <Text strong>Before Deadline Points</Text>
                    </Space>
                  }
                  name={["reputationPolicy", "beforeDeadline"]}
                  rules={[{ required: true, message: "Please input points!" }]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue([
                        "reputationPolicy",
                        "beforeDeadline",
                      ]) || 0,
                      "pts"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      className="rounded-lg text-lg"
                      suffix="pts"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <CheckCircleOutlined className="text-green-500" />
                      <Text strong>Right Deadline Points</Text>
                    </Space>
                  }
                  name={["reputationPolicy", "rightDeadline"]}
                  rules={[{ required: true, message: "Please input points!" }]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue([
                        "reputationPolicy",
                        "rightDeadline",
                      ]) || 0,
                      "pts"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      className="rounded-lg text-lg"
                      suffix="pts"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <ClockCircleOutlined className="text-orange-500" />
                      <Text strong>Early/Late Deadline Points</Text>
                    </Space>
                  }
                  name={["reputationPolicy", "earlylateDeadline"]}
                  rules={[{ required: true, message: "Please input points!" }]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue([
                        "reputationPolicy",
                        "earlylateDeadline",
                      ]) || 0,
                      "pts"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      className="rounded-lg text-lg"
                      suffix="pts"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <ClockCircleOutlined className="text-red-500" />
                      <Text strong>Late Deadline Points</Text>
                    </Space>
                  }
                  name={["reputationPolicy", "lateDeadline"]}
                  rules={[{ required: true, message: "Please input points!" }]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue([
                        "reputationPolicy",
                        "lateDeadline",
                      ]) || 0,
                      "pts"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      className="rounded-lg text-lg"
                      suffix="pts"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={
                    <Space>
                      <TrophyOutlined className="text-yellow-500" />
                      <Text strong>Complete Project Points</Text>
                    </Space>
                  }
                  name={["reputationPolicy", "completeProject"]}
                  rules={[{ required: true, message: "Please input points!" }]}
                >
                  {!isEditMode ? (
                    renderReadOnlyValue(
                      form.getFieldValue([
                        "reputationPolicy",
                        "completeProject",
                      ]) || 0,
                      "pts"
                    )
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      className="rounded-lg text-lg"
                      suffix="pts"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </Card>
    </div>
  );
};

export default SystemConfiguration;
