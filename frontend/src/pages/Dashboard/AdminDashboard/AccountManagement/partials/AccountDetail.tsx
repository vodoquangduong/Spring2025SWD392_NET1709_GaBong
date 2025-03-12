import {
  Avatar,
  Breadcrumb,
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
  FaEdit,
  FaEnvelope,
  FaFlag,
  FaKey,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;

interface AccountDetail {
  accountId: number;
  role: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarURL: string;
  birthday: string;
  gender: number;
  nationality: string;
  reputationPoint: number;
  totalCredit: number;
  lockCredit: number;
  createdAt: string;
  status: number;
}

const mockAccountDetail: AccountDetail = {
  accountId: 1,
  role: 0,
  name: "Do Long Admin",
  email: "admin@gmail.com",
  phone: "0123456789",
  address: "Venus",
  avatarURL: "https://i.pravatar.cc/500",
  birthday: "2005-02-17T07:40:42.167Z",
  gender: 0,
  nationality: "Chinese",
  reputationPoint: 0,
  totalCredit: 10000,
  lockCredit: 0,
  createdAt: "2022-10-14T19:12:47.023Z",
  status: 0,
};

const AccountDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);
  const [resetPasswordForm] = Form.useForm();

  // Mock transaction history data
  const transactions = [
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

  // Mock activity data
  const activities = [
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

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setAccount(mockAccountDetail);
      setLoading(false);
    }, 500);
  }, [id]);

  const getRoleName = (role: number): string => {
    switch (role) {
      case 0:
        return "Admin";
      case 1:
        return "Staff";
      case 2:
        return "Client";
      case 3:
        return "Freelancer";
      default:
        return "Unknown";
    }
  };

  const getStatusName = (status: number): string => {
    switch (status) {
      case 0:
        return "Active";
      case 1:
        return "Inactive";
      case 2:
        return "Suspended";
      default:
        return "Unknown";
    }
  };

  const getGenderName = (gender: number): string => {
    switch (gender) {
      case 0:
        return "Male";
      case 1:
        return "Female";
      case 2:
        return "Other";
      default:
        return "Not specified";
    }
  };

  const handleResetPassword = (values: any) => {
    console.log("Reset password:", values);
    message.success("Password has been reset successfully");
    setIsResetPasswordModalVisible(false);
    resetPasswordForm.resetFields();
  };

  const handleStatusChange = (newStatus: number) => {
    if (!account) return;

    const action = newStatus === 0 ? "activate" : "suspend";
    Modal.confirm({
      title: `Are you sure you want to ${action} this account?`,
      content: `This will ${action} the account for ${account.name}.`,
      onOk() {
        setAccount({
          ...account,
          status: newStatus,
        });
        message.success(`Account has been ${action}d successfully`);
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
        <Button
          type="primary"
          onClick={() => navigate("/dashboard/admin/accounts")}
        >
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
      <Breadcrumb
        items={[
          { title: "Dashboard" },
          { title: "Admin" },
          {
            title: "Accounts",
            href: "/dashboard/admin/accounts",
          },
          { title: `Account ${account.accountId}` },
        ]}
        style={{ marginBottom: 16 }}
      />

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
                  {getRoleName(account.role)}
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
                  {getStatusName(account.status)}
                </Tag>
              </Space>
            </div>

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
                {getGenderName(account.gender)}
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
              <Button
                icon={<FaEdit />}
                type="primary"
                block
                onClick={() => message.info("Edit profile functionality")}
              >
                Edit Profile
              </Button>
              <Button
                icon={<FaKey />}
                block
                onClick={() => setIsResetPasswordModalVisible(true)}
              >
                Reset Password
              </Button>
              {account.status === 0 ? (
                <Button
                  icon={<FaBan />}
                  danger
                  block
                  onClick={() => handleStatusChange(2)}
                >
                  Suspend Account
                </Button>
              ) : (
                <Button
                  icon={<FaCheck />}
                  type="default"
                  block
                  onClick={() => handleStatusChange(0)}
                >
                  Activate Account
                </Button>
              )}
            </Space>
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
                          {getRoleName(account.role)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                          {getStatusName(account.status)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Reputation">
                          {account.reputationPoint} points
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                          {getGenderName(account.gender)}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Transactions" key="2">
                <Table
                  dataSource={transactions}
                  columns={transactionColumns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Activity Log" key="3">
                <Table
                  dataSource={activities}
                  columns={activityColumns}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                />
                <Divider>Activity Timeline</Divider>
                <Timeline mode="left">
                  {activities.map((activity) => (
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
