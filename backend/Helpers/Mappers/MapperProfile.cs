using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs;
using Helpers.DTOs.Account;
using Helpers.DTOs.Bid;
using Helpers.DTOs.Chat;
using Helpers.DTOs.Contract;
using Helpers.DTOs.Feedback;
using Helpers.DTOs.Milestone;
using Helpers.DTOs.Notification;
using Helpers.DTOs.Portfolio;
using Services.Interfaces.Portfolio;

namespace Helpers.Mappers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            //Account Mappings
            //Account to AccountDTO
            CreateMap<Account, AccountDTO>()
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => "********"));

            //AccountDTO to Account
            CreateMap<AccountDTO, Account>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => Enum.Parse<AccountRole>(src.Role.ToString())))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => Enum.Parse<Gender>(src.Gender.ToString())))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Enum.Parse<AccountStatus>(src.Status.ToString())));

            //UpdateAccountDTO to Account
            CreateMap<UpdateAccountDTO, Account>();

            //Bid Mappings
            //Bid to BidDTO
            CreateMap<Bid, BidDTO>()
                .ForMember(dest => dest.BidOwner, opt => opt.MapFrom(src => src.BidOwner));

            //BidDTO to Bid
            CreateMap<BidDTO, Bid>();
            //CreateBid to Bid
            CreateMap<CreateBidDTO, Bid>();

            //Contract Mappings
            //Contract to ContractDTO
            CreateMap<Contract, ContractDTO>();
            //ContractDTO to Contract
            CreateMap<ContractDTO, Contract>();
            CreateMap<CreateContractDTO, Contract>();

            //Feedback Mappings
            //Feedback to FeedbackDTO
            CreateMap<Feedback, FeedbackDTO>();
            //FeedbackDTO to Feedback
            CreateMap<FeedbackDTO, Feedback>();
            //UpdateFeedbackDTO to Feedback
            CreateMap<UpdateFeedbackDTO, Feedback>();

            //Message Mappings
            //Message to MessageDTO
            CreateMap<Messages, MessageDTO>();
            //MessageDTO to Message
            CreateMap<MessageDTO, Messages>();

            //Milestone Mappings
            //Milestone to MilestoneDTO
            CreateMap<Milestone, MilestoneDTO>();
            //MilestoneDTO to Milestone
            CreateMap<MilestoneDTO, Milestone>();
            //CreateMilestoneDTO to Milestone
            CreateMap<CreateMilestoneDTO, Milestone>();
            //UpdateMilestoneDTO to Milestone
            CreateMap<UpdateMilestoneDTO, Milestone>();

            //Notification Mappings
            //Notification to NotificationDTO
            CreateMap<Notification, NotificationDTO>();
            //NotificationDTO to Notification
            CreateMap<NotificationDTO, Notification>();
            //CreateNotificationDTO to Notification
            CreateMap<CreateNotificationDTO, Notification>();
            //UpdateStatusNotificationDTO to Notification
            CreateMap<UpdateStatusNotificationDTO, Notification>();


            //Portfolio Mappings
            //Portfolio to PortfolioDTO
            CreateMap<Portfolio, PortfolioDTO>();
            //PortfolioDTO to Portfolio
            CreateMap<PortfolioDTO, Portfolio>();
            //CreatePortfolioDTO to Portfolio
            CreateMap<CreatePortfolioDTO, Portfolio>();
            //UpdatePortfolioDTO to Portfolio
            CreateMap<UpdatePortfolioDTO, Portfolio>();
            //PublicPortfolioDTO to Portfolio
            CreateMap<PublicPortfolioDTO, Portfolio>();

            //Project Mappings
            //Project to ProjectDTO
            CreateMap<Project, ProjectDTO>()
                        .ForMember(dest => dest.PostDate, opt => opt.MapFrom(src => src.PostDate.ToString("dd-MM-yyyy")))
                        .ForMember(dest => dest.SkillIds, opt => opt.MapFrom(src =>
                            src.SkillRequired != null
                                ? src.SkillRequired.Select(sr => sr.SkillId).ToList()
                                : new List<long>()))
                        .ForMember(dest => dest.Milestones, opt => opt.MapFrom(src => (List<Milestone>)src.Milestones))
                        .ForMember(dest => dest.Bids, opt => opt.MapFrom(src => src.Bids));
            //ProjectDTO to Project
            CreateMap<ProjectDTO, Project>();
        }
    }
}