using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Queries
{

    public class QueryBuilder<T> where T : class
    {
        private readonly QueryOptions<T> _options = new QueryOptions<T>();

        public QueryBuilder<T> WithPredicate(Expression<Func<T, bool>> predicate)
        {
            _options.Predicate = predicate;
            return this;
        }

        public QueryBuilder<T> WithTracking(bool tracked)
        {
            _options.Tracked = tracked;
            return this;
        }

        public QueryBuilder<T> WithOrderBy(Func<IQueryable<T>, IOrderedQueryable<T>> orderBy)
        {
            _options.OrderBy = orderBy;
            return this;
        }

        public QueryBuilder<T> WithInclude(params Expression<Func<T, object>>[] includeProperty)
        {
            _options.IncludeProperties.AddRange(includeProperty);
            return this;
        }

        public QueryOptions<T> Build()
        {
            return _options;
        }
    }
}
