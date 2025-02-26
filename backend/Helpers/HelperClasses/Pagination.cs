using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.HelperClasses
{
    public static class Pagination
    {
        public static async Task<PaginatedResult<T>> ApplyPaginationAsync<T>(
        IQueryable<T> query, int pageNumber, int pageSize)
        {

            if (pageNumber < 1) pageNumber = 1; // Đảm bảo không bị âm hoặc 0
            if (pageSize < 1) pageSize = 10; // Đảm bảo không bị âm hoặc 0

            int totalCount = await query.CountAsync(); //all reocord

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(); // get result throw pagination

            return new PaginatedResult<T>(items, totalCount, pageNumber, pageSize);
        }
    }
}
