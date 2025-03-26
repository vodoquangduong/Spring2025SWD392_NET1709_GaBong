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
import { accountMngService } from "../services/accountMngService";
import { accountMngUsecase } from "../usecases/accountMngUsecase";

const { Title, Text } = Typography;
const { Option } = Select;

const AccountList: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    fetchAccounts();
  }, [
    pagination.current,
    pagination.pageSize,
    searchText,
    roleFilter,
    statusFilter,
    sortBy,
  ]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const result = await accountMngService.getFilteredAccounts({
        pageSize: pagination.pageSize,
        pageNumber: pagination.current,
        accountName: searchText || undefined,
        accountRole: roleFilter || undefined,
        accountStatus: statusFilter || undefined,
        sortBy: sortBy,
      });

      setAccounts(result.items);
      setPagination((prev) => ({
        ...prev,
        total: result.totalCount,
        totalPages: result.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching accounts:", error);
      message.error("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Handle search submit (on press Enter)
  const handleSearchSubmit = () => {
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  // Handle table pagination change
  const handleTableChange = (paginationTable: any) => {
    setPagination((prev) => ({
      ...prev,
      current: paginationTable.current,
      pageSize: paginationTable.pageSize,
    }));
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

  const handleAddAccount = async (values: any) => {
    try {
      setLoading(true);
      await accountMngUsecase.createStaffAccount({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      message.success("Staff account added successfully!");
      setIsModalVisible(false);
      form.resetFields();

      // Refresh the account list after adding a new account
      fetchAccounts();
    } catch (error) {
      console.error("Error creating staff account:", error);
      message.error(
        "Failed to create staff account: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>Account Management</Title>

      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Input
              placeholder="Search by name"
              prefix={<FaSearch />}
              value={searchText}
              onChange={handleSearch}
              onPressEnter={handleSearchSubmit}
              allowClear
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Filter by role"
              style={{ width: "100%" }}
              allowClear
              value={roleFilter}
              onChange={(value) => setRoleFilter(value)}
            >
              <Option value="">All</Option>
              <Option value="1">Staff</Option>
              <Option value="2">Freelancer</Option>
              <Option value="3">Client</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Filter by status"
              style={{ width: "100%" }}
              allowClear
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
            >
              <Option value="">All</Option>
              <Option value="0">Active</Option>
              <Option value="1">Inactive</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Sort by"
              style={{ width: "100%" }}
              value={sortBy}
              onChange={(value) => setSortBy(value)}
            >
              <Option value="reputationPoint">Reputation</Option>
              <Option value="totalCredit">Total Credit</Option>
              <Option value="createdAt">Created Date</Option>
            </Select>
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            <Button type="primary" icon={<FaUserPlus />} onClick={showModal}>
              Create Staff Account
            </Button>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={accounts}
          rowKey="accountId"
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            showTotal: (total) => `Total ${total} accounts`,
          }}
          onChange={handleTableChange}
        />
      </Card>

      <Modal
        title="Add Staff Account"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
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
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
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
              <Button block onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Add Staff Account
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountList;
