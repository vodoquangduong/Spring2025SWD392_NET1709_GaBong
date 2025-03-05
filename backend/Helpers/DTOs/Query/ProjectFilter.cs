using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Helpers.DTOs.Query
{
    public class ProjectFilter
    {
    public decimal? MinBudget { get; set; }
    public decimal? MaxBudget { get; set; }
    public List<int>? SkillIds { get; set; }
    public string? Location { get; set; }
    }
}