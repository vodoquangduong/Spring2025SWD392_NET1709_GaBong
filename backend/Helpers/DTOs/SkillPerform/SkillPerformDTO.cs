using BusinessObjects.Enums;
using Helpers.DTOs.SkillCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.SkillPerform
{
    public class SkillPerformDTO
    {
        public SkillCategoryDTO skills {  get; set; }
        public SkillLevel SkillLevel { get; set; }
    }
}
