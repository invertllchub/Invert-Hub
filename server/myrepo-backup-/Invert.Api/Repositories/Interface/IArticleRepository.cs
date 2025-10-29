using Invert.Api.Entities;

namespace Invert.Api.Repositories.Interface
{
    public interface IArticleRepository : IGenaricRepository<Article>
    {
         void Update(Article article);
}
}