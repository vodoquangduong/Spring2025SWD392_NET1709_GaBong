using BusinessObjects.Models;
using Repositories.Interfaces;
using Services.Interfaces;


namespace Services.Implements
{
    public class SkillRequiredService : ISkillRequiredService
    {
        //private readonly IUnitOfWork _unitOfWork;
        private readonly ISkillRequiredRepository _skillRequiredRepository;

        public SkillRequiredService(
            //IUnitOfWork unitOfWork, 
            ISkillRequiredRepository skillRequiredRepository
            //IMapper mapper
            )
        {
            //_unitOfWork = unitOfWork;
            _skillRequiredRepository = skillRequiredRepository;
        }
        public async Task<List<SkillCategory>> GetSkillByProjectIdAsync(long projectId)
        {

            //var queryOptions = new QueryBuilder<SkillRequired>()
            //    .WithTracking(false)
            //    .WithInclude(sr => sr.SkillCategory)
            //    .WithInclude(sr => sr.ProjectId)    
            //    .Build();

            //var skills = await _unitOfWork.GetRepo<SkillRequired>().GetAllAsync(queryOptions);
            var skills = await _skillRequiredRepository.GetSkillByProjectIdAsync(projectId);

            //return skills.Where(sr => sr.ProjectId == projectId)
            //             .Select(sr => sr.SkillCategory)
            //             .ToList();
            return skills.Select(sr => sr.SkillCategory).ToList();
        }
    }
}

