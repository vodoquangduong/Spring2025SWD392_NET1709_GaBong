namespace Helpers.DTOs.Feedback
{
    public class FeedbackDTO
    {
        public long FeedbackId { get; set; }
        public long ProjectId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public string CreatedAt { get; set; } = string.Empty;
    }
}