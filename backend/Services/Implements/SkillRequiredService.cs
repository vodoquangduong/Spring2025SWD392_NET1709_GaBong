using AutoMapper;
using BusinessObjects.Models;
using Repositories.Queries;
using Services.Interfaces;


namespace Services.Implements
{
    public class SkillRequiredService : ISkillRequiredService
    {
        private readonly IUnitOfWork _unitOfWork;
        public SkillRequiredService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<SkillCategory>> GetSkillByProjectIdAsync(long projectId)
        {
            var queryOptions = new QueryBuilder<SkillRequired>()
                .WithTracking(false)
                .WithInclude(sr => sr.SkillCategory)
                .WithInclude(sr => sr.ProjectId)    
                .Build();
            var skills = await _unitOfWork.GetRepo<SkillRequired>().GetAllAsync(queryOptions);
            return skills.Select(sr => sr.SkillCategory).ToList();
        }
    }
}

