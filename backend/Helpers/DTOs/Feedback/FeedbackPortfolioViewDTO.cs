using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.Feedback
{
    public class FeedbackPortfolioViewDTO
    {
        public long FeedbackId { get; set; }
        public long ProjectId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string CreatedAt { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public decimal ProjectEarning { get; set; }
        public long ClientId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public string ClientAvatarUrl { get; set; } = string.Empty;
    }
}
