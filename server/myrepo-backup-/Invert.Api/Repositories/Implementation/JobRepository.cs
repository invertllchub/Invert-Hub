using Invert.Api.Data;
using Invert.Api.Entities;
using Invert.Api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Invert.Api.Repositories.Implementation
{
    public class JobRepository : GenaricRepository<Job>, IJobRepository
    {
        private readonly ApplicationDbContext _db;
        public JobRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Job entity)
        {
            _db.Jobs.Update(entity);
        }

    }
}