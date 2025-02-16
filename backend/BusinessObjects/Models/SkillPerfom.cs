using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjects.Models
{
    public class SkillPerform
    {
        [Key]
        [Column("account_id")]
        public long AccountId { get; set; }

        [Key]
        [Column("skill_id")]
        public long SkillId { get; set; }

        // Navigation Properties
        [ForeignKey("AccountId")]
        public virtual AccountNew Account { get; set; } = null!;

        [ForeignKey("SkillId")]
        public virtual SkillCategory SkillCategory { get; set; } = null!;
    }
}