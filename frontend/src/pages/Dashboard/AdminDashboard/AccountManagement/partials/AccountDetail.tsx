import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Timeline,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  FaBan,
  FaBirthdayCake,
  FaCalendarAlt,
  FaCheck,
  FaDollarSign,
  FaEnvelope,
  FaFlag,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Account, Activity, Transaction } from "../models/types";
import { accountMngUsecase } from "../usecases/accountMngUsecase";

const { Title, Text } = Typography;

// Mock transaction history data - these could be from another API endpoint in the future
const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "Deposit",
    amount: 1000,
    date: "2023-05-10",
    status: "Completed",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: -500,
    date: "2023-05-15",
    status: "Completed",
  },
  {
    id: 3,
    type: "Project Payment",
    amount: -250,
    date: "2023-05-20",
    status: "Completed",
  },
  {
    id: 4,
    type: "Earnings",
    amount: 750,
    date: "2023-05-25",
    status: "Completed",
  },
];

// Mock activity data - these could be from another API endpoint in the future
const mockActivities: Activity[] = [
  {
    id: 1,
    action: "Login",
    timestamp: "2023-05-28 14:30:22",
    ip: "192.168.1.1",
    device: "Chrome / Windows",
  },
  {
    id: 2,
    action: "Password Changed",
    timestamp: "2023-05-25 10:15:45",
    ip: "192.168.1.1",
    device: "Chrome / Windows",
  },
  {
    id: 3,
    action: "Profile Updated",
    timestamp: "2023-05-20 09:45:12",
    ip: "192.168.1.1",
    device: "Chrome / Windows",
  },
];

const AccountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const accountId = id ? parseInt(id) : 0;
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);
  const [resetPasswordForm] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm] = Form.useForm();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (!accountId) return;

      setLoading(true);
      try {
        const data = await accountMngUsecase.getAccountById(accountId);
        setAccount(data);

        if (data) {
          editForm.setFieldsValue({
            name: data.name,
            phone: data.phone,
            address: data.address,
            birthday: data.birthday,
            nationality: data.nationality,
            gender: data.gender,
          });
        }
      } catch (error) {
        console.error("Error fetching account details:", error);
        message.error("Failed to load account details");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [accountId, editForm]);

  const handleResetPassword = async (values: any) => {
    if (!account) return;

    try {
      // Since there's no resetPassword API, we'll just show a message for now
      message.info("Password reset API not yet implemented");
      setIsResetPasswordModalVisible(false);
      resetPasswordForm.resetFields();
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("Failed to reset password");
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (account) {
      editForm.setFieldsValue({
        name: account.name,
        phone: account.phone,
        address: account.address,
        birthday: account.birthday,
        nationality: account.nationality,
        gender: account.gender,
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      const values = await editForm.validateFields();

      if (account) {
        const updateRequest = {
          name: values.name,
          phone: values.phone,
          address: values.address,
          avatarURL: account.avatarURL,
          birthday: values.birthday,
          nationality: values.nationality,
          gender: values.gender,
        };

        const success = await accountMngUsecase.updateAccount(updateRequest);
        if (success) {
          message.success("Profile updated successfully");
          setIsEditing(false);
          // Update local state
          setAccount({
            ...account,
            ...updateRequest,
          });
        } else {
          message.error("Failed to update profile");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile");
    }
  };

  // Updated function to handle account status changes with real API call
  const handleStatusAction = (newStatus: number) => {
    if (!account) return;

    // Status change is only between Active (0) and Suspended (1) as per requirements
    const action = newStatus === 0 ? "activate" : "suspend";
    const statusText = newStatus === 0 ? "active" : "suspended";

    Modal.confirm({
      title: `Are you sure you want to ${action} this account?`,
      content: `This will change the account status for ${account.name} to ${statusText}.`,
      onOk: async () => {
        try {
          const success = await accountMngUsecase.updateAccountStatus(
            account.accountId,
            newStatus
          );

          if (success) {
            message.success(`Account successfully ${action}ed`);

            // Update local state after API call success
            setAccount({
              ...account,
              status: newStatus,
            });
          } else {
            message.error(`Failed to ${action} account`);
          }
        } catch (error) {
          console.error(`Error ${action}ing account:`, error);
          message.error(`Failed to ${action} account: ${error}`);
        }
      },
    });
  };

  if (loading) {
    return <Card loading={true} />;
  }

  if (!account) {
    return (
      <Card>
        <Title level={4}>Account not found</Title>
        <Button type="primary" onClick={() => navigate("/admin/accounts")}>
          Back to Account List
        </Button>
      </Card>
    );
  }

  const activityColumns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Time",
      dataIndex: "timestamp",
      key: "timestamp",
    },
    {
      title: "IP Address",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
    },
  ];

  const transactionColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => (
        <Tag
          color={text === "Deposit" || text === "Earnings" ? "green" : "red"}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <span style={{ color: amount >= 0 ? "green" : "red" }}>
          ${Math.abs(amount).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <Avatar size={100} src={account.avatarURL} />
              <Title level={3} style={{ marginTop: 16, marginBottom: 4 }}>
                {account.name}
              </Title>
              <Space>
                <Tag
                  color={
                    account.role === 0
                      ? "purple"
                      : account.role === 1
                      ? "blue"
                      : account.role === 2
                      ? "green"
                      : "geekblue"
                  }
                >
                  {accountMngUsecase.getRoleName(account.role)}
                </Tag>
                <Tag
                  color={
                    account.status === 0
                      ? "green"
                      : account.status === 1
                      ? "orange"
                      : "red"
                  }
                >
                  {accountMngUsecase.getStatusName(account.status)}
                </Tag>
              </Space>
            </div>

            {isEditing ? (
              <Form
                form={editForm}
                layout="vertical"
                initialValues={{
                  name: account.name,
                  phone: account.phone,
                  address: account.address,
                  birthday: account.birthday,
                  nationality: account.nationality,
                  gender: account.gender,
                }}
              >
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please enter full name" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: "Please enter phone number" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please enter address" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="birthday"
                  label="Birthday"
                  rules={[{ required: true, message: "Please enter birthday" }]}
                >
                  <Input type="date" />
                </Form.Item>
                <Form.Item
                  name="nationality"
                  label="Nationality"
                  rules={[
                    { required: true, message: "Please enter nationality" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: "Please select gender" }]}
                >
                  <Select>
                    <Select.Option value={0}>Male</Select.Option>
                    <Select.Option value={1}>Female</Select.Option>
                    <Select.Option value={2}>Other</Select.Option>
                  </Select>
                </Form.Item>

                <Row gutter={8}>
                  <Col span={12}>
                    <Button block onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="primary" block onClick={handleSaveProfile}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            ) : (
              <>
                <Divider />

                <Descriptions column={1}>
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaEnvelope /> Email
                      </Space>
                    }
                  >
                    {account.email}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaPhone /> Phone
                      </Space>
                    }
                  >
                    {account.phone}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaMapMarkerAlt /> Address
                      </Space>
                    }
                  >
                    {account.address}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaBirthdayCake /> Birthday
                      </Space>
                    }
                  >
                    {new Date(account.birthday).toLocaleDateString()}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaUser /> Gender
                      </Space>
                    }
                  >
                    {accountMngUsecase.getGenderName(account.gender)}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaFlag /> Nationality
                      </Space>
                    }
                  >
                    {account.nationality}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <Space>
                        <FaCalendarAlt /> Created At
                      </Space>
                    }
                  >
                    {new Date(account.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>

                <Divider />

                <Space direction="vertical" style={{ width: "100%" }}>
                  {account.status === 0 ? (
                    <Button
                      icon={<FaBan />}
                      danger
                      block
                      onClick={() => handleStatusAction(1)}
                    >
                      Suspend Account
                    </Button>
                  ) : (
                    <Button
                      icon={<FaCheck />}
                      type="default"
                      block
                      onClick={() => handleStatusAction(0)}
                    >
                      Activate Account
                    </Button>
                  )}
                </Space>
              </>
            )}
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <Tabs.TabPane tab="Overview" key="1">
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Reputation Points"
                        value={account.reputationPoint}
                        prefix={<FaStar />}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Total Credit"
                        value={account.totalCredit}
                        precision={2}
                        prefix={<FaDollarSign />}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="Locked Credit"
                        value={account.lockCredit}
                        precision={2}
                        prefix={<FaLock />}
                      />
                    </Card>
                  </Col>
                </Row>

                <Divider>Account Information</Divider>

                <Row gutter={16}>
                  <Col span={24}>
                    <Card title="Account Details" bordered={false}>
                      <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                      >
                        <Descriptions.Item label="Account ID">
                          {account.accountId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Registration Date">
                          {new Date(account.createdAt).toLocaleDateString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role">
                          {accountMngUsecase.getRoleName(account.role)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                          {accountMngUsecase.getStatusName(account.status)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Reputation">
                          {account.reputationPoint} points
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                          {accountMngUsecase.getGenderName(account.gender)}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Transactions" key="2">
                <Table
                  dataSource={mockTransactions}
                  columns={transactionColumns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity Log" key="3">
                <Table
                  dataSource={mockActivities}
                  columns={activityColumns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
                <Divider>Activity Timeline</Divider>
                <Timeline mode="left">
                  {mockActivities.map((activity) => (
                    <Timeline.Item key={activity.id} label={activity.timestamp}>
                      <p>
                        <strong>{activity.action}</strong>
                      </p>
                      <p>
                        IP: {activity.ip} | Device: {activity.device}
                      </p>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* Reset Password Modal */}
      <Modal
        title="Reset Password"
        open={isResetPasswordModalVisible}
        footer={null}
        onCancel={() => setIsResetPasswordModalVisible(false)}
      >
        <Form
          form={resetPasswordForm}
          layout="vertical"
          onFinish={handleResetPassword}
        >
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please enter new password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Button
                block
                onClick={() => setIsResetPasswordModalVisible(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" htmlType="submit" block>
                Reset Password
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AccountDetail;
