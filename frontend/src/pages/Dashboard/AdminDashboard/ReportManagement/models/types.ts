export interface Report {
  reportId: number;
  senderId: number;
  projectId: number;
  verifyStaffId: number | null;
  createdAt: string | Date;
  reason: string;
  status: number;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface ReportsResponse {
  items: Report[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Update this to match the actual API response
export interface ReportDetailResponse extends Report {
  // The API directly returns the report object, not wrapped in a response
}

// Additional interface for updating report status
export interface UpdateReportRequest {
  reportId: number;
  verifyStaffId: number;
  status: number;
}
