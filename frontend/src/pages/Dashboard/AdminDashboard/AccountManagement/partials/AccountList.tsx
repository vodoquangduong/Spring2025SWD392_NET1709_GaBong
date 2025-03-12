import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import {
  FaEdit,
  FaEye,
  FaLock,
  FaSearch,
  FaUnlock,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

interface Account {
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

const mockAccounts: Account[] = [
  {
    accountId: 500,
    role: 3,
    name: "Lucius Gill",
    email: "encyclopedia1839@outlook.com",
    phone: "+15345702124",
    address: "1147 Vara Green",
    avatarURL: "https://i.pravatar.cc/500",
    birthday: "1985-09-16T00:00:00Z",
    gender: 0,
    nationality: "Honduras",
    reputationPoint: 451,
    totalCredit: 5224.92,
    lockCredit: 275.82,
    createdAt: "2020-06-23T11:49:05.031297Z",
    status: 0,
  },
  {
    accountId: 501,
    role: 3,
    name: "Karey Wall",
    email: "read1994@protonmail.com",
    phone: "+1-551-048-7090",
    address: "886 Clarendon Crescent",
    avatarURL: "https://i.pravatar.cc/500",
    birthday: "2004-07-06T00:00:00Z",
    gender: 2,
    nationality: "Seychelles",
    reputationPoint: 550,
    totalCredit: 3908.1,
    lockCredit: 148.29,
    createdAt: "2021-11-08T18:50:53.564098Z",
    status: 0,
  },
  {
    accountId: 502,
    role: 2,
    name: "Rosette Fowler",
    email: "cnn1998@yahoo.com",
    phone: "+1-321-783-2833",
    address: "314 Roach Bridge",
    avatarURL: "https://i.pravatar.cc/500",
    birthday: "2000-03-14T00:00:00Z",
    gender: 1,
    nationality: "Oman",
    reputationPoint: 350,
    totalCredit: 6128.94,
    lockCredit: 8.91,
    createdAt: "2023-04-23T12:23:58.19176Z",
    status: 0,
  },
];

const AccountList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  const columns = [
    {
      title: "ID",
      dataIndex: "accountId",
      key: "accountId",
      width: 80,
    },
    {
      title: "User",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: Account) => (
        <Space>
          <Avatar src={record.avatarURL} />
          <Space direction="vertical" size={0}>
            <Text strong>{record.name}</Text>
            <Text type="secondary">{record.email}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: number) => {
        const roleName = getRoleName(role);
        let color = "default";
        if (role === 0) color = "purple";
        else if (role === 1) color = "blue";
        else if (role === 2) color = "green";
        else if (role === 3) color = "geekblue";
        return <Tag color={color}>{roleName}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        const statusName = getStatusName(status);
        let color = "success";
        if (status === 1) color = "warning";
        else if (status === 2) color = "error";
        return <Badge status={color as any} text={statusName} />;
      },
    },
    {
      title: "Reputation",
      dataIndex: "reputationPoint",
      key: "reputationPoint",
      sorter: (a: Account, b: Account) => a.reputationPoint - b.reputationPoint,
    },
    {
      title: "Total Credit",
      dataIndex: "totalCredit",
      key: "totalCredit",
      render: (credit: number) => `$${credit.toFixed(2)}`,
      sorter: (a: Account, b: Account) => a.totalCredit - b.totalCredit,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Account, b: Account) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Account) => (
        <Space size="middle">
          <Button
            icon={<FaEye />}
            type="primary"
            size="small"
            onClick={() =>
              navigate(`/dashboard/admin/accounts/${record.accountId}`)
            }
          />
          <Button
            icon={<FaEdit />}
            size="small"
            onClick={() => message.info(`Edit user ${record.name}`)}
          />
          {record.status === 0 ? (
            <Button
              icon={<FaLock />}
              danger
              size="small"
              onClick={() => message.success(`User ${record.name} suspended`)}
            />
          ) : (
            <Button
              icon={<FaUnlock />}
              type="default"
              size="small"
              onClick={() => message.success(`User ${record.name} activated`)}
            />
          )}
        </Space>
      ),
    },
  ];

  const filteredData = mockAccounts.filter((account) => {
    const matchesSearch =
      searchText === "" ||
      account.name.toLowerCase().includes(searchText.toLowerCase()) ||
      account.email.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole = roleFilter === null || account.role === roleFilter;
    const matchesStatus =
      statusFilter === null || account.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddAccount = (values: any) => {
    console.log("Form values:", values);
    message.success("Account added successfully!");
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { title: "Dashboard" },
          { title: "Admin" },
          { title: "Account Management" },
        ]}
        style={{ marginBottom: 16 }}
      />

      <Title level={2}>Account Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Search by name or email"
              prefix={<FaSearch />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Filter by role"
              style={{ width: "100%" }}
              allowClear
              onChange={(value) => setRoleFilter(value)}
            >
              <Option value={0}>Admin</Option>
              <Option value={1}>Staff</Option>
              <Option value={2}>Client</Option>
              <Option value={3}>Freelancer</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Filter by status"
              style={{ width: "100%" }}
              allowClear
              onChange={(value) => setStatusFilter(value)}
            >
              <Option value={0}>Active</Option>
              <Option value={1}>Inactive</Option>
              <Option value={2}>Suspended</Option>
            </Select>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Button type="primary" icon={<FaUserPlus />} onClick={showModal}>
              Add Account
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="accountId"
          loading={loading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `Total ${total} accounts`,
          }}
        />
      </Card>

      <Modal
        title="Add New Account"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddAccount}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select>
              <Option value={0}>Admin</Option>
              <Option value={1}>Staff</Option>
              <Option value={2}>Client</Option>
              <Option value={3}>Freelancer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
              <Button block onClick={handleCancel}>
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" htmlType="submit" block>
                Add Account
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountList;
