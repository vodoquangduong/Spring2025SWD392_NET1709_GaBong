import {
  Button,
  Card,
  DatePicker,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../../../stores/authStore";
import {
  TransactionData,
  TransactionFilters,
  TransactionStatus,
  TransactionType,
} from "./models/transactionModels";
import { transactionService } from "./services/transactionService";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const TransactionHistory: React.FC = () => {
  const { accountId } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [filters, setFilters] = useState<TransactionFilters>({
    type: "all",
    status: "all",
    dateRange: null,
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await transactionService.getTransactionsByAccountId(
        accountId
      );
      console.log("Processed transaction data:", data);
      setTransactions(data);
    } catch (error: any) {
      message.error(error.message || "Failed to load transaction data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountId) {
      fetchTransactions();
    }
  }, [accountId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusTag = (status: number) => {
    switch (status) {
      case TransactionStatus.Pending:
        return <Tag color="orange">Pending</Tag>;
      case TransactionStatus.Completed:
        return <Tag color="green">Completed</Tag>;
      case TransactionStatus.Failed:
        return <Tag color="red">Failed</Tag>;
      case TransactionStatus.Refunded:
        return <Tag color="blue">Refunded</Tag>;
      case TransactionStatus.Cancelled:
        return <Tag color="gray">Cancelled</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const getTypeTag = (type: number) => {
    switch (type) {
      case TransactionType.Deposit:
        return <Tag color="green">Deposit</Tag>;
      case TransactionType.Withdrawal:
        return <Tag color="blue">Withdrawal</Tag>;
      case TransactionType.Earnings:
        return <Tag color="cyan">Earnings</Tag>;
      case TransactionType.Payment:
        return <Tag color="purple">Payment</Tag>;
      case TransactionType.Fee:
        return <Tag color="orange">Fee</Tag>;
      case TransactionType.Refund:
        return <Tag color="geekblue">Refund</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString, "M/D/YYYY h:mm:ss A").format("MM/DD/YYYY");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: number) => getTypeTag(type),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, record: TransactionData) => {
        let type: "success" | "danger" | "warning" | undefined;
        if (
          record.type === TransactionType.Deposit ||
          record.type === TransactionType.Earnings ||
          record.type === TransactionType.Refund
        ) {
          type = "success";
        } else if (
          record.type === TransactionType.Withdrawal ||
          record.type === TransactionType.Payment ||
          record.type === TransactionType.Fee
        ) {
          type = "danger";
        }

        const prefix =
          record.type === TransactionType.Withdrawal ||
          record.type === TransactionType.Payment ||
          record.type === TransactionType.Fee
            ? "-"
            : "+";

        return (
          <Typography.Text type={type} strong>
            {prefix} {formatCurrency(amount)}
          </Typography.Text>
        );
      },
      sorter: (a: TransactionData, b: TransactionData) => a.amount - b.amount,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => getStatusTag(status),
      filters: [
        { text: "Pending", value: TransactionStatus.Pending },
        { text: "Completed", value: TransactionStatus.Completed },
        { text: "Failed", value: TransactionStatus.Failed },
        { text: "Refunded", value: TransactionStatus.Refunded },
        { text: "Cancelled", value: TransactionStatus.Cancelled },
      ],
      onFilter: (value: any, record: TransactionData) =>
        record.status === value,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
      sorter: (a: TransactionData, b: TransactionData) =>
        dayjs(a.createdAt, "M/D/YYYY h:mm:ss A").unix() -
        dayjs(b.createdAt, "M/D/YYYY h:mm:ss A").unix(),
      defaultSortOrder: "descend" as const,
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      width: 300, // 👈 bạn có thể điều chỉnh: 200, 250, 300...
      render: (value: string) => (
        <div
          style={{
            maxWidth: 300,
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {value}
        </div>
      ),
    },
  ];

  const handleResetFilters = () => {
    setFilters({
      type: "all",
      status: "all",
      dateRange: null,
    });
  };

  const handleDateRangeChange: RangePickerProps["onChange"] = (dates) => {
    setFilters({ ...filters, dateRange: dates });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (
      filters.type !== "all" &&
      transaction.type.toString() !== filters.type
    ) {
      return false;
    }

    if (
      filters.status !== "all" &&
      transaction.status.toString() !== filters.status
    ) {
      return false;
    }

    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const transactionDate = dayjs(transaction.createdAt, "DD-MM-YYYY");
      const startDate = dayjs(filters.dateRange[0]).startOf("day");
      const endDate = dayjs(filters.dateRange[1]).endOf("day");

      if (
        transactionDate.isBefore(startDate) ||
        transactionDate.isAfter(endDate)
      ) {
        return false;
      }
    }

    return true;
  });

  console.log("Filtered transactions:", filteredTransactions);

  return (
    <div className="p-6">
      <Card className="border-secondary">
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={2}>Transaction History</Title>

          <Space wrap>
            <Select
              placeholder="Filter by Type"
              style={{ width: 150 }}
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
            >
              <Option value="all">All Types</Option>
              <Option value={TransactionType.Deposit.toString()}>
                Deposit
              </Option>
              <Option value={TransactionType.Withdrawal.toString()}>
                Withdrawal
              </Option>
              <Option value={TransactionType.Earnings.toString()}>
                Earnings
              </Option>
              <Option value={TransactionType.Payment.toString()}>
                Payment
              </Option>
              <Option value={TransactionType.Fee.toString()}>Fee</Option>
              <Option value={TransactionType.Refund.toString()}>Refund</Option>
            </Select>

            <Select
              placeholder="Filter by Status"
              style={{ width: 150 }}
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
            >
              <Option value="all">All Statuses</Option>
              <Option value={TransactionStatus.Pending.toString()}>
                Pending
              </Option>
              <Option value={TransactionStatus.Completed.toString()}>
                Completed
              </Option>
              <Option value={TransactionStatus.Failed.toString()}>
                Failed
              </Option>
              <Option value={TransactionStatus.Refunded.toString()}>
                Refunded
              </Option>
              <Option value={TransactionStatus.Cancelled.toString()}>
                Cancelled
              </Option>
            </Select>

            <RangePicker onChange={handleDateRangeChange} />

            <Button onClick={handleResetFilters}>Reset Filters</Button>
          </Space>

          <Table
            dataSource={filteredTransactions}
            columns={columns}
            rowKey="transactionId"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total: ${total}`,
            }}
          />

          {filteredTransactions.length === 0 && !loading && (
            <div className="mt-4 text-center">
              <Typography.Text type="secondary">
                No transactions found
              </Typography.Text>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default TransactionHistory;
