using Invert.Api.Dtos;
using Invert.Api.Dtos.Article;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;

namespace Invert.Api.Services.Interface
{
    public interface IArticleService
    {
        Task<Guid> CreateArticleAsync(CreateArticleDto dto);
        Task<ArticleDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<ArticleDto>> GetAllAsync();
        Task UpdateArticleAsync(Guid id, UpdateArticleDto dto);
        Task DeleteArticleAsync(Guid id);

    }
}
