export type ResultServerResponse<T> = {
  error: {
    message: string;
    code: number;
  };
  isSuccess: boolean;
  isFailure: boolean;
  value: T;
};

export type ServerResponse<T> = {
  status: number;
  data: T;
  message: string;
};

export type NormalServerResponse<T> = {
  status: number;
  data: T;
  message: string;
};

export type PaginatedResult<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
