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
using Helpers.DTOs.Project;
using Helpers.DTOs.Report;
using Helpers.DTOs.SkillCategory;
using Helpers.DTOs.SkillPerform;
using Helpers.DTOs.Transaction;
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
            CreateMap<Feedback, FeedbackDTO>()
                .ForMember(dest => dest.Comment, opt => opt.MapFrom(src => src.FeedbackComment))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt.ToString("M/d/yyyy h:mm:ss tt")));

            CreateMap<FeedbackDTO, Feedback>()
                .ForMember(dest => dest.FeedbackComment, opt => opt.MapFrom(src => src.Comment));

            // CREATE
            CreateMap<CreateFeedbackDTO, Feedback>()
                .ForMember(dest => dest.FeedbackComment, opt => opt.MapFrom(src => src.Comment));

            // UPDATE
            CreateMap<UpdateFeedbackDTO, Feedback>()
                .ForMember(dest => dest.FeedbackComment, opt => opt.MapFrom(src => src.FeedbackComment));


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
            //CreateMilestoneWithProjectDTO to Milestone
            CreateMap<CreateMilestoneWithProjectDTO, Milestone>()
                .ForMember(dest => dest.MilestoneName, opt => opt.MapFrom(src => src.MilestoneName))
                .ForMember(dest => dest.MilestoneDescription, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.DeadlineDate, opt => opt.MapFrom(src => src.Deadline))
                .ForMember(dest => dest.PayAmount, opt => opt.MapFrom(src => src.Amount))                ;
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
            //PublicPortfolioDTO to PortfolioDTO
            CreateMap<Portfolio, PublicPortfolioDTO>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Account.Name))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Account.Email))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Account.Phone))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Account.Address))
                .ForMember(dest => dest.AvatarURL, opt => opt.MapFrom(src => src.Account.AvatarURL))
                .ForMember(dest => dest.Birthday, opt => opt.MapFrom(src => src.Account.Birthday))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.Account.Gender))
                .ForMember(dest => dest.Nationality, opt => opt.MapFrom(src => src.Account.Nationality))
                .ForMember(dest => dest.ReputationPoint, opt => opt.MapFrom(src => src.Account.ReputationPoint));
            //Project Mappings
            //Project to ProjectDTO
            CreateMap<Project, ProjectDTO>()
                .ForMember(dest => dest.SkillIds, opt => opt.MapFrom(src =>
                            src.SkillRequired != null
                                ? src.SkillRequired.Select(sr => sr.SkillId).ToList()
                                : new List<long>()))
                .ForMember(dest => dest.Milestones, opt => opt.MapFrom(src => (List<Milestone>)src.Milestones))
                .ForMember(dest => dest.Bids, opt => opt.MapFrom(src => src.Bids))
                        .ForMember(dest => dest.PostDate, opt => opt.MapFrom(src => src.PostDate.ToString("dd-MM-yyyy")));
            //ProjectDTO to Project
            CreateMap<ProjectDTO, Project>();
            //ProjectDetailDTO to Project
            CreateMap<Project, ProjectDetailDTO>()
                .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.SkillRequired.Select(sr => sr.SkillCategory)))
                .ForMember(dest => dest.Milestones, opt => opt.MapFrom(src => src.Milestones))
                .ForMember(dest => dest.Bids, opt => opt.MapFrom(src => src.Bids));
            //UpdateProjectDTO to Project
            CreateMap<UpdateProjectDTO, Project>();
            //CreateProjectDTO to Project
            CreateMap<CreateProjectDTO, Project>()
                .ForMember(dest => dest.Milestones, opt => opt.Ignore())
                .ForMember(dest => dest.SkillRequired, opt => opt.Ignore());
            //Report Mappings
            //Report to ReportDTO
            CreateMap<Report, ReportDTO>();
            //ReportDTO to Report
            CreateMap<ReportDTO, Report>();
            //CreateReportDTO to Report
            CreateMap<CreateReportDTO, Report>();

            //SkillCategory Mappings
            //SkillCategory to SkillCategoryDTO
            CreateMap<SkillCategory, SkillCategoryDTO>();
            //SkillCategoryDTO to SkillCategory
            CreateMap<SkillCategoryDTO, SkillCategory>();

            //SkillPerform Mappings
            //SkillPerform to SkillPerformDTO
            CreateMap<SkillPerform, SkillPerformDTO>()
                .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.SkillCategory))
                .ForMember(dest => dest.SkillLevel, opt => opt.MapFrom(src => src.Level));
            //SkillPerformDTO to SkillPerform
            CreateMap<SkillPerformDTO, SkillPerform>();

            //Transaction Mappings
            //Transaction to TransactionDTO
            CreateMap<Transaction, TransactionDTO>();
            //TransactionDTO to Transaction
            CreateMap<TransactionDTO, Transaction>();
            //CreateTransactionDTO to Transaction
            CreateMap<CreateTransactionDTO, Transaction>();
        }
    }
}