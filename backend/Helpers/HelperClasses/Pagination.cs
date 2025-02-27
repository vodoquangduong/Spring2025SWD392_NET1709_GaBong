using Microsoft.EntityFrameworkCore;

namespace Helpers.HelperClasses
{
    public static class Pagination
    {
        public static async Task<PaginatedResult<TDto>> ApplyPaginationAsync<TEntity, TDto>(
            IQueryable<TEntity> query, int pageNumber, int pageSize, Func<TEntity, TDto> mapToDto)
        {

            if (pageNumber < 1) pageNumber = 1; // Đảm bảo không bị âm hoặc 0
            if (pageSize < 1) pageSize = 10; // Đảm bảo không bị âm hoặc 0

            int totalCount = await query.CountAsync(); //all reocord

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(); // get result throw pagination

            var dtoItems = items.Select(mapToDto).ToList(); // Map entities to DTOs

            return new PaginatedResult<TDto>(dtoItems, totalCount, pageNumber, pageSize);
        }
    }
}
