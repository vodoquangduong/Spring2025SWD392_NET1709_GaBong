using AutoMapper;
using BusinessObjects.Models;
using Helpers.DTOs.SkillCategory;
using Helpers.Mappers;
using Microsoft.AspNetCore.Http.Extensions;
using Repositories.Queries;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            //return skills.Where(sr => sr.ProjectId == projectId)
            //             .Select(sr => sr.SkillCategory)
            //             .ToList();
            return skills.Select(sr => sr.SkillCategory).ToList();
        }
    }
}

