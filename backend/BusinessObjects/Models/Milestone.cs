using BusinessObjects.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BusinessObjects.Models
{
    public class Milestone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("milestone_id")]
        public long MilestoneId { get; set; }
        [Column("milestone_name")]
        public string MilestoneName { get; set; } = string.Empty;
        [Column("project_id")]
        public long ProjectId { get; set; }
        [Column("deadline_date")]
        public DateTime DeadlineDate { get; set; }
        [Column("finish_date")]
        public DateTime? FinishDate { get; set; }
        [Column("status")]
        public MilestoneStatus Status { get; set; }
        [Column("milestone_description")]
        public string MilestoneDescription { get; set; } = string.Empty;
        [Column("pay_amount")]
        public decimal PayAmount { get; set; }
        // Navigation property
        [ForeignKey("ProjectId")]
        [JsonIgnore]
        public virtual Project Project { get; set; } = null!;
    }
}