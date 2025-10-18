using Invert.Api.Dtos;
using Invert.Api.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;
using AutoMapper;
using Invert.Api.Dtos.Article;

namespace Invert.Api.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Project, ProjectDto>();
            //.ForMember(d => d.Images, o => o.MapFrom(s => s.Images.Select(i => i.Url)));
            CreateMap<CreateProjectDto, Project>();
        }
    }
}
