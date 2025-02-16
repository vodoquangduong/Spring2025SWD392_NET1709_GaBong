using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessObjects.Models
{
    public class SkillCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("skill_id")]
        public long SkillId { get; set; }

        [Column("skill_name")]
        public string SkillName { get; set; } = string.Empty;

        // Navigation Property
        public virtual ICollection<SkillRequired> SkillRequireds { get; set; } = new List<SkillRequired>();
        public virtual ICollection<SkillPerform> SkillPerforms { get; set; } = new List<SkillPerform>();
    }
}