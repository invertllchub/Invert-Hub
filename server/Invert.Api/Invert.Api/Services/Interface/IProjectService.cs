using Invert.Api.Dtos;
using Invert.Api.Dtos.Article;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;

namespace Invert.Api.Services.Interface
{
    public interface IProjectService
    {
        Task<IEnumerable<ProjectDto>> GetAllAsync();
        Task<ProjectDto> GetByIdAsync(int id);
        void CreateAsync(CreateProjectDto dto);
        void UpdateAsync(ProjectDto dto);
        void DeleteAsync(int id);

    }
}
