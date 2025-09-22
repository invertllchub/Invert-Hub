namespace Invert.Api.Dtos
{
    public class CreateProjectDto
    {
        public string Title { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Img { get; set; } = string.Empty;
        public string AnimatedText { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public List<string>? Images { get; set; }
    }
}
