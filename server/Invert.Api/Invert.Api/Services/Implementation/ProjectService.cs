using AutoMapper;
using Invert.Api.Data;
using Invert.Api.Dtos;
using Invert.Api.Dtos.Article;
using Invert.Api.Dtos.Project;
using Invert.Api.Entities;
using Invert.Api.Repositories.Implementation;
using Invert.Api.Repositories.Interface;
using Invert.Api.Services.Interface;

namespace Invert.Api.Services.Implementation
{
    public class ProjectService : IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProjectService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public Task<int> CreateAsync(CreateProjectDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                throw new ArgumentException("Title is required.");
            }
            if (string.IsNullOrWhiteSpace(dto.Description))
            {
                throw new ArgumentException("Description is required.");
            }
            //create project by unit of work
            var project = _mapper.Map<Project>(dto);
            _unitOfWork.Project.Add(project);
            _unitOfWork.Save();
            return Task.FromResult(project.Id);
        }

        public async Task<IEnumerable<ProjectDto>> GetAllAsync()
        {
            //get all projects by unit of work
            var projects = await _unitOfWork.Project.GetAll();
            var projectDtos = projects.Select(p => new ProjectDto
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description ?? string.Empty,
                PathImg = p.PathImg ?? string.Empty,
                Link = p.Link,
                CreatedAt = p.CreatedAt
            }).ToList();

            // var projectDtos = _mapper.Map<IEnumerable<ProjectDto>>(projects);
            return projectDtos;

        }

        public Task UpdateAsync(int id, UpdateProjectDto dto)
        {
            var project = _unitOfWork.Project.Get(p => p.Id == id);
            if (project == null) throw new Exception("Project not found"); ;

            if (!string.IsNullOrEmpty(dto.Title))
                project.Title = dto.Title;

            if (!string.IsNullOrEmpty(dto.Description))
                project.Description = dto.Description;

            if (!string.IsNullOrEmpty(dto.PathImg))
                project.PathImg = dto.PathImg;

            if (!string.IsNullOrEmpty(dto.Link))
                project.Link = dto.Link;

            //UpdatedAt
            project.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.Project.Update(project);
            _unitOfWork.Save();
            return Task.CompletedTask;

        }
        public Task DeleteAsync(int id)
        {
            var project = _unitOfWork.Project.Get(p => p.Id == id);
            if (project == null) throw new Exception("Project not found"); ;

            _unitOfWork.Project.Remove(project);
            _unitOfWork.Save();
            return Task.CompletedTask;
        }

        public Task<ProjectDto> GetByIdAsync(int id)
        {
            //get project by unit of work
            var project = _unitOfWork.Project.Get(p => p.Id == id);
            if (project == null) return Task.FromResult<ProjectDto>(null!);
            var projectDto = _mapper.Map<ProjectDto>(project);
            return Task.FromResult(projectDto);
        }
    }
}