using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface ISkillRequiredRepository
    {
        Task<List<SkillCategory>> GetSkillByProjectIdAsync(long projectId);
        Task CreateAllAsync(List<SkillRequired> skillRequireds);
    }

}
