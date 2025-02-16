using BusinessObjects.Models;
using Helpers.DTOs.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.Mappers
{
    public static class AccountMapper
    {
        public static AccountDTO ToAccountDTO(this Account account)
        {
            return new AccountDTO
            {
                AccountId = account.AccountId,
                Role = account.Role.ToString(),
                Name = account.Name,
                Email = account.Email,
                Password = account.Password,
                Phone = account.Phone,
                Address = account.Address,
                Birthday = account.Birthday,
                Gender = account.Gender.ToString(),
                ReputationPoint = account.ReputationPoint,
                CreatedAt = account.CreatedAt,
                Status = account.Status.ToString(),

            };

        }

    }
}
