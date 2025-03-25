import { Role } from "@/types";
import { MilestoneStatus } from "@/types/milestone";
import { ProjectStatus } from "@/types/project";
import { TransactionStatus, TransactionType } from "@/types/transaction";
import { Tag } from "antd";

export const mapProjectStatusToTag = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.PENDING:
      return <Tag color="gold">Pending</Tag>;
    case ProjectStatus.VERIFIED:
      return <Tag color="orange">Verified</Tag>;
    case ProjectStatus.REVERIFIED:
      return <Tag color="red">Re verify</Tag>;
    case ProjectStatus.ON_GOING:
      return <Tag color="blue">On going</Tag>;
    case ProjectStatus.CLOSED:
      return <Tag color="red">Cancelled</Tag>;
    case ProjectStatus.COMPLETED:
      return <Tag color="green">Completed</Tag>;
  }
};

export const mapMilestoneStatusToTag = (status: MilestoneStatus) => {
  switch (status) {
    case MilestoneStatus.NOT_STARTED:
      return <Tag color="gold">Not Started</Tag>;
    case MilestoneStatus.IN_PROGRESS:
      return <Tag color="blue">In Progress</Tag>;
    case MilestoneStatus.SUBMITTED:
      return <Tag color="blue">Submitted</Tag>;
    case MilestoneStatus.COMPLETED:
      return <Tag color="green">Completed</Tag>;
    case MilestoneStatus.CANCELLED:
      return <Tag color="red">Cancelled</Tag>;
  }
};

export const mapRoleToTag = (role: any) => {
  const getRoleName = (role: Role): string => {
    switch (role) {
      case Role.ADMIN:
        return "Admin";
      case Role.STAFF:
        return "Staff";
      case Role.FREELANCER:
        return "Freelancer";
      case Role.CLIENT:
        return "Client";
      default:
        return "Guest";
    }
  };

  return (
    <Tag color="blue" className="px-3 py-1 text-sm font-medium rounded-full">
      {getRoleName(role)}
    </Tag>
  );
};

export const mapTransactionStatusToTag = (status: number) => {
  switch (status) {
    case TransactionStatus.PENDING:
      return <Tag color="orange">Pending</Tag>;
    case TransactionStatus.COMPLETED:
      return <Tag color="green">Completed</Tag>;
    case TransactionStatus.FAILED:
      return <Tag color="red">Failed</Tag>;
    case TransactionStatus.REFUNDED:
      return <Tag color="blue">Refunded</Tag>;
    case TransactionStatus.CANCELLED:
      return <Tag color="gray">Cancelled</Tag>;
    default:
      return <Tag color="default">Unknown</Tag>;
  }
};

export const mapTransactionTypeToTag = (type: number) => {
  switch (type) {
    case TransactionType.DEPOSIT:
      return <Tag color="green">Deposit</Tag>;
    case TransactionType.WITHDRAWAL:
      return <Tag color="blue">Withdrawal</Tag>;
    case TransactionType.EARNINGS:
      return <Tag color="cyan">Earnings</Tag>;
    case TransactionType.PAYMENT:
      return <Tag color="purple">Payment</Tag>;
    case TransactionType.FEE:
      return <Tag color="orange">Fee</Tag>;
    case TransactionType.REFUND:
      return <Tag color="geekblue">Refund</Tag>;
    default:
      return <Tag color="default">Unknown</Tag>;
  }
};
