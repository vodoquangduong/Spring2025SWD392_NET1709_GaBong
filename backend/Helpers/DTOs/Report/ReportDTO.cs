using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace Helpers.DTOs.Report
{
    public class ReportDTO
    {
        public long ReportId { get; set; }
        public long SenderId { get; set; }
        public long ProjectId { get; set; }
        public long? VerifyStaffId { get; set; }
        public string CreatedAt { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
        public ReportStatus Status { get; set; }
    }
}