using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Enums;

namespace BusinessObjects.Models
{
    public class Milestone
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("milestone_id")]
        public long MilestoneId { get; set; }
        [Column("project_id")]
        public long ProjectId { get; set; }
        [Column("deadline_date")]
        public DateTime DeadlineDate { get; set; }
        [Column("status")]
        public MilestoneStatus Status { get; set; }
        [Column("milestone_description")]
        public string MilestoneDescription { get; set; } = string.Empty;
        [Column("pay_amount")]
        public decimal PayAmount { get; set; }
        // Navigation property
        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; } = null!;
        
        
        


    }
}