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
            int totalCount = await query.CountAsync(); //all reocord

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(); // get result throw pagination

            return new PaginatedResult<T>(items, totalCount, pageNumber, pageSize);
        }
    }
}
