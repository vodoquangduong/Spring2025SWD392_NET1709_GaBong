using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Account;
using Helpers.DTOs.Bid;
using Helpers.DTOs.Project;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        
        //CreateMap<Project, ProjectDTO>();
        CreateMap<CreateProjectDTO, Project>()
            .ForMember(dest => dest.Status, opt => opt.Ignore())
            .ForMember(dest => dest.ClientId, opt => opt.Ignore())
            .ForMember(dest => dest.PostDate, opt => opt.Ignore());

         CreateMap<Project, ProjectDTO>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => 
                src.Status == ProjectStatus.Pending ? "Pending" :
                src.Status == ProjectStatus.Verified ? "Verified" :
                src.Status == ProjectStatus.OnGoing ? "OnGoing" :
                src.Status == ProjectStatus.Completed ? "Completed" :
                src.Status == ProjectStatus.Closed ? "Closed" : "Unknown"
            ));
            // .ForMember(dest => dest.ClientName, 
            //     opt => opt.MapFrom(src => src.Client.Name))
            // .ForMember(dest => dest.FreelancerName, 
            //     opt => opt.MapFrom(src => src.Freelancer != null ? src.Freelancer.Name : null));

        CreateMap<Account, AccountDTO>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()))
            .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Gender.ToString()))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        CreateMap<CreateBidDTO, Bid>();
        CreateMap<Bid, BidDTO>()
            .ForMember(dest => dest.CreatedAt, 
                opt => opt.MapFrom(src => src.CreatedAt.ToString("dd-MM-yyyy")));
            
    }
}