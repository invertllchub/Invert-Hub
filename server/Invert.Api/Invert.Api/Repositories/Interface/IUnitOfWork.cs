using Invert.Api.Entities;

namespace Invert.Api.Repositories.Interface
{
   public interface IUnitOfWork
    {
       
        IUserRepository User { get; }
        IProjectRepository Product { get; }
        IArticleRepository Article { get; }
        void Save();
        
    }
}