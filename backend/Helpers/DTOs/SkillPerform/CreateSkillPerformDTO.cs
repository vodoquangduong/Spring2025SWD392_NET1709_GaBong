using BusinessObjects.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.DTOs.SkillPerform
{
    public class CreateSkillPerformDTO
    {
        public long SkillId { get; set; }

        public SkillLevel Level { get; set; } = SkillLevel.Entry;
    }

}
