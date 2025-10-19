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
            CreateMap<Project, ProjectDto>();
            //.ForMember(d => d.Images, o => o.MapFrom(s => s.Images.Select(i => i.Url)));
            CreateMap<CreateProjectDto, Project>();

            CreateMap<CreateJobDto, Job>()
             .ForMember(dest => dest.Requirements, opt => opt.Ignore());// Handle manually
                                                                        // Similar for others
            CreateMap<Job, JobDto>()
                .ForMember(dest => dest.Requirements, opt => opt.MapFrom(src => src.Requirements.Split(';', StringSplitOptions.RemoveEmptyEntries)));
            // Similar for Skills, Benefits

            CreateMap<CreateArticleDto, Article>();
            CreateMap<Article, ArticleDto>();
        }
    }
}
