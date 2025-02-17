using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BusinessObjects.Enums;
using System.Collections.Generic;

namespace BusinessObjects.Models
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("project_id")]
        public long ProjectId { get; set; }

        [Column("client_id")]
        public long ClientId { get; set; }

        [Column("freelancer_id")]
        public long? FreelancerId { get; set; }

        [Column("verify_staff_id")]
        public long? VerifyStaffId { get; set; }

        [Column("post_date")]
        public DateTime PostDate { get; set; } = DateTime.UtcNow;

        [Column("end_bidding_date")]
        public DateTime EndBiddingDate { get; set; }

        [Column("project_description")]
        public string ProjectDescription { get; set; } = string.Empty;

        [Column("status")]
        public ProjectStatus Status { get; set; }


        // Navigation Properties
        [ForeignKey("client_id")]
        public virtual Account Client { get; set; } = null!;
        [ForeignKey("freelancer_id")]
        public virtual Account? Freelancer { get; set; }
        [ForeignKey("verify_staff_id")]
        public virtual Account? Verifier { get; set; }
        public virtual ICollection<Report> Reports { get; set; } = new List<Report>();
        public virtual ICollection<SkillRequired> SkillRequireds { get; set; } = new List<SkillRequired>();
        public virtual ICollection<Milestone> Milestones { get; set; } = new List<Milestone>();
        public virtual ICollection<Contract> Contracts { get; set; } = new List<Contract>();
        public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    }
}
