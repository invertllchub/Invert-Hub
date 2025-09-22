using Invert.Api.Entities;

namespace Invert.Api.Repositories.Interface
{
    public interface IProjectRepository : IGenaricRepository<Project>
    {
         void Update(Project project);
}
}