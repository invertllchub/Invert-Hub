using AutoMapper;
using Invert.Api.Data;
using Invert.Api.Dtos;
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

        public void CreateAsync(CreateProjectDto dto)
        {
            //create project by unit of work
            var project = _mapper.Map<Project>(dto);
            _unitOfWork.Product.Add(project);
            _unitOfWork.Save();
        }

        public Task<IEnumerable<ProjectDto>> GetAllAsync()
        {
            //get all projects by unit of work
            var projects = _unitOfWork.Product.GetAll();

            var projectDtos = _mapper.Map<IEnumerable<ProjectDto>>(projects);
            return Task.FromResult(projectDtos);

        }

        public void UpdateAsync(ProjectDto dto)
        {
            var project = _mapper.Map<Project>(dto);
            if (project == null) throw new Exception("Project not found");

            _unitOfWork.Product.Update(project);
            _unitOfWork.Save();

        }
        public void DeleteAsync(int id)
        {
            var project = _unitOfWork.Product.Get(p => p.Id == id);
            if (project == null) throw new Exception("Project not found"); ;

            _unitOfWork.Product.Remove(project);
            _unitOfWork.Save();
        }

        public Task<ProjectDto> GetByIdAsync(int id)
        {
            //get project by unit of work
            var project = _unitOfWork.Product.Get(p => p.Id == id);
            var projectDto = _mapper.Map<ProjectDto>(project);
            return Task.FromResult(projectDto);
        }
    }
}