using Invert.Api.Entities;

namespace Invert.Api.Repositories.Interface
{
   public interface IUnitOfWork
    {
       
        IUserRepository User { get; }
        IProjectRepository Product { get; }
        void Save();
        
    }
}