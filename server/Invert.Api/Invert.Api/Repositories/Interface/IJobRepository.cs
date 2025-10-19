using Invert.Api.Entities;

namespace Invert.Api.Repositories.Interface
{
    public interface IJobRepository : IGenaricRepository<Job>
    {
         void Update(Job job);
}
}