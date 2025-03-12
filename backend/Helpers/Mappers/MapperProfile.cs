using AutoMapper;
using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs;
using Helpers.DTOs.Account;
using Helpers.DTOs.Bid;
using Helpers.DTOs.Contract;

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
            
            
        }
    }
}