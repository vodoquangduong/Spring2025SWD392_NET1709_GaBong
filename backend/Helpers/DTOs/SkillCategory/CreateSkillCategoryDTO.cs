using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.SkillCategory
{
    public class CreateSkillCategoryDTO
    {
        [Required]
        public string SkillName { get; set; } = string.Empty;

    }
}
