using BusinessObjects.Enums;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjects.Models
{
    [PrimaryKey("AccountId", "SkillId")]
    public class SkillPerform
    {
        [Key]
        [Column("account_id")]
        public long AccountId { get; set; }

        [Column("skill_id")]
        public long SkillId { get; set; }

        [Column("level")]
        public SkillLevel Level { get; set; } = SkillLevel.Entry;

        // Navigation Properties
        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; } = null!;

        [ForeignKey("SkillId")]
        public virtual SkillCategory SkillCategory { get; set; } = null!;
    }
}