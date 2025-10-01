namespace Invert.Api.Entities
{
    /// <summary>
    /// Represents an Blog article.
    /// </summary>
    public class Article
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string? Media { get; set; }
        public Project Project { get; set; } = null!;
    }
}
