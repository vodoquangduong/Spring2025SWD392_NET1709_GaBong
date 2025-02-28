using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Report
{
    public class CreateReportDTO
    {
        public long ProjectId { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}