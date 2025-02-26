using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.SkillCategory
{
    public class SkillCategoryDTO
    {
        public long SkillId { get; set; }
        public string SkillName { get; set; } = string.Empty;
    }
}
