using Invert.Api.Dtos.Article;
using Invert.Api.Dtos.Project;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;

namespace Invert.Api.Services.Interface
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllAsync();
        Task<ProjectDto> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateProjectDto dto);
        Task UpdateAsync(int id, UpdateProjectDto dto);
        Task DeleteAsync(int id);

    }
}
