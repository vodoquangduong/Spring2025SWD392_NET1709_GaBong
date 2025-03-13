import { PaginationParams, Report, UpdateReportRequest } from "../models/types";
import { reportMngService } from "../services/reportMngService";

export const reportMngUsecase = {
  getReports: async (
    params?: PaginationParams
  ): Promise<{
    reports: Report[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }> => {
    try {
      const response = await reportMngService.getAllReports(params);
      return {
        reports: response.items || [],
        pageNumber: response.pageNumber || 1,
        pageSize: response.pageSize || 10,
        totalCount: response.totalCount || 0,
        totalPages: response.totalPages || 1,
        hasPreviousPage: response.hasPreviousPage || false,
        hasNextPage: response.hasNextPage || false,
      };
    } catch (error) {
      console.error("Error in getReports usecase:", error);
      return {
        reports: [],
        pageNumber: params?.pageNumber || 1,
        pageSize: params?.pageSize || 10,
        totalCount: 0,
        totalPages: 1,
        hasPreviousPage: false,
        hasNextPage: false,
      };
    }
  },

  getReportById: async (reportId: number): Promise<Report | null> => {
    try {
      // The API directly returns the report object, not wrapped in a response object
      const response = await reportMngService.getReportById(reportId);

      // Log response to debug
      console.log("API response in usecase:", response);

      // Return the response directly since it's already the Report object
      return response;
    } catch (error) {
      console.error(
        `Error in getReportById usecase for ID ${reportId}:`,
        error
      );
      return null;
    }
  },

  //Implement Later
  updateReportStatus: async (
    updateRequest: UpdateReportRequest
  ): Promise<boolean> => {
    try {
      await reportMngService.updateReportStatus();
      return true;
    } catch (error) {
      console.error("Error in updateReportStatus usecase:", error);
      return false;
    }
  },

  // Helper functions for UI display
  getStatusName: (status: number): string => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "Unknown";
    }
  },
};
