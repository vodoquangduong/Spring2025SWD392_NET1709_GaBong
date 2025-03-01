using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Account;

namespace Helpers.Mappers
{
    public static class AccountMapper
    {
        public static AccountDTO ToAccountDTO(this Account account)
        {
            if (account == null) return new AccountDTO();

            return new AccountDTO
            {
                AccountId = account.AccountId,
                Role = account.Role,
                Name = account.Name,
                Email = account.Email,
                Password = "********",
                AvatarURL = account.AvatarURL,
                Phone = account.Phone,
                Address = account.Address,
                Birthday = account.Birthday,
                Gender = account.Gender,
                Nationality = account.Nationality,
                ReputationPoint = account.ReputationPoint,
                TotalCredit = account.TotalCredit,
                LockCredit = account.LockCredit,
                CreatedAt = account.CreatedAt,
                Status = account.Status,
            };
        }

        public static Account ToAccount(AccountDTO accountDto)
        {
            if (accountDto == null) return new Account();

            return new Account
            {
                AccountId = accountDto.AccountId,
                Role = Enum.Parse<AccountRole>(accountDto.Role.ToString()),
                Name = accountDto.Name,
                Email = accountDto.Email,
                Password = accountDto.Password,
                AvatarURL = accountDto.AvatarURL,
                Phone = accountDto.Phone,
                Address = accountDto.Address,
                Birthday = accountDto.Birthday,
                Gender = Enum.Parse<Gender>(accountDto.Gender.ToString()),
                Nationality = accountDto.Nationality,
                ReputationPoint = accountDto.ReputationPoint,
                TotalCredit = accountDto.TotalCredit,
                LockCredit = accountDto.LockCredit,
                CreatedAt = accountDto.CreatedAt,
                Status = Enum.Parse<AccountStatus>(accountDto.Status.ToString()),
            };
        }
        public static void ToAccount(this Account account, UpdateAccountDTO updateDTO)
        {
                account.Name = updateDTO.Name;
                account.Phone = updateDTO.Phone;
                account.Address = updateDTO.Address;
                account.AvatarURL = updateDTO.AvatarURL;
                account.Birthday = updateDTO.Birthday;
                account.Gender = updateDTO.Gender;
                account.Nationality = updateDTO.Nationality;
        }
    }
}
