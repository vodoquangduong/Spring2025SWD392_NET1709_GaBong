export interface Account {
  accountId: number;
  role: number;
  name: string;
  email: string;
  password?: string;
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

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  roleFilter?: number;
  statusFilter?: number;
}

export interface AccountsResponse {
  items: Account[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface AccountDetailResponse {
  value: Account;
  isSuccess: boolean;
  isFailure: boolean;
  error: {
    code: string;
    message: string;
  };
}

export interface UpdateAccountRequest {
  name: string;
  phone: string;
  address: string;
  avatarURL: string;
  birthday: string;
  nationality: string;
  gender: number;
}

export interface ResetPasswordRequest {
  accountId: number;
  newPassword: string;
}

export interface CreateAccountRequest {
  name: string;
  email: string;
  password: string;
  status: number; // Always 0 for Active
  role: number; // 1 for Staff
}

// Helper types for UI
export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  status: string;
}

export interface Activity {
  id: number;
  action: string;
  timestamp: string;
  ip: string;
  device: string;
}
export interface FilteredAccountsResponse {
  items: Account[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface FilteredAccountsParams {
  pageSize: number;
  pageNumber: number;
  accountName?: string;
  accountRole?: string;
  accountStatus?: string;
  sortBy?: string;
}
