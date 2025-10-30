using Invert.Api.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;
using AutoMapper;
using Invert.Api.Dtos.Article;
using Invert.Api.Dtos.Project;
using Invert.Api.Dtos.Job;

namespace Invert.Api.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {


            // ========== Project Mappings ==========

            CreateMap<CreateProjectDto, Project>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());

            CreateMap<Project, ProjectDto>();

            CreateMap<UpdateProjectDto, Project>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

            // ========== Job Mappings ==========

            CreateMap<CreateJobDto, Job>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.EmploymentType, opt => opt.MapFrom(src => src.EmploymentType.ToString()))
                .ForMember(dest => dest.ExperienceLevel, opt => opt.MapFrom(src => src.ExperienceLevel.ToString()))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.Requirements, opt => opt.MapFrom(src => src.Requirements))
                .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.Skills))
                .ForMember(dest => dest.Benefits, opt => opt.MapFrom(src => src.Benefits));

            CreateMap<Job, JobDto>()
                .ForMember(dest => dest.Requirements, opt => opt.MapFrom(src => src.Requirements))
                .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.Skills))
                .ForMember(dest => dest.Benefits, opt => opt.MapFrom(src => src.Benefits));

            CreateMap<UpdateJobDto, Job>()
               .ForMember(dest => dest.EmploymentType, opt =>
               {
                   opt.PreCondition(src => src.EmploymentType != null);
                   opt.MapFrom(src => src.EmploymentType.ToString());
               })
               .ForMember(dest => dest.ExperienceLevel, opt =>
               {
                   opt.PreCondition(src => src.ExperienceLevel != null);
                   opt.MapFrom(src => src.ExperienceLevel.ToString());
               })
               .ForMember(dest => dest.Status, opt =>
               {
                   opt.PreCondition(src => src.Status != null);
                   opt.MapFrom(src => src.Status.ToString());
               });


        }
    }
}