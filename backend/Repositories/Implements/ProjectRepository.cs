using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Query;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProjectRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<Project> CreateAsync(Project project)
        {
            var result = await _unitOfWork.GetRepo<Project>().CreateAsync(project);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task UpdateAsync(Project project)
        {
            await _unitOfWork.GetRepo<Project>().UpdateAsync(project);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<Project?> GetSingleByIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<Project>()
                .WithTracking(true)
                .WithPredicate(p => p.ProjectId == projectId)
                .Build();

            return await _unitOfWork.GetRepo<Project>().GetSingleAsync(queryOptions);
        }

        public async Task<Project?> GetSingleCompletedAsync(long projectId)
        {
            var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(new QueryOptions<Project>
            {
                Predicate = p => p.ProjectId == projectId && p.Status == ProjectStatus.Completed
            });

            return project;
        }
        public async Task<Project?> GetProjectWithSkillMilestoneBidAsync(long projectId)
        {
            var projectQueryOptions = new QueryBuilder<Project>()
                .WithTracking(false) // No tracking for efficient
                .WithInclude(p => p.SkillRequired)
                .WithInclude(p => p.Milestones)
                .WithInclude(p => p.Bids)
                .WithPredicate(project =>
                    project.ProjectId == projectId
                    && project.Milestones.Any()
                    && project.SkillRequired.Any()
                )
                .Build();
            var project = await _unitOfWork.GetRepo<Project>().GetSingleAsync(projectQueryOptions);

            return project;
        }

        //public async Task<IEnumerable<Project>> GetAllAsync(QueryOptions<Project> queryOptions)
        //{
        //    return await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
        //}

        //public async Task<IEnumerable<SkillPerform>> GetUserSkillPerformAsync(long accountId)
        //{
        //    var queryOptions = new QueryBuilder<SkillPerform>()
        //        .WithPredicate(s => s.AccountId == accountId)
        //        .Build();

        //    return await _unitOfWork.GetRepo<SkillPerform>().GetAllAsync(queryOptions);
        //}

        public async Task<IEnumerable<Project>> GetAllProjectsAsync()
        {
            var queryOptions = new QueryBuilder<Project>()
                .WithTracking(false) // No tracking for efficient
                .WithInclude(p => p.SkillRequired)
                .WithInclude(p => p.Milestones)
                .WithInclude(p => p.Bids)
                .WithOrderBy(q => q.OrderByDescending(p => p.PostDate))
                .Build();
            var projects = await _unitOfWork.GetRepo<Project>().GetAllAsync(queryOptions);
            return projects;
        }

        public IQueryable<Project> GetAllProjectsVerifiedPaging(ProjectFilter filter)
        {
            var queryOptions = new QueryBuilder<Project>()
               .WithTracking(false) // No tracking for efficient
               .WithInclude(p => p.SkillRequired)
               .WithInclude(p => p.Milestones)
               .WithInclude(p => p.Bids)
               .WithPredicate(p =>
                   p.Status == ProjectStatus.Verified
                   && p.Milestones.Any()
                   && p.SkillRequired.Any()
                   && (
                       string.IsNullOrEmpty(filter.ProjectName)
                       || p.ProjectName.ToLower().Contains(filter.ProjectName.ToLower())
                   )
                   && (filter.MinBudget == null || p.EstimateBudget >= filter.MinBudget)
                   && (filter.MaxBudget == null || p.EstimateBudget <= filter.MaxBudget)
                   && (
                       filter.SkillIds == null
                       || filter.SkillIds.All(id => p.SkillRequired.Any(s => s.SkillId == id))
                   )
                   && (
                       string.IsNullOrEmpty(filter.Location)
                       || p.Location.Contains(filter.Location)
                   )
               )
               .WithOrderBy(q =>
               {
                   switch (filter.SortBy)
                   {
                       case "newest":
                           return q.OrderByDescending(p => p.PostDate); // Newest
                       case "oldest":
                           return q.OrderBy(p => p.PostDate); // Oldest
                       case "highest_budget":
                           return q.OrderByDescending(p => p.EstimateBudget); // Max      budget
                       case "lowest_budget":
                           return q.OrderBy(p => p.EstimateBudget); // Min budget
                       default:
                           return q.OrderByDescending(p => p.PostDate); // Default:     newest
                   }
               })
               .Build();
            return _unitOfWork.GetRepo<Project>().Get(queryOptions);
        }

        public IQueryable<Project> GetAllProjectsPendingPaging()
        {
            var queryOptions = new QueryBuilder<Project>()
                .WithTracking(false) // No tracking for efficient
                .WithInclude(p => p.SkillRequired)
                .WithInclude(p => p.Bids)
                .WithInclude(p => p.Milestones)
                .WithPredicate(p =>
                    (p.Status == ProjectStatus.Pending)
                    && p.Milestones.Any()
                    && p.SkillRequired.Any()
                )
                .WithOrderBy(q => q.OrderByDescending(p => p.PostDate))
                .Build();
            var query = _unitOfWork.GetRepo<Project>().Get(queryOptions);

            return query;
        }

    }

}
