import {
  Avatar,
  Badge,
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
import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaLock,
  FaSearch,
  FaUnlock,
  FaUserPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Account } from "../models/types";
import { accountMngUsecase } from "../usecases/accountMngUsecase";

const { Title, Text } = Typography;
const { Option } = Select;

const AccountList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchAccounts();
  }, [pagination.current, pagination.pageSize]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const result = await accountMngUsecase.getAccounts({
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      });

      setAccounts(result.accounts);
      setPagination((prev) => ({
        ...prev,
        total: result.totalCount,
      }));
    } catch (error) {
      console.error("Error fetching accounts:", error);
      message.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  // Handle table pagination change
  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
    });
  };

  // Displays a message since API is not available
  const handleStatusAction = (account: Account) => {
    const action = account.status === 0 ? "suspend" : "activate";
    message.info(
      `Status change API not implemented yet. Would ${action} ${account.name}`
    );
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
        const roleName = accountMngUsecase.getRoleName(role);
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
        const statusName = accountMngUsecase.getStatusName(status);
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
            onClick={() => navigate(`/admin/accounts/${record.accountId}`)}
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
              onClick={() => handleStatusAction(record)}
            />
          ) : (
            <Button
              icon={<FaUnlock />}
              type="default"
              size="small"
              onClick={() => handleStatusAction(record)}
            />
          )}
        </Space>
      ),
    },
  ];

  // Filter the data client-side for search and filters
  // (You might want to move this to server-side filtering later)
  const filteredData = accounts.filter((account) => {
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
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `Total ${total} accounts`,
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize: pageSize || 10,
                total: pagination.total,
              });
            },
          }}
          onChange={handleTableChange}
        />
      </Card>

      <Modal
        title="Add New Account"
        open={isModalVisible}
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
