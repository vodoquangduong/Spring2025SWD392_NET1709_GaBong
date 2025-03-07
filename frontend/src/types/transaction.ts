export type Transaction = {
  transactionId: string;
  accountId: string;
  createdAt: string;
  amount: number;
  detail: string;
  status: TransactionStatus;
  type: TransactionType;
};

export enum TransactionType {
  DEPOSIT = 0,
  WITHDRAWAL = 1,
  EARNINGS = 2,
  PAYMENT = 3,
  FEE = 4,
  REFUND = 5,
}

export enum TransactionStatus {
  PENDING = 0,
  COMPLETED = 1,
  FAILED = 2,
  CANCELLED = 3,
}
