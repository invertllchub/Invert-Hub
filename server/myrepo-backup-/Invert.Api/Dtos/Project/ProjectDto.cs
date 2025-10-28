namespace Invert.Api.Dtos.Project
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string PathImg { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
