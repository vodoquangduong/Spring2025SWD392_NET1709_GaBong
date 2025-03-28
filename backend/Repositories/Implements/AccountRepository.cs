﻿using BusinessObjects.Enums;
using BusinessObjects.Models;
using Helpers.DTOs.Query;
using Repositories.Interfaces;
using Repositories.Queries;

namespace Repositories.Implements
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        //private readonly ApplicationDbContext _context;

        public AccountRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Account?> GetSingleByAccountIdAsync(long? accountId)
        {
            //<== Get client account==>
            var queryOption = new QueryBuilder<Account>()
                .WithTracking(false)
                .WithPredicate(a => a.AccountId == accountId)
                .Build();
            var client = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOption);

            return client;
        }

        public async Task<Account?> GetFreelancerByAccountIdAsync(long freelancerId)
        {
            var freelancer = await _unitOfWork.GetRepo<Account>().GetSingleAsync(new QueryOptions<Account>
            {
                Predicate = a => a.AccountId == freelancerId && a.Role == AccountRole.Freelancer && a.Status == AccountStatus.Active
            });

            return freelancer;
        }

        public async Task<Account?> GetAccountByEmailAsync(string email)
        {
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false) // No tracking for efficiency
                .WithPredicate(a => a.Email == email) // Filter by ID
                .Build();
            var account = await _unitOfWork.GetRepo<Account>().GetSingleAsync(queryOptions);

            return account;
        }

        public async Task<Account> CreateAccountAsync(Account account)
        {
            var createdAccount = await _unitOfWork.GetRepo<Account>().CreateAsync(account);
            await _unitOfWork.SaveChangesAsync();
            return createdAccount;
        }

        public async Task UpdateAsync(Account account)
        {
            await _unitOfWork.GetRepo<Account>().UpdateAsync(account);
            await _unitOfWork.SaveChangesAsync();
        }

        public IQueryable<Account> GetAllAccountsPaging()
        {
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false) // No tracking for efficient
                .Build();
            var accounts = _unitOfWork.GetRepo<Account>().Get(queryOptions);

            return accounts;
        }

        public IQueryable<Account> GetAllAccountsFilteredPaging(AccountFilter filter)
        {
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false) // No tracking for efficient
                .WithPredicate(acc =>
                     (string.IsNullOrEmpty(filter.AccountName)
                        || acc.Name.Contains(filter.AccountName))
                    && (string.IsNullOrEmpty(filter.AccountRole)
                        || acc.Role.Equals(Enum.Parse<AccountRole>(filter.AccountRole)))
                    && (string.IsNullOrEmpty(filter.AccountStatus)
                        || acc.Status.Equals(Enum.Parse<AccountStatus>(filter.AccountStatus)))
                )
                .WithOrderBy(acc =>
                {
                    switch (filter.SortBy)
                    {
                        case AccountFilter.SortReputation:
                            return acc.OrderByDescending(acc => acc.ReputationPoint);
                        case AccountFilter.SortTotalCredit:
                            return acc.OrderByDescending(acc => acc.TotalCredit);
                        case AccountFilter.SortCreatedAt:
                            return acc.OrderByDescending(acc => acc.CreatedAt);
                        default:
                            return acc.OrderByDescending(acc => acc.AccountId);
                    }
                })
                .Build();

            var accounts = _unitOfWork.GetRepo<Account>().Get(queryOptions);

            return accounts;
        }

        public IQueryable<Account> GetAllFreelancersPaging()
        {
            var queryOptions = new QueryBuilder<Account>()
                .WithTracking(false) // No tracking for efficient
                .WithPredicate(a => a.Role == BusinessObjects.Enums.AccountRole.Freelancer
                                && a.Status == BusinessObjects.Enums.AccountStatus.Active)
                .Build();
            var accounts = _unitOfWork.GetRepo<Account>().Get(queryOptions);

            return accounts;
        }
    }

}
