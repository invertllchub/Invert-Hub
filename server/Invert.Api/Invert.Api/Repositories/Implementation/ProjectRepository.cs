using Invert.Api.Data;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Invert.Api.Repositories.Implementation
{
    public class ProjectRepository : GenaricRepository<Project>, IProjectRepository
    {
        private readonly ApplicationDbContext _db;
        public ProjectRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Project entity)
        {
            _db.Projects.Update(entity);
        }

    }
}