using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace BusinessObjects.Models
{
    [PrimaryKey("ProjectId", "SkillId")]

    public class SkillRequired
    {
        [Key]
        [Column("project_id")]
        public long ProjectId { get; set; }
        [Column("skill_id")]
        public long SkillId { get; set; }
        // Navigation Properties
        [ForeignKey("ProjectId")]
        [JsonIgnore]
        public virtual Project Project { get; set; } = null!;

        [ForeignKey("SkillId")]
        [JsonIgnore]
        public virtual SkillCategory SkillCategory { get; set; } = null!;
    }
}