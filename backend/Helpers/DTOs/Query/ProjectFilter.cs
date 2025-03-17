
namespace Helpers.DTOs.Query
{
    public class ProjectFilter
    {
        public string? ProjectName { get; set; }
        public decimal? MinBudget { get; set; }
        public decimal? MaxBudget { get; set; }
        public List<int>? SkillIds { get; set; }
        public string? Location { get; set; }
        public string SortBy { get; set; } // "newest", "oldest", "highest_budget", "lowest_budget"
    }
}