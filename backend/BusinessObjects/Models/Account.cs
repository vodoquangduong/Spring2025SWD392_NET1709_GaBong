using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BusinessObjects.Enums;

namespace BusinessObjects.Models;

public class Account
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
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.MinValue;
    [Column("status")]
    public AccountStatus Status { get; set; } = AccountStatus.Active;
}
