import type { RangePickerProps } from "antd/es/date-picker";

export interface TransactionData {
  transactionId: number;
  accountId: number;
  createdAt: string;
  amount: number;
  status: number;
  type: number;
  detail: string;
}

export interface TransactionFilters {
  type: string;
  status: string;
  dateRange: RangePickerProps["value"];
}

export enum TransactionType {
  Deposit = 0, // Nạp tiền vào hệ thống
  Withdrawal = 1, // Rút tiền ra khỏi hệ thống
  Earnings = 2, // Nhận tiền từ client (for freelancer)
  Payment = 3, // Chuyển tiền cho freelancer (for client)
  Fee = 5, // Phí bid, phí tạo contract, phí hệ thống, ...
  Refund = 6, // Hoàn lại tiền cho freelancer
}

export enum TransactionStatus {
  Pending = 0,
  Completed = 1,
  Failed = 2,
  Refunded = 3,
  Cancelled = 4,
}
