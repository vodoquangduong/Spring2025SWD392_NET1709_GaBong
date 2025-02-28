using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BusinessObjects.Enums;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace BusinessObjects.Models
{
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("project_id")]
        public long ProjectId { get; set; }

        [ForeignKey("Client")]
        [Column("client_id")]
        public long ClientId { get; set; }

        [ForeignKey("Freelancer")]
        [Column("freelancer_id")]
        public long? FreelancerId { get; set; }

        [ForeignKey("Verifier")]
        [Column("verify_staff_id")]
        public long? VerifyStaffId { get; set; }

        [Column("post_date")]
        public DateTime PostDate { get; set; } = DateTime.UtcNow;

        [Column("available_time_range")]
        public int AvailableTimeRange { get; set; }

        [Column("project_name")]
        public string ProjectName { get; set; } = string.Empty;

        [Column("project_description")]
        public string ProjectDescription { get; set; } = string.Empty;

        [Column("location")]
        public string Location { get; set; } = string.Empty;

        [Column("estimate_budget")]
        public decimal EstimateBudget { get; set; }

        [Column("status")]
        public ProjectStatus Status { get; set; }


        // Navigation Properties
        public virtual Account Client { get; set; } = null!;
        public virtual Account? Freelancer { get; set; }
        public virtual Account? Verifier { get; set; }
        public virtual ICollection<Report> Reports { get; set; } = new List<Report>();
        [JsonIgnore]
        public virtual ICollection<SkillRequired> SkillRequired { get; set; } = new List<SkillRequired>();
        public virtual ICollection<Milestone> Milestones { get; set; } = new List<Milestone>();
        public virtual ICollection<Bid> Bids { get; set; } = new List<Bid>();
        public virtual ICollection<Contract> Contracts { get; set; } = new List<Contract>();
        public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();


    }
}
