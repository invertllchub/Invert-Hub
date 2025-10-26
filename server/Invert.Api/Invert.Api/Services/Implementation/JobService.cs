using AutoMapper;
using Invert.Api.Data;
using Invert.Api.Dtos;
using Invert.Api.Dtos.Article;
using Invert.Api.Dtos.Job;
using Invert.Api.Entities;
using Invert.Api.Repositories.Implementation;
using Invert.Api.Repositories.Interface;
using Invert.Api.Services.Interface;
using System.Net.NetworkInformation;
using System.Text.Json;

namespace Invert.Api.Services.Implementation
{
    public class JobService : IJobService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<ArticleService> _logger;

        public JobService(IUnitOfWork unitOfWork, IMapper mapper, ILogger<ArticleService> logger)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _logger = logger;
        }



        public Task<int> CreateJobAsync(CreateJobDto dto)
        {
            var job = _mapper.Map<Job>(dto);
            _unitOfWork.Job.Add(job);
            _unitOfWork.Save();
            return Task.FromResult(job.Id);
        }


        public Task DeleteJobAsync(int id)
        {
            var job = _unitOfWork.Job.Get(j => j.Id == id);
            if (job == null) throw new KeyNotFoundException($"Job with id {id} not found");
            _unitOfWork.Job.Remove(job);
            _unitOfWork.Save();
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<JobDto>> GetAllAsync()
        {
            var jobs = await _unitOfWork.Job.GetAll();
            // var jobDtos = _mapper.Map<IEnumerable<JobDto>>(jobs);
            // mapping manual to handle semicolon separated strings
            var jobDtos = jobs.Select(job => new JobDto
            {
                Id = job.Id,
                Title = job.Title,
                Description = job.Description,
                Location = job.Location,
                EmploymentType = job.EmploymentType,
                ExperienceLevel = job.ExperienceLevel,
                Salary = job.Salary,
                Status = job.Status,
                DatePosted = job.DatePosted,
                ClosingDate = job.ClosingDate,
                Requirements = string.IsNullOrEmpty(job.Requirements) ? Array.Empty<string>() : job.Requirements.Split(';'),
                Skills = string.IsNullOrEmpty(job.Skills) ? Array.Empty<string>() : job.Skills.Split(';'),
                Benefits = string.IsNullOrEmpty(job.Benefits) ? Array.Empty<string>() : job.Benefits.Split(';'),


            }).ToList();

            return jobDtos;
        }

        public Task<JobDto?> GetByIdAsync(int id)
        {
            var job = _unitOfWork.Job.Get(j => j.Id == id);
            if (job == null) return Task.FromResult<JobDto?>(null);
            var jobDto = new JobDto
            {
                Id = job.Id,
                Title = job.Title,
                Description = job.Description,
                Location = job.Location,
                EmploymentType = job.EmploymentType,
                ExperienceLevel = job.ExperienceLevel,
                Salary = job.Salary,
                Status = job.Status,
                DatePosted = job.DatePosted,
                ClosingDate = job.ClosingDate,
                Requirements = string.IsNullOrEmpty(job.Requirements) ? Array.Empty<string>() : job.Requirements.Split(';'),
                Skills = string.IsNullOrEmpty(job.Skills) ? Array.Empty<string>() : job.Skills.Split(';'),
                Benefits = string.IsNullOrEmpty(job.Benefits) ? Array.Empty<string>() : job.Benefits.Split(';'),

            };
            return Task.FromResult<JobDto?>(jobDto);


            //return Task.FromResult(jobDto);
        }

        public Task UpdateJobAsync(int id, UpdateJobDto dto)
        {
            var job = _unitOfWork.Job.Get(j => j.Id == id);
            if (job == null) throw new Exception("Job not found");
            if (!string.IsNullOrEmpty(dto.Title))
                job.Title = dto.Title;
            if (!string.IsNullOrEmpty(dto.Description))
                job.Description = dto.Description;
            if (dto.Requirements != null && dto.Requirements.Any())
                job.Requirements = string.Join(";", dto.Requirements);
            if (dto.Skills != null && dto.Skills.Any())
                job.Skills = string.Join(";", dto.Skills);
            if (dto.Benefits != null && dto.Benefits.Any())
                job.Benefits = string.Join(";", dto.Benefits);


            _unitOfWork.Job.Update(job);
            _unitOfWork.Save();
            return Task.CompletedTask;
        }
    }
}