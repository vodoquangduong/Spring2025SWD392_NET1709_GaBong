using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BusinessObjects.Enums;

namespace BusinessObjects.Models;

public class AccountNew
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("account_id")]
    public long AccountId { get; set; }
    [Column("role")]
    public AccountRole Role { get; set; } = AccountRole.Client;
    [Column("name")]
    public string Name { get; set; } = string.Empty;
    [Column("email")]
    public string Email { get; set; } = string.Empty;
    [Column("password")]
    public string Password { get; set; } = string.Empty;
    [Column("phone")]
    public string Phone { get; set; } = string.Empty;
    [Column("address")]
    public string Address { get; set; } = string.Empty;
    [Column("birthday")]
    public DateTime Birthday { get; set; } = DateTime.MinValue;
    [Column("gender")]
    public Gender Gender { get; set; } = Gender.Other;
    [Column("reputation_point")]
    public int ReputationPoint { get; set; } = 0;
    [Column("total_credit")]
    public long TotalCredit { get; set; } = 0;
    [Column("lock_credit")]
    public long LockCredit { get; set; } = 0;
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.MinValue;
    [Column("status")]
    public AccountStatus Status { get; set; } = AccountStatus.Active;


    //Navigation Property
    public virtual ICollection<Project> ClientProjects { get; set; } = new List<Project>();
    public virtual ICollection<Project> FreelancerProjects { get; set; } = new List<Project>();
    public virtual ICollection<Project> VerifiedStaffIdProjects { get; set; } = new List<Project>();
    public virtual ICollection<Report> SentReports { get; set; } = new List<Report>();
    public virtual ICollection<Report> VerifiedReports { get; set; } = new List<Report>();
    public virtual ICollection<SkillPerform> SkillPerforms { get; set; } = new List<SkillPerform>();
    public virtual Portfolio? Portfolio { get; set; }
    public virtual ICollection<Bid> Bids { get; set; } = new List<Bid>();
    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
    public virtual ICollection<Chat> SenderChats { get; set; } = new List<Chat>();
    public virtual ICollection<Chat> ReceiverChats { get; set; } = new List<Chat>();


    



}
