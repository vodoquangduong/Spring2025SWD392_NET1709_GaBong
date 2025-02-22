using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using Helpers.Mappers;
using Repositories.Queries;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Implements
{
    public class SkillCategoryService : ISkillCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SkillCategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<SkillCategoryDTO> CreateSkillCategoryAsync(CreateSkillCategoryDTO createSkillCategoryDTO)
        {
            var skillCategory = new SkillCategory()
            {
                SkillName = createSkillCategoryDTO.SkillName,
            };
            var result = await _unitOfWork.GetRepo<SkillCategory>().CreateAsync(skillCategory);
            await _unitOfWork.SaveChangesAsync();
            return result.ToSkillCategoryDTO();
        }

        public Task DeleteSkillCategoryAsync(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<SkillCategory>> GetAllSkillCategoryAsync()
        {
            var queryOptions = new QueryBuilder<SkillCategory>()
                       .WithTracking(false) // No tracking for efficient
                       .Build();

            return await _unitOfWork.GetRepo<SkillCategory>().GetAllAsync(queryOptions);
        }


        public Task<SkillCategoryDTO> GetSkillCategoryByIdAsync(long id)
        {
            throw new NotImplementedException();
        }
    }
}