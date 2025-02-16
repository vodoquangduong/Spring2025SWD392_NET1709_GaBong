using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjects.Models
{
    public class SkillRequired
    {
        [Key]
        [Column("project_id")]
        public long ProjectId { get; set; }

        [Key]
        [Column("skill_id")]
        public long SkillId { get; set; }

        // Navigation Properties
        [ForeignKey("ProjectId")]
        public virtual Project Project { get; set; } = null!;

        [ForeignKey("SkillId")]
        public virtual SkillCategory SkillCategory { get; set; } = null!;
    }
}