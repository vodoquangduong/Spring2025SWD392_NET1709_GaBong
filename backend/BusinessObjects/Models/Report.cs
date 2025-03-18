using BusinessObjects.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public long? VerifyStaffId { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("reason")]
        public string Reason { get; set; } = string.Empty;

        [Column("status")]
        public ReportStatus Status { get; set; }

        // Navigation properties
        [ForeignKey("SenderId")]
        public Account Sender { get; set; } = null!;
        [ForeignKey("ProjectId")]
        public Project Project { get; set; } = null!;
        [ForeignKey("VerifyStaffId")]
        public Account? VerifyStaff { get; set; } = null!;
    }
}