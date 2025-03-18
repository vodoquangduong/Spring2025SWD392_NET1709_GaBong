using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BusinessObjects.Models
{
    public class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("feedback_id")]
        public long FeedbackId { get; set; }
        [Column("project_id")]
        public long ProjectId { get; set; }
        [Column("rating")]
        public int Rating { get; set; }
        [Column("feedback_comment")]
        public string FeedbackComment { get; set; } = string.Empty;
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation properties
        [ForeignKey("ProjectId")]
        public Project Project { get; set; } = null!;
    }
}