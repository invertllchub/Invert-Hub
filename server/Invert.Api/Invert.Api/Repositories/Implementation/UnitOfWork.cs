using Invert.Api.Data;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Invert.Api.Repositories.Implementation
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        public IUserRepository User { get; private set; }
        public IProjectRepository Product { get; private set; }

        public IArticleRepository Article { get; private set; }



        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            Product = new ProjectRepository(_dbContext);
            User = new UserRepository(_dbContext);
            Article = new ArticleRepository(_dbContext);
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}