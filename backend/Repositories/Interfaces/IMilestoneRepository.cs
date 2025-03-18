using BusinessObjects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Interfaces
{
    public interface IMilestoneRepository
    {
        Task<Milestone?> GetMilestoneByIdAsync(long milestoneId);
        Task<List<Milestone>> GetMilestonesByProjectIdAsync(long projectId);
        Task<Milestone> CreateMilestoneAsync(Milestone milestone);
        Task UpdateMilestoneAsync(Milestone milestone);
        Task CreateAllAsync(List<Milestone> milestones);
    }
}
