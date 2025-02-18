using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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
