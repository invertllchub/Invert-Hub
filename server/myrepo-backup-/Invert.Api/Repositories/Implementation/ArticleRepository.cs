using Invert.Api.Data;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Invert.Api.Repositories.Implementation
{
    public class ArticleRepository : GenaricRepository<Article>, IArticleRepository
    {
        private readonly ApplicationDbContext _db;
        public ArticleRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Article entity)
        {
            _db.Articles.Update(entity);
        }

    }
}