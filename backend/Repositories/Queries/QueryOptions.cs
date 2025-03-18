using System.Linq.Expressions;

namespace Repositories.Queries
{
    public class QueryOptions<T>
    {
        public Expression<Func<T, bool>>? Predicate { get; set; }
        public Func<IQueryable<T>, IOrderedQueryable<T>>? OrderBy { get; set; }
        public bool Tracked { get; set; } = false;
        public List<Expression<Func<T, object>>> IncludeProperties { get; set; } = new List<Expression<Func<T, object>>>();
    }
}
