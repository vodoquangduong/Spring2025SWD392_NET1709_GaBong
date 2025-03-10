using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using Helpers.DTOs.SkillPerform;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.Mappers
{
    public static class SkillPerformMapper
    {
        public static SkillPerformDTO ToSkillPerformDTO(this SkillPerform skillPerform)
        {
            if (skillPerform == null) return new SkillPerformDTO();

            return new SkillPerformDTO
            {
                skills = skillPerform.SkillCategory.ToSkillCategoryDTO(),
                SkillLevel = skillPerform.Level,
            };
        }
    }
}
