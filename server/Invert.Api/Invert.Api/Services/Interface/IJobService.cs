using Invert.Api.Dtos;
using Invert.Api.Dtos.Article;
using Invert.Api.Dtos.Job;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;

namespace Invert.Api.Services.Interface
{
    public interface IJobService
    {
        Task<int> CreateJobAsync(CreateJobDto dto);
        Task<JobDto?> GetByIdAsync(int id);
        Task<IEnumerable<JobDto>> GetAllAsync();
        Task UpdateJobAsync(int id, UpdateJobDto dto);
        Task DeleteJobAsync(int id);

    }
}
