using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ISkillRequiredService
    {
        Task<List<SkillCategory>> GetSkillByProjectIdAsync(long id);

    }
}
