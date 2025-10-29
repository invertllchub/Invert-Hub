using Invert.Api.Entities;
using System.Linq.Expressions;

namespace Invert.Api.Repositories.Interface
{
    public interface IGenaricRepository<T> where T : class
    {

        Task<List<T>> GetAll(Expression<Func<T, bool>>? filter = null, string? includeProperty = null);
        T Get(Expression<Func<T, bool>> filter, string? includeProperty = null);

        bool Any(Expression<Func<T, bool>> filter);
        Task Add(T entity);
        void Remove(T entity);

    }
}