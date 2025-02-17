using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace BusinessObjects.Models
{
    public class Report
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("report_id")]
        public long ReportId { get; set; }

        [Column("sender_id")]
        public long SenderId { get; set; }

        [Column("project_id")]
        public long ProjectId { get; set; }

        [Column("verify_staff_id")]
        public string VerifyStaffId { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("reason")]
        public string Reason { get; set; } = string.Empty;

        [Column("status")]
        public ReportStatus Status { get; set; }

        // Navigation properties
        [ForeignKey("sender_id")]
        public virtual Account? Sender { get; set; } = null!;
        [ForeignKey("project_id")]
        public virtual Project? Project { get; set; } = null!;
        [ForeignKey("verify_staff_id")]
        public virtual Account? VerifyStaff { get; set; } = null!;
    }
}