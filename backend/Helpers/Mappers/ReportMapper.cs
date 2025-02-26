using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using Helpers.DTOs.Report;

namespace Helpers.Mappers
{
    public static class ReportMapper
    {
        public static ReportDTO ToReportDTO(this Report report)
        {
            return new ReportDTO
            {
                ReportId = report.ReportId,
                SenderId = report.SenderId,
                ProjectId = report.ProjectId,
                VerifyStaffId = report.VerifyStaffId,
                CreatedAt = report.CreatedAt.ToString("dd-MM-yyyy"),
                Reason = report.Reason,
                Status = report.Status
            };
        }
    }
}