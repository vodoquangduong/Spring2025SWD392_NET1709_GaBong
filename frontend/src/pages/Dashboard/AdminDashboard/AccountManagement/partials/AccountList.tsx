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
import { FaEye, FaSearch, FaUserPlus } from "react-icons/fa";
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
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Pagination state - only for UI display, not API calls
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Load all accounts once when component mounts
  useEffect(() => {
    fetchAllAccounts();
  }, []);

  // Fetch all accounts without pagination
  const fetchAllAccounts = async () => {
    setLoading(true);
    try {
      // We'll use a large page size to fetch all accounts at once
      const result = await accountMngUsecase.getAccounts({
        pageNumber: 1,
        pageSize: 1000, // Use a large number to get all accounts
      });

      setAllAccounts(result.accounts);
      setAccounts(result.accounts);
      setPagination((prev) => ({
        ...prev,
        total: result.accounts.length,
      }));
    } catch (error) {
      console.error("Error fetching accounts:", error);
      message.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  // Effect to apply filters when search text or filters change
  useEffect(() => {
    applyFilters();
  }, [searchText, roleFilter, statusFilter, allAccounts]);

  // Apply filters to the full account list
  const applyFilters = () => {
    const filtered = allAccounts.filter((account) => {
      const matchesSearch =
        searchText === "" ||
        account.name.toLowerCase().includes(searchText.toLowerCase()) ||
        account.email.toLowerCase().includes(searchText.toLowerCase());

      const matchesRole = roleFilter === null || account.role === roleFilter;
      const matchesStatus =
        statusFilter === null || account.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });

    setAccounts(filtered);
    setPagination((prev) => ({
      ...prev,
      current: 1, // Reset to first page when filtering
      total: filtered.length,
    }));
  };

  // Calculate the current page data for display
  const getCurrentPageData = () => {
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return accounts.slice(startIndex, endIndex);
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Handle table pagination change
  const handleTableChange = (paginationTable: any) => {
    setPagination({
      current: paginationTable.current,
      pageSize: paginationTable.pageSize,
      total: accounts.length,
    });
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
          {/* <Button
            icon={<FaEdit />}
            size="small"
            onClick={() => message.info(`Edit user ${record.name}`)}
          /> */}
        </Space>
      ),
    },
  ];

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
              onChange={handleSearch}
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
              <Option value={2}>Freelancer</Option>
              <Option value={3}>Client</Option>
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
              <Option value={1}>Suspended</Option>
              <Option value={2}>Banned</Option>
            </Select>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Button type="primary" icon={<FaUserPlus />} onClick={showModal}>
              Add Staff - Chua lam
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={getCurrentPageData()}
          rowKey="accountId"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: accounts.length, // Use filtered accounts length
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `Total ${total} accounts`,
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
